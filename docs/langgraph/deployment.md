---
title: 部署
description: 将 LangGraph 应用部署到生产环境的完整指南
---

# 部署

## 这是什么？

部署 = 把你在本地跑的 LangGraph 应用放到服务器上，让别人也能用。就像把网站从 localhost 发布到互联网。

```mermaid
graph TB
    DEV["💻 本地开发"] --> BUILD["🔨 构建"]
    BUILD --> CHOICE{"部署方式？"}
    CHOICE -->|"最简单"| NODE["🟢 Node.js 服务"]
    CHOICE -->|"推荐"| DOCKER["🐳 Docker"]
    CHOICE -->|"官方托管"| CLOUD["☁️ LangGraph Cloud"]
    CHOICE -->|"自己管理"| SELF["🏠 自托管"]

    style DEV fill:#3b82f6,color:#fff
    style DOCKER fill:#22c55e,color:#fff
    style CLOUD fill:#f59e0b,color:#000
    style SELF fill:#8b5cf6,color:#fff
```

## 部署方式对比

| 方式 | 难度 | 适合场景 | 优缺点 |
|------|------|----------|--------|
| **Node.js 服务** | ⭐ | 原型、小项目 | 最简单，但没有自动扩缩 |
| **Docker** | ⭐⭐ | 团队协作、标准部署 | 环境一致，推荐 |
| **LangGraph Cloud** | ⭐ | 不想管服务器 | 官方托管，最省心 |
| **自托管** | ⭐⭐⭐ | 大型项目、自定义需求 | 灵活，但运维成本高 |

## 方式一：Node.js 直接部署

最简单的部署方式——直接起一个 HTTP 服务：

```typescript
// src/server.ts
import express from "express";
import { graph } from "./graphs/chat";

const app = express();
app.use(express.json());

// 普通调用
app.post("/invoke", async (req, res) => {
  try {
    const result = await graph.invoke({
      messages: [{ role: "user", content: req.body.message }],
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 流式调用
app.post("/stream", async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");

  const stream = await graph.stream({
    messages: [{ role: "user", content: req.body.message }],
  });

  for await (const chunk of stream) {
    res.write(`data: ${JSON.stringify(chunk)}\n\n`);
  }
  res.end();
});

// 健康检查
app.get("/health", (_, res) => res.json({ status: "ok" }));

app.listen(3000, () => {
  console.log("LangGraph 服务已启动：http://localhost:3000");
});
```

## 方式二：Docker 部署（推荐）

### Dockerfile

```dockerfile
FROM node:18-slim

WORKDIR /app

# 安装依赖
COPY package*.json ./
RUN npm ci --production

# 复制代码
COPY . .

# 构建 TypeScript
RUN npx tsc

# 暴露端口
EXPOSE 3000

# 启动
CMD ["node", "dist/server.js"]
```

### 构建和运行

```bash
# 构建镜像
docker build -t my-langgraph-app .

# 运行容器
docker run -d \
  --name langgraph \
  -p 3000:3000 \
  -e OPENAI_API_KEY=sk-xxx \
  -e LANGCHAIN_TRACING_V2=true \
  -e LANGCHAIN_API_KEY=lsv2_xxx \
  my-langgraph-app
```

### docker-compose.yml

```yaml
version: "3.8"
services:
  langgraph:
    build: .
    ports:
      - "3000:3000"
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - LANGCHAIN_TRACING_V2=true
      - LANGCHAIN_API_KEY=${LANGCHAIN_API_KEY}
      - DATABASE_URL=postgresql://postgres:password@db:5432/langgraph
    depends_on:
      - db

  db:
    image: postgres:16
    environment:
      POSTGRES_DB: langgraph
      POSTGRES_PASSWORD: password
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

## 环境变量

```bash
# 必需
OPENAI_API_KEY=sk-xxx

# 可选：可观测性
LANGCHAIN_TRACING_V2=true
LANGCHAIN_API_KEY=lsv2_xxx
LANGCHAIN_PROJECT=my-langgraph-app

# 可选：持久化
DATABASE_URL=postgresql://user:pass@host:5432/dbname
```

## 生产环境检查清单

| 检查项 | 说明 |
|--------|------|
| ✅ API Key 安全 | 用环境变量，不要硬编码 |
| ✅ 开启持久化 | 用 PostgreSQL 存检查点 |
| ✅ 开启追踪 | 用 LangSmith 监控 |
| ✅ 设置超时 | 防止请求卡死 |
| ✅ 错误处理 | 所有接口都要 try/catch |
| ✅ 健康检查 | 提供 `/health` 端点 |
| ✅ 限流 | 防止被刷爆 |

## 下一步

- [本地服务器](/langgraph/local-server) — 本地开发调试
- [持久化](/langgraph/persistence) — 保存执行状态
- [可观测性](/langgraph/observability) — 监控生产环境
