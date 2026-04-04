-- ============================================================
-- Migration 003: pip_startups View — 新增 current_gate_result
-- 執行環境: Supabase SQL Editor
-- 原因: dashboard-stats/route.ts 需要 current_gate_result 判斷
--       Gate 1 advance 狀態（pip_startups.status = startups.status = 'active'，
--       不隨 gate1_auto.py 評估結果改變）
-- 前置: 001_unified_platform_v2.sql 已執行
-- DRIFT: BUG-01 + BUG-03 修正
-- ============================================================

-- PG View 加欄位必須 DROP + CREATE (CREATE OR REPLACE 不支援新增欄位)
DROP VIEW IF EXISTS pip_startups;

CREATE VIEW pip_startups AS
SELECT
  id,
  name_zh,
  name_en,
  tax_id,
  sector,
  product_oneliner AS one_liner,
  -- pipeline_stage 轉為 INT（取前綴數字）
  CASE
    WHEN pipeline_stage IS NULL THEN 0
    WHEN pipeline_stage ~ '^\d' THEN (regexp_match(pipeline_stage, '^(\d+)'))[1]::INT
    ELSE 0
  END AS pipeline_stage,
  pipeline_stage AS pipeline_stage_label,
  gate0_score,
  gate1_score,
  status,
  current_gate_result,            -- 新增：gate1_auto.py 寫入 'pass'/'fail'/'borderline'
  observation_pool,
  observation_reason,
  observation_entered_at,
  reactivated_at,
  reactivated_reason,
  final_tier AS tier,
  track,
  current_gate,
  notes,
  created_at,
  updated_at
FROM startups;

-- 驗證: Gate 1 advance 應 > 0
-- SELECT COUNT(*) FROM pip_startups WHERE current_gate = 'gate1' AND current_gate_result = 'pass';
