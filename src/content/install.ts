import { SITE } from '../config'

/** Repository clone URL — update in config when publishing. */
export const REPO_CLONE_URL = `${SITE.github}.git`
export const REPO_DIR = 'Homelab-in-a-box'

/** Example domain used in docs (this site and sample stack hostnames). */
export const EXAMPLE_DOMAIN = 'homelabinabox.app'

/** Do not recommend this command (see COMPOSE_BOOTSTRAP_AVOID_WHY). */
export const COMPOSE_BOOTSTRAP_AVOID_CMD =
  'docker compose -f compose.yaml -f compose.bootstrap.yaml up -d'

export const COMPOSE_BOOTSTRAP_AVOID_WHY =
  'The root compose.yaml may already include compose.bootstrap.yaml. Loading both files can duplicate services and merge conflicting options.'

/** Cloudflare Zero Trust public hostname service URL for every app. */
export const CLOUDFLARE_ORIGIN_TRAEFIK = 'http://traefik:80'

/** Typical container ports referenced in docs (internal Docker networking). */
export const SERVICE_PORTS = {
  portainer: 9000,
  traefikManager: 5000,
  authelia: 9091,
  rocketchat: 3000,
} as const

export const INSTALL_FLOW = [
  { step: 1, label: 'Start here', href: '/install', page: 'Install overview' },
  { step: 2, label: 'Host setup', href: '/host-setup', page: 'Host Setup' },
  { step: 3, label: 'Cloudflare setup', href: '/cloudflare', page: 'Cloudflare Setup' },
  { step: 4, label: 'Bootstrap stack', href: '/install#bootstrap', page: 'Install — Bootstrap' },
  {
    step: 5,
    label: 'Verify Portainer, Traefik Manager, Traefik',
    href: '/install#verify',
    page: 'Install — Verify',
  },
  { step: 6, label: 'Add Authelia later', href: '/authelia', page: 'Authelia Setup' },
  { step: 7, label: 'Add more containers', href: '/add-containers', page: 'Add Containers' },
] as const

export const COMMANDS = {
  clone: `git clone ${REPO_CLONE_URL}
cd ${REPO_DIR}`,
  copyEnv: `cp .env.example .env
nano .env`,
  bootstrap: `docker compose -f compose.bootstrap.yaml up -d`,
  bootstrapTunnel: `docker compose -f compose.bootstrap.yaml --profile tunnel-token up -d`,
  validate: `docker ps --format "table {{.Names}}\\t{{.Status}}\\t{{.Ports}}"
docker logs traefik --tail=100
docker logs traefik-manager --tail=100`,
  curlPortainer: `curl -I -H "Host: port.${EXAMPLE_DOMAIN}" http://127.0.0.1`,
  curlManager: `curl -I -H "Host: manager.${EXAMPLE_DOMAIN}" http://127.0.0.1`,
  curlTraefik: `curl -I -H "Host: traefik.${EXAMPLE_DOMAIN}" http://127.0.0.1`,
  setupScript: `./scripts/setup.sh`,
  installDockerScript: `./scripts/install-docker.sh`,
  authProfile: `docker compose -f compose.bootstrap.yaml --profile auth up -d`,
  rocketchatProfile: `docker compose -f compose.bootstrap.yaml --profile rocketchat up -d`,
  cloudflareSetup: `source .venv/bin/activate 2>/dev/null || true
python3 scripts/setup-cloudflare-tunnel.py`,
  cloudflaredLogs: `docker ps --format "table {{.Names}}\\t{{.Status}}\\t{{.Ports}}"
docker logs cloudflared --tail=100`,
} as const

export const ENV_CLOUDFLARE_EXAMPLE = `CF_API_TOKEN=
CF_ACCOUNT_ID=
CF_ZONE_ID=
CF_TUNNEL_NAME=homelab-in-a-box
CLOUDFLARED_TOKEN=
DOMAIN=${EXAMPLE_DOMAIN}
SUBDOMAIN_TRAEFIK=traefik
SUBDOMAIN_MANAGER=manager
SUBDOMAIN_PORTAINER=port`

export const DOC_PATHS = {
  home: '/',
  about: '/about',
  install: '/install',
  hostSetup: '/host-setup',
  cloudflare: '/cloudflare',
  authelia: '/authelia',
  addContainers: '/add-containers',
  faq: '/faq',
} as const

export const DOCS_BASE_URL = `https://${SITE.domain}`
