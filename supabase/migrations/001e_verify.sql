-- 驗證 pip_startups View
SELECT id, name_zh, one_liner, pipeline_stage, pipeline_stage_label, tier
FROM pip_startups LIMIT 5;

-- 驗證 angel_members View
SELECT id, display_name, company, tier FROM angel_members LIMIT 5;

-- 驗證 RLS policy 數量
SELECT tablename, COUNT(*) AS policy_count
FROM pg_policies WHERE schemaname = 'public'
GROUP BY tablename ORDER BY tablename;
