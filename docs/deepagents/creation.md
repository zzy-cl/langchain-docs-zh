---
title: 创建 Agent
description: 学习如何创建和配置 Deep Agent
---

# 创建 Agent

## 基本用法

```typescript
import { createDeepAgent } from "deepagents";

const agent = createDeepAgent({
  system: "你是一个有帮助的助手",
});
```

## 配置项

| 参数 | 类型 | 说明 |
|------|------|------|
| `system` | `string` | 系统提示，定义 Agent 的角色和行为 |
| `model` | `string` | 模型标识，如 `"openai:gpt-4o"` |
| `tools` | `Tool[]` | 工具列表 |
| `memory` | `MemoryConfig` | 记忆配置 |

## 完整示例

```typescript
import { createDeepAgent } from "deepagents";
import { tool } from "langchain";
import { z } from "zod";

const search = tool(
  async ({ query }) => {
    // 模拟搜索
    return `搜索结果：关于"${query}"的信息...`;
  },
  {
    name: "search",
    description: "搜索互联网",
    schema: z.object({ query: z.string() }),
  }
);

const agent = createDeepAgent({
  model: "openai:gpt-4o",
  tools: [search],
  system: "你是一个研究助手，擅长搜索和总结信息。",
});
```

## 下一步

- [工具（Tools）](/deepagents/tools)
- [自定义 Deep Agents](/deepagents/customization)
- [模型配置](/deepagents/models)
