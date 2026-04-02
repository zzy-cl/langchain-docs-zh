---
title: Nodes（节点）
description: LangGraph 中的节点——处理状态的函数
---

# Nodes（节点）

## 这是什么？

节点 = 一个处理状态的函数。输入是当前状态，输出是状态更新。

## 类比

> 节点 = 流水线上的一个工位。原料（状态）进来，加工一下（处理），产出新东西（状态更新），传给下一个工位。

## 定义节点

```typescript
// 节点就是一个 async 函数
const myNode = async (state) => {
  // 读取状态
  const { messages, count } = state;

  // 做一些处理
  const response = await llm.invoke(messages);

  // 返回状态更新
  return {
    messages: [response],
    count: count + 1,
  };
};

// 添加到图中
graph.addNode("my_node", myNode);
```

## 内置节点

```typescript
import { ToolNode } from "@langchain/langgraph/prebuilt";

// ToolNode 自动执行 Agent 调用的工具
const tools = [getWeather, search];
const toolNode = new ToolNode(tools);
graph.addNode("tools", toolNode);
```

## 最佳实践

- 节点函数**保持纯净**——同样的输入，同样的输出
- **不要在节点里做副作用**（发邮件、写数据库）——用工具来处理
- 一个节点**只做一件事**

## 下一步

- [State（状态）](/langgraph/state)
- [Edges（边）](/langgraph/edges)
