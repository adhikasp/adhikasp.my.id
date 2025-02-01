---
title: "Reviving Blog 2025"
date: 2025-02-01T20:38:06+07:00
description: Every software engineer have multiple iteration of their blog, including me.
tags:
  - "software-development"
---

Feels like writting, so I dig into my GitHub repostory and refound this old blog of mine.

I have few different iteration of my blog.

The first one is a WordPress blog that was part of high school IT subject.

Then I think I create an static nginx based website, hosted on VPS.

And this one, a Hugo site originally hosted on my [homelab](https://adhikasp.my.id/posts/self-hosting-my-website-with-cloudflare-tunnel/). But my homelab die a few month ago after a brownout in my apartement. And I haven't been bothered to revive all of the services.taken down along it.

Fortunately it very easy to make this blog works again. I decided to move it to GitHub Pages.

It consist of 2 commits:

- [Add Hugo GitHub CI](https://github.com/adhikasp/adhikasp.my.id/commit/2589fcda582d5dad2852740a4028bc7901729a3f). There was some preset GitHub Actions that I can directly pick. With some minor modification to the hostname config part to use my own domain instead of the default `adhikasp.github.io`.
- [Remove Disqus integration](https://github.com/adhikasp/adhikasp.my.id/commit/eb74b233df660ec8ac9d60ad194266ed468ef6e4). IDK why I put it in the first place or why it works in past. Too lazy to figure out so I just remove it.

Hopefully this one will last longer.
