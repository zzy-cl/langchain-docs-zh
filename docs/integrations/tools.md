---
title: 工具集成
description: 各种工具的集成
---

# 工具集成

## 内置工具

| 工具 | 说明 | 包 |
|------|------|------|
| Google Search | Google 搜索 | `@langchain/google-custom-search` |
| Anthropic Tools | Anthropic 内置工具 | `@langchain/anthropic` |
| Calculator | 计算器 | `langchain/tools/calculator` |
| Web Browser | 网页浏览 | `@langchain/community/tools/web_browser` |

## 自定义工具

```typescript
import { tool } from "langchain";
import { z } from "zod";

const myTool = tool(
  async ({ input }) => {
    // 你的逻辑
    return `处理结果：${input}`;
  },
  {
    name: "my_tool",
    description: "工具描述",
    schema: z.object({ input: z.string() }),
  }
);
```

## 下一步

- [工具](/langchain/tools)
- [MCP](/langchain/mcp)
