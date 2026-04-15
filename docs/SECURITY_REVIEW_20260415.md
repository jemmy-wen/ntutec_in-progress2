# NTU TEC Platform — 資安檢查說明書

**版本**：v0.1
**日期**：2026-04-15
**提交對象**：臺大計算機及資訊網路中心
**網站**：https://tec.ntu.edu.tw（代管於 Vercel）
**程式碼儲存庫**：https://github.com/howardchiang-svg/ntutec-platform（私有）

---

## 一、系統架構概要

| 項目 | 內容 |
|------|------|
| 前後端框架 | Next.js 15（App Router, React Server Components） |
| 部署平台 | Vercel（全球 Edge CDN + Serverless Functions） |
| 資料庫 | Supabase（PostgreSQL，啟用 Row-Level Security） |
| 身分驗證 | Supabase Auth（Email OTP + OAuth） |
| TLS | Let's Encrypt（Vercel 自動簽發、自動續期，TLS 1.2+） |
| DNS | 由計中管理，CNAME → `cname.vercel-dns.com` |

---

## 二、HTTP 安全標頭（已實作）

所有頁面與 API 回應皆附下列標頭，可使用 `curl -I https://tec.ntu.edu.tw/` 驗證：

| 標頭 | 設定值 | 防護目的 |
|------|--------|---------|
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | 強制 HTTPS，防止降級攻擊 |
| `Content-Security-Policy` | 見下方 §2.1 | 防 XSS、資料外洩 |
| `X-Frame-Options` | `DENY` | 防 Clickjacking |
| `X-Content-Type-Options` | `nosniff` | 防 MIME sniffing |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | 限制 Referer 外洩 |
| `Permissions-Policy` | 28 項功能全關閉（見 §2.2） | 禁用瀏覽器敏感 API |
| `Cross-Origin-Opener-Policy` | `same-origin` | 防跨源視窗干擾 |
| `Cross-Origin-Resource-Policy` | `same-origin` | 防跨源資源竊取 |
| `X-Powered-By` | **移除** | 減少指紋暴露 |

### 2.1 Content-Security-Policy 詳細內容

```
default-src 'self';
script-src 'self' 'unsafe-inline' https://luma.com https://www.googletagmanager.com https://www.google-analytics.com;
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
img-src 'self' data: https: https://ntutec.ghost.io https://*.ghost.io https://www.google-analytics.com;
font-src 'self' https://fonts.gstatic.com;
connect-src 'self' https://*.supabase.co wss://*.supabase.co https://ntutec.ghost.io https://www.google-analytics.com;
frame-src https://luma.com https://www.google.com https://maps.googleapis.com;
frame-ancestors 'none';
object-src 'none';
base-uri 'self';
form-action 'self';
manifest-src 'self';
worker-src 'self' blob:;
upgrade-insecure-requests;
```

**已知弱點說明**：`script-src 'unsafe-inline'` 係 Next.js App Router 水合（hydration）所需，已排入後續 sprint 改為 nonce 機制。目前藉 `frame-ancestors 'none'` + `object-src 'none'` + `base-uri 'self'` + `form-action 'self'` 補強 XSS 防線。

### 2.2 Permissions-Policy 禁用清單

camera、microphone、geolocation、payment、usb、serial、hid、midi、magnetometer、gyroscope、accelerometer、ambient-light-sensor、battery、display-capture、document-domain、encrypted-media、gamepad、idle-detection、picture-in-picture、publickey-credentials-get、screen-wake-lock、sync-xhr、xr-spatial-tracking、autoplay、interest-cohort、web-share（僅限 self）、fullscreen（僅限 self）

---

## 三、身分驗證與授權

- **驗證**：Supabase Auth，支援 Email Magic Link / OAuth；Session JWT 存於 HttpOnly + Secure + SameSite Cookie。
- **授權（RBAC）**：9 種角色（admin / staff_admin / staff_accelerator / angel_member / mentor / team / startup_* / vc_partner / visitor），儲存於 `module_roles` 資料表。
- **縱深防禦（Defence-in-Depth）**：
  1. **Edge middleware**（`middleware.ts`）在 `/api/admin/*` 入口檢查 admin/staff_admin 角色（commit `85a2832`）
  2. **統一 API 管線**（`lib/api/handler.ts`）每個端點執行：Rate Limit → Auth → Role → Body Parse → Phase 檢查 → Handler → Audit Log
  3. **資料庫 Row-Level Security**（Supabase RLS）：每張敏感表啟用 policy，由 DB 層再次把關

