---
title: 流式输出（Streaming）
description: 实时获取 Agent 的输出，不用等全部完成
---

# 流式输出（Streaming）

## 这是什么？

> 不等外卖全部做好再通知你，而是"已接单" → "正在做" → "已出锅" → "已送达"，每个阶段都告诉你。

流式输出让 Agent 边思考边输出，用户能实时看到进度。

## 使用方式

```typescript
const agent = createDeepAgent({
  tools: [getWeather],
  system: "你是一个天气助手",
});

// 流式调用
const stream = await agent.stream({
  messages: [{ role: "user", content: "北京天气？" }],
});

// 逐块接收输出
for await (const chunk of stream) {
  if (chunk.type === "text") {
    process.stdout.write(chunk.content); // 实时打印
  }
}
```

## 流式事件类型

| 类型 | 说明 |
|------|------|
| `text` | Agent 的文本输出 |
| `tool_call` | Agent 正在调用工具 |
| `tool_result` | 工具返回结果 |
| `subagent_start` | 子 Agent 开始执行 |
| `subagent_end` | 子 Agent 执行完成 |
| `done` | 全部完成 |

## 下一步

- [前端集成](/deepagents/frontend)
- [LangChain 流式输出](/langchain/agents/streaming)
