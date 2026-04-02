---
title: 中间件集成
description: 各种中间件的集成
---

# 中间件集成

## 内置中间件

| 中间件 | 说明 |
|--------|------|
| `rateLimiter` | 限流 |
| `retryOnError` | 错误重试 |
| `logger` | 日志记录 |
| `timeout` | 超时控制 |
| `cache` | 结果缓存 |

## 使用方式

```typescript
import { createAgent } from "langchain";
import { rateLimiter, retryOnError } from "langchain/middleware";

const agent = createAgent({
  model: "openai:gpt-4o",
  middleware: [
    rateLimiter({ maxRequests: 10, windowMs: 60000 }),
    retryOnError({ maxRetries: 3 }),
  ],
});
```

## 下一步

- [Middleware](/langchain/middleware)
