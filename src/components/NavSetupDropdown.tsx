import { useEffect, useId, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { SETUP_LINKS, SETUP_PATHS } from '../config'
import { useAnchoredMenuPosition } from '../hooks/useAnchoredMenuPosition'
import { usePrefersHover } from '../hooks/usePrefersHover'

type Props = {
  onNavigate?: () => void
  /** Mobile menu: always expanded list, no flyout */
  variant?: 'dropdown' | 'list'
}

export function NavSetupDropdown({ onNavigate, variant = 'dropdown' }: Props) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuId = useId()
  const prefersHover = usePrefersHover()
  const { pathname } = useLocation()
  const isSetupActive = SETUP_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  )

  useAnchoredMenuPosition(open, triggerRef, menuRef)

  useEffect(() => {
    if (variant !== 'dropdown') return
    function onDocClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [variant])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  function handleNavClick() {
    setOpen(false)
    onNavigate?.()
  }

  if (variant === 'list') {
    return (
      <div className="nav-setup-list scroll-theme">
        <span className="nav-setup-list__label">Setup</span>
        {SETUP_LINKS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => (isActive ? 'active' : undefined)}
            onClick={handleNavClick}
          >
            {label}
          </NavLink>
        ))}
      </div>
    )
  }

  return (
    <div
      ref={rootRef}
      className={`nav-dropdown${open ? ' nav-dropdown--open' : ''}`}
      onMouseEnter={prefersHover ? () => setOpen(true) : undefined}
      onMouseLeave={prefersHover ? () => setOpen(false) : undefined}
    >
      <button
        ref={triggerRef}
        type="button"
        className={`nav-dropdown__trigger${isSetupActive ? ' active' : ''}`}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={menuId}
        onClick={() => setOpen((o) => !o)}
      >
        Setup
        <span className="nav-dropdown__chevron" aria-hidden="true">
          ▾
        </span>
      </button>
      <div
        id={menuId}
        ref={menuRef}
        className="nav-dropdown__menu scroll-theme"
        role="menu"
      >
        {SETUP_LINKS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            role="menuitem"
            className={({ isActive }) =>
              `nav-dropdown__item${isActive ? ' active' : ''}`
            }
            onClick={handleNavClick}
          >
            {label}
          </NavLink>
        ))}
      </div>
    </div>
  )
}
