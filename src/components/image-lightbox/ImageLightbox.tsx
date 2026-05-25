import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import './ImageLightbox.css'

type LightboxItem = {
  src: string
  alt: string
}

type ImageLightboxContextValue = {
  open: (item: LightboxItem) => void
  close: () => void
}

const ImageLightboxContext = createContext<ImageLightboxContextValue | null>(null)

export function useImageLightbox(): ImageLightboxContextValue {
  const ctx = useContext(ImageLightboxContext)
  if (!ctx) {
    throw new Error('useImageLightbox must be used within ImageLightboxProvider')
  }
  return ctx
}

function LightboxOverlay({
  item,
  onClose,
}: {
  item: LightboxItem
  onClose: () => void
}) {
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return createPortal(
    <div
      className="image-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={item.alt || 'Expanded image'}
      onClick={onClose}
    >
      <button
        type="button"
        className="image-lightbox__close"
        aria-label="Close image"
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
      >
        ×
      </button>
      <div
        className="image-lightbox__frame"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          className="image-lightbox__img"
          src={item.src}
          alt={item.alt}
          decoding="async"
        />
      </div>
    </div>,
    document.body,
  )
}

export function ImageLightboxProvider({ children }: { children: ReactNode }) {
  const [item, setItem] = useState<LightboxItem | null>(null)

  const close = useCallback(() => setItem(null), [])
  const open = useCallback((next: LightboxItem) => setItem(next), [])

  return (
    <ImageLightboxContext.Provider value={{ open, close }}>
      {children}
      {item ? <LightboxOverlay item={item} onClose={close} /> : null}
    </ImageLightboxContext.Provider>
  )
}
