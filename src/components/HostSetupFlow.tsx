import { ZoomableImage } from './image-lightbox'
import './HostSetupFlow.css'

const IMAGE_SRC = '/images/host-setup/host-setup-flow.png'

const ALT =
  'How host setup flows: choose a VPS, SSH keys with PuTTYgen and Pageant, connect with PuTTY, create a non-root user, updates, UFW firewall, optional hardening, then install the project stack.'

type Props = {
  id?: string
}

export function HostSetupFlow({ id = 'host-setup-flow' }: Props) {
  return (
    <figure className="host-setup-flow" id={id}>
      <ZoomableImage
        className="host-setup-flow__img"
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
