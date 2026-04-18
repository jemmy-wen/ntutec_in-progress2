---
title: GEO / SEO 技術規格 + 禁區清單
source: P001 phase4_build/GEO_SEO_Strategy.md（Howard 2026-03 + 4/16-17 實裝後更新）
purpose: 設計改版時的 SEO / AEO 技術邊界
updated: 2026-04-18
---

# GEO / SEO 技術規格與禁區

> **核心訊息**：4/16 上線 + 4/17 Legacy SEO 搶救已把 SEO / AEO 基線調到生產狀態。**改版首要原則是「不退步」**，不是「再優化」。

---

## 現況基線（已在 production）

| 項目 | 狀態 | 位置 |
|------|------|------|
| `robots.txt` AI 爬蟲白名單 | ✅ | `public/robots.txt`（10 個 AI crawler：GPTBot / ClaudeBot / PerplexityBot / Google-Extended / Amazonbot 等）|
| `llms.txt` | ✅ | `public/llms.txt` |
| `Organization` JSON-LD | ✅ | `app/layout.tsx` + `OrganizationSchema.tsx` |
| **FAQPage JSON-LD（首頁）** | ✅ | `components/public/HomeFAQSchema.tsx`（AEO 基線 79→92 核心） |
| OpenGraph + Twitter Card | ✅ | `app/layout.tsx` root metadata |
| `sitemap.xml` | ✅ | Next.js `sitemap.ts` |
| **35 條 301 redirect** | ✅ | `next.config.ts` line 78-139（中文 source percent-encoded） |
| **`metadataBase`** | ✅ | `app/layout.tsx`：`https://tec.ntu.edu.tw`（阻 canonical 漂移） |
| Google Analytics 4 | ✅ | `G-6Q85ZN79K7` |
| Vercel Analytics | ✅ | 4/16 commit `37090b8` |

### 基線數字

- **Lighthouse mobile**（4/16）：home 78 / /apply 91 / /mentors 89 / /en/garage 74 / desktop 98
- **AEO 基線**：tec.ntu.edu.tw **79/100**（4/16）→ 首頁 FAQPage JSON-LD + robots.txt AI allow → 預期升 92

---

## 禁區清單（設計改版不可動）

### 🔴 絕對禁區（動了會炸 production）

1. **`next.config.ts` redirects**（line 78-139，35 條）
   - 原因：4/17 Legacy SEO 搶救才修完，Google SERP 5 個舊中文路徑全靠這 35 條轉（`/執行團隊`、`/業師陣容`、`/關於台大創創中心`、`/台大創創新創輔導計畫總覽`、`/portfolio`）
   - 踩雷記錄：中文 source 必須 **percent-encoded**，否則不 match（Next.js 不 decode 入站 URL）

2. **`metadataBase: https://tec.ntu.edu.tw`**（`app/layout.tsx`）
   - 原因：阻止 canonical 漂移到 `*.vercel.app` 的基石
   - 踩雷記錄：曾加 `alternates.canonical: '/'` 導致所有子頁繼承 root canonical → 已移除，絕不再加

3. **首頁 FAQPage JSON-LD**（`HomeFAQSchema.tsx`）
   - 原因：AEO 基線 79→92 主要貢獻者
   - 改 FAQ 內容須同步更新 JSON-LD（兩邊不可不同步，schema.org 驗證會 fail）

4. **`robots.txt` AI 爬蟲 allow**（10 個）
   - 原因：AEO 必要條件，GPT / Claude / Perplexity 要能讀才能摘入 AI 搜尋

5. **Noto Sans TC `next/font` preload**（`app/layout.tsx`）
   - 原因：Howard 決策「保留完美字型體驗」（LCP 讓給字型 preload）
   - trade-off：Lighthouse LCP 略差，但視覺體驗不妥協

6. **電話號碼不公開**
   - 原因：硬規則，官網 / JSON-LD / schema / 對外資產一律不放
   - AEO 失分涉及電話一律跳過，不為分數妥協

### 🟡 協商區（改前先問）

- 加新頁面時更新 `middleware.ts` 公開路由清單
- 新增 JSON-LD（Event / BreadcrumbList / EducationalOccupationalProgram）
- 改 Meta Title template（目前：`%s | NTUTEC 台大創創中心`）
- 改每頁 OG image（目前共用 `/og-image.png`）

