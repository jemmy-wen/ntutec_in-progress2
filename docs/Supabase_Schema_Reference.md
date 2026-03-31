# NTUTEC Platform — Supabase Schema Reference

> **Generated**: 2026-03-31
> **Source**: `supabase/migrations/001–004` + `types/database.ts`
> **Naming Convention**: Platform Architecture v0.4 — `pip_*` Pipeline, `angel_*` Angel Club, `mentor_*` Mentor Clinic, `sys_*` System

---

## Table of Contents

1. [Pre-existing Tables (SOT)](#pre-existing-tables-sot)
2. [Shared / System Tables](#shared--system-tables)
3. [Pipeline Tables](#pipeline-tables)
4. [Angel Club Tables](#angel-club-tables)
5. [Mentor Clinic Tables](#mentor-clinic-tables)
6. [Startup Profiles](#startup-profiles)
7. [Views (Alias)](#views-alias)
8. [Views (Analytics)](#views-analytics)
9. [Storage](#storage)
10. [RLS Policies Summary](#rls-policies-summary)
11. [Helper Functions](#helper-functions)
12. [Triggers](#triggers)

---

## Pre-existing Tables (SOT)

These tables existed before the platform migration. The v2 migration adds columns and creates View aliases (`pip_*`, `angel_members`) on top of them.

### `startups`

The real underlying table for pipeline startups. Accessed via `pip_startups` View in application code.

| Column | Type | Default | Nullable | Notes |
|--------|------|---------|----------|-------|
| id | UUID | `uuid_generate_v4()` | NO | PK |
| name_zh | TEXT | — | NO | |
| name_en | TEXT | — | YES | |
| tax_id | TEXT | — | YES | UNIQUE |
| sector | TEXT | — | YES | |
| product_oneliner | TEXT | — | YES | Aliased as `one_liner` in pip_startups View |
| pipeline_stage | TEXT | — | YES | Original text label; converted to INT in View |
| final_tier | TEXT | — | YES | Aliased as `tier` in View (S/A/B/C) |
| track | TEXT | — | YES | |
| current_gate | TEXT | — | YES | gate0/gate1/gate2/screening/pitch/invested/pass |
| status | TEXT | `'active'` | NO | |
| notes | TEXT | — | YES | |
| gate0_score | NUMERIC(5,2) | — | YES | Added by 001a |
| gate1_score | NUMERIC(5,2) | — | YES | Added by 001a |
| observation_pool | BOOLEAN | `false` | NO | Added by 001a |
| observation_reason | TEXT | — | YES | Added by 001a |
| observation_entered_at | TIMESTAMPTZ | — | YES | Added by 001a |
| reactivated_at | TIMESTAMPTZ | — | YES | Added by 001a |
| reactivated_reason | TEXT | — | YES | Added by 001a |
| bp_storage_path | TEXT | — | YES | Added by 003 |
| bp_uploaded_at | TIMESTAMPTZ | — | YES | Added by 003 |
| created_at | TIMESTAMPTZ | `now()` | NO | |
| updated_at | TIMESTAMPTZ | `now()` | NO | |

**RLS**: Enabled. Admins full access; Angels read-only; service_role full access.

### `investors`

The real underlying table for angel members. Accessed via `angel_members` View.

| Column | Type | Default | Nullable | Notes |
|--------|------|---------|----------|-------|
| id | UUID | `uuid_generate_v4()` | NO | PK |
| name | TEXT | — | NO | Aliased as `display_name` in View |
| email | TEXT | — | YES | |
| phone | TEXT | — | YES | |
| organization | TEXT | — | YES | Aliased as `company` in View |
| title | TEXT | — | YES | |
| status | TEXT | — | YES | active/inactive/pending |
| focus_sectors | — | — | YES | Pre-existing |
| user_id | UUID | — | YES | FK → auth.users(id), UNIQUE (partial). Added by 001a |
| angel_tier | TEXT | — | YES | CHECK: founding/regular/associate. Aliased as `tier` in View |
| investment_preferences | JSONB | `'{}'` | YES | Added by 001a |
| joined_at | TIMESTAMPTZ | — | YES | Added by 001a |
| onboarding_completed | BOOLEAN | `false` | YES | Added by 003 |
| created_at | TIMESTAMPTZ | `now()` | NO | |
| updated_at | TIMESTAMPTZ | `now()` | NO | |

**RLS**: Enabled. Members read own profile; Members update own profile; Admins full access; service_role full access.

### `gates`

Gate evaluation records. Aliased as `pip_gates` View.

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | PK |
| startup_id | UUID | FK → startups(id) |
| gate_type | TEXT | gate0/gate1/gate2 |
| result | TEXT | |
| screening_result | TEXT | |
| evaluation_date | TEXT | |
| evaluator | TEXT | |
| notes | TEXT | |
| flags | TEXT[] | |
| fail_reasons | TEXT[] | |
| sosv_market | NUMERIC | Gate 1 dimension |
| sosv_solution | NUMERIC | Gate 1 dimension |
| sosv_timing | NUMERIC | Gate 1 dimension |
| sosv_team | NUMERIC | Gate 1 dimension |
| sosv_traction | NUMERIC | Gate 1 dimension |
| gate1_confidence | TEXT | |
| gate1_action | TEXT | |
| created_at | TIMESTAMPTZ | |
| updated_at | TIMESTAMPTZ | |

### `pipeline_alerts`

Pipeline alert records. Aliased as `pip_alerts` View.

### Other pre-existing tables (conditional Views)

The following tables have View aliases created only if they exist:
- `form_submissions` → `pip_form_submissions`
- `team_members` → `sys_team_members`
- `events` → `sys_events`
- `event_startups` → `sys_event_startups`
- `contacts` → `sys_contacts`
- `documents` → `sys_documents`

---

## Shared / System Tables

### `module_roles`

Unified role assignment across all platform modules (9 roles).

| Column | Type | Default | Nullable | Constraints |
|--------|------|---------|----------|-------------|
| id | UUID | `uuid_generate_v4()` | NO | PK |
| user_id | UUID | — | NO | FK → auth.users(id) ON DELETE CASCADE |
| module | TEXT | `'platform'` | NO | |
| role | TEXT | — | NO | CHECK: admin, staff_admin, staff_accelerator, angel_member, mentor, team, startup_incubated, startup_fundraising, vc_partner |
| is_active | BOOLEAN | `true` | NO | |
| created_at | TIMESTAMPTZ | `now()` | NO | |
| updated_at | TIMESTAMPTZ | `now()` | NO | |

**Unique**: (user_id, module, role)
**Indexes**: idx_module_roles_user(user_id), idx_module_roles_role(role)
**RLS**: Users read own + admin; Admins manage all.

### `in_app_notifications`

| Column | Type | Default | Nullable | Constraints |
|--------|------|---------|----------|-------------|
| id | UUID | `uuid_generate_v4()` | NO | PK |
| user_id | UUID | — | NO | FK → auth.users(id) ON DELETE CASCADE |
| title | TEXT | — | NO | |
| body | TEXT | — | YES | |
| type | TEXT | `'info'` | NO | CHECK: info, action, warning, success |
| link | TEXT | — | YES | |
| is_read | BOOLEAN | `false` | NO | |
| created_at | TIMESTAMPTZ | `now()` | NO | |

**Indexes**: idx_notifications_user(user_id, is_read), idx_notifications_created(created_at DESC)
**RLS**: Users read own; Users update own; System inserts (WITH CHECK true).

### `audit_logs`

| Column | Type | Default | Nullable | Constraints |
|--------|------|---------|----------|-------------|
| id | UUID | `uuid_generate_v4()` | NO | PK |
| user_id | UUID | — | YES | FK → auth.users(id) ON DELETE SET NULL |
| action | TEXT | — | NO | |
| entity_type | TEXT | — | NO | |
| entity_id | TEXT | — | YES | |
| changes | JSONB | — | YES | |
| metadata | JSONB | — | YES | |
| created_at | TIMESTAMPTZ | `now()` | NO | |

**Indexes**: idx_audit_user(user_id), idx_audit_entity(entity_type, entity_id), idx_audit_created(created_at DESC)
**RLS**: Admins read; System inserts (WITH CHECK true).

### `sys_platform_settings`

Key-value store for platform configuration. Created by migration 004.

| Column | Type | Default | Nullable | Constraints |
|--------|------|---------|----------|-------------|
| key | TEXT | — | NO | PK |
| value | TEXT | `''` | NO | |
| updated_by | UUID | — | YES | FK → auth.users(id) |
| updated_at | TIMESTAMPTZ | `now()` | NO | |
| created_at | TIMESTAMPTZ | `now()` | NO | |

**RLS**: Admin-only read/write.
**Seed values**: emailNotifications, notifyOnCardReady, notifyOnVoteOpen, notifyOnMeetingDay, notifyOnNewMember, defaultCardBrowseDays (21), defaultVoteDays (7), defaultFollowupDays (30), ghostApiUrl, ghostContentKey.

---

## Pipeline Tables

### `pip_meetings`

Monthly meeting cycles for Angel Club.

| Column | Type | Default | Nullable | Constraints |
|--------|------|---------|----------|-------------|
| id | TEXT | — | NO | PK (YYYY-MM format) |
| meeting_date | DATE | — | NO | |
| status | TEXT | `'setup'` | NO | CHECK: setup, cards_ready, vote_open, meeting, followup, closed |
| is_archived | BOOLEAN | `false` | NO | |
| cards_ready_at | TIMESTAMPTZ | — | YES | |
| vote_open_at | TIMESTAMPTZ | — | YES | |
| meeting_at | TIMESTAMPTZ | — | YES | |
| followup_until | TIMESTAMPTZ | — | YES | |
| created_at | TIMESTAMPTZ | `now()` | NO | |
| updated_at | TIMESTAMPTZ | `now()` | NO | |

**RLS**: Admins full access; Authenticated users read.

### `pip_meeting_pitches`

Candidate startups per meeting cycle.

| Column | Type | Default | Nullable | Constraints |
|--------|------|---------|----------|-------------|
| id | UUID | `uuid_generate_v4()` | NO | PK |
| meeting_id | TEXT | — | NO | FK → pip_meetings(id) ON DELETE CASCADE |
| startup_id | UUID | — | NO | FK → startups(id) ON DELETE CASCADE |
| pitch_order | INT | `0` | NO | |
| decision | TEXT | — | YES | CHECK: invest, pass, defer |
| followup_status | TEXT | `'pending'` | NO | CHECK: pending, contacted, visited, closed |
| notes | TEXT | — | YES | |
| created_at | TIMESTAMPTZ | `now()` | NO | |
| updated_at | TIMESTAMPTZ | `now()` | NO | |

**Unique**: (meeting_id, startup_id)
**Indexes**: idx_pitches_meeting(meeting_id)
**RLS**: Admins full access; Authenticated users read.

---

## Angel Club Tables

### `angel_card_responses`

C2 isolation: members see only their own responses.

| Column | Type | Default | Nullable | Constraints |
|--------|------|---------|----------|-------------|
| id | UUID | `uuid_generate_v4()` | NO | PK |
| angel_member_id | UUID | — | NO | FK → investors(id) ON DELETE CASCADE |
| startup_id | UUID | — | NO | FK → startups(id) ON DELETE CASCADE |
| meeting_cycle | TEXT | — | NO | FK → pip_meetings(id) |
| response | TEXT | — | NO | CHECK: interested, thinking, not_for_me |
| interest_reason | TEXT | — | YES | |
| cards_viewed | INT | `0` | NO | |
| time_spent_seconds | INT | — | YES | |
| created_at | TIMESTAMPTZ | `now()` | NO | |
| updated_at | TIMESTAMPTZ | `now()` | NO | |

**Unique**: (angel_member_id, startup_id, meeting_cycle)
**RLS**: Members read/insert/update own; Admins read all.

### `angel_votes`

C2 isolation: members see only their own votes.

| Column | Type | Default | Nullable | Constraints |
|--------|------|---------|----------|-------------|
| id | UUID | `uuid_generate_v4()` | NO | PK |
| angel_member_id | UUID | — | NO | FK → investors(id) ON DELETE CASCADE |
| startup_id | UUID | — | NO | FK → startups(id) ON DELETE CASCADE |
| meeting_cycle | TEXT | — | NO | FK → pip_meetings(id) |
| decision | TEXT | — | NO | CHECK: invest, pass, defer |
| intended_amount_range | TEXT | — | YES | |
| attended_meeting | BOOLEAN | `false` | NO | |
| reason | TEXT | — | YES | |
| created_at | TIMESTAMPTZ | `now()` | NO | |
| updated_at | TIMESTAMPTZ | `now()` | NO | |

**Unique**: (angel_member_id, startup_id, meeting_cycle)
**RLS**: Members read/insert/update own; Admins read all.

### `angel_learning_progress`

| Column | Type | Default | Nullable | Constraints |
|--------|------|---------|----------|-------------|
| id | UUID | `uuid_generate_v4()` | NO | PK |
| angel_member_id | UUID | — | NO | FK → investors(id) ON DELETE CASCADE |
| content_type | TEXT | — | NO | CHECK: digest, industry_report, case_study, tutorial |
| content_id | TEXT | — | NO | |
| read_at | TIMESTAMPTZ | `now()` | NO | |
| completion_pct | INT | `100` | NO | CHECK: 0-100 |

**Unique**: (angel_member_id, content_type, content_id)
**RLS**: Members read/insert own; Admins read all.

### `angel_notifications`

| Column | Type | Default | Nullable | Constraints |
|--------|------|---------|----------|-------------|
| id | UUID | `uuid_generate_v4()` | NO | PK |
| angel_member_id | UUID | — | NO | FK → investors(id) ON DELETE CASCADE |
| notification_type | TEXT | — | NO | |
| meeting_cycle | TEXT | — | NO | FK → pip_meetings(id) |
| sent_at | TIMESTAMPTZ | `now()` | NO | |
| channel | TEXT | `'in_app'` | NO | CHECK: email, in_app, telegram |

**RLS**: Members read own; System inserts (WITH CHECK true).

---

## Mentor Clinic Tables

### `mentor_profiles`

| Column | Type | Default | Nullable | Constraints |
|--------|------|---------|----------|-------------|
| id | UUID | `uuid_generate_v4()` | NO | PK |
| user_id | UUID | — | YES | FK → auth.users(id) ON DELETE SET NULL, UNIQUE |
| display_name | TEXT | — | NO | |
| email | TEXT | — | YES | |
| phone | TEXT | — | YES | |
| company | TEXT | — | YES | |
| title | TEXT | — | YES | |
| specialties | TEXT[] | `'{}'` | YES | |
| bio | TEXT | `''` | YES | |
| max_sessions | INT | `4` | YES | Max sessions per cycle |
| status | TEXT | `'active'` | NO | CHECK: active, inactive, pending |
| created_at | TIMESTAMPTZ | `now()` | NO | |
| updated_at | TIMESTAMPTZ | `now()` | NO | |

**RLS**: Mentors read/update own; Admins manage all.

### `mentor_slots`

| Column | Type | Default | Nullable | Constraints |
|--------|------|---------|----------|-------------|
| id | UUID | `uuid_generate_v4()` | NO | PK |
| mentor_id | UUID | — | NO | FK → mentor_profiles(id) ON DELETE CASCADE |
| slot_date | DATE | — | NO | |
| slot_time | TEXT | — | NO | e.g. '09:00' |
| is_available | BOOLEAN | `true` | NO | |
| booked_by | UUID | — | YES | FK → auth.users(id) |
| created_at | TIMESTAMPTZ | `now()` | NO | |

**Unique**: (mentor_id, slot_date, slot_time)
**RLS**: Mentors manage own + admin; Teams read available slots.

### `mentor_matches`

| Column | Type | Default | Nullable | Constraints |
|--------|------|---------|----------|-------------|
| id | UUID | `uuid_generate_v4()` | NO | PK |
| cycle_id | TEXT | — | YES | FK → pip_meetings(id) |
| mentor_id | UUID | — | NO | FK → mentor_profiles(id) ON DELETE CASCADE |
| team_startup_id | UUID | — | YES | FK → pip_startups(id) |
| team_user_id | UUID | — | YES | FK → auth.users(id) |
| match_score | NUMERIC(5,2) | — | YES | |
| status | TEXT | `'pending'` | NO | CHECK: pending, confirmed, scheduled, completed, cancelled, no_show |
| session_date | DATE | — | YES | |
| session_time | TEXT | — | YES | |
| location | TEXT | — | YES | |
| notes | TEXT | — | YES | |
| created_at | TIMESTAMPTZ | `now()` | NO | |
| updated_at | TIMESTAMPTZ | `now()` | NO | |

**RLS**: Participants (mentor + team_user) read; Admins manage all.

### `mentor_feedback`

| Column | Type | Default | Nullable | Constraints |
|--------|------|---------|----------|-------------|
| id | UUID | `uuid_generate_v4()` | NO | PK |
| mentor_id | UUID | — | NO | FK → mentor_profiles(id) ON DELETE CASCADE |
| match_id | UUID | — | NO | FK → mentor_matches(id) ON DELETE CASCADE |
| session_quality | INT | — | YES | CHECK: 1-5 |
| team_preparedness | INT | — | YES | CHECK: 1-5 |
| team_coachability | INT | — | YES | CHECK: 1-5 |
| key_issues | TEXT | `''` | YES | |
| recommendations | TEXT | `''` | YES | |
| follow_up_needed | BOOLEAN | `false` | YES | |
| notes | TEXT | `''` | YES | |
| submitted_at | TIMESTAMPTZ | — | YES | |
| created_at | TIMESTAMPTZ | `now()` | NO | |
| updated_at | TIMESTAMPTZ | `now()` | NO | |

**Unique**: (mentor_id, match_id)
**RLS**: Mentors manage own feedback; Admins manage all.

---

## Startup Profiles

### `startup_profiles`

Extended profile for startup portal (linked to pip_startups).

| Column | Type | Default | Nullable | Constraints |
|--------|------|---------|----------|-------------|
| id | UUID | `uuid_generate_v4()` | NO | PK |
| pip_startup_id | UUID | — | YES | FK → pip_startups(id), UNIQUE |
| name | TEXT | — | NO | |
| one_liner | TEXT | — | YES | |
| sector | TEXT | — | YES | |
| stage | TEXT | `'pre_seed'` | YES | |
| founded_year | INT | — | YES | |
| team_size | INT | — | YES | |
| website | TEXT | — | YES | |
| description | TEXT | — | YES | |
| traction | TEXT | — | YES | |
| fundraising_target | TEXT | — | YES | |
| fundraising_use | TEXT | — | YES | |
| team_user_ids | UUID[] | `'{}'` | YES | |
| mentor_sessions_remaining | INT | `3` | YES | |
| program | TEXT | — | YES | |
| created_at | TIMESTAMPTZ | `now()` | NO | |
| updated_at | TIMESTAMPTZ | `now()` | NO | |

**RLS**: Team members (auth.uid() = ANY(team_user_ids)) manage own; Admins manage all; Mentors read.

---

## Views (Alias)

These views bridge pre-existing table names to the platform naming convention.

### `pip_startups` (View on `startups`)

Key column mappings:
- `product_oneliner` → `one_liner`
- `pipeline_stage` (TEXT) → `pipeline_stage` (INT, extracted leading digits) + `pipeline_stage_label` (original TEXT)
- `final_tier` → `tier`

### `angel_members` (View on `investors`)

Key column mappings:
- `name` → `display_name`
- `organization` → `company`
- `angel_tier` → `tier`
- Includes `onboarding_completed` (added by migration 003)
- Filter: `WHERE angel_tier IS NOT NULL` (added by migration 003)

### Other Alias Views

| View | Source Table |
|------|-------------|
| `pip_gates` | `gates` |
| `pip_alerts` | `pipeline_alerts` |
| `pip_form_submissions` | `form_submissions` (if exists) |
| `sys_team_members` | `team_members` (if exists) |
| `sys_events` | `events` (if exists) |
| `sys_event_startups` | `event_startups` (if exists) |
| `sys_contacts` | `contacts` (if exists) |
| `sys_documents` | `documents` (if exists) |

---

## Views (Analytics)

### `v_meeting_candidate_summary`

Admin view: aggregates card responses per startup.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | startup ID |
| name_zh | TEXT | |
| sector | TEXT | |
| interested_count | BIGINT | |
| thinking_count | BIGINT | |
| not_for_me_count | BIGINT | |
| total_responses | BIGINT | |
| total_active_members | BIGINT | |
| engagement_rate | NUMERIC | % of active members who responded |

### `v_vote_summary`

Admin view: aggregates votes per startup.

| Column | Type | Description |
|--------|------|-------------|
| startup_id | UUID | |
| name_zh | TEXT | |
| invest_count | BIGINT | |
| pass_count | BIGINT | |
| defer_count | BIGINT | |
| total_votes | BIGINT | |
| invest_rate | NUMERIC | % of invest votes |

### `v_angel_engagement`

Admin view: per-member engagement metrics.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | investor ID |
| display_name | TEXT | |
| card_response_rate | NUMERIC | |
| vote_participation_rate | NUMERIC | |
| articles_read | BIGINT | |
| engagement_level | TEXT | active (>=70%+70%) / moderate (>=30%) / low |

---

## Storage

### Bucket: `bp-files` (private)

Business Plan file storage. Created via Dashboard/API (not SQL).

**Storage RLS Policies** (on `storage.objects`):
| Policy | Operation | Condition |
|--------|-----------|-----------|
| `bp_files_select` | SELECT | bucket_id = 'bp-files' AND auth.role() = 'authenticated' |
| `bp_files_insert` | INSERT | bucket_id = 'bp-files' AND auth.role() = 'service_role' |
| `bp_files_delete` | DELETE | bucket_id = 'bp-files' AND auth.role() = 'service_role' |

---

## RLS Policies Summary

| Table | RLS | Policies |
|-------|-----|----------|
| `startups` | ON | Admins manage; Angels read; service_role full |
| `investors` | ON | Members read own; Members update own; Admins manage; service_role full |
| `module_roles` | ON | Users read own + admin; Admins manage |
| `in_app_notifications` | ON | Users read own; Users update own; System inserts |
| `audit_logs` | ON | Admins read; System inserts |
| `pip_meetings` | ON | Admins manage; Authenticated read |
| `pip_meeting_pitches` | ON | Admins manage; Authenticated read |
| `angel_card_responses` | ON | Members read/insert/update own (C2); Admins read |
| `angel_votes` | ON | Members read/insert/update own (C2); Admins read |
| `angel_learning_progress` | ON | Members read/insert own; Admins read |
| `angel_notifications` | ON | Members read own; System inserts |
| `mentor_profiles` | ON | Mentors read/update own; Admins manage |
| `mentor_slots` | ON | Mentors manage own + admin; Teams read available |
| `mentor_matches` | ON | Participants read; Admins manage |
| `mentor_feedback` | ON | Mentors manage own; Admins manage |
| `startup_profiles` | ON | Team members manage own; Admins manage; Mentors read |
| `sys_platform_settings` | ON | Admin-only read/write |

---

## Helper Functions

| Function | Returns | Language | Security | Description |
|----------|---------|----------|----------|-------------|
| `has_role(check_role TEXT)` | BOOLEAN | SQL | DEFINER, STABLE | Checks if current user has specified role in module_roles |
| `is_admin_tier()` | BOOLEAN | SQL | DEFINER, STABLE | Checks if current user is admin or staff_admin |
| `my_angel_member_id()` | UUID | SQL | DEFINER, STABLE | Returns investors.id for current auth.uid() |
| `update_updated_at()` | TRIGGER | PL/pgSQL | — | Sets NEW.updated_at = now() |

---

## Triggers

| Trigger | Table | Event | Function |
|---------|-------|-------|----------|
| `trg_module_roles_updated` | module_roles | BEFORE UPDATE | update_updated_at() |
| `trg_pip_meetings_updated` | pip_meetings | BEFORE UPDATE | update_updated_at() |
| `trg_pip_meeting_pitches_updated` | pip_meeting_pitches | BEFORE UPDATE | update_updated_at() |
| `trg_card_responses_updated` | angel_card_responses | BEFORE UPDATE | update_updated_at() |
| `trg_votes_updated` | angel_votes | BEFORE UPDATE | update_updated_at() |
| `trg_mentor_profiles_updated` | mentor_profiles | BEFORE UPDATE | update_updated_at() |
| `trg_mentor_matches_updated` | mentor_matches | BEFORE UPDATE | update_updated_at() |
| `trg_mentor_feedback_updated` | mentor_feedback | BEFORE UPDATE | update_updated_at() |
| `trg_startup_profiles_updated` | startup_profiles | BEFORE UPDATE | update_updated_at() |

---

## FK Dependency Graph

```
auth.users
  ├── module_roles.user_id
  ├── in_app_notifications.user_id
  ├── audit_logs.user_id
  ├── investors.user_id (angel_members View)
  ├── mentor_profiles.user_id
  ├── mentor_slots.booked_by
  ├── mentor_matches.team_user_id
  └── sys_platform_settings.updated_by

startups (pip_startups View)
  ├── pip_meeting_pitches.startup_id
  ├── angel_card_responses.startup_id
  ├── angel_votes.startup_id
  ├── mentor_matches.team_startup_id (via pip_startups View)
  └── startup_profiles.pip_startup_id (via pip_startups View)

investors (angel_members View)
  ├── angel_card_responses.angel_member_id
  ├── angel_votes.angel_member_id
  ├── angel_learning_progress.angel_member_id
  └── angel_notifications.angel_member_id

pip_meetings
  ├── pip_meeting_pitches.meeting_id
  ├── angel_card_responses.meeting_cycle
  ├── angel_votes.meeting_cycle
  ├── angel_notifications.meeting_cycle
  └── mentor_matches.cycle_id

mentor_profiles
  ├── mentor_slots.mentor_id
  ├── mentor_matches.mentor_id
  └── mentor_feedback.mentor_id

mentor_matches
  └── mentor_feedback.match_id
```

---

## Migration History

| File | Date | Description |
|------|------|-------------|
| `001_unified_platform.sql` | 2026-03-29 | Original consolidated schema (superseded by v2) |
| `001_unified_platform_v2.sql` | 2026-03-29 | Strategy A: ALTER existing tables + View aliases |
| `001a_alter_tables.sql` | 2026-03-29 | Part 1 extracted: ALTER TABLE only |
| `001b_views_tables_rls.sql` | 2026-03-29 | Parts 2-6: Views + new tables + RLS + triggers |
| `001c_fix_role_cast.sql` | 2026-03-29 | Fix role_type enum conflict in helper functions |
| `001d_rebuild_module_roles.sql` | 2026-03-29 | Drop module_roles (empty), rebuild as TEXT type |
| `001e_verify.sql` | 2026-03-29 | Verification queries |
| `002_mentor_startup_tables.sql` | 2026-03-29 | Mentor Clinic + Startup Profile tables |
| `003_storage_and_onboarding.sql` | 2026-03-31 | BP storage bucket, onboarding_completed column |
| `004_platform_settings.sql` | 2026-03-31 | sys_platform_settings key-value store |
