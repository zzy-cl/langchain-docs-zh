---
title: 工具调用
description: Agent 如何决定调用哪个工具、怎么调用
---

# 工具调用

## 工作流程

```
用户提问 → Agent 分析 → 决定调用工具 → 执行工具 → 获取结果 → 生成回复
```

## 示例

```typescript
import { createAgent, tool } from "langchain";
import { z } from "zod";

const search = tool(
  async ({ query }) => `搜索"${query}"的结果...`,
  {
    name: "search",
    description: "搜索互联网",
    schema: z.object({ query: z.string() }),
  }
);

const calculator = tool(
  ({ expression }) => String(eval(expression)),
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

// 会调用 calculator
await agent.invoke({ messages: [{ role: "user", content: "1+1等于多少？" }] });

// 会调用 search
await agent.invoke({ messages: [{ role: "user", content: "搜索最新AI新闻" }] });
```

## ⚠️ 常见踩坑

- **工具描述太模糊** → Agent 不知道该调哪个。描述要具体
- **工具太多** → Agent 容易选错。按场景分组，别一股脑全塞进去
- **工具报错** → Agent 会把错误信息返回给用户，记得 try/catch

## 下一步

- [工具（Tools）](/langchain/tools)
- [流式输出](/langchain/agents/streaming)
