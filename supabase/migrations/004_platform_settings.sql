-- sys_platform_settings: key-value store for platform-level configuration
-- Naming follows Platform Architecture v0.4: sys_* prefix for system tables

CREATE TABLE IF NOT EXISTS sys_platform_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT '',
  updated_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE sys_platform_settings ENABLE ROW LEVEL SECURITY;

-- Admin-only read/write
CREATE POLICY "admin_read_settings" ON sys_platform_settings
  FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM module_roles
      WHERE role IN ('admin', 'staff_admin') AND is_active = true
    )
  );

CREATE POLICY "admin_write_settings" ON sys_platform_settings
  FOR ALL USING (
    auth.uid() IN (
      SELECT user_id FROM module_roles
      WHERE role IN ('admin', 'staff_admin') AND is_active = true
    )
  );

-- Seed defaults
INSERT INTO sys_platform_settings (key, value) VALUES
  ('emailNotifications', 'true'),
  ('notifyOnCardReady', 'true'),
  ('notifyOnVoteOpen', 'true'),
  ('notifyOnMeetingDay', 'true'),
  ('notifyOnNewMember', 'false'),
  ('defaultCardBrowseDays', '21'),
  ('defaultVoteDays', '7'),
  ('defaultFollowupDays', '30'),
  ('ghostApiUrl', ''),
  ('ghostContentKey', '')
ON CONFLICT (key) DO NOTHING;
