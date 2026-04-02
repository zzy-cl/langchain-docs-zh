---
title: 自定义 Deep Agents
description: 用系统提示、工具、子 Agent 等自定义你的 Deep Agent
---

# 自定义 Deep Agents

## 可自定义的部分

| 配置项 | 说明 | 示例 |
|--------|------|------|
| `system` | 系统提示 | "你是一个专业的 Python 开发者" |
| `model` | 使用的模型 | `"openai:gpt-4o"` |
| `tools` | 工具列表 | `[search, calculator]` |
| `skills` | 技能包 | `[codeReview]` |
| `memory` | 记忆配置 | `{ shortTerm: true, longTerm: true }` |
| `sandbox` | 沙箱配置 | `{ enabled: true, type: "docker" }` |
| `middleware` | 中间件 | `[rateLimiter, logger]` |
| `context` | 上下文策略 | `{ strategy: "sliding_window" }` |

## 完整示例

```typescript
import { createDeepAgent } from "deepagents";

const agent = createDeepAgent({
  model: "anthropic:claude-sonnet-4-20250514",
  system: `你是一个高级全栈开发助手。
规则：
1. 写代码必须带注释
2. 每次修改前先说明要改什么
3. 用 TypeScript，不用 JavaScript`,
  tools: [readFile, writeFile, runCommand],
  skills: [codeReview],
  memory: { shortTerm: true, longTerm: true, store: "disk" },
  sandbox: { enabled: true, type: "docker" },
  context: { strategy: "sliding_window", maxMessages: 20 },
});
```

## 最佳实践

- 系统提示**精简明确**，别写论文
- 工具**够用就好**，太多反而让 Agent 犹豫
- 用**技能**组织复杂能力，别把所有东西塞进 tools

## 下一步

- [创建 Agent](/deepagents/creation)
- [上下文工程](/deepagents/context-engineering)
