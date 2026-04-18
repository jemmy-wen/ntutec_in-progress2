---
title: Assets Exposure — 要曝光的素材清單
purpose: 讓美術設計決定「版面上哪些區塊要多大、要不要有」
updated: 2026-04-18
tier: 1（設計師必讀）
---

# Assets Exposure

> **這份文件的目的**：告訴你有哪些真實素材可以放進設計——Logo、照片、數字、獎項、媒體背書。你不需要知道「這個校友賺多少錢」，只需要知道「我手上有 18 家企業 logo 可以排牆」。

---

## 📂 素材來源三類

1. **`public/` 資料夾**（repo 內直接用）
2. **Supabase Storage buckets**（需要 env 存取 key）
3. **Google Drive 待移入**（跟 Howard 要）

每項素材下方標示來源 + 建議曝光頁面 + 視覺處理類型。

---

## 🎨 1. Brand Identity（品牌識別）

### NTUTEC Logo
- **來源**：`public/logo-tec-icon.png`（已全站替換文字 TEC box，4/12 `b0f70bb`）
- **變體**：icon only / full name（若缺 full-name 變體，問 Howard 拿）
- **使用**：Navbar 左上、Footer、Favicon、OG Image
- **禁區**：不要重設計 logo 本身（若有想法，提 proposal 給 Howard 決策）

### 品牌色（見 `app/globals.css` `@theme inline`）
- 主：Teal `oklch(0.66 0.12 180)`（≈ `#0D9488`）
- 延伸：Teal Deep / Light / Wash
- 中性：Stone / Charcoal / Slate Muted
- 權威：Oxford `#0A192F` / Amber Gold `#D4AF37` / Warm Stone `#F8F7F2`

---

## 🏢 2. 合作企業 Logo（25 家可曝光）

### 企業垂直加速器合作企業（18 家）
玉山銀行 / 友達光電（AUO）/ 遠傳（FET）/ 春池玻璃 / 鴻海肚肚 / 農純鄉 / 創兆生技 / 金元福 / AmazingTalker（亦算校友）/ 天下雜誌 / 親子天下 / 添翼音樂 / 雜學校 / 好好證券 / 三泰科技 / 東方線上 / 國廷機電 / 台商資源國際

### 企業外部創新顧問客戶（5 家）
UDN 聯合報系 / 聯經出版 / 經濟日報 / 圓展 AVer / 時報出版

### 加速器官方贊助（2 家）
康寧公司 / 宏碁基金會

### Logo 檔案位置
- **已有**：部分在 `public/partners/`（待確認數量）
- **可能在**：Supabase storage `corporate-logos` bucket
- **缺失的**：Howard 有完整 49 家 logo 庫存在 Google Drive（跟他要）

### 曝光建議
- **首頁**：`PartnersSection` 擴成 `LogoWall`（20+ logos grid）
- **`/corporate`**：完整 18 家合作企業 + 5 家顧問客戶 + 2 家贊助
- **視覺處理**：grayscale on idle / color on hover / 或固定 color
- **排版**：8-column grid on desktop、3-column on mobile

---

## 🚀 3. 新創校友 Logo（可直接用，不需確認）

以下校友公司已是**公開品牌**（有官網、有募資新聞），可直接在官網曝光：

| 公司 | 領域 | 視覺記憶點 |
|------|------|-----------|
| **MoBagel 行動貝果** | 企業 AI | 貝果 logo |
| **AmazingTalker** | 線上語言家教 | 英字 logo |
| **配客嘉 PackAge+** | 循環包裝 | 綠色 + 包裝意象 |
| **ECOCO 宜可可** | 智慧回收 | 橘色 eco |
| **漸強實驗室 Crescendo Lab** | 行銷科技 | 深藍 |
| **Turing Space 圖靈** | 區塊鏈信任 | 幾何 |
| **KryptoGO 重量科技** | RegTech | 橘色 |
| **知識衛星 SAT.** | 精品線上課 | Cyan |
| **方格子 vocus** | 內容訂閱 | 黃色 V |
| **Hotcake 夯客** | 美業預約 | 粉橘 |
| **歐姆佳 OhmyAnt** | RF 射頻 | 螞蟻 |
| **3drens 三維人** | 車聯網 | 藍 |
| **Datayoo 悠由** | 農業 AI | 綠 |
| **Home 心** | 居家照護 | 粉色心 |
| **思輔科技 SAVFE** | 醫療機器人 | 醫療藍 |
| **律果科技 LegalSign.ai** | AI 法務 | 紫 |
| **股股 GUGU** | FinTech | 黃 |
| **幻控科技 Jmem Tek** | 3D 顯示 | 科技藍 |
| **艾斯創 Aistrom** | 骨科醫材 | 醫療 |
| **真實引擎 Portaly** | Link-in-bio | 多彩 |
| **AHEAD Medicine** | 血癌 AI 診斷 | 醫療 |

### Logo 檔案位置
- **已有**：部分在 `public/alumni-logos/`（待確認）
- **需要補**：Howard Google Drive 或跟校友拿（對公開校友通常不需逐一確認）

### 曝光建議
- **首頁**：`AlumniLogoWall`（新增元件）— grid 20+ logos
- **`/alumni`**：完整校友 logo + 公司名 + 年份 + 領域
- **視覺處理**：保留品牌原色 / 或統一 desaturate 30% 維持視覺一致

---

## 📸 4. 照片資產

### 現場活動照（已有）
- **2026 開幕式**（`public/photos/opening-2026/` 或類似）
  - 用途：`/about`、`/` HeroSection 背景、`/events`
  - 特色：大合照、致詞、頒獎時刻
- **2025 Demo Day**（`public/photos/demo-day-2025/`）
  - 用途：`/demo-day`、`/` NewsSection、`/alumni`
  - 特色：pitch 舞台、觀眾、頒獎、投資人 meetup

