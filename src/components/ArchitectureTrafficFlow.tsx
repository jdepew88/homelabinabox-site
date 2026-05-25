import './ArchitectureTrafficFlow.css'

/** Responsive “How traffic flows” diagram (see public/images/architecture/). */

const BASE = '/images/architecture/architecture-traffic-flow'

const WIDTHS = [480, 640, 768, 1024] as const

const SRCSET = WIDTHS.map((w) => `${BASE}-${w}w.png ${w}w`).join(', ')

const ALT =
  'Traffic flow: Browser over HTTPS to Cloudflare, through Cloudflare Tunnel and cloudflared, to Traefik on port 80 inside Docker, then to application containers.'

export function ArchitectureTrafficFlow() {
  return (
    <figure className="architecture-flow">
      <picture>
        <source
          type="image/png"
          srcSet={SRCSET}
          sizes="(max-width: 520px) 100vw, (max-width: 768px) 92vw, (max-width: 1100px) 90vw, 1024px"
        />
        <img
          className="architecture-flow__img"
          src={`${BASE}.png`}
          srcSet={SRCSET}
          sizes="(max-width: 520px) 100vw, (max-width: 768px) 92vw, (max-width: 1100px) 90vw, 1024px"
          width={1024}
          height={347}
          alt={ALT}
          loading="lazy"
          decoding="async"
        />
      </picture>
    </figure>
  )
}
