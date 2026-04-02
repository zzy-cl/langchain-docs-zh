---
title: 安装
description: 安装 LangChain 及相关依赖
---

# 安装

## 核心包

```bash
# 最小安装
npm install @langchain/core

# Agent 功能（包含核心 + Agent + 链等）
npm install langchain

# 模型集成（按需安装）
npm install @langchain/openai        # OpenAI
npm install @langchain/anthropic     # Anthropic
npm install @langchain/google-genai  # Google
```

## 推荐组合

| 场景 | 安装命令 |
|------|----------|
| 快速上手 | `npm install langchain @langchain/openai` |
| Anthropic 用户 | `npm install langchain @langchain/anthropic` |
| 只需要模型调用 | `npm install @langchain/core @langchain/openai` |
| RAG 项目 | `npm install langchain @langchain/openai @langchain/community` |

## 环境变量

```bash
# .env
OPENAI_API_KEY=sk-xxx
ANTHROPIC_API_KEY=sk-ant-xxx
```

## 验证安装

```typescript
import { createAgent, tool } from "langchain";
import { z } from "zod";

const hello = tool(
  () => "Hello from LangChain!",
  {
    name: "hello",
    description: "打个招呼",
    schema: z.object({}),
  }
);

const agent = createAgent({
  model: "openai:gpt-4o-mini",
  tools: [hello],
});

const result = await agent.invoke({
  messages: [{ role: "user", content: "打个招呼" }],
});

console.log(result);
```

## 下一步

- [组件架构](/langchain/component-architecture)
- [创建 Agent](/langchain/agents/creation)
