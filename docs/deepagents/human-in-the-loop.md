---
title: 人工介入（Human-in-the-Loop）
description: 在关键步骤暂停，等用户确认后再继续
---

# 人工介入（Human-in-the-Loop）

## 这是什么？

Agent 干到关键步骤会举手问你："老板，这步能做吗？" 你点头它才继续。

## 类比

> 就像自动驾驶汽车——平时自己开，遇到复杂路口会提示你接管。

## 使用方式

```typescript
import { createDeepAgent } from "deepagents";

const sendEmail = tool(
  async ({ to, subject, body }) => {
    // 发送邮件前需要确认
    return { requiresApproval: true, action: "send_email", data: { to, subject, body } };
  },
  {
    name: "send_email",
    description: "发送邮件（需要用户确认）",
    schema: z.object({
      to: z.string(),
      subject: z.string(),
      body: z.string(),
    }),
  }
);

const agent = createDeepAgent({
  tools: [sendEmail],
  humanInTheLoop: {
    enabled: true,
    approvalTools: ["send_email"], // 只有这个工具需要确认
  },
});
```

## 适用场景

- 📧 发邮件、发消息（别发错人）
- 💳 支付、转账操作
- 🗑️ 删除数据
- 🔧 系统配置变更

## 下一步

- [工具](/deepagents/tools)
- [LangGraph 人工介入](/langgraph/human-in-the-loop)
