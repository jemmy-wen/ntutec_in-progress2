# NTUTEC Platform — Claude Code Instructions

> 這份文件給**兩端 Claude（Howard + 外部設計師 Holden）** 共讀。進 repo 前先讀此文件 + [`docs/DESIGN_HANDOFF.md`](docs/DESIGN_HANDOFF.md)。

## 這是什麼

`tec.ntu.edu.tw`（台大創創中心官網）的 production repo。**4/16 已上線**，4/17 剛修完 Legacy SEO 搶救（35 條 301 redirect + metadataBase + canonical 修正）。

**技術棧**：Next.js 15（App Router）+ TypeScript + Tailwind v4（`@theme inline`）+ Supabase + Ghost CMS + shadcn/ui

**部署**：Vercel（production / preview 自動部署每 PR）

## 本地開發

```bash
npm install
cp .env.local.example .env.local  # 填入 Supabase + Ghost keys
npm run dev
# localhost:3000
```

## Core SOT 檔案（設計改版必讀）

| 類別 | 檔案 | 作用 |
|------|------|------|
| 🎨 **Design tokens** | `app/globals.css`（`@theme inline` block）| Teal 主色 + Stone + Oxford + Amber Gold + 自訂工具類 |
| 🔤 **字型** | `app/layout.tsx` | Geist（Latin）+ Noto Sans TC（CJK）走 Next.js font API |
| 🧭 **公開路由清單** | `middleware.ts` line 44-55（25 條）| 新增公開頁面必須同步更新 |
| ↪️ **Redirects** | `next.config.ts` line 78-139（35 條）| Legacy WP slug → 新路由（中文 source 須 percent-encode）|
| 🏠 **首頁 components** | `components/public/home/` | Hero / AudienceCards / FocusAreas / ThreeConnections / Stats / NTUEcosystem / News / Partners |
| 📄 **公開頁面** | `app/(public)/` + `app/(public)/en/` | 中英文各 11+ 頁 |
| 🛢️ **Supabase** | `lib/supabase/{admin,client,server,service}.ts` | 4 auth roles、業師/新創/會員/logo storage |
| 📝 **Blog CMS** | `lib/ghost.ts` + `app/(public)/blog/` | Ghost 原生 fetch（ISR revalidate 3600） |
| 🔍 **SEO Schemas** | `components/public/*Schema.tsx` | FAQPage / Organization / Breadcrumb JSON-LD |

## 設計改版分工（2026-04-18 導入外部合作）

> **Holden 專責美術設計**——元件視覺、版面配置、動畫、字型 rhythm、互動 micro-animation。
> **Holden 不做**：文案生成、內容策略、數字核對、DB 變更、SEO 策略。設計稿用 `{{placeholder}}` 或 lorem ipsum 填充，Howard 後期接 [`docs/reference/`](docs/reference/) 真實內容。

### 🟢 設計師（時行創意 / Holden）可自由改

- **`app/globals.css` `@theme inline`**：色票 / radius / 字型 variable
- **`components/public/` 下的 tsx**：Tailwind classes 視覺調整、佈局重構、新增 subcomponent
- **新增頁面**：`app/(public)/<new-route>/page.tsx`
- **新增 Schema 元件**：`components/public/*Schema.tsx`（需 review）
- **新增圖片資產**：`public/`

### 🔴 設計師不可改（Howard / 核心 Claude 負責）

- **`next.config.ts` redirects**（35 條 Legacy SEO，4/17 才修完，動了會炸 Google SERP）
- **`middleware.ts`**（公開路由清單 + auth guard 邏輯）
- **`app/layout.tsx` 的**：
  - 字型 `next/font/google` config
  - `metadataBase: https://tec.ntu.edu.tw`
  - root `metadata`（⚠️ 特別是不能加 `alternates.canonical`，會被子頁繼承造成 duplicate-content）
  - OrganizationSchema JSON-LD
- **Supabase schema / migrations**：`supabase/migrations/` 所有 SQL
- **`lib/ghost.ts` 的 CSP 白名單**
- **根 `CLAUDE.md`（本文件）**

