---
title: 人工介入
description: 在关键步骤暂停，等用户确认后再继续
---

# 人工介入（Human-in-the-Loop）

## 这是什么？

Agent 做到关键步骤会举手问你："老板，这步能做吗？" 你点头它才继续。

## 使用方式

```typescript
import { createAgent, tool } from "langchain";
import { z } from "zod";

const deleteFile = tool(
  async ({ path }) => {
    // 标记为需要人工确认
    return {
      requiresApproval: true,
      action: "delete_file",
      data: { path },
      message: `即将删除文件: ${path}，是否确认？`,
    };
  },
  {
    name: "delete_file",
    description: "删除文件（需要用户确认）",
    schema: z.object({ path: z.string() }),
  }
);

const agent = createAgent({
  model: "openai:gpt-4o",
  tools: [deleteFile],
  humanInTheLoop: {
    enabled: true,
    approvalTools: ["delete_file"],
  },
});
```

## 适用场景

- 🗑️ 删除操作
- 📧 发送邮件/消息
- 💳 金融交易
- 🔧 系统配置变更

## 下一步

- [Guardrails](/langchain/agents/guardrails)
- [Deep Agents 人工介入](/deepagents/human-in-the-loop)
