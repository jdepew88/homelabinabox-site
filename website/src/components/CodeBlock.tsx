import { useState } from 'react'
import './CodeBlock.css'

type Props = {
  code: string
  language?: string
  title?: string
}

export function CodeBlock({ code, language = 'bash', title }: Props) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    await navigator.clipboard.writeText(code.trim())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="code-block">
      <div className="code-block__header">
        {title && <span className="code-block__title">{title}</span>}
        <span className="code-block__lang">{language}</span>
        <button
          type="button"
          className="code-block__copy"
          onClick={copy}
          aria-label="Copy code"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre>
        <code>{code.trim()}</code>
      </pre>
    </div>
  )
}
