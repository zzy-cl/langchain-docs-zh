---
title: 工具（Tools）
description: 为 Deep Agent 添加工具，让它能执行外部操作
---

# 工具（Tools）

## 这是什么？

工具是 Agent 与外部世界交互的方式。Agent 不能直接查天气、搜网页、读数据库——**工具帮它做到这些**。

## 创建工具

```typescript
import { tool } from "langchain";
import { z } from "zod";

const getWeather = tool(
  ({ city }) => `今天${city}晴天，25°C`,
  {
    name: "get_weather",
    description: "查询指定城市的天气",  // ① 描述要清晰，Agent 靠这个决定要不要调用
    schema: z.object({ city: z.string() }),  // ② 用 zod 定义参数类型
  }
);
```

## 使用工具

```typescript
import { createDeepAgent } from "deepagents";

const agent = createDeepAgent({
  tools: [getWeather],  // 传入工具数组
  system: "你是一个天气助手",
});
```

## 异步工具

```typescript
const searchWeb = tool(
  async ({ query }) => {
    const response = await fetch(`https://api.example.com/search?q=${query}`);
    const data = await response.json();
    return data.results;
  },
  {
    name: "search_web",
    description: "搜索互联网",
    schema: z.object({ query: z.string() }),
  }
);
```

## ⚠️ 常见踩坑

- **描述太模糊** → Agent 不知道什么时候该调用。描述要具体，比如 "查询天气" 而不是 "获取信息"
- **schema 类型错** → 用 zod 严格定义，别用 `any`
- **工具报错没处理** → Agent 会把错误信息返回给用户，记得 try/catch

## 下一步

- [子 Agent](/deepagents/subagents)
- [中间件](/langchain/middleware)
