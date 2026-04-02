---
title: 人工介入
description: 在 LangGraph 工作流中暂停等待人工确认
---

# 人工介入（Human-in-the-Loop）

## 使用方式

```typescript
import { interrupt } from "@langchain/langgraph";

// 在节点中使用 interrupt
const sendEmailNode = async (state) => {
  // ① 暂停，等人工确认
  const approval = interrupt({
    question: `确认发送邮件到 ${state.email.to}？`,
    data: state.email,
  });

  // ② 用户确认后继续
  if (approval.approved) {
    await actuallySendEmail(state.email);
    return { messages: [{ role: "assistant", content: "邮件已发送。" }] };
  } else {
    return { messages: [{ role: "assistant", content: "邮件已取消。" }] };
  }
};

const graph = new StateGraph(/* ... */)
  .addNode("send_email", sendEmailNode)
  // ...
  .compile();
```

## 用户确认

```typescript
// 执行到 interrupt 会暂停
const result = await app.invoke({ /* ... */ });

// 用户确认后恢复
const result2 = await app.invoke(
  null,
  { resume: { approved: true } }
);
```

## 适用场景

- 发邮件/消息前确认
- 支付/转账确认
- 删除操作确认
- 关键系统配置变更

## 下一步

- [Interrupts](/langgraph/interrupts)
- [Deep Agents 人工介入](/deepagents/human-in-the-loop)
