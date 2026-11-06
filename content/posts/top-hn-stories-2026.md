---
title: "The top Hacker News story of every day, 2007 to 2026"
date: 2026-11-06T12:00:00+08:00
description: "I took the single highest-scored story from each of 7,177 days of Hacker News. The typical top story doubled in points over a decade, the biggest days are mostly deaths and outages, and a quarter of today's are about AI."
tags:
  - "hackernews"
  - "data"
  - "visualization"
  - "agent-generated"
toc: true
images:
  - "/images/top-hn-scatter.svg"
---

Two years ago I made a small page called *Top HN Stories*. It was a scatter plot: one dot per day, the day's highest-scored Hacker News story, click a dot to open the thread. I liked it, and then the data behind it stopped in November 2024 and it just sat there.

This week I [revived my HN dataset](/posts/ai-shift-on-hacker-news/), so I rebuilt the whole thing with fresh data. This post replaces the old page. Same idea, now from February 2007 to 4 November 2026, with some numbers I did not look at the first time.

## All 7,177 days in one picture

![Score of the top HN story of each day, 2007 to 2026](/images/top-hn-scatter.svg)

Each dot is one day. The height is how many points that day's best story got. Orange dots are stories with AI in the title (more on that below), the black line is the median of each year.

Some things stand out:

- **It grew fast, then went flat, then grew again.** The median top story had about 478 points in 2011 and 1,038 in 2021. Then it sat at roughly 920 to 960 for three years (2022 to 2024). In 2025 it went to 1,076 and in 2026 to 1,275, the highest ever.
- **Spikes are news, not tech.** The highest days are almost never a clever project. They are somebody dying or something breaking.
- **The floor moved up too.** In 2008 the best day of the whole year had 532 points. In 2026 there were 40 days where the top story crossed 2,000 points. The previous record was 29, in 2020.

## The biggest days ever

