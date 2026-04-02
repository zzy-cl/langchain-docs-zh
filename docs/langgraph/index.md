---
title: LangGraph 概览
description: LangGraph 是底层编排框架，用于构建可靠的有状态 Agent
---

# LangGraph 概览

## 这是什么？

LangGraph 是一个**底层 Agent 编排框架和运行时**。Klarna、Uber、J.P. Morgan 等公司都在用。

它专注解决一个问题：**怎么让 Agent 可靠地执行复杂工作流**。

## 核心能力

| 能力 | 说明 |
|------|------|
| **状态图** | 用节点和边定义工作流 |
| **持久化** | 执行到一半断了，能从存档点继续 |
| **人工介入** | 关键步骤暂停等用户确认 |
| **时间旅行** | 回溯到任意历史节点 |
| **流式输出** | 实时返回每个节点的结果 |

## 类比

> 普通 Agent = 你跟它说一句话，它回一句话
> LangGraph = 你给它画一张流程图，它按图执行，中间还能暂停、回溯、分支

## 什么时候用？

- 需要**多步骤工作流**（不是简单的一问一答）
- 需要**条件分支**（根据结果走不同路径）
- 需要**持久化**（执行到一半挂了能恢复）
- 需要**人工审批**（关键步骤要人确认）

## 安装

```bash
npm install @langchain/langgraph @langchain/core
```

## 最简示例

```typescript
import { StateGraph, START, END } from "@langchain/langgraph";

// ① 定义状态
const graph = new StateGraph({
  channels: {
    messages: { value: (x, y) => x.concat(y), default: () => [] },
  },
});

// ② 定义节点
graph.addNode("greet", async (state) => {
  return { messages: [{ role: "assistant", content: "你好！有什么可以帮你的？" }] };
});

// ③ 定义边
graph.addEdge(START, "greet");
graph.addEdge("greet", END);

// ④ 编译并执行
const app = graph.compile();
const result = await app.invoke({ messages: [] });
```

## 与 LangChain 的关系

```
Deep Agents = LangChain + LangGraph + 内置能力
```

- **LangChain** 的 Agent 底层自动使用 LangGraph
- 你不需要直接用 LangGraph 就能构建 Agent
- 只有需要**底层控制**时才直接用 LangGraph

## 下一步

- [快速开始](/langgraph/quickstart)
- [思维方式](/langgraph/thinking)
- [Graph API](/langgraph/graph-api)
