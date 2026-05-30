import { ZoomableImage } from './image-lightbox'
import './ArchitectureFeatureHighlights.css'

const BASE = '/images/architecture/home-feature-highlights'

const WIDTHS = [480, 640, 768, 1024] as const

const WEBP = `${BASE}.webp`
const PNG_SRCSET = WIDTHS.map((w) => `${BASE}-${w}w.png ${w}w`).join(', ')
const SIZES = '(max-width: 520px) 67vw, (max-width: 900px) 62vw, 686px'

const ALT =
  'Homelab in a Box highlights: secure by default with Cloudflare, high performance edge routing, and Docker-native Traefik proxy to containers.'

export function ArchitectureFeatureHighlights() {
  return (
    <figure className="architecture-highlights">
      <picture>
        <source type="image/webp" src={WEBP} />
        <source type="image/png" srcSet={PNG_SRCSET} sizes={SIZES} />
        <ZoomableImage
          className="architecture-highlights__img"
          src={`${BASE}.png`}
          lightboxSrc={WEBP}
          srcSet={PNG_SRCSET}
          sizes={SIZES}
          width={1024}
          height={341}
          alt={ALT}
          loading="lazy"
          decoding="async"
        />
      </picture>
    </figure>
  )
}
