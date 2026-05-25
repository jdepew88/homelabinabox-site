import { Link } from 'react-router-dom'
import { Callout } from '../components/Callout'
import { CloudflareTunnelDiagram } from '../components/CloudflareTunnelDiagram'
import { CodeBlock } from '../components/CodeBlock'
import { GuidePageHero } from '../components/GuidePageHero'
import { InstallFlowSteps } from '../components/InstallFlowSteps'
import { RoutingTroubleshooting } from '../components/RoutingTroubleshooting'
import { SectionJumpNav } from '../components/SectionJumpNav'
import { CLOUDFLARE_SECTIONS } from '../content/cloudflare-sections'
import { COMMANDS, ENV_CLOUDFLARE_EXAMPLE, EXAMPLE_DOMAIN } from '../content/install'
import './guide-page.css'

const CLOUDFLARE_HERO_IMAGE = '/images/cloudflare/cloudflare-setup-flow.png'

const CLOUDFLARE_HERO_ALT =
  'How Cloudflare setup flows: buy a domain, move DNS to Cloudflare, create a tunnel, run cloudflared on the host, route through Traefik by subdomain to your container app.'

const DEFAULT_ROUTES = [
  { host: `traefik.${EXAMPLE_DOMAIN}`, target: 'http://traefik:80', app: 'Traefik dashboard' },
  { host: `manager.${EXAMPLE_DOMAIN}`, target: 'http://traefik:80', app: 'Traefik Manager' },
  { host: `port.${EXAMPLE_DOMAIN}`, target: 'http://traefik:80', app: 'Portainer' },
] as const

