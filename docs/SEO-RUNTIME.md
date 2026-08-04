# Weekly SEO Runtime v0.1

## 節奏與完成條件

- 時間：每週一 09:00
- 時區：Europe/Berlin
- Pilot：四週人工監督
- 每週目標：五個候選、一個 Brief、一次人工事實審核、至少一篇新增或實質更新
- 第一輪完成條件：產生候選、選題、Brief 與具體訪談問題，安全停在 `waiting-technical-review`

## 固定循環

`Collect → Discover → Select → Brief → Draft → Human Review → Build → SEO Validate → Commit → Publish → Measure → Repeat`

## 1. Collect

讀取 sitemap、已發布文章、上一個 Run、未完成 Brief、使用者提供的經驗與問題，以及可用的 Search Console／Analytics／轉換資料。缺少資料一律標記「尚未提供」。

## 2. Discover

執行 production build 與 `npm run seo:check`，唯讀檢查公開輸出：title、description、H1、canonical、robots、sitemap、內部連結、孤立文章及本地 OG 圖片。

再檢查既有文章的搜尋意圖重複、需要更新的內容，以及公開 SERP 的內容缺口。不得高頻爬取或繞過網站限制。

## 3. Select

提出五個候選。每個候選記錄 Query Cluster、搜尋意圖、讀者問題、本站最接近頁面、內容缺口、商業價值、第一手證據、內部連結價值、cannibalization 風險、事實風險，以及新增或更新建議。

選出一題並說明為何選擇、其餘為何延後、應新增或更新、如何避免競爭，以及如何連到商業目標。

## 4. Brief 與人工關卡

依 `seo-runtime/templates/brief-template.md` 建立 Brief，接著向專案擁有者提出具體問題：實際情境、客戶原話、判斷過程、排除原因、根因、處理方式、驗證結果、可公開證據與禁止公開資訊。

將狀態設為 `waiting-technical-review` 並停止。AI 不得自行批准。

## 5. Draft 至 Validate

只有收到人工資料及明確修改許可後，才可更新 Brief、撰寫草稿、建立或更新頁面及內部連結。之後依序執行 production build 與 SEO check。

## 6. 發布 Gate

回報修改檔案、URL、Target Query、cannibalization、事實狀態、SEO check、build、Git diff、預計 commit，以及 7／28／90 天追蹤計畫。

沒有明確批准，不得 commit、merge、push、deploy、publish、提交 indexing 或聯絡第三方。

## Run ID 與檔案

- Run ID：`YYYY-Www`
- Run：`seo-runtime/runs/YYYY-Www.md`
- Brief：`seo-runtime/briefs/YYYY-Www-topic-slug.md`
- 報告：`seo-runtime/reports/`
- 所有決策同步記錄至 `docs/SEO-CHANGELOG.md`

## 四週 Pilot Review

檢查是否完成四次循環、是否每週都能明確知道下一步、是否有未確認內容發布、是否有 URL／sitemap／canonical 錯誤、內容是否被發現及收錄，以及是否產生有效曝光或轉換。Pilot 通過後才能提出 Phase 2 自動化擴充。
