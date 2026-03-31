# NTUTEC Platform API Routes Reference

> **Generated**: 2026-03-31
> **Source**: `app/api/` directory scan
> **Total Routes**: 22 files, 30+ HTTP methods

---

## Summary

| Category | Route Files | Auth Level |
|----------|-------------|------------|
| Admin Pipeline | 3 | admin |
| Admin Gate 0 | 3 | admin |
| Admin Meetings | 5 | admin |
| Admin Settings | 1 | admin |
| Auth | 1 | authenticated |
| Angel (Cards/Votes/Learning) | 3 | angel_member |
| Meetings | 1 | angel_member + admin |
| Members | 1 | angel_member + admin |
| Engagement | 1 | admin |
| Notifications | 1 | authenticated |
| Contact | 1 | public |

---

## Admin Routes

### `GET /api/admin/dashboard-stats`
- **File**: `app/api/admin/dashboard-stats/route.ts`
- **Auth**: admin, staff_admin
- **Purpose**: Aggregated dashboard data -- pipeline counts by stage, pending actions, recent meetings, member engagement levels
- **Tables**: `pip_startups`, `pip_meetings`, `angel_members`, `v_angel_engagement`

### `POST /api/admin/gate0/auto-score`
- **File**: `app/api/admin/gate0/auto-score/route.ts`
- **Auth**: admin
- **Purpose**: Gate 0 auto-screening engine. Evaluates startups through G0-1~G0-10 checklist
- **Body**: `{ mode: 'single' | 'batch' | 'pending', startup_id?: string, dry_run?: boolean }`
- **Decisions**: D1=B (TypeScript engine), D4=A (Track E excluded), D5=B (idempotent)

### `GET /api/admin/gate0/candidates`
- **File**: `app/api/admin/gate0/candidates/route.ts`
- **Auth**: admin, staff_admin
- **Purpose**: Fetch Gate 0 candidates for the review panel (F-002)
- **Query**: `filter` (pending|borderline|all), `limit`, `offset`
- **Tables**: `startups` (not View), excludes Track E

### `POST /api/admin/gate0/review`
- **File**: `app/api/admin/gate0/review/route.ts`
- **Auth**: admin, staff_admin
- **Purpose**: Manual Gate 0 review -- admin passes/fails/watches a single startup
- **Body**: `{ startup_id: string, decision: 'pass' | 'fail' | 'watch', notes?: string }`

### `GET /api/admin/meetings/candidates`
- **File**: `app/api/admin/meetings/candidates/route.ts`
- **Auth**: admin, staff_admin
- **Purpose**: Fetch meeting candidates -- startups eligible for monthly pitch (Gate 1+ passed, active, not ecosystem)
- **Query**: `meeting_id`
- **Tables**: `startups`

### `POST /api/admin/meetings/notify`
- **File**: `app/api/admin/meetings/notify/route.ts`
- **Auth**: admin, staff_admin
- **Purpose**: Admin-triggered meeting lifecycle notifications (F-008). Sends bulk notifications
- **Body**: `{ meeting_id: string, event: MeetingLifecycleEvent, custom_body?: string }`
- **Valid events**: `cards_ready`, `vote_open`, `meeting_reminder`, `meeting_complete`, `followup_started`

### `GET/POST/DELETE/PATCH /api/admin/meetings/pitches`
- **File**: `app/api/admin/meetings/pitches/route.ts`
- **Auth**: admin, staff_admin
- **Purpose**: Manage pitch assignments for monthly meetings (F-003)
  - `GET` -- List pitches for a meeting cycle
  - `POST` -- Add startup(s) to a meeting as pitch
  - `DELETE` -- Remove a pitch from a meeting
  - `PATCH` -- Update pitch order or notes
- **Tables**: `pip_meeting_pitches`

### `GET /api/admin/meetings/responses`
- **File**: `app/api/admin/meetings/responses/route.ts`
- **Auth**: admin, staff_admin
- **Purpose**: Card response analytics (F-004). Per-startup response summary + per-member completion status
- **Query**: `meeting_id` (required, YYYY-MM)
- **Tables**: `angel_card_responses`, `pip_meeting_pitches`

### `GET /api/admin/meetings/vote-results`
- **File**: `app/api/admin/meetings/vote-results/route.ts`
- **Auth**: admin, staff_admin
- **Purpose**: Vote result analytics (F-014). Per-startup vote breakdown, capital commitment estimates, per-member voting patterns
- **Query**: `meeting_id` (required, YYYY-MM)
- **Tables**: `angel_votes`, `pip_meeting_pitches`

### `GET /api/admin/pipeline/[id]/bp`
- **File**: `app/api/admin/pipeline/[id]/bp/route.ts`
- **Auth**: admin, staff_admin
- **Purpose**: Generate signed URL for BP file download (1-hour expiry)
- **Tables**: `pip_startups` (bp_storage_path)
- **Storage**: `bp-files` bucket

### `GET /api/admin/pipeline/[id]`
- **File**: `app/api/admin/pipeline/[id]/route.ts`
- **Auth**: admin, staff_admin
- **Purpose**: Full startup detail with gate evaluations + enrichment + pitches
- **Returns**: startup record, gates array, enrichment JSON, meeting pitch records
- **Tables**: `pip_startups`, `pip_gate_evaluations`/`gates`, `pip_meeting_pitches`

