#!/usr/bin/env python3
"""
Generate responsive widths for the homepage architecture diagram.

Source (preferred): public/images/architecture/source/how-traffic-flows.png
Legacy source:       public/images/architecture/source/architecture-traffic-flow.png

Output: public/images/architecture/how-traffic-flows.png (full)
        public/images/architecture/how-traffic-flows-{width}w.png (optional widths)
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DIR = ROOT / "public" / "images" / "architecture"
SOURCE_DIR = DIR / "source"
SOURCE_CANDIDATES = (
    SOURCE_DIR / "how-traffic-flows.png",
    SOURCE_DIR / "architecture-traffic-flow.png",
)
OUTPUT_BASENAME = "how-traffic-flows"
WIDTHS = (480, 640, 768, 1024, 1280, 1600)


def resolve_source() -> Path:
    for path in SOURCE_CANDIDATES:
        if path.is_file():
            return path
    raise SystemExit(
        "Missing source image. Add one of:\n"
        f"  - {SOURCE_CANDIDATES[0]}\n"
        f"  - {SOURCE_CANDIDATES[1]}"
    )


def main() -> None:
    from PIL import Image

    source = resolve_source()
    img = Image.open(source).convert("RGBA")
    w, h = img.size
    DIR.mkdir(parents=True, exist_ok=True)
    SOURCE_DIR.mkdir(parents=True, exist_ok=True)

    for tw in WIDTHS:
        if tw > w:
            continue
        th = int(h * tw / w)
        out = img.resize((tw, th), Image.Resampling.LANCZOS)
        path = DIR / f"{OUTPUT_BASENAME}-{tw}w.png"
        out.save(path, "PNG", optimize=True)
        print(f"wrote {path.name} ({tw}x{th})")

    full = DIR / f"{OUTPUT_BASENAME}.png"
    img.save(full, "PNG", optimize=True)
    print(f"wrote {full.name} ({w}x{h}) from {source.name}")


if __name__ == "__main__":
    main()
