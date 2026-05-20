---
name: blog-post-generator
description: >-
  Generate Traditional Chinese blog posts for Chao's blog using the Munger Training (芒格鍛鍊) format. Use when the user says 我要寫網誌文章, 寫網誌, 寫部落格文章, 網誌文章, blog post, 寫一篇文章, or pastes a URL and says they want a blog post. Covers business analysis, tech observations, investment thinking, and book notes. Output is always a draft in chat first — never save directly.
---

# 芒格鍛鍊文章生成器 Skill

## Invocation（短觸發語——每次收到即讀取完整 Skill 並執行）

使用者不需要每次貼出完整格式。以下任一指令都是完整觸發，AI 必須讀取並執行本 Skill 全文：

- **繁中：** `我要寫網誌文章`、`寫網誌`、`寫部落格文章`、`網誌文章`、`寫一篇文章`、`用 blog-post-generator 寫`
- **English：** `blog post`、`write a blog post`、`write a post for my blog`

如果使用者緊接著貼出一個 **URL**（同一則訊息或下一則），直接開工，不要再問：

1. 用 WebFetch 讀取網頁內容
2. 判斷 category → 決定用完整芒格鍛鍊格式或只寫正文
3. 從知識模組挑 2-3 個概念
4. 詢問或預設版本（預設 A + B）
5. 用 Read 工具讀取所選版本的規則檔和 Skill 檔案
6. 輸出完整草稿到聊天視窗（`date: TBD`），附說明
7. 等使用者確認後才存檔

**新對話一行提示語（可貼入新聊天開工）：**

```text
我要寫網誌文章。（下一則貼網址或說主題即可開工）
```

---

## 三個版本引擎

| 版本 | 定位 | 規則檔路徑 |
|------|------|-----------|
| **A** | 冷靜工程師 — 冷靜、懷疑、不站隊、邏輯攻擊 | `.cursor/rules/blog-post-generator-a-20260226.mdc` |
| **B** | 尖銳挑戰 — 直接、戳痛點、逼選擇 | `.cursor/rules/blog-post-generator-b-20260226.mdc` |
| **C** | 溫暖教練 — 說故事、帶溫度、像咖啡聊天 | `.cursor/rules/blog-post-generator-c-20260226.mdc` |

**版本選擇規則：**
- 使用者指定版本組合 → 用指定的
- 使用者未指定 → 預設產出 **A + B** 兩個版本供比較
- 使用者只說「寫就好」→ 只產一個版本，預設 **A**

---

## 工作流程

### Step 1：收到 URL 時

```
1. WebFetch 讀取頁面內容，提取核心觀點、數字、主張
2. 判斷 category：
   - business / tech / 含「新聞」→ 完整芒格鍛鍊（暖身 + 正文 + 延伸）
   - books / life → 只寫正文
3. 選 2-3 個知識模組（至少 1 個芒格系）
4. 用 Read 工具讀取所有選用的 Skill 檔案（強制，不得跳過）
5. 用 Read 工具讀取對應版本的規則檔（強制）
6. 按規則檔的筆觸引擎寫完整草稿
7. 在聊天視窗輸出，標示：
   - 建議 category / subcategory
   - 使用的知識模組
   - 建議 slug
   - date: TBD
8. 等使用者說「存檔」才寫入 src/content/posts/
```

### Step 2：收到主題（無 URL）時

```
同上，跳過 WebFetch，從使用者描述提取材料。
```

### Step 3：A/B 版本比較時

```
1. 兩版草稿分別輸出，各自標示：
   ## ── Version X（定位）──
2. 存入 tools/ab-test/version-a.md 和 version-b.md
3. 提醒使用者用 Finder 打開 tools/ab-compare.html 並排比較
4. 等使用者選定版本後才存檔
```

### Step 4：存檔流程

```
1. 使用者說「存檔」「推上去」等確認指令才執行
2. 先用 Read 檢查 src/content/posts/[slug].md 是否已存在：
   - 不存在 → date: TBD 替換為今天日期
   - 已存在 → 保留原 date，新增/更新 updatedDate
3. 存入 src/content/posts/[slug].md
4. 執行 npx astro build 確認成功
5. git add → commit → push
```

---

## 知識模組快速索引

從以下 10 個模組中挑 2-3 個，至少 1 個芒格系：

| 維度 | 模組 | Skill 路徑 |
|------|------|-----------|
| 芒格系 | `investment-thinking` | `~/.cursor/skills/investment-thinking/SKILL.md` |
| 認知 | `cognitive-biases` | `~/.cursor/skills/cognitive-biases/SKILL.md` |
| 人性 | `consumer-psychology` | `~/.cursor/skills/consumer-psychology/SKILL.md` |
| 人性 | `influence-seduction` | `~/.cursor/skills/influence-seduction/SKILL.md` |
| 品牌 | `brand-loyalty` | `~/.cursor/skills/brand-loyalty/SKILL.md` |
| 品牌 | `neuro-marketing` | `~/.cursor/skills/neuro-marketing/SKILL.md` |
| 風險 | `risk-antifragile` | `~/.cursor/skills/risk-antifragile/SKILL.md` |
| 策略 | `strategy-game-theory` | `~/.cursor/skills/strategy-game-theory/SKILL.md` |
| 成長 | `entrepreneurial-leadership` | `~/.cursor/skills/entrepreneurial-leadership/SKILL.md` |
| 創新 | `innovation-first-principles` | `~/.cursor/skills/innovation-first-principles/SKILL.md` |

> ⚠️ **強制：每次寫文章前，必須用 Read 工具讀取所有選用的 Skill 檔案，不得跳過。**

---

## 分類系統快速參照

| category | subcategory | 說明 |
|----------|-------------|------|
| business | investment | 投資筆記 |
| business | strategy | 策略觀察 |
| business | startup | 創業思考 |
| tech | ai | AI 思考 |
| tech | engineering | 軟體工程 |
| tech | trends | 科技趨勢 |
| books | biz-books | 商業書讀書筆記 |
| books | mind-books | 思維書讀書筆記 |
| books | tech-books | 科技書讀書筆記 |
| life | travel | 旅行 |
| life | thoughts | 日常思考 |

**暖身判斷：**
- `business` / `tech` 或 tags 含 `新聞` → 完整芒格鍛鍊（暖身 + 正文 + 延伸），tags 含 `芒格鍛鍊`
- `books` / `life` → 只寫正文，不加 `芒格鍛鍊` tag

---

## 輸出前自檢（每次必答）

- 我選了哪些模組？為什麼？
- 本文的核心轉折是哪一句？
- 哪一句是多餘可刪？
- 有沒有任何一句看起來太合理但缺證據？若有，改寫成可驗證問句。

---

## 版本記錄

| 版本 | 日期 | 核心變動 |
|------|------|---------|
| v1.0 | 2026-05-13 | 初始版本：統一觸發入口 Skill；整合 A/B/C 三引擎路由；URL 直接開工流程 |