### `GET /api/admin/pipeline`
- **File**: `app/api/admin/pipeline/route.ts`
- **Auth**: admin, staff_admin
- **Purpose**: Fetch startup pipeline for admin view. Returns startups with pipeline stage info
- **Tables**: `pip_startups`

### `GET/PATCH /api/admin/settings`
- **File**: `app/api/admin/settings/route.ts`
- **Auth**: admin, staff_admin
- **Purpose**: Platform settings management (key-value store)
  - `GET` -- Fetch all settings (merged with defaults)
  - `PATCH` -- Update settings
- **Tables**: `sys_platform_settings`
- **Default keys**: emailNotifications, notifyOnCardReady, notifyOnVoteOpen, notifyOnMeetingDay, notifyOnNewMember, defaultCardBrowseDays, defaultVoteDays, defaultFollowupDays, ghostApiUrl, ghostContentKey

---

## Auth Routes

### `GET /api/auth/me`
- **File**: `app/api/auth/me/route.ts`
- **Auth**: authenticated
- **Purpose**: Get current user profile + roles + angel member profile (if applicable)
- **Tables**: `module_roles`, `angel_members`

---

## Angel Member Routes

### `GET/POST /api/cards`
- **File**: `app/api/cards/route.ts`
- **Auth**: angel_member, admin, staff_admin
- **Purpose**: Card browsing system for angel members
  - `GET` -- List candidate startups with card data for a meeting cycle (includes own response status)
  - `POST` -- Submit/update card response (interested / thinking / not_for_me)
- **Query**: `cycle_id` (YYYY-MM)
- **Tables**: `pip_meeting_pitches`, `pip_startups`, `angel_card_responses`

### `GET/POST /api/votes`
- **File**: `app/api/votes/route.ts`
- **Auth**: angel_member, admin, staff_admin
- **Purpose**: Voting system
  - `GET` -- Angel: own votes; Admin: vote summary (from `v_vote_summary`)
  - `POST` -- Submit/update vote (invest / pass / defer)
- **Query**: `cycle_id` (YYYY-MM)
- **Tables**: `angel_votes`, `v_vote_summary`, `angel_members`

### `GET/POST /api/learning`
- **File**: `app/api/learning/route.ts`
- **Auth**: angel_member, admin, staff_admin
- **Purpose**: Learning progress tracking
  - `GET` -- Angel: own progress; Admin: aggregate stats from `v_angel_engagement`
  - `POST` -- Record learning progress (content read)
- **Tables**: `angel_learning_progress`, `v_angel_engagement`

---

## Shared Routes

### `GET/POST /api/meetings`
- **File**: `app/api/meetings/route.ts`
- **Auth**: angel_member, admin, staff_admin
- **Purpose**: Meeting cycle management
  - `GET` -- List meeting cycles (admin: all, member: recent 5)
  - `POST` -- Admin: create new meeting cycle (triggers bulk notification)
- **Body** (POST): `{ cycle_id: string (YYYY-MM), meeting_date: string }`
- **Tables**: `pip_meetings`

### `GET/PATCH /api/members`
- **File**: `app/api/members/route.ts`
- **Auth**: angel_member, admin, staff_admin
- **Purpose**: Member management
  - `GET` -- Admin: list all angel members; Member: own profile
  - `PATCH` -- Member: update own profile/preferences
- **Updatable fields**: display_name, phone, company, title, investment_preferences, onboarding_completed
- **Tables**: `angel_members`

### `GET /api/engagement`
- **File**: `app/api/engagement/route.ts`
- **Auth**: admin, staff_admin
- **Purpose**: Member engagement metrics
- **Query**: `level` (active|moderate|low)
- **Tables**: `v_angel_engagement`

### `GET/PATCH /api/notifications/inbox`
- **File**: `app/api/notifications/inbox/route.ts`
- **Auth**: authenticated (any user)
- **Purpose**: Notification inbox
  - `GET` -- Fetch user's notifications (most recent first)
  - `PATCH` -- Mark notifications as read (by IDs or all)
- **Query**: `limit` (default 20)
- **Tables**: `in_app_notifications`

---

## Public Routes

### `POST /api/contact`
- **File**: `app/api/contact/route.ts`
- **Auth**: public (no auth required)
- **Purpose**: Handle contact form submissions. Sends email to tec@ntu.edu.tw + auto-reply
- **Rate Limit**: 5 req/min per IP
- **Body**: `{ name, email, phone?, company?, type, message }`
- **External**: Email via `sendEmail()`

---

## Auth Pattern Summary

All admin routes follow the same auth pattern:
1. `supabase.auth.getUser()` -- check authenticated
2. Query `module_roles` table for user's roles
3. Check `app_metadata.platform_role` as fallback
4. Require `admin` or `staff_admin` role

Angel member routes use `withApiHandler()` middleware with `roles: ['angel_member']` configuration.

Public routes (`/api/contact`) use rate limiting via `checkRateLimit()`.
