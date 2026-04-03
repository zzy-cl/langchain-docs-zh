---
title: 常见问题
description: LangChain 使用过程中的常见问题和解答
---

# 常见问题（FAQ）

## 通用问题

### Q: Deep Agents、LangChain、LangGraph 什么关系？

A: 三层架构：Deep Agents（最高层）基于 LangChain（中间层），LangChain 基于 LangGraph（最底层）。类比：Deep Agents = 成品车，LangChain = 零件箱，LangGraph = 发动机。详见 [产品关系与选型指南](/overview/product-comparison)。

### Q: 我应该从哪个开始学？

A: 新手建议从 [Deep Agents](/deepagents/) 开始——最快上手，功能最全。不够用了再往 LangChain 和 LangGraph 走。详见 [选型流程图](/overview/product-comparison#选型流程)。

### Q: 必须用 OpenAI 的模型吗？

A: 不必须。LangChain 支持 OpenAI、Anthropic、Google、Azure 等多个厂商，接口统一，切换方便。详见 [Chat 模型集成](/integrations/chat)。

### Q: TypeScript 和 JavaScript 都能用吗？

A: 都能。本教程全部使用 TypeScript，但 JavaScript 同样兼容，去掉类型标注即可。

### Q: 这和 Python 版 LangChain 有什么区别？

A: 功能上基本一致，但 TypeScript 版更适合前端/全栈开发者。部分 Python 特有的集成（如某些向量库）在 TS 版可能没有。

## Agent 问题

### Q: Agent 不调用工具怎么办？

A: 检查三点：
1. 工具的 `description` 是否清晰具体
2. 工具 schema 的字段是否有 `describe()`
3. System Prompt 是否引导了工具使用

### Q: Agent 回复太慢？

A: 试试这些方法：
1. 用更快的模型（gpt-4o-mini、claude-haiku-4）
2. 减少工具数量（5-10 个为宜）
3. 用流式输出（streaming），让用户看到进度
4. 设置合理的 `maxTokens`

### Q: 怎么控制 Agent 的成本？

A:
1. 开发阶段用 `gpt-4o-mini`
2. 开启缓存（[缓存集成](/integrations/caching)）
3. 限制 `maxTokens`
4. 监控 token 消耗（[回调集成](/integrations/callbacks)）

### Q: Agent 进入死循环怎么办？

A: 设置最大迭代次数（`maxIterations`），超过后自动终止。同时检查 System Prompt 是否让 Agent 反复调用同一工具。

## RAG 问题

### Q: RAG 回答不准确？

A: 按优先级尝试：
1. 优化 `chunkSize` 和 `chunkOverlap`（推荐 500-1000 / 50-100）
2. 换更好的 Embedding 模型
3. 增加 `topK`（检索更多相关文档）
4. 优化文档质量（清洗噪声内容）
5. 在 System Prompt 中约束"只根据资料回答"

### Q: 怎么处理中文文档？

A: LangChain 原生支持中文。注意：
1. 切分时加中文分隔符（`"。"` `"；"` `"，"`）
2. Embedding 推荐 `text-embedding-3-small`
3. 避免用英文的分隔符切分中文

### Q: 向量库选哪个？

A: 开发用 `MemoryVectorStore`，小项目用 `Chroma`，生产环境用 `Pinecone` 或 `Qdrant`。详见 [存储集成](/integrations/stores)。

## LangGraph 问题

### Q: Graph API 和 Functional API 怎么选？

A: 简单流程用 Functional API，复杂流程（有分支、循环、人工介入）用 Graph API。详见 [两种 API 怎么选](/langgraph/api-choice)。

### Q: 执行中断了怎么办？

A: 开启持久化后，从最近的检查点恢复。详见 [持久化](/langgraph/persistence)。

### Q: 怎么实现人工介入？

A: LangGraph 原生支持 `interrupt()`，可以在任意节点暂停等待人工确认。详见 [Human-in-the-Loop](/langgraph/human-in-the-loop)。

## 集成问题

### Q: 怎么切换模型厂商？

A: 只需改两个地方：安装的包和模型标识符。接口完全统一。详见 [Chat 模型集成](/integrations/chat)。

### Q: 工具调用安全吗？

A: 需要注意：
1. 不要给 Agent 无限制的数据库写入权限
2. 验证工具输入参数
3. 用中间件做限流和超时控制

## 版本兼容

### Q: LangChain 更新太快，文档跟不上？

A: 本教程基于最新稳定版。遇到版本问题时，检查 [官方 Changelog](https://docs.langchain.com/oss/javascript/langchain/changelog-js)。

## 还有问题？

- [GitHub Issues](https://github.com/xxx/langchain-docs-zh/issues)
- [官方文档](https://docs.langchain.com)
- [官方 GitHub](https://github.com/langchain-ai)
