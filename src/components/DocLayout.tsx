import type { ReactNode } from 'react'

type TocItem = { id: string; label: string }

type Props = {
  title: string
  lead: string
  toc?: TocItem[]
  children: ReactNode
}

export function DocLayout({ title, lead, toc, children }: Props) {
  return (
    <article className="doc-page">
      <div className="container container--narrow">
        <header className="doc-header">
          <h1>{title}</h1>
          <p className="lead">{lead}</p>
        </header>

        {toc && toc.length > 0 && (
          <nav className="doc-toc" aria-label="On this page">
            <h4>On this page</h4>
            <ul>
              {toc.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div className="doc-body">{children}</div>
      </div>
    </article>
  )
}
