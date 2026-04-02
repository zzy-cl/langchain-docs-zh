---
title: Tools（工具）
description: 创建和管理 Agent 的工具
---

# Tools（工具）

## 创建工具

```typescript
import { tool } from "langchain";
import { z } from "zod";

const myTool = tool(
  // 执行函数
  ({ input }) => `处理结果：${input}`,
  {
    name: "my_tool",
    description: "工具描述——Agent 靠这个决定要不要调用",
    schema: z.object({
      input: z.string().describe("输入参数"),
    }),
  }
);
```

## 异步工具

```typescript
const fetchTool = tool(
  async ({ url }) => {
    const response = await fetch(url);
    return await response.text();
  },
  {
    name: "fetch_url",
    description: "获取网页内容",
    schema: z.object({ url: z.string() }),
  }
);
```

## 返回复杂数据

```typescript
const searchTool = tool(
  async ({ query }) => {
    const results = await search(query);
    // 返回 JSON 字符串
    return JSON.stringify(results.slice(0, 5));
  },
  {
    name: "search",
    description: "搜索并返回前 5 条结果",
    schema: z.object({ query: z.string() }),
  }
);
```

## ⚠️ 踩坑

- **描述要具体** — "搜索天气" 比 "获取信息" 好
- **参数别用 any** — 用 zod 严格定义
- **错误要处理** — try/catch，别让 Agent 收到原始错误

## 下步

- [工具调用](/langchain/agents/tool-calling)
- [中间件](/langchain/middleware)
