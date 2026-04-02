---
title: Deep Agents 快速开始
description: 几分钟内创建你的第一个 Deep Agent
---

# Deep Agents 快速开始

## 安装

```bash
npm install deepagents @langchain/core zod
```

## 创建你的第一个 Agent

```typescript
import { createDeepAgent } from "deepagents";
import { tool } from "langchain";
import { z } from "zod";

// ① 定义工具
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

## 配置模型

```typescript
const agent = createDeepAgent({
  model: "anthropic:claude-sonnet-4-20250514", // 或 "openai:gpt-4o"
  tools: [getWeather],
  system: "你是一个天气查询助手",
});
```

## 流式输出

```typescript
const agent = createDeepAgent({
  tools: [getWeather],
  system: "你是一个天气查询助手",
});

const stream = await agent.stream({
  messages: [{ role: "user", content: "北京天气？" }],
});

for await (const chunk of stream) {
  console.log(chunk);
}
```

## 下一步

- [创建 Agent](/deepagents/creation)
- [工具（Tools）](/deepagents/tools)
- [子 Agent](/deepagents/subagents)
