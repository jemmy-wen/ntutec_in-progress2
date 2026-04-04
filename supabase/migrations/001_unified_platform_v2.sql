-- ============================================================
-- NTUTEC Unified Platform — Corrected Migration (方案 A)
-- ============================================================
-- Version: 001_v2 (replaces 001_unified_platform.sql)
-- Date: 2026-03-29
-- Strategy: 沿用既有 startups/investors 資料，透過 View + ALTER TABLE 橋接
--
-- 執行順序：Part 1→6，全部在 Supabase SQL Editor 一次跑完
-- Rollback：每個 Part 底部附回滾指令
-- ============================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- PART 1: ALTER TABLE — 補齊既有表的缺失欄位
-- ============================================================

-- ── 1a. startups 補欄位 ──
-- gate0_score / gate1_score：反正規化快取（源自 gates 表），加速查詢
ALTER TABLE startups ADD COLUMN IF NOT EXISTS gate0_score NUMERIC(5,2);
ALTER TABLE startups ADD COLUMN IF NOT EXISTS gate1_score NUMERIC(5,2);

-- observation pool 相關欄位
ALTER TABLE startups ADD COLUMN IF NOT EXISTS observation_pool BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE startups ADD COLUMN IF NOT EXISTS observation_reason TEXT;
ALTER TABLE startups ADD COLUMN IF NOT EXISTS observation_entered_at TIMESTAMPTZ;
ALTER TABLE startups ADD COLUMN IF NOT EXISTS reactivated_at TIMESTAMPTZ;
ALTER TABLE startups ADD COLUMN IF NOT EXISTS reactivated_reason TEXT;

-- one_liner：平台 UI 用，與 product_oneliner 互為別名
-- 不新增欄位，改在 View 裡 alias

-- tier：平台用的 tier（S/A/B/C），既有有 final_tier
-- 不新增欄位，View 裡 alias final_tier → tier

-- ── 1b. investors 補欄位（Angel Portal 需要）──
-- user_id：綁定 Supabase Auth，RLS 必需
ALTER TABLE investors ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_investors_user_id ON investors(user_id) WHERE user_id IS NOT NULL;

-- tier：Angel 會員等級（founding / regular / associate）
ALTER TABLE investors ADD COLUMN IF NOT EXISTS angel_tier TEXT CHECK (angel_tier IN ('founding', 'regular', 'associate'));

-- investment_preferences：JSONB 整合欄位（補充既有的 focus_sectors 等分散欄位）
ALTER TABLE investors ADD COLUMN IF NOT EXISTS investment_preferences JSONB DEFAULT '{}';

-- joined_at：正式加入日期
ALTER TABLE investors ADD COLUMN IF NOT EXISTS joined_at TIMESTAMPTZ;

-- ============================================================
-- PART 2: View Aliases（零停機橋接）
-- ============================================================
-- 平台程式碼讀寫 pip_* / angel_* 名稱
-- View 橋接到底層真實表，含欄位 alias

-- ── 2a. pip_startups View ──
CREATE OR REPLACE VIEW pip_startups AS
SELECT
  id,
  name_zh,
  name_en,
  tax_id,
  sector,
  product_oneliner AS one_liner,
  -- pipeline_stage 轉為 INT（取前綴數字）
  CASE
    WHEN pipeline_stage IS NULL THEN 0
    WHEN pipeline_stage ~ '^\d' THEN (regexp_match(pipeline_stage, '^(\d+)'))[1]::INT
    ELSE 0
  END AS pipeline_stage,
  pipeline_stage AS pipeline_stage_label,  -- 保留原始 TEXT 標籤
  gate0_score,
  gate1_score,
  status,
  current_gate_result,            -- gate1_auto.py 寫入 'pass'/'fail'/'borderline'
  observation_pool,
  observation_reason,
  observation_entered_at,
  reactivated_at,
  reactivated_reason,
  final_tier AS tier,
  track,
  current_gate,
  notes,
  created_at,
  updated_at
FROM startups;

-- ── 2b. angel_members View ──
CREATE OR REPLACE VIEW angel_members AS
SELECT
  id,
  user_id,
  name AS display_name,
  email,
  phone,
  organization AS company,
  title,
  status,
  angel_tier AS tier,
  investment_preferences,
  joined_at,
  created_at,
  updated_at
