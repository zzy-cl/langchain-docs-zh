---
title: 创建 Agent
description: 使用 LangChain 创建和配置 Agent
---

# 创建 Agent

## 基本用法

```typescript
import { createAgent, tool } from "langchain";
import { z } from "zod";

// ① 定义工具
const calculator = tool(
  ({ expression }) => String(eval(expression)),
  {
    name: "calculator",
    description: "计算数学表达式",
    schema: z.object({ expression: z.string() }),
  }
);

// ② 创建 Agent
const agent = createAgent({
  model: "openai:gpt-4o",
  tools: [calculator],
  system: "你是一个数学助手，需要用 calculator 来计算。",
});

// ③ 调用
const result = await agent.invoke({
  messages: [{ role: "user", content: "123 * 456 等于多少？" }],
});
```

## 配置项

| 参数 | 类型 | 说明 |
|------|------|------|
| `model` | `string` | 模型标识，如 `"openai:gpt-4o"` |
| `tools` | `Tool[]` | 工具列表 |
| `system` | `string` | 系统提示 |
| `middleware` | `Middleware[]` | 中间件列表 |

## 选模型

```typescript
// OpenAI
const agent = createAgent({ model: "openai:gpt-4o" });

// Anthropic
const agent = createAgent({ model: "anthropic:claude-sonnet-4-20250514" });

// Google
const agent = createAgent({ model: "google:gemini-2.0-flash" });
```

## 下一步

- [工具调用](/langchain/agents/tool-calling)
- [流式输出](/langchain/agents/streaming)
- [结构化输出](/langchain/agents/structured-output)
