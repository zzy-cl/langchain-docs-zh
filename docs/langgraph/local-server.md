---
title: 本地服务器
description: 在本地启动 LangGraph 服务，方便开发调试
---

# 本地服务器

## 这是什么？

本地服务器 = 在你电脑上跑一个 HTTP 服务，让 LangGraph 应用可以通过 API 调用。开发阶段用它来测试和调试，不用每次部署到远程服务器。

```mermaid
graph LR
    CLIENT["🖥️ 前端 / curl"] --> SERVER["🟢 Express 服务<br/>localhost:3000"]
    SERVER --> GRAPH["📊 LangGraph"]
    GRAPH --> LLM["🤖 LLM"]

    style CLIENT fill:#3b82f6,color:#fff
    style SERVER fill:#22c55e,color:#fff
    style GRAPH fill:#f59e0b,color:#000
    style LLM fill:#8b5cf6,color:#fff
```

## 快速启动

### 1. 安装依赖

```bash
npm install @langchain/langgraph @langchain/core @langchain/openai express
npm install -D typescript @types/express tsx
```

### 2. 创建服务

```typescript
// src/server.ts
import express from "express";
import { StateGraph, Annotation, START, END } from "@langchain/langgraph";
import { ChatOpenAI } from "@langchain/openai";

// 定义状态
const StateAnnotation = Annotation.Root({
  messages: Annotation<any[]>({
    reducer: (x, y) => x.concat(y),
    default: () => [],
  }),
});

// 构建图
const model = new ChatOpenAI({ model: "gpt-4o" });

const graph = new StateGraph(StateAnnotation)
  .addNode("agent", async (state) => {
    const response = await model.invoke(state.messages);
    return { messages: [response] };
  })
  .addEdge(START, "agent")
  .addEdge("agent", END)
  .compile();

// 创建 Express 服务
const app = express();
app.use(express.json());

// 普通调用接口
app.post("/invoke", async (req, res) => {
  try {
    const result = await graph.invoke({
      messages: [{ role: "user", content: req.body.message }],
    });
    res.json({
      reply: result.messages.at(-1)?.content,
      messages: result.messages,
    });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

// 流式调用接口（SSE）
app.post("/stream", async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  try {
    const stream = await graph.stream({
      messages: [{ role: "user", content: req.body.message }],
    });

    for await (const chunk of stream) {
      res.write(`data: ${JSON.stringify(chunk)}\n\n`);
    }
    res.write("data: [DONE]\n\n");
  } catch (error) {
    res.write(`data: ${JSON.stringify({ error: String(error) })}\n\n`);
  }
  res.end();
});

// 健康检查
app.get("/health", (_, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// 启动
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 LangGraph 服务已启动：http://localhost:${PORT}`);
  console.log(`📝 调用: POST http://localhost:${PORT}/invoke`);
  console.log(`📡 流式: POST http://localhost:${PORT}/stream`);
});
```

### 3. 运行

```bash
# 用 tsx 直接运行 TypeScript
npx tsx src/server.ts

# 或者先编译再运行
npx tsc && node dist/server.js
```

### 4. 测试

```bash
# 普通调用
curl -X POST http://localhost:3000/invoke \
  -H "Content-Type: application/json" \
  -d '{"message": "你好"}'

# 流式调用
curl -X POST http://localhost:3000/stream \
  -H "Content-Type: application/json" \
  -d '{"message": "你好"}'
```

## 目录结构

```
my-langgraph-app/
├── src/
│   ├── server.ts          # HTTP 服务入口
│   ├── graphs/
│   │   └── chat.ts        # 图定义
│   └── nodes/
│       └── agent.ts       # 节点实现
├── .env                   # 环境变量
├── package.json
└── tsconfig.json
```

## 开发技巧

### 热重载

```bash
# 安装 nodemon
npm install -D nodemon

# 添加到 package.json scripts
{
  "scripts": {
    "dev": "nodemon --exec npx tsx src/server.ts --watch src"
  }
}
```

### 调试

```bash
# VS Code launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug LangGraph",
      "program": "${workspaceFolder}/src/server.ts",
      "runtimeArgs": ["-r", "tsx/cjs"]
    }
  ]
}
```

## 常见问题

| 问题 | 解决方案 |
|------|----------|
| 端口被占用 | 换端口：`PORT=3001 npx tsx src/server.ts` |
| TypeScript 报错 | 确认安装了 `@types/express` |
| 流式不输出 | 检查响应头是否设置了 `text/event-stream` |
| 请求超时 | 设置 Express 的超时时间：`server.timeout = 60000` |

## 下一步

- [部署](/langgraph/deployment) — 部署到生产环境
- [应用结构](/langgraph/application-structure) — 推荐的项目结构
- [流式输出](/langgraph/streaming) — 流式输出详解
