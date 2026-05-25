import { useState } from 'react'
import type { ServiceMeta } from '../data/services'
import { logoSrc } from '../data/services'
import './ServiceLogo.css'

type Props = {
  service: Pick<ServiceMeta, 'id' | 'name' | 'logoPath' | 'placeholderInitials'>
  size?: 64 | 128 | 256
  className?: string
}

export function ServiceLogo({ service, size = 128, className = '' }: Props) {
  const [failed, setFailed] = useState(false)
  const px = size === 64 ? 48 : size === 128 ? 56 : 72
  const src = logoSrc(service.logoPath, size)

  if (failed) {
    return (
      <span
        className={`service-logo service-logo--placeholder ${className}`}
        style={{ width: px, height: px }}
        aria-hidden="true"
        title={service.name}
      >
        <span className="service-logo__initials">{service.placeholderInitials}</span>
      </span>
    )
  }

  return (
    <img
      className={`service-logo service-logo--img ${className}`}
      src={src}
      alt=""
      width={px}
      height={px}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}
