---
title: 消息（Messages）
description: LangChain 中的消息类型和使用方式
---

# 消息（Messages）

## 消息类型

| 类型 | 说明 | 谁发的 |
|------|------|--------|
| `HumanMessage` | 用户的消息 | 用户 |
| `AIMessage` | AI 的回复 | Agent |
| `SystemMessage` | 系统提示 | 开发者 |
| `ToolMessage` | 工具调用结果 | 工具 |
| `FunctionMessage` | 函数调用结果（旧版） | 工具 |

## 使用方式

```typescript
import { HumanMessage, AIMessage, SystemMessage } from "@langchain/core/messages";

const messages = [
  new SystemMessage("你是一个天气助手"),
  new HumanMessage("北京天气怎么样？"),
  new AIMessage("今天北京晴天，25°C"),
  new HumanMessage("明天呢？"),
];
```

## 消息结构

```typescript
interface BaseMessage {
  content: string;           // 消息内容
  name?: string;             // 发送者名称
  additional_kwargs?: {};    // 额外参数
  response_metadata?: {};    // 响应元数据
}
```

## 在 Agent 中使用

```typescript
const result = await agent.invoke({
  messages: [
    new SystemMessage("你是一个有帮助的助手"),
    new HumanMessage("帮我写一首诗"),
  ],
});
```

## 下一步

- [创建 Agent](/langchain/agents/creation)
- [Prompts（提示词）](/langchain/prompts)
