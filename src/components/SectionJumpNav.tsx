import './SectionJumpNav.css'

export type PageSection = {
  id: string
  label: string
}

type Props = {
  sections: readonly PageSection[]
}

export function SectionJumpNav({ sections }: Props) {
  const closeDetails = (target: EventTarget & HTMLElement) => {
    const details = target.closest('details')
    if (details) details.open = false
  }

  return (
    <nav className="section-subnav" aria-label="On this page">
      <div className="section-subnav__inner">
        <details className="section-jump">
          <summary className="section-jump__trigger">
            <span className="section-jump__label">Jump to section</span>
            <span className="section-jump__chevron" aria-hidden="true" />
          </summary>
          <ul className="section-jump__menu scroll-theme">
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
