---
title: 多 Agent 协作任务
description: 多个 Agent 分工合作完成复杂任务
---

# 多 Agent 协作任务

## 目标

构建一个研究团队——研究员搜集信息，分析师分析数据，写手生成报告。

## 实现

```typescript
import { createAgent, createHandoff } from "langchain";
import { tool } from "langchain";
import { z } from "zod";

// ① 搜索工具
const search = tool(
  async ({ query }) => `搜索"${query}"的结果...`,
  {
    name: "search",
    description: "搜索互联网",
    schema: z.object({ query: z.string() }),
  }
);

// ② 研究员 Agent
const researcher = createAgent({
  model: "openai:gpt-4o",
  tools: [search],
  system: "你是研究专家，擅长搜索和整理信息。找到关键事实后返回结构化的研究笔记。",
});

// ③ 分析师 Agent
const analyst = createAgent({
  model: "openai:gpt-4o",
  system: "你是数据分析专家，擅长从数据中发现趋势和洞察。",
});

// ④ 写手 Agent
const writer = createAgent({
  model: "openai:gpt-4o",
  system: "你是专业写手，擅长把复杂信息写成通俗易懂的报告。",
});

// ⑤ 项目经理 Agent（路由）
const manager = createAgent({
  model: "openai:gpt-4o",
  handoffs: [
    createHandoff(researcher, { name: "researcher", description: "搜集信息" }),
    createHandoff(analyst, { name: "analyst", description: "分析数据" }),
    createHandoff(writer, { name: "writer", description: "撰写报告" }),
  ],
  system: `你是项目经理。根据任务阶段，派给合适的专家：
1. 先派 researcher 搜集信息
2. 再派 analyst 分析
3. 最后派 writer 写报告`,
});

// ⑥ 执行
const result = await manager.invoke({
  messages: [{ role: "user", content: "帮我研究 2024 年 AI Agent 的发展趋势，写一份报告。" }],
});
```

## 协作流程

```
用户 → Manager → Researcher（搜集）
                       ↓
                   Analyst（分析）
                       ↓
                   Writer（写报告）
                       ↓
                   Manager → 用户
```

## 下一步

- [Multi-Agent](/langchain/multi-agent)
- [客服系统](/langchain/tutorials/customer-support)
