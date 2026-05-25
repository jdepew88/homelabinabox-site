import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { BRAND_ICON, NAV_LINKS, SITE } from '../config'
import { NavSetupDropdown } from './NavSetupDropdown'
import { ThemePicker } from './ThemePicker'
import './Header.css'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  function closeMenu() {
    setMenuOpen(false)
  }

  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeMenu()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="header__brand" onClick={closeMenu}>
          <img
            src={BRAND_ICON}
            alt=""
            className="header__logo"
            width={36}
            height={36}
          />
          <span className="header__brand-text">{SITE.name}</span>
        </Link>

        <nav className="header__nav" aria-label="Main">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              {label}
            </NavLink>
          ))}
          <NavSetupDropdown />
        </nav>

        <div className="header__actions">
          <ThemePicker />
          <a
            href={SITE.github}
            className="btn btn--ghost hide-mobile header__github-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <Link to="/install" className="btn btn--install-cta header__cta header__cta--long">
            Start the Install
          </Link>
          <Link to="/install" className="btn btn--install-cta header__cta header__cta--short">
            Install
          </Link>
          <button
            type="button"
            className="header__menu-btn"
            aria-expanded={menuOpen}
            aria-controls="header-mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      <div
        className={`header__backdrop${menuOpen ? ' is-open' : ''}`}
        aria-hidden="true"
        onClick={closeMenu}
      />

      <nav
        id="header-mobile-menu"
        className={`header__mobile scroll-theme${menuOpen ? ' is-open' : ''}`}
        aria-label="Mobile"
        aria-hidden={!menuOpen}
      >
        {NAV_LINKS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => (isActive ? 'active' : undefined)}
            onClick={closeMenu}
            tabIndex={menuOpen ? undefined : -1}
          >
            {label}
          </NavLink>
        ))}
        <NavSetupDropdown variant="list" onNavigate={closeMenu} />
        <ThemePicker variant="swatches" />
        <div className="header__mobile-divider" />
        <Link
          to="/install"
          className="btn btn--install-cta header__mobile-cta"
          onClick={closeMenu}
          tabIndex={menuOpen ? undefined : -1}
        >
          Start the Install
        </Link>
        <a
          href={SITE.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeMenu}
          tabIndex={menuOpen ? undefined : -1}
        >
          GitHub
        </a>
        <a
          href={SITE.buyMeACoffee}
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeMenu}
          tabIndex={menuOpen ? undefined : -1}
        >
          Buy Me a Coffee
        </a>
      </nav>
    </header>
  )
}
