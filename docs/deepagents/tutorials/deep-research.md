---
title: 构建深度研究 Agent
description: 用 Deep Agents 构建一个多步骤深度研究 Agent
---

# 构建深度研究 Agent

## 目标

构建一个能做深度研究的 Agent：
1. 分析问题，拆成子问题
2. 派子 Agent 并行搜索
3. 汇总结果，生成研究报告

## 实现

```typescript
import { createDeepAgent, createSubagent } from "deepagents";
import { tool } from "langchain";
import { z } from "zod";

// ① 搜索工具
const webSearch = tool(
  async ({ query }) => `搜索"${query}"的结果...`,
  {
    name: "web_search",
    description: "搜索互联网",
    schema: z.object({ query: z.string() }),
  }
);

// ② 专门做搜索的子 Agent
const searcher = createSubagent({
  name: "searcher",
  description: "搜索专家，深入搜索某个子话题",
  tools: [webSearch],
  system: "你是一个搜索专家。搜索后用简洁的语言总结关键信息。",
});

// ③ 主 Agent：规划 + 派子 Agent + 汇总
const researcher = createDeepAgent({
  tools: [searcher, webSearch],
  system: `你是一个深度研究助手。
流程：
1. 分析问题，拆成 3-5 个子问题
2. 派 searcher 去搜索每个子问题
3. 汇总所有搜索结果
4. 生成结构化的研究报告`,
});

// ④ 调用
const result = await researcher.invoke({
  messages: [{ role: "user", content: "2024年 AI Agent 领域的主要趋势是什么？" }],
});
```

## 下一步

- [子 Agent](/deepagents/subagents)
- [构建内容写作 Agent](/deepagents/tutorials/content-builder)
