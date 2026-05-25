import type { ReactNode } from 'react'

type Variant = 'info' | 'tip' | 'warn' | 'danger'

type Props = {
  variant?: Variant
  title?: string
  children: ReactNode
}

export function Callout({ variant = 'info', title, children }: Props) {
  return (
    <div className={`callout callout--${variant}`}>
      {title && <strong>{title}</strong>}
      {children}
    </div>
  )
}
