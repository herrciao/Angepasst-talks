# Weekly SEO Runtime

這個目錄保存每週 SEO Run、Content Brief、Baseline 與固定模板。操作前先讀專案根目錄 `AGENTS.md` 及 `docs/SEO-RUNTIME.md`。

## 每週啟動

1. 建立當週 Run：複製 `templates/run-template.md` 至 `runs/YYYY-Www.md`。
2. 執行 `ASTRO_TELEMETRY_DISABLED=1 npm run seo:validate`。
3. 讀取上一個 Run、未完成 Brief 與可用的實際數據。
4. 提出五個候選、選出一題並建立 Brief。
5. 提出具體人工查證問題。
6. 將狀態停在 `waiting-technical-review`。

任何內容修改、commit、push 或發布，都需要依 `AGENTS.md` 另行取得明確確認。

## 手動啟動指令

> 執行本週 Weekly SEO Runtime。先讀 AGENTS.md、docs/SEO-RUNTIME.md、上一個 Run 與未完成 Brief；執行唯讀 SEO 檢查，提出五個候選、選出一題、建立 Brief，向我提出具體第一手內容問題，並停在 waiting-technical-review。不得修改公開內容、commit、push、deploy 或 publish。
