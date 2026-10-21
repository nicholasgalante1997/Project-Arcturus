---
title: KiroCrew OpenACP
date: '2026-09-19'
excerpt: This will be a short piece on how to use kirocrew with claude acp, codex acp, and underlying inference on your own hardware.
tags:
  - kiro-crew
  - acp
image:
  src: /assets/poke-stock/mega-pikachu-gang.jpg
  alt: A lot of very large pikachu's hanging out.
  aspectRatio: 16 / 9
category: SOFTWARE ENGINEERING
subcategory: AI
searchTerms:
  - ACP
  - kirocrew
  - claude
  - codex
  - ollama
readingTime: About 10 minutes
visible: true
featured: true
---

At work, one of the tools we use every day is kirocrew. It supports a series of underlying models from OpenAI and Anthropic, supported by our private AWS bedrock instance.

As I understand it, kiro-crew is an orchestration layer over a series of kiro-et-al subprocesses. I believe it manages a series of kiro-cli processes via agent client protocol (ACP), and can facilitate agent and subagent orchestration, cross session memory, cron jobs, and a couple other things we've all been patching solutions to by hand for a while now. I have grown to like it as a companion to cli based agentic development, and while 
