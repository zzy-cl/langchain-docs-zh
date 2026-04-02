---
title: 产品关系与选型指南
description: Deep Agents、LangChain、LangGraph 三大产品的关系、区别与选型建议
---

# 产品关系与选型指南

## 一句话总结

> **Deep Agents 是高层封装，LangChain 是中间框架，LangGraph 是底层引擎。**

## 三层架构关系

```
┌─────────────────────────────────────────┐
│  Deep Agents（Agent Harness）           │  ← 开箱即用，最高层
│  内置子 Agent、文件系统、记忆、沙箱       │
├─────────────────────────────────────────┤
│  LangChain（Agent 框架）                │  ← 灵活组合，中间层
│  提供模型、工具、链、检索等构件           │
├─────────────────────────────────────────┤
│  LangGraph（编排运行时）                │  ← 底层控制，最底层
│  状态图、持久化、人工介入、时间旅行       │
└─────────────────────────────────────────┘
```

## 详细对比

| 维度 | Deep Agents | LangChain | LangGraph |
|------|-------------|-----------|-----------|
| **定位** | Agent Harness | Agent 框架 | 编排运行时 |
| **上手难度** | ⭐ 最简单 | ⭐⭐ 中等 | ⭐⭐⭐ 需要理解底层 |
| **灵活性** | 中等（封装好了） | 高 | 最高 |
| **内置功能** | 子 Agent、文件系统、沙箱、记忆 | 模型集成、工具、链 | 状态图、持久化、中断 |
| **适合场景** | 快速原型、复杂任务 | 自定义 Agent、RAG | 复杂工作流、生产级 |
| **依赖关系** | 基于 LangChain | 基于 LangGraph | 独立底层 |
| **安装包** | `deepagents` | `langchain` | `@langchain/langgraph` |

## 选型流程图

```
你需要构建什么？
│
├─ 快速做一个能完成复杂任务的 Agent
│  └─ ✅ Deep Agents
│
├─ 需要自定义 Agent 行为（工具调用、结构化输出等）
│  └─ ✅ LangChain
│
├─ 需要复杂的多步骤工作流（条件分支、循环、人工审批）
│  └─ ✅ LangGraph
│
└─ 不确定？
   └─ 先从 Deep Agents 开始，不够用了再往下走
```

## 常见问题

**Q: 我需要学 LangGraph 才能用 LangChain 吗？**
A: 不需要。LangChain 的 Agent 底层自动调用 LangGraph，你不需要直接接触它。

**Q: Deep Agents 和 LangChain 的 Agent 有什么区别？**
A: Deep Agents 是 LangChain Agent 的"增强版"，内置了更多开箱即用的功能（子 Agent、文件系统、沙箱等）。如果你不需要这些，用 LangChain 的 Agent 就够了。

**Q: 三个可以混用吗？**
A: 可以。Deep Agents 内部就用了 LangChain 和 LangGraph。你可以根据需要在不同层级切换。
