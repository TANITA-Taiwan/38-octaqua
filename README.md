# OCTAQUA 第 38 屆產學合作網站｜維護說明

## 你只需要動兩個地方
1. `images/` 資料夾：放照片、影片、視覺圖
2. `config.js`：改文字、照片張數、完成狀態

`index.html`、`style.css`、`app.js` 不用動。想換配色，改 `style.css` 最上面 `:root` 的色碼。

## 查缺哪些圖
在網址後面加 `?check`，例如 `https://tanita-taiwan.github.io/38-octaqua/?check`，右下角會列出還沒放的檔名。

## 資料夾與檔名（檔名要完全一致，小寫）
| 位置 | 檔名 | 規格 |
|---|---|---|
| 首圖（電腦） | `images/banner.jpg` | 橫式 2400×1070 |
| 首圖（手機） | `images/banner-m.jpg` | 直式 4:5，1600×2000 |
| 標誌 | `images/logo-tanita.png`、`images/logo-octaqua.png` | 透明背景 PNG |
| 產品照 | `images/product/bc775.jpg` | 方形 1200×1200，背景乾淨或透明（目前放的是從主視覺裁下來的暫用圖，建議換成官方產品照） |
| 世界觀漫畫格 | `images/story/01.jpg` 到 `03.jpg` | 橫式 1600×1000 |
| 地圖最終章小圖（像素版 BC-775） | `images/map/final.png` | 透明背景 PNG 256×256；沒放時顯示預設小圖示 |
| YOTA 介紹圖 | `images/yota/main.png` | 透明背景 PNG 1200×1200 |
| YOTA 地圖小圖 | `images/yota/marker.png` | 透明背景 PNG 256×256，直接用同名檔案覆蓋就會換掉地圖上的 YOTA |
| 全域任務（長老村）照片 | `images/mission/01.jpg`…、影片 `images/mission/video.mp4` | 同活動照片與影片規格 |
| 活動照片 | `images/event-01/01.jpg`、`02.jpg`…（30–50 張） | JPG，寬約 1800px，每張 500KB 內 |
| 活動影片 | `images/event-01/video.mp4` | 直式 9:16，1080×1920，25MB 內 |
| 影片封面（選用） | `images/event-01/poster.jpg` | 直式 |

資料夾 `event-01` 到 `event-06`，依序是：創之國、水之國、風之國、花之國、雪之國、畢業展。地圖最下面的「序章・幸之國」是起點，不用設定。長老村是貫穿全程的公益任務，放在 `images/mission/`，不計入進度。

## 每完成一站，照這 5 步
1. 照片壓縮到寬 1800px、JPG；影片轉成直式 mp4、25MB 內。
2. 到 repo 的 `images/event-0N/`，按 **Add file → Upload files**，上傳照片和 `video.mp4`。
3. 打開 `config.js`，找到該站，改：`photos`（照片張數）、`summary`（改寫成實際成果）、`goal`（實際數字）、`done: true`（只會讓標籤變成「已上傳」）。
4. Commit，等 1–2 分鐘，網址按 Ctrl+Shift+R 重新整理（手機請關掉分頁重開）。
5. 檢查：照片與影片都出現、標籤變成「已上傳」。YOTA 與百分比不用手動調整。

## 其他要更新的地方
- 腳點能量：`config.js` 的 `energy.current`，填目前累積的腳點數（每 15,000 腳點捐 10 台 BC-775）。
- YOTA 與世界觀文字：`yota`、`story`。
- 產品介紹（裝備資訊、腳點 3 階段、10 項數據）：`product`。

## 規則
- 進度由日期決定：網站依「台灣時間」自動計算，活動結束日（`end`）的隔天，YOTA 就走到那一站，百分比同步增加。不需要手動改。
- 活動日期改期時，請修改該站的 `start` 與 `end`（格式 `2026-10-24`），顯示用的 `date` 文字也要一起改。
- 想預覽某一天的樣子：網址後面加 `?today=2026-11-30`。
- 數字會用到像素字體（Press Start 2P），需要連網才會載入，離線時會自動改用一般字體。
- 照片檔名要連號（01、02、03…），不要跳號，`photos` 填總張數。
- 網頁上傳單檔 25MB 上限，影片超過請先壓縮。
- 不要刪除或改名 repo，不要新增其他專案。

## 常見問題
- **圖片沒出現**：檢查資料夾、檔名、大小寫與 `.jpg` 副檔名。
- **整個網頁壞掉**：多半是 `config.js` 少了引號或逗號，到 GitHub 的 Commit 歷史還原上一版。

## 最後面的「受贈單位」

基金會 logo 請放 `images/logo-ofo.png`（透明背景 PNG，高度約 160px）。沒放時，會先顯示基金會名稱文字。文字與官網連結在 `config.js` 的 `donee`。

## 最後面的「延伸閱讀」

在 `config.js` 的 `more` 區塊：三篇文章的 `url`（網址）、`youtube`（影片網址）、`product`（產品介紹網址）都可以直接換。文章網址留空 `""` 時，卡片會顯示「網址待補」。
