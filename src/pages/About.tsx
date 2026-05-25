import { Link } from 'react-router-dom'
import { Callout } from '../components/Callout'
import { DocLayout } from '../components/DocLayout'
import { SITE } from '../config'

export function About() {
  return (
    <DocLayout
      title="About"
      lead="Homelab in a Box is an opinionated starter stack for self-hosting on a single Debian or Ubuntu machine."
    >
      <h2 id="why">Why this project exists</h2>
      <p>
        Running a homelab usually means stitching together Docker, a reverse proxy, TLS,
        tunneling, and authentication from dozens of blog posts. Homelab in a Box packages
        the pieces that work well together — Traefik, Cloudflare Tunnel, Portainer, and
        Traefik Manager — so you can focus on the apps you actually want to run.
      </p>
      <p>
        The docs on this site mirror the order most people need: prepare a host, wire up
        Cloudflare, deploy the stack, then optionally add Authelia and more containers.
      </p>

      <h2 id="philosophy">Design philosophy</h2>
      <ul>
        <li><strong>Compose-first</strong> — one repo, clear service boundaries, easy to diff and fork.</li>
        <li><strong>Tunnel-first ingress</strong> — Cloudflare terminates public HTTPS; tunnel targets Traefik on <code>http://traefik:80</code>.</li>
        <li><strong>Progressive security</strong> — verify bootstrap routes before Authelia; protect one router at a time.</li>
        <li><strong>Beginner-readable</strong> — scripts and docs assume you are learning, not just copying.</li>
      </ul>

      <h2 id="not">What it is not</h2>
      <p>
        This is not a hosted SaaS, a one-click appliance image, or a replacement for reading
        Cloudflare and Docker documentation. You still own the server, backups, updates,
        and secret management.
      </p>

      <Callout variant="info" title="Documentation site">
        <p>
          Guides are published at{' '}
          <a href={`https://${SITE.domain}`}>{SITE.domain}</a>. Examples use{' '}
          <code>{SITE.domain}</code> in examples — substitute your own apex domain in{' '}
          <code>.env</code> and DNS.
        </p>
      </Callout>

      <h2 id="coming-soon">Coming soon</h2>
      <p>
        Active work on the stack repo and this site. Nothing here is a release promise — it is
        the direction we are building toward.
      </p>

      <h3>Homelab stack and Cloudflare</h3>
      <ul>
        <li>
          <strong>Cloudflare API integration</strong> — automate more of zone, tunnel, and token
          setup instead of hand-copying dashboard values.
        </li>
        <li>
          <strong>Streamlined Zero Trust hostnames</strong> — clearer paths to add new container
          routes to the Cloudflare Tunnel (alongside Traefik Manager), with less dashboard hunting.
        </li>
        <li>
          <strong>New host setup script</strong> — a refreshed script in the Homelab-in-a-box repo
          for preparing Debian/Ubuntu hosts before Compose.
        </li>
      </ul>

      <h3>Documentation and site</h3>
      <ul>
        <li>
          <strong>SSH for Mac and Linux</strong> — OpenSSH workflows on Debian and Ubuntu (
          <code>ssh-keygen</code>, <code>ssh-copy-id</code>, and native terminals), not only
          PuTTY/Pageant on Windows. <Link to="/host-setup">Host Setup</Link> will keep Windows
          steps and add parallel paths.
        </li>
        <li>
          <strong>Improved theming</strong> — refined presets, contrast, and layout polish across
          doc pages.
        </li>
        <li>
          <strong>General site updates</strong> — better aesthetics, navigation, and ease of use
          as the docs grow.
        </li>
      </ul>

      <Callout variant="tip" title="Ideas welcome">
        <p>
          If a coming-soon item would help you most, open an issue on{' '}
          <a href={SITE.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>{' '}
          — stack changes and site docs can be tracked separately.
        </p>
      </Callout>

      <h2 id="contribute">Contributing</h2>
      <p>
        Issues and pull requests are welcome on{' '}
        <a href={SITE.github} target="_blank" rel="noopener noreferrer">GitHub</a>.
        If you improve host scripts, Compose files, or these docs, keep changes focused
        and test on a clean VM when you can.
      </p>
      <p>
        Next step: <Link to="/host-setup">Host Setup</Link> if you are starting from a new server,
        or <Link to="/install">Install</Link> if the machine is already prepared.
      </p>
    </DocLayout>
  )
}
