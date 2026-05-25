import './ArchitectureTrafficFlow.css'

const IMAGE_SRC = '/images/architecture/how-traffic-flows.png'

const ALT =
  'How traffic flows: browser over HTTPS to Cloudflare, through Cloudflare Tunnel to Traefik on port 80 in Docker, then to Portainer, Traefik dashboard, and other app services by subdomain.'

export function ArchitectureTrafficFlow() {
  return (
    <figure className="architecture-flow">
      <img
        className="architecture-flow__img"
        src={IMAGE_SRC}
        alt={ALT}
        width={1200}
        height={675}
        loading="lazy"
        decoding="async"
      />
    </figure>
  )
}
