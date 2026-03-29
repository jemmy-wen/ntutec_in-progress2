-- ============================================================
-- NTUTEC Unified Platform — Consolidated Migration
-- ============================================================
-- Version: 001
-- Date: 2026-03-29
-- Covers: Shared (roles, notifications, audit), Pipeline (startups, meetings),
--         Angel Club (members, responses, votes, learning, notifications),
--         Mentor (reserved tables from P014)
--
-- Naming convention per Platform Architecture v0.4:
--   pip_*     = Pipeline module
--   angel_*   = Angel Club module
--   mentor_*  = Mentor Clinic module (reserved, P014 migration)
--   sys_*     = System-level tables (future)
-- ============================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 1. SHARED: Module Roles
-- ============================================================
CREATE TABLE IF NOT EXISTS module_roles (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module      TEXT NOT NULL DEFAULT 'platform',
  role        TEXT NOT NULL CHECK (role IN (
    'admin', 'staff_admin', 'staff_accelerator',
    'angel_member', 'mentor', 'team',
    'startup_incubated', 'startup_fundraising', 'vc_partner'
  )),
  is_active   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, module, role)
);

CREATE INDEX idx_module_roles_user ON module_roles(user_id);
CREATE INDEX idx_module_roles_role ON module_roles(role);

-- ============================================================
-- 2. SHARED: In-App Notifications
-- ============================================================
CREATE TABLE IF NOT EXISTS in_app_notifications (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  body        TEXT,
  type        TEXT NOT NULL DEFAULT 'info' CHECK (type IN ('info', 'action', 'warning', 'success')),
  link        TEXT,
  is_read     BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_notifications_user ON in_app_notifications(user_id, is_read);
CREATE INDEX idx_notifications_created ON in_app_notifications(created_at DESC);

-- ============================================================
-- 3. SHARED: Audit Logs
-- ============================================================
CREATE TABLE IF NOT EXISTS audit_logs (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action      TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id   TEXT,
  changes     JSONB,
  metadata    JSONB,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_audit_user ON audit_logs(user_id);
CREATE INDEX idx_audit_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_created ON audit_logs(created_at DESC);

-- ============================================================
-- 4. PIPELINE: Startups
-- ============================================================
CREATE TABLE IF NOT EXISTS pip_startups (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_zh               TEXT NOT NULL,
  name_en               TEXT,
  tax_id                TEXT UNIQUE,
  sector                TEXT,
  one_liner             TEXT,
  pipeline_stage        INT NOT NULL DEFAULT 0,
  gate0_score           NUMERIC(5,2),
  gate1_score           NUMERIC(5,2),
  status                TEXT NOT NULL DEFAULT 'active',
  -- Observation pool
  observation_pool      BOOLEAN NOT NULL DEFAULT false,
  observation_reason    TEXT,
  observation_entered_at TIMESTAMPTZ,
  reactivated_at        TIMESTAMPTZ,
  reactivated_reason    TEXT,
  -- Tier (S/A/B/C)
  tier                  TEXT DEFAULT 'C',
  notes                 TEXT,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_pip_startups_stage ON pip_startups(pipeline_stage);
CREATE INDEX idx_pip_startups_tier ON pip_startups(tier);
CREATE INDEX idx_pip_startups_observation ON pip_startups(observation_pool) WHERE observation_pool = true;

-- ============================================================
-- 5. PIPELINE: Monthly Meetings (Angel Club Cycles)
-- ============================================================
CREATE TABLE IF NOT EXISTS pip_meetings (
  id              TEXT PRIMARY KEY,   -- YYYY-MM format
  meeting_date    DATE NOT NULL,
  status          TEXT NOT NULL DEFAULT 'setup' CHECK (status IN (
    'setup', 'cards_ready', 'vote_open', 'meeting', 'followup', 'closed'
  )),
  is_archived     BOOLEAN NOT NULL DEFAULT false,
  cards_ready_at  TIMESTAMPTZ,
  vote_open_at    TIMESTAMPTZ,
  meeting_at      TIMESTAMPTZ,
  followup_until  TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 6. PIPELINE: Meeting Pitches (Candidates per Meeting)
-- ============================================================
CREATE TABLE IF NOT EXISTS pip_meeting_pitches (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  meeting_id      TEXT NOT NULL REFERENCES pip_meetings(id) ON DELETE CASCADE,
  startup_id      UUID NOT NULL REFERENCES pip_startups(id) ON DELETE CASCADE,
  pitch_order     INT NOT NULL DEFAULT 0,
  decision        TEXT CHECK (decision IN ('invest', 'pass', 'defer')),
  followup_status TEXT NOT NULL DEFAULT 'pending' CHECK (followup_status IN (
    'pending', 'contacted', 'visited', 'closed'
  )),
  notes           TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(meeting_id, startup_id)
);

CREATE INDEX idx_pitches_meeting ON pip_meeting_pitches(meeting_id);

-- ============================================================
-- 7. ANGEL: Members
-- ============================================================
CREATE TABLE IF NOT EXISTS angel_members (
  id                      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id                 UUID UNIQUE REFERENCES auth.users(id) ON DELETE SET NULL,
  display_name            TEXT NOT NULL,
  email                   TEXT,
  phone                   TEXT,
  company                 TEXT,
  title                   TEXT,
  status                  TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending')),
  tier                    TEXT CHECK (tier IN ('founding', 'regular', 'associate')),
  investment_preferences  JSONB DEFAULT '{}',
  joined_at               TIMESTAMPTZ,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_angel_members_user ON angel_members(user_id);
CREATE INDEX idx_angel_members_status ON angel_members(status);

-- ============================================================
-- 8. ANGEL: Card Responses (C2 RLS — members see only own)
-- ============================================================
CREATE TABLE IF NOT EXISTS angel_card_responses (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  angel_member_id     UUID NOT NULL REFERENCES angel_members(id) ON DELETE CASCADE,
  startup_id          UUID NOT NULL REFERENCES pip_startups(id) ON DELETE CASCADE,
  meeting_cycle       TEXT NOT NULL REFERENCES pip_meetings(id),
  response            TEXT NOT NULL CHECK (response IN ('interested', 'thinking', 'not_for_me')),
  interest_reason     TEXT,
  cards_viewed        INT NOT NULL DEFAULT 0,
  time_spent_seconds  INT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(angel_member_id, startup_id, meeting_cycle)
);

CREATE INDEX idx_card_responses_member ON angel_card_responses(angel_member_id);
CREATE INDEX idx_card_responses_cycle ON angel_card_responses(meeting_cycle);

-- ============================================================
-- 9. ANGEL: Votes (C2 RLS — members see only own)
-- ============================================================
CREATE TABLE IF NOT EXISTS angel_votes (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  angel_member_id       UUID NOT NULL REFERENCES angel_members(id) ON DELETE CASCADE,
  startup_id            UUID NOT NULL REFERENCES pip_startups(id) ON DELETE CASCADE,
  meeting_cycle         TEXT NOT NULL REFERENCES pip_meetings(id),
  decision              TEXT NOT NULL CHECK (decision IN ('invest', 'pass', 'defer')),
  intended_amount_range TEXT,
  attended_meeting      BOOLEAN NOT NULL DEFAULT false,
  reason                TEXT,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(angel_member_id, startup_id, meeting_cycle)
);

CREATE INDEX idx_votes_member ON angel_votes(angel_member_id);
CREATE INDEX idx_votes_cycle ON angel_votes(meeting_cycle);

-- ============================================================
-- 10. ANGEL: Learning Progress
-- ============================================================
CREATE TABLE IF NOT EXISTS angel_learning_progress (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  angel_member_id UUID NOT NULL REFERENCES angel_members(id) ON DELETE CASCADE,
  content_type    TEXT NOT NULL CHECK (content_type IN ('digest', 'industry_report', 'case_study', 'tutorial')),
  content_id      TEXT NOT NULL,
  read_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  completion_pct  INT NOT NULL DEFAULT 100 CHECK (completion_pct BETWEEN 0 AND 100),
  UNIQUE(angel_member_id, content_type, content_id)
);

CREATE INDEX idx_learning_member ON angel_learning_progress(angel_member_id);

-- ============================================================
-- 11. ANGEL: Notification Log
-- ============================================================
CREATE TABLE IF NOT EXISTS angel_notifications (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  angel_member_id   UUID NOT NULL REFERENCES angel_members(id) ON DELETE CASCADE,
  notification_type TEXT NOT NULL,
  meeting_cycle     TEXT NOT NULL REFERENCES pip_meetings(id),
  sent_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  channel           TEXT NOT NULL DEFAULT 'in_app' CHECK (channel IN ('email', 'in_app', 'telegram'))
);

CREATE INDEX idx_angel_notif_member ON angel_notifications(angel_member_id);

-- ============================================================
-- 12. VIEWS
-- ============================================================

-- Meeting candidate summary (admin view)
CREATE OR REPLACE VIEW v_meeting_candidate_summary AS
SELECT
  s.id,
  s.name_zh,
  s.sector,
  COUNT(cr.id) FILTER (WHERE cr.response = 'interested')   AS interested_count,
  COUNT(cr.id) FILTER (WHERE cr.response = 'thinking')     AS thinking_count,
  COUNT(cr.id) FILTER (WHERE cr.response = 'not_for_me')   AS not_for_me_count,
  COUNT(cr.id)                                              AS total_responses,
  (SELECT COUNT(*) FROM angel_members WHERE status = 'active') AS total_active_members,
  CASE
    WHEN (SELECT COUNT(*) FROM angel_members WHERE status = 'active') = 0 THEN 0
    ELSE ROUND(COUNT(cr.id)::NUMERIC / (SELECT COUNT(*) FROM angel_members WHERE status = 'active') * 100, 1)
  END AS engagement_rate
FROM pip_startups s
LEFT JOIN angel_card_responses cr ON cr.startup_id = s.id
GROUP BY s.id, s.name_zh, s.sector;

-- Vote summary (admin view)
CREATE OR REPLACE VIEW v_vote_summary AS
SELECT
  s.id AS startup_id,
  s.name_zh,
  COUNT(v.id) FILTER (WHERE v.decision = 'invest') AS invest_count,
  COUNT(v.id) FILTER (WHERE v.decision = 'pass')   AS pass_count,
  COUNT(v.id) FILTER (WHERE v.decision = 'defer')  AS defer_count,
  COUNT(v.id)                                       AS total_votes,
  CASE
    WHEN COUNT(v.id) = 0 THEN 0
    ELSE ROUND(COUNT(v.id) FILTER (WHERE v.decision = 'invest')::NUMERIC / COUNT(v.id) * 100, 1)
  END AS invest_rate
FROM pip_startups s
LEFT JOIN angel_votes v ON v.startup_id = s.id
GROUP BY s.id, s.name_zh;

-- Angel engagement (admin view)
CREATE OR REPLACE VIEW v_angel_engagement AS
SELECT
  m.id,
  m.display_name,
  COALESCE(cr_stats.response_rate, 0)     AS card_response_rate,
  COALESCE(v_stats.vote_rate, 0)          AS vote_participation_rate,
  COALESCE(lp_stats.articles_read, 0)     AS articles_read,
  CASE
    WHEN COALESCE(cr_stats.response_rate, 0) >= 70 AND COALESCE(v_stats.vote_rate, 0) >= 70 THEN 'active'
    WHEN COALESCE(cr_stats.response_rate, 0) >= 30 OR COALESCE(v_stats.vote_rate, 0) >= 30 THEN 'moderate'
    ELSE 'low'
  END AS engagement_level
FROM angel_members m
LEFT JOIN LATERAL (
  SELECT ROUND(
    COUNT(cr.id)::NUMERIC /
    NULLIF((SELECT COUNT(DISTINCT p.startup_id) FROM pip_meeting_pitches p), 0) * 100, 1
  ) AS response_rate
  FROM angel_card_responses cr WHERE cr.angel_member_id = m.id
) cr_stats ON true
LEFT JOIN LATERAL (
  SELECT ROUND(
    COUNT(v.id)::NUMERIC /
    NULLIF((SELECT COUNT(DISTINCT p.startup_id) FROM pip_meeting_pitches p), 0) * 100, 1
  ) AS vote_rate
  FROM angel_votes v WHERE v.angel_member_id = m.id
) v_stats ON true
LEFT JOIN LATERAL (
  SELECT COUNT(*) AS articles_read
  FROM angel_learning_progress lp WHERE lp.angel_member_id = m.id
) lp_stats ON true
WHERE m.status = 'active';

-- ============================================================
-- 13. RLS POLICIES
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE module_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE in_app_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE pip_startups ENABLE ROW LEVEL SECURITY;
ALTER TABLE pip_meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE pip_meeting_pitches ENABLE ROW LEVEL SECURITY;
ALTER TABLE angel_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE angel_card_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE angel_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE angel_learning_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE angel_notifications ENABLE ROW LEVEL SECURITY;

-- Helper function: check if current user has a specific role
CREATE OR REPLACE FUNCTION has_role(check_role TEXT)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM module_roles
    WHERE user_id = auth.uid()
      AND role = check_role
      AND is_active = true
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Helper: check if current user is admin tier
CREATE OR REPLACE FUNCTION is_admin_tier()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM module_roles
    WHERE user_id = auth.uid()
      AND role IN ('admin', 'staff_admin')
      AND is_active = true
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Helper: get angel_member_id for current user
CREATE OR REPLACE FUNCTION my_angel_member_id()
RETURNS UUID AS $$
  SELECT id FROM angel_members WHERE user_id = auth.uid() LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- ── module_roles: users see own, admins see all ──
CREATE POLICY "Users read own roles" ON module_roles
  FOR SELECT USING (user_id = auth.uid() OR is_admin_tier());

CREATE POLICY "Admins manage roles" ON module_roles
  FOR ALL USING (is_admin_tier());

-- ── in_app_notifications: users see own ──
CREATE POLICY "Users read own notifications" ON in_app_notifications
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users update own notifications" ON in_app_notifications
  FOR UPDATE USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "System inserts notifications" ON in_app_notifications
  FOR INSERT WITH CHECK (true);  -- insert via service_role or API

-- ── audit_logs: admins read, system inserts ──
CREATE POLICY "Admins read audit" ON audit_logs
  FOR SELECT USING (is_admin_tier());

CREATE POLICY "System inserts audit" ON audit_logs
  FOR INSERT WITH CHECK (true);

-- ── pip_startups: admins full, angel read ──
CREATE POLICY "Admins manage startups" ON pip_startups
  FOR ALL USING (is_admin_tier());

CREATE POLICY "Angels read startups" ON pip_startups
  FOR SELECT USING (has_role('angel_member'));

-- ── pip_meetings: admins full, authenticated read ──
CREATE POLICY "Admins manage meetings" ON pip_meetings
  FOR ALL USING (is_admin_tier());

CREATE POLICY "Authenticated read meetings" ON pip_meetings
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- ── pip_meeting_pitches: admins full, authenticated read ──
CREATE POLICY "Admins manage pitches" ON pip_meeting_pitches
  FOR ALL USING (is_admin_tier());

CREATE POLICY "Authenticated read pitches" ON pip_meeting_pitches
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- ── angel_members: own profile + admins ──
CREATE POLICY "Members read own profile" ON angel_members
  FOR SELECT USING (user_id = auth.uid() OR is_admin_tier());

CREATE POLICY "Members update own profile" ON angel_members
  FOR UPDATE USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins manage members" ON angel_members
  FOR ALL USING (is_admin_tier());

-- ── angel_card_responses: C2 isolation — own only + admins ──
CREATE POLICY "Members read own responses" ON angel_card_responses
  FOR SELECT USING (angel_member_id = my_angel_member_id() OR is_admin_tier());

CREATE POLICY "Members upsert own responses" ON angel_card_responses
  FOR INSERT WITH CHECK (angel_member_id = my_angel_member_id());

CREATE POLICY "Members update own responses" ON angel_card_responses
  FOR UPDATE USING (angel_member_id = my_angel_member_id())
  WITH CHECK (angel_member_id = my_angel_member_id());

-- ── angel_votes: C2 isolation — own only + admins ──
CREATE POLICY "Members read own votes" ON angel_votes
  FOR SELECT USING (angel_member_id = my_angel_member_id() OR is_admin_tier());

CREATE POLICY "Members upsert own votes" ON angel_votes
  FOR INSERT WITH CHECK (angel_member_id = my_angel_member_id());

CREATE POLICY "Members update own votes" ON angel_votes
  FOR UPDATE USING (angel_member_id = my_angel_member_id())
  WITH CHECK (angel_member_id = my_angel_member_id());

-- ── angel_learning_progress: own only + admins ──
CREATE POLICY "Members read own learning" ON angel_learning_progress
  FOR SELECT USING (angel_member_id = my_angel_member_id() OR is_admin_tier());

CREATE POLICY "Members upsert own learning" ON angel_learning_progress
  FOR INSERT WITH CHECK (angel_member_id = my_angel_member_id());

-- ── angel_notifications: own only + admins ──
CREATE POLICY "Members read own angel notifications" ON angel_notifications
  FOR SELECT USING (angel_member_id = my_angel_member_id() OR is_admin_tier());

CREATE POLICY "System inserts angel notifications" ON angel_notifications
  FOR INSERT WITH CHECK (true);

-- ============================================================
-- 14. UPDATED_AT TRIGGER
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER trg_module_roles_updated BEFORE UPDATE ON module_roles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_pip_startups_updated BEFORE UPDATE ON pip_startups FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_pip_meetings_updated BEFORE UPDATE ON pip_meetings FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_pip_meeting_pitches_updated BEFORE UPDATE ON pip_meeting_pitches FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_angel_members_updated BEFORE UPDATE ON angel_members FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_card_responses_updated BEFORE UPDATE ON angel_card_responses FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_votes_updated BEFORE UPDATE ON angel_votes FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- Done. Run with: psql or Supabase SQL Editor
-- ============================================================