---

## GEO（AI 摘要引擎）優先原則

**傳統 SEO vs GEO 差異**：

| 維度 | 傳統 SEO | GEO |
|------|---------|-----|
| 目標 | 出現在 Google 10 藍連結 | 被 AI 引用為摘要來源 |
| 內容格式 | 長尾關鍵字、段落文章 | 直接答案型、結構化問答 |
| 技術信號 | Backlinks、PageRank | JSON-LD、llms.txt、直接引用文字 |
| 實體識別 | Title / Meta | 實體名稱一致性（schema.org `name` / `alternateName`） |

**NTUTEC GEO 已做（不必重做）**：

1. ✅ 「NTUTEC」、「台大創創中心」、「NTU Technology Entrepreneurship Center」三個名稱在 `Organization` schema 的 `name` / `alternateName` / `sameAs` 對應
2. ✅ `/faq` 的 `FAQPage` JSON-LD（首頁也有）
3. ✅ `llms.txt` 已精準描述機構定位與頁面內容
4. ✅ `robots.txt` AI 爬蟲白名單

---

## 改版可做的 SEO 加分項（Tier 2-3）

### Tier 2（上線後 1 個月內可排入）

- **EducationalOccupationalProgram Schema**（`/accelerator` + `/garage`）
  - 在 Google 搜尋「創業孵化器」、「創業加速器課程」時展示 Rich Result
- **每頁獨立 OG image**（`next/og` 動態生成）
  - 至少為 `/accelerator` / `/angel-club` / `/apply` / `/angel-apply` 4 頁生成獨立 OG

### Tier 3（長期品質提升）

| 項目 | 說明 | 優先度 |
|------|------|--------|
| 圖片 alt text 全面稽核 | Portfolio / Mentors / Team 頁面圖片 alt 多為空或 placeholder | 中 |
| Hreflang 標記 | `/en/about` 等英文頁面加 `hreflang="en"`、中文頁面 `hreflang="zh-TW"` | 低 |
| `ItemList` Schema — `/alumni` | 新創列表加 `ItemList` schema | 中 |
| Core Web Vitals | 上線後 Lighthouse 目標 LCP < 2.5s、CLS < 0.1（字型 trade-off 除外） | 中 |
| Internal Linking | 各頁面 CTA 連結回 `/apply` / `/angel-apply`，提升權重流 | 高 |

---

## 驗證工具

| 工具 | 用途 | 網址 |
|------|------|------|
| Google Rich Results Test | 驗證 JSON-LD 結構化資料 | https://search.google.com/test/rich-results |
| Schema.org Validator | 驗證 schema 語法 | https://validator.schema.org |
| Google Search Console | 提交 sitemap、監控 Crawl Error | https://search.google.com/search-console |
| Perplexity.ai | 手動搜尋「台大創創中心」測試 GEO 可見度 | https://www.perplexity.ai |
| Lighthouse | Core Web Vitals + AEO 分析 | Chrome DevTools 內建 |

---

## 4/17 Legacy SEO 搶救事件摘要（背景）

- **事件**：Google SERP sitelinks 5 個舊中文路徑全 404（舊 WP 架構留下）
- **處理**：3 個 commit（`bc24458` → `7d1b763` → `4413707`）
  1. 加 `metadataBase` + 34 legacy slug redirects
  2. 中文 source percent-encode 修正
  3. 移除 root `alternates.canonical`（避免子頁繼承）
- **結果**：35/35 redirect + 6 頁 canonical 全綠

**踩坑記錄（寫 redirect / canonical 時務必避開）**：

1. **Next.js redirects() source 不 decode 入站 URL** → 中文 source 必須 percent-encode（`/執行團隊` → `/%E5%9F%B7%E8%A1%8C%E5%9C%98%E9%9A%8A`），原文留註解
2. **root layout `alternates.canonical: '/'` 會被所有未覆寫子頁繼承** → root 只設 `metadataBase`，不設 `canonical`

---

## 來源

- 原檔：`1_Projects/P001_NTU_TEC_Website/phase4_build/GEO_SEO_Strategy.md`（Howard 2026-03，上線後更新）
- 踩坑記錄：`feedback_nextjs_redirect_encoding.md` + `feedback_nextjs_root_canonical_inheritance.md`
