-- ============================================================
-- NTUTEC Platform — Migration 010: Historical Startups
-- ============================================================
-- Date: 2026-04-14
-- Purpose: Store 479 historical incubated startups (2016–2025)
--          salvaged from the legacy WordPress site. Public read,
--          admin write. Seed data lives in migration 011.
-- Depends on: 001_unified_platform.sql (update_updated_at fn)
-- ============================================================

CREATE TABLE IF NOT EXISTS historical_startups (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Cohort year: '2016以前' for pre-2017 legacy batch, else '2017'..'2025'
  year              TEXT NOT NULL,
  year_sortable     INT GENERATED ALWAYS AS (
                      CASE WHEN year = '2016以前' THEN 2016 ELSE year::INT END
                    ) STORED,

  -- Core display fields
  name              TEXT NOT NULL,
  logo_url          TEXT,                          -- original WP URL (may rot)
  logo_local_path   TEXT,                          -- /historical/{year}/{file} once downloaded
  description       TEXT,
  external_link     TEXT,                          -- WP `link` column (often startups index)

  -- Provenance + enrichment
  source_post_id    INT,                           -- WP post_id for traceback
  uniform_number    TEXT,                          -- 統編 (to be fuzzy-matched vs P002 later)
  is_featured       BOOLEAN NOT NULL DEFAULT false,
  category          TEXT,                          -- free-form tag, may classify later
  tags              TEXT[] NOT NULL DEFAULT '{}',

  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Prevent accidental duplicate seed; enables UPSERT on re-run
  CONSTRAINT historical_startups_year_name_key UNIQUE (year, name)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_historical_startups_year
  ON historical_startups (year_sortable DESC);
CREATE INDEX IF NOT EXISTS idx_historical_startups_name
  ON historical_startups (name);
CREATE INDEX IF NOT EXISTS idx_historical_startups_featured
  ON historical_startups (is_featured) WHERE is_featured = true;

-- Updated_at trigger (function defined in 001_unified_platform.sql)
DROP TRIGGER IF EXISTS trg_historical_startups_updated ON historical_startups;
CREATE TRIGGER trg_historical_startups_updated
  BEFORE UPDATE ON historical_startups
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- Row Level Security
-- Pattern follows migration 007 (public mentors table)
-- ============================================================
ALTER TABLE historical_startups ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read historical startups" ON historical_startups;
CREATE POLICY "Public read historical startups"
  ON historical_startups FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Admin manage historical startups" ON historical_startups;
CREATE POLICY "Admin manage historical startups"
  ON historical_startups FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- ============================================================
-- Done.
-- ============================================================
