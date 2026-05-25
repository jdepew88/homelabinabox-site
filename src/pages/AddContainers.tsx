import { Link } from 'react-router-dom'
import { AppDeployChecklist } from '../components/AppDeployChecklist'
import { AppExpansionFlow } from '../components/AppExpansionFlow'
import { Callout } from '../components/Callout'
import { CodeBlock } from '../components/CodeBlock'
import { DocLayout } from '../components/DocLayout'
import { InstallFlowSteps } from '../components/InstallFlowSteps'
import { EXAMPLE_DOMAIN } from '../content/install'
import { boxGridClass } from '../utils/boxGrid'
import './AddContainers.css'

const EXAMPLE_HOST = `uptime.${EXAMPLE_DOMAIN}`

const UPTIME_STACK = `services:
  uptime-kuma:
    image: louislam/uptime-kuma:latest
    container_name: uptime-kuma
    restart: unless-stopped
    networks:
      - proxy
    volumes:
      - uptime-kuma-data:/app/data

volumes:
  uptime-kuma-data:

networks:
  proxy:
    external: true`

const UPTIME_TESTS = `docker inspect uptime-kuma --format '{{json .NetworkSettings.Networks}}' | jq
docker exec traefik wget -S -O- http://uptime-kuma:3001
curl -I -H "Host: uptime.${EXAMPLE_DOMAIN}" http://127.0.0.1`

const ROUTE_FIELDS: [string, string][] = [
  ['Router name', 'uptime-kuma'],
  ['Host rule', `Host(\`uptime.${EXAMPLE_DOMAIN}\`)`],
  ['EntryPoint', 'web'],
  ['Service name', 'uptime-kuma-svc'],
  ['Service URL', 'http://uptime-kuma:3001'],
  ['Middleware', 'chain-no-auth@file or chain-authelia@file'],
]

