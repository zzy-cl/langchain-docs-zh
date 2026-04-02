---
title: Deep Agents 概览
description: 构建能规划、能派子 Agent、能管理文件系统的智能 Agent
---

# Deep Agents 概览

## 这是什么？

`deepagents` 是一个 **开箱即用的 Agent 框架**。它在 LangChain 的基础上，内置了：

- 🧠 **任务规划** — 自动把复杂任务拆成子步骤
- 👥 **子 Agent** — 派专门的 Agent 去处理子任务
- 📁 **文件系统** — Agent 之间共享文件和上下文
- 💾 **长期记忆** — 跨会话记住重要信息
- 🖥️ **沙箱** — 安全执行代码
- 🔌 **ACP 协议** — 接入 IDE 和编辑器

## 为什么用它？

如果你需要做一个能处理**复杂多步骤任务**的 Agent，Deep Agents 是最快的起点。

| 场景 | Deep Agents 帮你解决 |
|------|----------------------|
| 写一篇长文章 | 自动拆成搜索 → 大纲 → 写作 → 校对 |
| 做数据分析 | 自动派子 Agent 去读文件、跑代码、汇总结果 |
| 客户支持 | 根据问题类型自动路由到不同的处理 Agent |

## 安装

```bash
npm install deepagents @langchain/core zod
```

## 最简示例

```typescript
import { createDeepAgent } from "deepagents";

const agent = createDeepAgent({
  system: "你是一个有帮助的助手",
});

const result = await agent.invoke({
  messages: [{ role: "user", content: "帮我写一首关于春天的诗" }],
});

console.log(result);
```

## 与其他产品的关系

```
Deep Agents = LangChain + LangGraph + 内置能力（子 Agent、文件系统、沙箱等）
```

详见 [产品关系与选型指南](/overview/product-comparison)。

## 下一步

- [快速开始](/deepagents/quickstart)
- [创建 Agent](/deepagents/creation)
- [工具（Tools）](/deepagents/tools)
