# Code Quality Report — ntutec-platform

**Date**: 2026-03-31
**Repo**: `/Users/mhchiang/ntutec-platform`
**Branch**: `main` (last commit: 2026-03-30)

---

## Task 14: TypeScript Type Check

**Command**: `npx tsc --noEmit`
**Result**: PASS -- 0 errors

**tsconfig.json Settings**:
- `strict: true` -- correctly enabled
- `skipLibCheck: true` -- standard for Next.js
- `moduleResolution: "bundler"` -- correct for Next.js 15
- `__tests__/` excluded from compilation

No issues found.

---

## Task 17: .env.example

All environment variables referenced via `process.env.*` across the codebase:

| Variable | Used In | Required |
|----------|---------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | `lib/supabase/`, `middleware.ts`, auth, admin settings | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `lib/supabase/`, `middleware.ts`, auth | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | `lib/supabase/admin.ts` | Yes |
| `NEXT_PUBLIC_APP_NAME` | (in `.env.local`, public) | Optional |
| `NEXT_PUBLIC_APP_URL` | (in `.env.local`, public) | Optional |
| `SMTP_HOST` | `lib/notifications/email.ts` | For email |
| `SMTP_PORT` | `lib/notifications/email.ts` (default: 587) | For email |
| `SMTP_USER` | `lib/notifications/email.ts` | For email |
| `SMTP_PASS` | `lib/notifications/email.ts` | For email |
| `SMTP_FROM` | `lib/notifications/email.ts` (default: noreply@tec.ntu.edu.tw) | For email |
| `CONTACT_EMAIL` | `app/api/contact/route.ts` (default: tec@ntu.edu.tw) | Optional |
| `LINE_CHANNEL_ACCESS_TOKEN` | `lib/notifications/service.ts` | For LINE |
| `NODE_ENV` | `app/(auth)/login/page.tsx` (Next.js built-in) | Auto |

**`.env.example` has been created** -- see `/Users/mhchiang/ntutec-platform/.env.example`

---

## Task 39: Unused Dependency Scan

### dependencies (7 packages)

| Package | Status | Evidence |
|---------|--------|----------|
| `@supabase/ssr` | **Used** | `lib/supabase/server.ts`, `middleware.ts` |
| `@supabase/supabase-js` | **Used** | `lib/supabase/client.ts`, `admin.ts` |
| `next` | **Used** | Framework (66+ files) |
| `nodemailer` | **Used** | `lib/notifications/email.ts` |
| `react` | **Used** | All components |
| `react-dom` | **Used** | All components |
| `zod` | **Used** | `lib/api/handler.ts` + validation |

All production dependencies are in use. No removals recommended.

### devDependencies (12 packages)

| Package | Status | Notes |
|---------|--------|-------|
| `@eslint/eslintrc` | **Used** | `eslint.config.mjs` imports `FlatCompat` |
| `@tailwindcss/postcss` | **Used** | `postcss.config.mjs` plugin |
| `@testing-library/jest-dom` | **UNUSED** | No test files exist in project |
| `@testing-library/react` | **UNUSED** | No test files exist in project |
| `@types/node` | **Used** | TypeScript type definitions |
| `@types/nodemailer` | **Used** | Types for nodemailer |
| `@types/react` | **Used** | Types for React |
| `@types/react-dom` | **Used** | Types for React DOM |
| `eslint` | **Used** | Config-level (`eslint.config.mjs`) |
| `eslint-config-next` | **Used** | `extends('next/core-web-vitals')` |
| `tailwindcss` | **Used** | CSS framework (via PostCSS plugin) |
| `typescript` | **Used** | Compiler |
| `vitest` | **UNUSED** | No `vitest.config.*` and no test files; `npm test` script exists but has nothing to run |

### Recommendations

1. **Remove or defer** `vitest`, `@testing-library/react`, `@testing-library/jest-dom` until tests are actually written. They add ~50 MB to `node_modules` with no benefit currently.
2. If tests are planned soon, keep them but add a `vitest.config.ts` and at least one smoke test.

---

## Task 41: Stale Branch Cleanup

**All branches**:

| Branch | Last Commit | Age | Recommendation |
|--------|-------------|-----|---------------|
| `main` | 2026-03-30 | 1 day | Active -- keep |
| `origin/main` | 2026-03-30 | 1 day | Active -- keep |

**Result**: No stale branches found. The repo has only `main` with no feature/topic branches. Clean state.

---

## Summary

| Task | Status | Issues Found |
|------|--------|-------------|
| 14 -- TypeScript | PASS | 0 errors, `strict: true` |
| 17 -- .env.example | DONE | Created `.env.example` (13 vars) |
| 39 -- Unused deps | 3 UNUSED | `vitest`, `@testing-library/react`, `@testing-library/jest-dom` |
| 41 -- Stale branches | CLEAN | 0 stale branches |
