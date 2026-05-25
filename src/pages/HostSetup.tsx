import { Link } from 'react-router-dom'
import { Callout } from '../components/Callout'
import { CodeBlock } from '../components/CodeBlock'
import { DocLayout } from '../components/DocLayout'
import { HostSetupFlow } from '../components/HostSetupFlow'
import { InstallFlowSteps } from '../components/InstallFlowSteps'

export function HostSetup() {
  return (
    <DocLayout
      title="Host Setup"
      lead="Step 2: prepare a brand-new Debian or Ubuntu VPS for Homelab in a Box — from choosing a small Linode-style server through SSH keys, a sudo user, updates, and UFW."
      toc={[
        { id: 'host-setup-flow', label: 'Host setup flow' },
        { id: 'choose-vps', label: 'Choose a VPS' },
        { id: 'puttygen', label: 'SSH key with PuTTYgen' },
        { id: 'pageant', label: 'Use Pageant' },
        { id: 'putty-connect', label: 'Connect with PuTTY' },
        { id: 'first-login', label: 'First login' },
        { id: 'create-user', label: 'Create a non-root user' },
        { id: 'copy-keys', label: 'Copy SSH key to user' },
        { id: 'test-user', label: 'Test new user login' },
        { id: 'updates', label: 'Basic updates' },
        { id: 'ufw', label: 'UFW firewall' },
        { id: 'hardening', label: 'Optional hardening' },
        { id: 'next-install', label: 'Install the project' },
      ]}
    >
      <p>
        Part of the <Link to="/install">Install guide</Link>. This page assumes a fresh VPS with
        no Docker or homelab software yet. Complete every step in order unless you already have a
        working sudo user and SSH keys.
      </p>
      <InstallFlowSteps />

      <Callout variant="danger" title="Do not lock yourself out">
        <p>
          Wrong firewall rules or disabling password login before keys work can block all SSH
          access. Keep your provider&apos;s <strong>web console</strong> (Linode LISH, etc.) open in
          another tab until you have confirmed key login twice.
        </p>
      </Callout>

      <HostSetupFlow />

      <h2 id="choose-vps">1. Choose a VPS</h2>
      <p>
        Any reputable provider works (Linode, DigitalOcean, Hetzner, Vultr, and others). This guide
        uses language familiar from a <strong>small Linode Nanode-style</strong> plan — a low-cost
        entry VPS — but pricing and plan names change often. <strong>Verify current pricing and
        specs on your provider&apos;s website</strong> before you buy.
      </p>
      <ul>
        <li>
          <strong>Operating system</strong> — Debian 12 or Ubuntu 24.04 LTS (64-bit). Pick one and
          stick with it for the rest of the docs.
        </li>
        <li>
          <strong>Size for bootstrap only</strong> — a <strong>1 vCPU / 1 GB RAM</strong> instance is
          enough to test Traefik, cloudflared, Portainer, and Traefik Manager.
        </li>
        <li>
          <strong>Heavier apps later</strong> — Rocket.Chat, databases, and multiple stacks need more
          RAM; plan for 2–4 GB or more if you will run those profiles.
        </li>
        <li>
          <strong>Region</strong> — choose a datacenter close to you (or close to most users) for
          lower latency.
        </li>
        <li>
          <strong>SSH keys at create time</strong> — if the provider lets you paste a public key during
          instance creation, do that (see PuTTYgen below). It saves a password-only first boot.
        </li>
      </ul>
      <Callout variant="info" title="Cloudflare Tunnel and ports">
        <p>
          For the default Homelab in a Box layout you do <em>not</em> need inbound ports 80 or 443
          open on the VPS. The tunnel connects outbound to Cloudflare.
        </p>
      </Callout>

      <h2 id="puttygen">2. Create an SSH key on Windows with PuTTYgen</h2>
      <p>
        If you use macOS or Linux, you can use <code>ssh-keygen</code> instead and skip to{' '}
        <a href="#first-login">first login</a>. On Windows, PuTTYgen creates the key pair PuTTY and
        Pageant expect.
      </p>
      <ol className="step-list">
        <li>
          Open <strong>PuTTYgen</strong> (installed with PuTTY; search the Start menu).
        </li>
        <li>
          Under <strong>Type of key</strong>, choose <strong>Ed25519</strong> if available; otherwise
          choose <strong>RSA</strong> and set bits to <strong>4096</strong>.
        </li>
        <li>
          Click <strong>Generate</strong> and move the mouse to add randomness until the bar fills.
        </li>
        <li>
          Enter a <strong>Key comment</strong> (for example <code>joe-laptop-homelab</code>) so you
          can recognize the key later.
        </li>
        <li>
          Optional but recommended: set a <strong>Key passphrase</strong> to protect the private key
          file on disk.
        </li>
        <li>
          Click <strong>Save private key</strong> and store the <code>.ppk</code> file somewhere safe
          (not in a public folder or synced repo).
        </li>
        <li>
          Select all text in the <strong>Public key for pasting</strong> box at the top and copy it.
          It often starts with <code>ssh-ed25519</code> or <code>ssh-rsa</code>.
        </li>
        <li>
          In Linode (or your provider) during server creation, paste that public key into the SSH key
          field. Linode may also accept uploading the key in account settings first, then selecting it
          on the create form.
        </li>
      </ol>
      <Callout variant="warn" title="Keep the .ppk private">
        <p>
          Anyone with your <code>.ppk</code> and passphrase (if set) can log into your server. Treat
          it like a password.
        </p>
      </Callout>

      <h2 id="pageant">3. Use Pageant</h2>
      <p>
        Pageant holds your private key in memory so PuTTY does not prompt for the key file every
        session.
      </p>
      <ol className="step-list">
        <li>
          Start <strong>Pageant</strong> (runs in the Windows notification area).
        </li>
        <li>
          Right-click the Pageant icon → <strong>Add Key</strong> → select your <code>.ppk</code>.
        </li>
        <li>
          Enter the key passphrase if you set one.
        </li>
        <li>
          Leave Pageant running while you use PuTTY. After a reboot of your PC, add the key again.
        </li>
      </ol>
      <p>
        When Pageant has the key loaded, PuTTY can authenticate without pointing at the{' '}
        <code>.ppk</code> file in every session (see below for manual <code>.ppk</code> path if you
        skip Pageant).
      </p>

      <h2 id="putty-connect">4. Connect with PuTTY</h2>
      <ol className="step-list">
        <li>
          Open <strong>PuTTY</strong>.
        </li>
        <li>
          <strong>Session → Host Name</strong>: <code>root@YOUR_SERVER_IP</code> (replace with your
          VPS IP). If you already created a user, you can use <code>joe@YOUR_SERVER_IP</code> later.
        </li>
        <li>
          <strong>Port</strong>: <code>22</code> (default SSH).
        </li>
        <li>
          If <em>not</em> using Pageant: <strong>Connection → SSH → Auth → Credentials</strong> →
          browse to your <code>.ppk</code> private key file.
        </li>
        <li>
          Optional: <strong>Connection → Data → Auto-login username</strong> set to <code>root</code>{' '}
          if you did not put <code>root@</code> in Host Name.
        </li>
        <li>
          Return to <strong>Session</strong>, type a name under <strong>Saved Sessions</strong> (for
          example <code>homelab-vps</code>), click <strong>Save</strong>.
        </li>
        <li>
          Click <strong>Open</strong>. Accept the host key fingerprint on first connect (verify IP
          with your provider dashboard if unsure).
        </li>
      </ol>
      <Callout variant="tip" title="Provider console">
        <p>
          If PuTTY fails, use the provider&apos;s browser-based console to fix keys or network — do
          not enable UFW until SSH from your PC works.
        </p>
      </Callout>

      <h2 id="first-login">5. First login</h2>
      <p>
        From PuTTY you are already connected. From macOS/Linux terminal, or Windows with OpenSSH:
      </p>
      <CodeBlock
        title="SSH (terminal)"
        code={`ssh root@YOUR_SERVER_IP`}
      />
      <p>
        Replace <code>YOUR_SERVER_IP</code> with the IPv4 address from your provider. First login as{' '}
        <code>root</code> is common on a new VPS; you will create a normal user next.
      </p>

      <h2 id="create-user">6. Create a non-root user</h2>
      <p>
        Daily work should not run as root. Pick a username (example uses <code>joe</code> — change to
        yours):
      </p>
      <CodeBlock
        title="New sudo user"
        code={`adduser joe
usermod -aG sudo joe`}
      />
      <p>
        <code>adduser</code> prompts for a password and optional details. On Ubuntu the sudo group
        grants admin rights; on Debian the same group is typically <code>sudo</code>.
      </p>

      <h2 id="copy-keys">7. Copy SSH key to the new user</h2>
      <p>
        If you logged in as root with an SSH key at create time, copy authorized keys so{' '}
        <code>joe</code> can log in the same way:
      </p>
      <CodeBlock
        title="Authorize joe"
        code={`mkdir -p /home/joe/.ssh
cp /root/.ssh/authorized_keys /home/joe/.ssh/authorized_keys
chown -R joe:joe /home/joe/.ssh
chmod 700 /home/joe/.ssh
chmod 600 /home/joe/.ssh/authorized_keys`}
      />
      <p>
        If <code>/root/.ssh/authorized_keys</code> does not exist, paste your public key into{' '}
        <code>/home/joe/.ssh/authorized_keys</code> manually (one line, starting with{' '}
        <code>ssh-ed25519</code> or <code>ssh-rsa</code>).
      </p>

      <h2 id="test-user">8. Test login as the new user before locking down root</h2>
      <Callout variant="danger" title="Do this before UFW or disabling root">
        <p>
          Open a <strong>second</strong> PuTTY window (or terminal tab). Confirm login as the new user
          works before changing SSH or firewall settings. Keep the original root session open until
          the test succeeds.
        </p>
      </Callout>
      <p>Terminal:</p>
      <CodeBlock code={`ssh joe@YOUR_SERVER_IP`} />
      <p>
        PuTTY: save a second session with Host Name <code>joe@YOUR_SERVER_IP</code> (Pageant still
        provides the key). You should land in a shell without using root.
      </p>
      <p>Quick check that sudo works:</p>
      <CodeBlock code={`sudo whoami`} />
      <p>
        Expected output: <code>root</code>. If that fails, fix group membership before continuing.
      </p>

      <h2 id="updates">9. Basic updates</h2>
      <p>On the server as <code>joe</code> (with sudo):</p>
      <CodeBlock
        title="Updates"
        code={`sudo apt update
sudo apt upgrade -y
sudo reboot`}
      />
      <p>
        Reconnect after reboot (<code>ssh joe@YOUR_SERVER_IP</code> or your saved PuTTY session).
        Re-open Pageant and reload the key if needed.
      </p>

      <h2 id="ufw">10. UFW firewall setup</h2>
      <Callout variant="warn" title="Enable UFW only after SSH keys work">
        <p>
          Confirm key login as <code>joe</code> in a fresh session. Keep the provider console handy
          in case you need to fix rules from outside SSH.
        </p>
      </Callout>
      <CodeBlock
        title="UFW"
        code={`sudo apt install -y ufw
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow OpenSSH
sudo ufw enable
sudo ufw status verbose`}
      />
      <p>What this means for Homelab in a Box:</p>
      <ul>
        <li>
          <strong>OpenSSH</strong> stays allowed so you can administer the box.
        </li>
        <li>
          <strong>80 and 443 are not required</strong> for the default Cloudflare Tunnel setup —
          traffic arrives over the outbound tunnel, not inbound web ports.
        </li>
        <li>
          If <code>ufw enable</code> warns about disrupting SSH, type <code>y</code> only when you are
          sure key login works.
        </li>
      </ul>
      <Callout variant="danger" title="Locked out?">
        <p>
          Use the provider&apos;s rescue/console to run <code>ufw disable</code> or fix rules. That is
          why snapshots and console access matter.
        </p>
      </Callout>

      <h2 id="hardening">11. Optional hardening</h2>
      <p>Only after repeated successful key logins as <code>joe</code>:</p>
      <ul>
        <li>
          <strong>Disable password SSH login</strong> — edit{' '}
          <code>/etc/ssh/sshd_config</code>, set <code>PasswordAuthentication no</code>, then{' '}
          <code>sudo systemctl reload sshd</code>. Test a new session before closing the old one.
        </li>
        <li>
          <strong>Restrict root SSH</strong> — many admins set <code>PermitRootLogin no</code> after a
          sudo user exists. Again: test in a second window first.
        </li>
        <li>
          <strong>Provider console</strong> — keep LISH / serial console / VNC access enabled in your
          account for emergencies.
        </li>
        <li>
          <strong>Snapshot</strong> — take a provider snapshot (backup image) before major changes or
          before installing Docker and the bootstrap stack.
        </li>
      </ul>
      <CodeBlock
        title="Example sshd changes (optional)"
        code={`sudo nano /etc/ssh/sshd_config
# PasswordAuthentication no
# PermitRootLogin no
sudo systemctl reload sshd`}
      />

      <h2 id="next-install">12. Install the project</h2>
      <p>Your host is ready for Homelab in a Box software. Continue on the Install guide:</p>
      <ul>
        <li>
          <Link to="/install">Install overview</Link> — beginner vs experienced paths
        </li>
        <li>
          <Link to="/cloudflare">Cloudflare Setup</Link> — tunnel and token (step 3)
        </li>
        <li>
          <Link to="/install#bootstrap">Bootstrap stack</Link> — clone repo, <code>.env</code>,{' '}
          <code>compose.bootstrap.yaml</code>, Docker install script
        </li>
      </ul>
      <p>
        On the server you will clone the repository, run <code>scripts/install-docker.sh</code>, copy{' '}
        <code>.env.example</code> to <code>.env</code>, and start the bootstrap stack — all detailed
        on <Link to="/install">Install</Link>, not repeated here so host prep stays separate from
        application deploy.
      </p>
      <div className="btn-group" style={{ marginTop: '1.25rem' }}>
        <Link to="/install" className="btn btn--primary">
          Continue to Install
        </Link>
        <Link to="/cloudflare" className="btn btn--secondary">
          Cloudflare Setup
        </Link>
      </div>
    </DocLayout>
  )
}
