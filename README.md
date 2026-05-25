# homelabinabox.app — Documentation site

Marketing and install documentation for **[Homelab in a Box](https://homelabinabox.app)** — a beginner-friendly Docker stack (Traefik, Cloudflare Tunnel, Portainer, Traefik Manager, optional Authelia).

The Docker Compose homelab project lives separately: [github.com/jdepew88/Homelab-in-a-box](https://github.com/jdepew88/Homelab-in-a-box).

## Live site

**https://homelabinabox.app**

Run all commands from the **repository root** (where `package.json` and `src/` live). There is no `website/` subfolder anymore.

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

Static output: `dist/` (served by `public/` at build time — includes `_redirects`, images, favicons).

**Clean rebuild** (delete `dist/` first):

```bash
npm run rebuild
```

**Preview the production build:**

```bash
npm run build
npm run preview
```

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
| `dist/` | Build output (gitignored; do not edit by hand) |
| `scripts/` | Logo and architecture image resize helpers |
| `docs/` | Maintainer docs |
| `requirements.txt` | Python deps for resize scripts |

**Do not** run `npm` inside a legacy `website/` folder if one still exists locally — delete that directory and use the root instead.

## License

MIT
