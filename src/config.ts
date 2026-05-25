/** Navbar + favicon (transparent PNG). */
export const BRAND_ICON = '/logos/homelab-icon.png'

export const SITE = {
  name: 'Homelab in a Box',
  domain: 'homelabinabox.app',
  contactEmail: 'privacy@homelabinabox.app',
  tagline:
    'A beginner-friendly Docker stack with Traefik, Cloudflare Tunnel, Portainer, Traefik Manager, and optional Authelia — built to get a clean self-hosting baseline online fast.',
  github: 'https://github.com/jdepew88/homelabinabox-site',
  buyMeACoffee: 'https://buymeacoffee.com/homelab.in.a.box',
  license: 'MIT',
} as const

/** Top-level nav (desktop + mobile). */
export const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/faq', label: 'FAQ' },
] as const

/** Grouped under Setup dropdown (install flow). */
export const SETUP_LINKS = [
  { to: '/install', label: 'Install overview' },
  { to: '/host-setup', label: 'Host setup' },
  { to: '/cloudflare', label: 'Cloudflare' },
  { to: '/authelia', label: 'Authelia' },
  { to: '/add-containers', label: 'Add containers' },
] as const

export const SETUP_PATHS = SETUP_LINKS.map((l) => l.to)
