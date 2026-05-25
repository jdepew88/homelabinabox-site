import { useImageLightbox } from './ImageLightbox'
import type { ImgHTMLAttributes, KeyboardEvent, MouseEvent } from 'react'

export type ZoomableImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  /** Full-size URL for the lightbox; defaults to `src` */
  lightboxSrc?: string
  /** Set false to disable zoom (e.g. decorative icons) */
  zoomable?: boolean
}

export function ZoomableImage({
  lightboxSrc,
  zoomable = true,
  className = '',
  onClick,
  onKeyDown,
  alt = '',
  src,
  ...rest
}: ZoomableImageProps) {
  const { open } = useImageLightbox()

  function openLightbox() {
    const href = lightboxSrc ?? (typeof src === 'string' ? src : '')
    if (!href || !zoomable) return
    open({ src: href, alt })
  }

  function handleClick(e: MouseEvent<HTMLImageElement>) {
    onClick?.(e)
    if (e.defaultPrevented) return
    openLightbox()
  }

  function handleKeyDown(e: KeyboardEvent<HTMLImageElement>) {
    onKeyDown?.(e)
    if (e.defaultPrevented) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      openLightbox()
    }
  }

  const classes = [
    zoomable && src ? 'zoomable-image' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <img
      {...rest}
      src={src}
      alt={alt}
      className={classes || undefined}
      onClick={zoomable && src ? handleClick : onClick}
      onKeyDown={zoomable && src ? handleKeyDown : onKeyDown}
      role={zoomable && src ? 'button' : rest.role}
      tabIndex={zoomable && src ? (rest.tabIndex ?? 0) : rest.tabIndex}
    />
  )
}
