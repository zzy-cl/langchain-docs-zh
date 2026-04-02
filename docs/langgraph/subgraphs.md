---
title: Subgraphs（子图）
description: 在图中嵌套另一个图
---

# Subgraphs（子图）

## 这是什么？

子图 = 图中嵌套的另一个图。就像函数里调用另一个函数——主图负责整体流程，子图负责细节。

## 类比

> 主图 = 公司整体流程（接单 → 生产 → 发货）
> 子图 = 生产部门的内部流程（采购 → 加工 → 质检）

## 使用方式

```typescript
// ① 定义子图：研究流程
const researchGraph = new StateGraph(/* ... */)
  .addNode("search", searchNode)
  .addNode("summarize", summarizeNode)
  .addEdge(START, "search")
  .addEdge("search", "summarize")
  .addEdge("summarize", END)
  .compile();

// ② 在主图中使用子图
const mainGraph = new StateGraph(/* ... */)
  .addNode("research", researchGraph)  // 子图作为一个节点
  .addNode("write", writeNode)
  .addEdge(START, "research")
  .addEdge("research", "write")
  .addEdge("write", END)
  .compile();
```

## 好处

- **模块化** — 每个子图独立开发和测试
- **复用** — 同一个子图在多个地方使用
- **隔离** — 子图有自己的状态，不会污染主图

## 下一步

- [State（状态）](/langgraph/state)
- [应用结构](/langgraph/application-structure)
