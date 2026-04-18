# Design Handoff — NTUTEC Platform

> **給設計師（時行創意 / Holden）的入口文件**
> **建立日期**：2026-04-18
> **版本**：v1.0

---

## 歡迎

你拿到的不是「一份 design brief」，是**已經上線的 production 網站**（`tec.ntu.edu.tw`，4/16 上線）。你的工作是**在既有基礎上視覺升級**，不是從零重做。

兩件事先記住：
1. **真正的 SOT 是這個 repo**（不是外部文件、不是 Figma）。每次改設計前先 clone + pull 看 live state。
2. **你的 Claude 會自動讀 [`CLAUDE.md`](../CLAUDE.md)**。那份是工具書，本文件是入口索引。

---

## Step 0：設定你的工作環境

```bash
git clone https://github.com/howardchiang-svg/ntutec-platform.git
cd ntutec-platform
npm install
cp .env.local.example .env.local  # Howard 會給你 Supabase + Ghost keys
npm run dev
# http://localhost:3000
```

進 repo 後你的 Claude Code 會自動讀：
- [`CLAUDE.md`](../CLAUDE.md)（分工邊界、禁區、PR 流程）
- 本文件 [`docs/DESIGN_HANDOFF.md`](DESIGN_HANDOFF.md)（你現在讀的）

---

## Step 1：10 份 Code 必讀檔案（按優先序）

| # | 檔案 | 為什麼讀 |
|---|------|---------|
| 1 | [`app/globals.css`](../app/globals.css) | **Design tokens SOT**。Teal 主色、Stone、Oxford、Amber Gold、自訂工具類（btn-pill-primary / card-hover / section-spacing）、typography scale 都在這。**Tailwind v4 `@theme inline`** 語法——你就在這檔案改 tokens，不要建 `tailwind.config.ts` |
| 2 | [`app/layout.tsx`](../app/layout.tsx) | 字型 config（Geist + Noto Sans TC 走 Next.js font API）、`metadataBase`、OrganizationSchema。**本檔禁區多**，要改先問 |
| 3 | [`components/public/Navbar.tsx`](../components/public/Navbar.tsx) | 導航系統、登入狀態、mobile responsive 範本 |
| 4 | [`components/public/Footer.tsx`](../components/public/Footer.tsx) | 頁尾佈局、NTU 生態系連結、品牌資訊 |
| 5 | [`components/public/home/HeroSection.tsx`](../components/public/home/HeroSection.tsx) | 首頁 Hero 當前實作 |
| 6 | [`next.config.ts`](../next.config.ts)（line 78-139）| 35 條 redirect 規則 + CSP 安全設定。**全禁區，讀為了理解約束** |
| 7 | [`middleware.ts`](../middleware.ts)（line 44-55）| 25 條公開路由清單。新增頁面必須同步更新這裡 |
| 8 | [`lib/ghost.ts`](../lib/ghost.ts) | Ghost API 類型定義、blog 內容結構 |
| 9 | [`components/public/HomeFAQSchema.tsx`](../components/public/HomeFAQSchema.tsx) | FAQPage JSON-LD 範本（其他 Schema 依樣做） |
| 10 | [`app/(public)/en/layout.tsx`](../app/(public)/en/layout.tsx) | 英文路由結構、i18n 注入點 |

---

## Step 2：5 份內容 SOT（`docs/content-sot/`）

| 檔案 | 給誰用 |
|------|-------|
| [`content-sot/README.md`](content-sot/README.md) | 總覽 5 份文件來源 |
| [`content-sot/brand-highlights.md`](content-sot/brand-highlights.md) | **對外數字 SOT**（600+ / 35 / 27 / 350+ / NT$1 億+）+ 6 校友案例 + HI3 模型 |
| [`content-sot/alumni.md`](content-sot/alumni.md) | 15 位代表校友（Vincent 挑選，含 2024-2026 近年亮點）|
| [`content-sot/design-reference.md`](content-sot/design-reference.md) | **視覺參考**：Sustaihub 7 個設計 pattern 分析 + NTUTEC 可借鏡處 |
| [`content-sot/seo.md`](content-sot/seo.md) | GEO/SEO 技術規格 + 不可動的 JSON-LD 清單 |

設計時要用數字、人名、公司名 → **一律以這 5 份為準**，不要自己找來源或臆測。

---

## Step 3：設計系統速查（Tailwind v4 `@theme inline`）

### 色票（全部在 `app/globals.css` 第 8-69 行）

