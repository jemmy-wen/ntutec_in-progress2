---
title: User Journeys — 5 類受眾路徑與 CTA 流程
purpose: 讓美術設計決定每個元件的情緒、急迫感、視覺重量
updated: 2026-04-18
tier: 1（設計師必讀）
---

# User Journeys

> **這份文件的目的**：美術設計不只是「好看」，是「好看的**對的東西放在對的位置**」。每個元件服務一條 journey 上的特定情緒與決策——這裡告訴你是哪條。

---

## 🧭 5 類受眾路徑總覽

| # | 受眾 | 流量 | 商業價值 | Primary CTA | 主路徑 |
|---|------|-----|---------|------------|--------|
| 1 | **創業者 / 新創團隊** | 最大 | 中 | 填 `/apply` 申請 | `/` → `/programs` → `/apply` |
| 2 | **企業合作窗口** | 小 | 最高 | 填 `/corporate` 聯絡 | `/` → `/corporate` → 聯絡表單 |
| 3 | **投資人 / 天使會員** | 小 | 高 | 申請 `/angel-apply` | `/angel` → `/angel-apply` |
| 4 | **業師候選人** | 小 | 中 | 預約 `/pitch` 健診 | `/mentors` → `/pitch` |
| 5 | **媒體 / 學界 / 政府** | 小 | 低（但 PR 價值）| 聯絡窗口 | `/` → `/news` / `/about` → `/contact` |

**時節因素**：申請季（12 月 – 1 月、3 月開訓前）#1 創業者流量集中；其他時間分散。

---

## 🚀 Journey 1：創業者 / 新創團隊

### Persona
- **代表人物**：台大資工博士生 Alex，28 歲，跟同學想投 2026 台大加速器
- **進站情境**：晚上在實驗室用筆電，10 分鐘內想搞懂「我們有沒有資格、要提交什麼、上過的團隊現在如何」
- **情緒**：興奮但緊張，需要看到「像我這樣的人成功過」

### Path

```
Google 搜尋「台大創業加速器」/「台大車庫」
  ↓
[/] 首頁
  ↓ HeroSection 吸睛 → AudienceCards 自我辨識「我是新創」
[/] 下捲看 StatsSection + AlumniLogoWall + MediaCoverage → 建立信任
  ↓
[/programs] or [/accelerator] or [/garage]
  ↓ 了解計畫差異、時程、資源
[/apply]
  ↓ PreRegisterForm 填寫
Thank-you / 成功態
```

### 關鍵元件 × 情緒節點

| 節點 | 元件 | 要傳達的情緒 |
|------|------|------------|
| 首屏 | `HeroSection` | 「這裡是 **全台第一** 校園加速器」—— 權威 + 溫度 |
| 自我辨識 | `AudienceCards` | 「我是新創 → 點這張」—— 清晰、不猶豫 |
| 社會證明 | `StatsSection` | 「600+ 校友、NT$20+ 億募資」—— 具體數字，不是空話 |
| 具象化 | `AlumniLogoWall`（新）| 「配客嘉、AmazingTalker、MoBagel 都從這裡出發」—— 我認識這些名字 |
| 第三方背書 | `MediaCoverage`（新）| 「HBR、天下、商周都寫過我們」—— 不是自說自話 |
| 行動 | `PreRegisterForm` | 「填表不複雜」—— 進度條、欄位少、立即 confirm |

### Secondary Actions
- 訂閱 Newsletter（footer）
- 下載年度報告（`/about`）
- 約業師健診（`/mentors` → `/pitch`）

### Exit Signals（負面）
- 看不到「像我這樣的人」→ AlumniLogoWall 不夠醒目
- 資格搞不清楚 → HomeFAQ 沒回答「誰可以申請」
- 表單太長 → PreRegisterForm 沒分步驟 / 沒進度條

---

## 🏢 Journey 2：企業合作窗口

