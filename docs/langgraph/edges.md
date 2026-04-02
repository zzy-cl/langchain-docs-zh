---
title: Edges（边）
description: LangGraph 中的边——决定节点之间的流转
---

# Edges（边）

## 两种边

| 类型 | 说明 | 类比 |
|------|------|------|
| **固定边** | A 干完一定去 B | 流水线，固定顺序 |
| **条件边** | 根据结果决定去 B 还是 C | 岔路口，看路标走 |

## 固定边

```typescript
graph.addEdge(START, "step1");        // 图的起点 → step1
graph.addEdge("step1", "step2");      // step1 → step2
graph.addEdge("step2", END);          // step2 → 图的终点
```

## 条件边

```typescript
graph.addConditionalEdges(
  "analyze",  // 从哪个节点出发
  (state) => {  // 决策函数
    if (state.confidence > 0.8) return "answer";
    if (state.confidence > 0.5) return "search_more";
    return "ask_human";
  }
);
```

## 循环

```typescript
// 搜索 → 判断 → 没找到 → 换关键词 → 再搜索（循环）
graph.addConditionalEdges("search", (state) => {
  if (state.results.length > 0) return "summarize";
  return "rephrase";
});
graph.addEdge("rephrase", "search"); // 回到搜索
```

## 下一步

- [Nodes（节点）](/langgraph/nodes)
- [Interrupts（中断）](/langgraph/interrupts)
