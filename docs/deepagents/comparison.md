---
title: 对比 Claude Agent SDK / Codex
description: Deep Agents 与 Claude Agent SDK、OpenAI Codex 的横向对比，帮你选择最适合的 Agent 框架
---

# 对比 Claude Agent SDK / Codex

## 这是什么？

市面上有三个主流的 Agent 框架——Deep Agents、Claude Agent SDK、OpenAI Codex。它们都能让 AI 自动完成复杂任务，但定位和能力差异很大。

打个比方：
- **Deep Agents** 像瑞士军刀——什么都能干，不挑模型
- **Claude Agent SDK** 像苹果全家桶——Claude 生态内的最优体验
- **Codex** 像 VS Code 内置终端——专注编码，轻量快速

## 一句话对比

| 产品 | 定位 | 绑定模型 |
|------|------|----------|
| **Deep Agents** | 模型无关的全功能 Agent 框架 | OpenAI / Anthropic / Google / Ollama 等 |
| **Claude Agent SDK** | Anthropic 官方 Agent 框架 | 仅 Claude |
| **OpenAI Codex** | OpenAI 官方编码 Agent | 仅 GPT |

## 架构对比

```mermaid
graph TB
    subgraph "Deep Agents"
        DA["🤖 Deep Agent"]
        DA --> PLAN["📋 任务规划"]
        DA --> SUB["👥 子 Agent"]
        DA --> FS["📁 文件系统"]
        DA --> MEM["💾 记忆"]
        DA --> SANDBOX["🖥️ 沙箱"]
        DA --> ACP["🔌 ACP 协议"]
        DA --> MODEL_DA["🧠 多模型切换"]
    end

    subgraph "Claude Agent SDK"
        CA["🤖 Claude Agent"]
        CA --> PLAN2["📋 任务规划"]
        CA --> SUB2["👥 子 Agent"]
        CA --> FS2["📁 文件系统"]
        CA --> SANDBOX2["🖥️ 沙箱"]
        CA --> MODEL_CA["🧠 仅 Claude"]
    end

    subgraph "OpenAI Codex"
        COD["🤖 Codex Agent"]
        COD --> PLAN3["📋 编码任务"]
        COD --> SANDBOX3["🖥️ 沙箱"]
        COD --> MODEL_COD["🧠 仅 GPT"]
    end

    style DA fill:#f59e0b,color:#000
    style CA fill:#d97706,color:#fff
    style COD fill:#22c55e,color:#fff
```

## 详细对比

| 维度 | Deep Agents | Claude Agent SDK | Codex |
|------|-------------|------------------|-------|
| **模型支持** | OpenAI / Anthropic / Google / Ollama 等 | 仅 Claude | 仅 GPT |
| **子 Agent** | ✅ 支持（同步+异步） | ✅ 支持 | ❌ 不支持 |
| **文件系统** | ✅ 内置（多后端） | ✅ 内置 | ⚙️ 有限 |
| **沙箱** | ✅ 支持（Docker/云） | ✅ 支持 | ✅ 支持 |
| **记忆** | ✅ 短期 + 长期 | ⚙️ 有限 | ❌ 不支持 |
| **技能系统** | ✅ 支持 | ❌ 不支持 | ❌ 不支持 |
| **前端集成** | ✅ React 组件 | ❌ 需自建 | ❌ 需自建 |
| **ACP 协议** | ✅ 支持 | ❌ 不支持 | ❌ 不支持 |
| **流式输出** | ✅ 全事件流 | ✅ 支持 | ✅ 支持 |
| **人工介入** | ✅ 支持 | ⚙️ 需自建 | ❌ 不支持 |
| **上下文管理** | ✅ 多种策略 | ⚙️ 依赖模型 | ⚙️ 依赖模型 |
| **开源** | ✅ 是 | ❌ 否 | ❌ 否 |

## 功能雷达图对比

```mermaid
graph LR
    subgraph "Deep Agents 核心优势"
        D1["✅ 模型无关<br/>不被任何厂商锁定"]
        D2["✅ 功能最全<br/>子Agent+记忆+文件+沙箱+ACP"]
        D3["✅ 开源可控<br/>可自定义一切"]
        D4["✅ 前端集成<br/>React 组件开箱即用"]
    end

    subgraph "Claude Agent SDK 优势"
        C1["✅ Claude 原生<br/>与模型深度集成"]
        C2["✅ 企业级稳定<br/>Anthropic 官方维护"]
    end

    subgraph "Codex 优势"
        O1["✅ 轻量快速<br/>专注编码场景"]
        O2["✅ 低学习成本<br/>简单直接"]
    end
```

## 怎么选？

| 你的需求 | 推荐 | 原因 |
|----------|------|------|
| 想灵活切换模型 / 多模型混用 | **Deep Agents** ✅ | 唯一支持多模型的框架 |
| 想要最完整的功能 | **Deep Agents** ✅ | 子 Agent + 记忆 + 文件系统 + 前端 + ACP |
| 只用 Claude 且要最佳体验 | **Claude Agent SDK** | 与 Claude 深度集成 |
| 只做编码辅助，要轻量 | **Codex** | 专注编码，上手快 |
| 想要开源、可自定义 | **Deep Agents** ✅ | 完全开源，社区活跃 |
| 需要前端实时展示 | **Deep Agents** ✅ | 提供 React 组件 |

## 选型决策流程

```mermaid
graph TD
    START["🤔 选哪个？"] --> Q1{"需要多模型吗？"}
    Q1 -->|是| DA["✅ Deep Agents"]
    Q1 -->|否| Q2{"只用 Claude？"}
    Q2 -->|是| Q3{"需要完整功能？"}
    Q3 -->|是| DA
    Q3 -->|否| CASDK["Claude Agent SDK"]
    Q2 -->|否| Q4{"只用 GPT？"}
    Q4 -->|是| Q5{"只做编码？"}
    Q5 -->|是| CODEX["Codex"]
    Q5 -->|否| DA
    Q4 -->|否| DA

    style DA fill:#f59e0b,color:#000
    style CASDK fill:#d97706,color:#fff
    style CODEX fill:#22c55e,color:#fff
```

## 迁移成本

| 从 | 迁移到 Deep Agents | 难度 |
|----|---------------------|------|
| Claude Agent SDK | 替换 API 调用，调整配置 | ⭐⭐ 低 |
| OpenAI Codex | 重写 Agent 定义，添加工具和子 Agent | ⭐⭐⭐ 中 |
| 自建 Agent | 改用 `createDeepAgent`，保留工具逻辑 | ⭐⭐ 低 |

## 下一步

- [Deep Agents 概览](/deepagents/) — 了解 Deep Agents 的全部能力
- [快速开始](/deepagents/quickstart) — 几分钟创建你的第一个 Agent
- [产品关系与选型指南](/overview/product-comparison) — 更多产品对比
