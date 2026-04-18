---
title: 設計參考 — Sustaihub 永訊智庫
source: P001 phase5_launch/Design_Reference_Sustaihub_v0.1.md
analyzed_url: https://www.sustaihub.com/
purpose: NTUTEC 官網未來改版設計亮點參考
updated: 2026-04-17
---

# 設計參考：Sustaihub 永訊智庫

> **參考來源**：https://www.sustaihub.com/（ESG 永續 SaaS + 顧問，50+ 上市櫃客戶）
> **分析日期**：2026-04-17
> **用途**：NTUTEC 官網改版可借鏡的設計模式

---

## 值得借鏡的 7 個設計模式

### 1. 雙 CTA 導航列
- **Sustaihub 做法**：右上角「免費試用」+「立即諮詢」兩色並列（primary + secondary），降低轉換摩擦
- **NTUTEC 現況**：右上角只有「立即申請」一個 dropdown
- **改版建議**：拆為「新創投遞」（primary solid）+「聯繫我們」（secondary ghost），讓非新創訪客（企業 / 投資人）也有明確入口
- **優先級**：🟢 低工作量

### 2. 客戶 Logo Wall（20+ logos 網格）
- **Sustaihub 做法**：「獲得各大公司的信賴」標題 + 20+ 客戶 logo 網格排列，視覺上一秒建立信任
- **NTUTEC 現況**：合作企業 logo 曾有但已隱藏（待確認廠商揭露意願）；目前只有文字描述
- **改版建議**：
  - 方案 A：逐家確認後恢復企業合作 logo wall
  - 方案 B：**先用新創校友 logo**（已畢業公開公司如 MoBagel、AmazingTalker、配客嘉、ECOCO 等，無需額外確認）
  - 標題可用「600+ 新創校友，從這裡出發」
- **優先級**：🟡 中（方案 B 可直接動，方案 A 卡行政確認）

### 3. 媒體報導區塊（第三方背書）
- **Sustaihub 做法**：首頁設「媒體報導」section，天下 / 商周 / 遠見等 6 篇新聞卡片（出處 logo + 標題 + 連結）
- **NTUTEC 現況**：無媒體報導專區；有 Ghost blog 但內容是自產文章
- **改版建議**：新增「媒體報導」section 於首頁，整理 5-8 篇外部報導（NTUTEC 有足夠新聞量：Demo Day、台大創創中心報導、校友新創融資新聞等）
- **優先級**：🟢 低工作量、高信任感提升
- **ROI 最高**：第三方背書 > 自說自話的數字

### 4. AI 互動入口 +「NEW」標籤
- **Sustaihub 做法**：SustainAI 搜尋入口放首頁，附「NEW」標籤 + 熱門問題快捷鍵，引導試用
- **NTUTEC 現況**：無類似互動入口
- **改版建議**：未來可考慮「新創校友搜尋」或「業師配對」互動入口放首頁，搭 `NEW` / `HOT` tag 突顯
- **優先級**：🟡 中期（需後端 API 支撐，非第一階段）

### 5. 三產品卡片橫排（icon + 3 bullet + CTA）
- **Sustaihub 做法**：Syber / DCarbon / ESG 顧問三張卡片，每張 icon + 3 功能要點 + 「了解更多」CTA
- **NTUTEC 現況**：`AudienceCards` 已有三受眾卡片（新創 / 企業 / 投資人），結構類似 ✅
- **改版建議**：已達標。可借鏡「每張卡片精練到恰好 3 個 bullet + 獨立 CTA」的精簡度
- **優先級**：✅ 已做

### 6. 首頁 FAQ 視覺化（accordion + schema）
- **Sustaihub 做法**：首頁底部 5 題 FAQ accordion，且有 FAQPage schema markup
- **NTUTEC 現況**：FAQPage JSON-LD 已注入首頁 ✅（4/16），但首頁沒有**視覺版**FAQ，只有 `/faq` 頁有
- **改版建議**：加一個 3-5 題的 FAQ accordion 到首頁底部（NewsSection 之後），兼顧 SEO + 使用者體驗
- **優先級**：🟢 低工作量

### 7. 多語切換
- **Sustaihub 做法**：導航列明確語言按鈕，支援繁 / 簡 / 英 / 泰 / 日
- **NTUTEC 現況**：已有 EN / 中文 switcher ✅（4/16 `02f86b6`）
- **優先級**：✅ 已做

---

## 最高 ROI 行動（推薦優先序）

| 優先 | 行動 | 工作量 | 預期效果 |
|:---:|---|:---:|---|
| **①** | 首頁新增「媒體報導」section（5-8 篇外部新聞卡片） | 小 | 第三方信任感大幅提升 |
| **②** | Logo Wall 恢復（先用新創校友 logo，不需廠商確認） | 中 | 視覺信任感 + 「600+ 校友」具象化 |
| **③** | 首頁 FAQ 視覺化（accordion 3-5 題） | 小 | UX + SEO 雙贏（JSON-LD 已有） |

---

## 不建議照搬的模式

| 模式 | 為何不適合 NTUTEC |
|------|-------------------|
| 密集 CTA 投放（10+ 個）| NTUTEC 受眾多元（新創 / 企業 / 投資人 / 學生），太多 CTA 會混亂；Sustaihub 是單一 SaaS 可集中 |
| 「免費試用」CTA | NTUTEC 是輔導計畫不是 SaaS，沒有「試用」概念 |
| 綠色主色調 | NTUTEC 品牌色是 **Teal**（`oklch(0.66 0.12 180)`），已定案 |
| 定價表 | NTUTEC 輔導計畫免費、天使會費用非公開比價型 |

---

## Sustaihub 公司背景（供參考）

| 項目 | 內容 |
|------|------|
| 產品 | ESG 報告書系統 Syber + 碳盤查 DCarbon + AI 分析 SustainAI |
| 模式 | SaaS 訂閱 + 顧問輔導（混合） |
| 客戶 | 50+ 上市櫃企業（聯發科、緯創、精誠、遠傳、宜鼎等） |
| 數字 | 100+ 輔導案例、查證通過率 100% |
| 加速器 | 500 Global、SparkLabs、遠傳創新加速器 |
| 地址 | 台北市中山區玉門街 1 號 CIT |
| 關鍵人 | 李振北（曾撰聯發科永續報告書） |
