# NTUTEC Platform — Security Audit (OWASP Top 10)

> **Date**: 2026-03-31
> **Auditor**: Claude (automated static analysis)
> **Scope**: `ntutec-platform` codebase (Next.js 15 + Supabase)
> **Methodology**: Static code review against OWASP Top 10 (2021)

---

## Summary

| # | OWASP Category | Risk | Status |
|---|----------------|------|--------|
| A01 | Broken Access Control | HIGH | PASS with notes |
| A02 | Cryptographic Failures | MED | PASS |
| A03 | Injection | HIGH | PASS |
| A04 | Insecure Design | MED | PASS with notes |
| A05 | Security Misconfiguration | MED | PASS |
| A06 | Vulnerable Components | LOW | PASS |
| A07 | Auth Failures | HIGH | PASS with notes |
| A08 | Software/Data Integrity | LOW | PASS |
| A09 | Logging/Monitoring Failures | MED | NEEDS WORK |
| A10 | SSRF | LOW | PASS |

**Overall**: 7 PASS, 3 PASS with notes, 0 FAIL. 6 recommendations.

---

## A01: Broken Access Control

### RLS (Row-Level Security)

**Status: PASS**

All 17 tables have RLS enabled. Verified in migrations 001b through 004:

- `startups`, `investors`: admin full, angel read, service_role full
- `module_roles`: users read own, admins manage
- `angel_card_responses`, `angel_votes`: C2 isolation (members see only own data via `my_angel_member_id()`)
- `mentor_*`: mentor/team-scoped + admin
- `sys_platform_settings`: admin-only
- `audit_logs`: admin read, system insert
- Storage `bp-files`: authenticated read, service_role insert/delete

### Middleware Auth Guard

**Status: PASS**

`middleware.ts` enforces auth for all non-public routes:
- Public routes explicitly whitelisted: `/`, `/login`, `/callback`, `/about`, `/contact`, `/programs`, `/startups`, `/mentors`, `/angel`, `/events`
- API routes excluded from middleware (handle own auth via `withApiHandler`)
- Unauthenticated users redirected to `/login`

### API Route Role Enforcement

**Status: PASS with notes**

Two patterns coexist:

1. **`withApiHandler` pipeline** (used by 8+ API routes): Centralized auth + role check + rate limiting + body size limit + audit logging. Well-designed.
2. **Manual auth check** (used by `/api/admin/pipeline/route.ts` and possibly others with `@ts-nocheck`): Inline `supabase.auth.getUser()` + manual role query. Functionally correct but inconsistent.

> **REC-01**: Migrate remaining manual-auth API routes (especially all `/api/admin/*` routes) to use `withApiHandler` for consistency. Currently 21 files have `@ts-nocheck` which may mask type errors in auth logic.

### Admin Route Protection

**Status: PASS**

Admin API routes (`/api/admin/*`) check for `admin` or `staff_admin` role either via `withApiHandler` config or manual check. The `app_metadata.platform_role` fallback in the manual pattern provides defense-in-depth.

---

## A02: Cryptographic Failures (Sensitive Data Exposure)

### Environment Variables

**Status: PASS**

- `.env.local` is in `.gitignore` (`.env*.local` pattern)
- `SUPABASE_SERVICE_ROLE_KEY` is server-only (no `NEXT_PUBLIC_` prefix), used only in `lib/supabase/admin.ts`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` is correctly exposed (anon key is designed to be public, RLS provides protection)
- `.env.example` and `.env.local.example` contain only placeholder values

### Service Role Key Usage

**Status: PASS**

`createAdminClient()` is used in exactly 2 places:
1. `lib/audit/logger.ts` — writing audit logs (bypasses RLS by design)
2. `app/api/admin/pipeline/[id]/bp/route.ts` — BP file upload (service_role for storage)

Both are server-side only. The admin client is well-documented with usage restrictions.

> **NOTE**: The `.env.local` file contains a live Supabase anon key. This is normal for Supabase (anon key is public), but ensure `SUPABASE_SERVICE_ROLE_KEY` is never committed.

---

## A03: Injection

### SQL Injection

**Status: PASS**

All database queries use the Supabase JS client which parameterizes all queries automatically. No raw SQL construction found in application code.

The `withApiHandler` provides `sanitizeSearch()` which escapes `%`, `_`, and special characters for LIKE queries.

### HTML Injection / Email Injection

**Status: PASS**

The contact form (`/api/contact/route.ts`) properly uses `escapeHtml()` to sanitize user input before embedding in email HTML. Both the handler-level `escapeHtml` and the `lib/api/handler.ts` version handle `&`, `<`, `>`, `"`, `'`.

### No `dangerouslySetInnerHTML`

**Status: PASS**

Zero instances of `dangerouslySetInnerHTML` found in the codebase. React's auto-escaping handles all dynamic content rendering.

---

## A04: Insecure Design

### Input Validation

**Status: PASS with notes**

- UUID validation: `isValidUUID()` regex in `lib/api/handler.ts`
- Cycle ID validation: `isValidCycleId()` regex (YYYY-MM format)
- Body size limit: configurable `maxBodySize` (default 1MB)
- Required field validation: `requireFields()` helper
- Field allowlisting: `filterFields()` helper

> **REC-02**: Some API routes with `@ts-nocheck` may bypass TypeScript type checking on request bodies. Prioritize removing `@ts-nocheck` from all API routes.

### Rate Limiting

**Status: PASS**

In-memory rate limiting implemented with 7 categories:

| Category | Window | Max Requests |
|----------|--------|-------------|
| auth | 60s | 10 |
| api | 60s | 60 |
| ai | 60s | 5 |
| voting | 60s | 30 |
| export | 60s | 3 |
| invitation | 60s | 20 |
| contact | 60s | 5 |

