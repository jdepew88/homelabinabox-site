#!/usr/bin/env python3
"""
Resize source logos for the Homelab in a Box website.

Input:  public/logos/source/*.{png,svg,jpg,jpeg,webp}
Output: public/logos/{slug}-{64,128,256}.png (+ optional .webp)

Missing sources get a generated placeholder PNG (initials badge).
SVG sources are copied to public/logos/{slug}.svg and rasterized for sizes.
"""

from __future__ import annotations

import json
from pathlib import Path

SIZES = (64, 128, 256)
ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public" / "logos" / "source"
OUT = ROOT / "public" / "logos"
SERVICES_JSON = ROOT / "src" / "data" / "services-meta.json"

# Fallback if JSON not generated — keep in sync with services.ts ids
DEFAULT_SERVICES = [
    ("traefik", "T", (0, 184, 148)),
    ("cloudflared", "Cf", (245, 158, 11)),
    ("portainer", "P", (0, 120, 215)),
    ("traefik-manager", "TM", (0, 184, 148)),
    ("authelia", "A", (220, 38, 38)),
    ("redis", "R", (220, 56, 45)),
    ("postgres", "PG", (51, 103, 145)),
    ("rocketchat", "RC", (213, 43, 86)),
    ("docker", "D", (0, 126, 189)),
    ("debian", "Deb", (215, 10, 83)),
    ("ubuntu", "U", (233, 84, 32)),
    ("cloudflare", "CF", (245, 158, 11)),
    ("linode", "L", (0, 180, 126)),
    ("logo1", "HiB", (52, 211, 153)),
    ("homelab-icon", "HiB", (52, 211, 153)),
]


def load_service_defs() -> list[tuple[str, str, tuple[int, int, int]]]:
    if SERVICES_JSON.exists():
        data = json.loads(SERVICES_JSON.read_text(encoding="utf-8"))
        return [
            (item["id"], item.get("placeholderInitials", item["id"][:2]), tuple(item.get("color", [80, 80, 100])))
            for item in data
        ]
    return DEFAULT_SERVICES


def slug_from_filename(path: Path) -> str:
    return path.stem.lower().replace(" ", "-")


def find_source(slug: str) -> Path | None:
    for ext in (".png", ".svg", ".jpg", ".jpeg", ".webp"):
        p = SOURCE / f"{slug}{ext}"
        if p.is_file():
            return p
    return None


def open_image(path: Path):
    from PIL import Image

    if path.suffix.lower() == ".svg":
        try:
            import cairosvg  # optional dependency
            import io

            png_bytes = cairosvg.svg2png(url=str(path), output_width=512, output_height=512)
            return Image.open(io.BytesIO(png_bytes)).convert("RGBA")
        except ImportError:
            raise RuntimeError("install cairosvg for SVG, or add a PNG to source/") from None
    return Image.open(path).convert("RGBA")


def make_placeholder(size: int, initials: str, color: tuple[int, int, int]):
    from PIL import Image, ImageDraw, ImageFont

    img = Image.new("RGBA", (size, size), (24, 24, 28, 255))
    draw = ImageDraw.Draw(img)
    margin = size // 8
    draw.rounded_rectangle(
        [margin, margin, size - margin, size - margin],
        radius=size // 6,
        fill=(color[0], color[1], color[2], 40),
        outline=(color[0], color[1], color[2], 180),
        width=max(2, size // 32),
    )
    text = initials[:4]
    font_size = max(10, size // (4 if len(text) > 2 else 3))
    try:
        font = ImageFont.truetype("arial.ttf", font_size)
    except OSError:
        font = ImageFont.load_default()
    bbox = draw.textbbox((0, 0), text, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text(
        ((size - tw) / 2, (size - th) / 2 - 1),
        text,
        fill=(240, 240, 245, 255),
        font=font,
    )
    return img


def save_raster(img, slug: str, size: int, webp: bool) -> None:
    from PIL import Image

    OUT.mkdir(parents=True, exist_ok=True)
    fitted = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    src = img.copy()
    src.thumbnail((size, size), Image.Resampling.LANCZOS)
    ox = (size - src.width) // 2
    oy = (size - src.height) // 2
    fitted.paste(src, (ox, oy), src if src.mode == "RGBA" else None)
    png_path = OUT / f"{slug}-{size}.png"
    fitted.convert("RGB").save(png_path, "PNG", optimize=True)
    if webp:
        fitted.save(OUT / f"{slug}-{size}.webp", "WEBP", quality=85)


def process_slug(slug: str, initials: str, color: tuple[int, int, int], webp: bool) -> None:
    src = find_source(slug)
    if src is not None:
        if src.suffix.lower() == ".svg":
            dest_svg = OUT / f"{slug}.svg"
            if not dest_svg.exists() or src.stat().st_mtime > dest_svg.stat().st_mtime:
                dest_svg.write_bytes(src.read_bytes())
        try:
            base = open_image(src)
        except Exception as e:
            print(f"[warn] {slug}: could not open {src.name}: {e}")
            base = make_placeholder(256, initials, color)
    else:
        print(f"[info] {slug}: no source file, generating placeholder")
        base = make_placeholder(256, initials, color)

    for size in SIZES:
        save_raster(base, slug, size, webp)


def export_services_json() -> None:
    """Optional: parse services.ts ids — use DEFAULT_SERVICES for script runs."""
    SERVICES_JSON.write_text(
        json.dumps(
            [
                {"id": s[0], "placeholderInitials": s[1], "color": list(s[2])}
                for s in DEFAULT_SERVICES
            ],
            indent=2,
        ),
        encoding="utf-8",
    )


def main() -> None:
    import argparse

    parser = argparse.ArgumentParser(description="Resize website service logos")
    parser.add_argument("--webp", action="store_true", help="Also write .webp outputs")
    parser.add_argument("--export-meta", action="store_true", help="Write services-meta.json")
    args = parser.parse_args()

    try:
        from PIL import Image  # noqa: F401
    except ImportError as e:
        raise SystemExit("Install Pillow: pip install -r requirements.txt") from e

    SOURCE.mkdir(parents=True, exist_ok=True)
    OUT.mkdir(parents=True, exist_ok=True)

    if args.export_meta:
        export_services_json()

    # Every file in source/ plus all known service slugs
    slugs: dict[str, tuple[str, tuple[int, int, int]]] = {
        s[0]: (s[1], s[2]) for s in load_service_defs()
    }
    for path in SOURCE.iterdir():
        if path.is_file() and path.suffix.lower() in {".png", ".svg", ".jpg", ".jpeg", ".webp"}:
            slug = slug_from_filename(path)
            if slug not in slugs:
                slugs[slug] = (slug[:2].upper(), (80, 80, 100))

    for slug, (initials, color) in sorted(slugs.items()):
        process_slug(slug, initials, color, args.webp)

    print(f"Done. Output: {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
