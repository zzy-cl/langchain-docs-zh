---
title: 异步子 Agent
description: 后台运行子 Agent，主 Agent 继续和用户交互
---

# 异步子 Agent

## 这是什么？

普通子 Agent：主 Agent 等它干完才能继续 → **同步阻塞**
异步子 Agent：主 Agent 派出去就不管了，继续干别的 → **后台执行**

## 类比

> 普通子 Agent = 你打电话等对方接
> 异步子 Agent = 你发个短信，对方稍后回复

## 使用方式

```typescript
import { createDeepAgent, createAsyncSubagent } from "deepagents";

// ① 创建异步子 Agent
const backgroundResearcher = createAsyncSubagent({
  name: "researcher",
  description: "后台研究任务，完成后汇报结果",
  tools: [searchWeb, readDocument],
  system: "你是一个研究专家，深入分析后汇报。",
});

// ② 主 Agent 派出后继续交互
const agent = createDeepAgent({
  tools: [backgroundResearcher],
  system: "你是一个助手。需要深入研究时，派 researcher 后台处理。",
});
```

## 适用场景

- 长时间研究任务（搜索 + 分析 + 总结）
- 数据处理（下载 → 清洗 → 分析）
- 内容生成（写文章需要时间，不想让用户干等）

## 下一步

- [子 Agent](/deepagents/subagents)
- [流式输出](/deepagents/streaming)
