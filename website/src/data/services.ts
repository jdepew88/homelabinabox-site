export type ServiceTag = 'Core' | 'Optional' | 'Support' | 'Platform'

export type ServiceMeta = {
  /** Filename slug under /logos/ (e.g. traefik → /logos/traefik-128.png) */
  id: string
  name: string
  description: string
  tag: ServiceTag
  repoUrl?: string
  dockerHubUrl?: string
  imageUrl?: string
  docsUrl?: string
  /** Base path without size suffix; logos served as {logoPath}-64.png etc. */
  logoPath: string
  defaultPort?: number
  includedByDefault: boolean
  /** Show on homepage “Included services” grid */
  showOnHomepage: boolean
  /** Short label for generated placeholder badge */
  placeholderInitials: string
  /** Clarify third-party tools (e.g. Traefik Manager vs Traefik Labs) */
  affiliationNote?: string
}

const logo = (id: string) => `/logos/${id}`

export const SERVICES: ServiceMeta[] = [
  {
    id: 'traefik',
    name: 'Traefik',
    description: 'Reverse proxy and ingress for all HTTP services on the Docker network.',
    tag: 'Core',
    repoUrl: 'https://github.com/traefik/traefik',
    dockerHubUrl: 'https://hub.docker.com/_/traefik',
    docsUrl: 'https://doc.traefik.io/traefik/',
    logoPath: logo('traefik'),
    defaultPort: 80,
    includedByDefault: true,
    showOnHomepage: true,
    placeholderInitials: 'T',
  },
  {
    id: 'cloudflared',
    name: 'cloudflared',
    description: 'Cloudflare Tunnel connector — exposes Traefik without port forwarding.',
    tag: 'Core',
    repoUrl: 'https://github.com/cloudflare/cloudflared',
    dockerHubUrl: 'https://hub.docker.com/r/cloudflare/cloudflared',
    docsUrl: 'https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/',
    logoPath: logo('cloudflared'),
    includedByDefault: true,
    showOnHomepage: true,
    placeholderInitials: 'Cf',
  },
  {
    id: 'portainer',
    name: 'Portainer',
    description: 'Web UI to manage containers, images, volumes, and stacks.',
    tag: 'Core',
    repoUrl: 'https://github.com/portainer/portainer',
    dockerHubUrl: 'https://hub.docker.com/r/portainer/portainer-ce',
    docsUrl: 'https://docs.portainer.io/',
    logoPath: logo('portainer'),
    defaultPort: 9000,
    includedByDefault: true,
    showOnHomepage: true,
    placeholderInitials: 'P',
  },
  {
    id: 'traefik-manager',
    name: 'Traefik Manager',
    description:
      'Community web UI to add and edit Traefik routes without hand-editing YAML.',
    tag: 'Core',
    repoUrl: 'https://github.com/chr0nzz/traefik-manager',
    docsUrl: 'https://traefik-manager.xyzlab.dev/',
    logoPath: logo('traefik-manager'),
    defaultPort: 5000,
    includedByDefault: true,
    showOnHomepage: true,
    placeholderInitials: 'TM',
    affiliationNote:
      'Independent project — Traefik Labs does not own or maintain Traefik Manager.',
  },
  {
    id: 'authelia',
    name: 'Authelia',
    description: 'Forward-auth style login for protecting dashboards and apps.',
    tag: 'Optional',
    repoUrl: 'https://github.com/authelia/authelia',
    dockerHubUrl: 'https://hub.docker.com/r/authelia/authelia',
    docsUrl: 'https://www.authelia.com/',
    logoPath: logo('authelia'),
    defaultPort: 9091,
    includedByDefault: false,
    showOnHomepage: true,
    placeholderInitials: 'A',
  },
  {
    id: 'redis',
    name: 'Redis',
    description: 'Session and cache backing store for Authelia and some apps.',
    tag: 'Support',
    repoUrl: 'https://github.com/redis/redis',
    dockerHubUrl: 'https://hub.docker.com/_/redis',
    docsUrl: 'https://redis.io/docs/',
    logoPath: logo('redis'),
    defaultPort: 6379,
    includedByDefault: false,
    showOnHomepage: true,
    placeholderInitials: 'R',
  },
  {
    id: 'postgres',
    name: 'Postgres',
    description: 'Database for Authelia and apps that need persistent storage.',
    tag: 'Support',
    repoUrl: 'https://github.com/postgres/postgres',
    dockerHubUrl: 'https://hub.docker.com/_/postgres',
    docsUrl: 'https://www.postgresql.org/docs/',
    logoPath: logo('postgres'),
    defaultPort: 5432,
    includedByDefault: false,
    showOnHomepage: true,
    placeholderInitials: 'PG',
  },
  {
    id: 'rocketchat',
    name: 'Rocket.Chat',
    description: 'Example app stack — shows how to add more containers behind Traefik.',
    tag: 'Optional',
    repoUrl: 'https://github.com/RocketChat/Rocket.Chat',
    dockerHubUrl: 'https://hub.docker.com/r/rocketchat/rocket.chat',
    docsUrl: 'https://docs.rocket.chat/',
    logoPath: logo('rocketchat'),
    defaultPort: 3000,
    includedByDefault: false,
    showOnHomepage: true,
    placeholderInitials: 'RC',
  },
  {
    id: 'docker',
    name: 'Docker',
    description: 'Container runtime used by the bootstrap Compose stack.',
    tag: 'Platform',
    repoUrl: 'https://github.com/moby/moby',
    dockerHubUrl: 'https://hub.docker.com/',
    docsUrl: 'https://docs.docker.com/',
    logoPath: logo('docker'),
    includedByDefault: true,
    showOnHomepage: false,
    placeholderInitials: 'D',
  },
  {
    id: 'debian',
    name: 'Debian',
    description: 'Recommended host OS for VPS deployments.',
    tag: 'Platform',
    repoUrl: 'https://salsa.debian.org/debian',
    docsUrl: 'https://www.debian.org/doc/',
    logoPath: logo('debian'),
    includedByDefault: false,
    showOnHomepage: false,
    placeholderInitials: 'Deb',
  },
  {
    id: 'ubuntu',
    name: 'Ubuntu',
    description: 'Supported host OS (24.04 LTS) for VPS deployments.',
    tag: 'Platform',
    repoUrl: 'https://github.com/canonical/ubuntu-server',
    docsUrl: 'https://help.ubuntu.com/',
    logoPath: logo('ubuntu'),
    includedByDefault: false,
    showOnHomepage: false,
    placeholderInitials: 'U',
  },
  {
    id: 'cloudflare',
    name: 'Cloudflare',
    description: 'DNS, HTTPS edge, and Zero Trust tunnels for public access.',
    tag: 'Platform',
    docsUrl: 'https://developers.cloudflare.com/',
    logoPath: logo('cloudflare'),
    includedByDefault: true,
    showOnHomepage: false,
    placeholderInitials: 'CF',
  },
  {
    id: 'linode',
    name: 'Linode',
    description: 'Example VPS provider for a small Debian/Ubuntu homelab host.',
    tag: 'Platform',
    docsUrl: 'https://www.linode.com/docs/',
    logoPath: logo('linode'),
    includedByDefault: false,
    showOnHomepage: false,
    placeholderInitials: 'L',
  },
]

export const HOMEPAGE_SERVICES = SERVICES.filter((s) => s.showOnHomepage)

export const TRAEFIK_MANAGER_SERVICE = SERVICES.find((s) => s.id === 'traefik-manager')!

export function logoSrc(logoPath: string, size: 64 | 128 | 256 = 128): string {
  return `${logoPath}-${size}.png`
}
