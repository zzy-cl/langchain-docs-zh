---
title: 短期记忆
description: 单次会话中的对话记忆
---

# 短期记忆

## 这是什么？

Agent 在**单次对话**中记住之前说过的话。就像你跟朋友聊天，记得上一句说了什么。

## 使用方式

```typescript
import { createAgent } from "langchain";

const agent = createAgent({
  model: "openai:gpt-4o",
  tools: [getWeather],
  memory: {
    type: "short_term",
    maxMessages: 20, // 保留最近 20 条消息
  },
});

// 第一次对话
await agent.invoke({
  messages: [{ role: "user", content: "我叫小明，住在北京" }],
});

// 第二次对话——Agent 记得你是谁
await agent.invoke({
  messages: [{ role: "user", content: "我住的地方天气怎么样？" }],
});
// Agent 知道"我住的地方"是北京
```

## 记忆策略

| 策略 | 说明 | 适用场景 |
|------|------|----------|
| `buffer` | 保留全部消息 | 短对话 |
| `sliding_window` | 只保留最近 N 条 | 长对话 |
| `summary` | 自动压缩成摘要 | 超长对话 |

## 下一步

- [长期记忆](/langchain/long-term-memory)
- [Deep Agents 记忆](/deepagents/memory)
