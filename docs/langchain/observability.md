---
title: 可观测性
description: 用 LangSmith 追踪和监控 Agent 的运行
---

# 可观测性（LangSmith）

## 这是什么？

LangSmith = Agent 的"黑匣子"——记录 Agent 每一步做了什么，方便调试和监控。

## 核心功能

| 功能 | 说明 |
|------|------|
| **Tracing** | 追踪 Agent 的完整执行链路 |
| **Evaluation** | 评估 Agent 的回答质量 |
| **Prompt Engineering** | 迭代优化提示词 |
| **Monitoring** | 生产环境监控 |

## 使用方式

```bash
# 安装
npm install langsmith

# 设置环境变量
export LANGCHAIN_TRACING_V2=true
export LANGCHAIN_API_KEY=lsv2_xxx
export LANGCHAIN_PROJECT=my-agent
```

```typescript
import { createAgent } from "langchain";

// 开启追踪后，Agent 的每次调用都会自动记录到 LangSmith
const agent = createAgent({
  model: "openai:gpt-4o",
  tools: [getWeather],
});

// 这次调用会被自动追踪
await agent.invoke({
  messages: [{ role: "user", content: "北京天气？" }],
});
```

## 查看追踪

访问 [smith.langchain.com](https://smith.langchain.com)，登录后就能看到每条调用的详细记录：
- 输入消息
- Agent 决策过程
- 工具调用详情
- 最终输出
- 耗时和 token 消耗

## 下一步

- [部署](/langchain/deployment)
- [LangGraph 可观测性](/langgraph/observability)
