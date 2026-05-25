import type { ReactNode } from 'react'
import { ZoomableImage } from './image-lightbox'
import '../pages/guide-page.css'

type Props = {
  eyebrow: string
  title: ReactNode
  lead: string
  imageSrc: string
  imageAlt: string
  imageWidth?: number
  imageHeight?: number
  caption: string
  /** Anchor id for jump nav (e.g. flow diagram section) */
  flowId?: string
}

export function GuidePageHero({
  eyebrow,
  title,
  lead,
  imageSrc,
  imageAlt,
  imageWidth = 1200,
  imageHeight = 675,
  caption,
  flowId,
}: Props) {
  return (
    <header className="guide-hero">
      <div className="guide-hero__backdrop" aria-hidden="true" />
      <div className="guide-hero__grid" aria-hidden="true" />
      <div className="guide-hero__inner">
        <div className="guide-hero__layout">
          <div className="guide-hero__copy">
            <p className="guide-hero__eyebrow">{eyebrow}</p>
            <h1 className="guide-hero__title">{title}</h1>
            <p className="guide-hero__lead">{lead}</p>
          </div>
          <div className="guide-hero__visual" id={flowId}>
            <div className="guide-hero__frame">
              <ZoomableImage
                src={imageSrc}
                alt={imageAlt}
                width={imageWidth}
                height={imageHeight}
                fetchPriority="high"
                decoding="async"
              />
            </div>
            <p className="guide-hero__caption">{caption}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