### 人物照片（已有）
- **業師頭像**（35+）— Supabase storage `mentor-avatars` bucket
  - 用途：`/mentors` editorial 大肖像卡（已做）
  - 狀態：4/12 改版升級完成；21 位業師 bio 待手動補（問 Howard）
- **領導人全身照**（Vincent 執行長 + 主任 + 核心成員）
  - 用途：`/teams`、`/` 小尺寸亮相
  - 狀態：4/12 團隊頁全身照 layout 完成

### 待補拍照（可能缺）
- 辦公室空間 / 「台大水源校區卓越研究大樓」建物外觀
- 新創團隊工作場景
- 業師 1-on-1 諮詢場景
- 企業合作會議場景

### 曝光建議
- **Hero 背景**：建議用大合照 / pitch 舞台（不要用 stock photo）
- **Section 過場**：小尺寸場景照 + 暖色 overlay
- **人物卡**：正方或 4:5 portrait，editorial 風格

---

## 🔢 5. 權威數字（見 `reference/brand-highlights.md`）

### 可展示的 8 項核心數字

| 數字 | 意義 | 視覺建議 |
|------|------|---------|
| **600+** | 歷年累計輔導新創 | 超大數字 + 動畫計數 |
| **35+** | 深度合作企業夥伴 | 中型數字 + 小圖示 |
| **27** | 企業垂直加速器期數 | 數字 + "期" unit |
| **350+** | 活躍投資人網絡 | 數字 + 小人像 icon |
| **NT$20+ 億** | 校友累計披露募資 | 大數字 + 年份範圍 |
| **NT$1 億+** | 單筆最高（配客嘉）| Case study |
| **800+ 人次** | Demo Day 單屆參與 | 配合照片 |
| **190+ 國** | AmazingTalker 用戶覆蓋 | Case study |

### 曝光建議
- **首頁 `StatsSection`**：選 4-5 個放大 hero 數字條
- **`/about`**：完整 8 個 + 出處註腳
- **視覺處理**：
  - 數字動畫（counter from 0 → 目標值）
  - 大字型（h1 以上，72px+）
  - 搭配小圖示（Lucide icons：Users / Building / DollarSign / Globe）

---

## 🏆 6. 獎項與背書

### 校友獲獎記錄
- **哈佛商業評論（HBR）專文**：律果科技 × 宏碁（2024）
- **國家新創獎**：思輔科技 SAVFE（2025）
- **經濟部白科技獎**：律果科技
- **友達發明獎冠軍**：幻控科技 Jmem Tek
- **美國 SelectUSA MedTech 冠軍**：艾斯創 Aistrom
- **新北市新創之星首獎**：歐姆佳 OhmyAnt（2025）

### NTUTEC 官方背書
- **2025 Demo Day**：VIP 356 人 / 74 投資人到場
- **年度嘉年華**：800+ 人次參與

### 曝光建議
- **首頁**：`MediaCoverage` 新元件 5-8 個獎項 / 媒體 badge
- **`/alumni`**：`CaseStudyCard` 含獎項標籤
- **視覺處理**：獎項 badge（圓形 / 盾形）+ 年份 + 頒發單位 logo

---

## 📰 7. 媒體報導 Logo（第三方背書）

### 高優先（有實際報導）
- **《哈佛商業評論》Harvard Business Review**（HBR）
- **《天下雜誌》CommonWealth Magazine**（UDN 第二成長曲線專文 2022）
- **《商業周刊》Business Weekly**
- **《遠見雜誌》Global Views Monthly**
- **ETtoday**
- **Inside**
- **AppWorks Blog**

### 曝光建議
- **首頁 `MediaCoverage`**：5-8 個媒體 logo + 標題 + 連結到新聞原文
- **`/news`**：完整媒體 coverage 時間軸
- **視覺處理**：
  - 灰階媒體 logo bar（低調、權威）
  - 或雜誌封面堆疊視覺（若有授權）

---

## 🎥 8. 影片資產（待確認）

### 可能已有
- Demo Day 剪輯（年度）
- 校友訪談（部分）
- 中心宣傳片

### 建議
- **首頁 Hero**：若有 15 秒 ambient video（新創 pitch / 頒獎畫面）可嵌入
- **`/demo-day`**：YouTube 嵌入
- **`/about`**：宣傳片 player

**狀態**：跟 Howard 確認現有影片清單。

---

## 💡 素材使用原則（設計師工作守則）

1. **優先用真實素材**——不用 stock photo、不用 AI 生成圖（除非做 mockup 過場）
2. **Logo 排牆**用既有 25 家企業 + 20+ 家校友 = 45+ logos 可用
3. **數字展示**以 `reference/brand-highlights.md` 為準，不要自創
4. **人物照片**要徵得主角同意——業師頭像已在 Supabase 有授權版本可用
5. **媒體 logo 使用**要對接原文連結，不可純裝飾
6. **需要新素材** → 開 issue 或 Slack 問 Howard，他有完整 531 張圖片庫存在 Google Drive

---

## 📋 快速素材 Checklist（可曝光但目前未展示）

- [ ] `AlumniLogoWall`：20+ 新創校友 logo（首頁 + `/alumni`）
- [ ] `MediaCoverage`：5-8 篇外部媒體 badge（首頁）
- [ ] 企業合作 logo wall 完整版（`/corporate`）
- [ ] 獎項 badge 展示（`/alumni` case study 卡）
- [ ] Demo Day 影片嵌入（`/demo-day`）
- [ ] 2026 開幕式 gallery（`/about` or `/events`）
- [ ] 業師 21 位 bio + 照片補齊（`/mentors`，Howard 手動補）
