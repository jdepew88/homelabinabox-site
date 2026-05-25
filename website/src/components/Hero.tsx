import { Link } from 'react-router-dom'
import { SITE } from '../config'
import './hero.css'

const HERO_LOGO = '/images/homelab-in-a-box-logo.png'

const TRAFFIC_FLOW = ['Browser', 'Cloudflare', 'Tunnel', 'Traefik', 'Containers'] as const

const FLOATING_BADGES = [
  { label: 'Traefik', corner: 'tl' },
  { label: 'Docker Compose', corner: 'tr' },
  { label: 'Cloudflare Tunnel', corner: 'bl' },
  { label: 'Portainer', corner: 'br' },
] as const

const STACK_CHIPS = ['Docker', 'Traefik', 'Cloudflare', 'Portainer'] as const

const STAT_BADGES = [
  'Debian / Ubuntu VPS',
  'No inbound 80/443',
  'Real docs, real order',
  'Optional Authelia',
] as const

const FEATURES = [
  {
    title: 'Secure by default',
    body: 'HTTPS at the edge with Cloudflare Tunnel, no exposed inbound 80/443 required.',
  },
  {
    title: 'Docker native',
    body: 'Built around Docker Compose so services are readable, portable, and easy to extend.',
  },
  {
    title: 'Beginner friendly',
    body: 'Host setup, DNS, firewall, SSH, tunnel, and reverse proxy steps are written in order.',
  },
  {
    title: 'Expandable',
    body: 'Start with the core stack, then add Authelia, dashboards, and new apps as you grow.',
  },
] as const

export function Hero() {
  return (
    <section className="hiab-hero" aria-labelledby="hero-heading">
      <div className="hiab-hero__backdrop" aria-hidden="true" />
      <div className="hiab-hero__grid-pattern" aria-hidden="true" />

      <div className="hiab-hero__container">
        <div className="hiab-hero__layout">
          <div className="hiab-hero__visual">
            <div className="hiab-hero__visual-glow" aria-hidden="true" />
            <div className="hiab-hero__card">
              <div className="hiab-hero__card-inner">
                {FLOATING_BADGES.map(({ label, corner }) => (
                  <span
                    key={label}
                    className={`hiab-hero__badge hiab-hero__badge--${corner}`}
                  >
                    {label}
                  </span>
                ))}
                <img
                  src={HERO_LOGO}
                  alt="Homelab in a Box — open server box routing containers to app subdomains"
                  className="hiab-hero__img"
                  width={1024}
                  height={1024}
                  fetchPriority="high"
                  decoding="async"
                />
                <div className="hiab-hero__chips" aria-hidden="true">
                  {STACK_CHIPS.map((name) => (
                    <span key={name} className="hiab-hero__chip">
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="hiab-hero__copy">
            <p className="hiab-hero__eyebrow">Open source · Docker Compose · Traefik</p>

            <h1 id="hero-heading" className="hiab-hero__title">
              Homelab in a <span className="hiab-hero__title-accent">Box</span>
            </h1>

            <p className="hiab-hero__subhead">
              A beginner-friendly Docker stack that gets Traefik, Cloudflare Tunnel, Portainer,
              Traefik Manager, and optional Authelia running on a clean VPS or homelab host —
              without turning setup into a weekend-long scavenger hunt.
            </p>

            <div className="hiab-hero__actions">
              <Link to="/install" className="hiab-hero__cta hiab-hero__cta--primary">
                Start the Install
              </Link>
              <a
                href={SITE.github}
                className="hiab-hero__cta hiab-hero__cta--secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
            </div>

            <p className="hiab-hero__tagline">
              Start simple. Add security. Route every app by subdomain.
            </p>

            <div className="hiab-hero__pills">
              {STAT_BADGES.map((badge) => (
                <span key={badge} className="hiab-hero__pill">
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="hiab-hero__flow">
          <p className="sr-only">Traffic flow from browser to containers</p>
          <ol className="hiab-hero__flow-track">
            {TRAFFIC_FLOW.map((step, index) => (
              <li key={step} className="hiab-hero__flow-step">
                <span className="hiab-hero__flow-node">{step}</span>
                {index < TRAFFIC_FLOW.length - 1 && (
                  <span className="hiab-hero__flow-arrow" aria-hidden="true">
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>

        <div className="hiab-hero__features">
          {FEATURES.map((feature) => (
            <article key={feature.title} className="hiab-hero__feature">
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
