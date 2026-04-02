---
title: 模型配置（Models）
description: 配置 Deep Agent 使用的 LLM 模型
---

# 模型配置（Models）

## 支持的模型

```typescript
// OpenAI
const agent = createDeepAgent({ model: "openai:gpt-4o" });
const agent = createDeepAgent({ model: "openai:gpt-4o-mini" });

// Anthropic
const agent = createDeepAgent({ model: "anthropic:claude-sonnet-4-20250514" });
const agent = createDeepAgent({ model: "anthropic:claude-haiku-4-20250414" });

// Google
const agent = createDeepAgent({ model: "google:gemini-2.0-flash" });
```

## 高级配置

```typescript
const agent = createDeepAgent({
  model: {
    provider: "openai",
    name: "gpt-4o",
    temperature: 0.7,      // 0-1，越高越有创意
    maxTokens: 4096,       // 最大输出 token 数
  },
});
```

## 选型建议

| 场景 | 推荐模型 |
|------|----------|
| 快速响应、简单任务 | GPT-4o-mini / Claude Haiku |
| 复杂推理、高质量输出 | GPT-4o / Claude Sonnet |
| 长文档处理 | Claude Sonnet（200K 上下文） |
| 性价比 | Gemini 2.0 Flash |

## 下一步

- [Chat 模型集成](/integrations/chat)
- [创建 Agent](/deepagents/creation)
