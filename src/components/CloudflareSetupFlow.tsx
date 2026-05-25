import './CloudflareSetupFlow.css'

const IMAGE_SRC = '/images/cloudflare/cloudflare-setup-flow.png'

const ALT =
  'How Cloudflare setup flows: buy a domain, move DNS to Cloudflare, create a tunnel, run cloudflared on the host, route through Traefik by subdomain to your container app.'

type Props = {
  id?: string
}

export function CloudflareSetupFlow({ id = 'cloudflare-setup-flow' }: Props) {
  return (
    <figure className="cloudflare-setup-flow" id={id}>
      <img
        className="cloudflare-setup-flow__img"
        src={IMAGE_SRC}
        alt={ALT}
        width={1200}
        height={675}
        loading="lazy"
        decoding="async"
      />
    </figure>
  )
}
