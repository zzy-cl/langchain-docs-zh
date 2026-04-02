---
title: 流式输出
description: 实时获取 LangGraph 每个节点的执行结果
---

# 流式输出

## 使用方式

```typescript
const app = graph.compile();

const stream = await app.stream({
  messages: [{ role: "user", content: "你好" }],
});

for await (const chunk of stream) {
  // 每个 chunk 是一个节点的输出
  console.log(chunk);
}
```

## 流式事件

```typescript
// values 模式：返回完整状态
const stream = await app.stream(input, { streamMode: "values" });

// updates 模式：只返回状态更新（推荐）
const stream = await app.stream(input, { streamMode: "updates" });

// events 模式：返回所有事件
const stream = await app.streamEvents(input, { version: "v2" });
```

## 下一步

- [LangGraph 概览](/langgraph/)
- [LangChain 流式输出](/langchain/agents/streaming)
