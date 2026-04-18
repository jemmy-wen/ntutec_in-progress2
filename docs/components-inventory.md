---
title: Components Inventory — 元件清單與設計機會
purpose: 給美術設計師（Holden）第一週的工作單位地圖
updated: 2026-04-18
tier: 1（設計師必讀）
---

# Components Inventory

> **這份文件的目的**：你的工作單位是「元件」，不是「頁面」或「故事」。這份列出 repo 現有 22 個元件 + 可能新增的元件 + 每個元件對應的使用者路徑節點。

---

## 🧱 現有元件（22 個，`components/public/`）

### 共用 Layout（5 個）

| 元件 | 檔案 | 用在哪 | 設計狀態 |
|------|------|--------|---------|
| `Navbar` | `components/public/Navbar.tsx` | 全站 | 🟢 穩定（4/12 五大區 dropdown + a11y + keyboard）|
| `NavbarAuthButton` | `NavbarAuthButton.tsx` + `NavbarAuthButtonInner.tsx` | Navbar 右側登入狀態 | 🟢 穩定 |
| `Footer` | `Footer.tsx` | 全站 | 🟢 穩定（NTU 生態系連結 + 品牌資訊） |
| `PageHero` | `PageHero.tsx` | 所有內頁標題區 | 🟡 可優化視覺 rhythm |
| `NtuEcosystemLinks` | `NtuEcosystemLinks.tsx` | 部分頁面 + Footer | 🟡 可優化視覺 |

### 首頁 Sections（8 個，`components/public/home/`）

| # | 元件 | 用途 | 設計狀態 |
|---|------|------|---------|
| 1 | `HeroSection` | 首頁第一屏：主標 + 副標 + 背景 + 主 CTA | 🟡 已從 MagneticButton 降級（perf），視覺可再精練 |
| 2 | `AudienceCards` | 三類受眾入口（新創 / 企業 / 投資人）| 🟡 結構 OK，視覺 hierarchy 待強化 |
| 3 | `FocusAreasSection` | 3 大聚焦領域（AI / 生醫 / 硬科技）| 🟡 可優化 |
| 4 | `ThreeConnectionsSection` | 三大 connections 敘事 | 🟡 待整體 editorial 化 |
| 5 | `StatsSection` | 權威數字展示（600+ / 35 / 27 / 350+）| 🟡 **高 ROI**：設計成 hero 大字動畫 |
| 6 | `NTUEcosystemSection` | NTU 生態系連結 | 🟡 可優化 |
| 7 | `NewsSection` | 最新消息輪播 | 🟡 可優化 |
| 8 | `PartnersSection` | 合作夥伴 logo 條 | 🟡 **可升級為 Logo Wall 大版** |

### Forms（2 個）

| 元件 | 檔案 | 頁面 | 設計狀態 |
|------|------|------|---------|
| `AngelApplyForm` | `AngelApplyForm.tsx` | `/angel-apply` | 🟡 可優化視覺 + 進度條 + 成功態 |
| `PreRegisterForm` | `PreRegisterForm.tsx` | `/apply` | 🟡 可優化視覺 + 進度條 + 成功態 |

### Schemas 禁區（3 個，**不要碰**）

| 元件 | 用途 | 禁區原因 |
|------|------|---------|
| `HomeFAQSchema` | 首頁 FAQPage JSON-LD | AEO 基線 79→92 核心 |
| `OrganizationSchema` | 全站 Organization JSON-LD | SEO 實體識別核心 |
| `BreadcrumbSchema` | PageHero 麵包屑 JSON-LD | SEO 路徑結構 |

### 頁面專用元件（3 個）

| 元件 | 用在 | 設計狀態 |
|------|------|---------|
| `FeaturedAlumni` | `/` + `/alumni` | 🟡 可優化卡片視覺 |
| `MentorFilterTabs` | `/mentors` | 🟡 已升級 editorial 大肖像卡，篩選條可視覺化 |
| `blog/ShareButtons` | `/blog/[slug]` | 🟢 穩定 |

---

## 🆕 建議新增元件（高 ROI，排序從易到難）

依 `reference/design-reference.md`（Sustaihub 分析）+ Howard 確認的優先序：

### ★ Tier A：第一週可動工（低依賴、即時視覺成果）

#### 1. `HomeFAQ.tsx`（視覺版首頁 FAQ accordion）
- **對應 CTA**：引導訪客「先自助理解」後再點 `/apply` 或 `/contact`
- **對應頁面**：`/`（NewsSection 之後）
- **資料來源**：可 hardcode 3-5 題（「每年招募幾次？」「誰可以申請？」「車庫和加速器差在哪？」）
- **視覺方向**：accordion，開啟時 slide + fade
- **與既有協作**：`HomeFAQSchema.tsx` JSON-LD 已存在，視覺版要**與 schema 內容同步**（設計師不改 schema；改版完成後由 Howard 更新 schema）

