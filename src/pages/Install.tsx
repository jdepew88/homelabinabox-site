import { Link } from 'react-router-dom'
import { Callout } from '../components/Callout'
import { CodeBlock } from '../components/CodeBlock'
import { InstallJumpNav } from '../components/InstallJumpNav'
import { InstallFlowSteps } from '../components/InstallFlowSteps'
import { InstallCompletionFigure } from '../components/InstallCompletionFigure'
import { InstallWarnings } from '../components/InstallWarnings'
import { RoutingTroubleshooting } from '../components/RoutingTroubleshooting'
import {
  COMMANDS,
  COMPOSE_BOOTSTRAP_AVOID_CMD,
  COMPOSE_BOOTSTRAP_AVOID_WHY,
  EXAMPLE_DOMAIN,
  SERVICE_PORTS,
} from '../content/install'
import './Install.css'

const INSTALL_HERO_IMAGE = '/images/install/install-hero.png'

export function Install() {
  return (
    <article className="install-page">
      <header className="install-hero">
        <div className="install-hero__backdrop" aria-hidden="true" />
        <div className="install-hero__grid" aria-hidden="true" />
        <div className="install-hero__inner">
          <div className="install-hero__layout">
            <div className="install-hero__copy">
              <p className="install-hero__eyebrow">Installation guide</p>
              <h1 className="install-hero__title">
                Bootstrap the stack,{' '}
                <span className="install-hero__title-accent">then expand.</span>
              </h1>
              <p className="install-hero__lead">
                Get Traefik, cloudflared, Portainer, and Traefik Manager working first — without
                Authelia. Add authentication and more apps only after routing is verified.
              </p>
            </div>
            <div className="install-hero__visual">
              <div className="install-hero__frame">
                <img
                  src={INSTALL_HERO_IMAGE}
                  alt="Homelab in a Box installation: Docker Compose on a server, Cloudflare Tunnel and Traefik routing, Portainer and Authelia services, with installation progress and system monitoring displays."
                  width={1024}
                  height={576}
                  fetchPriority="high"
                  decoding="async"
                />
              </div>
              <p className="install-hero__caption">
                Bootstrap the edge stack, verify routes, then add Authelia and more apps
              </p>
            </div>
          </div>
        </div>
      </header>

      <InstallJumpNav />

      <div className="install-shell install-body">
      <h2 id="start" className="install-section">Start here</h2>
      <p>
        This guide follows the order that causes the fewest surprises for a new homelab host.
        Skipping ahead to Authelia or extra apps before the bootstrap stack works usually leads
        to confusing login loops and tunnel errors.
      </p>
      <InstallFlowSteps highlightFrom={6} />

      <h2 id="principle">Core principle</h2>
      <p>
        <strong>Start without Authelia.</strong> Your first goal is only these services:
      </p>
      <div className="install-core-services" aria-label="Bootstrap services">
        <span>Traefik</span>
        <span>cloudflared</span>
        <span>Portainer</span>
        <span>Traefik Manager</span>
      </div>
      <p>
        When each dashboard loads through your Cloudflare hostnames and local <code>curl</code>{' '}
        tests return sensible status codes, move on to{' '}
        <Link to="/authelia">Authelia</Link> and{' '}
        <Link to="/add-containers">adding containers</Link> via Portainer and Traefik Manager.
      </p>

      <Callout variant="info" title="Where the deep dives live">
        <p>
          <Link to="/host-setup">Host Setup</Link> covers VPS prep, SSH, UFW, and the project Docker
          install script. <Link to="/cloudflare">Cloudflare Setup</Link> covers tunnels, tokens, and
          public hostnames. This page ties both paths into bootstrap and verification.
        </p>
      </Callout>

      <h2 id="warnings">Warnings</h2>
      <InstallWarnings />

      <section className="install-section install-section--path" id="beginner">
        <h2>
          <span className="install-path-label">Path A</span>
          Beginner path
        </h2>
        <p>
          You are new to Linux servers or want every step spelled out. Work through these in order;
          each step links to a fuller page where needed.
        </p>
        <ol className="step-list">
          <li>
            <strong>Buy or provision a small VPS</strong> — 2 GB RAM minimum, 4 GB recommended if
            you plan to run databases later. Debian 12 or Ubuntu 24.04 LTS.
          </li>
          <li>
            <strong>Secure SSH</strong> — generate keys, <code>ssh-copy-id</code>, test a second
            session, then disable password login. Details:{' '}
            <Link to="/host-setup#ssh">Host Setup → SSH</Link>.
          </li>
          <li>
            <strong>Configure UFW</strong> — allow OpenSSH, deny other inbound ports. You do not need
            80/443 open on the VPS for the default tunnel setup.{' '}
            <Link to="/host-setup#ufw">Host Setup → UFW</Link>.
          </li>
          <li>
            <strong>Install Docker with the project script</strong> — clone the repo first, then run{' '}
            <code>scripts/install-docker.sh</code> (see Host Setup).
          </li>
          <li>
            <strong>Configure Cloudflare Tunnel</strong> — zone, tunnel, token in <code>.env</code>, public
            hostnames pointing at Traefik. <Link to="/cloudflare">Cloudflare Setup</Link>.
          </li>
          <li>
            <strong>Start the bootstrap stack</strong> — <a href="#bootstrap">Bootstrap stack</a> below.
            Use <code>--profile tunnel-token</code> when <code>cloudflared</code> starts from a token in{' '}
            <code>.env</code>.
          </li>
          <li>
            <strong>Verify routes</strong> — <a href="#verify">Verify</a> Portainer, Traefik Manager, and
            the Traefik dashboard before touching Authelia.
          </li>
        </ol>
      </section>

      <section className="install-section install-section--path" id="experienced">
        <h2>
          <span className="install-path-label">Path B</span>
          Experienced path
        </h2>
        <p>
          You already run Docker on a host and understand SSH and DNS. Same end state as Path A,
          fewer explanations.
        </p>
        <ol className="step-list">
          <li>Clone the repository and enter the project directory.</li>
          <li>Copy <code>.env.example</code> to <code>.env</code> and edit values for your domain and tunnel.</li>
          <li>Run the initial setup script to prepare directories and permissions.</li>
          <li>Start the bootstrap Compose file (add tunnel profile when using a token).</li>
          <li>Verify containers and HTTP routes locally, then through Cloudflare.</li>
          <li>Later: optional <code>auth</code> profile (Authelia), optional Rocket.Chat profile.</li>
        </ol>

        <h3>Clone</h3>
        <CodeBlock title="Clone" code={COMMANDS.clone} />

        <h3>Copy environment file</h3>
        <CodeBlock title="Environment" code={COMMANDS.copyEnv} />
        <p>
          Set <code>DOMAIN</code> (for example <code>{EXAMPLE_DOMAIN}</code>),{' '}
          <code>SUBDOMAIN_*</code> values, <code>CLOUDFLARED_TOKEN</code> when using the tunnel-token
          profile, and any paths the setup script expects.
        </p>

        <h3>Initial setup script</h3>
        <CodeBlock title="Setup" code={COMMANDS.setupScript} />
        <p>
          Review the script before running. It typically creates data directories, sets compose
          project name defaults, or validates <code>.env</code>.
        </p>

        <h3>Bootstrap Compose (default)</h3>
        <CodeBlock title="Bootstrap only" code={COMMANDS.bootstrap} />
        <p>
          Core services only — no Authelia. Includes Traefik, Portainer, Traefik Manager, and
          supporting config as defined in <code>compose.bootstrap.yaml</code>.
        </p>
        <Callout variant="warn" title="Do not combine compose.yaml + compose.bootstrap.yaml">
          <p>
            Avoid: <code>{COMPOSE_BOOTSTRAP_AVOID_CMD}</code>
          </p>
          <p>{COMPOSE_BOOTSTRAP_AVOID_WHY}</p>
        </Callout>

        <h3>Cloudflare Tunnel token profile</h3>
        <CodeBlock
          title="Bootstrap + tunnel-token"
          code={COMMANDS.bootstrapTunnel}
        />
        <p>
          Use on first install when <code>CLOUDFLARED_TOKEN</code> is already in <code>.env</code> and{' '}
          <code>cloudflared</code> should start with the stack.
        </p>

        <h3>Optional profiles (after bootstrap works)</h3>
        <CodeBlock title="Auth profile (Authelia) — later" code={COMMANDS.authProfile} />
        <Callout variant="warn" title="Auth profile">
          <p>
            Do not run the auth profile until Portainer and Traefik Manager load correctly through
            the tunnel. See <Link to="/authelia">Authelia Setup</Link>.
          </p>
        </Callout>
        <CodeBlock title="Rocket.Chat profile — optional" code={COMMANDS.rocketchatProfile} />
        <p>
          Rocket.Chat listens on internal port <code>{SERVICE_PORTS.rocketchat}</code> when that
          profile is enabled.
        </p>
      </section>

      <h2 id="bootstrap">Bootstrap stack</h2>
      <p>
        Whether you followed Path A or B, the bootstrap file brings up the edge stack without
        authentication layers that complicate debugging.
      </p>
      <CodeBlock title="Default bootstrap command" code={COMMANDS.bootstrap} />
      <Callout variant="warn" title="Do not combine compose.yaml + compose.bootstrap.yaml">
        <p>
          Avoid: <code>{COMPOSE_BOOTSTRAP_AVOID_CMD}</code>
        </p>
        <p>{COMPOSE_BOOTSTRAP_AVOID_WHY}</p>
      </Callout>
      <p>
        When <code>CLOUDFLARED_TOKEN</code> is set in <code>.env</code>, add the tunnel-token profile
        so <code>cloudflared</code> starts with the stack:
      </p>
      <CodeBlock title="Bootstrap + tunnel-token profile" code={COMMANDS.bootstrapTunnel} />
      <p>
        Cloudflare public hostnames should target <code>http://traefik:80</code> (
        <Link to="/cloudflare">Cloudflare Setup</Link>). Bootstrap routes use Traefik labels in{' '}
        <code>compose.bootstrap.yaml</code>; apps you add later use Traefik Manager.
      </p>
      <p>Expected containers after a successful start (names may match your compose file):</p>
      <ul>
        <li><code>traefik</code> — reverse proxy on internal port 80</li>
        <li><code>cloudflared</code> — tunnel connector (tunnel-token profile)</li>
        <li>
          <code>portainer</code> — container UI (internal port <code>{SERVICE_PORTS.portainer}</code>)
        </li>
        <li>
          <code>traefik-manager</code> — dynamic route UI (internal port{' '}
          <code>{SERVICE_PORTS.traefikManager}</code>)
        </li>
      </ul>

      <h2 id="verify">Verify Portainer, Traefik Manager, and Traefik dashboard</h2>
      <h3>Container health</h3>
      <CodeBlock title="Validate" code={COMMANDS.validate} />
      <p>
        Every bootstrap container should show <code>Up</code> status. If a container restarts,
        read its logs before changing Cloudflare or Authelia settings.
      </p>

      <h3>Local route tests (on the server)</h3>
      <p>
        Replace <code>{EXAMPLE_DOMAIN}</code> with your real domain. These requests hit Traefik on
        localhost with the same <code>Host</code> headers Cloudflare sends:
      </p>
      <CodeBlock title="Portainer" code={COMMANDS.curlPortainer} />
      <CodeBlock title="Traefik Manager" code={COMMANDS.curlManager} />
      <CodeBlock title="Traefik dashboard" code={COMMANDS.curlTraefik} />
      <p>
        You want a <code>200</code>, <code>301</code>, or <code>302</code> — not <code>404</code>{' '}
        or <code>502</code>. Then test the same hostnames in a browser via{' '}
        <code>https://</code> (Cloudflare edge).
      </p>

      <h3>Checklist</h3>
      <ul>
        <li>Cloudflare Zero Trust → tunnel shows <strong>Healthy</strong></li>
        <li>
          <code>https://port.{EXAMPLE_DOMAIN}</code> (or your Portainer hostname) loads Portainer
        </li>
        <li>
          <code>https://manager.{EXAMPLE_DOMAIN}</code> loads Traefik Manager
        </li>
        <li>
          <code>https://traefik.{EXAMPLE_DOMAIN}</code> loads the Traefik dashboard (protect later)
        </li>
      </ul>

      <InstallCompletionFigure />

      <h2 id="troubleshoot">404 vs 502 and TLS notes</h2>
      <RoutingTroubleshooting />
      <p>
        More scenarios: <Link to="/faq">FAQ / Troubleshooting</Link>.
      </p>

      <h2 id="later">After bootstrap</h2>
      <ol>
        <li>
          <Link to="/authelia">Add Authelia</Link> — enable the auth profile and apply forward-auth
          to one router at a time.
        </li>
        <li>
          <Link to="/add-containers">Add more containers</Link> — deploy in Portainer, route in Traefik
          Manager, and point new Cloudflare hostnames at <code>http://traefik:80</code>.
        </li>
      </ol>
      </div>
    </article>
  )
}