FROM investors;

-- ── 2c. 其他 View aliases（Pipeline 輔助）──
CREATE OR REPLACE VIEW pip_gates AS SELECT * FROM gates;
CREATE OR REPLACE VIEW pip_alerts AS SELECT * FROM pipeline_alerts;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables
             WHERE table_name = 'form_submissions' AND table_schema = 'public') THEN
    EXECUTE 'CREATE OR REPLACE VIEW pip_form_submissions AS SELECT * FROM form_submissions';
  END IF;
END $$;

-- ── 2d. System aliases ──
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables
             WHERE table_name = 'team_members' AND table_schema = 'public') THEN
    EXECUTE 'CREATE OR REPLACE VIEW sys_team_members AS SELECT * FROM team_members';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.tables
             WHERE table_name = 'events' AND table_schema = 'public') THEN
    EXECUTE 'CREATE OR REPLACE VIEW sys_events AS SELECT * FROM events';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.tables
             WHERE table_name = 'event_startups' AND table_schema = 'public') THEN
    EXECUTE 'CREATE OR REPLACE VIEW sys_event_startups AS SELECT * FROM event_startups';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.tables
             WHERE table_name = 'contacts' AND table_schema = 'public') THEN
    EXECUTE 'CREATE OR REPLACE VIEW sys_contacts AS SELECT * FROM contacts';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.tables
             WHERE table_name = 'documents' AND table_schema = 'public') THEN
    EXECUTE 'CREATE OR REPLACE VIEW sys_documents AS SELECT * FROM documents';
  END IF;
END $$;

-- ============================================================
-- PART 3: 新建表格（FK 指向真實表，非 View）
-- ============================================================

-- ── 3a. module_roles（9 角色權限）──
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

CREATE INDEX IF NOT EXISTS idx_module_roles_user ON module_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_module_roles_role ON module_roles(role);

-- ── 3b. in_app_notifications ──
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

