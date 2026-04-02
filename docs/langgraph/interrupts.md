---
title: Interrupts（中断）
description: 在指定节点暂停，等人工确认后继续
---

# Interrupts（中断）

## 这是什么？

在图的某个节点暂停执行，等用户确认后再继续。就像游戏里的"暂停"键。

## 使用方式

```typescript
const graph = new StateGraph(/* ... */)
  .addNode("search", searchNode)
  .addNode("send_email", sendEmailNode)
  .addNode("review", reviewNode)

  .addEdge(START, "search")
  .addEdge("search", "review")

  // 在 send_email 前中断，等人工确认
  .addEdge("review", "send_email", { interrupt: true })

  .addEdge("send_email", END);

// 执行到 review 后会暂停
const app = graph.compile();
let result = await app.invoke({ /* ... */ });

// 用户确认后继续
result = await app.invoke(null, { resume: true });
```

## 适用场景

- 📧 发邮件前确认
- 💳 金融操作确认
- 🗑️ 删除操作确认
- 🔧 关键配置变更

## 下一步

- [人工介入](/langgraph/human-in-the-loop)
- [持久化](/langgraph/persistence)
