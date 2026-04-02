---
title: 框架 vs 运行时 vs Harness
description: 理解 LangChain 生态中 Framework、Runtime、Harness 三个概念的区别
---

# 框架 vs 运行时 vs Harness

## 三个概念

| 概念 | 类比 | 代表产品 | 说明 |
|------|------|----------|------|
| **Framework（框架）** | 乐高积木 | LangChain | 提供各种构件（模型、工具、链），你自己组装 |
| **Runtime（运行时）** | 引擎 | LangGraph | 负责执行、状态管理、持久化、错误恢复 |
| **Harness（套件）** | 成品车 | Deep Agents | 开箱即用，内置框架 + 运行时 + 额外功能 |

## 关系

```
Deep Agents = LangChain（框架） + LangGraph（运行时） + 内置工具（子 Agent、文件系统、沙箱等）
```

- **Harness** 把框架和运行时打包好了，加了开箱即用的功能
- **框架** 提供构建块，你按需组合
- **运行时** 负责底层执行，保证可靠性和状态管理

## 怎么选？

| 你的需求 | 选什么 |
|----------|--------|
| 快速做出一个能用的 Agent | **Harness**（Deep Agents） |
| 需要灵活控制 Agent 行为 | **Framework**（LangChain） |
| 需要复杂工作流和状态管理 | **Runtime**（LangGraph） |
| 三者都要 | 直接用 Deep Agents，它是三者的集合 |

> 💡 **简单理解**：Harness = 买现成车，Framework = 买零件自己组装，Runtime = 只买发动机。
