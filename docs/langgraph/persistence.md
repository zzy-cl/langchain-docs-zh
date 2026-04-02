---
title: 持久化（Persistence）
description: 保存和恢复图的执行状态
---

# 持久化（Persistence）

## 这是什么？

> 游戏存档。Agent 干到一半挂了，重启后从存档点继续，不用从头来。

## 使用方式

```typescript
import { MemorySaver } from "@langchain/langgraph";

// ① 创建检查点存储
const checkpointer = new MemorySaver(); // 内存中，开发用

// ② 编译图时启用持久化
const app = graph.compile({ checkpointer });

// ③ 执行时指定 thread_id（会话 ID）
const result = await app.invoke(
  { messages: [{ role: "user", content: "你好" }] },
  { configurable: { thread_id: "user-123" } }
);

// ④ 同一个 thread_id 再次调用，会从上次的存档点继续
const result2 = await app.invoke(
  { messages: [{ role: "user", content: "继续" }] },
  { configurable: { thread_id: "user-123" } }
);
```

## 存储后端

| 后端 | 说明 | 适用场景 |
|------|------|----------|
| `MemorySaver` | 内存 | 开发测试 |
| `SqliteSaver` | SQLite | 本地持久化 |
| `PostgresSaver` | PostgreSQL | 生产环境 |

## 下一步

- [持久化执行](/langgraph/durable-execution)
- [时间旅行](/langgraph/time-travel)