CREATE INDEX IF NOT EXISTS idx_notifications_user ON in_app_notifications(user_id, is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created ON in_app_notifications(created_at DESC);

-- ── 3c. audit_logs ──
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

CREATE INDEX IF NOT EXISTS idx_audit_user ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_logs(created_at DESC);

-- ── 3d. pip_meetings（月會週期）──
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

-- ── 3e. pip_meeting_pitches ──
-- ⚠️ FK 指向 startups（真實表），不指向 pip_startups（View）
CREATE TABLE IF NOT EXISTS pip_meeting_pitches (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  meeting_id      TEXT NOT NULL REFERENCES pip_meetings(id) ON DELETE CASCADE,
  startup_id      UUID NOT NULL REFERENCES startups(id) ON DELETE CASCADE,
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

CREATE INDEX IF NOT EXISTS idx_pitches_meeting ON pip_meeting_pitches(meeting_id);

-- ── 3f. angel_card_responses（C2 隔離）──
-- ⚠️ FK 指向 investors（真實表），不指向 angel_members（View）
CREATE TABLE IF NOT EXISTS angel_card_responses (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  angel_member_id     UUID NOT NULL REFERENCES investors(id) ON DELETE CASCADE,
  startup_id          UUID NOT NULL REFERENCES startups(id) ON DELETE CASCADE,
  meeting_cycle       TEXT NOT NULL REFERENCES pip_meetings(id),
  response            TEXT NOT NULL CHECK (response IN ('interested', 'thinking', 'not_for_me')),
  interest_reason     TEXT,
  cards_viewed        INT NOT NULL DEFAULT 0,
  time_spent_seconds  INT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(angel_member_id, startup_id, meeting_cycle)
);

CREATE INDEX IF NOT EXISTS idx_card_responses_member ON angel_card_responses(angel_member_id);
CREATE INDEX IF NOT EXISTS idx_card_responses_cycle ON angel_card_responses(meeting_cycle);

-- ── 3g. angel_votes（C2 隔離）──
CREATE TABLE IF NOT EXISTS angel_votes (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  angel_member_id       UUID NOT NULL REFERENCES investors(id) ON DELETE CASCADE,
  startup_id            UUID NOT NULL REFERENCES startups(id) ON DELETE CASCADE,
  meeting_cycle         TEXT NOT NULL REFERENCES pip_meetings(id),
  decision              TEXT NOT NULL CHECK (decision IN ('invest', 'pass', 'defer')),
  intended_amount_range TEXT,
  attended_meeting      BOOLEAN NOT NULL DEFAULT false,
  reason                TEXT,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(angel_member_id, startup_id, meeting_cycle)
);

CREATE INDEX IF NOT EXISTS idx_votes_member ON angel_votes(angel_member_id);
CREATE INDEX IF NOT EXISTS idx_votes_cycle ON angel_votes(meeting_cycle);

-- ── 3h. angel_learning_progress ──
CREATE TABLE IF NOT EXISTS angel_learning_progress (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  angel_member_id UUID NOT NULL REFERENCES investors(id) ON DELETE CASCADE,
  content_type    TEXT NOT NULL CHECK (content_type IN ('digest', 'industry_report', 'case_study', 'tutorial')),
  content_id      TEXT NOT NULL,
  read_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  completion_pct  INT NOT NULL DEFAULT 100 CHECK (completion_pct BETWEEN 0 AND 100),
  UNIQUE(angel_member_id, content_type, content_id)
);

CREATE INDEX IF NOT EXISTS idx_learning_member ON angel_learning_progress(angel_member_id);

-- ── 3i. angel_notifications ──
CREATE TABLE IF NOT EXISTS angel_notifications (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  angel_member_id   UUID NOT NULL REFERENCES investors(id) ON DELETE CASCADE,
  notification_type TEXT NOT NULL,
  meeting_cycle     TEXT NOT NULL REFERENCES pip_meetings(id),
  sent_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  channel           TEXT NOT NULL DEFAULT 'in_app' CHECK (channel IN ('email', 'in_app', 'telegram'))
);

CREATE INDEX IF NOT EXISTS idx_angel_notif_member ON angel_notifications(angel_member_id);

-- ============================================================
-- PART 4: Analytics Views
-- ============================================================

-- 月會候選人互動摘要（admin）
CREATE OR REPLACE VIEW v_meeting_candidate_summary AS
SELECT
  s.id,
  s.name_zh,
  s.sector,
  COUNT(cr.id) FILTER (WHERE cr.response = 'interested')   AS interested_count,
  COUNT(cr.id) FILTER (WHERE cr.response = 'thinking')     AS thinking_count,
  COUNT(cr.id) FILTER (WHERE cr.response = 'not_for_me')   AS not_for_me_count,
  COUNT(cr.id)                                              AS total_responses,
  (SELECT COUNT(*) FROM investors WHERE status = 'active') AS total_active_members,
  CASE
    WHEN (SELECT COUNT(*) FROM investors WHERE status = 'active') = 0 THEN 0
    ELSE ROUND(COUNT(cr.id)::NUMERIC / (SELECT COUNT(*) FROM investors WHERE status = 'active') * 100, 1)
  END AS engagement_rate
FROM startups s
LEFT JOIN angel_card_responses cr ON cr.startup_id = s.id
GROUP BY s.id, s.name_zh, s.sector;

-- 投票摘要（admin）
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
FROM startups s
LEFT JOIN angel_votes v ON v.startup_id = s.id
GROUP BY s.id, s.name_zh;

-- Angel 互動度（admin）
CREATE OR REPLACE VIEW v_angel_engagement AS
SELECT
  m.id,
  m.name AS display_name,
  COALESCE(cr_stats.response_rate, 0)     AS card_response_rate,
  COALESCE(v_stats.vote_rate, 0)          AS vote_participation_rate,
  COALESCE(lp_stats.articles_read, 0)     AS articles_read,
  CASE
    WHEN COALESCE(cr_stats.response_rate, 0) >= 70 AND COALESCE(v_stats.vote_rate, 0) >= 70 THEN 'active'
    WHEN COALESCE(cr_stats.response_rate, 0) >= 30 OR COALESCE(v_stats.vote_rate, 0) >= 30 THEN 'moderate'
    ELSE 'low'
  END AS engagement_level
FROM investors m
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
-- PART 5: RLS Policies
-- ============================================================

-- Enable RLS on all new tables
ALTER TABLE module_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE in_app_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE pip_meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE pip_meeting_pitches ENABLE ROW LEVEL SECURITY;
ALTER TABLE angel_card_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE angel_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE angel_learning_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE angel_notifications ENABLE ROW LEVEL SECURITY;

-- ── Helper functions ──
CREATE OR REPLACE FUNCTION has_role(check_role TEXT)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM module_roles
    WHERE user_id = auth.uid()
      AND role = check_role
      AND is_active = true
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION is_admin_tier()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM module_roles
    WHERE user_id = auth.uid()
      AND role IN ('admin', 'staff_admin')
      AND is_active = true
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- 用 investors.user_id 查詢當前使用者的 angel member id
CREATE OR REPLACE FUNCTION my_angel_member_id()
RETURNS UUID AS $$
  SELECT id FROM investors WHERE user_id = auth.uid() LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- ── module_roles ──
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users read own roles' AND tablename = 'module_roles') THEN
    CREATE POLICY "Users read own roles" ON module_roles
      FOR SELECT USING (user_id = auth.uid() OR is_admin_tier());
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins manage roles' AND tablename = 'module_roles') THEN
    CREATE POLICY "Admins manage roles" ON module_roles
      FOR ALL USING (is_admin_tier());
  END IF;
END $$;

-- ── in_app_notifications ──
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users read own notifications' AND tablename = 'in_app_notifications') THEN
    CREATE POLICY "Users read own notifications" ON in_app_notifications
      FOR SELECT USING (user_id = auth.uid());
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users update own notifications' AND tablename = 'in_app_notifications') THEN
    CREATE POLICY "Users update own notifications" ON in_app_notifications
      FOR UPDATE USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'System inserts notifications' AND tablename = 'in_app_notifications') THEN
    CREATE POLICY "System inserts notifications" ON in_app_notifications
      FOR INSERT WITH CHECK (true);
  END IF;
END $$;

-- ── audit_logs ──
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins read audit' AND tablename = 'audit_logs') THEN
    CREATE POLICY "Admins read audit" ON audit_logs
      FOR SELECT USING (is_admin_tier());
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'System inserts audit' AND tablename = 'audit_logs') THEN
    CREATE POLICY "System inserts audit" ON audit_logs
      FOR INSERT WITH CHECK (true);
  END IF;
