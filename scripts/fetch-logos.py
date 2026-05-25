#!/usr/bin/env python3
"""
Optional, conservative logo fetcher. Downloads only from explicit URLs in
scripts/logo-sources.json — never scrapes. Failures are non-fatal (placeholder
used after resize-logos.py runs).

Usage:
  python3 scripts/fetch-logos.py
"""

from __future__ import annotations

import json
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONFIG = Path(__file__).parent / "logo-sources.json"
SOURCE = ROOT / "public" / "logos" / "source"
TIMEOUT = 20
USER_AGENT = "HomelabInABox-LogoFetcher/1.0 (local setup script)"


def main() -> None:
    if not CONFIG.is_file():
        print(f"No config at {CONFIG.name}; nothing to fetch.")
        print("Add entries like: {\"slug\": \"traefik\", \"url\": \"https://...\", \"ext\": \"png\"}")
        return

    entries = json.loads(CONFIG.read_text(encoding="utf-8"))
    if not isinstance(entries, list):
        print("[warn] logo-sources.json must be a JSON array")
        return

    SOURCE.mkdir(parents=True, exist_ok=True)
    ok, fail = 0, 0

    for item in entries:
        slug = item.get("slug")
        url = item.get("url")
        ext = item.get("ext", "png").lstrip(".")
        if not slug or not url:
            print("[warn] skip invalid entry:", item)
            fail += 1
            continue

        dest = SOURCE / f"{slug}.{ext}"
        if dest.is_file() and not item.get("force"):
            print(f"[skip] {dest.name} exists")
            ok += 1
            continue

        req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
        try:
            with urllib.request.urlopen(req, timeout=TIMEOUT) as resp:
                data = resp.read()
            if len(data) < 200:
                raise ValueError("response too small")
            dest.write_bytes(data)
            print(f"[ok] {dest.name} <- {url}")
            ok += 1
        except (urllib.error.URLError, ValueError, OSError) as e:
            print(f"[fail] {slug}: {e}")
            fail += 1

    print(f"Fetch complete: {ok} ok, {fail} failed (placeholders still work).")


if __name__ == "__main__":
    main()
