import React from 'react'

import { CopyIcon } from '../icons'
import { CheckMarkIcon } from '../icons/checkmark'

export const CopyButton = ({ text, className }: { text?: string; className?: string }) => {
  const [copied, setCopied] = React.useState(false)

  const copyToClipboard = React.useCallback(() => {
    if (!text) return
    navigator.clipboard.writeText(text)
    setCopied(true)
  }, [text])

  React.useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false)
      }, 1000)
      return () => clearTimeout(timeout)
    }
  }, [copied])

  return (
    <button
      className={`${copied ? 'text-green-500' : 'text-gray-600 hover:text-green-400'} ${className}`}
      onClick={copyToClipboard}
    >
      {!copied ? <CopyIcon className="w-4 h-4" /> : <CheckMarkIcon className={`w-4 h-4`} />}
    </button>
  )
}
