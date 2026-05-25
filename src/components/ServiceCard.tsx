import type { ServiceMeta } from '../data/services'
import { ServiceLogo } from './ServiceLogo'
import './ServiceCard.css'

type Props = {
  service: ServiceMeta
}

export function ServiceCard({ service }: Props) {
  const links = [
    service.docsUrl && { href: service.docsUrl, label: 'Docs' },
    service.repoUrl && { href: service.repoUrl, label: 'GitHub' },
    service.dockerHubUrl && { href: service.dockerHubUrl, label: 'Docker Hub' },
  ].filter(Boolean) as { href: string; label: string }[]

  return (
    <article className="service-card card">
      <div className="service-card__head">
        <ServiceLogo service={service} size={128} />
        <div className="service-card__titles">
          <span className="card-tag">{service.tag}</span>
          <h3>{service.name}</h3>
        </div>
      </div>
      <p>{service.description}</p>
      {service.affiliationNote && (
        <p className="service-card__note">{service.affiliationNote}</p>
      )}
      {service.defaultPort !== undefined && (
        <p className="service-card__meta">
          Typical internal port: <code>{service.defaultPort}</code>
        </p>
      )}
      {links.length > 0 && (
        <p className="service-card__links">
          {links.map((l, i) => (
            <span key={l.href}>
              {i > 0 && ' · '}
              <a href={l.href} target="_blank" rel="noopener noreferrer">
                {l.label}
              </a>
            </span>
          ))}
        </p>
      )}
    </article>
  )
}
