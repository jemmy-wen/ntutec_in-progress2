#!/usr/bin/env python3
"""
Download WP images (mentor photos + corporate partner logos) to local.

Usage:
  python3 scripts/download_wp_images.py \
      --csv /path/to/wp_mentor_photos.csv --out public/mentors/wp --url-col photo_url --name-col name_hint --id-col attachment_id

Defensive:
  - Percent-encode Chinese path components
  - Skip if target exists (idempotent)
  - Skip placeholder construction.png
  - Continue on error, log summary
"""
from __future__ import annotations
import argparse, csv, sys, time
from pathlib import Path
from urllib.parse import urlparse, quote
from urllib.request import Request, urlopen

USER_AGENT = "ntutec-img-fetcher/1.0"
TIMEOUT = 15
PLACEHOLDER = "construction.png"


def fetch(url: str, dest: Path) -> tuple[bool, str]:
    try:
        parts = urlparse(url)
        encoded = parts._replace(path=quote(parts.path, safe="/")).geturl()
        req = Request(encoded, headers={"User-Agent": USER_AGENT})
        with urlopen(req, timeout=TIMEOUT) as r:
            data = r.read()
        dest.write_bytes(data)
        return True, f"ok ({len(data):,}B)"
    except Exception as e:
        return False, f"{type(e).__name__}: {e}"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--csv", required=True)
    ap.add_argument("--out", required=True)
    ap.add_argument("--url-col", required=True)
    ap.add_argument("--id-col", required=True)
    ap.add_argument("--name-col", default="")
    ap.add_argument("--sleep", type=float, default=0.3)
    args = ap.parse_args()

    out = Path(args.out)
    out.mkdir(parents=True, exist_ok=True)
    platform_root = Path(__file__).resolve().parent.parent  # ntutec-platform/

    with open(args.csv, encoding="utf-8") as fh:
        rows = list(csv.DictReader(fh))

    print(f"[{args.csv}] {len(rows)} 筆")
    ok = skip = skipdup = fail = 0
    map_rows = []

    for r in rows:
        url = r.get(args.url_col, "").strip()
        att_id = r.get(args.id_col, "").strip()
        name = r.get(args.name_col, "").strip() if args.name_col else ""
        if not url or not att_id:
            fail += 1; continue
        if PLACEHOLDER in url:
            skip += 1; continue
        ext = Path(urlparse(url).path).suffix.lower() or ".jpg"
        dest = out / f"{att_id}{ext}"
        if dest.exists():
            skipdup += 1
            rel = str(dest.resolve().relative_to(platform_root))
            map_rows.append({"attachment_id": att_id, "name": name, "local_path": rel, "status": "exists"})
            continue
        success, msg = fetch(url, dest)
        if success:
            ok += 1
            print(f"  ✅ {att_id} {name[:20]}: {msg}")
            rel = str(dest.resolve().relative_to(platform_root))
            map_rows.append({"attachment_id": att_id, "name": name, "local_path": rel, "status": "ok"})
        else:
            fail += 1
            print(f"  ❌ {att_id} {name[:20]}: {msg}")
            map_rows.append({"attachment_id": att_id, "name": name, "local_path": "", "status": f"fail:{msg[:40]}"})
        time.sleep(args.sleep)

    # emit map csv
    map_csv = out / "_download_map.csv"
    with map_csv.open("w", encoding="utf-8", newline="") as fh:
        w = csv.DictWriter(fh, fieldnames=["attachment_id", "name", "local_path", "status"])
        w.writeheader()
        w.writerows(map_rows)

    print(f"\n=== {args.out} 摘要 ===")
    print(f"  下載成功: {ok}")
    print(f"  已存在（跳過）: {skipdup}")
    print(f"  placeholder 跳過: {skip}")
    print(f"  失敗: {fail}")
    print(f"  map: {map_csv}")


if __name__ == "__main__":
    main()
