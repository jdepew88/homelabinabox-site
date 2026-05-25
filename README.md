# homelabinabox.com — Documentation site

Marketing and install documentation for **[Homelab in a Box](https://homelabinabox.com)** — a beginner-friendly Docker stack (Traefik, Cloudflare Tunnel, Portainer, Traefik Manager, optional Authelia).

The Docker Compose homelab project lives separately: [github.com/jdepew88/Homelab-in-a-box](https://github.com/jdepew88/Homelab-in-a-box).

## Live site

**https://homelabinabox.com**

## Local development

```bash
cd website
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Production build

```bash
cd website
npm ci
npm run build
```

Static output: `website/dist/`

## Deploy (Cloudflare Pages)

| Setting | Value |
|--------|--------|
| Build command | `cd website && npm ci && npm run build` |
| Build output directory | `website/dist` |
| SPA routing | `website/public/_redirects` (`/* /index.html 200`) |

Connect custom domain `homelabinabox.com` in the Cloudflare Pages project.

Details: [website/README.md](website/README.md)

## Repository layout

| Path | Purpose |
|------|---------|
| `website/` | Vite + React + TypeScript site |
| `website/src/config.ts` | Site name, domain, GitHub URL, nav |
| `scripts/` | Logo and architecture image resize helpers |
| `requirements.txt` | Python deps for resize scripts |

## License

MIT
