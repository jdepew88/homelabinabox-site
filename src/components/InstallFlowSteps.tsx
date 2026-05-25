import { Link } from 'react-router-dom'
import { INSTALL_FLOW } from '../content/install'

type Props = {
  highlightFrom?: number
}

export function InstallFlowSteps({ highlightFrom }: Props) {
  return (
    <ol className="install-flow">
      {INSTALL_FLOW.map((item) => {
        const isLater = highlightFrom !== undefined && item.step >= highlightFrom
        return (
          <li
            key={item.step}
            className={isLater ? 'install-flow__item install-flow__item--muted' : 'install-flow__item'}
          >
            <span className="install-flow__num">{item.step}</span>
            <div>
              <Link to={item.href}>{item.label}</Link>
              <span className="install-flow__page">{item.page}</span>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