### Persona
- **代表人物**：大型金控創新部李經理，45 歲，老闆丟一句「去看看大學能不能合作新題目」
- **進站情境**：週二下午用 laptop，**3 分鐘內**要判斷「值不值得排會議」
- **情緒**：懷疑多、耐心少，要看成果不看願景

### Path

```
朋友推薦 / 搜尋「企業創新加速器」/「企業垂直加速器」
  ↓
[/] 首頁
  ↓ AudienceCards「我是企業 → 看企業方案」
[/corporate]
  ↓ 讀 CaseStudyCard（UDN / 聯經 / 玉山）→ 建立 credibility
[/corporate] 下捲看 CorporatePartnerSection（三方案比較）
  ↓
填聯絡表單 or 下載方案手冊 or 跳 /contact
```

### 關鍵元件 × 情緒節點

| 節點 | 元件 | 要傳達的情緒 |
|------|------|------------|
| 自我辨識 | `AudienceCards` | 「企業入口視覺權重要大到不輸新創入口」 |
| 首屏 `/corporate` | `PageHero`（可特別處理）| 「這裡服務企業，不是學校福利單位」—— 商務感 |
| Credibility | `CaseStudyCard`（新）| 「UDN、聯經、玉山做過，有天下雜誌報導」—— 同溫層認同 |
| 方案比較 | `CorporatePartnerSection`（新）| 「三種方案，清楚知道我要哪一種」 |
| 合作夥伴 logo | `PartnersSection` / Logo Wall | 「18+ 家企業合作過」—— 不孤單 |
| 行動 | 聯絡表單 | 「填了會有人回」—— 窗口明確、有 SLA 暗示 |

### Secondary Actions
- 下載企業合作方案 PDF
- 讀案例部落格文章
- 加入 LinkedIn

### Exit Signals（負面）
- 看不到案例 → CaseStudyCard 缺
- 方案不清楚 → CorporatePartnerSection 缺
- 感覺像學生作業 → 視覺調性不夠商務（太多 emoji / 太童趣）

---

## 💼 Journey 3：投資人 / 天使會員

### Persona
- **代表人物**：連續創業出場的陳董，55 歲，朋友推薦聽說台大有天使俱樂部
- **進站情境**：手機通勤時間瀏覽，**30 秒內**要決定「這裡的案源值得我每月花時間看嗎」
- **情緒**：見多識廣、要看 portfolio 品質與會員組成

### Path

```
LinkedIn 邀請 / 朋友口碑 / Angel Club Newsletter
  ↓
[/angel] 天使俱樂部
  ↓ AngelClubCard 讀三層基金架構 + portfolio 品質
  ↓ 信任感建立
[/angel-apply]
  ↓ AngelApplyForm（會員審核制）
Review → 聯絡
```

### 關鍵元件 × 情緒節點

| 節點 | 元件 | 要傳達的情緒 |
|------|------|------------|
| `/angel` 首屏 | `PageHero` + `AngelClubCard` | 「這不是會員俱樂部賣會費，是嚴選案源的 deal flow」 |
| Portfolio 展示 | `AlumniLogoWall` / `FeaturedAlumni`（天使俱樂部已投資的）| 「MoBagel、SAVFE、AHEAD 我聽過」 |
| 會員組成 | Member card / 數字展示 | 「350+ 活躍投資人、VC、CVC」 |
| 行動 | `AngelApplyForm` | 「申請 → 審核 → 入會」—— 不是秒入，有門檻感 |

### Secondary Actions
- 訂閱 Angel Digest
- 看最近一場天使例會 Demo Day 影片
- 下載基金架構說明

### Exit Signals（負面）
- 像賣課程網站 → 視覺太 SaaS、不夠低調優雅
- 案源看不到 → Portfolio 展示缺失
- 入會門檻不明 → 申請流程描述不清

---

## 🎓 Journey 4：業師候選人

### Persona
- **代表人物**：Fortune 500 亞太高階主管王總，50 歲，前同事推薦當業師
- **情緒**：時間有限，要確認「這是不是浪費時間的虛名組織」