export function AddContainers() {
  return (
    <DocLayout
      title="Add More Containers"
      lead="Deploy apps in Portainer, publish them with Traefik Manager, and keep every public hostname pointed at Traefik — same workflow for every new service."
      toc={[
        { id: 'app-expansion-flow', label: 'App expansion flow' },
        { id: 'roles', label: 'Who does what' },
        { id: 'pattern', label: 'Workflow' },
        { id: 'checklist', label: 'Go-live checklist' },
        { id: 'uptime', label: 'Example: Uptime Kuma' },
        { id: 'manager-route', label: 'Traefik Manager route' },
        { id: 'testing', label: 'Testing' },
        { id: 'rules', label: 'Labels vs Manager' },
        { id: 'next', label: 'Related guides' },
      ]}
    >
      <InstallFlowSteps />

      <Callout variant="info" title="Prerequisites">
        <p>
          Bootstrap is verified (<Link to="/install#verify">Install → Verify</Link>). Cloudflare
          hostnames already point at <code>http://traefik:80</code> (
          <Link to="/cloudflare">Cloudflare Setup</Link>).
        </p>
      </Callout>

      <AppExpansionFlow />

      <h2 id="roles">Who does what</h2>
      <div className={boxGridClass(4)}>
        <div className="card">
          <span className="card-tag">Deploy</span>
          <h3>Portainer</h3>
          <p>
            Create and manage containers and stacks (Portainer UI on internal port{' '}
            <code>9000</code>).
          </p>
        </div>
        <div className="card">
          <span className="card-tag">Routes</span>
          <h3>Traefik Manager</h3>
          <p>
            Add dynamic routes from a public hostname to a container (UI on internal port{' '}
            <code>5000</code>).
          </p>
        </div>
        <div className="card">
          <span className="card-tag">Proxy</span>
          <h3>Traefik</h3>
          <p>Reverse proxy — matches <code>Host</code> headers and forwards to backends.</p>
        </div>
        <div className="card">
          <span className="card-tag">Edge</span>
          <h3>Cloudflare Tunnel</h3>
          <p>Public HTTPS at the edge; tunnel forwards to Traefik, not directly to your app.</p>
        </div>
      </div>

      <h2 id="pattern">Workflow</h2>
      <p>
        Every new app follows the same sequence. Skip a step and you will usually see a 404 (no
        router) or 502 (router exists but backend is unreachable).
      </p>
      <ol className="step-list">
        <li>
          <strong>Deploy the stack in Portainer</strong> — Stacks → Add stack. Set a clear{' '}
          <code>container_name</code>; that name is the hostname Traefik uses on the Docker network.
        </li>
        <li>
          <strong>Attach the proxy network</strong> — same external network as Traefik (
          <code>proxy</code> or <code>web</code> in this project). Do not publish host ports unless
          you are debugging locally.
        </li>
        <li>
          <strong>Add the route in Traefik Manager</strong> —{' '}
          <code>http://container-name:internal-port</code>. No Traefik labels on user stacks.
        </li>
        <li>
          <strong>Confirm the Cloudflare hostname</strong> — targets <code>http://traefik:80</code>,
          not the app container.
        </li>
        <li>
          <strong>Test with curl, then the browser</strong> — local <code>Host</code> header first,
          then <code>https://</code> through the tunnel.
        </li>
      </ol>

      <h2 id="checklist">Go-live checklist</h2>
      <p>
        Run through this for every app — including the Uptime Kuma walkthrough below. Print it
        mentally in four blocks: deploy, route, edge, verify.
      </p>
      <AppDeployChecklist exampleHost={EXAMPLE_HOST} />

      <h2 id="uptime">Example: Uptime Kuma</h2>
      <p>
        Uptime Kuma listens on <strong>port 3001</strong> inside the container. Deploy in Portainer
        (change <code>proxy</code> if your bootstrap network uses <code>web</code>):
      </p>
      <CodeBlock title="Portainer stack" language="yaml" code={UPTIME_STACK} />
      <Callout variant="tip" title="Network name">
        <p>
          Run <code>docker network ls</code> and use the external network Traefik is on — it must
          match bootstrap Compose.
        </p>
      </Callout>

      <h2 id="manager-route">Traefik Manager route</h2>
      <p>
        In Traefik Manager (<code>https://manager.{EXAMPLE_DOMAIN}</code>), create a route like:
      </p>
      <div className="card add-containers-table-card">
        <table className="add-containers-kv">
          <tbody>
            {ROUTE_FIELDS.map(([label, value]) => (
              <tr key={label}>
                <td>{label}</td>
                <td>
                  <code>{value}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul>
        <li>
          <code>chain-no-auth@file</code> — no forward-auth (only if the app is safe to expose).
        </li>
        <li>
          <code>chain-authelia@file</code> — protect with Authelia after{' '}
          <Link to="/authelia">Authelia Setup</Link>.
        </li>
        <li>
          Add <code>uptime.{EXAMPLE_DOMAIN}</code> in Cloudflare Zero Trust → public hostname →{' '}
          <code>http://traefik:80</code>.
        </li>
      </ul>

      <h2 id="testing">Testing</h2>
      <CodeBlock title="Connectivity checks" code={UPTIME_TESTS} />
      <div className={boxGridClass(3)}>
        <div className="card">
          <h3>Network</h3>
          <p>
            <code>docker inspect … | jq</code> — container is on the proxy network with Traefik.
          </p>
        </div>
        <div className="card">
          <h3>From Traefik</h3>
          <p>
            <code>docker exec traefik wget …</code> — Traefik reaches{' '}
            <code>uptime-kuma:3001</code> by name.
          </p>
        </div>
        <div className="card">
          <h3>Host routing</h3>
          <p>
            <code>curl -H Host:…</code> — Traefik on the host routes by{' '}
            <code>Host</code> header.
          </p>
        </div>
      </div>

      <h2 id="rules">Labels vs Traefik Manager</h2>
      <Callout variant="warn" title="One hostname, one source">
        <p>
          Do not define the same subdomain in Compose Traefik labels <em>and</em> Traefik Manager.
        </p>
      </Callout>
      <ul>
        <li>
          <strong>Bootstrap services</strong> — Traefik, Portainer, Traefik Manager, cloudflared:
          routes live in <code>compose.bootstrap.yaml</code> labels.
        </li>
        <li>
          <strong>Apps you add</strong> — label-free stacks in Portainer; routes only in Traefik
          Manager.
        </li>
        <li>
          <strong>Service URLs</strong> — use Docker DNS names (
          <code>http://uptime-kuma:3001</code>), not <code>127.0.0.1</code> from Traefik’s view.
        </li>
        <li>
          <strong>Cloudflare</strong> — always <code>http://traefik:80</code> on the tunnel.
        </li>
      </ul>
      <p>
        <strong>404</strong> — no router for that <code>Host</code>. <strong>502</strong> — router
        matched but backend unreachable (port, network, or container down).{' '}
        <Link to="/install#troubleshoot">Install → 404 vs 502</Link>.
      </p>

      <h2 id="next">Related guides</h2>
      <ul>
        <li>
          <Link to="/cloudflare#hostnames">Cloudflare → Public hostnames</Link>
        </li>
        <li>
          <Link to="/authelia">Authelia</Link> — switch to <code>chain-authelia@file</code> when
          ready
        </li>
        <li>
          <Link to="/faq">FAQ / Troubleshooting</Link>
        </li>
      </ul>
    </DocLayout>
  )
}
