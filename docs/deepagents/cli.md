---
title: Deep Agents CLI
description: 终端编程 Agent，基于 Deep Agents SDK 构建
---

# Deep Agents CLI

## 这是什么？

一个**终端里的编程 Agent**——在命令行里直接和 AI 对话，让它帮你写代码、跑命令、改文件。

## 安装

```bash
npm install -g deepagents-cli
```

## 使用

```bash
# 启动
deepagent

# 直接提问
deepagent "帮我写一个 Express 服务器"

# 指定工作目录
deepagent --cwd ./my-project "重构这个项目的目录结构"
```

## 自定义模型

```bash
# 使用 OpenAI
deepagent --model openai:gpt-4o

# 使用 Anthropic
deepagent --model anthropic:claude-sonnet-4-20250514
```

## 与 ACP 的关系

CLI 底层使用 ACP 协议，也可以接入 IDE 使用。

## 下一步

- [ACP 协议](/deepagents/acp)
- [创建 Agent](/deepagents/creation)
