---
title: 技能（Skills）
description: 扩展 Agent 能力的技能系统
---

# 技能（Skills）

## 这是什么？

技能 = 一组预定义的能力包。比如"代码审查技能"包含：读代码、运行测试、生成报告。

比单个工具更高级——一个技能里可以包含多个工具、一个专门的系统提示、甚至一个子 Agent。

## 使用方式

```typescript
import { createDeepAgent } from "deepagents";

// ① 定义技能
const codeReviewSkill = {
  name: "code_review",
  description: "审查代码质量，找出 bug 和改进建议",
  tools: [readFile, runLinter, runTests],
  system: "你是一个资深代码审查专家。",
};

// ② 把技能传给 Agent
const agent = createDeepAgent({
  skills: [codeReviewSkill],
  system: "你是一个开发助手，需要审查代码时使用 code_review 技能。",
});
```

## 技能 vs 工具

| | 工具 | 技能 |
|--|------|------|
| 范围 | 单个操作 | 一组操作 + 专门的系统提示 |
| 类比 | 一把螺丝刀 | 整个工具箱 |
| 适用 | 简单任务 | 复杂任务 |

## 下一步

- [工具](/deepagents/tools)
- [子 Agent](/deepagents/subagents)
