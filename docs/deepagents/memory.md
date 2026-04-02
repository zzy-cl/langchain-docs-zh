---
title: 记忆（Memory）
description: 配置短期和长期记忆，让 Agent 记住重要信息
---

# 记忆（Memory）

## 这是什么？

Agent 的"大脑"——让它记住用户说过的话、偏好、历史操作。

| 类型 | 时长 | 存储位置 | 用途 |
|------|------|----------|------|
| **短期记忆** | 单次会话 | 内存 | 当前对话上下文 |
| **长期记忆** | 跨会话 | 数据库/文件 | 用户偏好、历史总结 |

## 使用方式

```typescript
import { createDeepAgent } from "deepagents";

const agent = createDeepAgent({
  memory: {
    shortTerm: true,   // 开启短期记忆
    longTerm: true,    // 开启长期记忆
    store: "disk",     // 长期记忆存储位置
  },
  system: "记住用户的偏好和历史对话。",
});
```

## 长期记忆原理

Agent 会在对话结束后自动：
1. **提取关键信息** — 用户说过的重要偏好
2. **生成摘要** — 把长对话压缩成要点
3. **持久化存储** — 写入数据库或文件
4. **下次召回** — 新会话开始时加载相关记忆

## 最佳实践

- 短期记忆默认开启，一般不需要管
- 长期记忆适合需要"认识用户"的场景（客服、个人助手）
- 记忆太多会影响上下文，需要定期清理

## 下一步

- [上下文工程](/deepagents/context-engineering)
- [短期记忆](/langchain/short-term-memory)
- [长期记忆](/langchain/long-term-memory)
