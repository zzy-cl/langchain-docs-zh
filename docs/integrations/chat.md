---
title: Chat 模型集成
description: 接入 OpenAI、Anthropic、Google 等主流 Chat 模型
---

# Chat 模型集成

## 这是什么？

Chat 模型 = Agent 的"大脑"。LangChain 提供统一接口，让你切换模型厂商时几乎不用改代码。

类比：就像 USB 接口——不管插什么品牌的设备，接口都一样。LangChain 就是模型世界的 USB。

## 支持的模型

| 厂商 | 包 | 推荐模型 | 特点 |
|------|-----|----------|------|
| OpenAI | `@langchain/openai` | gpt-4o, gpt-4o-mini | 生态最全，性价比高 |
| Anthropic | `@langchain/anthropic` | claude-sonnet-4, claude-haiku-4 | 长上下文，安全性高 |
| Google | `@langchain/google-genai` | gemini-2.0-flash | 速度快，多模态好 |
| Azure | `@langchain/openai` | Azure OpenAI | 企业级合规 |
| AWS Bedrock | `@langchain/aws` | Claude on AWS | AWS 生态 |

## 快速接入

### OpenAI

```bash
npm install @langchain/openai
```

```typescript
import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({
  model: "gpt-4o",
  temperature: 0,           // 0 = 确定性输出，越高越随机
  apiKey: process.env.OPENAI_API_KEY,
});

const response = await model.invoke("你好");
console.log(response.content);
```

### Anthropic

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

### Google

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
import { createAgent } from "langchain";

// 方式一：字符串标识（推荐）
const agent = createAgent({
  model: "openai:gpt-4o",
  tools: [myTool],
});

// 方式二：传入模型实例
const agent2 = createAgent({
  model: new ChatAnthropic({ model: "claude-sonnet-4-20250514" }),
  tools: [myTool],
});
```

## 关键参数

| 参数 | 说明 | 推荐值 |
|------|------|--------|
| `temperature` | 输出随机性（0 确定，1 随机） | Agent 用 0-0.3 |
| `maxTokens` | 最大输出 token 数 | 根据需求设定 |
| `apiKey` | API 密钥 | 从环境变量读取 |
| `timeout` | 请求超时（ms） | 30000-60000 |

## 流式输出

```typescript
const model = new ChatOpenAI({ model: "gpt-4o" });

const stream = await model.stream("写一首诗");
for await (const chunk of stream) {
  process.stdout.write(chunk.content as string);
}
```

## 最佳实践

| 实践 | 说明 |
|------|------|
| API Key 放环境变量 | 绝不要硬编码在代码里 |
| Agent 场景 temperature 用 0 | 确定性输出，工具调用更稳定 |
| 先用 mini 版开发 | gpt-4o-mini 便宜，功能够用 |
| 准备 fallback 模型 | 主模型挂了自动切换备用 |

## 常见问题

| 问题 | 解答 |
|------|------|
| 不同模型的 API 格式一样吗？ | LangChain 统一了接口，调用方式一致 |
| 能同时用多个模型吗？ | 能，不同 Agent 可以用不同模型 |
| 模型调用失败怎么办？ | 用中间件的 `retryOnError` 自动重试 |

## 下一步

- [Embedding 模型 →](/integrations/embeddings)
- [快速开始 →](/overview/quickstart)
