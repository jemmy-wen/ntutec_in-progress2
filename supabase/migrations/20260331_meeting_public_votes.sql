-- Public votes for monthly Angel Club meeting (non-member, anonymous allowed)
-- 2026-03-31: Created for 2026-04 meeting cycle

CREATE TABLE IF NOT EXISTS meeting_public_votes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  meeting_cycle text NOT NULL DEFAULT '2026-04',
  startup_id text NOT NULL,
  startup_name text NOT NULL,
  voter_name text,
  is_member boolean DEFAULT false,
  score_interest int CHECK (score_interest BETWEEN 1 AND 5),
  score_business int CHECK (score_business BETWEEN 1 AND 5),
  score_team int CHECK (score_team BETWEEN 1 AND 5),
  score_market int CHECK (score_market BETWEEN 1 AND 5),
  recommendation text CHECK (recommendation IN ('follow_up', 'watch', 'pass')),
  comment text,
  created_at timestamptz DEFAULT now()
);

-- RLS: anyone can insert, only admin/service_role can read
ALTER TABLE meeting_public_votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert public votes"
  ON meeting_public_votes FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Only admin can read public votes"
  ON meeting_public_votes FOR SELECT
  USING (
    auth.role() = 'service_role' OR
    (auth.jwt() ->> 'role') = 'admin'
  );

-- Grant anon INSERT so unauthenticated users can submit
GRANT INSERT ON meeting_public_votes TO anon;
GRANT SELECT ON meeting_public_votes TO authenticated;
