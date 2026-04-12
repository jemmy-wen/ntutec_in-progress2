-- ============================================================
-- NTUTEC Platform — Unified Form Submissions Table
-- ============================================================
-- Version: 006
-- Date: 2026-04-12
-- Purpose: Unified form_submissions table for all website forms
--   contact, apply, angel_apply, pitch, consulting
--   Replaces ad-hoc inserts with a consistent schema.
-- ============================================================
--
-- NOTE: form_submissions may already exist (created by earlier
-- contact/webhook handlers). This migration is idempotent.
-- ============================================================

-- ────────────────────────────────────────────────────────
-- 1. Create or extend form_submissions
-- ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS form_submissions (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Unified type (replaces loose form_type text in earlier handlers)
  type               TEXT NOT NULL DEFAULT 'contact',
  -- form_type kept for backwards compat with contact/webhook handlers
  form_type          TEXT,
  data               JSONB NOT NULL DEFAULT '{}',
  status             TEXT NOT NULL DEFAULT 'new'
    CHECK (status IN ('new', 'read', 'replied', 'archived')),
  assigned_to        TEXT,
  -- Top-level indexed fields for fast admin queries
  email              TEXT,
  name               TEXT,
  -- Legacy columns (used by contact/webhook routes)
  submitter_name     TEXT,
  submitter_email    TEXT,
  submitter_phone    TEXT,
  submitter_org      TEXT,
  related_startup_id UUID,
  submitted_at       TIMESTAMPTZ,
  created_at         TIMESTAMPTZ DEFAULT NOW(),
  updated_at         TIMESTAMPTZ DEFAULT NOW()
);

-- Add new columns to existing table (idempotent via DO block)
DO $$
BEGIN
  -- type column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'form_submissions' AND column_name = 'type'
  ) THEN
    ALTER TABLE form_submissions ADD COLUMN type TEXT NOT NULL DEFAULT 'contact';
  END IF;

  -- email column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'form_submissions' AND column_name = 'email'
  ) THEN
    ALTER TABLE form_submissions ADD COLUMN email TEXT;
  END IF;

  -- name column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'form_submissions' AND column_name = 'name'
  ) THEN
    ALTER TABLE form_submissions ADD COLUMN name TEXT;
  END IF;

  -- assigned_to column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'form_submissions' AND column_name = 'assigned_to'
  ) THEN
    ALTER TABLE form_submissions ADD COLUMN assigned_to TEXT;
  END IF;

  -- updated_at column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'form_submissions' AND column_name = 'updated_at'
  ) THEN
    ALTER TABLE form_submissions ADD COLUMN updated_at TIMESTAMPTZ DEFAULT NOW();
  END IF;
END $$;

-- ────────────────────────────────────────────────────────
-- 2. RLS
-- ────────────────────────────────────────────────────────
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

-- Public can insert (form submissions from website)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'form_submissions' AND policyname = 'Public insert'
  ) THEN
    CREATE POLICY "Public insert" ON form_submissions
      FOR INSERT WITH CHECK (true);
  END IF;
END $$;

-- Authenticated users (admins) can read all
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'form_submissions' AND policyname = 'Admin read all'
  ) THEN
    CREATE POLICY "Admin read all" ON form_submissions
      FOR SELECT USING (auth.role() = 'authenticated');
  END IF;
END $$;

-- Authenticated users (admins) can update status
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'form_submissions' AND policyname = 'Admin update'
  ) THEN
    CREATE POLICY "Admin update" ON form_submissions
      FOR UPDATE USING (auth.role() = 'authenticated');
  END IF;
END $$;

-- ────────────────────────────────────────────────────────
-- 3. Indexes
-- ────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_form_submissions_status
  ON form_submissions(status, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_form_submissions_type
  ON form_submissions(type);

CREATE INDEX IF NOT EXISTS idx_form_submissions_email
  ON form_submissions(email);

-- ────────────────────────────────────────────────────────
-- 4. Auto-update updated_at
-- ────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_form_submissions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_form_submissions_updated_at ON form_submissions;
CREATE TRIGGER trg_form_submissions_updated_at
  BEFORE UPDATE ON form_submissions
  FOR EACH ROW EXECUTE FUNCTION update_form_submissions_updated_at();

-- ────────────────────────────────────────────────────────
-- 5. Backfill type from form_type for existing rows
-- ────────────────────────────────────────────────────────
UPDATE form_submissions
SET type = COALESCE(form_type, 'contact'),
    email = COALESCE(email, submitter_email),
    name = COALESCE(name, submitter_name)
WHERE type = 'contact' AND form_type IS NOT NULL AND form_type != 'contact';
