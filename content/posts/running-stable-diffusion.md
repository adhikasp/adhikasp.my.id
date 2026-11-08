---
title: "Running Stable Diffusion"
description: "Notes on running Stable Diffusion 2.1 locally with diffusers, mamba and xformers, and the setup that worked."
date: 2023-01-08T22:00:00+07:00
draft: true
---

Stable Diffusion

https://huggingface.co/stabilityai/stable-diffusion-2-1

```bash
mamba create -n stable-diffusion diffusers transformers accelerate scipy safetensors xformers -c huggingface -c xformers/label/dev
mamba install -c anaconda cudatoolkit
```