import { ZoomableImage } from './image-lightbox'
import './AutheliaAccessFlow.css'

const IMAGE_SRC = '/images/authelia/protected-access-flow.png'

const ALT =
  'How protected access flows: browser over HTTPS to Cloudflare, through Cloudflare Tunnel and cloudflared to Traefik, Authelia login and policy check, then protected containers.'

type Props = {
  id?: string
}

export function AutheliaAccessFlow({ id = 'protected-access-flow' }: Props) {
  return (
    <figure className="authelia-flow" id={id}>
      <ZoomableImage
        className="authelia-flow__img"
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