```css
/* NTU TEC Brand Colors（主要） */
--color-teal:        oklch(0.66 0.12 180);  /* 主色 — 按鈕、連結、強調 */
--color-teal-deep:   oklch(0.55 0.10 178);  /* Teal hover */
--color-teal-light:  oklch(0.95 0.03 180);  /* Teal 背景淺色 */
--color-teal-wash:   oklch(0.97 0.015 180); /* Teal 最淺背景 */

/* Warm neutrals */
--color-stone:       oklch(0.97 0.005 90);  /* 主背景 */
--color-stone-warm:  oklch(0.95 0.008 85);  /* 次背景 */
--color-charcoal:    oklch(0.20 0.005 65);  /* 主文字 / 標題 */
--color-slate-muted: oklch(0.55 0.015 260); /* 次要文字 */

/* Extended prestige（用於企業、天使、合作） */
--color-oxford:      #0A192F;  /* 權威深藍 */
--color-amber-gold:  #D4AF37;  /* 尊榮金 */
--color-warm-stone:  #F8F7F2;  /* 暖米色背景 */
```

**使用**（Tailwind classes）：`bg-teal` `text-charcoal` `bg-warm-stone` `text-oxford` `bg-amber-gold` 等，v4 自動從 `@theme inline` 生成。

### 字型

```tsx
// app/layout.tsx 已 config（禁區，不要改）
--font-sans: Geist（Latin）       // 走 next/font/google
--font-zh:   Noto Sans TC（CJK）  // preload + display: swap
```

中文文章優化已處理：`.prose p { line-height: 1.9; letter-spacing: 0.02em; margin-bottom: 1.5em; }`

### Typography Scale（已全域設定）

```css
h1: text-4xl md:text-5xl lg:text-6xl (leading-tight)
h2: text-3xl md:text-4xl            (leading-tight)
h3: text-2xl md:text-3xl            (leading-snug)
h4: text-xl md:text-2xl             (leading-snug)
```

Blog / 長文會自己覆蓋（`.blog-article` / `.prose` 不繼承全域 scale）。

### 自訂工具類（`@utility` 定義）

| Class | 用途 |
|-------|------|
| `btn-pill-primary` | Teal 圓角按鈕（主 CTA） |
| `btn-pill-outline` | Teal outline 按鈕（次 CTA） |
| `card-hover` | translateY -4px + shadow on hover |
| `section-spacing` | 5/7/8rem RWD padding |
| `micro-label` | uppercase tracking-wide teal（小標籤） |
| `bg-warm-stone` | 暖米色背景 |
| `shadow-elite` | 優雅 shadow |
| `card-elevated` | 放大版 card-hover |

### 動畫

- `fadeUp` keyframe 可用
- **Framer Motion** 已安裝（首頁裝飾懶載）
- `prefers-reduced-motion` 已 respect（無障礙）

---

## Step 4：Core Components 清單（`components/public/`）

### 共用

- `Navbar.tsx`（15KB，含登入 auth 整合）
- `Footer.tsx`（10KB，NTU 生態系連結）

### 首頁 Sections（`components/public/home/`）

1. `HeroSection.tsx`
2. `AudienceCards.tsx`（三受眾：新創 / 企業 / 投資人）
3. `FocusAreasSection.tsx`
4. `ThreeConnectionsSection.tsx`
5. `StatsSection.tsx`
6. `NTUEcosystemSection.tsx`
7. `NewsSection.tsx`
8. `PartnersSection.tsx`

### 表單與 Schema

- `AngelApplyForm.tsx`、`PreRegisterForm.tsx`
- `HomeFAQSchema.tsx`、`OrganizationSchema.tsx`

---

## Step 5：禁區清單（9 條，必過 PR Checklist）

| # | 禁區 | 不可動原因 |
|---|------|-----------|
| 1 | **35 條 `next.config.ts` redirects** | 4/17 Legacy SEO 搶救事件才修完，Google SERP 5 個舊中文路徑靠這 35 條轉 |
| 2 | **`metadataBase: https://tec.ntu.edu.tw`** | 阻 canonical 漂移到 *.vercel.app 的基石 |
| 3 | **root layout `alternates.canonical`** | 絕不可設（會被所有子頁繼承成 root canonical，造成 duplicate-content） |
| 4 | **首頁 FAQPage JSON-LD** | AEO 基線 79→92 核心載體 |
| 5 | **`robots.txt` 10 個 AI crawler allow** | AEO 必要條件 |
| 6 | **Noto Sans TC `next/font` preload** | Howard 決策：保留完美字型體驗（LCP trade-off 接受） |
| 7 | **電話號碼不公開** | 硬規則：官網 / JSON-LD / schema / 對外資產一律不放（AEO 失分不補） |
| 8 | **品牌正名** | 「台大車庫 / 台大加速器 / 企業垂直加速器」官方命名，不用「車庫孵化器」「加速器」裸稱 |
| 9 | **對外數字 SOT** | 600+ / 35 / 150+ / 40+ / 27 以 `content-sot/brand-highlights.md` 為準，不可自創 |

