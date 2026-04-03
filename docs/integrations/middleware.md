---
title: 中间件集成
description: 用中间件控制 Agent 的请求流程——限流、重试、日志、超时
---

# 中间件集成

## 这是什么？

中间件（Middleware）= Agent 执行流程中的"关卡"。每个请求在到达模型之前，会经过一系列中间件处理——就像高速公路的收费站和服务区。

```mermaid
graph LR
    REQ["请求"] --> M1["限流"]
    M1 --> M2["重试"]
    M2 --> M3["日志"]
    M3 --> M4["缓存"]
    M4 --> MODEL["🧠 模型"]

    style M1 fill:#ef4444,color:#fff
    style M2 fill:#f59e0b,color:#000
    style M3 fill:#3b82f6,color:#fff
    style M4 fill:#22c55e,color:#fff
    style MODEL fill:#8b5cf6,color:#fff
```

## 内置中间件

| 中间件 | 说明 | 典型场景 |
|--------|------|----------|
| `rateLimiter` | 限流——控制请求频率 | 避免触发 API 速率限制 |
| `retryOnError` | 错误重试——自动重试失败的请求 | 网络抖动、临时性错误 |
| `timeout` | 超时控制——防止请求挂起 | 长时间无响应的模型调用 |
| `cache` | 结果缓存——相同输入直接返回 | 节省成本，提升响应速度 |
| `logger` | 日志记录——记录请求/响应 | 调试和监控 |

## 使用方式

```typescript
import { createAgent } from "langchain";
import { rateLimiter, retryOnError } from "langchain/middleware";

const agent = createAgent({
  model: "openai:gpt-4o",
  middleware: [
    // 每分钟最多 10 个请求
    rateLimiter({ maxRequests: 10, windowMs: 60000 }),
    // 失败后最多重试 3 次
    retryOnError({ maxRetries: 3, delayMs: 1000 }),
  ],
});
```

## 组合使用

中间件按顺序执行，可以自由组合：

```typescript
const agent = createAgent({
  model: "openai:gpt-4o",
  middleware: [
    rateLimiter({ maxRequests: 60, windowMs: 60000 }),
    retryOnError({ maxRetries: 2 }),
    timeout({ timeoutMs: 30000 }),
    logger({ level: "info" }),
    cache({ ttl: 3600 }),
  ],
});
```

## 自定义中间件

```typescript
import { BaseMiddleware } from "langchain/middleware";

const myMiddleware: BaseMiddleware = {
  async invoke(context, next) {
    const start = Date.now();
    console.log(`请求开始: ${context.messages.at(-1)?.content}`);

    const result = await next();  // 继续执行下一个中间件

    const duration = Date.now() - start;
    console.log(`请求完成: 耗时 ${duration}ms`);

    return result;
  },
};
```

## 最佳实践

| 实践 | 说明 |
|------|------|
| 生产环境必加限流 | 避免意外打爆 API 配额 |
| 重试要设上限 | 无限重试会导致挂起 |
| 超时要合理 | 太短会误杀正常请求，太长用户体验差 |
| 日志不要太详细 | 记录关键信息即可，避免敏感数据泄露 |

## 常见问题

| 问题 | 解答 |
|------|------|
| 中间件顺序重要吗？ | 重要。建议顺序：限流 → 重试 → 超时 → 缓存 → 日志 |
| 能用多个缓存中间件吗？ | 不建议，用一个即可 |
| 中间件会影响性能吗？ | 会，但通常可忽略。缓存中间件反而能提升性能 |

## 下一步

- [回调集成 →](/integrations/callbacks)
- [可观测性 →](/langchain/observability)
