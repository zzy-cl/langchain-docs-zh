---
title: 文档转换器
description: 对加载的文档进行处理和转换
---

# 文档转换器

## 文本切分器

```typescript
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 500,      // 每块最大 500 字符
  chunkOverlap: 50,    // 相邻块重叠 50 字符
});

const chunks = await splitter.splitDocuments(docs);
```

## 切分策略

| 策略 | 说明 | 适用场景 |
|------|------|----------|
| `RecursiveCharacterTextSplitter` | 按段落/句子/字符递归切分 | 通用 |
| `TokenTextSplitter` | 按 token 数切分 | 精确控制 |
| `MarkdownTextSplitter` | 按 Markdown 标题切分 | Markdown 文档 |

## 下一步

- [RAG](/langchain/retrieval)
- [语义搜索引擎](/langchain/tutorials/semantic-search)
