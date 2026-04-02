---
title: 上下文工程
description: 控制 Agent 能看到什么、怎么管理上下文
---

# 上下文工程（Context Engineering）

## 这是什么？

Agent 的"视野管理"——决定它在执行任务时能看到哪些信息。

模型的上下文窗口是有限的（比如 128K token）。对话太长、工具返回太多、检索结果太多……都会撑爆。上下文工程就是解决这个问题的。

## 常见策略

| 策略 | 说明 | 类比 |
|------|------|------|
| **滑动窗口** | 只保留最近 N 条消息 | "只记得最近聊了什么" |
| **摘要压缩** | 把长对话压缩成摘要 | "用一句话总结刚才的讨论" |
| **重要性排序** | 保留重要的，丢掉不重要的 | "领导说的话要记住，闲聊可以忘" |
| **分层存储** | 热数据放内存，冷数据放磁盘 | "常用的放桌面，不常用的存文件柜" |

## 使用方式

```typescript
const agent = createDeepAgent({
  context: {
    strategy: "sliding_window",  // 滑动窗口
    maxMessages: 20,             // 最多保留 20 条消息
  },
});
```

## 最佳实践

- 系统提示尽量精简，别写论文
- 工具返回值别返回太多，Agent 读不完
- 子 Agent 有自己的上下文，不会污染主 Agent

## 下一步

- [短期记忆](/langchain/short-term-memory)
- [长期记忆](/langchain/long-term-memory)
- [记忆](/deepagents/memory)
