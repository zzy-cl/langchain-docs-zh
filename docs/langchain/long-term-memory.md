---
title: 长期记忆
description: 跨会话记住用户偏好和历史信息
---

# 长期记忆

## 这是什么？

Agent 的"长期大脑"——**跨会话**记住用户说过的话。就像老朋友，好久不见还记得你的喜好。

## 短期 vs 长期

| | 短期记忆 | 长期记忆 |
|--|---------|---------|
| 时长 | 单次会话 | 跨会话 |
| 存储 | 内存 | 数据库/文件 |
| 类比 | 当面聊天记得 | 写在日记本里 |
| 场景 | 普通对话 | 客服、个人助手 |

## 使用方式

```typescript
import { createAgent } from "langchain";

const agent = createAgent({
  model: "openai:gpt-4o",
  memory: {
    shortTerm: true,
    longTerm: {
      enabled: true,
      store: "postgres", // 或 "disk"、"redis"
    },
  },
});
```

## 工作原理

```
对话结束 → Agent 提取关键信息 → 生成摘要 → 存入数据库
下次对话 → 从数据库加载相关记忆 → 注入上下文
```

## 最佳实践

- 只记重要的——用户偏好、历史决策、关键事实
- 别记太多——会影响上下文窗口
- 定期清理过期记忆

## 下一步

- [短期记忆](/langchain/short-term-memory)
- [Deep Agents 记忆](/deepagents/memory)
