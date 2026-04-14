#!/usr/bin/env python3
"""
After logo downloads complete, generate migration 012_update_logo_paths.sql
from the three _logo_map / _download_map CSVs:
  - public/historical/_logo_map.csv      -> historical_startups.logo_local_path
  - public/mentors/wp/_download_map.csv   -> mentors.photo_url (backfill missing only)
  - public/partners/wp/_download_map.csv  -> (future: corporate_partners table)

Usage:
  python3 scripts/build_migration_012_paths.py
"""
import csv
import pathlib
import re


ROOT = pathlib.Path(__file__).resolve().parent.parent
MIG = ROOT / "supabase/migrations/012_update_logo_paths.sql"


def sql_esc(s: str) -> str:
    return s.replace("'", "''")


def main() -> None:
    sql = [
        "-- ============================================================",
        "-- NTUTEC Platform — Migration 012: Update Logo/Photo Local Paths",
        "-- ============================================================",
        "-- Date: 2026-04-14",
        "-- Purpose: After `scripts/download_historical_logos.py` and",
        "--          `scripts/download_wp_images.py` save images into",
        "--          public/historical, public/mentors/wp, public/partners/wp,",
        "--          update DB rows with local paths so the frontend can serve",
        "--          them even after legacy WP goes offline.",
        "-- Depends on: 011 (historical_startups seeded), 009 (mentors seeded)",
        "-- ============================================================",
        "",
        "BEGIN;",
        "",
    ]

    # historical_startups
    hist_map = ROOT / "public/historical/_logo_map.csv"
    if hist_map.exists():
        with hist_map.open(encoding="utf-8") as fh:
            rows = list(csv.DictReader(fh))
        sql.append(f"-- historical_startups.logo_local_path  ({len(rows)} rows)")
        for r in rows:
            year = sql_esc(r.get("year", ""))
            name = sql_esc(r.get("name", ""))
            lp = sql_esc(r.get("local_path", ""))
            if not lp:
                continue
            sql.append(
                f"UPDATE historical_startups SET logo_local_path = '{lp}' WHERE year = '{year}' AND name = '{name}';"
            )
        sql.append("")

    # mentors.photo_url — only backfill when current photo_url is NULL or still points to WP
    mentor_map = ROOT / "public/mentors/wp/_download_map.csv"
    if mentor_map.exists():
        with mentor_map.open(encoding="utf-8") as fh:
            rows = list(csv.DictReader(fh))
        sql.append(f"-- mentors.photo_url  (backfill via name hint match, {len(rows)} candidates)")
        for r in rows:
            lp = r.get("local_path", "").strip()
            if not lp.startswith("public/"):
                continue
            hint = sql_esc(re.sub(r"\s+", "%", r.get("name", "").strip()))
            if not hint:
                continue
            webpath = "/" + lp.split("public/", 1)[1]
            sql.append(
                f"UPDATE mentors SET photo_url = '{webpath}' "
                f"WHERE photo_url IS NULL AND name LIKE '%{hint}%';"
            )
        sql.append("")

    sql.extend(
        [
            "COMMIT;",
            "",
            "-- Verify:",
            "-- SELECT year, COUNT(*) FILTER (WHERE logo_local_path IS NOT NULL) AS with_local,",
            "--        COUNT(*) AS total",
            "-- FROM historical_startups GROUP BY year ORDER BY year;",
            "",
            "-- SELECT COUNT(*) FILTER (WHERE photo_url LIKE '/mentors/%') AS with_local FROM mentors;",
            "",
        ]
    )

    MIG.write_text("\n".join(sql), encoding="utf-8")
    print(f"✅ {MIG} ({MIG.stat().st_size:,} bytes)")


if __name__ == "__main__":
    main()
