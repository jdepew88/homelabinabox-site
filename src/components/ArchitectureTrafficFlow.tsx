import { ZoomableImage } from './image-lightbox'
import './ArchitectureTrafficFlow.css'

const BASE = '/images/architecture/architecture-traffic-flow'

const WIDTHS = [480, 640, 768, 1024] as const

const WEBP = `${BASE}.webp`
const PNG_SRCSET = WIDTHS.map((w) => `${BASE}-${w}w.png ${w}w`).join(', ')
const SIZES = '(max-width: 520px) 100vw, (max-width: 768px) 92vw, (max-width: 1100px) 90vw, 1024px'

const ALT =
  'How traffic flows: browser over HTTPS to Cloudflare, through Cloudflare Tunnel to Traefik on port 80 in Docker, then to Portainer, Traefik dashboard, and other app services by subdomain.'

export function ArchitectureTrafficFlow() {
  return (
    <figure className="architecture-flow">
      <picture>
        <source type="image/webp" src={WEBP} />
        <source type="image/png" srcSet={PNG_SRCSET} sizes={SIZES} />
        <ZoomableImage
          className="architecture-flow__img"
          src={`${BASE}.png`}
          lightboxSrc={WEBP}
          srcSet={PNG_SRCSET}
          sizes={SIZES}
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
