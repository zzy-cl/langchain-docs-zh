---
title: 文档加载器
description: 从各种来源加载文档
---

# 文档加载器

## 这是什么？

文档加载器 = 从各种来源（PDF、网页、数据库等）读取内容，转成统一格式。

## 常用加载器

| 来源 | 加载器 | 包 |
|------|--------|------|
| 文本文件 | `TextLoader` | `langchain/document_loaders/fs/text` |
| PDF | `PDFLoader` | `@langchain/community/document_loaders/fs/pdf` |
| 网页 | `CheerioWebBaseLoader` | `@langchain/community/document_loaders/web/cheerio` |
| CSV | `CSVLoader` | `langchain/document_loaders/fs/csv` |
| JSON | `JSONLoader` | `langchain/document_loaders/fs/json` |

## 使用方式

```typescript
import { TextLoader } from "langchain/document_loaders/fs/text";

const loader = new TextLoader("./data.txt");
const docs = await loader.load();
console.log(docs[0].pageContent);
```

## 下一步

- [RAG](/langchain/retrieval)
- [文档转换器](/integrations/document-transformers)
