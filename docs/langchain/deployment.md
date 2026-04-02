---
title: 部署
description: 将 LangChain Agent 部署到生产环境
---

# 部署

## 部署方式

| 方式 | 说明 | 适用场景 |
|------|------|----------|
| **Node.js 服务** | 直接起 HTTP 服务 | 简单场景 |
| **Docker** | 容器化部署 | 标准化部署 |
| **LangSmith** | 官方托管平台 | 全托管 |
| **Vercel / Railway** | Serverless | 快速上线 |

## Node.js 服务

```typescript
import express from "express";
import { createAgent } from "langchain";

const app = express();
app.use(express.json());

const agent = createAgent({
  model: "openai:gpt-4o",
  tools: [getWeather],
});

app.post("/chat", async (req, res) => {
  const result = await agent.invoke({
    messages: [{ role: "user", content: req.body.message }],
  });
  res.json(result);
});

app.listen(3000, () => console.log("Agent 服务已启动：http://localhost:3000"));
```

## Docker 部署

```dockerfile
FROM node:18-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

## 环境变量管理

```bash
# .env（不要提交到 Git）
OPENAI_API_KEY=sk-xxx
ANTHROPIC_API_KEY=sk-ant-xxx
LANGCHAIN_API_KEY=lsv2_xxxx
```

## 下一步

- [生产部署（Deep Agents）](/deepagents/going-to-production)
- [可观测性](/langchain/observability)
