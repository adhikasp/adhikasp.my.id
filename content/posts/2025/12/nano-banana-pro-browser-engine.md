---
title: "Using Nano Banana Pro as 'Browser Engine'"
date: 2025-12-06T12:00:00+07:00
description: "An experiment comparing Nano Banana Pro's rendering capabilities against a real browser using a convenience store web profile."
tags:
  - "experiment"
  - "llm"
toc: true
images:
  - "/images/nano-banana-pro-render.png"
---

Randomly I am thinking can we use the Google new [**Nano Banana Pro**](https://blog.google/technology/ai/nano-banana-pro/) model as a "browser engine"? The goal was to see how it handles rendering a standard HTML page compared to a modern web browser.

## The Setup

I asked ChatGPT 5.1 Thinking to create it with this prompt

```
Create a html for a mock business profile landing page 
about independently owned convenience store. It should
be 1 file contain all the html js css
```

It happily produce 1700 line length HTML page for it. You can view the [full page here](/demos/nano-banana-pro-mock-page.html).

## The Comparison

I rendered the same HTML script on both the Nano Banana Pro and a standard real browser. Here are the results.

### 1. Nano Banana Pro Output

This is how the page looks when rendered by the Nano Banana Pro:

![Figure 1: Rendered result on Nano Banana Pro](/images/nano-banana-pro-render.png)

### 2. Real Browser Output

For comparison, here is the same page rendered in a real browser:

![Figure 2: Rendered result on a Real Browser](/images/real-browser-render.png)

## Observations

The result is pretty interesting. 

It got the broad layout correctly. The navbar, hero section that split between the main message and cards. The header content is correct.

Though finer detail is wrong. The logo and branded store name is diffferent, albeit I think it is much nicer IMO. Finer detail in button like telephone icon and arrow is missing. The background color is just hallucinated (again though, much nicer).

I guess using language model as browser engine obviously not an accurate rendering method right now. And with ~0.25 USD per image, also way way very expensive. But it is interesting that the Nano Banana Pro can produce pretty accurate and in some case improve the original layout!
