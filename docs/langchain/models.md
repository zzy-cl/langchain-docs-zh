---
title: Models（模型）
description: 统一接口对接各种 LLM 模型
---

# Models（模型）

## 这是什么？

LangChain 提供统一的模型接口——不管你用 OpenAI、Anthropic 还是 Google，代码写法都一样。

## 支持的模型

| 厂商 | 包名 | 示例模型 |
|------|------|----------|
| OpenAI | `@langchain/openai` | gpt-4o, gpt-4o-mini |
| Anthropic | `@langchain/anthropic` | claude-sonnet-4, claude-haiku-4 |
| Google | `@langchain/google-genai` | gemini-2.0-flash |
| Azure | `@langchain/openai` | Azure OpenAI |
| AWS Bedrock | `@langchain/aws` | Claude on Bedrock |

## 使用方式

```typescript
import { ChatOpenAI } from "@langchain/openai";
import { ChatAnthropic } from "@langchain/anthropic";

// OpenAI
const openai = new ChatOpenAI({ model: "gpt-4o", temperature: 0 });

// Anthropic
const claude = new ChatAnthropic({ model: "claude-sonnet-4-20250514", temperature: 0 });

// 调用方式相同
const response = await openai.invoke("你好");
const response2 = await claude.invoke("你好");
```

## 统一调用

```typescript
// 直接传字符串标识，在 Agent 中使用
const agent = createAgent({
  model: "openai:gpt-4o",  // 或 "anthropic:claude-sonnet-4-20250514"
});
```

## 下一步

- [Chat 模型集成](/integrations/chat)
- [创建 Agent](/langchain/agents/creation)
