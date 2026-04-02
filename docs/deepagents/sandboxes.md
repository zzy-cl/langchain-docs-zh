---
title: 沙箱（Sandboxes）
description: 在隔离环境中安全执行代码
---

# 沙箱（Sandboxes）

## 这是什么？

沙箱 = Agent 的"安全实验室"。Agent 可以在沙箱里执行代码，但不会影响你的系统。

就像小朋友在游乐场玩——随便折腾，但出不了围栏。

## 为什么需要它？

| 没有沙箱 | 有沙箱 |
|----------|--------|
| Agent 直接在你的系统上跑代码 | Agent 在隔离环境中跑代码 |
| 写错了可能删文件、装错包 | 写错了只影响沙箱，随时重置 |
| 安全风险高 | 安全可控 |

## 使用方式

```typescript
import { createDeepAgent } from "deepagents";

const agent = createDeepAgent({
  sandbox: {
    enabled: true,
    type: "docker", // 或 "local"
  },
  tools: [codeExecutor],
  system: "你可以执行 Python/JS 代码来完成计算任务。",
});
```

## 沙箱类型

| 类型 | 说明 | 适用场景 |
|------|------|----------|
| `local` | 本地进程，轻量 | 开发测试 |
| `docker` | Docker 容器，隔离好 | 生产环境 |
| `cloud` | 云端沙箱 | 大规模部署 |

## 下一步

- [生产部署](/deepagents/going-to-production)
- [ACP 协议](/deepagents/acp)
