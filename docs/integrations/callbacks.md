---
title: 回调集成
description: 用回调监听 Agent 的执行过程
---

# 回调集成

## 这是什么？

回调 = Agent 执行过程中触发的"通知"。你可以监听各种事件，做日志、监控、分析。

## 回调事件

| 事件 | 触发时机 |
|------|----------|
| `handleLLMStart` | 模型开始调用 |
| `handleLLMEnd` | 模型调用结束 |
| `handleToolStart` | 工具开始执行 |
| `handleToolEnd` | 工具执行结束 |
| `handleChainStart` | 链开始执行 |
| `handleChainEnd` | 链执行结束 |

## 使用方式

```typescript
import { BaseCallbackHandler } from "@langchain/core/callbacks/base";

const logger = BaseCallbackHandler.fromMethods({
  handleLLMStart: (llm, prompts) => {
    console.log("模型调用开始：", prompts);
  },
  handleLLMEnd: (output) => {
    console.log("模型调用结束：", output.generations);
  },
});

const agent = createAgent({
  model: "openai:gpt-4o",
  callbacks: [logger],
});
```

## 下一步

- [可观测性](/langchain/observability)
