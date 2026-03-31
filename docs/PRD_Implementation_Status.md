# PRD v0.1 vs T1 Implementation Status

> **Date**: 2026-03-31
> **PRD Source**: `NTUTEC_Platform_PRD_v0.1.md` (2026-03-30)
> **Platform Scan**: `ntutec-platform/app/` (pages + API routes)

---

## Legend

| Symbol | Meaning |
|--------|---------|
| ✅ | Done -- page/API exists and functional |
| 🟡 | Partial -- exists but incomplete or placeholder |
| ❌ | Todo -- not yet implemented |

---

## 1. System Status (PRD Section 1)

### ntutec-platform Pages

| PRD Item | Path | PRD Status | Verified Status | Notes |
|----------|------|------------|-----------------|-------|
| Login | `/login` | ✅ | ✅ | `app/(auth)/login/page.tsx` exists |
| Admin Dashboard | `/admin/dashboard` | ✅ | ✅ | Page + `/api/admin/dashboard-stats` |
| Admin Pipeline | `/admin/pipeline` | ✅ | ✅ | Page + `/api/admin/pipeline` |
| Admin Pipeline Detail | `/admin/pipeline/[id]` | ✅ | ✅ | Page + `/api/admin/pipeline/[id]` + BP download |
| Admin Meetings | `/admin/meetings` | ✅ | ✅ | Page + 5 API routes (candidates, notify, pitches, responses, vote-results) |
| Admin Investors | `/admin/investors` | ✅ | ✅ | Page exists |
| Admin Settings | `/admin/settings` | ✅ | ✅ | Page + `/api/admin/settings` (GET/PATCH) |
| Admin Gate0 Review | -- | Not in PRD | ✅ | `app/(platform)/admin/gate0-review/page.tsx` + 3 API routes (bonus) |
| Angel Cards | `/angel/portal/cards` | ✅ | ✅ | Page + `/api/cards` |
| Angel Vote | `/angel/portal/vote` | ✅ | ✅ | Page + `/api/votes` |
| Angel Profile | `/angel/portal/profile` | ✅ | ✅ | Page + `/api/members` |
| Angel Upcoming | `/angel/portal/upcoming` | ✅ | ✅ | Page + `/api/meetings` |
| Angel Pipeline | `/angel/portal/pipeline` | ✅ | ✅ | Page exists (basic) |
| Angel Learn | `/angel/portal/learn` | ✅ | ✅ | Page + `/api/learning` |
| Angel Digest | `/angel/portal/digest` | 🔲 placeholder | 🟡 | Page exists (14 lines), no Ghost integration |
| Angel Portfolio | `/angel/portal/portfolio` | 🔲 placeholder | 🟡 | Page exists (14 lines), no data |
| Angel Onboarding | -- | Not in PRD | ✅ | `app/(platform)/angel/onboarding/page.tsx` (bonus) |
| Angel Meeting Responses | -- | Not in PRD | ✅ | `app/(platform)/admin/meetings/responses/page.tsx` (bonus) |
| Angel Vote Results | -- | Not in PRD | ✅ | `app/(platform)/admin/meetings/vote-results/page.tsx` (bonus) |
| Public Pages (8) | `/`, `/about`, `/angel`, `/contact`, `/events`, `/mentors`, `/programs`, `/startups` | ✅ | ✅ | All 8 public pages exist |

### API Routes (PRD said 12, actual 22)

PRD documented 12 API routes. The platform now has **22 route files** with **30+ HTTP methods**, exceeding the PRD baseline significantly.

---

## 2. Phase 1 Remaining (PRD Section 2)

| ID | Feature | Priority | Status | Evidence |
|----|---------|----------|--------|----------|
| F1-1 | Supabase Storage Bucket | P0 | 🟡 Partial | Migration `003_storage_and_onboarding.sql` creates RLS policies + adds `bp_storage_path` column; API route `/api/admin/pipeline/[id]/bp` exists for signed URLs; bucket itself needs Dashboard creation |
| F1-2 | Rate Limiting | P0 | ✅ Done | `/api/contact` has `checkRateLimit()` with 5 req/min per IP; `lib/middleware/rate-limit.ts` imported |
| F1-3 | Ghost + Lightsail Deploy | P1 | ❌ Todo | No Ghost Content API integration code found; `ghostApiUrl`/`ghostContentKey` in settings but unused |

---

## 3. Phase 2 (PRD Section 3)

| ID | Feature | Priority | Status | Evidence |
|----|---------|----------|--------|----------|
| F2-1 | ~~P014 Mentor Migration~~ | -- | ~~Cancelled~~ | PRD confirms independent deploy decision |
| F2-1b | Cross-App Auth Consistency | P1 | ❌ Todo | No verification code found |
| F2-2 | Table Name RENAME | P1 | ❌ Todo | Still using View bridge pattern (`pip_startups` View over `startups`) |
| F2-3 | Ghost Blog Integration | P1 | ❌ Todo | No `/blog` route, no Ghost API calls |
| F2-4 | Notion Partial Retirement | P2 | ❌ Todo | No Notion deprecation logic |

