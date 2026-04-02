---
title: 本地服务器
description: 在本地启动 LangGraph 服务
---

# 本地服务器

## 启动本地服务

```bash
npm install @langchain/langgraph @langchain/core express
```

```typescript
// src/server.ts
import express from "express";
import { graph } from "./graphs/chat";

const app = express();
app.use(express.json());

app.post("/invoke", async (req, res) => {
  const result = await graph.invoke(req.body);
  res.json(result);
});

app.post("/stream", async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  const stream = await graph.stream(req.body);
  for await (const chunk of stream) {
    res.write(`data: ${JSON.stringify(chunk)}\n\n`);
  }
  res.end();
});

app.listen(3000, () => console.log("LangGraph 服务已启动：http://localhost:3000"));
```

## 下一步

- [应用结构](/langgraph/application-structure)
- [部署](/langgraph/deployment)
