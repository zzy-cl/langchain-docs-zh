---
title: 运行时（Pregel）
description: LangGraph 的底层执行引擎
---

# 运行时（Pregel）

## 这是什么？

Pregel 是 LangGraph 的**底层执行引擎**——负责调度节点执行、管理状态流转、处理错误恢复。

## 类比

> 你画了流程图（StateGraph），Pregel 是"按图施工的工人"——它读图、执行每个节点、管理状态传递。

## 工作原理

```
1. 读取当前状态
2. 找到下一个要执行的节点
3. 执行节点函数
4. 更新状态
5. 检查是否到达 END
   ├─ 否 → 回到第 2 步
   └─ 是 → 返回最终状态
```

## 你不需要直接用它

大多数情况下，你用 `graph.compile()` 就够了。Pregel 在底层默默工作。

## 下一步

- [Graph API](/langgraph/graph-api)
- [持久化](/langgraph/persistence)
