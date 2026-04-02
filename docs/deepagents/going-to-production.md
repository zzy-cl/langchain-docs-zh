---
title: 生产部署
description: 将 Deep Agent 从开发环境部署到生产环境
---

# 生产部署

## 从开发到生产的检查清单

- [ ] 模型配置要明确（别用默认值）
- [ ] 开启长期记忆（持久化存储）
- [ ] 配置沙箱（安全执行代码）
- [ ] 添加中间件（错误处理、重试、限流）
- [ ] 配置日志和监控
- [ ] 设置 API Key 管理（别硬编码）

## 推荐配置

```typescript
import { createDeepAgent } from "deepagents";

const agent = createDeepAgent({
  model: "openai:gpt-4o",
  memory: {
    shortTerm: true,
    longTerm: true,
    store: "postgres", // 生产用数据库
  },
  sandbox: {
    enabled: true,
    type: "docker",
  },
  middleware: [rateLimiter, retryOnError, logger],
  system: "你是一个专业的助手。",
});
```

## 部署方式

| 方式 | 说明 |
|------|------|
| **Node.js 服务** | 直接起一个 HTTP 服务 |
| **Docker** | 容器化部署 |
| **LangSmith** | 官方托管平台 |
| **Vercel / Railway** | Serverless 部署 |

## 下一步

- [沙箱](/deepagents/sandboxes)
- [LangSmith 部署](/langchain/deployment)
