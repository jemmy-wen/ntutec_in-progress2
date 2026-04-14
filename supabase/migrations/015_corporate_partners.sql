-- ============================================================
-- NTUTEC Platform — Migration 015: Corporate Partners (WP salvage)
-- ============================================================
-- Date: 2026-04-14
-- Purpose: Store 49 logos salvaged from legacy WP page 3018
--          (歷屆加速器合作企業). 21 canonical displayed, 28 hidden
--          (dupes / placeholders / NTUTEC self logo / ambiguous).
-- Depends on: 001_unified_platform.sql (update_updated_at fn)
-- ============================================================

CREATE TABLE IF NOT EXISTS corporate_partners (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Display fields
  name              TEXT NOT NULL,          -- canonical (cleaned) name
  wp_original_name  TEXT,                   -- raw WP post_title (for traceback)
  logo_local_path   TEXT NOT NULL,          -- /partners/wp/{id}.{ext}
  logo_url_wp       TEXT,                   -- original WP URL (may rot)

  -- Classification
  category          TEXT,                   -- electronics/finance/media/government/...
  is_displayed      BOOLEAN NOT NULL DEFAULT true,
  display_order     INT NOT NULL DEFAULT 100,

  -- Provenance
  attachment_id     INT UNIQUE NOT NULL,    -- WP wp_posts.ID for attachment (dedup key)
  uploaded_at       TIMESTAMPTZ,            -- WP original upload time

  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_corporate_partners_displayed
  ON corporate_partners (is_displayed, display_order) WHERE is_displayed = true;
CREATE INDEX IF NOT EXISTS idx_corporate_partners_category
  ON corporate_partners (category);

DROP TRIGGER IF EXISTS trg_corporate_partners_updated ON corporate_partners;
CREATE TRIGGER trg_corporate_partners_updated
  BEFORE UPDATE ON corporate_partners
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Public read (logos are marketing material, no RLS sensitivity)
ALTER TABLE corporate_partners ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS corporate_partners_public_read ON corporate_partners;
CREATE POLICY corporate_partners_public_read
  ON corporate_partners FOR SELECT
  USING (true);

COMMENT ON TABLE corporate_partners IS
  'Legacy WP corporate partner logos (page 3018, 2019-2024). 49 raw rows, 21 canonical displayed.';
