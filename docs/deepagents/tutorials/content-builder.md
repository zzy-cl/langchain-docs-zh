---
title: 构建内容写作 Agent
description: 用 Deep Agents 构建一个能自动写作的内容 Agent
---

# 构建内容写作 Agent

## 目标

构建一个内容写作 Agent，它能：
1. 根据主题搜索资料
2. 生成文章大纲
3. 逐段写作
4. 自动校对和修改

## 实现

```typescript
import { createDeepAgent } from "deepagents";
import { tool } from "langchain";
import { z } from "zod";

// ① 搜索工具
const searchTopic = tool(
  async ({ topic }) => {
    // 实际项目中接入搜索 API
    return `关于"${topic}"的搜索结果...`;
  },
  {
    name: "search_topic",
    description: "搜索指定主题的相关资料",
    schema: z.object({ topic: z.string() }),
  }
);

// ② 写作 Agent
const writer = createDeepAgent({
  tools: [searchTopic],
  system: `你是一个专业的内容写作者。
流程：
1. 先搜索主题相关资料
2. 生成文章大纲
3. 逐段写作
4. 校对修改
风格：通俗易懂，有条理，像在跟朋友聊天。`,
});

// ③ 调用
const result = await writer.invoke({
  messages: [{ role: "user", content: "帮我写一篇关于 LangChain 的入门文章" }],
});
```

## 扩展

- 加入图片生成工具
- 加入 SEO 优化检查
- 用子 Agent 分工（一个搜、一个写、一个校对）

## 下一步

- [构建深度研究 Agent](/deepagents/tutorials/deep-research)
- [工具](/deepagents/tools)
