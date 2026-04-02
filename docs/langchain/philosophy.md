---
title: 设计哲学
description: LangChain 的设计理念和核心原则
---

# 设计哲学

## 核心理念

> **LangChain 要做 LLM 应用开发中最容易上手的地方，同时兼顾灵活性和生产就绪。**

## 三个原则

### 1. 模块化（Modular）

每个功能都是独立的模块，按需引入，不用的不装。

```bash
# 只装核心
npm install @langchain/core

# 需要 OpenAI 集成
npm install @langchain/openai

# 需要 Agent 功能
npm install langchain
```

### 2. 可组合（Composable）

模块之间可以自由组合——模型 + 工具 + 记忆 + 检索，想怎么拼就怎么拼。

### 3. 生产就绪（Production-Ready）

不只是玩具——支持流式输出、持久化、错误恢复、可观测性，能直接上生产。

## 下一步

- [安装](/langchain/install)
- [组件架构](/langchain/component-architecture)
