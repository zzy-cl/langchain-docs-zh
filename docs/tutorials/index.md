---
title: 实战案例总览
description: 从零到部署的完整实战案例
---

# 实战案例

## 为什么要看实战？

光看 API 文档容易"一看就会，一写就废"。实战案例帮你把零散的知识点串起来，看到**完整项目**是怎么组织的。

## 案例列表

| 案例 | 说明 | 技术栈 | 难度 | 学到什么 |
|------|------|--------|------|----------|
| [从零搭建 RAG 问答系统](/tutorials/rag-qa) | 从文档加载到智能问答 | LangChain + RAG | ⭐⭐ | 文档加载、切分、向量化、检索 |
| [构建能搜索的 Agent](/tutorials/search-agent) | 能搜索网页并总结答案 | LangChain + Tools | ⭐⭐ | 工具定义、Agent 决策、多步骤推理 |
| [多 Agent 协作任务](/tutorials/multi-agent) | 多个 Agent 分工合作 | LangChain + Multi-Agent | ⭐⭐⭐ | Agent 间通信、任务路由、结果汇总 |

## 学习路线建议

```mermaid
graph LR
    A["快速开始<br/>overview/quickstart"] --> B["RAG 问答<br/>⭐⭐"]
    B --> C["搜索 Agent<br/>⭐⭐"]
    C --> D["多 Agent 协作<br/>⭐⭐⭐"]
    D --> E["自定义项目"]

    style A fill:#22c55e,color:#fff
    style B fill:#3b82f6,color:#fff
    style C fill:#f59e0b,color:#000
    style D fill:#8b5cf6,color:#fff
    style E fill:#ef4444,color:#fff
```

## 前置准备

所有案例共享同一套开发环境：

```bash
# ① 创建项目
mkdir langchain-tutorials && cd langchain-tutorials
npm init -y

# ② 安装依赖
npm install langchain @langchain/openai zod

# ③ 配置 API Key
echo 'OPENAI_API_KEY=sk-your-key' > .env

# ④ 安装运行器
npm install -D tsx
```

运行方式：

```bash
npx tsx 案例文件.ts
```

## 常见问题

| 问题 | 解答 |
|------|------|
| 代码能直接运行吗？ | 能，配好 API Key 后直接 `npx tsx` 运行 |
| 需要什么基础？ | 会 TypeScript/JavaScript，了解 async/await |
| 没有 OpenAI Key 怎么办？ | 换其他厂商，详见 [Chat 模型集成](/integrations/chat) |

## 下一步

- [RAG 问答系统 →](/tutorials/rag-qa)（推荐先看这个）
- [搜索 Agent →](/tutorials/search-agent)
- [多 Agent 协作 →](/tutorials/multi-agent)
