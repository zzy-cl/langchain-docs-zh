---
title: 产品关系与选型指南
description: Deep Agents、LangChain、LangGraph 三大产品的关系、区别与选型建议
---

# 产品关系与选型指南

## 架构全景

```mermaid
graph TB
    subgraph "你的应用"
        APP["🧑‍💻 你的代码"]
    end

    subgraph "Deep Agents（Agent Harness）"
        DA["🪄 createDeepAgent()"]
        DA_SUB["子 Agent 派生"]
        DA_FS["文件系统"]
        DA_MEM["长期记忆"]
        DA_SANDBOX["沙箱"]
    end

    subgraph "LangChain（Agent 框架）"
        LC["🦜 createAgent()"]
        LC_MODEL["Models 模型集成"]
        LC_TOOL["Tools 工具"]
        LC_CHAIN["Chains 链"]
        LC_MEM["Memory 记忆"]
        LC_RAG["Retrieval 检索"]
    end

    subgraph "LangGraph（编排运行时）"
        LG["🔷 StateGraph"]
        LG_STATE["State 状态管理"]
        LG_NODE["Nodes 节点"]
        LG_EDGE["Edges 边"]
        LG_PERSIST["Persistence 持久化"]
        LG_HITL["Human-in-the-Loop"]
    end

    APP --> DA
    APP --> LC
    APP --> LG

    DA -.->|"基于"| LC
    LC -.->|"基于"| LG

    DA --- DA_SUB & DA_FS & DA_MEM & DA_SANDBOX
    LC --- LC_MODEL & LC_TOOL & LC_CHAIN & LC_MEM & LC_RAG
    LG --- LG_STATE & LG_NODE & LG_EDGE & LG_PERSIST & LG_HITL

    style DA fill:#f59e0b,color:#000
    style LC fill:#3b82f6,color:#fff
    style LG fill:#8b5cf6,color:#fff
```

## 一句话总结

> **Deep Agents = LangChain + LangGraph + 内置增强功能（子 Agent、文件系统、沙箱、长期记忆）。**

## 三层关系

```mermaid
graph LR
    DA["🪄 Deep Agents<br/>开箱即用"] -->|"封装"| LC["🦜 LangChain<br/>灵活组合"]
    LC -->|"封装"| LG["🔷 LangGraph<br/>底层控制"]

    style DA fill:#f59e0b,color:#000
    style LC fill:#3b82f6,color:#fff
    style LG fill:#8b5cf6,color:#fff
```

- **Deep Agents** 在 LangChain 基础上增加了子 Agent、文件系统、沙箱等功能
- **LangChain** 的 Agent 底层自动使用 LangGraph
- **LangGraph** 是最底层，独立运行

## 详细对比

| 维度 | 🪄 Deep Agents | 🦜 LangChain | 🔷 LangGraph |
|------|----------------|--------------|--------------|
| **定位** | Agent Harness | Agent 框架 | 编排运行时 |
| **上手难度** | ⭐ 最简单 | ⭐⭐ 中等 | ⭐⭐⭐ 需要理解底层 |
| **灵活性** | 中等 | 高 | 最高 |
| **安装** | `deepagents` | `langchain` | `@langchain/langgraph` |
| **内置功能** | 子 Agent、文件系统、沙箱、记忆 | 模型集成、工具、链、检索 | 状态图、持久化、中断、时间旅行 |
| **适合场景** | 快速原型、复杂多步骤任务 | 自定义 Agent、RAG | 复杂工作流、生产级 |

## 选型流程

```mermaid
flowchart TD
    START(["你需要构建什么？"]) --> Q1{"任务简单吗？<br/>一问一答就行"}
    Q1 -->|是| A1["✅ LangChain<br/>createAgent() 就够了"]
    Q1 -->|否| Q2{"需要子 Agent、<br/>文件系统、沙箱？"}
    Q2 -->|是| A2["✅ Deep Agents<br/>开箱即用"]
    Q2 -->|否| Q3{"需要条件分支、<br/>循环、人工介入？"}
    Q3 -->|是| A3["✅ LangGraph<br/>底层编排"]
    Q3 -->|否| A4["✅ LangChain<br/>灵活组合"]

    style A1 fill:#3b82f6,color:#fff
    style A2 fill:#f59e0b,color:#000
    style A3 fill:#8b5cf6,color:#fff
    style A4 fill:#3b82f6,color:#fff
```

## 常见问题

**Q: 我需要学 LangGraph 才能用 LangChain 吗？**
A: **不需要。** LangChain 的 Agent 底层自动调用 LangGraph，你不需要直接接触它。只有需要底层控制时才直接用 LangGraph。

**Q: Deep Agents 和 LangChain 的 Agent 有什么区别？**
A: Deep Agents 是 LangChain Agent 的"增强版"，内置了子 Agent、文件系统、沙箱、长期记忆等。如果你不需要这些，用 LangChain 的 Agent 就够了。

**Q: 三个可以混用吗？**
A: **可以。** Deep Agents 内部就用了 LangChain 和 LangGraph。你可以根据需要在不同层级切换。

## 下一步

- [框架 vs 运行时 vs Harness 详解](/overview/frameworks-runtimes-harnesses)
- [快速开始](/overview/quickstart)
- [核心概念](/overview/concepts)
