-- Migration 003: Storage Bucket + Onboarding Column + BP Storage Path
-- Date: 2026-03-31
-- Features: F1-1 (Storage), F-006 fix (onboarding_completed)

-- ═══════════════════════════════════════════════════════════════
-- Part 1: Add onboarding_completed to angel_members (underlying investors table)
-- ═══════════════════════════════════════════════════════════════

DO $$
BEGIN
  -- angel_members is a view alias over investors table
  -- Check if column already exists before adding
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'investors' AND column_name = 'onboarding_completed'
  ) THEN
    ALTER TABLE investors ADD COLUMN onboarding_completed BOOLEAN DEFAULT FALSE;
  END IF;
END $$;

-- ═══════════════════════════════════════════════════════════════
-- Part 2: Add bp_storage_path to startups table
-- ═══════════════════════════════════════════════════════════════

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'startups' AND column_name = 'bp_storage_path'
  ) THEN
    ALTER TABLE startups ADD COLUMN bp_storage_path TEXT;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'startups' AND column_name = 'bp_uploaded_at'
  ) THEN
    ALTER TABLE startups ADD COLUMN bp_uploaded_at TIMESTAMPTZ;
  END IF;
END $$;

-- ═══════════════════════════════════════════════════════════════
-- Part 3: Create Storage Bucket (bp-files)
-- ═══════════════════════════════════════════════════════════════
-- NOTE: Supabase Storage buckets must be created via the Dashboard or API,
-- not via SQL migration. Run the following via Supabase Management API:
--
--   INSERT INTO storage.buckets (id, name, public)
--   VALUES ('bp-files', 'bp-files', false)
--   ON CONFLICT (id) DO NOTHING;
--
-- Or use the Dashboard: Storage → New Bucket → "bp-files" (private)

-- Storage RLS Policies (these CAN be applied via SQL)

-- Allow authenticated users to read BP files (signed URLs check auth)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'bp_files_select' AND tablename = 'objects'
  ) THEN
    CREATE POLICY bp_files_select ON storage.objects
      FOR SELECT
      USING (bucket_id = 'bp-files' AND auth.role() = 'authenticated');
  END IF;
END $$;

-- Allow service_role to insert BP files (via ntutec-core pipeline)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'bp_files_insert' AND tablename = 'objects'
  ) THEN
    CREATE POLICY bp_files_insert ON storage.objects
      FOR INSERT
      WITH CHECK (bucket_id = 'bp-files' AND auth.role() = 'service_role');
  END IF;
END $$;

-- Allow service_role to delete BP files (cleanup)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'bp_files_delete' AND tablename = 'objects'
  ) THEN
    CREATE POLICY bp_files_delete ON storage.objects
      FOR DELETE
      USING (bucket_id = 'bp-files' AND auth.role() = 'service_role');
  END IF;
END $$;

-- ═══════════════════════════════════════════════════════════════
-- Part 4: Update angel_members view to include onboarding_completed
-- ═══════════════════════════════════════════════════════════════
-- If angel_members is a view, it needs to be recreated to include the new column.
-- This is a safe CREATE OR REPLACE if it's a simple view.

-- Check if angel_members is a view (not a table)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.views
    WHERE table_name = 'angel_members' AND table_schema = 'public'
  ) THEN
    -- Drop and recreate to include onboarding_completed
    -- We use dynamic SQL to handle the view recreation safely
    EXECUTE '
      CREATE OR REPLACE VIEW angel_members AS
      SELECT
        id,
        user_id,
        name AS display_name,
        email,
        phone,
        company,
        title,
        COALESCE(status, ''active'') AS status,
        angel_tier AS tier,
        investment_preferences,
        onboarding_completed,
        joined_at,
        created_at,
        updated_at
      FROM investors
      WHERE angel_tier IS NOT NULL
    ';
  END IF;
END $$;
