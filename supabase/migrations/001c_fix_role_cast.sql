-- ============================================================
-- 001c: 修復 role_type enum 衝突
-- 原因：module_roles.role 是 enum role_type，非 TEXT
-- ============================================================

-- 先確認 role_type enum 存在
SELECT typname, enumlabel
FROM pg_type t JOIN pg_enum e ON t.oid = e.enumtypid
WHERE typname = 'role_type'
ORDER BY enumsortorder;

-- 修復 has_role：cast check_role 為 role_type
CREATE OR REPLACE FUNCTION has_role(check_role TEXT)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM module_roles
    WHERE user_id = auth.uid()
      AND role = check_role::role_type
      AND is_active = true
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- 修復 is_admin_tier：用 enum 值
CREATE OR REPLACE FUNCTION is_admin_tier()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM module_roles
    WHERE user_id = auth.uid()
      AND role IN ('admin'::role_type, 'staff_admin'::role_type)
      AND is_active = true
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;