### Path

```
前同事 / LinkedIn 推薦
  ↓
[/mentors] 看既有業師陣容
  ↓ MentorFilterTabs 篩選同行 → 建立同溫層認同
  ↓
[/pitch] 了解陪跑新創的方式（工時、頻率、預期成果）
  ↓
Email 聯絡
```

### 關鍵元件 × 情緒節點

| 節點 | 元件 | 要傳達的情緒 |
|------|------|------------|
| `/mentors` 首屏 | `MentorFilterTabs` + editorial 大肖像卡 | 「我會跟這些人同列」—— 榮譽感 + 同溫層 |
| `/pitch` | `PageHero` + 說明 section | 「輕量投入、有明確產出、不佔太多時間」 |
| 行動 | Email 聯絡 | 「找對窗口、不會石沉大海」 |

### Secondary Actions
- 看業師健診實際案例
- 下載業師手冊 PDF

### Exit Signals（負面）
- 業師陣容不夠亮 → MentorFilterTabs 卡面太弱
- 工時承諾不清 → `/pitch` 說明不夠透明

---

## 📰 Journey 5：媒體 / 學界 / 政府

### Persona
- **代表人物**：科技記者 / 學者 / NSTC 承辦
- **情緒**：找「可引用資料」—— 數字、案例、聯絡窗口

### Path

```
Google / 學術搜尋 / 政府資料庫
  ↓
[/] or [/about] or [/news]
  ↓ 抓數字、事實、人物、歷史
  ↓
[/contact] or 信箱
```

### 關鍵元件 × 情緒節點

| 節點 | 元件 | 要傳達的情緒 |
|------|------|------------|
| 權威數字 | `StatsSection` | 「可引用、有年份、有出處」 |
| 歷史脈絡 | `/about` PageHero + timeline | 「2013 起，12 年歷史」 |
| 聯絡 | `/contact` 窗口 | 「記者 email、對校 email 不同窗口」 |

### Secondary Actions
- 下載年度報告 PDF
- 訂閱 Newsletter

---

## 🎯 Primary CTA 總清單（設計師可直接用的按鈕文字）

| CTA | 出現頁面 | Primary / Secondary | 按鈕文字建議 |
|-----|---------|---------------------|------------|
| 申請加入計畫 | `/`、`/programs`、`/apply` | Primary | 「立即申請」/「報名 2026 梯次」 |
| 企業合作洽談 | `/`、`/corporate` | Primary | 「聊聊合作」/「預約會議」 |
| 加入天使俱樂部 | `/angel`、`/angel-apply` | Primary | 「申請入會」/「了解入會資格」 |
| 預約業師健診 | `/mentors`、`/pitch` | Primary | 「預約健診」 |
| 訂閱 Newsletter | Footer 全站 | Secondary | 「訂閱 Angel Digest」 |
| 下載年度報告 | `/about` | Secondary | 「下載 114 年度報告」 |
| 看 Demo Day 影片 | `/demo-day` | Secondary | 「觀看 2025 Demo Day」 |
| 聯絡窗口 | `/contact` | Secondary | 「聯繫我們」 |

---

## 💡 設計師應用原則

1. **視覺重量對齊商業價值**，不對齊流量比例——企業 / 投資人流量小但價值高，入口要跟新創入口平起平坐
2. **每個 Primary CTA 在該 journey 上應該出現 ≥ 2 次**（首屏 + 頁尾 / 區塊結束）
3. **Secondary CTA 不與 Primary 爭焦點**——可用 outline / text link / small button
4. **情緒 tempo 管理**：
   - 新創 journey：興奮 → 信任建立 → 行動（溫度 + 權威）
   - 企業 journey：懷疑 → credibility 建立 → 行動（商務 + 效率）
   - 投資人 journey：審視 → 優雅展示 → 行動（低調 + 品味）
5. **斷鏈檢查**：每個頁面都要能回答「從這裡我能去哪？」——不要有 dead-end 頁面
