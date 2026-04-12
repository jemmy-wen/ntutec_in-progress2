-- ============================================================
-- NTUTEC Platform — Migration 007: Public Mentors Table
-- ============================================================
-- Date: 2026-04-12
-- Creates the public-facing mentors table for the website's
-- 業師陣容 page. Separate from mentor_profiles (Mentor Clinic module).
-- Depends on: 001_unified_platform.sql
-- ============================================================

CREATE TABLE IF NOT EXISTS mentors (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name             TEXT NOT NULL,
  title            TEXT,                          -- 職稱 (e.g. 富旌創投 創始合夥人)
  highlight        TEXT,                          -- 顯示標題（優先於 title）
  category         TEXT NOT NULL DEFAULT 'expert' -- vc | founder | exec | expert
                   CHECK (category IN ('vc', 'founder', 'exec', 'expert')),
  photo_url        TEXT,                          -- /mentors/... or full URL
  social_url       TEXT,                          -- LinkedIn or Facebook URL
  bio              TEXT,                          -- 詳細介紹 (for individual page)
  is_active        BOOLEAN NOT NULL DEFAULT true, -- shown on listing page
  is_new_2026      BOOLEAN NOT NULL DEFAULT false,
  sort_order       INT NOT NULL DEFAULT 0,        -- within category
  slug             TEXT UNIQUE,                   -- URL slug for /mentors/[slug]
  extended_profile JSONB NOT NULL DEFAULT '{}',   -- extra data (awards, tags etc)
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_mentors_active_order ON mentors(is_active, category, sort_order);
CREATE INDEX idx_mentors_slug ON mentors(slug) WHERE slug IS NOT NULL;

-- Row Level Security
ALTER TABLE mentors ENABLE ROW LEVEL SECURITY;

-- Public can read active mentors
CREATE POLICY "Public read active mentors"
  ON mentors FOR SELECT
  USING (is_active = true);

-- Authenticated users (admin/staff) can manage all
CREATE POLICY "Admin manage mentors"
  ON mentors FOR ALL
  USING (auth.role() = 'authenticated');

-- Updated_at trigger (reuses function from migration 001)
CREATE TRIGGER trg_mentors_updated
  BEFORE UPDATE ON mentors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- Done.
-- ============================================================
