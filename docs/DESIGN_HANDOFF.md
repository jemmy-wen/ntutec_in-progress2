# Design Handoff — NTUTEC Platform

> **給美術設計師（時行創意 / Holden）的入口文件**
> **建立日期**：2026-04-18 ｜ **版本**：v1.1（設計師視角分層修正版）

---

## 歡迎

你拿到的不是「一份 brief」，是一個**已經上線的 production 網站**（`tec.ntu.edu.tw`，4/16 上線）。你的工作是**美術設計**——做元件視覺、版面配置、動畫、字型 rhythm。**不做文案、不寫內容、不動 DB**。

兩件事先記住：
1. **真正的 SOT 是這個 repo**（不是外部文件、不是 Figma）。clone + pull 就知道現在長什麼樣
2. **你的 Claude Code 會自動讀 [`CLAUDE.md`](../CLAUDE.md)**。那份是工具書，本文件是入口索引

---

## Step 0：環境設定（5 分鐘）

```bash
git clone https://github.com/howardchiang-svg/ntutec-platform.git
cd ntutec-platform
npm install
cp .env.local.example .env.local  # Howard 會給你 Supabase + Ghost keys
npm run dev
# http://localhost:3000
```

你的 Claude 會自動讀：
- [`CLAUDE.md`](../CLAUDE.md)（分工、禁區、PR 流程）
- 本文件 `docs/DESIGN_HANDOFF.md`

---

## Step 1：我要做什麼？（⭐ 第一週必讀）

**這是你的工作單位地圖**。先讀完這三份再動手：

### 🧱 [`components-inventory.md`](components-inventory.md)
現有 22 個元件（`components/public/`）+ 建議新增的 8 個元件，分 Tier A/B/C 排序 ROI。每個新元件列出：對應 CTA、對應頁面、資料來源、視覺方向。

### 🚀 [`user-journeys.md`](user-journeys.md)
5 類受眾（新創 / 企業 / 投資人 / 業師候選 / 媒體）× 使用者路徑 + 情緒 tempo + Primary CTA 總清單（8 個按鈕文字建議）。用來決定每個元件的**視覺重量、急迫感、情緒 tone**。

### 🎨 [`assets-exposure.md`](assets-exposure.md)
8 類可曝光素材：25 家合作企業 logo、20+ 新創校友 logo、2026 開幕式 + 2025 Demo Day 照片、35 業師頭像、8 項權威數字、6 項獎項背書、7 個媒體 logo、影片資產。每項標示來源位置 + 建議出現頁面 + 視覺處理類型。

---

## Step 2：既有設計基調（Tailwind v4 `@theme inline`）

**不要重新選色票 / 字型**——這些已定案。在既有基礎上視覺升級即可。

### 色票（`app/globals.css` 第 8-69 行）

```css
/* 主色 */
--color-teal:        oklch(0.66 0.12 180);  /* CTA、連結、強調 */
--color-teal-deep:   oklch(0.55 0.10 178);  /* hover */
--color-teal-light:  oklch(0.95 0.03 180);  /* 淺背景 */
--color-teal-wash:   oklch(0.97 0.015 180); /* 最淺背景 */

/* 中性 */
--color-stone:       oklch(0.97 0.005 90);  /* 主背景 */
--color-stone-warm:  oklch(0.95 0.008 85);
--color-charcoal:    oklch(0.20 0.005 65);  /* 主文字 */
--color-slate-muted: oklch(0.55 0.015 260); /* 次要文字 */

/* 權威延伸（企業 / 天使 / 合作） */
--color-oxford:      #0A192F;
--color-amber-gold:  #D4AF37;
--color-warm-stone:  #F8F7F2;
```

Tailwind classes 自動支援：`bg-teal` / `text-charcoal` / `bg-warm-stone` / `text-oxford` / `bg-amber-gold` 等。

### 字型（`app/layout.tsx` 已 config，禁區）

- `--font-sans`: Geist（Latin，走 `next/font/google`）
- `--font-zh`: Noto Sans TC（CJK，preload + display: swap）
- 中文段落優化：`.prose p { line-height: 1.9; letter-spacing: 0.02em; }`

### Typography Scale（全域已設）

