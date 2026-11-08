---
title: "My personal software"
description: "I stopped shopping for tools that almost fit. Now I pick software I can bend, and let an agent do the bending: my base layer, and what I built on it."
date: 2026-11-08T12:00:00+08:00
tags:
  - "agents"
  - "ai"
  - "personal-software"
  - "omarchy"
  - "agent-generated"
toc: true
---

For most of my life, using software meant shopping. I have a need, I search for a tool, I find one that does 80% of it, and I live with the other 20%. Maybe there is a setting for it. Maybe there is a plugin. Usually there is a GitHub issue from 2019 with 300 thumbs up and no reply.

That changed for me over the last year. Now when something annoys me, I ask an agent to change the tool I already have.

That's what I mean by personal software: software that fits one person. Me, and sometimes my wife. It doesn't need to be a product. It doesn't need docs, other people's edge cases, or a launch on [Hacker News](https://news.ycombinator.com). It only needs to fit me.

This post is about the setup that makes that work: a base layer that can be bent, agents that do the bending, and what came out of it so far.

## Why now

Making your own tool was always possible. I'm a software engineer, I could always fork something and patch it. But the cost was a weekend, plus maintaining the patch forever. With coding agents, a small change costs a prompt and a few minutes of waiting. That moves the bar a lot.

![Everything that annoys me as bars, biggest first, measured in how much time each one is worth. Only the two biggest clear the old cost, a weekend tinkering with the codebase. Almost all of the long tail of small stuff clears the new cost, a 1-minute prompt whenever the idea comes up: I used to live with it, now it gets fixed.](/images/personal-software-long-tail.svg)

The "forever" part got cheaper too, which I didn't expect. This month I moved from the terminal version of [Herdr](https://herdr.dev), the app I run my agents in, to its new desktop app. I had a pile of customization on the old one: plugins, hooks, and scripts that other scripts depended on. The old me would have stayed put because of that pile. Instead, the agent ported all of it on the same day. So lock-in is weak now, and I can pick the better tool instead of the one I already configured.

## What makes software bendable

Not every piece of software can be bent. An agent works in text: it reads and writes files, runs commands, and reads their output. So software bends well when everything important about it is reachable that way. When I pick a tool now, I check:

- **Config is text.** A file I can read, diff, and keep in git. Not a settings screen backed by some database.
- **There is a CLI or an API.** If the agent can't drive it, the agent can't help me with it.
- **The source is open.** When config is not enough, I can fork it.
- **Changes show up fast.** The agent edits a file, the app reloads, I see the result. Short loop.

GUIs are not banned. But a GUI-only app is a dead end for this. The agent can't look inside it and can't change it, so I'm back to living with the 20%.

## My base layer

Two agents do the bending, and everything else is there because it passes that checklist. Some of them are probably not the best in their category, and that's fine.

![A grid scoring each part of my base layer on the four checks. Omarchy, Herdr and my notes repo pass all four. Ghostty has only a partial CLI. Telegram is a closed app with my own forked bot on top, so it only partly passes on config and forking. A typical GUI-only app passes none.](/images/personal-software-bendability.svg)

**Two agents:** [Claude Code](https://www.claude.com/product/claude-code) and [OpenCode](https://opencode.ai), about $40 a month for both. They read the same repo and the same instructions, so I can switch between them without losing anything. I don't run local models. For hobby use, a subscription is much cheaper than a GPU and the weekends spent on it.

**[Omarchy](https://omarchy.org) on the desktop.** It's [Arch Linux](https://archlinux.org) plus [Hyprland](https://hyprland.org), set up with good opinions. Two weeks ago I wiped Windows 11 off my mini PC for it.

**[Ghostty](https://ghostty.org) as the terminal**, built from the [main branch](https://github.com/ghostty-org/ghostty). It only loses half a point, for not having much of a CLI.

**Herdr to run the agents.** One window, a space per project, a tab per task, a pane per agent. I can see at a glance which agent is working and which one needs me. The agents can also write mods for it, so they extend their own workspace.

**A [git](https://git-scm.com) repo as memory.** Plain markdown: a note per machine and service, a journal, a todo list, and an [`AGENTS.md`](https://agents.md) that tells any agent where things live. Agents forget everything between sessions, so the repo is where they remember things.

**[Telegram](https://telegram.org) for when I'm away from the desk.** It gets its own section below.

## What I bent

Some examples, from tiny to less tiny. Each one exists because the same small annoyance happened one too many times.

- **Tab titles.** A Herdr tab without a name just shows the program, which is useless when every tab runs `claude`. Now a small [mod](https://github.com/adhikasp/herdr-app-mods) names each tab after the agent's own session title.
- **A launcher for everything.** `SUPER+SPACE` searches apps, windows, [Chrome](https://www.google.com/chrome/) tabs and running agents, and does quick math, currency, and time zones. Typing `? something` asks an agent right there, and `Ctrl+O` continues the answer in a new Herdr tab. It started as a fork of [someone else's Omarchy plugin](https://github.com/brianblakely/omarchy-everything) and is now [its own repo](https://github.com/adhikasp/omarchy-everything).
- **Images in the terminal.** I wanted Claude Code to show me an image instead of a file path. That's now a [small plugin](https://github.com/adhikasp/claude-inline-image).
- **My phone's launcher.** [HyperOS](https://www.mi.com/global/hyperos/) turns off gesture navigation when you use a third-party launcher. I [forked](https://github.com/adhikasp/KISS) the [KISS](https://kisslauncher.com) launcher and added the edge gestures back.
- **Screen context.** When I say "this page" or "this video", the agent runs a small tool that reads the focused window, plus the real URL and text of the Chrome tab I'm looking at. I stopped copy-pasting links into chats.
- **Phone context.** A small Android app lets the agent on my desktop read my phone's battery, location and notifications, and, when I turn it on, tap and type on it. I can ask "what was that notification" from my desk.
- **Notes that check themselves.** Notes written mid-task are often a bit wrong. Every night an agent re-checks recent notes against git history and the live machine, and fixes the ones that drifted. Every morning another one reads my mail and calendar and pings me if something needs action.

None of these are products. A few are public because why not, but they're built for my machine, my phone and my habits. If one breaks, there is exactly one user to complain, and he knows who to blame.

My Telegram bot grew way bigger than all of these, so here it is in more detail.

## The bot I never designed

I wanted Claude Code and OpenCode on my phone.

I didn't install [OpenClaw](https://openclaw.ai), the popular "agent you can text". I already have two agents that know my repo, my instructions and my tools. OpenClaw would be a third one, with its own memory, its own plugins, and a pile of features I'd have to trust. I just want the agents I already have to be reachable from my phone.

I also skipped [OpenChamber](https://openchamber.dev) and other apps that put a coding agent in a mobile web UI. I tried that already, with a web UI that mirrored my desktop sessions. On a phone it's just a tiny desktop, and reading diffs and tool calls on a phone screen is not fun.

So I went with a chat app. I don't need to watch every turn anymore. I send a task, put the phone away, and read the result later. For a real diff, I walk to the desk.

Claude Code already has an official [Telegram plugin](https://github.com/anthropics/claude-plugins-official/tree/main/external_plugins/telegram) for its [channels](https://code.claude.com/docs/en/channels) feature: one bot, one session. I set it up on a Saturday morning. By Sunday afternoon it looked like this, and I never planned any of it.

![A timeline of five messages over 29 hours, each next to the shape of the bot after it. Saturday 11:11, I ask for an always-on Claude session on Telegram: one bot, one session. 17:55, I send a screenshot and ask if it can handle topics: forked two minutes later, topics in, still one session. 18:27, I ask for an isolated session per topic: by 18:38 a router gives each topic its own session. Sunday 15:31, "Rewrite to rust if needed. I heard it high perf and safe": by 15:51 each session's link drops from 55 MB to 2 MB. 16:01, the agent says it would say no to rewriting the router and I say go ahead: by 16:09 the Rust router uses 6 MB instead of 60. The plugin goes from 475 MB across 10 Bun processes to about 19 MB.](/images/personal-software-telegram-shape.svg)

Every step started as a message, most of them typed into the bot itself. [Topics](https://core.telegram.org/api/forum) came from a screenshot I happened to see. The Rust rewrite came from idly asking how much memory my sessions used, and finding out each one ran its own copy of the plugin. Why Rust? Honestly, because I heard it's fast and safe. That was the whole engineering decision.

The agent's "no" was fair. The router was about 1,500 lines of TypeScript that already worked. It did the rewrite anyway, passed the same 20 end-to-end tests, and at some point killed its own Telegram connection by accident and went quiet for a minute. I never left the chat.

I never wrote a design for this bot. It grew out of a lot of "can it do this?" messages, some of them sent on a whim. It kept changing the same way after that weekend: either agent can answer a topic now, voice notes get transcribed, idle sessions close and come back on the next message, and my wife uses it from our family group chat.

## What it costs

Of course this is not free. For the agents to bend my setup, I have to give them a lot of access: a shell on my machine, my mail and calendar, my screen, my phone. I need to trust that they do the right thing when I'm not watching. I also need to trust the company behind the model: that Anthropic actually follows its own [terms](https://www.anthropic.com/legal/consumer-terms) about my data, and that it doesn't get breached.

That sounds like a lot, until I remember I was already doing it.

![A grid of who I trust, with two columns: holds my stuff, and acts as me. Gmail has my email, Chrome my saved passwords, LastPass had my passwords until the breach, and Vaultwarden has them now, so that's me. None of them act as me. The last row, Claude Code and OpenCode with a shell on my machine, does both.](/images/personal-software-trust.svg)

LastPass [did get breached](https://blog.lastpass.com/posts/notice-of-recent-security-incident), so these days my passwords live in a [Vaultwarden](https://github.com/dani-garcia/vaultwarden) I host myself. Which mostly means I now trust myself instead.

The only way to trust nothing is to live in the middle of a desert with no internet. But then you couldn't read this. So, what did you trust to open this page? Your browser, your OS, your ISP, a DNS resolver, the certificate authority behind the padlock, Cloudflare sitting in front of this blog, and me, that this page only does what it looks like it does. (It also loads fonts from Google and one analytics script. You trusted those too.) You probably didn't think about any of them.

So I will always end up trusting someone. What changes with agents is they can also act as me, and for that I'm trusting the people who build the model. Anthropic has whole teams on [alignment](https://www.anthropic.com/research/team/alignment) and [interpretability](https://www.anthropic.com/research/team/interpretability), and I'm betting their work holds up, and that these models, in the end, stay aligned with human interests.

Some things do worry me. Anthropic's own research found that as few as [250 poisoned documents](https://www.anthropic.com/research/small-samples-poison) in the training data can plant a backdoor in a model, whatever its size. And with open-weight models, a technique called [abliteration](https://huggingface.co/blog/mlabonne/abliteration) can strip out a model's refusals without any retraining. Alignment is not exactly a solved problem.

But if it goes wrong at that level, humanity is doomed anyway. So honestly, I'd rather see it happen first in my own stack. At least I'd get a head start on survival prep.

## If you want to try this

You don't need to copy my stack. Pick tools that pass the checklist, keep your notes in a git repo with an `AGENTS.md`. Then the next time something annoys you, before searching for a new tool, ask the agent to change the one you have.

Start small. A tab title. A keybinding. A script that saves you three clicks. Then keep asking, the way I did with the bot. It adds up surprisingly fast.

I think personal software is the future. Most people won't write code for it, they will just ask an agent. Fitting software to one person is finally cheap enough to do for the small things, and the small things are most of what I touch all day.

## Next

This is part 1 of a short series about my setup. Part 2 is the homelab under all of this: five machines, two countries, and only one public door. Part 3 is the desktop itself: a 55-inch TV as a monitor, a paper-and-ink theme, and that launcher.
