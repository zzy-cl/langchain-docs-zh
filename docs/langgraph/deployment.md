---
title: 部署
description: 将 LangGraph 应用部署到生产环境
---

# 部署

## 部署方式

| 方式 | 说明 |
|------|------|
| **Node.js 服务** | 直接起 HTTP 服务 |
| **Docker** | 容器化部署 |
| **LangGraph Cloud** | 官方托管平台 |
| **自托管** | 自己管理服务器 |

## Docker 部署

```dockerfile
FROM node:18-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

## 环境变量

```bash
OPENAI_API_KEY=sk-xxx
LANGCHAIN_TRACING_V2=true
LANGCHAIN_API_KEY=lsv2_xxx
DATABASE_URL=postgresql://...
```

## 下一步

- [本地服务器](/langgraph/local-server)
- [持久化](/langgraph/persistence)
