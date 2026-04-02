---
title: 结构化输出
description: 让 Agent 返回固定格式的数据
---

# 结构化输出

## 这是什么？

> 不要 Agent 自由发挥的文字，要它返回**固定格式的 JSON**。

比如：不是 "今天北京晴天，25度"，而是 `{ "city": "北京", "weather": "晴", "temp": 25 }`。

## 使用方式

```typescript
import { createAgent } from "langchain";
import { z } from "zod";

// ① 定义输出格式
const WeatherSchema = z.object({
  city: z.string().describe("城市名称"),
  weather: z.string().describe("天气状况"),
  temperature: z.number().describe("温度"),
  humidity: z.number().describe("湿度百分比"),
});

// ② 创建带结构化输出的 Agent
const agent = createAgent({
  model: "openai:gpt-4o",
  output: WeatherSchema,
  system: "返回天气数据，用 JSON 格式。",
});

// ③ 调用
const result = await agent.invoke({
  messages: [{ role: "user", content: "北京现在天气怎么样？" }],
});

// result 就是符合 WeatherSchema 的对象
console.log(result.city);       // "北京"
console.log(result.weather);    // "晴"
console.log(result.temperature); // 25
```

## 适用场景

- 表单填写
- 数据抽取
- API 响应格式化
- 需要程序化处理 Agent 输出的场景

## 下一步

- [创建 Agent](/langchain/agents/creation)
- [工具调用](/langchain/agents/tool-calling)
