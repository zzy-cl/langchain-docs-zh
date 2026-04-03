---
title: 结构化输出
description: 让 Agent 返回固定格式的数据
---

# 结构化输出

## 这是什么？

> 不要 Agent 自由发挥的文字，要它返回**固定格式的 JSON**。

比如：不是 "今天北京晴天，25度"，而是 `{ "city": "北京", "weather": "晴", "temp": 25 }`。

```mermaid
graph LR
    Q["用户问题"] --> AGENT["Agent"]
    AGENT --> FREE["自由文本<br/>'北京晴天 25度'"]
    AGENT --> STRUCT["结构化输出<br/>{city, weather, temp}"]
    FREE --> ❌["程序不好处理"]
    STRUCT --> ✅["直接用代码处理"]

    style STRUCT fill:#22c55e,color:#fff
    style ❌ fill:#ef4444,color:#fff
    style ✅ fill:#22c55e,color:#fff
```

## 使用方式

```typescript
import { createAgent } from "langchain";
import { z } from "zod";

// ① 定义输出格式（用 zod schema）
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
console.log(result.city);        // "北京"
console.log(result.weather);     // "晴"
console.log(result.temperature); // 25
```

## 适用场景

| 场景 | 示例 |
|------|------|
| 表单填写 | 从用户描述中提取表单字段 |
| 数据抽取 | 从文本中提取人名、日期、金额 |
| API 响应格式化 | 确保 Agent 输出符合接口定义 |
| 分类任务 | 返回 `{ category: "技术", confidence: 0.9 }` |

## 常见问题

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| 输出不符合 schema | 模型理解有偏差 | 在 system 中加示例 |
| 缺少字段 | zod 没设 `.describe()` | 给每个字段加描述 |
| 类型不对 | schema 太宽松 | 用 `z.enum()` 限定选项 |

## 下一步

- [创建 Agent](/langchain/agents/creation)
- [工具调用](/langchain/agents/tool-calling)
- [Prompts](/langchain/prompts)
