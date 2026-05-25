const NODES = [
  'Browser',
  'Cloudflare HTTPS',
  'Cloudflare Tunnel',
  'cloudflared',
  'Traefik :80',
  'Containers',
] as const

export function CloudflareTunnelDiagram() {
  return (
    <div
      className="arch-flow arch-flow--long"
      role="img"
      aria-label="Traffic flow from browser through Cloudflare HTTPS and tunnel to cloudflared, Traefik port 80, and application containers"
    >
      {NODES.map((label, i) => (
        <span key={label} style={{ display: 'contents' }}>
          {i > 0 && <span className="arch-arrow" aria-hidden="true">→</span>}
          <span
            className={`arch-node${
              label === 'cloudflared' || label === 'Traefik :80' ? ' arch-node--accent' : ''
            }`}
          >
            {label}
          </span>
        </span>
      ))}
    </div>
  )
}
