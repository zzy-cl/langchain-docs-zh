---
title: Chat 模型集成
description: 接入各种 Chat 模型
---

# Chat 模型集成

## OpenAI

```bash
npm install @langchain/openai
```

```typescript
import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({
  model: "gpt-4o",
  temperature: 0,
  apiKey: process.env.OPENAI_API_KEY,
});

const response = await model.invoke("你好");
```

## Anthropic

```bash
npm install @langchain/anthropic
```

```typescript
import { ChatAnthropic } from "@langchain/anthropic";

const model = new ChatAnthropic({
  model: "claude-sonnet-4-20250514",
  temperature: 0,
  apiKey: process.env.ANTHROPIC_API_KEY,
});
```

## Google

```bash
npm install @langchain/google-genai
```

```typescript
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
  apiKey: process.env.GOOGLE_API_KEY,
});
```

## 在 Agent 中使用

```typescript
// 直接传字符串标识
const agent = createAgent({
  model: "openai:gpt-4o",  // 或 "anthropic:claude-sonnet-4-20250514"
  tools: [getWeather],
});
```

## 下一步

- [Models](/langchain/models)
- [Embedding 模型](/integrations/embeddings)