---

## 四、資料保護

| 項目 | 實作 |
|------|------|
| 傳輸加密 | TLS 1.2+ 強制（HSTS preload） |
| 靜態加密 | Supabase Postgres AES-256（平台預設） |
| 密鑰管理 | Vercel Environment Variables（加密儲存，僅運行時可讀） |
| 個資欄位 | 密碼不儲存（OTP / OAuth）；PII 存於 RLS-protected tables |
| API 敏感回應 | 統一附 `Cache-Control: no-store, no-cache, must-revalidate, private` 防中繼快取 |
| 稽核日誌 | `lib/audit/logger.ts` — 所有寫入動作寫入 `audit_logs`（含 user_id、action、entity、IP、UA、timestamp） |

---

## 五、輸入驗證與防注入

- **SQL Injection**：全站使用 Supabase Client（參數化查詢，不拼接 SQL）
- **XSS**：React 預設 escape；CSP `object-src 'none'` + `base-uri 'self'`
- **CSRF**：API 檢查 SameSite Cookie + Origin header；state-changing endpoints 皆要求 Auth token
- **檔案上傳**：圖片限定 `remotePatterns` 白名單（6 個來源），SVG 禁用（`dangerouslyAllowSVG: false`），`Content-Disposition: attachment` 防瀏覽器直接執行
- **Rate Limiting**：分 6 級（auth / api / ai / voting / export / invitation），於 `lib/middleware/rate-limit.ts` 實作

---

## 六、DevOps 安全

- **程式碼儲存庫**：GitHub 私有 repo，僅 Howard 具寫入權；所有 commit 經 CI build + test 才可合併
- **測試覆蓋**：Vitest 118 tests（2026-04-05 版本）
- **CI/CD**：GitHub Actions → Vercel 自動部署，失敗即阻擋
- **環境變數**：生產 / 預覽 / 開發環境隔離，`.env.local` 列於 `.gitignore`
- **相依套件**：Next.js 15 / React 19 / Supabase SDK 皆使用最新穩定版，定期 `npm audit`

---

## 七、事故應對

**2026-04-14 WP Hijack 事故**：舊站（WordPress on AWS Lightsail）遭 SEO cloak 攻擊（Mothercare 關鍵字注入）。
- **應變**：3/18 快照還原 + 靜態 IP 熱遷移；24 小時內復原
- **長期對策**：全面改用 Next.js + Vercel（無 PHP 執行層、無 WP plugin 風險面）
- **Post-mortem**：`INCIDENT_20260414_WP_Hijack_Postmortem.md`

---

## 八、後續強化項目

| 項目 | 優先級 | 預計時程 |
|------|-------|---------|
| CSP 移除 `unsafe-inline`（改 nonce） | 中 | 2026 Q2 |
| 引入 Dependabot 自動更新 | 中 | 2026 Q2 |
| 新增 `security.txt`（RFC 9116） | 低 | 2026 Q2 |
| Penetration test（外部廠商） | 中 | 上線 3 個月後 |

---

## 九、驗證指令

計中承辦人可於切換生效後執行以下指令確認：

```bash
# 1. HTTPS 強制
curl -sI http://tec.ntu.edu.tw/ | grep -i location  # 應 301/308 → https

# 2. 安全標頭完整性
curl -sI https://tec.ntu.edu.tw/ | grep -iE "strict|content-security|x-frame|referrer|permissions|cross-origin"

# 3. TLS 憑證與版本
echo | openssl s_client -connect tec.ntu.edu.tw:443 -servername tec.ntu.edu.tw 2>/dev/null | openssl x509 -noout -dates -issuer

# 4. 第三方評分（建議同時檢查）
# https://securityheaders.com/?q=tec.ntu.edu.tw       預期 A 或 A+
# https://www.ssllabs.com/ssltest/analyze.html?d=tec.ntu.edu.tw  預期 A 或 A+
# https://observatory.mozilla.org/analyze/tec.ntu.edu.tw        預期 A 以上
```

---

**聯絡人**：姜學翰｜臺大創新創業中心