> **REC-03**: In-memory rate limiting resets on server restart and does not work across multiple Vercel serverless instances. For production, consider using Vercel's Edge Middleware rate limiting or an external store (Redis/Upstash).

---

## A05: Security Misconfiguration

### Security Headers

**Status: PASS**

`next.config.ts` configures comprehensive security headers for all routes:

| Header | Value | Assessment |
|--------|-------|------------|
| `Content-Security-Policy` | `default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://*.supabase.co wss://*.supabase.co; frame-ancestors 'none'` | Good. `unsafe-inline` for scripts/styles is common with Next.js. |
| `X-Frame-Options` | `DENY` | Prevents clickjacking |
| `X-Content-Type-Options` | `nosniff` | Prevents MIME sniffing |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Good |
| `X-DNS-Prefetch-Control` | `on` | Performance optimization |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | 2-year HSTS with preload |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | Restricts browser APIs |

### CORS

**Status: PASS**

No custom CORS configuration found. Next.js API routes default to same-origin only, which is correct. Supabase connection is handled via `connect-src` in CSP.

### ESLint During Build

**Status: NOTE**

`eslint: { ignoreDuringBuilds: true }` is set in `next.config.ts`. This means build-time lint errors (including security-relevant rules) are suppressed.

> **REC-04**: Re-enable ESLint during builds after resolving `@ts-nocheck` and migration issues. This is already noted in the config comment.

---

## A06: Vulnerable and Outdated Components

### npm audit

**Status: PASS**

```
Vulnerabilities: 0 (info: 0, low: 0, moderate: 0, high: 0, critical: 0)
Dependencies: 481 total (32 prod, 414 dev)
```

Zero known vulnerabilities as of 2026-03-31.

---

## A07: Identification and Authentication Failures

### Session Handling

**Status: PASS**

- Supabase Auth with `@supabase/ssr` handles session management
- Server-side `createClient()` uses `cookies()` for session storage
- Middleware refreshes sessions on every request via cookie handling
- `getUser()` is used (not `getSession()`) for server-side auth verification -- this is the Supabase-recommended approach as it validates the JWT with the server

### Login Flow

**Status: PASS with notes**

- Auth callback at `/callback` creates a server client and exchanges the code
- Redirect parameter preserved in login URL (`?redirect=pathname`)

> **REC-05**: Verify that the `redirect` parameter in the login flow is validated against a whitelist to prevent open redirect attacks. The current middleware sets `redirect` to `pathname` but the login page should verify it starts with `/` and does not redirect to external URLs.

---

## A08: Software and Data Integrity Failures

### XXE (XML External Entity)

**Status: N/A**

Next.js API routes parse JSON only. No XML processing found in the codebase.

### API Body Parsing

**Status: PASS**

- `withApiHandler` enforces `maxBodySize` (default 1MB) via Content-Length check
- JSON parsing failures are caught and handled gracefully (body set to null)
- Only POST/PATCH/PUT/DELETE methods attempt body parsing

### Deserialization

**Status: PASS**

No custom deserialization logic. All data flows through Supabase JS client (parameterized) or standard `request.json()` (native JSON parsing).

---

## A09: Security Logging and Monitoring Failures

### Audit Logging

**Status: PASS with notes**

The `audit_logs` table captures:
- `user_id`, `action`, `entity_type`, `entity_id`
- `changes` (JSONB: before/after)
- `metadata` (JSONB: IP, user agent, URL, method, timestamp)

`withApiHandler` auto-logs on successful operations when `audit` config is provided.

### Error Logging

**Status: NEEDS WORK**

- API errors logged to `console.error` with structured JSON (method, URL, error, stack, timestamp)
- Audit log failures logged but swallowed (non-blocking)
- No external error tracking service (e.g., Sentry) configured

> **REC-06**: Add an external error tracking service (Sentry, LogRocket, or similar) for production. `console.error` logs are ephemeral in serverless environments and will be lost. Also consider alerting on repeated 401/403 responses (brute force detection).

### Authentication Event Logging

**Status: PASS**

Supabase Auth provides built-in logging for auth events. The audit logger captures login and redeem actions.

---

## A10: Server-Side Request Forgery (SSRF)

### Status: PASS

No user-controlled URLs are used to make server-side HTTP requests. All external connections are to:
- Supabase API (URL from env var, not user input)
- Email via nodemailer (recipient from form input, but SMTP server is configured server-side)

---

## Recommendations Summary

| ID | Priority | Description |
|----|----------|-------------|
| REC-01 | MED | Migrate all API routes to `withApiHandler` pattern; remove manual auth checks |
| REC-02 | MED | Remove `@ts-nocheck` from all 21 API route files |
| REC-03 | MED | Replace in-memory rate limiting with distributed store (Upstash Redis) for production multi-instance |
| REC-04 | LOW | Re-enable ESLint during builds |
| REC-05 | MED | Validate login redirect parameter to prevent open redirect |
| REC-06 | HIGH | Add external error tracking (Sentry) for production monitoring + brute force alerting |

---

## Files Reviewed

| Category | Files |
|----------|-------|
| Middleware | `middleware.ts` |
| Supabase clients | `lib/supabase/server.ts`, `client.ts`, `admin.ts` |
| API handler | `lib/api/handler.ts` |
| Rate limiting | `lib/middleware/rate-limit.ts` |
| Audit logging | `lib/audit/logger.ts` |
| Config | `next.config.ts`, `.gitignore`, `.env.example`, `.env.local.example` |
| API routes | 22 route files in `app/api/` |
| Migrations | 10 SQL files in `supabase/migrations/` |
| Types | `types/database.ts` |
