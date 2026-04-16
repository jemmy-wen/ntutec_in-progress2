-- Portal tokens: time-limited, single-use links for startups/mentors to self-edit their profiles
CREATE TABLE IF NOT EXISTS portal_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token TEXT NOT NULL UNIQUE,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('startup', 'mentor')),
  entity_id UUID NOT NULL,
  email TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '7 days'),
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_portal_tokens_token ON portal_tokens (token);
CREATE INDEX IF NOT EXISTS idx_portal_tokens_entity ON portal_tokens (entity_type, entity_id);

ALTER TABLE portal_tokens ENABLE ROW LEVEL SECURITY;

-- No public access; all operations via service role in API routes
CREATE POLICY "Service role only" ON portal_tokens FOR ALL USING (auth.role() = 'service_role');