---

## Step 6：PR 流程

1. **分支**：`design/<topic>`（例：`design/homepage-v2`）
2. **Commit**：小步快跑，每 commit 1 個視覺改動
3. **PR**：用 [`.github/pull_request_template.md`](../.github/pull_request_template.md)，填 Lighthouse 成績 + 禁區 checklist
4. **Vercel preview**：PR description 自動帶 preview 連結
5. **Howard review**：Howard 的 Claude 讀 diff 做結構化審查
6. **Merge**：Howard 拍板 squash merge

---

## Step 7：3 個已預鋪的 ROI 改動（你可挑一個先做）

從 [`content-sot/design-reference.md`](content-sot/design-reference.md) 抽出最高 ROI 的 3 項（Sustaihub 參考分析）：

| 優先 | 行動 | 工作量 | 預期效果 |
|:---:|---|:---:|---|
| **①** | 首頁新增「媒體報導」section（5-8 篇外部新聞卡片） | 小 | 第三方信任感大幅提升 |
| **②** | Logo Wall 恢復（先用新創校友 logo，不需廠商確認） | 中 | 視覺信任 + 「600+ 校友」具象化 |
| **③** | 首頁 FAQ 視覺化（accordion 3-5 題） | 小 | UX + SEO 雙贏（JSON-LD 已有） |

熱機：建議從 **③ FAQ accordion** 開始——工作量最小、馬上能看到視覺成果、Lighthouse / AEO 不會退步。

---

## FAQ

### Q: 我可以改 Tailwind config 嗎？
**不用**。本 repo 用 Tailwind v4 的 `@theme inline` 語法，所有 tokens 直接改 `app/globals.css` 第 8-69 行。**不要建 `tailwind.config.ts`**。

### Q: 我可以加新字型嗎？
**可以討論**，但不要直接改 `app/layout.tsx`（禁區）。開 issue 提議 → Howard 同意後統一在 `app/layout.tsx` 加 `next/font` instance。

### Q: 我可以重寫 CSS 嗎？
**請先用 Tailwind classes**。極端特殊情況才加 `@utility` 或 `@layer components`（都寫在 `app/globals.css`）。不要建獨立 `.css` 檔。

### Q: 新頁面怎麼建？
1. `app/(public)/<new-route>/page.tsx` 新增 page
2. `middleware.ts` line 44 的 `publicRoutes` array 加入新路徑
3. 若是中英文雙版，`app/(public)/en/<new-route>/page.tsx` 也要加
4. PR body 標註「新增路由」，Howard review

### Q: 我可以改 JSON-LD 嗎？
**先問**。JSON-LD 全禁區——FAQPage 在首頁、OrganizationSchema 在 root layout、BreadcrumbList 在各 PageHero。改動要有明確 SEO 理由 + 經 Howard review。

### Q: 我的 Claude 能跑 migration 嗎？
**不能**。`supabase/migrations/` 全禁區。需要新 DB table / column / RLS 改動 → 開 issue，Howard 寫 migration。

### Q: 圖片資產從哪拿？
- NTUTEC 品牌 logo：`public/`（含 `logo-tec-icon.png`）
- 業師頭像：Supabase storage（`mentor-avatars` bucket）
- 企業 logo：Supabase storage（`corporate-logos` bucket）
- 現場照片：`public/photos/`（2026 開幕式 + 2025 Demo Day）
- 需要新圖片 → 問 Howard 拿（Google Drive 有完整 531 張庫存）

---

## 聯絡

- **Howard Chiang**（Repo owner / Reviewer）：howard.chiang@ntutec.com
- **Holden 陳泓仁**（時行創意 / 外部設計師）：holden.chen@ingsist.com

Slack / Email / GitHub issue 都可以——重要決策走 GitHub issue / PR 留痕。

---

*v1.0 | 2026-04-18 | Howard Chiang + Claude Opus 4.7*
