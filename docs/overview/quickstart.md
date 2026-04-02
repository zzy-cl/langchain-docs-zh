---
title: 快速开始
description: 5 分钟跑通你的第一个 Agent
---

# 快速开始

## 前置条件

- Node.js v18+
- npm
- 一个 LLM API Key（OpenAI / Anthropic 等）

## 方式一：Deep Agents（推荐新手）

```bash
mkdir my-agent && cd my-agent
npm init -y
npm install deepagents @langchain/core zod
```

```typescript
import { createDeepAgent } from "deepagents";
import { tool } from "langchain";
import { z } from "zod";

// ① 创建一个工具
const getWeather = tool(
  ({ city }) => `今天${city}晴天，25°C`,
  {
    name: "get_weather",
    description: "查询指定城市的天气",
    schema: z.object({ city: z.string() }),
  }
);

// ② 创建 Agent
const agent = createDeepAgent({
  tools: [getWeather],
  system: "你是一个天气查询助手",
});

// ③ 调用 Agent
const result = await agent.invoke({
  messages: [{ role: "user", content: "北京天气怎么样？" }],
});

console.log(result);
```

## 方式二：LangChain Agent

```bash
npm install langchain @langchain/openai zod
```

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
  system: "你是一个天气助手",
});

const result = await agent.invoke({
  messages: [{ role: "user", content: "上海天气？" }],
});
```

## 方式三：LangGraph（底层编排）

```bash
npm install @langchain/langgraph @langchain/core
```

详见 [LangGraph 快速开始](/langgraph/quickstart)。

## 下一步

- [Deep Agents 详解](/deepagents/)
- [LangChain 详解](/langchain/)
- [LangGraph 详解](/langgraph/)
