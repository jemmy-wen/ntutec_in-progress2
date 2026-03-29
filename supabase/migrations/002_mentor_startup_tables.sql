-- ============================================================
-- NTUTEC Platform — Migration 002: Mentor + Startup Tables
-- ============================================================
-- Date: 2026-03-29
-- Adds tables for Mentor Clinic module (P014 migration) and Startup profiles.
-- Depends on: 001_unified_platform.sql
-- ============================================================

-- ============================================================
-- 1. MENTOR: Profiles
-- ============================================================
CREATE TABLE IF NOT EXISTS mentor_profiles (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID UNIQUE REFERENCES auth.users(id) ON DELETE SET NULL,
  display_name    TEXT NOT NULL,
  email           TEXT,
  phone           TEXT,
  company         TEXT,
  title           TEXT,
  specialties     TEXT[] DEFAULT '{}',
  bio             TEXT DEFAULT '',
  max_sessions    INT DEFAULT 4,     -- max sessions per cycle
  status          TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending')),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_mentor_profiles_user ON mentor_profiles(user_id);
CREATE INDEX idx_mentor_profiles_status ON mentor_profiles(status);

-- ============================================================
-- 2. MENTOR: Available Slots
-- ============================================================
CREATE TABLE IF NOT EXISTS mentor_slots (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mentor_id     UUID NOT NULL REFERENCES mentor_profiles(id) ON DELETE CASCADE,
  slot_date     DATE NOT NULL,
  slot_time     TEXT NOT NULL,           -- e.g. '09:00', '14:00'
  is_available  BOOLEAN NOT NULL DEFAULT true,
  booked_by     UUID REFERENCES auth.users(id),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(mentor_id, slot_date, slot_time)
);

CREATE INDEX idx_mentor_slots_mentor ON mentor_slots(mentor_id);
CREATE INDEX idx_mentor_slots_date ON mentor_slots(slot_date);

-- ============================================================
-- 3. MENTOR: Matches (mentor ↔ team)
-- ============================================================
CREATE TABLE IF NOT EXISTS mentor_matches (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cycle_id        TEXT REFERENCES pip_meetings(id),
  mentor_id       UUID NOT NULL REFERENCES mentor_profiles(id) ON DELETE CASCADE,
  team_startup_id UUID REFERENCES pip_startups(id),
  team_user_id    UUID REFERENCES auth.users(id),
  match_score     NUMERIC(5,2),
  status          TEXT NOT NULL DEFAULT 'pending' CHECK (status IN (
    'pending', 'confirmed', 'scheduled', 'completed', 'cancelled', 'no_show'
  )),
  session_date    DATE,
  session_time    TEXT,
  location        TEXT,
  notes           TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_mentor_matches_mentor ON mentor_matches(mentor_id);
CREATE INDEX idx_mentor_matches_cycle ON mentor_matches(cycle_id);

-- ============================================================
-- 4. MENTOR: Feedback
-- ============================================================
CREATE TABLE IF NOT EXISTS mentor_feedback (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mentor_id           UUID NOT NULL REFERENCES mentor_profiles(id) ON DELETE CASCADE,
  match_id            UUID NOT NULL REFERENCES mentor_matches(id) ON DELETE CASCADE,
  session_quality     INT CHECK (session_quality BETWEEN 1 AND 5),
  team_preparedness   INT CHECK (team_preparedness BETWEEN 1 AND 5),
  team_coachability   INT CHECK (team_coachability BETWEEN 1 AND 5),
  key_issues          TEXT DEFAULT '',
  recommendations     TEXT DEFAULT '',
  follow_up_needed    BOOLEAN DEFAULT false,
  notes               TEXT DEFAULT '',
  submitted_at        TIMESTAMPTZ,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(mentor_id, match_id)
);

CREATE INDEX idx_mentor_feedback_mentor ON mentor_feedback(mentor_id);
CREATE INDEX idx_mentor_feedback_match ON mentor_feedback(match_id);

-- ============================================================
-- 5. STARTUP: Profiles (extended from pip_startups)
-- ============================================================
CREATE TABLE IF NOT EXISTS startup_profiles (
  id                          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pip_startup_id              UUID UNIQUE REFERENCES pip_startups(id),
  name                        TEXT NOT NULL,
  one_liner                   TEXT,
  sector                      TEXT,
  stage                       TEXT DEFAULT 'pre_seed',
  founded_year                INT,
  team_size                   INT,
  website                     TEXT,
  description                 TEXT,
  traction                    TEXT,
  fundraising_target          TEXT,
  fundraising_use             TEXT,
  team_user_ids               UUID[] DEFAULT '{}',
  mentor_sessions_remaining   INT DEFAULT 3,
  program                     TEXT,       -- current program name
  created_at                  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at                  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_startup_profiles_pip ON startup_profiles(pip_startup_id);

-- ============================================================
-- 6. RLS for new tables
-- ============================================================

ALTER TABLE mentor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentor_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentor_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentor_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE startup_profiles ENABLE ROW LEVEL SECURITY;

-- Mentor profiles: own + admins
CREATE POLICY "Mentors read own profile" ON mentor_profiles
  FOR SELECT USING (user_id = auth.uid() OR is_admin_tier());
CREATE POLICY "Mentors update own profile" ON mentor_profiles
  FOR UPDATE USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "Admins manage mentor profiles" ON mentor_profiles
  FOR ALL USING (is_admin_tier());

-- Mentor slots: own + admins + teams can read available
CREATE POLICY "Mentors manage own slots" ON mentor_slots
  FOR ALL USING (
    mentor_id IN (SELECT id FROM mentor_profiles WHERE user_id = auth.uid())
    OR is_admin_tier()
  );
CREATE POLICY "Teams read available slots" ON mentor_slots
  FOR SELECT USING (
    is_available = true
    AND has_role('team')
  );

-- Mentor matches: involved parties + admins
CREATE POLICY "Match participants read" ON mentor_matches
  FOR SELECT USING (
    mentor_id IN (SELECT id FROM mentor_profiles WHERE user_id = auth.uid())
    OR team_user_id = auth.uid()
    OR is_admin_tier()
  );
CREATE POLICY "Admins manage matches" ON mentor_matches
  FOR ALL USING (is_admin_tier());

-- Mentor feedback: own + admins
CREATE POLICY "Mentors manage own feedback" ON mentor_feedback
  FOR ALL USING (
    mentor_id IN (SELECT id FROM mentor_profiles WHERE user_id = auth.uid())
    OR is_admin_tier()
  );

-- Startup profiles: team members + admins + mentors(read)
CREATE POLICY "Team members manage own startup" ON startup_profiles
  FOR ALL USING (
    auth.uid() = ANY(team_user_ids)
    OR is_admin_tier()
  );
CREATE POLICY "Mentors read startup profiles" ON startup_profiles
  FOR SELECT USING (has_role('mentor'));

-- ============================================================
-- 7. Updated_at triggers
-- ============================================================
CREATE TRIGGER trg_mentor_profiles_updated BEFORE UPDATE ON mentor_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_mentor_matches_updated BEFORE UPDATE ON mentor_matches FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_mentor_feedback_updated BEFORE UPDATE ON mentor_feedback FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_startup_profiles_updated BEFORE UPDATE ON startup_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- Done.
-- ============================================================