#### 2. `MediaCoverage.tsx`（首頁媒體報導 section）
- **對應 CTA**：第三方背書 → 建立品牌信任 → 再走 `/about` 或 `/corporate`
- **對應頁面**：`/`（PartnersSection 之前或之後）
- **資料來源**：5-8 篇外部新聞（天下 / HBR / 商周 / 遠見 / ETtoday），圖示 + 標題 + 連結
- **視覺方向**：卡片橫排 / 雜誌式堆疊 / logo bar
- **素材來源**：見 `assets-exposure.md` 「媒體背書」段

#### 3. `AlumniLogoWall.tsx`（新創校友 logo 牆）
- **對應 CTA**：視覺化「600+ 校友」承諾 → 激勵新創申請
- **對應頁面**：`/`（可以放 StatsSection 後）+ `/alumni`
- **資料來源**：**先用公開校友 logo**（MoBagel / AmazingTalker / 配客嘉 / ECOCO / 漸強 / Turing Space / KryptoGO…），不需廠商確認
- **視覺方向**：grid wall / masonry / 移動式 carousel
- **素材來源**：見 `assets-exposure.md` 「新創校友 Logo」段

### ★ Tier B：第二週（需要協作確認）

#### 4. `CaseStudyCard.tsx`（旗艦案例卡）
- **對應頁面**：`/corporate`（UDN / 聯經 / 玉山）+ `/alumni`（配客嘉 / AmazingTalker）
- **資料來源**：看 `reference/brand-highlights.md` 6 校友 + `reference/alumni.md` 15 校友
- **視覺方向**：大照片 + 一句話定位 + 關鍵里程碑 + 標籤
- **設計師不生成文案**：用 `{{placeholder}}` 填充，Howard 後期接內容

#### 5. `AdvisoryBoardCard.tsx`（諮詢委員會卡片精緻版）
- **對應頁面**：`/advisory-board`
- **狀態**：既有 prestigious card + NTUTEC logo，可再優化排版

#### 6. `AngelClubCard.tsx`（天使俱樂部卡）
- **對應頁面**：`/angel`
- **狀態**：既有 section，可升級為 editorial editorial block（配合「軟化投票承諾、審核制」的文案基調）

### ★ Tier C：第三週以後

#### 7. `CorporatePartnerSection.tsx`（企業合作方案比較表）
- **對應頁面**：`/corporate`
- **視覺**：三欄比較表（垂直加速器 / 競賽 / 活動合辦），每欄 CTA → 聯絡表單

#### 8. `MentorMatchCTA.tsx`（業師健診預約入口）
- **對應頁面**：`/mentors` → 跳 `/pitch`
- **視覺**：單屏 CTA block

---

## 🔗 元件 × 使用者路徑對應

**更詳細的 journey 請讀 [`user-journeys.md`](user-journeys.md)**。這裡給快速對應：

| 使用者路徑節點 | 主要服務元件 |
|--------------|------------|
| 新創首次進站 | `HeroSection` + `AudienceCards` + `HomeFAQ`（新增）|
| 新創決定申請 | `AudienceCards` → `PreRegisterForm`（`/apply`）|
| 企業評估合作 | `AudienceCards` → `CaseStudyCard` + `CorporatePartnerSection`（新增）|
| 投資人看案源 | `AudienceCards` → `AngelClubCard` → `AngelApplyForm` |
| 業師候選了解 | `MentorFilterTabs` → `MentorMatchCTA`（新增）|
| 媒體找新聞 | `NewsSection` + `MediaCoverage`（新增）|
| 信任建立 | `StatsSection` + `AlumniLogoWall`（新增）+ `PartnersSection` |

---

## 💡 設計師工作守則

1. **不改 Schema 元件**（`HomeFAQSchema` / `OrganizationSchema` / `BreadcrumbSchema`）— 他們只是 JSON-LD 注入器，沒視覺
2. **新增元件時放在 `components/public/` 下**；首頁元件放 `components/public/home/`
3. **視覺改動用 Tailwind classes**（`app/globals.css` 已有 `btn-pill-primary` / `card-hover` / `section-spacing` / `micro-label` 等自訂工具類可用）
4. **不寫 copy / 文案**—— 用 `{{placeholder}}` 或 lorem ipsum 填充；Howard 後期替換為 `reference/` 裡的 SOT 內容
5. **新元件需要 props 時**，參考既有元件的 TypeScript interface 風格（不要自創命名慣例）

---

## 🔎 可重用的 Tailwind Utility Classes（速查）

```tsx
<button className="btn-pill-primary">主 CTA</button>
<button className="btn-pill-outline">次 CTA</button>
<div className="card-hover">hover 會上浮的卡</div>
<section className="section-spacing">RWD padding section</section>
<span className="micro-label">SMALL CAPS 小標</span>
<div className="bg-warm-stone">暖米色背景</div>
<div className="shadow-elite">優雅 shadow</div>
<div className="card-elevated">大版 card hover</div>
```

所有色票 Tailwind 自動支援：`bg-teal` `text-charcoal` `bg-stone` `text-oxford` `bg-amber-gold` `bg-warm-stone` `text-slate-muted` 等。