END $$;

-- ── pip_meetings / pip_meeting_pitches ──
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins manage meetings' AND tablename = 'pip_meetings') THEN
    CREATE POLICY "Admins manage meetings" ON pip_meetings
      FOR ALL USING (is_admin_tier());
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Authenticated read meetings' AND tablename = 'pip_meetings') THEN
    CREATE POLICY "Authenticated read meetings" ON pip_meetings
      FOR SELECT USING (auth.uid() IS NOT NULL);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins manage pitches' AND tablename = 'pip_meeting_pitches') THEN
    CREATE POLICY "Admins manage pitches" ON pip_meeting_pitches
      FOR ALL USING (is_admin_tier());
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Authenticated read pitches' AND tablename = 'pip_meeting_pitches') THEN
    CREATE POLICY "Authenticated read pitches" ON pip_meeting_pitches
      FOR SELECT USING (auth.uid() IS NOT NULL);
  END IF;
END $$;

-- ── startups：加 RLS（admin 全權，angel 唯讀）──
ALTER TABLE startups ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins manage startups' AND tablename = 'startups') THEN
    CREATE POLICY "Admins manage startups" ON startups
      FOR ALL USING (is_admin_tier());
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Angels read startups' AND tablename = 'startups') THEN
    CREATE POLICY "Angels read startups" ON startups
      FOR SELECT USING (has_role('angel_member'));
  END IF;
  -- Service role 不受 RLS 限制（Python 腳本用 service_role key）
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Service full access startups' AND tablename = 'startups') THEN
    CREATE POLICY "Service full access startups" ON startups
      FOR ALL USING (auth.role() = 'service_role');
  END IF;
END $$;

-- ── investors：加 RLS ──
ALTER TABLE investors ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Members read own profile' AND tablename = 'investors') THEN
    CREATE POLICY "Members read own profile" ON investors
      FOR SELECT USING (user_id = auth.uid() OR is_admin_tier());
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Members update own profile' AND tablename = 'investors') THEN
    CREATE POLICY "Members update own profile" ON investors
      FOR UPDATE USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins manage investors' AND tablename = 'investors') THEN
    CREATE POLICY "Admins manage investors" ON investors
      FOR ALL USING (is_admin_tier());
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Service full access investors' AND tablename = 'investors') THEN
    CREATE POLICY "Service full access investors" ON investors
      FOR ALL USING (auth.role() = 'service_role');
  END IF;
