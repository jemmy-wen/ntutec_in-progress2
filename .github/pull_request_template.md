## Summary

<!-- 一句話描述這個 PR 做了什麼 -->

## 改動類型

- [ ] 視覺設計（Tailwind classes / layout）
- [ ] 設計 tokens 調整（`app/globals.css` `@theme inline`）
- [ ] 新增頁面 / 元件
- [ ] 內容更新
- [ ] Bug fix
- [ ] 其他（請說明）

## 影響範圍

<!-- 列影響的路由 / 元件 / 檔案 -->

- 路由：
- 元件：
- 檔案：

## 視覺 Before / After

<!-- 貼截圖或 Vercel preview 連結 -->

- Vercel preview: <!-- 自動生成後貼這裡 -->
- 截圖：

## Lighthouse 成績（mobile，若視覺改動）

| 頁面 | Before | After |
|------|--------|-------|
| `/` | | |
| `/apply` | | |
| `/mentors` | | |

## 🔴 Technical Forbidden Zone Checklist（7 條，每 PR 必過）

- [ ] Lighthouse mobile ≥ 70（home / apply / mentors 三頁）
- [ ] FAQPage JSON-LD 保留在首頁
- [ ] `metadataBase: https://tec.ntu.edu.tw` 未動
- [ ] 35 條 `next.config.ts` redirects 未動
- [ ] `middleware.ts` 公開路由清單未動（若新增頁面請在本 PR body 標註）
- [ ] Noto Sans TC / Geist `next/font` preload 未動
- [ ] 電話號碼未出現在新頁面（硬規則：官網 / JSON-LD / schema 一律不放）

## 📝 Content Accuracy（若 PR 涉及真實內容；純 placeholder 不用勾）

- [ ] 品牌名正確：「台大車庫 / 台大加速器 / 企業垂直加速器」（不用「車庫孵化器」「加速器」裸稱）
- [ ] 對外數字查 [`docs/reference/brand-highlights.md`](../docs/reference/brand-highlights.md)（600+ / 35 / 27 等）
- [ ] 校友敘事查 [`docs/reference/alumni.md`](../docs/reference/alumni.md)（避免「我們輔導的公司上市」等措辭）

## 其他 reviewer 需要知道的

<!-- 例如：新增 CSP 白名單、新 DB 查詢、新 JSON-LD、預計合作哪個 migration -->
