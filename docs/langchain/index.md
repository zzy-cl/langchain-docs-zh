---
title: LangChain 概览
description: LangChain 是一个开源 Agent 开发框架，提供预置架构和丰富的模型/工具集成
---

# LangChain 概览

## 这是什么？

LangChain 是一个**开源 Agent 开发框架**，提供预置的 Agent 架构和丰富的模型/工具集成，让你快速构建自定义 Agent。

## 核心能力

| 能力 | 说明 |
|------|------|
| **Agent** | 预置的 Agent 循环（工具调用 → 执行 → 返回） |
| **Models** | 统一接口对接 OpenAI、Anthropic、Google 等 |
| **Tools** | 让 Agent 能调用外部 API、搜索、计算等 |
| **Prompts** | 模板化管理提示词 |
| **Chains** | 把多个步骤串成流水线 |
| **Memory** | 短期 + 长期记忆 |
| **Retrieval** | RAG 检索增强生成 |
| **Middleware** | 控制和自定义 Agent 执行流程 |

## 安装

```bash
npm install langchain @langchain/core
```

## 最简示例

```typescript
import { createAgent, tool } from "langchain";
import { z } from "zod";

const getWeather = tool(
  ({ city }) => `今天${city}晴天，25°C`,
  {
    name: "get_weather",
    description: "查询天气",
    schema: z.object({ city: z.string() }),
  }
);

const agent = createAgent({
  model: "openai:gpt-4o",
  tools: [getWeather],
});

const result = await agent.invoke({
  messages: [{ role: "user", content: "北京天气？" }],
});
```

## 与 Deep Agents / LangGraph 的关系

```
Deep Agents = LangChain + LangGraph + 内置能力
```

- 需要快速上手 → 用 [Deep Agents](/deepagents/)
- 需要自定义 → 用 **LangChain**（当前页）
- 需要底层控制 → 用 [LangGraph](/langgraph/)

## 下一步

- [设计哲学](/langchain/philosophy)
- [安装](/langchain/install)
- [创建 Agent](/langchain/agents/creation)
