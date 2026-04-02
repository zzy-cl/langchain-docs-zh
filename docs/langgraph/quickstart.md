---
title: LangGraph 快速开始
description: 几分钟内创建你的第一个 LangGraph 工作流
---

# LangGraph 快速开始

## 安装

```bash
npm install @langchain/langgraph @langchain/core
```

## 创建一个简单的对话 Agent

```typescript
import { StateGraph, START, END, MessagesAnnotation } from "@langchain/langgraph";
import { ChatOpenAI } from "@langchain/openai";

// ① 初始化模型
const model = new ChatOpenAI({ model: "gpt-4o" });

// ② 定义 Agent 节点
async function callModel(state: typeof MessagesAnnotation.State) {
  const response = await model.invoke(state.messages);
  return { messages: [response] };
}

// ③ 构建图
const graph = new StateGraph(MessagesAnnotation)
  .addNode("agent", callModel)
  .addEdge(START, "agent")
  .addEdge("agent", END);

// ④ 编译
const app = graph.compile();

// ⑤ 执行
const result = await app.invoke({
  messages: [{ role: "user", content: "你好！" }],
});

console.log(result.messages[result.messages.length - 1].content);
```

## 带工具调用的 Agent

```typescript
import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { ToolNode } from "@langchain/langgraph/prebuilt";

// 定义工具
const getWeather = tool(
  ({ city }) => `今天${city}晴天，25°C`,
  {
    name: "get_weather",
    description: "查询天气",
    schema: z.object({ city: z.string() }),
  }
);

// 构建图
const toolNode = new ToolNode([getWeather]);

const graph = new StateGraph(MessagesAnnotation)
  .addNode("agent", callModel)
  .addNode("tools", toolNode)
  .addEdge(START, "agent")
  .addConditionalEdges("agent", (state) => {
    const lastMessage = state.messages[state.messages.length - 1];
    if (lastMessage.tool_calls?.length) return "tools";
    return END;
  })
  .addEdge("tools", "agent");

const app = graph.compile();
```

## 下一步

- [Graph API](/langgraph/graph-api)
- [核心概念 - State](/langgraph/state)
- [核心概念 - Nodes](/langgraph/nodes)
