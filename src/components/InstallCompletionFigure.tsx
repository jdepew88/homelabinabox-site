import './InstallCompletionFigure.css'

const IMAGE_SRC = '/images/install/stack-complete.png'

type Props = {
  id?: string
}

/** Shown at the end of the Install tutorial after bootstrap verification. */
export function InstallCompletionFigure({ id = 'install-complete' }: Props) {
  return (
    <figure className="install-complete" id={id}>
      <div className="install-complete__frame">
        <img
          src={IMAGE_SRC}
          alt="Stylized homelab command center: a glowing server box with routes to dashboards like Portainer, media, and git services on a local domain."
          width={1200}
          height={675}
          loading="lazy"
          decoding="async"
        />
      </div>
      <figcaption className="install-complete__caption">
        <strong>Bootstrap done.</strong> Traefik, tunnel, Portainer, and Traefik Manager are your
        control plane — add Authelia and new apps from here.
      </figcaption>
    </figure>
  )
}
