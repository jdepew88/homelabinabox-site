import { Link } from 'react-router-dom'
import { SITE } from '../config'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <strong>{SITE.name}</strong>
          <p>Open-source homelab starter stack for Debian and Ubuntu.</p>
        </div>
        <div className="footer__links">
          <div>
            <h2 className="footer__col-title">Docs</h2>
            <ul>
              <li><Link to="/install">Install</Link></li>
              <li><Link to="/host-setup">Host Setup</Link></li>
              <li><Link to="/cloudflare">Cloudflare</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="footer__col-title">Project</h2>
            <ul>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li>
                <a href={SITE.github} target="_blank" rel="noopener noreferrer">GitHub</a>
              </li>
              <li>
                <a href={SITE.buyMeACoffee} target="_blank" rel="noopener noreferrer">
                  Buy Me a Coffee
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} {SITE.name}</span>
        <span>{SITE.license} License · {SITE.domain}</span>
      </div>
    </footer>
  )
}
