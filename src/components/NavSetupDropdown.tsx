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
  const pinnedByClickRef = useRef(false)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const menuId = useId()
  const prefersHover = usePrefersHover()
  const { pathname } = useLocation()
  const isSetupActive = SETUP_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  )

  useAnchoredMenuPosition(open, triggerRef, menuRef)

  function clearCloseTimer() {
    if (closeTimerRef.current !== undefined) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = undefined
    }
  }

  function closeMenu() {
    clearCloseTimer()
    pinnedByClickRef.current = false
    setOpen(false)
  }

  function scheduleHoverClose() {
    if (pinnedByClickRef.current) return
    clearCloseTimer()
    closeTimerRef.current = setTimeout(() => {
      if (!pinnedByClickRef.current) setOpen(false)
    }, 280)
  }

  useEffect(() => {
    if (variant !== 'dropdown') return
    function onDocClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        closeMenu()
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeMenu()
    }
    document.addEventListener('click', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', onDocClick)
      document.removeEventListener('keydown', onKey)
      clearCloseTimer()
    }
  }, [variant])

  useEffect(() => {
    closeMenu()
  }, [pathname])

  function handleNavClick() {
    closeMenu()
    onNavigate?.()
  }

  function handleTriggerClick() {
    setOpen((wasOpen) => {
      const next = !wasOpen
      pinnedByClickRef.current = next
      if (next) clearCloseTimer()
      else pinnedByClickRef.current = false
      return next
    })
  }

  function handleRootEnter() {
    clearCloseTimer()
    if (prefersHover) setOpen(true)
  }

  function handleRootLeave() {
    if (prefersHover) scheduleHoverClose()
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
      onMouseEnter={handleRootEnter}
      onMouseLeave={handleRootLeave}
    >
      <button
        ref={triggerRef}
        type="button"
        className={`nav-dropdown__trigger${isSetupActive ? ' active' : ''}`}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={menuId}
        onClick={handleTriggerClick}
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
        onMouseEnter={handleRootEnter}
        onMouseLeave={handleRootLeave}
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
