---
title: 客服系统
description: 用 Multi-Agent 构建智能客服系统
---

# 客服系统

## 目标

构建一个多 Agent 客服系统——路由器根据问题类型，自动转给销售、技术支持或退款处理。

## 架构

```
用户提问 → 路由 Agent（判断类型）→ 销售 Agent / 技术 Agent / 退款 Agent
```

## 实现

```typescript
import { createAgent, createHandoff } from "langchain";
import { tool } from "langchain";
import { z } from "zod";

// ① 查询订单工具
const getOrder = tool(
  ({ orderId }) => {
    // 模拟数据库查询
    const orders = {
      "1001": { status: "已发货", tracking: "SF123456" },
      "1002": { status: "待支付", amount: 299 },
    };
    return JSON.stringify(orders[orderId] || { error: "订单不存在" });
  },
  {
    name: "get_order",
    description: "查询订单信息",
    schema: z.object({ orderId: z.string() }),
  }
);

// ② 创建专门的 Agent
const salesAgent = createAgent({
  model: "openai:gpt-4o",
  tools: [getOrder],
  system: "你是销售客服，回答产品咨询、价格、优惠活动等问题。语气热情友好。",
});

const techAgent = createAgent({
  model: "openai:gpt-4o",
  tools: [getOrder],
  system: "你是技术支持，解决产品使用问题。回答专业且耐心。",
});

const refundAgent = createAgent({
  model: "openai:gpt-4o",
  tools: [getOrder],
  system: "你是退款专员，处理退款、换货申请。需要确认订单号后操作。",
});

// ③ 创建路由 Agent
const router = createAgent({
  model: "openai:gpt-4o",
  handoffs: [
    createHandoff(salesAgent, { name: "sales", description: "产品咨询、价格、优惠" }),
    createHandoff(techAgent, { name: "tech", description: "技术问题、使用帮助" }),
    createHandoff(refundAgent, { name: "refund", description: "退款、换货" }),
  ],
  system: "你是客服路由器。根据用户问题类型，转给对应的专家。",
});

// ④ 测试
const result = await router.invoke({
  messages: [{ role: "user", content: "我想退款，订单号 1002" }],
});
// → 自动转给 refundAgent 处理
```

## 下一步

- [Multi-Agent](/langchain/multi-agent)
- [Handoffs](/langchain/multi-agent#handoffs)
