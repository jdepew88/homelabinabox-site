import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Callout } from '../components/Callout'
import { CodeBlock } from '../components/CodeBlock'
import { RoutingTroubleshooting } from '../components/RoutingTroubleshooting'
import { SITE } from '../config'
import { COMMANDS, EXAMPLE_DOMAIN } from '../content/install'
import { ZoomableImage } from '../components/image-lightbox'
import './FAQ.css'

const FAQ_HERO_IMAGE = '/images/faq/faq-hero.png'

type FaqItem = {
  q: string
  a: ReactNode
  chip: string
}

const FAQ_ITEMS: FaqItem[] = [
  {
    chip: '404',
    q: 'curl returns 404 with a Host header',
    a: (
      <>
        <p>
          Traefik has no router for that hostname. Bootstrap services use Compose labels; apps you
          add use Traefik Manager routes.
        </p>
        <CodeBlock code={COMMANDS.curlPortainer} />
        <p>
          See <Link to="/install#troubleshoot">Install → 404 vs 502</Link>.
        </p>
      </>
    ),
  },
  {
    chip: '502',
    q: 'curl returns 502',
    a: (
      <p>
        Traefik matched the route but the backend is unreachable (wrong port, container stopped, or
        not attached to the proxy network). Inspect <code>docker logs traefik --tail=100</code>.
      </p>
    ),
  },
  {
    chip: 'Tunnel',
    q: 'Tunnel shows healthy but I get Error 1033 or 502 in the browser',
    a: (
      <>
        <p>
          Usually the public hostname does not point at <code>http://traefik:80</code>, or Traefik
          cannot reach the backend container.
        </p>
        <ul>
          <li>Run <code>docker compose ps</code> and confirm services are up</li>
          <li>
            In Cloudflare Zero Trust, each public hostname should target{' '}
            <code>http://traefik:80</code> — not Portainer or an app container directly
          </li>
          <li>Check Traefik logs: <code>docker compose logs traefik</code></li>
        </ul>
      </>
    ),
  },
  {
    chip: 'Portainer',
    q: 'Portainer works locally but not through the tunnel',
    a: (
      <p>
        Point the tunnel hostname at <code>http://traefik:80</code>, not at Portainer directly.
        Traefik routes <code>{`Host: port.${EXAMPLE_DOMAIN}`}</code> to Portainer on internal port{' '}
        <code>9000</code>.
      </p>
    ),
  },
  {
    chip: 'Authelia',
    q: 'Authelia redirect loop',
    a: (
      <>
        <p>Forward-auth misconfiguration often causes loops.</p>
        <ul>
          <li>Confirm Authelia container URL matches what Traefik middleware expects</li>
          <li>Exclude Authelia&apos;s own router from the auth middleware</li>
          <li>Clear browser cookies for your domain and retry</li>
        </ul>
      </>
    ),
  },
  {
    chip: 'Docker',
    q: 'Permission denied on Docker socket',
    a: (
      <>
        <p>Add your user to the <code>docker</code> group and re-login:</p>
        <CodeBlock code={`sudo usermod -aG docker $USER`} />
      </>
    ),
  },
  {
    chip: 'Compose',
    q: 'Compose file not found or wrong project name',
    a: (
      <p>
        Run commands from the repository root that contains <code>compose.bootstrap.yaml</code>.
        Use <code>docker compose ls</code> to see project names. Do not combine{' '}
        <code>compose.yaml</code> and <code>compose.bootstrap.yaml</code> on the same{' '}
        <code>up</code> command.
      </p>
    ),
  },
  {
    chip: 'Firewall',
    q: 'Should I expose ports 80 and 443 on my router?',
    a: (
      <p>
        With Cloudflare Tunnel you generally should not. Keep UFW tight and rely on the
        outbound tunnel. If you add traditional TLS on Traefik, document it separately.
      </p>
    ),
  },
]

const QUICK_REF = [
  { code: '404', label: 'No router', hint: 'Traefik does not recognize the Host header.' },
  { code: '502', label: 'Bad gateway', hint: 'Route matched but the container is unreachable.' },
  { code: '1033', label: 'Cloudflare edge', hint: 'Tunnel or origin target is misconfigured.' },
] as const

export function FAQ() {
  return (
    <article className="faq-page">
      <header className="faq-hero">
        <div className="faq-hero__backdrop" aria-hidden="true" />
        <div className="faq-hero__grid" aria-hidden="true" />
        <div className="faq-hero__inner">
          <div className="faq-hero__layout">
            <div className="faq-hero__copy">
              <p className="faq-hero__eyebrow">Help & troubleshooting</p>
              <h1 className="faq-hero__title">
                Fix the stack,{' '}
                <span className="faq-hero__title-accent">not your patience.</span>
              </h1>
              <p className="faq-hero__lead">
                Common fixes for tunnel, Traefik, Portainer, and Authelia — plus how to read 404 vs
                502 before you rebuild everything.
              </p>
              <nav aria-label="Jump to questions">
                <ul className="faq-hero__chips">
                  {FAQ_ITEMS.map((item, i) => (
                    <li key={item.q}>
                      <a className="faq-hero__chip" href={`#faq-${i}`}>
                        {item.chip}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div className="faq-hero__visual">
              <div className="faq-hero__frame">
                <ZoomableImage
                  src={FAQ_HERO_IMAGE}
                  alt="Homelab in a Box FAQ: Cloudflare Tunnel routing to self-hosted apps, common setup questions, and a homelab server stack illustration."
                  width={1024}
                  height={682}
                  fetchPriority="high"
                  decoding="async"
                />
              </div>
              <p className="faq-hero__caption">
                Tunnel, Traefik, and your apps — answers before you tear it all down
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="container container--narrow faq-body">
        <ul className="faq-quick" aria-label="HTTP status quick reference">
          {QUICK_REF.map((r) => (
            <li key={r.code} className="faq-quick__item">
              <strong>{r.code}</strong>
              <span>
                {r.label} — {r.hint}
              </span>
            </li>
          ))}
        </ul>

        <Callout variant="tip" title="Gather logs first">
          <p style={{ margin: 0 }}>
            <code>docker ps</code>, <code>docker logs traefik --tail=100</code>, and Cloudflare
            tunnel diagnostics solve most cases faster than re-installing. Full checklist:{' '}
            <Link to="/install#verify">Install → Verify</Link>.
          </p>
        </Callout>

        <section className="faq-card faq-card--highlight" id="http-codes">
          <RoutingTroubleshooting />
        </section>

        {FAQ_ITEMS.map((item, i) => (
          <section key={item.q} id={`faq-${i}`} className="faq-card faq-item">
            <h2 className="faq-item__q">{item.q}</h2>
            {item.a}
          </section>
        ))}

        <section className="faq-card faq-stuck" id="still-stuck">
          <h2>Still stuck?</h2>
          <p>
            Open an issue on{' '}
            <a href={SITE.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>{' '}
            with redacted <code>.env</code> keys, output of <code>docker compose ps</code>, and the
            public hostname you are testing.
          </p>
          <div className="faq-cta">
            <Link to="/install#troubleshoot" className="btn btn--primary">
              Install troubleshooting
            </Link>
            <Link to="/cloudflare" className="btn btn--secondary">
              Cloudflare Setup
            </Link>
            <Link to="/host-setup" className="btn btn--secondary">
              Host Setup
            </Link>
          </div>
        </section>
      </div>
    </article>
  )
}
