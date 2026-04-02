---
title: 流式输出
description: 实时获取 Agent 的输出
---

# 流式输出

## 基本用法

```typescript
const agent = createAgent({
  model: "openai:gpt-4o",
  tools: [getWeather],
});

const stream = await agent.stream({
  messages: [{ role: "user", content: "北京天气？" }],
});

for await (const chunk of stream) {
  if (chunk.type === "text") {
    process.stdout.write(chunk.content);
  }
}
```

## 流式事件类型

| 类型 | 说明 |
|------|------|
| `text` | Agent 的文本输出 |
| `tool_call` | Agent 正在调用工具 |
| `tool_result` | 工具返回结果 |
| `done` | 全部完成 |

## 在 Express 中使用

```typescript
import express from "express";

const app = express();

app.post("/chat", async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const stream = await agent.stream({
    messages: [{ role: "user", content: req.body.message }],
  });

  for await (const chunk of stream) {
    res.write(`data: ${JSON.stringify(chunk)}\n\n`);
  }

  res.end();
});
```

## 下一步

- [创建 Agent](/langchain/agents/creation)
- [Deep Agents 流式输出](/deepagents/streaming)