END $$;

-- ── angel_card_responses：C2 隔離 ──
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Members read own responses' AND tablename = 'angel_card_responses') THEN
    CREATE POLICY "Members read own responses" ON angel_card_responses
      FOR SELECT USING (angel_member_id = my_angel_member_id() OR is_admin_tier());
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Members insert own responses' AND tablename = 'angel_card_responses') THEN
    CREATE POLICY "Members insert own responses" ON angel_card_responses
      FOR INSERT WITH CHECK (angel_member_id = my_angel_member_id());
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Members update own responses' AND tablename = 'angel_card_responses') THEN
    CREATE POLICY "Members update own responses" ON angel_card_responses
      FOR UPDATE USING (angel_member_id = my_angel_member_id())
      WITH CHECK (angel_member_id = my_angel_member_id());
  END IF;
END $$;

-- ── angel_votes：C2 隔離 ──
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Members read own votes' AND tablename = 'angel_votes') THEN
    CREATE POLICY "Members read own votes" ON angel_votes
      FOR SELECT USING (angel_member_id = my_angel_member_id() OR is_admin_tier());
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Members insert own votes' AND tablename = 'angel_votes') THEN
    CREATE POLICY "Members insert own votes" ON angel_votes
      FOR INSERT WITH CHECK (angel_member_id = my_angel_member_id());
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Members update own votes' AND tablename = 'angel_votes') THEN
    CREATE POLICY "Members update own votes" ON angel_votes
      FOR UPDATE USING (angel_member_id = my_angel_member_id())
      WITH CHECK (angel_member_id = my_angel_member_id());
  END IF;
END $$;

-- ── angel_learning_progress ──
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Members read own learning' AND tablename = 'angel_learning_progress') THEN
    CREATE POLICY "Members read own learning" ON angel_learning_progress
      FOR SELECT USING (angel_member_id = my_angel_member_id() OR is_admin_tier());
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Members insert own learning' AND tablename = 'angel_learning_progress') THEN
    CREATE POLICY "Members insert own learning" ON angel_learning_progress
      FOR INSERT WITH CHECK (angel_member_id = my_angel_member_id());
  END IF;
END $$;

-- ── angel_notifications ──
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Members read own angel notif' AND tablename = 'angel_notifications') THEN
    CREATE POLICY "Members read own angel notif" ON angel_notifications
      FOR SELECT USING (angel_member_id = my_angel_member_id() OR is_admin_tier());
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'System inserts angel notif' AND tablename = 'angel_notifications') THEN
    CREATE POLICY "System inserts angel notif" ON angel_notifications
      FOR INSERT WITH CHECK (true);
  END IF;
END $$;

-- ============================================================
-- PART 6: updated_at Trigger
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 只對有 updated_at 的新表加 trigger（既有表可能已有）
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_module_roles_updated') THEN
    CREATE TRIGGER trg_module_roles_updated BEFORE UPDATE ON module_roles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_pip_meetings_updated') THEN
    CREATE TRIGGER trg_pip_meetings_updated BEFORE UPDATE ON pip_meetings FOR EACH ROW EXECUTE FUNCTION update_updated_at();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_pip_meeting_pitches_updated') THEN
    CREATE TRIGGER trg_pip_meeting_pitches_updated BEFORE UPDATE ON pip_meeting_pitches FOR EACH ROW EXECUTE FUNCTION update_updated_at();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_card_responses_updated') THEN
    CREATE TRIGGER trg_card_responses_updated BEFORE UPDATE ON angel_card_responses FOR EACH ROW EXECUTE FUNCTION update_updated_at();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_votes_updated') THEN
    CREATE TRIGGER trg_votes_updated BEFORE UPDATE ON angel_votes FOR EACH ROW EXECUTE FUNCTION update_updated_at();
  END IF;
END $$;

