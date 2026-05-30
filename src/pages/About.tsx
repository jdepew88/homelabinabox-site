import { Link } from 'react-router-dom'
import { Callout } from '../components/Callout'
import { SITE } from '../config'
import { ZoomableImage } from '../components/image-lightbox'
import './About.css'

const HERO_IMAGE = '/images/about/about-hero.png'

const PILLARS = [
  {
    icon: '🛡️',
    title: 'Privacy first',
    body: 'Your VPS, your data. No tracking layer on the stack itself — you choose what runs.',
  },
  {
    icon: '🏠',
    title: 'Self-hosted',
    body: 'Media, files, git, uptime, notes, and more — routed on your hardware.',
  },
  {
    icon: '📦',
    title: 'Docker native',
    body: 'Isolated, portable containers behind one Traefik edge.',
  },
  {
    icon: '🔒',
    title: 'Routed & secure',
    body: 'HTTPS at Cloudflare, tunnel to Traefik, optional Authelia at the proxy.',
  },
] as const

export function About() {
  return (
    <article className="about-page">
      <header className="about-hero">
        <div className="about-hero__backdrop" aria-hidden="true" />
        <div className="about-hero__grid" aria-hidden="true" />
        <div className="about-hero__inner">
          <p className="about-hero__eyebrow">About the project</p>
          <h1 className="about-hero__title">
            Your infrastructure.{' '}
            <span className="about-hero__title-accent">You own it.</span>
          </h1>
          <p className="about-hero__lead">
            {SITE.name} is an opinionated starter stack for Debian and Ubuntu — Traefik,
            Cloudflare Tunnel, Portainer, and Traefik Manager — so you can self-host without
            stitching a dozen tutorials together.
          </p>
          <div className="about-hero__visual">
            <div className="about-hero__frame">
              <ZoomableImage
                src={HERO_IMAGE}
                alt="Self-hosted homelab diagram: internet traffic through Cloudflare Tunnel to your VPS, Docker containers, privacy-first and routed services on your own server."
                width={1400}
                height={788}
                fetchPriority="high"
                decoding="async"
              />
            </div>
            <p className="about-hero__caption">
              Internet → Cloudflare Tunnel → your server → containers you control
            </p>
          </div>
        </div>
      </header>

      <div className="container container--narrow about-body">
        <h2 className="about-pillars__heading">At a glance</h2>
        <ul className="about-pillars" aria-label="Project pillars">
          {PILLARS.map((p) => (
            <li key={p.title} className="about-pillar">
              <span className="about-pillar__icon" aria-hidden="true">
                {p.icon}
              </span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </li>
          ))}
        </ul>

        <div className="about-grid about-grid--pair">
          <section className="about-card" id="why">
            <h2>Why this exists</h2>
            <p>
              Running a homelab usually means reverse proxy, TLS, tunneling, and auth from
              scattered blog posts. We package pieces that work well together so you can focus on
              apps you actually want.
            </p>
            <p>
              Docs here follow the order most people need:{' '}
              <Link to="/host-setup">host</Link> → <Link to="/cloudflare">Cloudflare</Link> →{' '}
              <Link to="/install">install</Link> → optional{' '}
              <Link to="/authelia">Authelia</Link> and{' '}
              <Link to="/add-containers">more containers</Link>.
            </p>
          </section>

          <section className="about-card" id="philosophy">
            <h2>Design philosophy</h2>
            <ul>
              <li>
                <strong>Compose-first</strong> — one repo, clear boundaries, easy to fork.
              </li>
              <li>
                <strong>Tunnel-first</strong> — HTTPS at Cloudflare; tunnel to{' '}
                <code>http://traefik:80</code>.
              </li>
              <li>
                <strong>Progressive security</strong> — verify routes before Authelia; one router
                at a time.
              </li>
              <li>
                <strong>Beginner-readable</strong> — written for learning, not blind copy-paste.
              </li>
            </ul>
          </section>
        </div>

        <section className="about-card about-section" id="not">
          <h2>What it is not</h2>
          <p>
            Not a hosted SaaS, not a one-click appliance, and not a substitute for Cloudflare or
            Docker documentation. You still own the server, backups, updates, and secrets.
          </p>
          <Callout variant="info" title="Documentation site">
            <p style={{ margin: 0 }}>
              Guides live at{' '}
              <a href={`https://${SITE.domain}`}>{SITE.domain}</a>. Examples use{' '}
              <code>{SITE.domain}</code> — swap in your apex domain in <code>.env</code> and DNS.
            </p>
          </Callout>
        </section>

        <section className="about-card about-section about-roadmap" id="coming-soon">
          <h2>Coming soon</h2>
          <p>
            Active work on the stack repo and this site. Direction, not release dates.
          </p>

          <h3>Homelab stack and Cloudflare</h3>
          <ul>
            <li>
              <strong>Cloudflare API integration</strong> — automate zone, tunnel, and token setup.
            </li>
            <li>
              <strong>Streamlined Zero Trust hostnames</strong> — easier paths to publish new
              container routes through the tunnel and Traefik Manager.
            </li>
            <li>
              <strong>New host setup script</strong> — refreshed prep for Debian/Ubuntu before
              Compose.
            </li>
          </ul>

          <h3>Documentation and site</h3>
          <ul>
            <li>
              <strong>SSH for Mac and Linux</strong> — OpenSSH on Debian/Ubuntu (
              <code>ssh-keygen</code>, <code>ssh-copy-id</code>) alongside existing PuTTY steps on{' '}
              <Link to="/host-setup">Host Setup</Link>.
            </li>
            <li>
              <strong>Improved theming</strong> — presets, contrast, and layout polish.
            </li>
            <li>
              <strong>General site updates</strong> — aesthetics, navigation, and ease of use.
            </li>
          </ul>

          <Callout variant="tip" title="Ideas welcome">
            <p style={{ margin: 0 }}>
              Tell us what would help most via{' '}
              <a href={SITE.github} target="_blank" rel="noopener noreferrer">
                GitHub issues
              </a>
              .
            </p>
          </Callout>
        </section>

        <section className="about-card about-section" id="contribute">
          <h2>Contributing</h2>
          <p>
            Issues and pull requests are welcome on{' '}
            <a href={SITE.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            . Keep changes focused and test on a clean VM when you can.
          </p>
          <div className="about-cta">
            <Link to="/host-setup" className="btn btn--primary">
              Start Host Setup
            </Link>
            <Link to="/install" className="btn btn--secondary">
              Install overview
            </Link>
            <a
              href={SITE.github}
              className="btn btn--secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>
          </div>
        </section>
      </div>
    </article>
  )
}
