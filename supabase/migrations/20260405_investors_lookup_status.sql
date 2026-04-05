-- Migration: add company_lookup_status to investors
-- 2026-04-05

ALTER TABLE investors
  ADD COLUMN IF NOT EXISTS company_lookup_status TEXT;

COMMENT ON COLUMN investors.company_lookup_status IS '公司資料查詢狀態：ok / not_found / skipped / error:xxx';
