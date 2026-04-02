---
title: 持久化执行
description: 长时间运行的任务不怕中断
---

# 持久化执行（Durable Execution）

## 这是什么？

> 不只是"存档"，而是**整个执行过程都可恢复**。挂了、重启了、换机器了，都能从断点继续。

## 类比

| 普通执行 | 持久化执行 |
|---------|-----------|
| 游戏玩到一半停电，进度全丢 | 游戏自动存档，来电后继续 |
| 程序崩了，从头再来 | 程序崩了，从上次存档继续 |

## 工作原理

```
节点 1 执行 → 自动存档 → 节点 2 执行 → 自动存档 → 节点 3 执行（挂了！）
                                                        ↓
重启 → 加载节点 2 的存档 → 从节点 3 继续
```

## 配置

```typescript
import { PostgresSaver } from "@langchain/langgraph/checkpoint/postgres";

const checkpointer = new PostgresSaver({
  connectionString: process.env.DATABASE_URL,
});

const app = graph.compile({ checkpointer });
```

## 适用场景

- 长时间运行的数据处理管道
- 需要人工介入的审批流程
- 需要高可用的生产 Agent

## 下一步

- [持久化](/langgraph/persistence)
- [时间旅行](/langgraph/time-travel)
