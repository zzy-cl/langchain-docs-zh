---
title: Chains（链）
description: 把多个步骤串成流水线
---

# Chains（链）

## 这是什么？

链 = 把多个步骤串起来执行。就像工厂流水线——原料进来，经过加工、检验、包装，成品出去。

## 类比

```
写文章的链：搜索 → 大纲 → 写作 → 校对 → 输出
```

## 使用方式

```typescript
import { createChain } from "langchain";

// ① 定义每一步
const researchChain = createChain()
  .step("search", async (input) => {
    return await searchWeb(input.topic);
  })
  .step("summarize", async (searchResults) => {
    return await llm.invoke(`总结以下内容：${searchResults}`);
  })
  .step("format", async (summary) => {
    return `# 研究报告\n\n${summary}`;
  });

// ② 执行
const result = await researchChain.invoke({ topic: "LangChain 入门" });
```

## 链 vs Agent

| | 链 | Agent |
|--|------|------|
| 流程 | 固定步骤，顺序执行 | 动态决策，Agent 自己决定下一步 |
| 灵活性 | 低 | 高 |
| 适用 | 流程确定的任务 | 需要推理的任务 |

## 下一步

- [创建 Agent](/langchain/agents/creation)
- [Prompts](/langchain/prompts)
