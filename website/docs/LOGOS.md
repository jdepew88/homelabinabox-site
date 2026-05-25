# Service logos (website)

Logos and trademarks belong to their respective owners. This site uses **local files only** in production — no hotlinking to third-party CDNs in the built site.

## Directories

| Path | Purpose |
|------|---------|
| `website/public/logos/source/` | Original PNG/SVG you add or fetch |
| `website/public/logos/` | Built assets (`{slug}-64.png`, `{slug}-128.png`, `{slug}-256.png`) |
| `website/src/data/services.ts` | Metadata (`logoPath`, links, ports, homepage visibility) |

## Add a new service logo

1. Add a row to `website/src/data/services.ts` (`id`, `logoPath`, `placeholderInitials`, etc.).
2. Drop a source file named `{id}.png` or `{id}.svg` into `website/public/logos/source/`.
3. From the repository root:

```bash
python3 -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
python3 scripts/resize-logos.py
```

4. Optional WebP outputs: `python3 scripts/resize-logos.py --webp`
5. Optional fetch from configured URLs only: `python3 scripts/fetch-logos.py` (edit `scripts/logo-sources.json` first).

The site references `/logos/{id}-128.png` on cards. If the file is missing, a **placeholder badge** with initials is shown (no broken image).

## Navbar and favicon

`website/public/logos/homelab-icon.png` — transparent box icon used in the header and browser tab (`favicon.png`, `favicon-32.png`, `apple-touch-icon.png`).

## Hero brand image

`website/public/logos/logo1.png` — full wordmark hero artwork. Regenerate sizes with `logo1.png` in `source/` and run `resize-logos.py`.

## Architecture diagram (homepage)

`website/public/images/architecture/architecture-traffic-flow.png` — “How traffic flows” panel.

Responsive variants: `architecture-traffic-flow-480w.png` through `-1024w.png`.

Replace `website/public/images/architecture/source/architecture-traffic-flow.png` and run:

```bash
python3 scripts/resize-architecture.py
```

## Legal note

Only commit logos you have the right to use. When in doubt, use the generated placeholder from `resize-logos.py` and link to official docs from `services.ts` instead of displaying a trademark logo.
