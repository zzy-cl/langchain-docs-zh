---
title: 常见问题
description: LangChain 使用过程中的常见问题和解答
---

# 常见问题（FAQ）

## 通用问题

### Q: Deep Agents、LangChain、LangGraph 什么关系？

A: 三层架构：Deep Agents（最高层）基于 LangChain（中间层），LangChain 基于 LangGraph（最底层）。详见 [产品关系与选型指南](/overview/product-comparison)。

### Q: 我应该从哪个开始学？

A: 新手建议从 [Deep Agents](/deepagents/) 开始——最快上手，功能最全。不够用了再往 LangChain 和 LangGraph 走。

### Q: 必须用 OpenAI 的模型吗？

A: 不必须。LangChain 支持 OpenAI、Anthropic、Google 等多个厂商。详见 [集成](/integrations/chat)。

### Q: TypeScript 和 JavaScript 都能用吗？

A: 都能。本教程全部使用 TypeScript，但 JavaScript 同样兼容，去掉类型标注即可。

## Agent 问题

### Q: Agent 不调用工具怎么办？

A: 检查工具的 `description` 是否清晰。Agent 靠描述决定是否调用，描述越具体越好。

### Q: Agent 回复太慢？

A: 试试这些方法：
1. 用更快的模型（gpt-4o-mini、claude-haiku）
2. 减少工具数量
3. 用流式输出，让用户看到进度

### Q: 怎么控制 Agent 的成本？

A: 
1. 用更便宜的模型
2. 开启缓存（[缓存集成](/integrations/caching)）
3. 限制最大 token 数
4. 监控 token 消耗（[可观测性](/langchain/observability)）

## RAG 问题

### Q: RAG 回答不准确？

A: 
1. 调整 chunkSize 和 chunkOverlap
2. 换更好的 embedding 模型
3. 增加 topK 值（检索更多相关文档）
4. 优化文档质量

### Q: 怎么处理中文文档？

A: LangChain 原生支持中文。embedding 模型推荐用 `text-embedding-3-small`，对中文效果不错。

## LangGraph 问题

### Q: Graph API 和 Functional API 怎么选？

A: 简单流程用 Functional API，复杂流程（有分支、循环）用 Graph API。详见 [两种 API 怎么选](/langgraph/api-choice)。

### Q: 执行中断了怎么办？

A: 开启持久化后，从最近的检查点恢复。详见 [持久化](/langgraph/persistence)。

## 版本兼容

### Q: LangChain 更新太快，文档跟不上？

A: 本教程基于最新稳定版。遇到版本问题时，检查 [官方 Changelog](https://docs.langchain.com/oss/javascript/langchain/changelog-js)。

## 还有问题？

- [GitHub Issues](https://github.com/xxx/langchain-docs-zh/issues)
- [官方文档](https://docs.langchain.com)
- [官方 GitHub](https://github.com/langchain-ai)
