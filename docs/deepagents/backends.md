---
title: 文件系统 & Backends
description: 配置 Deep Agent 的文件系统后端，实现 Agent 间文件共享
---

# 文件系统 & Backends

## 这是什么？

Deep Agent 的文件系统 = Agent 的"共享硬盘"。

子 Agent 写的文件，主 Agent 能读；主 Agent 的数据，子 Agent 能用。就像团队共享一个 Google Drive。

## 内置后端

| 后端 | 说明 | 适用场景 |
|------|------|----------|
| `memory` | 内存中，进程结束就没了 | 开发测试 |
| `disk` | 本地磁盘持久化 | 本地部署 |
| `cloud` | 云存储（S3 等） | 生产环境 |

## 使用方式

```typescript
import { createDeepAgent } from "deepagents";

const agent = createDeepAgent({
  filesystem: {
    backend: "memory", // 开发用 memory，生产用 disk 或 cloud
  },
  system: "你可以读写文件来存储中间结果。",
});
```

## 自定义后端

```typescript
const agent = createDeepAgent({
  filesystem: {
    backend: "disk",
    rootDir: "./agent-files", // 文件存储目录
  },
});
```

## 下一步

- [子 Agent](/deepagents/subagents)
- [沙箱](/deepagents/sandboxes)
