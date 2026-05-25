import { Link } from 'react-router-dom'
import { Callout } from '../components/Callout'
import { CodeBlock } from '../components/CodeBlock'
import { DocLayout } from '../components/DocLayout'
import { InstallFlowSteps } from '../components/InstallFlowSteps'
import { COMMANDS, SERVICE_PORTS } from '../content/install'

export function AutheliaSetup() {
  return (
    <DocLayout
      title="Authelia Setup"
      lead="Step 6 — add authentication only after Traefik, cloudflared, Portainer, and Traefik Manager work through the tunnel."
      toc={[
        { id: 'when', label: 'When to enable' },
        { id: 'prerequisite', label: 'Prerequisites' },
        { id: 'profile', label: 'Auth profile' },
        { id: 'middleware', label: 'Traefik middleware' },
        { id: 'incremental', label: 'One router at a time' },
        { id: 'users', label: 'Users and secrets' },
        { id: 'test', label: 'Test' },
      ]}
    >
      <InstallFlowSteps />
      <Callout variant="warn" title="Not part of bootstrap">
        <p>
          The bootstrap stack intentionally excludes Authelia. If you enable forward-auth before
          routes work, you will chase redirect loops instead of fixing Traefik or tunnel config.
        </p>
      </Callout>

      <h2 id="when">When to enable</h2>
      <p>Enable Authelia only when all of the following are true:</p>
      <ul>
        <li>
          <Link to="/install#verify">Verification checklist</Link> passed for Portainer, Traefik
          Manager, and Traefik dashboard
        </li>
        <li>Local <code>curl -H "Host: …"</code> tests return 200/301/302, not 404/502</li>
        <li>Same URLs work in the browser over <code>https://</code> via Cloudflare</li>
        <li>You are ready to protect dashboards — especially Portainer</li>
      </ul>

      <h2 id="prerequisite">Prerequisites</h2>
      <p>The auth profile typically starts:</p>
      <ul>
        <li>
          <strong>Authelia</strong> — forward authentication (internal port{' '}
          <code>{SERVICE_PORTS.authelia}</code>)
        </li>
        <li><strong>Redis</strong> — sessions</li>
        <li><strong>Postgres</strong> — storage (if configured in your compose layout)</li>
      </ul>
      <p>Generate strong passwords in <code>.env</code> before enabling the profile.</p>

      <h2 id="profile">Auth profile</h2>
      <CodeBlock title="Auth profile" code={COMMANDS.authProfile} />
      <p>Confirm containers are healthy:</p>
      <CodeBlock code={`docker ps --format "table {{.Names}}\\t{{.Status}}"
docker logs authelia --tail=50`} />

      <h2 id="middleware">Traefik middleware</h2>
      <p>
        Traefik uses a forward-auth middleware pointing at Authelia’s verify endpoint. Your repo
        defines the middleware name (often <code>authelia@docker</code>). Attach it only to routers
        you intend to protect.
      </p>
      <CodeBlock
        language="yaml"
        title="Example label"
        code={`traefik.http.routers.portainer.middlewares=authelia@docker`}
      />
      <Callout variant="info" title="Exclude Authelia itself">
        <p>
          Authelia’s own hostname must not use the same forward-auth middleware, or you will get a
          redirect loop.
        </p>
      </Callout>

      <h2 id="incremental">One router at a time</h2>
      <p>
        <strong>Do not enable Authelia on everything at once.</strong> Suggested order:
      </p>
      <ol>
        <li>Protect Traefik dashboard router — test login</li>
        <li>Protect Traefik Manager</li>
        <li>Protect Portainer last (you still need a way to recover if misconfigured)</li>
        <li>Add app routers individually in Traefik Manager</li>
      </ol>

      <h2 id="users">Users and secrets</h2>
      <CodeBlock
        code={`docker run --rm authelia/authelia:latest authelia crypto hash generate argon2 --password 'your-password'`}
      />
      <p>
        Place users in the file or database your <code>configuration.yml</code> references. Keep
        encryption keys and JWT secrets in <code>.env</code> only.
      </p>

      <h2 id="test">Test</h2>
      <ol>
        <li>Private browser window → protected URL → Authelia login</li>
        <li>After login, target app loads</li>
        <li>Logout clears session</li>
      </ol>
      <p>
        Issues? <Link to="/faq">FAQ</Link> · Return to <Link to="/install#verify">Install verification</Link>
      </p>
    </DocLayout>
  )
}
