# homelabinabox.app — Documentation site

Marketing and install documentation for **[Homelab in a Box](https://homelabinabox.app)** — a beginner-friendly Docker stack (Traefik, Cloudflare Tunnel, Portainer, Traefik Manager, optional Authelia).

The Docker Compose homelab project lives separately: [github.com/jdepew88/Homelab-in-a-box](https://github.com/jdepew88/Homelab-in-a-box).

## Live site

**https://homelabinabox.app**

## Local development

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Production build

```bash
npm ci
npm run build
```

Static output: `dist/`

## Deploy (Cloudflare Pages)

Same layout as [jrtechnicalconsulting.com](https://jrtechnicalconsulting.com) — Vite app at the repo root.

| Setting | Value |
|--------|--------|
| Production branch | `master` |
| Root directory | *(empty — repo root)* |
| Build command | `npm ci && npm run build` |
| Build output directory | `dist` |
| Deploy command | `exit 0` (if required; otherwise leave blank) |

SPA routing: `public/_redirects` (`/* /index.html 200`).

Connect custom domain `homelabinabox.app` in the Pages project (not a Worker).

Logo workflow: [docs/LOGOS.md](docs/LOGOS.md)

## Repository layout

| Path | Purpose |
|------|---------|
| `src/` | React + TypeScript app |
| `public/` | Static assets, `_redirects` |
| `src/config.ts` | Site name, domain, GitHub URL, nav |
| `scripts/` | Logo and architecture image resize helpers |
| `docs/` | Maintainer docs |
| `requirements.txt` | Python deps for resize scripts |

## License

MIT
