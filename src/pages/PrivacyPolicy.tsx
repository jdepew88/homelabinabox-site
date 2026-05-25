import { Link } from 'react-router-dom'
import { DocLayout } from '../components/DocLayout'
import { SITE } from '../config'

export function PrivacyPolicy() {
  const siteUrl = `https://${SITE.domain}`

  return (
    <DocLayout
      title="Privacy Policy"
      lead={`How ${SITE.name} handles information when you visit ${SITE.domain}.`}
      toc={[
        { id: 'overview', label: 'Overview' },
        { id: 'collect', label: 'What we collect' },
        { id: 'cookies', label: 'Cookies and local storage' },
        { id: 'third-party', label: 'Third-party services' },
        { id: 'stack', label: 'Homelab stack (separate)' },
        { id: 'changes', label: 'Changes' },
        { id: 'contact', label: 'Contact' },
      ]}
    >
      <p>
        Last updated: May 24, 2026
      </p>

      <h2 id="overview">Overview</h2>
      <p>
        <a href={siteUrl}>{SITE.domain}</a> is a static documentation and marketing site for the open-source{' '}
        {SITE.name} project. We do not sell personal information. This policy describes what happens when you
        browse this website only — not when you deploy or operate your own homelab on a VPS you control.
      </p>

      <h2 id="collect">What we collect</h2>
      <p>
        We do not operate user accounts, checkout, or a contact form on this site. We do not knowingly collect
        names, email addresses, or payment details through {SITE.domain} itself.
      </p>
      <p>
        Like most websites, our hosting provider (Cloudflare Pages) and your browser may process technical data
        such as IP address, request URL, user agent, and approximate region for delivery, security, and abuse
        prevention. See{' '}
        <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer">
          Cloudflare&apos;s privacy policy
        </a>{' '}
        for how they handle that data.
      </p>

      <h2 id="cookies">Cookies and local storage</h2>
      <p>
        This site may store a <strong>theme preference</strong> in your browser&apos;s <code>localStorage</code>{' '}
        (key <code>hiab-theme-preset</code>) so color settings persist between visits. That data stays on your
        device; we do not receive it on a server we operate for this static site.
      </p>
      <p>
        We do not use advertising trackers on {SITE.domain}. If you follow outbound links (for example GitHub,
        Buy Me a Coffee, or project documentation), those sites have their own cookies and policies.
      </p>

      <h2 id="third-party">Third-party services</h2>
      <ul>
        <li>
          <strong>GitHub</strong> — source code and issue links; governed by GitHub&apos;s terms and privacy
          notice when you visit github.com.
        </li>
        <li>
          <strong>Google Fonts</strong> — Inter and JetBrains Mono may be loaded from Google&apos;s CDN when you
          load a page (see{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
            Google Privacy Policy
          </a>
          ).
        </li>
        <li>
          <strong>Buy Me a Coffee</strong> — optional support link; only applies if you choose to visit that
          service.
        </li>
      </ul>

      <h2 id="stack">Homelab stack (separate)</h2>
      <p>
        If you clone and run {SITE.name} on your own server, you are responsible for privacy and security on that
        infrastructure (Traefik, Cloudflare Tunnel, Authelia, apps you add, logs, backups, etc.). That deployment
        is not operated by us. Read each product&apos;s documentation and configure authentication and data
        retention to match your needs.
      </p>

      <h2 id="changes">Changes</h2>
      <p>
        We may update this page when the site or legal requirements change. The &quot;Last updated&quot; date at
        the top will be revised when we do.
      </p>

      <h2 id="contact">Contact</h2>
      <p>
        Questions about this privacy policy:{' '}
        <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>. For technical issues with the open-source
        stack, use the{' '}
        <a href={SITE.github} target="_blank" rel="noopener noreferrer">
          GitHub repository
        </a>
        .
      </p>
      <p>
        <Link to="/">Back to home</Link>
      </p>
    </DocLayout>
  )
}
