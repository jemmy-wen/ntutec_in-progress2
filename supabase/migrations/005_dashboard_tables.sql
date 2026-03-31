-- ============================================================
-- NTUTEC Platform — Dashboard Extension Tables
-- ============================================================
-- Version: 005
-- Date: 2026-04-01
-- Purpose: Command Center data sources migrated from markdown to Supabase
--   sys_ogsm_measures  — OGSM M1-M8 tracking (from Howard_OGSM_2026.md)
--   sys_ceo_decisions   — CEO Decision Queue (from CEO_Decision_Queue.md)
--   sys_projects        — Project status tracking (from CLAUDE.md)
-- ============================================================

-- ────────────────────────────────────────────────────────
-- 1. OGSM Measures (M1-M8)
-- ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS sys_ogsm_measures (
  id            TEXT PRIMARY KEY,           -- 'M1', 'M2', ...
  name          TEXT NOT NULL,              -- e.g. 'Pipeline 轉化率 G0→月會'
  strategy      TEXT,                       -- e.g. 'S1'
  goal          TEXT,                       -- e.g. 'G1'
  target        TEXT NOT NULL,              -- e.g. '≥15%'
  current_value TEXT,                       -- e.g. '12.5%'
  pct           INTEGER DEFAULT 0,          -- 0-100 progress
  status        TEXT DEFAULT 'pending'
    CHECK (status IN ('on_track', 'at_risk', 'blocked', 'done', 'pending')),
  source_hint   TEXT,                       -- CTA hint for Claude
  updated_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_by    TEXT DEFAULT 'system'       -- 'system', 'howard', 'claude'
);

-- ────────────────────────────────────────────────────────
-- 2. CEO Decision Queue
-- ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS sys_ceo_decisions (
  id            TEXT PRIMARY KEY,           -- 'D001', 'D002', ...
  subject       TEXT NOT NULL,
  priority      TEXT DEFAULT 'medium'
    CHECK (priority IN ('critical', 'high', 'medium', 'low')),
  ask           TEXT,                       -- What needs to be decided
  deadline      DATE,
  status        TEXT DEFAULT 'pending'
    CHECK (status IN ('pending', 'sent', 'decided', 'cancelled')),
  decision      TEXT,                       -- Result when decided
  related_file  TEXT,                       -- e.g. 'Gate_SOP_v0.8.md'
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  resolved_at   TIMESTAMPTZ,
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ────────────────────────────────────────────────────────
-- 3. Project Status Tracking
-- ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS sys_projects (
  code          TEXT PRIMARY KEY,           -- 'P001', 'P002', ...
  name          TEXT NOT NULL,
  description   TEXT,
  status        TEXT DEFAULT 'active'
    CHECK (status IN ('active', 'paused', 'frozen', 'archived', 'completed')),
  progress      INTEGER DEFAULT 0,          -- 0-100
  strategy      TEXT,                       -- aligned OGSM strategy 'S1', 'S2', ...
  next_action   TEXT,                       -- what's next
  deadline      DATE,
  updated_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_by    TEXT DEFAULT 'system'
);

-- ────────────────────────────────────────────────────────
-- RLS Policies
-- ────────────────────────────────────────────────────────
ALTER TABLE sys_ogsm_measures ENABLE ROW LEVEL SECURITY;
ALTER TABLE sys_ceo_decisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE sys_projects ENABLE ROW LEVEL SECURITY;

-- Read: admin + staff_admin
CREATE POLICY "admin_read_ogsm" ON sys_ogsm_measures FOR SELECT
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff_admin'));
CREATE POLICY "admin_read_decisions" ON sys_ceo_decisions FOR SELECT
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff_admin'));
CREATE POLICY "admin_read_projects" ON sys_projects FOR SELECT
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff_admin'));

-- Write: service_role only (via API / Claude automation)
CREATE POLICY "service_write_ogsm" ON sys_ogsm_measures FOR ALL
  USING (auth.role() = 'service_role');
CREATE POLICY "service_write_decisions" ON sys_ceo_decisions FOR ALL
  USING (auth.role() = 'service_role');
CREATE POLICY "service_write_projects" ON sys_projects FOR ALL
  USING (auth.role() = 'service_role');
