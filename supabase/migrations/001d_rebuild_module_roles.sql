-- ============================================================
-- 001d: 砍掉 module_roles（空表）重建為 TEXT，避免 enum 衝突
-- ============================================================

-- 先確認是空表
SELECT COUNT(*) AS row_count FROM module_roles;

-- 砍掉（CASCADE 會一起清 RLS policy）
DROP TABLE IF EXISTS module_roles CASCADE;

-- 砍掉舊 enum（如果沒其他表用）
DROP TYPE IF EXISTS role_type CASCADE;

-- 重建為 TEXT
CREATE TABLE module_roles (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module      TEXT NOT NULL DEFAULT 'platform',
  role        TEXT NOT NULL CHECK (role IN (
    'admin', 'staff_admin', 'staff_accelerator',
    'angel_member', 'mentor', 'team',
    'startup_incubated', 'startup_fundraising', 'vc_partner'
  )),
  is_active   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, module, role)
);

CREATE INDEX idx_module_roles_user ON module_roles(user_id);
CREATE INDEX idx_module_roles_role ON module_roles(role);

-- RLS
ALTER TABLE module_roles ENABLE ROW LEVEL SECURITY;

-- Functions（現在 role 是 TEXT，直接比對）
CREATE OR REPLACE FUNCTION has_role(check_role TEXT)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM module_roles
    WHERE user_id = auth.uid()
      AND role = check_role
      AND is_active = true
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION is_admin_tier()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM module_roles
    WHERE user_id = auth.uid()
      AND role IN ('admin', 'staff_admin')
      AND is_active = true
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Policies
CREATE POLICY "Users read own roles" ON module_roles
  FOR SELECT USING (user_id = auth.uid() OR is_admin_tier());
CREATE POLICY "Admins manage roles" ON module_roles
  FOR ALL USING (is_admin_tier());

-- Trigger
CREATE TRIGGER trg_module_roles_updated BEFORE UPDATE ON module_roles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 驗證
SELECT 'module_roles rebuilt' AS status,
  (SELECT data_type FROM information_schema.columns WHERE table_name = 'module_roles' AND column_name = 'role') AS role_type;
