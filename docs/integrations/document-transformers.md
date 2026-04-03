---
title: 文档转换器
description: 对加载的文档进行预处理、清洗和格式转换
---

# 文档转换器

## 这是什么？

文档转换器 = 文档的"加工车间"。原始文档加载进来后，需要清洗、切分、提取关键信息，才能被 Agent 使用。

类比：拿到原材料（原始文档）→ 切割（切分）→ 打磨（清洗）→ 成品（可用的文档块）。

## 工作流程

```mermaid
graph LR
    RAW["📄 原始文档"] --> LOAD["加载器"]
    LOAD --> CLEAN["清洗/过滤"]
    CLEAN --> SPLIT["切分"]
    SPLIT --> READY["✅ 可用文档块"]

    style RAW fill:#f59e0b,color:#000
    style READY fill:#22c55e,color:#fff
```

## 文本切分

最常用的转换：把长文档切成小块。

```typescript
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 500,      // 每块最大 500 字符
  chunkOverlap: 50,    // 相邻块重叠 50 字符（保持上下文连贯）
});

const chunks = await splitter.splitDocuments(docs);
console.log(`切分为 ${chunks.length} 块`);
```

## 切分策略选择

| 策略 | 说明 | 适用场景 |
|------|------|----------|
| `RecursiveCharacterTextSplitter` | 按段落/句子/字符递归切分 | 通用文本 |
| `TokenTextSplitter` | 按 token 数切分 | 需要精确控制 token 数量 |
| `MarkdownTextSplitter` | 按 Markdown 标题切分 | Markdown 文档 |
| `HTMLHeaderTextSplitter` | 按 HTML 标题切分 | 网页内容 |
| `LatexTextSplitter` | 按 LaTeX 章节切分 | 学术论文 |

## 自定义转换器

```typescript
import { Document } from "@langchain/core/documents";

// 自定义：只保留中文内容
function chineseFilter(docs: Document[]): Document[] {
  return docs.filter(doc => /[\u4e00-\u9fa5]/.test(doc.pageContent));
}

// 自定义：去除多余空白
function cleanWhitespace(docs: Document[]): Document[] {
  return docs.map(doc => new Document({
    pageContent: doc.pageContent.replace(/\s+/g, " ").trim(),
    metadata: doc.metadata,
  }));
}

// 组合使用
const cleaned = cleanWhitespace(chineseFilter(rawDocs));
```

## 参数调优

| 参数 | 推荐值 | 说明 |
|------|--------|------|
| `chunkSize` | 500-1000 | 太大丢失精度，太小丢失上下文 |
| `chunkOverlap` | 50-100 | 通常为 chunkSize 的 10%-20% |
| `separators` | `["\n\n", "\n", "。", ".", " "]` | 优先在段落/句子边界切分 |

## 最佳实践

| 实践 | 说明 |
|------|------|
| 先清洗再切分 | 去除 HTML 标签、多余空白等噪声 |
| chunkOverlap 不能太小 | 否则切分边界处的语义会丢失 |
| 中文文档注意分隔符 | 默认分隔符对中文不太友好，建议加 `"。"` `"；"` |
| 保留 metadata | 切分后的块要带上来源信息，方便追溯 |

## 下一步

- [文本切分器 →](/integrations/splitters)
- [文档加载器 →](/integrations/document-loaders)
- [RAG 实战 →](/tutorials/rag-qa)
