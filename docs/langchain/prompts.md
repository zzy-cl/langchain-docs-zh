---
title: Prompts（提示词）
description: 模板化管理提示词
---

# Prompts（提示词）

## 这是什么？

提示词模板 = 带变量的提示词。不是每次手写，而是定义一个模板，运行时填入变量。

## 类比

> 就像邮件模板——"亲爱的{name}，感谢您订购了{product}"，发给不同人填不同值。

## 使用方式

```typescript
import { ChatPromptTemplate } from "@langchain/core/prompts";

// ① 定义模板
const prompt = ChatPromptTemplate.fromMessages([
  ["system", "你是一个{role}专家。"],
  ["human", "{question}"],
]);

// ② 填入变量
const formatted = await prompt.format({
  role: "前端开发",
  question: "React 和 Vue 怎么选？",
});

// 结果：
// System: 你是一个前端开发专家。
// Human: React 和 Vue 怎么选？
```

## 在 Agent 中使用

```typescript
const agent = createAgent({
  model: "openai:gpt-4o",
  tools: [search],
  system: "你是一个{domain}专家，用{style}的风格回答。",
});

// 调用时传入变量
const result = await agent.invoke({
  messages: [{ role: "user", content: "..." }],
  variables: { domain: "前端", style: "通俗易懂" },
});
```

## 下一步

- [Messages（消息）](/langchain/messages)
- [Chains（链）](/langchain/chains)
