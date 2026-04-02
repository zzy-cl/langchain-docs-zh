---
title: 时间旅行
description: 回溯到任意历史节点，探索不同路径
---

# 时间旅行（Time-travel）

## 这是什么？

> 回到过去的某个节点，走一条不同的路。

就像游戏的"读档"——存了一个档，后面走错了，读档重来。

## 使用方式

```typescript
// ① 执行图
const result = await app.invoke(
  { messages: [{ role: "user", content: "分析这个数据" }] },
  { configurable: { thread_id: "session-1" } }
);

// ② 获取所有检查点（存档点）
const history = await app.getStateHistory({
  configurable: { thread_id: "session-1" },
});

// ③ 选择一个历史节点，从那里继续
const checkpoint = history[2]; // 回到第 3 个节点
const forked = await app.invoke(
  null,
  {
    configurable: {
      thread_id: "session-1",
      checkpoint_id: checkpoint.id,
    },
  }
);
```

## 适用场景

- 🐛 调试：Agent 做错了，回到出错前的节点分析
- 🔀 探索：同一个问题，试不同的处理路径
- 📊 对比：比较不同路径的结果

## 下一步

- [持久化](/langgraph/persistence)
- [LangSmith Studio](/langgraph/studio)
