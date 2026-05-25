#!/usr/bin/env python3
"""
Generate responsive widths for the homepage architecture diagram.

Source: public/images/architecture/source/architecture-traffic-flow.png
Output: public/images/architecture/architecture-traffic-flow-{width}w.png
        public/images/architecture/architecture-traffic-flow.png (largest)
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DIR = ROOT / "public" / "images" / "architecture"
SOURCE = DIR / "source" / "architecture-traffic-flow.png"
WIDTHS = (480, 640, 768, 1024, 1280, 1600)


def main() -> None:
    from PIL import Image

    if not SOURCE.is_file():
        raise SystemExit(f"Missing source image: {SOURCE}")

    img = Image.open(SOURCE).convert("RGBA")
    w, h = img.size
    DIR.mkdir(parents=True, exist_ok=True)
    (DIR / "source").mkdir(parents=True, exist_ok=True)

    for tw in WIDTHS:
        if tw > w:
            continue
        th = int(h * tw / w)
        out = img.resize((tw, th), Image.Resampling.LANCZOS)
        path = DIR / f"architecture-traffic-flow-{tw}w.png"
        out.save(path, "PNG", optimize=True)
        print(f"wrote {path.name} ({tw}x{th})")

    img.save(DIR / "architecture-traffic-flow.png", "PNG", optimize=True)
    print(f"wrote architecture-traffic-flow.png ({w}x{h})")


if __name__ == "__main__":
    main()
