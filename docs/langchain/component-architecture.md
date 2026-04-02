---
title: 组件架构
description: LangChain 的组件架构和模块关系
---

# 组件架构

## 模块关系

```
┌─────────────────────────────────────────┐
│  langchain（顶层包）                     │
│  包含 Agent、链、工具等高层组件          │
├─────────────────────────────────────────┤
│  @langchain/core（核心包）              │
│  消息、模型接口、工具基类、输出解析      │
├─────────────────────────────────────────┤
│  @langchain/openai / anthropic / ...    │
│  各模型厂商的集成包                      │
├─────────────────────────────────────────┤
│  @langchain/community                   │
│  社区维护的集成（文档加载器、向量库等）  │
└─────────────────────────────────────────┘
```

## 核心包（@langchain/core）

| 模块 | 说明 |
|------|------|
| `messages` | 消息类型（HumanMessage、AIMessage 等） |
| `models` | 模型接口抽象 |
| `tools` | 工具基类和 `tool()` 函数 |
| `output_parsers` | 输出解析器 |
| `prompts` | 提示词模板 |

## 顶层包（langchain）

| 模块 | 说明 |
|------|------|
| `agents` | Agent 创建和执行 |
| `chains` | 链的构建 |
| `memory` | 记忆管理 |
| `retrieval` | 检索相关 |
| `middleware` | 中间件 |

## 下一步

- [Messages（消息）](/langchain/messages)
- [Models（模型）](/langchain/models)
