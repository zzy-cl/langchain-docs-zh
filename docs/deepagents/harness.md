---
title: Agent Harness 能力
description: Deep Agent 内置的 Agent Harness 能力一览
---

# Agent Harness 能力

## 这是什么？

Deep Agent 是一个 **Agent Harness**——它不只是一个 Agent，而是一个完整的"Agent 运行环境"。

## 内置能力一览

| 能力 | 说明 | 默认状态 |
|------|------|----------|
| 任务规划 | 自动把复杂任务拆成子步骤 | ✅ 内置 |
| 工具调用 | 调用你定义的工具 | ✅ 内置 |
| 子 Agent | 派生专门的子 Agent | ✅ 内置 |
| 文件系统 | Agent 间共享文件 | ✅ 内置 |
| 记忆 | 短期 + 长期记忆 | ⚙️ 需配置 |
| 沙箱 | 安全执行代码 | ⚙️ 需配置 |
| 流式输出 | 实时返回结果 | ✅ 内置 |
| 人工介入 | 关键步骤需用户确认 | ⚙️ 需配置 |

## 与普通 Agent 的区别

```
普通 Agent:  用户提问 → Agent 回答 → 结束

Deep Agent: 用户提问 → Agent 规划 → 派子 Agent → 子 Agent 执行 → 写文件 → 汇报 → Agent 总结 → 结束
                  ↑                                                                  ↑
                  └──────────────── 可能循环多次 ──────────────────────────────────────┘
```

## 下一步

- [创建 Agent](/deepagents/creation)
- [子 Agent](/deepagents/subagents)
- [文件系统](/deepagents/backends)
