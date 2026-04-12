-- ============================================================
-- NTUTEC Platform — User Profiles Table
-- ============================================================
-- Version: 001
-- Date: 2026-04-13
-- Purpose: Universal user profile record auto-created on first login.
--   Every auth.users entry gets a matching profiles row (upserted in callback).
--   Enables /my page, navbar display name, and future personalization.
-- ============================================================

CREATE TABLE IF NOT EXISTS profiles (
  id           UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email        TEXT,
  display_name TEXT,
  role         TEXT DEFAULT 'user',
  avatar_url   TEXT,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "Users read own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Service role (admin client) can read all profiles
-- (used in callback route and admin dashboard)
-- Note: bypassed automatically by service role key, policy below is for anon/authenticated
CREATE POLICY "Admin read all profiles"
  ON profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM module_roles
      WHERE module_roles.user_id = auth.uid()
        AND module_roles.role IN ('admin', 'staff_admin')
        AND module_roles.is_active = true
    )
  );

-- Allow upsert from callback (auth trigger / service role bypasses RLS anyway)
-- This INSERT policy lets the edge function / server-side admin client write profiles
CREATE POLICY "Service can insert profiles"
  ON profiles FOR INSERT
  WITH CHECK (true);
