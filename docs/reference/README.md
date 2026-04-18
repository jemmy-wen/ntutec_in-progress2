# Content SOT — NTUTEC Platform

> **給設計師的內容 SOT**
> **來源**：Howard Chiang 授權、來自 `Claude-cowork/1_Projects/P001_NTU_TEC_Website/` 的活文件
> **版本**：v1.0（2026-04-18 精選 copy）

---

## 為什麼需要這個資料夾

設計時要用數字、人名、公司名、案例 → **一律以這 5 份文件為準**，不要自己找來源、不要臆測、不要用 AI 生成式補全。

這 5 份檔案是 Howard 從更大的專案規劃庫（`1_Projects/P001_NTU_TEC_Website/`）精選出來、經過審核、可對外的**活 SOT**——其他過程文件（Phase 1-5 規劃檔、歷次 content audit、decision log）都是歷史紀錄，**不要讀**，會誤導。

---

## 5 份文件

| 檔案 | 主題 | 何時用 |
|------|------|-------|
| [`brand-highlights.md`](brand-highlights.md) | **對外數字 SOT** + 6 校友案例 + HI3 模型 | 任何頁面需要「累計數字」、「代表案例」、「計畫解釋」時 |
| [`alumni.md`](alumni.md) | 15 位代表校友（Vincent 挑選，含 2024-2026 近年亮點） | 校友頁、首頁 logo wall、case study 區塊 |
| [`design-reference.md`](design-reference.md) | **視覺參考**：Sustaihub 7 個設計 pattern + NTUTEC 可借鏡處 | 設計 inspiration、高 ROI 改動排序 |
| [`seo.md`](seo.md) | GEO/SEO 技術規格 + 不可動的 JSON-LD | 改版涉及 SEO / metadata 時 |

---

## 使用守則

1. **數字規則**（硬性）：對外頁面出現的數字必須能在 `brand-highlights.md` 或 `alumni.md` 找到出處，否則不用
2. **校友提及**：要講校友成就時照 `alumni.md` 敘事策略的「✅ 可以說」清單，避免「❌ 避免」的表達
3. **視覺借鏡**：`design-reference.md` 有「不建議照搬」清單——不要把它當 to-do list，是 inspiration 來源
4. **SEO 邊界**：`seo.md` 的禁區清單 = `CLAUDE.md` 禁區清單的 subset，改 metadata 前必讀

---

## 如何獲取更多素材

- **高解析圖片**（531 張）→ 跟 Howard 要 Google Drive 連結
- **業師 bio / 照片** → Supabase storage（`mentor-avatars` bucket）
- **企業 logo**（49 家）→ Supabase storage（`corporate-logos` bucket）
- **現場照片**（2026 開幕式 + 2025 Demo Day）→ `public/photos/`
- **校長簡報原始 PDF** → `NTUTEC_Center_Introduction_20260317.pdf`（跟 Howard 要）

---

## 版本控制

本資料夾內容有變動 → 開 PR，不要直接改（避免與源頭 PARA repo 的活文件脫鉤）。

---

*最後更新：2026-04-18 | Howard Chiang*
