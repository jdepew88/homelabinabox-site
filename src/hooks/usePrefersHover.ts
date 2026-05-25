import { useEffect, useState } from 'react'

/** True when the primary input supports hover (desktop mouse/trackpad). */
export function usePrefersHover(): boolean {
  const [prefersHover, setPrefersHover] = useState(() => {
    if (typeof window === 'undefined') return true
    return window.matchMedia('(hover: hover)').matches
  })

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover)')
    const onChange = () => setPrefersHover(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return prefersHover
}
