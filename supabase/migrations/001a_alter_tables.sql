-- ============================================================
-- PART 1: ALTER TABLE — 補齊既有表的缺失欄位
-- 先單獨跑這段，確認成功後再跑 001b
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── startups 補欄位 ──
ALTER TABLE startups ADD COLUMN IF NOT EXISTS gate0_score NUMERIC(5,2);
ALTER TABLE startups ADD COLUMN IF NOT EXISTS gate1_score NUMERIC(5,2);
ALTER TABLE startups ADD COLUMN IF NOT EXISTS observation_pool BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE startups ADD COLUMN IF NOT EXISTS observation_reason TEXT;
ALTER TABLE startups ADD COLUMN IF NOT EXISTS observation_entered_at TIMESTAMPTZ;
ALTER TABLE startups ADD COLUMN IF NOT EXISTS reactivated_at TIMESTAMPTZ;
ALTER TABLE startups ADD COLUMN IF NOT EXISTS reactivated_reason TEXT;

-- ── investors 補欄位 ──
ALTER TABLE investors ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_investors_user_id ON investors(user_id) WHERE user_id IS NOT NULL;
ALTER TABLE investors ADD COLUMN IF NOT EXISTS angel_tier TEXT CHECK (angel_tier IN ('founding', 'regular', 'associate'));
ALTER TABLE investors ADD COLUMN IF NOT EXISTS investment_preferences JSONB DEFAULT '{}';
ALTER TABLE investors ADD COLUMN IF NOT EXISTS joined_at TIMESTAMPTZ;

-- 驗證
SELECT 'startups columns added:' AS info,
  COUNT(*) FILTER (WHERE column_name = 'observation_pool') AS obs_pool,
  COUNT(*) FILTER (WHERE column_name = 'gate0_score') AS g0_score
FROM information_schema.columns WHERE table_name = 'startups';