### 協商區（改之前先開 issue 討論）

- 新增 `middleware.ts` 公開路由
- 新增 Supabase table / RLS 調整
- 改 JSON-LD（FAQPage / Event / BreadcrumbList）
- 改 `tsconfig.json` / `next.config.ts` 非 redirects 的部分（CSP / headers / images domains）

## PR 流程

1. **分支命名**：`design/<topic>`（例：`design/homepage-v2`、`design/mentors-card-redesign`）
2. **PR 標題**：`design: [頁面/元件] 改動摘要`
3. **PR body** 套 [`.github/pull_request_template.md`](.github/pull_request_template.md) 模板（已預填 9 條禁區 checklist）
4. **Review**：Howard + Howard 的 Claude 讀 diff 做結構化 review
5. **Merge**：Howard squash merge
6. **Vercel preview** 每 PR 自動部署 → PR description 會有 preview 連結

## 禁區 Checklist（9 條，每 PR 必過）

- [ ] Lighthouse mobile ≥ 70（home / apply / mentors 三頁）
- [ ] FAQPage JSON-LD 保留在首頁
- [ ] `metadataBase: https://tec.ntu.edu.tw` 未動
- [ ] 35 條 `next.config.ts` redirects 未動
- [ ] `middleware.ts` 公開路由清單未動（新增頁面請在 PR 標註）
- [ ] Noto Sans TC / Geist `next/font` preload 未動
- [ ] 電話號碼未出現在新頁面（硬規則：官網/JSON-LD/schema 一律不放）
- [ ] 品牌名「台大車庫 / 台大加速器 / 企業垂直加速器」正確，不用「車庫孵化器」「加速器」裸稱
- [ ] 對外數字以 [`docs/reference/brand-highlights.md`](docs/reference/brand-highlights.md) 為準（600+ / 35 / 27 等）

## 常見錯誤與解法

| 錯誤 | 原因 | 解法 |
|------|------|------|
| Build fail：`next/font` preload error | 改了 `app/layout.tsx` font config | Revert — 字型 config 是禁區 |
| Redirect chain too long | 砍了 35 條 Legacy redirect | Revert — 4/17 Legacy SEO 搶救事件，不可動 |
| CSP violation（外部圖片 / iframe）| 新資源未加白名單 | 在 `next.config.ts` CSP block 加，但不動 Ghost / Supabase / Luma 既有白名單 |
| JSON-LD validation fail | schema 結構錯 | 用 https://search.google.com/test/rich-results 驗證 |
| Google SERP canonical 漂移到 *.vercel.app | `app/layout.tsx` metadataBase 被動到 | Revert — metadataBase 是 SEO 基石 |
| Next.js redirect 中文 source 不 match | 沒 percent-encode | 中文 source 改 `%xx` 形式（Next.js 不 decode 入站 URL） |

## 參考文件

```
docs/
├── DESIGN_HANDOFF.md           ← 設計交接入口（必讀）
├── components-inventory.md     ← ⭐ Tier 1：現有 22 元件 + 8 新增 ROI
├── user-journeys.md            ← ⭐ Tier 1：5 類受眾路徑 + CTA 總清單
├── assets-exposure.md          ← ⭐ Tier 1：可曝光素材（Logo / 照片 / 數字 / 獎項）
├── reference/                  ← Tier 3：內容填充才需查
│   ├── README.md
│   ├── brand-highlights.md     ← 7 項權威數字 + 6 校友案例
│   ├── alumni.md               ← 15 位代表校友（Vincent 挑選）
│   ├── design-reference.md     ← Sustaihub 視覺參考 7 模式
│   └── seo.md                  ← GEO/SEO 技術規格 + 禁區
├── API_Routes_Reference.md
├── PRD_Implementation_Status.md
├── Supabase_Schema_Reference.md
├── SECURITY_REVIEW_20260415.md
├── RLS_Audit_20260331.md
├── Security_Audit_20260331.md
└── code_quality_report_20260331.md
```

---

*最後更新：2026-04-18 | 設計交接 v1.0 | Howard Chiang + Claude Opus 4.7*
