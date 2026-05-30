type Props = {
  /** Default h3 under an existing h2; use 2 when this block starts a major section (e.g. FAQ). */
  headingLevel?: 2 | 3
}

export function RoutingTroubleshooting({ headingLevel = 3 }: Props) {
  const Title = headingLevel === 2 ? 'h2' : 'h3'

  return (
    <div className="routing-notes">
      <Title>Reading HTTP responses</Title>
      <ul>
        <li>
          <strong>404</strong> — Traefik received the request but has no matching router for that{' '}
          <code>Host</code> header. Bootstrap hostnames use labels in{' '}
          <code>compose.bootstrap.yaml</code>; apps you add use Traefik Manager routes. Confirm{' '}
          <code>DOMAIN</code> / <code>SUBDOMAIN_*</code> in <code>.env</code>.
        </li>
        <li>
          <strong>502</strong> — Traefik matched a route but cannot reach the backend container
          (wrong port, container down, or not on the proxy network).
        </li>
        <li>
          <strong>Cloudflare handles public HTTPS</strong> — visitors use <code>https://</code> at the
          edge. Between Cloudflare and your host, the tunnel carries traffic to Traefik.
        </li>
        <li>
          <strong>Traefik uses internal HTTP :80</strong> — in the default tunnel setup, routers
          listen on port 80 inside Docker. You do not need Certbot or Traefik ACME certificates
          for that path.
        </li>
        <li>
          <strong>No Certbot / Traefik ACME in the default setup</strong> — only add ACME if you
          deliberately terminate TLS on the host instead of (or in addition to) Cloudflare.
        </li>
      </ul>
    </div>
  )
}
