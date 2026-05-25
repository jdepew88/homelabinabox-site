import { Link } from 'react-router-dom'
import { Callout } from '../components/Callout'
import { CodeBlock } from '../components/CodeBlock'
import { DocLayout } from '../components/DocLayout'
import { RoutingTroubleshooting } from '../components/RoutingTroubleshooting'
import { COMMANDS, EXAMPLE_DOMAIN } from '../content/install'

const FAQ_ITEMS = [
  {
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
    q: 'curl returns 502',
    a: (
      <p>
        Traefik matched the route but the backend is unreachable (wrong port, container stopped, or
        not attached to the proxy network). Inspect <code>docker logs traefik --tail=100</code>.
      </p>
    ),
  },
  {
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
    q: 'Permission denied on Docker socket',
    a: (
      <>
        <p>Add your user to the <code>docker</code> group and re-login:</p>
        <CodeBlock code={`sudo usermod -aG docker $USER`} />
      </>
    ),
  },
  {
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
    q: 'Should I expose ports 80 and 443 on my router?',
    a: (
      <p>
        With Cloudflare Tunnel you generally should not. Keep UFW tight and rely on the
        outbound tunnel. If you add traditional TLS on Traefik, document it separately.
      </p>
    ),
  },
]

export function FAQ() {
  return (
    <DocLayout
      title="FAQ / Troubleshooting"
      lead="Common issues when bringing up the tunnel, Traefik, and optional Authelia."
      toc={FAQ_ITEMS.map((item, i) => ({
        id: `faq-${i}`,
        label: item.q,
      }))}
    >
      <Callout variant="tip" title="Gather logs first">
        <p>
          <code>docker ps</code>, <code>docker logs traefik --tail=100</code>, and Cloudflare
          tunnel diagnostics solve most cases faster than re-installing. Full checklist:{' '}
          <Link to="/install#verify">Install → Verify</Link>.
        </p>
      </Callout>

      <RoutingTroubleshooting />

      {FAQ_ITEMS.map((item, i) => (
        <section key={item.q} id={`faq-${i}`}>
          <h2>{item.q}</h2>
          {item.a}
        </section>
      ))}

      <h2>Still stuck?</h2>
      <p>
        Open an issue on GitHub with redacted <code>.env</code> keys, output of{' '}
        <code>docker compose ps</code>, and the public hostname you are testing.
      </p>
      <p>
        Review guides: <Link to="/host-setup">Host Setup</Link>,{' '}
        <Link to="/cloudflare">Cloudflare</Link>, <Link to="/install">Install</Link>.
      </p>
    </DocLayout>
  )
}
