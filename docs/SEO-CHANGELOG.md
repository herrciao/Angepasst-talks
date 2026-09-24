# SEO Changelog

記錄 SEO 架構、文章、URL、sitemap、schema、canonical、重要成效與 Runtime 決策。時間採 Europe/Berlin。

## 2026-08-04 — Weekly SEO Runtime v0.1 第一批

- 建立 SEO 治理、策略與每週 Runtime 文件。
- 市場定位為台灣、德國、美國跨境製造業。
- 建立 Run、Brief 與 Baseline 結構。
- 建立唯讀 build-output SEO 檢查工具。
- 未修改任何公開文章、URL、metadata 或部署設定。
- Search Console 與實際轉換資料：尚未提供。

## 2026-09-24 — 從零到一的現場筆記：本地草稿

- 依使用者本次確認，只執行新內容主線的第一批：新增一篇起點文章草稿與 Content Brief。
- 新增 `src/content/posts/field-notes-from-zero-to-one.mdoc`，標記 `draft: true`；預計 URL 為 `/posts/field-notes-from-zero-to-one`，尚未發布。
- Brief：`seo-runtime/briefs/2026-09-24-field-notes-from-zero-to-one.md`，狀態停在 `waiting-technical-review`。
- 內容從既有 Mac mini 日誌的個人實作出發，連到既有加州採購文章；延伸的採購起手方式明示為方法示範。
- 搜尋意圖為理解作者如何記錄現場、判斷問題與一起推進下一步，不重寫遠端操作教學或採購比較。未新增服務套餐、表單、CTA 元件或追蹤事件。
- 所有既有文章及其 URL 保留；本批不刪除、搬移或修改舊文。任何本地文章或有意義內容的刪除，都需另行取得使用者明確同意。
- 未改首頁、導覽、分類設定、內容 schema、表單、Analytics、SEO 技術設定或部署設定。
- 未執行 production build、commit、push、deploy、publish 或 Search Console indexing；未變更內容批准狀態。
- Search Console、Analytics 與實際轉換數據：尚未提供。

## 2026-09-24 — 現場筆記首篇核准發布與驗證

- 使用者在檢視草稿後明確指示「ok post it」，核准此篇文章發布及必要的提交、推送與部署。
- 新文章 `field-notes-from-zero-to-one.mdoc` 改為 `draft: false`；正文、日期、分類與核准草稿一致。
- 依序記錄 `waiting-technical-review → approved → built → validated`，等待提交及正式站驗證。
- 在完整隔離副本執行 production build 成功，產生 119 個頁面，包含全部 23 篇文章；未清除或替換原專案的本地 build 產物。
- SEO check：0 errors、122 warnings。警告為全站既有預設 OG 圖片缺漏，以及首頁與兩個分頁缺少 H1，留待另案處理。
- 新文 canonical、H1、BlogPosting、首頁、創業分類、RSS 與 sitemap 均已確認。
- 舊有 22 篇文章逐一與 Git HEAD 比對，沒有內容變更或刪除；未變更既有公開 URL。
