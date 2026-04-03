---
title: 组件架构
description: LangChain 的组件架构和模块关系
---

# 组件架构

## 整体结构

LangChain 采用分层架构——底层是核心接口，中间是各厂商集成，顶层是 Agent、Chain 等高层组件。

```mermaid
graph BT
    COMMUNITY["@langchain/community<br/>社区集成<br/>（向量库、文档加载器）"] --> CORE
    INTEGRATIONS["@langchain/openai<br/>@langchain/anthropic<br/>@langchain/google-genai<br/>各厂商集成包"] --> CORE
    CORE["@langchain/core<br/>核心接口<br/>（消息、模型、工具基类）"] --> TOP
    TOP["langchain<br/>顶层包<br/>（Agent、Chain、Memory）"]

    style TOP fill:#8b5cf6,color:#fff
    style CORE fill:#3b82f6,color:#fff
    style INTEGRATIONS fill:#22c55e,color:#fff
    style COMMUNITY fill:#f59e0b,color:#000
```

## 各层职责

### @langchain/core — 地基

所有包都依赖它。定义了最基本的数据结构和接口：

| 模块 | 说明 |
|------|------|
| `messages` | 消息类型（HumanMessage、AIMessage 等） |
| `models` | 模型接口抽象（ChatModel） |
| `tools` | 工具基类和 `tool()` 函数 |
| `output_parsers` | 输出解析器 |
| `prompts` | 提示词模板 |

> 💡 你很少直接用 core，但它无处不在——就像空气，平时不注意，但缺了不行。

### 各厂商集成包 — 桥梁

每个 LLM 厂商一个包，把厂商的 API 翻译成 core 的标准接口：

```typescript
// 用法完全一样，只是 import 不同
import { ChatOpenAI } from "@langchain/openai";
import { ChatAnthropic } from "@langchain/anthropic";

const gpt = new ChatOpenAI({ model: "gpt-4o" });
const claude = new ChatAnthropic({ model: "claude-sonnet-4-20250514" });

// 调用方式完全一致
await gpt.invoke("你好");
await claude.invoke("你好");
```

### langchain — 顶层包

把底层能力组合成开箱即用的高层组件：

| 模块 | 说明 |
|------|------|
| `agents` | Agent 创建和执行 |
| `chains` | 链的构建 |
| `memory` | 记忆管理 |
| `retrieval` | RAG 检索 |
| `middleware` | 中间件 |

## 依赖关系速查

```mermaid
graph LR
    APP["你的应用"] -->|"npm install"| L["langchain"]
    APP -->|"npm install"| OAI["@langchain/openai"]
    L --> CORE["@langchain/core"]
    OAI --> CORE

    style APP fill:#ef4444,color:#fff
    style L fill:#8b5cf6,color:#fff
    style OAI fill:#22c55e,color:#fff
    style CORE fill:#3b82f6,color:#fff
```

## 我该装哪些包？

| 需求 | 最小安装 |
|------|---------|
| 只调模型 | `@langchain/core` + `@langchain/openai` |
| 做 Agent | `langchain` + `@langchain/openai` |
| 做 RAG | `langchain` + `@langchain/openai` + `@langchain/community` |

## 下一步

- [Messages（消息）](/langchain/messages)
- [Models（模型）](/langchain/models)
- [安装](/langchain/install)