-- ============================================================
-- VERIFICATION: 跑完後執行以下查詢確認
-- ============================================================
--
-- -- 1. 確認新表
-- SELECT table_name, table_type FROM information_schema.tables
-- WHERE table_schema = 'public'
--   AND table_name IN ('module_roles','in_app_notifications','audit_logs',
--     'pip_meetings','pip_meeting_pitches',
--     'angel_card_responses','angel_votes','angel_learning_progress','angel_notifications')
-- ORDER BY table_name;
--
-- -- 2. 確認 View
-- SELECT table_name FROM information_schema.views
-- WHERE table_schema = 'public'
--   AND table_name IN ('pip_startups','angel_members','pip_gates','pip_alerts')
-- ORDER BY table_name;
--
-- -- 3. 確認 RLS
-- SELECT tablename, policyname FROM pg_policies
-- WHERE schemaname = 'public'
-- ORDER BY tablename, policyname;
--
-- -- 4. 確認 investors 新欄位
-- SELECT column_name, data_type FROM information_schema.columns
-- WHERE table_name = 'investors'
--   AND column_name IN ('user_id','angel_tier','investment_preferences','joined_at');
--
-- -- 5. pip_startups View 讀取測試
-- SELECT id, name_zh, one_liner, pipeline_stage, tier FROM pip_startups LIMIT 5;
--
-- -- 6. angel_members View 讀取測試
-- SELECT id, display_name, company, tier FROM angel_members LIMIT 5;

-- ============================================================
-- ROLLBACK（逆序）
-- ============================================================
--
-- -- Triggers
-- DROP TRIGGER IF EXISTS trg_votes_updated ON angel_votes;
-- DROP TRIGGER IF EXISTS trg_card_responses_updated ON angel_card_responses;
-- DROP TRIGGER IF EXISTS trg_pip_meeting_pitches_updated ON pip_meeting_pitches;
-- DROP TRIGGER IF EXISTS trg_pip_meetings_updated ON pip_meetings;
-- DROP TRIGGER IF EXISTS trg_module_roles_updated ON module_roles;
--
-- -- RLS (drop policies before tables)
-- -- ... 太多 policy，直接 DROP TABLE CASCADE 會一起清
--
-- -- Views
-- DROP VIEW IF EXISTS v_angel_engagement;
-- DROP VIEW IF EXISTS v_vote_summary;
-- DROP VIEW IF EXISTS v_meeting_candidate_summary;
-- DROP VIEW IF EXISTS pip_startups;
-- DROP VIEW IF EXISTS angel_members;
-- DROP VIEW IF EXISTS pip_gates;
-- DROP VIEW IF EXISTS pip_alerts;
-- DROP VIEW IF EXISTS pip_form_submissions;
-- DROP VIEW IF EXISTS sys_team_members;
-- DROP VIEW IF EXISTS sys_events;
-- DROP VIEW IF EXISTS sys_event_startups;
-- DROP VIEW IF EXISTS sys_contacts;
-- DROP VIEW IF EXISTS sys_documents;
--
-- -- Tables (CASCADE removes FK dependencies)
-- DROP TABLE IF EXISTS angel_notifications CASCADE;
-- DROP TABLE IF EXISTS angel_learning_progress CASCADE;
-- DROP TABLE IF EXISTS angel_votes CASCADE;
-- DROP TABLE IF EXISTS angel_card_responses CASCADE;
-- DROP TABLE IF EXISTS pip_meeting_pitches CASCADE;
-- DROP TABLE IF EXISTS pip_meetings CASCADE;
-- DROP TABLE IF EXISTS audit_logs CASCADE;
-- DROP TABLE IF EXISTS in_app_notifications CASCADE;
-- DROP TABLE IF EXISTS module_roles CASCADE;
--
-- -- Revert ALTER TABLE
-- ALTER TABLE startups DROP COLUMN IF EXISTS gate0_score;
-- ALTER TABLE startups DROP COLUMN IF EXISTS gate1_score;
-- ALTER TABLE investors DROP COLUMN IF EXISTS user_id;
-- ALTER TABLE investors DROP COLUMN IF EXISTS angel_tier;
-- ALTER TABLE investors DROP COLUMN IF EXISTS investment_preferences;
-- ALTER TABLE investors DROP COLUMN IF EXISTS joined_at;
--
-- -- Functions
-- DROP FUNCTION IF EXISTS my_angel_member_id();
-- DROP FUNCTION IF EXISTS is_admin_tier();
-- DROP FUNCTION IF EXISTS has_role(TEXT);
-- DROP FUNCTION IF EXISTS update_updated_at();
