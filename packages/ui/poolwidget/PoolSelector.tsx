import { useState } from 'react'

import { SwapIcon } from '../icons'
import { TokenButton } from '../tokenbutton'
import { TokenSelector, TokenType } from '../tokenselector'

export interface PoolSelectorProps {
  tokens?: TokenType[]
  token1?: TokenType
  token2?: TokenType
  onToken1Change?: (token?: TokenType) => void
  onToken2Change?: (token?: TokenType) => void
}

export const PoolSelector = ({ tokens, token1, token2, onToken1Change, onToken2Change }: PoolSelectorProps) => {
  const [open, setOpen] = useState('')

  return (
    <div className="relative flex items-center justify-center w-full mt-6 rounded-lg">
      <TokenButton onClick={() => setOpen('1')} selectedToken={token1} />
      <SwapIcon className="mx-1 sm:mx-4 text-primary-600" />
      <TokenButton onClick={() => setOpen('2')} selectedToken={token2} />

      {open && (
        <TokenSelector
          tokens={tokens}
          onClose={() => setOpen('')}
          onSelect={(token) => {
            if (token === token1 || token === token2) {
              onToken2Change && onToken2Change(token1)
              onToken1Change && onToken1Change(token2)
            } else if (open === '1') {
              onToken1Change && onToken1Change(token)
            } else if (open === '2') {
              onToken2Change && onToken2Change(token)
            }
            setOpen('')
          }}
        />
      )}
    </div>
  )
}
