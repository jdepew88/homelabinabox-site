const NODES = [
  { label: 'Browser', accent: false },
  { label: 'Cloudflare', accent: false },
  { label: 'cloudflared', accent: true },
  { label: 'Traefik', accent: true },
  { label: 'Containers', accent: false },
] as const

export function ArchitectureDiagram() {
  return (
    <div className="arch-flow" role="img" aria-label="Request flow: Browser through Cloudflare, cloudflared, Traefik, to containers">
      {NODES.map((node, i) => (
        <span key={node.label} style={{ display: 'contents' }}>
          {i > 0 && <span className="arch-arrow" aria-hidden="true">→</span>}
          <span
            className={`arch-node${node.accent ? ' arch-node--accent' : ''}`}
          >
            {node.label}
          </span>
        </span>
      ))}
    </div>
  )
}