export function CloudflareSetup() {
  return (
    <article className="guide-page">
      <GuidePageHero
        eyebrow="Step 3 · Cloudflare"
        title={
          <>
            Connect your domain,{' '}
            <span className="guide-hero__title-accent">tunnel, and edge.</span>
          </>
        }
        lead="Connect your domain, DNS, and Cloudflare Tunnel so visitors reach Traefik over HTTPS without opening inbound 80/443 on your VPS."
        imageSrc={CLOUDFLARE_HERO_IMAGE}
        imageAlt={CLOUDFLARE_HERO_ALT}
        caption="Domain → tunnel → Traefik → your apps on subdomains"
        flowId="cloudflare-setup-flow"
      />

      <SectionJumpNav sections={CLOUDFLARE_SECTIONS} />

      <div className="guide-shell guide-body">
      <p>
        Part of the <Link to="/install">Install guide</Link>. Complete{' '}
        <Link to="/host-setup">Host Setup</Link> and copy <code>.env.example</code> to{' '}
        <code>.env</code> before starting here.
      </p>
      <InstallFlowSteps />

      <h2 id="what-cloudflare-does">1. What Cloudflare does here</h2>
      <CloudflareTunnelDiagram />
      <p>End-to-end path for a typical dashboard URL (for example Portainer):</p>
      <ol>
        <li>
          <strong>Browser</strong> — user opens <code>{`https://port.${EXAMPLE_DOMAIN}`}</code>.
        </li>
        <li>
          <strong>Cloudflare HTTPS</strong> — Cloudflare terminates TLS and presents a valid public
          certificate. Your VPS does not need inbound port 443 open for this default layout.
        </li>
        <li>
          <strong>Cloudflare Tunnel</strong> — traffic rides an outbound tunnel from your server to
          Cloudflare (no classic port forwarding on your router or VPS firewall for web).
        </li>
        <li>
          <strong>cloudflared container</strong> — the <code>cloudflared</code> service in Docker
          maintains that tunnel and forwards requests inward.
        </li>
        <li>
          <strong>Traefik :80</strong> — every public hostname in this project should target Traefik on
          internal HTTP port 80. Traefik picks the backend using the <code>Host</code> header.
        </li>
        <li>
          <strong>Containers</strong> — Portainer, Traefik Manager, Traefik dashboard, and future apps
          sit behind Traefik routers.
        </li>
      </ol>
      <Callout variant="info" title="Three ideas to remember">
        <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
          <li>
            <strong>Cloudflare handles public HTTPS certificates</strong> at the edge.
          </li>
          <li>
            <strong>The server does not need public inbound 80/443</strong> for the default tunnel
            setup (UFW can allow SSH only).
          </li>
          <li>
            <strong>Traefik still routes by hostname</strong> — tunnel hostnames must match Traefik
            routers.
          </li>
        </ul>
      </Callout>
      <Callout variant="tip" title="No Certbot / Traefik ACME">
        <p>
          You do not need Certbot or Traefik ACME in this layout. Traefik listens on HTTP inside
          Docker; HTTPS is at Cloudflare.
        </p>
      </Callout>

      <h2 id="domain">2. Register or use a domain</h2>
      <ol className="step-list">
        <li>
          <strong>Get a domain</strong> — buy from any registrar (Namecheap, Porkbun, Google Domains
          successor, etc.) or use Cloudflare Registrar where available. A inexpensive domain is enough
          for homelab use.
        </li>
        <li>
          <strong>Add the zone to Cloudflare</strong> — in the Cloudflare dashboard, add your domain.
          If you bought elsewhere, Cloudflare shows two nameservers; set those at your registrar.
        </li>
        <li>
          <strong>Wait for activation</strong> — status should become <strong>Active</strong>. DNS
          propagation can take minutes to 48 hours; often it is quick.
        </li>
        <li>
          <strong>Zero Trust</strong> — open <strong>Zero Trust</strong> (Cloudflare One) in the same
          account. The free tier is enough to create a tunnel.
        </li>
      </ol>

      <h2 id="env-vars">3. Add required Cloudflare values to .env</h2>
      <p>
        On the server, edit <code>.env</code> (from <code>.env.example</code>). These variables drive
        the setup script and Compose:
      </p>
      <CodeBlock title=".env — Cloudflare section" code={ENV_CLOUDFLARE_EXAMPLE} />
      <p>What each value is for:</p>
      <ul>
        <li>
          <code>CF_API_TOKEN</code> — API token for automated tunnel/DNS (script path only).
        </li>
        <li>
          <code>CF_ACCOUNT_ID</code> — Cloudflare account ID (dashboard sidebar or API).
        </li>
        <li>
          <code>CF_ZONE_ID</code> — zone ID for <code>DOMAIN</code>.
        </li>
        <li>
          <code>CF_TUNNEL_NAME</code> — tunnel name to create or reuse (example:{' '}
          <code>homelab-in-a-box</code>).
        </li>
        <li>
          <code>CLOUDFLARED_TOKEN</code> — connector token for the <code>cloudflared</code> container
          (filled by script or copied from the dashboard).
        </li>
        <li>
          <code>DOMAIN</code> — apex domain, e.g. <code>{EXAMPLE_DOMAIN}</code>.
        </li>
        <li>
          <code>SUBDOMAIN_*</code> — host labels; full URLs become{' '}
          <code>{'{subdomain}'}.{'{DOMAIN}'}</code>.
        </li>
      </ul>
      <p>
        Bootstrap services in <code>compose.bootstrap.yaml</code> use Traefik labels with these
        hostnames. After editing, continue with automation or manual tunnel steps below.
      </p>

      <h2 id="api-token">4. API token note</h2>
      <Callout variant="danger" title="Keep secrets off Git">
        <p>
          Never commit <code>.env</code>. Treat <code>CF_API_TOKEN</code> and{' '}
          <code>CLOUDFLARED_TOKEN</code> like passwords. Rotate if they leak.
        </p>
      </Callout>
      <p>For the automated script, create an API token in Cloudflare with permissions to:</p>
      <ul>
        <li>
          <strong>Cloudflare Tunnel</strong> — create/edit tunnels and connectors
        </li>
        <li>
          <strong>DNS</strong> — edit DNS records for your zone (for public hostnames)
        </li>
      </ul>
      <p>
        Use the least-privilege token template Cloudflare offers for <strong>Edit Cloudflare
        Tunnels</strong> and <strong>Edit zone DNS</strong> on the one zone you need.
      </p>
      <Callout variant="tip" title="Manual path is fine">
        <p>
          You can skip API automation entirely: create the tunnel in the Zero Trust dashboard, paste{' '}
          <code>CLOUDFLARED_TOKEN</code> into <code>.env</code>, and add public hostnames by hand (
          <a href="#manual">section 8</a>).
        </p>
      </Callout>

      <h2 id="automated">5. Default automated setup</h2>
      <p>
        From the repository root on your VPS (after <code>.env</code> has account/zone/token fields
        for the script):
      </p>
      <CodeBlock title="Setup script" code={COMMANDS.cloudflareSetup} />
      <p>When prompted:</p>
      <CodeBlock
        language="text"
        code={`Use default Cloudflare Tunnel setup? [Y/n]`}
      />
      <p>
        <strong>Press Enter</strong> to accept the default (<code>Y</code>). The script creates or
        updates the tunnel, DNS, and public hostnames using your <code>.env</code> values.
      </p>
      <Callout variant="warn" title="All hostnames point at Traefik">
        <p>
          Default routes send every public hostname to <code>http://traefik:80</code> —{' '}
          <em>not</em> directly to Portainer or Traefik Manager containers. Traefik routes by{' '}
          <code>Host</code> header.
        </p>
      </Callout>
      <div className="card" style={{ marginTop: '1rem' }}>
        <span className="card-tag">Default routes</span>
        <table style={{ width: '100%', fontSize: '0.875rem', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '0.5rem 0' }}>Public hostname</th>
              <th style={{ padding: '0.5rem 0' }}>Tunnel target</th>
              <th style={{ padding: '0.5rem 0' }}>Served by</th>
            </tr>
          </thead>
          <tbody>
            {DEFAULT_ROUTES.map((r) => (
              <tr key={r.host} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '0.5rem 0' }}>
                  <code>{r.host}</code>
                </td>
                <td style={{ padding: '0.5rem 0' }}>
                  <code>{r.target}</code>
                </td>
                <td style={{ padding: '0.5rem 0', color: 'var(--text-muted)' }}>{r.app}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ margin: '0.75rem 0 0', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Replace <code>{EXAMPLE_DOMAIN}</code> with your <code>DOMAIN</code> and match{' '}
          <code>SUBDOMAIN_*</code> in <code>.env</code>.
        </p>
      </div>
      <p>
        When the script finishes, confirm <code>CLOUDFLARED_TOKEN</code> is set in <code>.env</code>{' '}
        (it may write it for you). Then start the tunnel profile (next section).
      </p>

      <h2 id="tunnel-profile">6. Start cloudflared profile</h2>
      <p>
        Bootstrap Compose with the <code>tunnel-token</code> profile so the{' '}
        <code>cloudflared</code> container runs with <code>CLOUDFLARED_TOKEN</code>:
      </p>
      <CodeBlock title="Bootstrap + tunnel-token" code={COMMANDS.bootstrapTunnel} />
      <p>
        If the stack was already up without the profile, run this again — Compose adds or recreates{' '}
        <code>cloudflared</code> as defined in <code>compose.bootstrap.yaml</code>.
      </p>

      <h2 id="check-cloudflared">7. Check cloudflared</h2>
      <CodeBlock title="Status and logs" code={COMMANDS.cloudflaredLogs} />
      <ul>
        <li>
          <code>cloudflared</code> should appear in <code>docker ps</code> with status{' '}
          <code>Up</code>.
        </li>
        <li>
          Logs should show a healthy connector (no repeated auth or token errors).
        </li>
        <li>
          In Cloudflare Zero Trust → <strong>Networks</strong> → <strong>Tunnels</strong>, the tunnel
          should show <strong>Healthy</strong>.
        </li>
      </ul>
      <p>
        Then run Traefik local tests from <Link to="/install#verify">Install → Verify</Link> before
        testing in a browser.
      </p>

      <h2 id="manual">8. Manual setup path</h2>
      <p>For users who prefer not to run the API script:</p>
      <ol className="step-list">
        <li>
          Zero Trust → <strong>Networks</strong> → <strong>Tunnels</strong> →{' '}
          <strong>Create a tunnel</strong>.
        </li>
        <li>Name it (match <code>CF_TUNNEL_NAME</code> if you use one, e.g.{' '}
          <code>homelab-in-a-box</code>).</li>
        <li>
          Choose the <strong>Docker</strong> connector and copy the <strong>tunnel token</strong>.
        </li>
        <li>
          Paste into <code>.env</code>: <code>CLOUDFLARED_TOKEN=…</code>
        </li>
        <li>
          Add <strong>Public Hostnames</strong> (each → <code>http://traefik:80</code>):
          <ul>
            <li>
              <code>{`traefik.${EXAMPLE_DOMAIN}`}</code> → <code>http://traefik:80</code>
            </li>
            <li>
              <code>{`manager.${EXAMPLE_DOMAIN}`}</code> → <code>http://traefik:80</code>
            </li>
            <li>
              <code>{`port.${EXAMPLE_DOMAIN}`}</code> → <code>http://traefik:80</code>
            </li>
          </ul>
        </li>
        <li>
          Start Compose:{' '}
          <code>docker compose -f compose.bootstrap.yaml --profile tunnel-token up -d</code>
        </li>
      </ol>
      <Callout variant="info" title="Same routing rule as automation">
        <p>
          Manual and automated setups should agree: Cloudflare always forwards to Traefik; Traefik
          forwards to Portainer, Manager, or other backends.
        </p>
      </Callout>

      <h2 id="troubleshooting">9. Troubleshooting</h2>
      <RoutingTroubleshooting />
      <h3>Cloudflare-specific checks</h3>
      <ul>
        <li>
          <strong>cloudflared container missing</strong> — the <code>tunnel-token</code> profile was not
          started, or <code>CLOUDFLARED_TOKEN</code> is empty. Re-run{' '}
          <code>docker compose -f compose.bootstrap.yaml --profile tunnel-token up -d</code>.
        </li>
        <li>
          <strong>404 in browser</strong> — Traefik has no router for that <code>Host</code>. Bootstrap
          hostnames use Compose labels; apps you add use Traefik Manager. The tunnel may still be
          healthy.
        </li>
        <li>
          <strong>502</strong> — Traefik matched the route but the backend container is down, wrong
          port, or off the Docker proxy network.
        </li>
        <li>
          <strong>DNS delay</strong> — new records can take time; check with{' '}
          <code>{`dig port.${EXAMPLE_DOMAIN}`}</code> or an online DNS checker.
        </li>
        <li>
          <strong>Public hostname must point to the tunnel</strong> — in Zero Trust, each hostname
          should be attached to your tunnel, not an old A record to a bare IP (unless you know you
          need that).
        </li>
        <li>
          <strong>Test Traefik locally first</strong> — on the server, curl with{' '}
          <code>Host:</code> headers (see Install). Fix 404/502 locally before blaming Cloudflare.
        </li>
      </ul>
      <CodeBlock title="Example local test" code={COMMANDS.curlPortainer} />
      <p>
        Repeat for <code>manager.</code> and <code>traefik.</code> hostnames —{' '}
        <Link to="/install#verify">Install → Verify</Link>. More:{' '}
        <Link to="/faq">FAQ / Troubleshooting</Link>.
      </p>

      <h2 id="next">Next step</h2>
      <p>
        <Link to="/install#bootstrap">Bootstrap stack</Link> if not done ·{' '}
        <Link to="/install#verify">Verify Portainer, Traefik Manager, and Traefik</Link> ·{' '}
        <Link to="/authelia">Authelia later</Link>
      </p>
      <div className="guide-cta">
        <Link to="/install#verify" className="btn btn--primary">
          Verify routes
        </Link>
        <Link to="/install" className="btn btn--secondary">
          Install guide
        </Link>
      </div>
      </div>
    </article>
  )
}