| Points | Date | Story |
|---:|---|---|
| 6,015 | 2018-03-14 | [Stephen Hawking has died](https://news.ycombinator.com/item?id=16582136) |
| 5,771 | 2016-02-17 | [A Message to Our Customers](https://news.ycombinator.com/item?id=11116274) (Apple vs the FBI) |
| 5,710 | 2023-11-18 | [OpenAI's board has fired Sam Altman](https://news.ycombinator.com/item?id=38309611) |
| 4,549 | 2024-03-29 | [Backdoor in upstream xz/liblzma leading to SSH server compromise](https://news.ycombinator.com/item?id=39865810) |
| 4,405 | 2024-07-19 | [CrowdStrike Update: Windows Bluescreen and Boot Loops](https://news.ycombinator.com/item?id=41002195) |
| 4,338 | 2011-10-06 | [Steve Jobs has passed away](https://news.ycombinator.com/item?id=3078128) |
| 4,310 | 2023-08-05 | [Bram Moolenaar has died](https://news.ycombinator.com/item?id=37011324) |
| 4,298 | 2022-05-04 | [Mechanical Watch](https://news.ycombinator.com/item?id=31261533) |
| 4,240 | 2020-10-24 | [YouTube-dl has received a DMCA takedown from RIAA](https://news.ycombinator.com/item?id=24872911) |
| 4,229 | 2026-03-12 | [Don't post generated/AI-edited comments. HN is for conversation between humans](https://news.ycombinator.com/item?id=47340079) |

Eight out of ten are deaths, outages, security incidents, legal fights or a company doing something drastic. Only one is a pure "look at this beautiful thing", and it is [Bartosz Ciechanowski](https://ciechanow.ski/)'s *Mechanical Watch*. His *Moon* was the best story of December 2024 (3,115 points). If you want to see what a top-tier explainer looks like, start there.

The 2026 entry is HN's own guideline against AI-generated comments. The site that talks about AI the most spent its best day of the year on keeping AI out of its own comment section. I find that funny and a bit telling.

## The best story of each year

A year is a long time, so here is the winner of each one.

| Year | Points | Story |
|---|---:|---|
| 2011 | 4,338 | [Steve Jobs has passed away](https://news.ycombinator.com/item?id=3078128) |
| 2012 | 3,531 | [Show HN: This up votes itself](https://news.ycombinator.com/item?id=3742902) |
| 2013 | 2,744 | [Don't Fly During Ramadan](https://news.ycombinator.com/item?id=6258422) |
| 2014 | 3,086 | [Tim Cook Speaks Up](https://news.ycombinator.com/item?id=8532261) |
| 2015 | 2,228 | [G is for Google](https://news.ycombinator.com/item?id=10037157) |
| 2016 | 5,771 | [A Message to Our Customers](https://news.ycombinator.com/item?id=11116274) |
| 2017 | 4,107 | [Reflecting on one very, very strange year at Uber](https://news.ycombinator.com/item?id=13682022) |
| 2018 | 6,015 | [Stephen Hawking has died](https://news.ycombinator.com/item?id=16582136) |
| 2019 | 3,287 | [Switch from Chrome to Firefox](https://news.ycombinator.com/item?id=20052623) |
| 2020 | 4,240 | [YouTube-dl has received a DMCA takedown from RIAA](https://news.ycombinator.com/item?id=24872911) |
| 2021 | 4,103 | [Google's copying of the Java SE API was fair use](https://news.ycombinator.com/item?id=26699106) |
| 2022 | 4,298 | [Mechanical Watch](https://news.ycombinator.com/item?id=31261533) |
| 2023 | 5,710 | [OpenAI's board has fired Sam Altman](https://news.ycombinator.com/item?id=38309611) |
| 2024 | 4,549 | [Backdoor in upstream xz/liblzma](https://news.ycombinator.com/item?id=39865810) |
| 2025 | 3,406 | [Slack has raised our charges by $195k per year](https://news.ycombinator.com/item?id=45283887) |
| 2026 | 4,229 | [Don't post generated/AI-edited comments](https://news.ycombinator.com/item?id=47340079) |

The 2012 one is a nice surprise. The link of *"This up votes itself"* is the HN upvote URL of the story itself, so everyone who clicked it voted for it. It reached 3,531 points and is the best story of its year. A very HN joke: show the ranking can be played, and the crowd upvotes the demonstration.

Also in 2026 so far: *Ghostty is leaving GitHub* (3,521, April), a Show HN about replacing a $120k bowling center system with $1,600 in ESP32s (2,935, July), and *Patrick Stewart has died* (3,310, last week).

## It is a quarter AI now

I use the same crude keyword match from the [AI post](/posts/ai-shift-on-hacker-news/) (AI, LLM, GPT, OpenAI, Anthropic, Claude, Gemini, agents, MCP, and some more, listed at the bottom). This time I only look at the top story of each day.

![Share of days where the top story is about AI](/images/top-hn-ai-share.svg)

- **2015 to 2021: 0.6% to 2.7%.** A few ML stories a year. The 2016 bump is machine learning and deep learning content (a TPU chip, a neural network you can tinker with in the browser, free courses), not chatbots.
- **2022: 3.6%.** Image generators (Stable Diffusion, Imagen), Whisper, and the first ChatGPT weeks in December.
- **2023: 13.5%.** The year the jump happened.
- **2024: 11.8%.** A small cool-down, the only year that went down.
- **2025: 17.3%.**
- **2026: 25.0%.** 77 of 308 days so far. One day in four, the best story on HN is about AI.

This matches the all-stories number from my previous post (about one in four), which is reassuring. It is a different slice of the data: that was every story, this is only the winner of each day.

## Small things I noticed

**Comments grew even more than points.** The median top story had 372 comments in 2024 and 610 in 2026. People do not only upvote now, they argue. The most-commented top story of any day is *Trump wins presidency for second time* (2024-11-06, 9,053 comments), and the runner-up is the Zelensky White House meeting (5,034).

**Weekends are quieter.** Since 2023 the average top story gets about 1,300 points on a Thursday and about 960 on a Sunday. Fewer people are online, the competition is weaker, and the winner is smaller.

**GitHub is the number one source.** 239 days (3.3%) had a top story hosted on github.com. Next are twitter.com (136), techcrunch.com (114), nytimes.com (113), and paulgraham.com (88, the founder's own essays).

**Show HN wins about one day in 20.** Around 4% of top stories since 2020 are a "Show HN". It peaked in 2024 at 5.5%. In 2026 it dropped to 2.9%, so there are fewer "look what I built" winners in a year where agents can build almost anything. I do not have a good explanation, my guess is that when making things is cheap, a made thing is less impressive.

## What I take from this

1. **The signal is where the crowd goes in a crisis.** On the biggest days HN works like a group chat for the tech world. Something is on fire, so everyone comes to read and argue.
2. **Inflation is real but it is not just growth.** The median doubled from 2011 to 2021, flattened for three years, then rose again. The second rise lines up with AI taking a quarter of the top spots and with people commenting more.
3. **Top story means something different now.** The old winners were things you could understand in one sentence. The 2026 list includes policy statements, model releases and platform rules. The community is the same size or bigger, but it is arguing about a different set of things.

## How I did this, and what is wrong with it

The data is the public dataset at `hacker-news.adhikasp.my.id`. The core query is one `row_number()`:

```sql
SELECT d, id, title, url, score, descendants FROM (
  SELECT cast(time AS date) AS d, id, title, url, score, descendants,
         row_number() OVER (PARTITION BY cast(time AS date)
                            ORDER BY score DESC, id) AS rn
  FROM read_parquet('year=*/month=*/data.parquet', hive_partitioning = true)
  WHERE type = 'story' AND score IS NOT NULL
    AND coalesce(dead, false) = false AND coalesce(deleted, false) = false
    AND title IS NOT NULL
) WHERE rn = 1 ORDER BY d;
```

Caveats:

- **"Day" is a UTC+7 day.** Timestamps in the dataset are naive UTC+7 (the 2025 files were created that way and I kept it), so a story posted at 18:00 UTC counts for the next calendar day. It does not matter for the trends, but a single story can land one day off.
- **Score is the score when the dataset fetched the item.** Points are the story's total, not how high it ranked, and I did not check how long each one stayed on the front page.
- **One story per day hides everything else.** A day with two giant stories only shows one. It also says nothing about the second-best story of a quiet week.
- **The AI match is by title.** Same keywords as the earlier post, so "agent" or "transformer" can be a false hit. Before 2023 the match rate is about 1 in 100 days or less, which is the noise level. The AI list: `ai, llm(s), gpt, chatgpt, openai, anthropic, claude, gemini, copilot, agent(s), agentic, mcp, deepseek, qwen, mistral, llama, machine learning, neural, diffusion, transformer, large language, generative`.
- **2007 starts in February** (the dataset's first month) and 2026 ends on 4 November, so those two years are partial. The old page also had 10 days from October 2006 that are not in this dataset.

The old interactive page is no longer updated. If you want to click individual dots, the SQL above gives you the exact table; every row has the story id, so the thread is one `https://news.ycombinator.com/item?id=...` away.

Next I want to look at the second layer: not who wins a day, but which stories are on the front page the longest. A story that holds the top 10 for 12 hours is not the same thing as one that spikes and falls.
