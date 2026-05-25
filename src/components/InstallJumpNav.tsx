import { INSTALL_SECTIONS } from '../content/install-sections'
import './InstallJumpNav.css'

type Section = (typeof INSTALL_SECTIONS)[number]

type Props = {
  sections?: readonly Section[]
}

export function InstallJumpNav({ sections = INSTALL_SECTIONS }: Props) {
  const closeDetails = (target: EventTarget & HTMLElement) => {
    const details = target.closest('details')
    if (details) details.open = false
  }

  return (
    <nav className="install-subnav" aria-label="On this page">
      <div className="install-subnav__inner">
        <details className="install-jump">
          <summary className="install-jump__trigger">
            <span className="install-jump__label">Jump to section</span>
            <span className="install-jump__chevron" aria-hidden="true" />
          </summary>
          <ul className="install-jump__menu">
            {sections.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => closeDetails(e.currentTarget)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </nav>
  )
}
