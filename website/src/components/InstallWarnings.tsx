export function InstallWarnings() {
  const items = [
    {
      title: 'Do not commit .env',
      text: 'It holds tunnel tokens and passwords. Use .env.example as the template only.',
    },
    {
      title: 'Do not expose secrets',
      text: 'Keep API tokens, tunnel tokens, and passwords in .env on the server — not in Git, screenshots, or public issues.',
    },
    {
      title: 'Test SSH before UFW restrictions',
      text: 'Confirm key login in a second terminal before enabling UFW or disabling password auth.',
    },
    {
      title: 'Add Authelia after bootstrap works',
      text: 'Bring up Traefik, cloudflared, Portainer, and Traefik Manager first. Enable the auth profile only after routes verify.',
    },
    {
      title: 'Protect one service at a time',
      text: 'Apply Authelia forward-auth to one router at a time (for example Traefik dashboard, then Traefik Manager, then Portainer).',
    },
  ]

  return (
    <div className="safety-grid" role="note" aria-label="Install warnings">
      {items.map((item) => (
        <div key={item.title} className="safety-item">
          <span className="icon" aria-hidden="true">
            ⚠
          </span>
          <div>
            <strong>{item.title}</strong>
            <p>{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
