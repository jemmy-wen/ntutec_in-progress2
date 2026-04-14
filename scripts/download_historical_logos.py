#!/usr/bin/env python3
"""
Download historical startup logos from legacy WP URLs into
public/historical/{year}/{filename}.

Usage:
  python3 scripts/download_historical_logos.py \
      --csv /path/to/wp_startups_by_year.csv \
      [--out public/historical] [--dry-run]

Behaviour:
  - Skips file if already exists (idempotent re-run).
  - Skips WP placeholder (construction.png) and logs.
  - On any HTTP/network error, logs and continues (never aborts).
  - Prints summary: success / skipped / failed.
  - Defensive: URL-encodes Chinese path components; preserves extension.
  - After-run: emits logo_map.csv (name,year,local_path) for follow-up
    SQL UPDATE of historical_startups.logo_local_path.
"""
from __future__ import annotations
import argparse, csv, os, sys, time
from pathlib import Path
from urllib.parse import urlparse, quote, unquote
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError

PLACEHOLDER_MARKER = "construction.png"
USER_AGENT = "ntutec-logo-fetcher/1.0"
TIMEOUT = 15


def safe_filename(url: str, fallback: str) -> str:
    path = unquote(urlparse(url).path)
    base = os.path.basename(path) or fallback
    # Normalize: keep extension, strip query fragments already handled by urlparse
    return base


def encoded_url(url: str) -> str:
    """Percent-encode only the path portion so Chinese chars survive curl."""
    p = urlparse(url)
    safe_path = quote(p.path, safe="/._-")
    return f"{p.scheme}://{p.netloc}{safe_path}"


def fetch(url: str, dest: Path) -> tuple[str, str | None]:
    """Returns (status, error_msg). status in {ok, skip_exists, skip_placeholder, fail}."""
    if PLACEHOLDER_MARKER in url:
        return "skip_placeholder", None
    if dest.exists() and dest.stat().st_size > 0:
        return "skip_exists", None
    try:
        req = Request(encoded_url(url), headers={"User-Agent": USER_AGENT})
        with urlopen(req, timeout=TIMEOUT) as resp:
            data = resp.read()
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_bytes(data)
        return "ok", None
    except HTTPError as e:
        return "fail", f"HTTP {e.code}"
    except URLError as e:
        return "fail", f"URL {e.reason}"
    except Exception as e:
        return "fail", f"{type(e).__name__}: {e}"


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--csv", required=True)
    ap.add_argument("--out", default="public/historical")
    ap.add_argument("--dry-run", action="store_true",
                    help="HEAD-check first 5 URLs only, print results.")
    ap.add_argument("--sleep", type=float, default=0.2,
                    help="Delay between requests (rate-limit).")
    args = ap.parse_args()

    rows = list(csv.DictReader(open(args.csv, encoding="utf-8")))
    counts = {"ok": 0, "skip_exists": 0, "skip_placeholder": 0, "fail": 0}
    fails: list[tuple[str, str, str]] = []
    logo_map: list[tuple[str, str, str]] = []  # (year, name, local_path)

    out_root = Path(args.out)

    target_rows = rows[:5] if args.dry_run else rows
    if args.dry_run:
        print(f"[dry-run] HEAD-checking first {len(target_rows)} URLs...")
        for r in target_rows:
            url = r.get("logo_url", "")
            enc = encoded_url(url)
            try:
                req = Request(enc, method="HEAD",
                              headers={"User-Agent": USER_AGENT})
                with urlopen(req, timeout=TIMEOUT) as resp:
                    print(f"  [{resp.status}] {r['name'][:30]:30} -> {enc}")
            except Exception as e:
                print(f"  [ERR] {r['name'][:30]:30} -> {e}")
        return 0

    for i, r in enumerate(target_rows, 1):
        url = (r.get("logo_url") or "").strip()
        if not url:
            counts["fail"] += 1
            fails.append((r["year"], r["name"], "no-url"))
            continue
        year = r["year"].strip()
        fname = safe_filename(url, f"{r['name'][:20]}.png")
        # Disambiguate collisions by prefixing source_post_id when present
        spid = (r.get("source_post_id") or "").strip()
        if spid:
            fname = f"{spid}_{fname}"
        dest = out_root / year / fname
        status, err = fetch(url, dest)
        counts[status] += 1
        if status in ("ok", "skip_exists"):
            logo_map.append((year, r["name"], f"/historical/{year}/{fname}"))
        if status == "fail":
            fails.append((year, r["name"], err or "?"))
        if i % 25 == 0:
            print(f"  ... {i}/{len(target_rows)} "
                  f"(ok={counts['ok']} skip={counts['skip_exists']+counts['skip_placeholder']} "
                  f"fail={counts['fail']})")
        time.sleep(args.sleep)

    # Emit logo_map.csv for SQL follow-up
    map_path = out_root / "_logo_map.csv"
    map_path.parent.mkdir(parents=True, exist_ok=True)
    with map_path.open("w", encoding="utf-8", newline="") as f:
        w = csv.writer(f)
        w.writerow(["year", "name", "local_path"])
        w.writerows(logo_map)

    print("\n=== Summary ===")
    for k, v in counts.items():
        print(f"  {k}: {v}")
    print(f"  logo_map entries: {len(logo_map)} -> {map_path}")
    if fails:
        print(f"\nFailures ({len(fails)}):")
        for y, n, e in fails[:30]:
            print(f"  [{y}] {n[:40]}: {e}")
        if len(fails) > 30:
            print(f"  ... and {len(fails)-30} more")
    return 0


if __name__ == "__main__":
    sys.exit(main())
