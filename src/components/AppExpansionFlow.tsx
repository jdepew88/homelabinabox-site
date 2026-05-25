import './AppExpansionFlow.css'

const IMAGE_SRC = '/images/add-containers/app-expansion-flow.png'

const ALT =
  'How app expansion flows: Docker base stack with Traefik, Portainer to deploy containers, Traefik Manager for routes and middleware, new apps on the proxy network, and live subdomains routed behind Traefik.'

type Props = {
  id?: string
}

export function AppExpansionFlow({ id = 'app-expansion-flow' }: Props) {
  return (
    <figure className="app-expansion-flow" id={id}>
      <img
        className="app-expansion-flow__img"
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
