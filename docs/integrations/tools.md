---
title: 工具集成
description: 为 Agent 接入搜索、计算、数据库等外部能力
---

# 工具集成

## 这是什么？

工具（Tool）= Agent 能力的延伸。Agent 本身只会"说话"，但它可以通过调用工具来搜索网页、查数据库、执行代码、发邮件……

类比：Agent 是大脑，工具是手脚。大脑想"查一下天气"，就调用"天气查询"这个工具来执行。

## 工作原理

```mermaid
graph LR
    U["用户：北京天气？"] --> A["🤖 Agent"]
    A -->|"选择工具"| DECIDE["🧠 大模型"]
    DECIDE -->|"调用 get_weather"| TOOL["🔧 天气工具"]
    TOOL -->|"返回数据"| A
    A -->|"生成回复"| U

    style A fill:#3b82f6,color:#fff
    style DECIDE fill:#8b5cf6,color:#fff
    style TOOL fill:#f59e0b,color:#000
```

## 内置工具

| 工具 | 说明 | 包 |
|------|------|------|
| Google Search | Google 搜索 | `@langchain/google-custom-search` |
| Anthropic Tools | Anthropic 内置工具（代码执行等） | `@langchain/anthropic` |
| Calculator | 数学计算 | `langchain/tools/calculator` |
| Web Browser | 网页浏览 | `@langchain/community/tools/web_browser` |
| MCP Tools | 模型上下文协议 | `@langchain/mcp` |

## 自定义工具（最常用）

```typescript
import { tool } from "langchain";
import { z } from "zod";

// 定义一个天气查询工具
const getWeather = tool(
  async ({ city }) => {
    // 实际项目中调用天气 API
    const weather: Record<string, string> = {
      "北京": "晴天，25°C",
      "上海": "多云，22°C",
    };
    return weather[city] || `${city}：暂无数据`;
  },
  {
    name: "get_weather",
    description: "查询指定城市的天气",  // ⚠️ 描述越清晰，Agent 调用越准确
    schema: z.object({
      city: z.string().describe("城市名称，如：北京、上海"),
    }),
  }
);
```

## 在 Agent 中使用

```typescript
import { createAgent } from "langchain";

const agent = createAgent({
  model: "openai:gpt-4o",
  tools: [getWeather],
  system: "你是一个天气助手。用户问天气时调用 get_weather 工具。",
});

const result = await agent.invoke({
  messages: [{ role: "user", content: "北京今天天气怎么样？" }],
});
```

## 工具描述的重要性

Agent 靠工具的 `name` 和 `description` 来决定**是否调用、何时调用**。

| 好的描述 | 差的描述 |
|----------|----------|
| "查询指定城市的实时天气，返回温度和天气状况" | "查天气" |
| "搜索互联网获取最新信息，输入搜索关键词" | "搜索" |

## 最佳实践

| 实践 | 说明 |
|------|------|
| description 要详细 | Agent 靠描述决定是否调用，越具体越好 |
| schema 要有 describe | 帮助 Agent 理解每个参数的含义 |
| 工具数量别太多 | 太多工具会让 Agent 选择困难，5-10 个为宜 |
| 处理异常 | 工具出错时要返回有意义的错误信息，不要抛异常 |
| 考虑安全性 | 不要给 Agent 无限制的数据库写入权限 |

## 下一步

- [MCP 协议 →](/langchain/mcp)
- [搜索 Agent 实战 →](/tutorials/search-agent)
