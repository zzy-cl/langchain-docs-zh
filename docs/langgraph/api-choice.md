---
title: 两种 API 怎么选
description: Graph API 和 Functional API 的对比与选择指南
---

# 两种 API 怎么选

## 对比

| 维度 | Graph API | Functional API |
|------|-----------|----------------|
| **风格** | 声明式（画图） | 命令式（写函数） |
| **学习曲线** | 较高 | 较低 |
| **灵活性** | 最高 | 高 |
| **可视化** | 天然可视化 | 需额外工具 |
| **适用** | 复杂工作流 | 中等复杂度 |

## Graph API

```typescript
// 用"画图"的方式定义流程
const graph = new StateGraph(/* ... */)
  .addNode("step1", step1Node)
  .addNode("step2", step2Node)
  .addEdge(START, "step1")
  .addConditionalEdges("step1", (state) => {
    return state.needMore ? "step2" : END;
  });
```

## Functional API

```typescript
// 用"写函数"的方式定义流程
import { entrypoint, task } from "@langchain/langgraph";

const search = task("search", async (query) => {
  return await webSearch(query);
});

const summarize = task("summarize", async (content) => {
  return await llm.invoke(`总结：${content}`);
});

const research = entrypoint("research", async (topic) => {
  const results = await search(topic);
  return await summarize(results);
});
```

## 选哪个？

| 你的情况 | 推荐 |
|----------|------|
| 流程复杂，有分支和循环 | **Graph API** |
| 流程相对线性，想快速上手 | **Functional API** |
| 需要可视化调试 | **Graph API** |
| 喜欢函数式编程风格 | **Functional API** |
| 不确定 | 先用 **Functional API**，不够了再切 **Graph API** |

## 下一步

- [Graph API](/langgraph/graph-api)
- [Functional API](/langgraph/functional-api)
