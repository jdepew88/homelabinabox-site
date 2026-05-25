import { Link } from 'react-router-dom'
import { ArchitectureFeatureHighlights } from '../components/ArchitectureFeatureHighlights'
import { ArchitectureTrafficFlow } from '../components/ArchitectureTrafficFlow'
import { Callout } from '../components/Callout'
import { Hero } from '../components/Hero'
import { ServiceCard } from '../components/ServiceCard'
import { HOMEPAGE_SERVICES, TRAEFIK_MANAGER_SERVICE } from '../data/services'
import { COMMANDS } from '../content/install'
import { boxGridClass } from '../utils/boxGrid'
import './Home.css'

const EXAMPLE_APPS = [
  'Uptime Kuma',
  'Jellyfin',
  'Nextcloud',
  'Vaultwarden',
  'Home Assistant',
  'Paperless-ngx',
  'Grafana',
  'Immich',
  'Rocket.Chat',
]

const CORE_SERVICES = HOMEPAGE_SERVICES.filter((s) => s.tag === 'Core')
const OPTIONAL_SERVICES = HOMEPAGE_SERVICES.filter((s) => s.tag !== 'Core')

export function Home() {
  return (
    <>
      <Hero />

      <section className="section section--tight home-section">
        <div className="container">
          <div className="home-positioning">
            <p>
              Homelab in a Box is a practical starter stack for people who want a real
              self-hosted environment without having to figure out Docker networking, Traefik
              routing, Cloudflare Tunnel, Portainer, and authentication all at once.
            </p>
            <p>
              It is not magic. It gives you a working baseline you can understand, test, break,
              and extend.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--tight home-section home-section--alt">
        <div className="container">
          <div className="section-title home-architecture-title">
            <p className="home-architecture-title__eyebrow">
              <span
                className="home-architecture-title__rule home-architecture-title__rule--start"
                aria-hidden="true"
              />
              <span className="home-architecture-title__label">Architecture</span>
              <span
                className="home-architecture-title__rule home-architecture-title__rule--end"
                aria-hidden="true"
              />
            </p>
            <h2>
              How <span className="home-architecture-title__gradient">traffic</span> flows
            </h2>
            <p>HTTPS at Cloudflare; plain HTTP to Traefik inside Docker.</p>
          </div>
          <div className="home-flow-panel home-flow-panel--diagram">
            <ArchitectureTrafficFlow />
            <ArchitectureFeatureHighlights />
          </div>
        </div>
      </section>

      <section className="section home-section">
        <div className="container">
          <div className="home-services-header">
            <div className="section-title">
              <span className="home-section__label">Stack</span>
              <h2>Included services</h2>
              <p>
                A small bootstrap core you can verify before optional auth and heavier apps.
              </p>
            </div>
            <div className="home-services-legend" aria-hidden="true">
              <span className="home-legend-pill home-legend-pill--core">Core</span>
              <span className="home-legend-pill home-legend-pill--opt">Optional</span>
            </div>
          </div>
          <p className="home-section__label" style={{ marginBottom: '0.75rem' }}>
            Core
          </p>
          <div
            className={boxGridClass(CORE_SERVICES.length)}
            style={{ marginBottom: '1.75rem' }}
          >
            {CORE_SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          <p className="home-section__label" style={{ marginBottom: '0.75rem' }}>
            Optional
          </p>
          <div className={boxGridClass(OPTIONAL_SERVICES.length)}>
            {OPTIONAL_SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          <p className="logo-attribution">
            Service names and logos are trademarks of their respective owners. See{' '}
            <code>website/docs/LOGOS.md</code> to add official artwork.
          </p>
        </div>
      </section>

      <section className="section section--tight home-section home-section--alt">
        <div className="container">
          <div className="home-byoc">
            <div className="home-byoc__content">
              <span className="home-section__label">Extend</span>
              <h2>Run any container you like</h2>
              <p>
                The baseline is an edge, not a fixed app catalog. After routing works, deploy in
                Portainer and publish hostnames with Traefik Manager — same pattern for every app.
              </p>
              <ol className="home-byoc__steps">
                <li className="home-byoc__step">
                  <span className="home-byoc__step-num">1</span>
                  Deploy a stack in <strong>Portainer</strong>
                </li>
                <li className="home-byoc__step">
                  <span className="home-byoc__step-num">2</span>
                  Join the external <strong>proxy</strong> network — no host ports required
                </li>
                <li className="home-byoc__step">
                  <span className="home-byoc__step-num">3</span>
                  Add a route in <strong>Traefik Manager</strong> (hostname → container:port)
                </li>
                <li className="home-byoc__step">
                  <span className="home-byoc__step-num">4</span>
                  Point a <strong>Cloudflare</strong> hostname at <code>http://traefik:80</code>
                </li>
              </ol>
              <div className="btn-group">
                <Link to="/add-containers" className="btn btn--primary">
                  Add containers guide
                </Link>
                <a
                  href={TRAEFIK_MANAGER_SERVICE.docsUrl}
                  className="btn btn--secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Traefik Manager docs
                </a>
              </div>
              <p className="home-byoc__tm-note">
                <strong>Traefik Manager</strong> is a separate open-source project (
                <a
                  href={TRAEFIK_MANAGER_SERVICE.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  chr0nzz/traefik-manager
                </a>
                ) — not owned or maintained by Traefik Labs.
              </p>
            </div>
            <div className="home-byoc__examples">
              <h3>Popular examples</h3>
              <div className="home-app-chips">
                {EXAMPLE_APPS.map((name) => (
                  <span key={name} className="home-app-chip">
                    {name}
                  </span>
                ))}
                <Link to="/add-containers" className="home-app-chip home-app-chip--more">
                  Your app →
                </Link>
              </div>
              <Callout variant="tip" title="Uptime Kuma walkthrough">
                <p>
                  Portainer stack and Traefik Manager fields step-by-step in{' '}
                  <Link to="/add-containers#uptime">Add containers</Link>.
                </p>
              </Callout>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight home-section">
        <div className="container">
          <div className="section-title">
            <span className="home-section__label">Get started</span>
            <h2>Pick your path</h2>
            <p>Same stack — more hand-holding on one side, more commands on the other.</p>
          </div>
          <div className="home-path-grid">
            <div className="home-path-card">
              <h3>Beginner path</h3>
              <p>Host prep first, then Cloudflare, then bootstrap. Authelia comes last.</p>
              <ol>
                <li><Link to="/install">Install overview</Link></li>
                <li><Link to="/host-setup">Host Setup</Link></li>
                <li><Link to="/cloudflare">Cloudflare Setup</Link></li>
                <li><Link to="/install#bootstrap">Bootstrap stack</Link></li>
                <li><Link to="/install#verify">Verify routes</Link></li>
              </ol>
            </div>
            <div className="home-path-card home-path-card--exp">
              <h3>Experienced path</h3>
              <p>Clone, <code>.env</code>, setup script, and Compose when the host is ready.</p>
              <ol>
                <li>Clone · <code>cp .env.example .env</code></li>
                <li><code>./scripts/setup.sh</code></li>
                <li>
                  <code>{COMMANDS.bootstrap}</code>
                </li>
                <li>
                  Tunnel token in <code>.env</code>? Add{' '}
                  <code>--profile tunnel-token</code> (see Install)
                </li>
                <li>Optional auth / app profiles later</li>
              </ol>
              <p style={{ marginTop: '1rem', marginBottom: 0 }}>
                <Link to="/install#experienced">Full commands →</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight home-section home-section--alt">
        <div className="container">
          <div className="home-learn-panel">
            <span className="home-section__label">Approach</span>
            <h2>Built for learning, not blind copy-paste</h2>
            <p>
              The setup starts with a small, testable core. You verify local Traefik routes first,
              then add Cloudflare Tunnel, then add Authelia. That order makes troubleshooting
              possible.
            </p>
          </div>
        </div>
      </section>

      <section className="section home-section">
        <div className="container">
          <div className="home-cta">
            <h2>Ready to build the baseline?</h2>
            <p>
              Start with a fresh Debian or Ubuntu host — SSH, updates, and firewall — before you
              clone the repo or open Portainer.
            </p>
            <div className="btn-group">
              <Link to="/host-setup" className="btn btn--primary">
                Start Host Setup
              </Link>
              <Link to="/install" className="btn btn--secondary">
                Install overview
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