```
h1: text-4xl md:text-5xl lg:text-6xl
h2: text-3xl md:text-4xl
h3: text-2xl md:text-3xl
h4: text-xl md:text-2xl
```

### 自訂 Utility Classes（`@utility` 可直接用）

```tsx
<button className="btn-pill-primary">主 CTA</button>
<button className="btn-pill-outline">次 CTA</button>
<div className="card-hover">hover 上浮</div>
<section className="section-spacing">RWD padding</section>
<span className="micro-label">SMALL CAPS</span>
<div className="bg-warm-stone shadow-elite card-elevated">優雅卡片</div>
```

---

## Step 3：什麼不能動？（9 條禁區）

| # | 禁區 | 原因 |
|---|------|------|
| 1 | `next.config.ts` redirects（35 條，line 78-139）| 4/17 Legacy SEO 搶救才修完，動了 Google SERP 會炸 |
| 2 | `app/layout.tsx` 的 `metadataBase: https://tec.ntu.edu.tw` | 阻 canonical 漂移到 `*.vercel.app` |
| 3 | root layout 不可設 `alternates.canonical` | 會被子頁繼承造成 duplicate-content |
| 4 | 首頁 FAQPage JSON-LD（`HomeFAQSchema.tsx`）| AEO 基線 79→92 核心載體 |
| 5 | `public/robots.txt` 10 個 AI crawler allow | AEO 必要條件 |
| 6 | Noto Sans TC `next/font` preload | Howard 決策：保留完美字型體驗 |
| 7 | 電話號碼不可出現在官網 / JSON-LD | 硬規則（AEO 失分不補）|
| 8 | `middleware.ts` 公開路由清單 | 新增頁面要同步加 |
| 9 | `supabase/migrations/` SQL | Howard 負責 |

**內容類守則**（設計稿用 placeholder，不自創文案）：
- 品牌名：**台大車庫 / 台大加速器 / 企業垂直加速器**（不用「車庫孵化器」「加速器」裸稱）
- 對外數字：填內容時查 [`reference/brand-highlights.md`](reference/brand-highlights.md)（600+ / 35 / 27 等），不自創

---

## Step 4：怎麼交付（PR 流程）

1. **分支**：`design/<topic>`（例：`design/homepage-faq-accordion`）
2. **Commit**：小步快跑，每 commit 一個視覺改動
3. **PR**：用 [`.github/pull_request_template.md`](../.github/pull_request_template.md)（含 7 條禁區 checklist + Lighthouse before/after）
4. **Vercel preview**：每 PR 自動帶 preview 連結
5. **Review**：Howard + Howard 的 Claude 讀 diff 做結構化審查
6. **Merge**：Howard squash merge

---

## Step 5：第一個 ROI 任務（推薦切入點）

從 [`components-inventory.md`](components-inventory.md) Tier A 選一個熱機：

### ⭐ 最低風險熱機：`HomeFAQ.tsx`（首頁 FAQ accordion 視覺版）
- **工作量**：小（1-2 天）
- **預期效果**：UX + SEO 雙贏（JSON-LD 已有）
- **操作**：
  1. 在 `components/public/home/` 新增 `HomeFAQ.tsx`
  2. 3-5 題 hardcode（`reference/seo.md` 有 JSON-LD 的 Q&A 範本）
  3. accordion 動畫（既有 fadeUp keyframe 可用）
  4. 放在 `app/(public)/page.tsx` 的 `NewsSection` 之後
  5. 開 PR → Vercel preview → Howard review

### 備選：
- `MediaCoverage.tsx`（首頁媒體報導 section，5-8 篇外部新聞）— 素材見 `assets-exposure.md` §7
- `AlumniLogoWall.tsx`（新創校友 logo 牆）— 素材見 `assets-exposure.md` §3

---

## Step 6：技術細節參考

### 10 份 code 必讀檔案（按優先序）

