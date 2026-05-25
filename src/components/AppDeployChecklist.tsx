import { Link } from 'react-router-dom'
import './AppDeployChecklist.css'

export type DeployCheckStep = {
  title: string
  detail: string
  /** Optional monospace hint */
  mono?: string
}

export type DeployCheckPhase = {
  id: string
  label: string
  steps: DeployCheckStep[]
}

const PHASES: DeployCheckPhase[] = [
  {
    id: 'deploy',
    label: 'Deploy',
    steps: [
      {
        title: 'Container is running',
        detail: 'Healthy in Portainer or shows Up in docker ps — not restarting.',
        mono: 'docker ps --filter name=your-app',
      },
      {
        title: 'On the proxy network',
        detail:
          'Stack joins the same external network Traefik uses (often proxy or web). No host ports required.',
        mono: 'docker inspect your-app --format "{{json .NetworkSettings.Networks}}"',
      },
      {
        title: 'Internal port is correct',
        detail:
          'Use the port the app listens on inside the container (from docs or a quick exec probe), not a published host port.',
      },
    ],
  },
  {
    id: 'route',
    label: 'Route',
    steps: [
      {
        title: 'Traefik Manager route exists',
        detail: 'Hostname points at the service URL using the container name as host.',
        mono: 'http://container-name:internal-port',
      },
      {
        title: 'No duplicate hostname',
        detail:
          'Same subdomain is not defined in Compose Traefik labels and Traefik Manager.',
      },
      {
        title: 'Middleware matches your plan',
        detail: 'chain-no-auth@file for open apps, or chain-authelia@file after Authelia is set up.',
      },
    ],
  },
  {
    id: 'edge',
    label: 'Edge',
    steps: [
      {
        title: 'Cloudflare hostname → Traefik',
        detail:
          'Public hostname in Zero Trust targets http://traefik:80 — never the app container directly.',
      },
      {
        title: 'DNS / tunnel healthy',
        detail: 'Tunnel shows Healthy; new hostnames are attached to the same connector.',
      },
    ],
  },
  {
    id: 'verify',
    label: 'Verify',
    steps: [
      {
        title: 'Local curl passes',
        detail: 'Host header test against loopback returns 200, 301, or 302 — not 404 or 502.',
        mono: 'curl -I -H "Host: app.yourdomain.com" http://127.0.0.1',
      },
      {
        title: 'Browser test over HTTPS',
        detail: 'Open https://your-subdomain.yourdomain.com in a private window after local tests pass.',
      },
    ],
  },
]

type Props = {
  exampleHost?: string
}

export function AppDeployChecklist({ exampleHost = 'app.yourdomain.com' }: Props) {
  return (
    <div className="app-checklist" role="list" aria-label="Go-live checklist for a new app">
      <p className="app-checklist__intro">
        Work through each group in order. If something fails, fix that group before moving on — most
        404/502 issues are a missing route, wrong port, or a tunnel pointing past Traefik.
      </p>

      <div className="app-checklist__phases">
        {PHASES.map((phase, phaseIndex) => (
          <section
            key={phase.id}
            className="app-checklist__phase"
            role="listitem"
            aria-labelledby={`checklist-phase-${phase.id}`}
          >
            <header className="app-checklist__phase-head">
              <span className="app-checklist__phase-num" aria-hidden="true">
                {phaseIndex + 1}
              </span>
              <h3 id={`checklist-phase-${phase.id}`} className="app-checklist__phase-title">
                {phase.label}
              </h3>
            </header>
            <ol className="app-checklist__steps">
              {phase.steps.map((step) => (
                <li key={step.title} className="app-checklist__step">
                  <span className="app-checklist__marker" aria-hidden="true" />
                  <div className="app-checklist__step-body">
                    <strong className="app-checklist__step-title">{step.title}</strong>
                    <p>{step.detail}</p>
                    {step.mono && (
                      <code className="app-checklist__mono">{step.mono}</code>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>

      <div className="app-checklist__done">
        <strong>All groups green?</strong>
        <p>
          Test <code>https://{exampleHost}</code> in the browser. Still stuck? See{' '}
          <Link to="/install#troubleshoot">404 vs 502</Link> or the <Link to="/faq">FAQ</Link>.
        </p>
      </div>
    </div>
  )
}
