---
title: 工具调用
description: Agent 如何决定调用哪个工具、怎么调用
---

# 工具调用

## 工作原理

Agent 不是自己执行操作，而是"指挥"工具干活——它决定调哪个工具、传什么参数，然后等工具返回结果。

```mermaid
sequenceDiagram
    participant User as 👤 用户
    participant Agent as 🤖 Agent
    participant LLM as 🧠 模型
    participant Tool as 🔧 工具

    User->>Agent: "北京天气怎么样？"
    Agent->>LLM: 消息 + 工具列表
    LLM-->>Agent: 决定调用 get_weather(city="北京")
    Agent->>Tool: 执行工具调用
    Tool-->>Agent: "北京晴天 25°C"
    Agent->>LLM: 工具结果
    LLM-->>Agent: "北京今天晴天，25°C"
    Agent-->>User: 最终回复
```

## 完整示例

```typescript
import { createAgent, tool } from "langchain";
import { z } from "zod";

const search = tool(
  async ({ query }) => `搜索"${query}"的结果...`,
  {
    name: "search",
    description: "搜索互联网，返回相关信息",
    schema: z.object({ query: z.string() }),
  }
);

const calculator = tool(
  ({ expression }) => {
    try {
      return String(eval(expression));
    } catch {
      return `无法计算：${expression}`;
    }
  },
  {
    name: "calculator",
    description: "计算数学表达式",
    schema: z.object({ expression: z.string() }),
  }
);

// Agent 会根据用户的问题自动选择工具
const agent = createAgent({
  model: "openai:gpt-4o",
  tools: [search, calculator],
});

// → 调用 calculator
await agent.invoke({ messages: [{ role: "user", content: "1+1等于多少？" }] });

// → 调用 search
await agent.invoke({ messages: [{ role: "user", content: "搜索最新AI新闻" }] });
```

## 工具调用流程

```mermaid
graph LR
    Q["用户提问"] --> THINK["Agent 分析"]
    THINK --> SELECT["选择工具"]
    SELECT --> PARAMS["构造参数"]
    PARAMS --> EXEC["执行工具"]
    EXEC --> RESULT["获取结果"]
    RESULT --> REASON["继续推理"]
    REASON -->|"需要更多信息"| SELECT
    REASON -->|"可以回答了"| REPLY["生成回复"]

    style THINK fill:#3b82f6,color:#fff
    style EXEC fill:#22c55e,color:#fff
    style REPLY fill:#8b5cf6,color:#fff
```

## ⚠️ 常见踩坑

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| Agent 不调用工具 | 工具 `description` 太模糊 | 写清楚用途、参数格式、返回值 |
| 选错工具 | 工具太多功能重叠 | 按场景分组，别一股脑全塞 |
| 工具报错 | 没做异常处理 | 工具内部 try/catch，返回友好错误信息 |
| 无限循环 | Agent 反复调同一个工具 | 设置 `maxIterations` 或在 system 中限定次数 |

## 工具描述最佳实践

```typescript
// ❌ 不好的描述
description: "获取信息"

// ✅ 好的描述
description: "查询指定城市的当前天气。输入城市名（如'北京'），返回天气状况和温度。"
```

## 下一步

- [工具（Tools）](/langchain/tools) — 创建和管理工具
- [流式输出](/langchain/agents/streaming) — 实时看到工具调用过程
- [创建 Agent](/langchain/agents/creation)