---

## 4. Phase 3 -- Angel Service Layer (PRD Section 4)

| ID | Feature | Priority | Status | Evidence |
|----|---------|----------|--------|----------|
| F3-1 | Angel Cards Complete | P1 | 🟡 Partial | Basic card browsing + response exists; missing: preference analysis, `angel_match.py` integration, admin kanban view |
| F3-2 | Angel Vote Complete | P1 | 🟡 Partial | Voting UI + API exists; missing: vote_open state gating, deadline countdown, nudge notifications |
| F3-3 | Angel Digest Content | P1 | ❌ Todo | Placeholder page only; depends on Ghost (F1-3) |
| F3-4 | Angel Portfolio | P2 | ❌ Todo | Placeholder page only; needs `angel_investments` table |
| F3-5 | Observation Pool UI | P1 | 🟡 Partial | `observation_pool` fields exist in DB; pipeline page can filter; missing: dedicated UI tab, 6-month countdown, one-click reactivate |
| F3-6 | Startup Progress Tracker | P2 | ❌ Todo | No `/startups/my` route; needs `startup_members` table |
| F3-7 | i18n English Interface | P2 | ❌ Todo | No `next-intl` or i18n router found |
| F3-8 | Consent + DNS Cutover | P2 | ❌ Todo | No privacy policy page or cookie consent |

---

## 5. ntutec-core Integration (PRD Section 5)

| ID | Feature | Priority | Status | Evidence |
|----|---------|----------|--------|----------|
| F5-1 | email_sender Live Mode | P0 | ❌ Todo | Platform has `lib/notifications/email.ts` for contact form; ntutec-core's `email_sender.py` still DRY_RUN |
| F5-2 | scheduler.py Deploy as Cron | P0 | ❌ Todo | No GitHub Actions workflow or Vercel Cron found in platform |
| F5-3 | Deal Radar -> Gate 0 Bridge | P1 | ❌ Todo | Platform has Gate 0 auto-score API; bridge from Radar not wired |
| F5-4 | Post-Meeting -> Platform | P1 | ❌ Todo | No "follow-up tracking" tab in meetings UI |

---

## 6. Gate SOP Automation (PRD Section 6)

| ID | Feature | Priority | Status | Evidence |
|----|---------|----------|--------|----------|
| F6-1 | G0 Grey Zone Stacking (C5) | P1 | ❌ Todo | Gate 0 engine exists but no multi-flag stacking logic visible |
| F6-2 | G1 Dual Track Coordination | P1 | ❌ Todo | No dual-score display in Gate 1 tab |
| F6-3 | G1 Auto-Close (D+45) | P2 | ❌ Todo | No scheduler logic |
| F6-4 | Enrichment Data Writeback | P1 | ❌ Todo | Pipeline detail has enrichment tab but no verified writeback path |

---

## 7. Summary Scorecard

| Phase | Total Items | ✅ Done | 🟡 Partial | ❌ Todo | Cancelled |
|-------|-------------|---------|-----------|--------|-----------|
| **Section 1 (Existing)** | 16 pages + 12 APIs | 14 + 22 | 2 | 0 | 0 |
| **Phase 1 Remaining** | 3 | 1 | 1 | 1 | 0 |
| **Phase 2** | 5 | 0 | 0 | 4 | 1 |
| **Phase 3** | 8 | 0 | 3 | 5 | 0 |
| **ntutec-core Integration** | 4 | 0 | 0 | 4 | 0 |
| **Gate SOP Automation** | 4 | 0 | 0 | 4 | 0 |
| **TOTAL** | **40** | **15** | **6** | **18** | **1** |

### Completion Rate
- **Done**: 37.5% (15/40)
- **Partial**: 15.0% (6/40)
- **Todo**: 45.0% (18/40)
- **Effective progress** (Done + 0.5 x Partial): **45.0%**

### Key Observations

1. **T1 exceeded PRD baseline**: The platform has 22 API routes (PRD expected 12) and bonus pages (Gate 0 review, onboarding, vote results, meeting responses) not in the PRD.

2. **P0 items status**: Rate Limiting is done; Storage Bucket is almost done (migration ready, needs Dashboard bucket creation); email_sender and scheduler remain undeployed.

3. **All Phase 2-3 items are untouched** (expected, as PRD targets 5/31 and Q3 respectively).

4. **Ghost CMS is the major blocker** for 3 features (F1-3, F2-3, F3-3).

---

## Appendix: New Supabase Tables Needed (from PRD)

| Table | PRD Feature | Phase | Exists? |
|-------|-------------|-------|---------|
| `angel_investments` | F3-4 (Portfolio) | Phase 3 | ❌ |
| `startup_members` | F3-6 (Startup Progress) | Phase 3 | ❌ |
| `enrichment_sources` | F6-4 (or JSON field) | Phase 2 | ❌ |
