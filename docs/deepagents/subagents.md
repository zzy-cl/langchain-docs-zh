---
title: 子 Agent（Subagents）
description: 让主 Agent 派生子 Agent 来处理专门任务
---

# 子 Agent（Subagents）

## 这是什么？

主 Agent 太忙了？派一个小弟去干专门的活。

子 Agent 是主 Agent 的"分身"——它有自己的工具、自己的上下文，干完活把结果汇报给主 Agent。

## 为什么用它？

| 场景 | 好处 |
|------|------|
| 复杂任务拆分 | 搜索 Agent 专门搜，写作 Agent 专门写 |
| 上下文隔离 | 子 Agent 的对话不会污染主 Agent 的上下文 |
| 并行处理 | 多个子 Agent 同时干活 |

## 使用方式

```typescript
import { createDeepAgent, createSubagent } from "deepagents";
import { tool } from "langchain";
import { z } from "zod";

// ① 创建一个专门做搜索的子 Agent
const searchAgent = createSubagent({
  name: "searcher",
  description: "搜索专家，擅长从互联网找到相关信息",
  tools: [searchWeb],
  system: "你是一个搜索专家，找到信息后用简洁的语言总结。",
});

// ② 主 Agent 把搜索任务派给子 Agent
const agent = createDeepAgent({
  tools: [searchAgent],
  system: "你是一个研究助手。需要搜索时，派 searcher 去做。",
});
```

## 下一步

- [异步子 Agent](/deepagents/async-subagents)
- [上下文工程](/deepagents/context-engineering)
