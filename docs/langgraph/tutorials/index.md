---
title: LangGraph 实战教程
description: 从简单到复杂，一步步学习 LangGraph 实战开发
---

# LangGraph 实战教程

## 学习路径

```mermaid
graph LR
    A["⭐ 入门<br/>快速开始"] --> B["⭐⭐ 基础<br/>核心概念"]
    B --> C["⭐⭐⭐ 进阶<br/>自定义 RAG"]
    C --> D["⭐⭐⭐⭐ 高级<br/>多 Agent 系统"]

    style A fill:#22c55e,color:#fff
    style B fill:#3b82f6,color:#fff
    style C fill:#f59e0b,color:#000
    style D fill:#ef4444,color:#fff
```

## 教程列表

### 入门级

| 教程 | 说明 | 难度 |
|------|------|------|
| [快速开始](/langgraph/quickstart) | 几分钟内创建第一个对话 Agent | ⭐ |

### 进阶级

| 教程 | 说明 | 难度 |
|------|------|------|
| [自定义 RAG Agent](/langgraph/tutorials/custom-rag) | 构建带质量评估的 RAG 系统 | ⭐⭐⭐ |

### 即将推出

| 教程 | 说明 | 难度 |
|------|------|------|
| 多 Agent 协作 | 多个 Agent 分工合作 | ⭐⭐⭐⭐ |
| 人工审批流程 | 关键步骤暂停等人工确认 | ⭐⭐⭐ |
| 数据处理管道 | 长时间运行的批处理任务 | ⭐⭐⭐ |

## 推荐学习顺序

1. **先装好环境** → [安装](/langgraph/install)
2. **跑通最简单的例子** → [快速开始](/langgraph/quickstart)
3. **理解核心概念** → [State](/langgraph/state)、[Nodes](/langgraph/nodes)、[Edges](/langgraph/edges)
4. **做实战项目** → [自定义 RAG](/langgraph/tutorials/custom-rag)
5. **掌握高级特性** → [持久化](/langgraph/persistence)、[人工介入](/langgraph/human-in-the-loop)

## 前置准备

```bash
# 安装所有教程需要的包
npm install @langchain/langgraph @langchain/core @langchain/openai zod

# 配置 API Key
echo "OPENAI_API_KEY=sk-xxx" > .env
```

## 下一步

- [快速开始](/langgraph/quickstart) — 第一个教程
- [LangGraph 概览](/langgraph/) — 整体了解 LangGraph
