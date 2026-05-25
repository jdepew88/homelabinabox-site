# Homelab in a Box — Website

Documentation and marketing site for **Homelab in a Box** at [homelabinabox.com](https://homelabinabox.com). Built with Vite, React, and TypeScript. Deploys as a static site on Cloudflare Pages.

Install defaults, ports, and warnings are documented on the site and summarized in the [repository README](../README.md). Shared command strings live in `src/content/install.ts`.

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
npm run build
npm run preview   # optional: serve dist locally
```

Output is written to `website/dist/`.

## Configuration

Edit `src/config.ts` to set your real GitHub repository URL and Buy Me a Coffee link before publishing.

## Deploy to Cloudflare Pages

1. Connect your Git repository in the Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages**.
2. Use these build settings:

| Setting | Value |
|--------|--------|
| Framework preset | None (or Vite if offered) |
| Build command | `cd website && npm ci && npm run build` |
| Build output directory | `website/dist` |
| Root directory (if monorepo) | `/` |

3. Set **Node.js version** to 20 or 22 in environment variables if the default is too old.
4. Add a custom domain: `homelabinabox.com` (and `www` if desired).

SPA routing is handled by `public/_redirects` (`/* /index.html 200`), which Cloudflare Pages serves automatically for static assets.

## Service logos

Homepage cards load local images from `public/logos/` (no hotlinking). See [docs/LOGOS.md](docs/LOGOS.md).

```bash
# From repository root
pip install -r requirements.txt
python3 scripts/resize-logos.py
```

Put source artwork in `website/public/logos/source/{slug}.png`, then re-run the script.

## Project structure

```
website/
  public/logos/    # built PNGs + source/
  docs/LOGOS.md
  src/
    data/services.ts
    components/    # ServiceCard, ServiceLogo, layout
    pages/
    config.ts
```

The Docker / Traefik stack lives in the repository root (outside `website/`). This folder does not affect Compose or host scripts.
