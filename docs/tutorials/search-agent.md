---
title: 构建能搜索的 Agent
description: 一个能搜索网页并总结的 Agent
---

# 构建能搜索的 Agent

## 目标

构建一个能搜索网页、阅读内容、总结答案的 Agent。

## 实现

```typescript
import { createAgent, tool } from "langchain";
import { z } from "zod";

// ① 搜索工具
const search = tool(
  async ({ query }) => {
    // 实际项目中接入搜索 API（Google、Bing 等）
    return `搜索"${query}"的结果：LangChain 是一个 Agent 开发框架...`;
  },
  {
    name: "search",
    description: "搜索互联网",
    schema: z.object({ query: z.string() }),
  }
);

// ② 读网页工具
const fetchPage = tool(
  async ({ url }) => {
    const response = await fetch(url);
    return await response.text();
  },
  {
    name: "fetch_page",
    description: "获取网页内容",
    schema: z.object({ url: z.string() }),
  }
);

// ③ 创建 Agent
const agent = createAgent({
  model: "openai:gpt-4o",
  tools: [search, fetchPage],
  system: `你是一个搜索助手。
流程：
1. 搜索用户的问题
2. 如果需要深入了解，读取相关网页
3. 用简洁的语言总结答案`,
});

// ④ 使用
const result = await agent.invoke({
  messages: [{ role: "user", content: "2024年最火的 AI 框架是什么？" }],
});
```

## 下一步

- [工具](/langchain/tools)
- [多 Agent 协作](/tutorials/multi-agent)
