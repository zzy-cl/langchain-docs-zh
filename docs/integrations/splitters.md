---
title: 文本切分器
description: 将长文档切分成小块
---

# 文本切分器

## 这是什么？

大文档太长，超过模型上下文窗口。切分器把它切成小块，每块都能放进模型。

## 类比

> 一本厚书 → 切成章节 → 每章单独阅读

## 使用方式

```typescript
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 500,
  chunkOverlap: 50,
});

const chunks = await splitter.splitText(longDocument);
```

## 参数说明

| 参数 | 说明 | 推荐值 |
|------|------|--------|
| `chunkSize` | 每块最大字符数 | 500-1000 |
| `chunkOverlap` | 相邻块重叠字符数 | 50-100 |

## 下一步

- [RAG](/langchain/retrieval)
- [文档转换器](/integrations/document-transformers)
