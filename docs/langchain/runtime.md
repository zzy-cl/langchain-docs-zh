---
title: 运行时（Runtime）
description: LangChain 的运行时环境和执行模型
---

# 运行时（Runtime）

## 这是什么？

LangChain 的"执行引擎"——负责管理 Agent 的生命周期、状态流转和错误处理。

## 核心概念

| 概念 | 说明 |
|------|------|
| **Invoke** | 同步调用，等结果返回 |
| **Stream** | 流式调用，边执行边返回 |
| **Batch** | 批量调用，一次处理多个请求 |

## 执行模式

```typescript
// ① 同步调用
const result = await agent.invoke({
  messages: [{ role: "user", content: "你好" }],
});

// ② 流式调用
const stream = await agent.stream({
  messages: [{ role: "user", content: "你好" }],
});
for await (const chunk of stream) {
  console.log(chunk);
}

// ③ 批量调用
const results = await agent.batch([
  { messages: [{ role: "user", content: "问题1" }] },
  { messages: [{ role: "user", content: "问题2" }] },
]);
```

## 下一步

- [创建 Agent](/langchain/agents/creation)
- [流式输出](/langchain/agents/streaming)