| # | 檔案 | 為什麼讀 |
|---|------|---------|
| 1 | [`app/globals.css`](../app/globals.css) | Tailwind v4 `@theme inline` tokens SOT |
| 2 | [`app/layout.tsx`](../app/layout.tsx) | 字型 config + metadataBase（禁區，讀為了理解）|
| 3 | [`components/public/Navbar.tsx`](../components/public/Navbar.tsx) | 導航、登入狀態、mobile 範本 |
| 4 | [`components/public/Footer.tsx`](../components/public/Footer.tsx) | 頁尾佈局 |
| 5 | [`components/public/home/HeroSection.tsx`](../components/public/home/HeroSection.tsx) | 首頁 Hero 實作 |
| 6 | [`next.config.ts`](../next.config.ts)（line 78-139）| 35 條 redirect + CSP（禁區）|
| 7 | [`middleware.ts`](../middleware.ts)（line 44-55）| 公開路由清單 |
| 8 | [`lib/ghost.ts`](../lib/ghost.ts) | Ghost API 類型 |
| 9 | [`components/public/HomeFAQSchema.tsx`](../components/public/HomeFAQSchema.tsx) | FAQPage JSON-LD 範本 |
| 10 | [`app/(public)/en/layout.tsx`](../app/(public)/en/layout.tsx) | 英文路由結構 |

### 核心 components 清單

**共用**：`Navbar` / `Footer` / `PageHero` / `NtuEcosystemLinks`
**首頁 8 sections**（`components/public/home/`）：`HeroSection` / `AudienceCards` / `FocusAreasSection` / `ThreeConnectionsSection` / `StatsSection` / `NTUEcosystemSection` / `NewsSection` / `PartnersSection`
**Forms**：`AngelApplyForm` / `PreRegisterForm`
**Schemas（禁區）**：`HomeFAQSchema` / `OrganizationSchema` / `BreadcrumbSchema`
**頁面專用**：`FeaturedAlumni` / `MentorFilterTabs` / `blog/ShareButtons`

---

## Step 7：填內容時查這裡（`docs/reference/`）

僅在「把 placeholder 換成真實內容」時才讀：

| 檔案 | 何時用 |
|------|-------|
| [`reference/README.md`](reference/README.md) | 了解 reference 資料夾用法 |
| [`reference/brand-highlights.md`](reference/brand-highlights.md) | 填數字、HI3 模型、6 校友案例摘要 |
| [`reference/alumni.md`](reference/alumni.md) | 校友名單 + 2024-2026 亮點（填 case study 卡）|
| [`reference/design-reference.md`](reference/design-reference.md) | 視覺靈感：Sustaihub 7 設計模式分析 |
| [`reference/seo.md`](reference/seo.md) | 若碰到 metadata / JSON-LD 的邊界 |

**重要**：設計稿階段用 `{{placeholder}}` 或 lorem ipsum 即可，內容可由 Howard 後期接替換。你不需要在設計階段讀 `alumni.md` 15 位校友 bio。

---

## FAQ

### Q: 我可以改 Tailwind config 嗎？
**不用**。Tailwind v4 `@theme inline` 在 `app/globals.css` 第 8-69 行直接改。**不要建 `tailwind.config.ts`**。

### Q: 我可以加新字型嗎？
不要直接改 `app/layout.tsx`（禁區）。開 issue 提議 → Howard 同意後統一處理。

### Q: 我可以寫文案 / 內容嗎？
**不要**。你是美術設計師，不做內容。用 `{{placeholder}}` 或 lorem ipsum 填充。Howard 後期用 `reference/` 真實內容替換。

### Q: 新頁面怎麼建？
1. `app/(public)/<new-route>/page.tsx` 新增 page
2. `middleware.ts` line 44 的 `publicPaths` array 加入新路徑
3. 若中英文雙版，`app/(public)/en/<new-route>/page.tsx` 也要加
4. PR body 標註「新增路由」

### Q: 我的 Claude 能跑 migration 嗎？
**不能**。`supabase/migrations/` 全禁區。

### Q: 圖片資產從哪拿？
見 [`assets-exposure.md`](assets-exposure.md) 每項標註來源。缺的向 Howard 要（Google Drive 531 張庫存）。

---

## 聯絡

- **Howard Chiang**（Repo owner / Reviewer）：howard.chiang@ntutec.com
- **Holden 陳泓仁**（時行創意 / 外部設計師）：holden.chen@ingsist.com

重要決策走 GitHub issue / PR 留痕；日常溝通 Slack / Email。

---

*v1.1 | 2026-04-18 | Howard Chiang + Claude Opus 4.7*
