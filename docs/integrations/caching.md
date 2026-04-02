---
title: 缓存集成
description: 缓存模型调用结果，节省成本
---

# 缓存集成

## 这是什么？

同样的问题问两次，第二次直接返回缓存结果，不用再调模型。省钱、省时间。

## 使用方式

```typescript
import { InMemoryCache } from "@langchain/core/caches";

const cache = new InMemoryCache();

const model = new ChatOpenAI({
  model: "gpt-4o",
  cache,
});

// 第一次调用：调模型
const r1 = await model.invoke("你好");

// 第二次调用：从缓存返回，不调模型
const r2 = await model.invoke("你好");
```

## 缓存后端

| 后端 | 说明 |
|------|------|
| `InMemoryCache` | 内存中 |
| `RedisCache` | Redis |
| `MomentoCache` | Momento |

## 下一步

- [可观测性](/langchain/observability)
