---
title: "Smolagents"
date: 2025-02-11T18:40:07+07:00
type: "link-blog"
link: "https://github.com/huggingface/smolagents"
tags: ["llm", "agents", "huggingface"]
---

The next iteration of agents?

LLM + function calling + ReACT is the usual way. But it can only call predefined functions with predefined arguments.

But smollagents do the function calling as part of `code` exection. It have Python runtime as part of the agent chain of thoughts.

So it can call and compose the functions, do iteration, and pass larger amount of data between call (pass the whole pandas dataframe, for example).
