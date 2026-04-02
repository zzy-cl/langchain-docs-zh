---
title: 安装
description: 安装 LangGraph 及相关依赖
---

# 安装

## 核心包

```bash
npm install @langchain/langgraph @langchain/core
```

## 按需安装模型集成

```bash
npm install @langchain/openai        # OpenAI
npm install @langchain/anthropic     # Anthropic
npm install @langchain/google-genai  # Google
```

## 验证安装

```typescript
import { StateGraph, START, END } from "@langchain/langgraph";

const graph = new StateGraph({
  channels: { count: { value: (x, y) => y, default: () => 0 } },
})
  .addNode("increment", (state) => ({ count: state.count + 1 }))
  .addEdge(START, "increment")
  .addEdge("increment", END)
  .compile();

const result = await graph.invoke({ count: 0 });
console.log(result.count); // 1 ✅
```

## 下一步

- [快速开始](/langgraph/quickstart)
- [思维方式](/langgraph/thinking)
