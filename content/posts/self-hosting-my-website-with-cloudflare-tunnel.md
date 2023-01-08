---
title: "Self hosting my websites with Cloudflare Tunnel"
date: 2023-01-07T18:22:58+07:00
description: This site is served not from cloud or hosting service, but from a crappy consumer-grade desktop from 2008 that I store in my living room, with a Cloudflare Tunnel.
tags:
  - "software-development"
  - "infrastructure"
---

This site is served not from cloud or hosting service, but from a crappy consumer-grade desktop from 2008 that I store in my living room, with a Cloudflare Tunnel.

![my server image](/images/home-server.jpg)

## Why?

Because it is fun learning exercise.

## About the server

This is a Fujitsu Mini PC, running a state-of-the art [core 2 duo processor E8400](https://ark.intel.com/content/www/id/id/ark/products/33910/intel-core2-duo-processor-e8400-6m-cache-3-00-ghz-1333-mhz-fsb.html) released just in 2008. It have 4GB RAM. The OS of choice is Ubuntu LTS 22.04. I upgrade it with old 128GB SSD that used to be on my gaming PC, to make the OS more snappy. I swap the 500GB spinning disk with brand new 4TB Barracuda disk as I want it to serve as media server too. 

It is a humbling experience. I bought this "server" [for 875.000 IDR (or about 56 USD) from Tokopedia](https://tokopedia.link/kJC7o7BLpwb) (warning, affiliate link :)). The 4TB disk [cost 1.443.000 IDR (~93 USD) from Tokopedia](https://tokopedia.link/M9dvoMxMpwb). In contrast, a typical `$CLOUD` offering this kind of compute will cost you 5-20 USD per month. And the cloud storage is whopping 480 USD per month! This server able to hosts tens of docker containers, and it runs just fine. Well to be fair, it doesn't see much traffic with the main "user" traffic come just from me and my wife usage. Also of course it don't have DR feature builtin like backup or HA. But nonetheless, it is very interesting on how much I can cram to it.

```bash
adhikasp@arjuna:~$ docker ps | wc -l
33
```

Beside, it is cheaper as I don't need to rent a VPS. My electricity budget surely increase, not really visible though as I believe it is dwarved by other electronics in my home like AC unit and fridge.

## The difficult part

Self hosting can be tricky if you have ISP that use CGNAT. It means you don't have public IP assigned and there is no way for public traffic from internet to access yourself. You can't use [DDNS](https://en.wikipedia.org/wiki/Dynamic_DNS) as the IP that get registered doesn't belong to you exclusively.

There is atleast 2 workaround for this:

1. Have a publicly addressable VPS like from AWS or [DigitalOcean](https://m.2do.co/c/b8a84c179d20). Connect it to your home server with VPN tunnel like [Tailscale](https://tailscale.com/). Then route your HTTP traffic from the VPS into home server via the tunnel.
2. Use 3rd party SaaS that do (1) for you. Service like [Ngrok](https://ngrok.com/) and [Cloudflare Tunnel](https://www.cloudflare.com/products/tunnel/).

Ngrok free tier don't provide ability to setup custom domain, I will stuck with something like https://randomstringandnumber.ngrok.io as my domain, which is undesirable. On the otherhands Cloudflare free tier provide this, which is nice as I already use them for proxying my domain. 

## How CloudFlare Tunnel works

![cloudflared tunnel](/images/cloudflared-tunnel.svg)

The tunnel works by... well tunnelling your traffic from Cloudflare into your private server directly. There is a `cloudflared` daemon that need to be installed on server side that will manage this tunnel for you.

The installation is straightforward:

1. Go to your Cloudflare dashboard https://one.dash.cloudflare.com.
2. Go to tunnels configuration https://one.dash.cloudflare.com/youraccountnumber/access/tunnels.
3. Create new tunnels.
4. Install the cloudflared with the provided instructions, it already have one liner that includes some kind of authentication keys for your specific tunnel.

You then can configure mapping between public hostname with port in your server, this function similarly like nginx reverse proxy where your web application may not necessarly serving in port 80 or 443.

![tunnel mapping](/images/tunnel-public-hostname.png)

In my case, as I already have Traefik in port 443 serving all my sites, I tell cloudflare to just forward all traffic to the same https://127.0.0.1:443 location.

![tunnel-hostname-forwarding](/images/tunnel-hostname-forwarding.png)

I also need to tell Cloudflare to set the HTTP host header so the Traefik instances can properly route it.

## Limitation

I like the overall setup and experience. As of now (Jan 2023) there is no pricing attached to Cloudflare Tunnel, yet? The most recent announcement is that it is provided for free https://blog.cloudflare.com/tunnel-for-everyone.
