---
title: "How to self host your websites"
date: 2023-01-07T18:22:58+07:00
description: This site is served not from cloud or hosting service, but from a crappy consumer-grade desktop from 2002 that I store in my living room.
tags:
  - "software-development"
  - "infrastructure"
---

This site is served not from cloud or hosting service, but from a crappy consumer-grade desktop from 2002 that I store in my living room.

![my server image](/images/home-server.jpg)

## Why?

Because it is fun learning exercise.

Also it is a humbling experience. I bought this "server" for 700.000 IDR (or about 45 USD). In contrast of typical `$CLOUD` offering this kind of compute and storage will cost you 5-20 USD per month. It hosts tens of docker containers, and it runs just fine. Well to be fair, it doesn't see much traffic with the main "user" traffic come just from me and my wife usage. But nonetheless, it is very interesting on how much I can cram to it. 

```bash
adhikasp@arjuna:~$ docker ps | wc -l
33
```

Beside, it is cheaper as I don't need to rent a VPS. My electricity budget surely increase, not really visible though as I believe it is dwarved by other electronics in my home like AC unit and fridge.

## The difficult part

Self hosting can be tricky if you have ISP that use CGNAT. It means you don't have public IP assigned and there is no way for public traffic from internet to access yourself. You can't use [DDNS](https://en.wikipedia.org/wiki/Dynamic_DNS) as the IP that get registered doesn't belong to you exclusively.

