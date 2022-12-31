'use client'
import { useState } from 'react'

import { Skeleton } from '../animated'
import { TokenButton } from '../tokenbutton'
import { TokenSelector, TokenType } from '../tokenselector'
import { Typography } from '../typography'

export interface CurrencyInputProps {
  label?: string
  amount?: string
  usd?: string
  balance?: string
  tokens?: TokenType[]
  selectedToken?:
    | {
        symbol: string
      }
    | TokenType
  disabled?: boolean
  setAmount?: (amount: string) => void
  onMax?: () => void
  onCurrencySelect?: (token: TokenType) => void
  className?: string
}

export const CurrencyInput = ({
  label = 'Asset',
  amount,
  usd,
  balance,
  tokens,
  selectedToken,
  disabled = false,
  setAmount = () => {},
  onMax = () => {},
  onCurrencySelect = () => {},
  className = '',
}: CurrencyInputProps) => {
  const [open, setOpen] = useState(false)
  return (
    <div className={className}>
      <Typography variant="tiny" className="relative block pl-2 text-gray-500 w-fit h-7" weight={600}>
        {label}
      </Typography>
      <div className="flex pl-4 py-4 rounded-[2rem] pr-2 bg-gray-100 ">
        <div className="flex flex-col justify-center flex-1 gap-1">
          {amount || amount === '' ? (
            <input
              className="w-full min-w-0 text-3xl font-medium text-gray-700 bg-transparent outline-none "
              placeholder="0.00"
              value={amount}
              onChange={(e) => !disabled && setAmount(e.target.value)}
              disabled={disabled}
            />
          ) : (
            <Skeleton width={140} height={24} borderRadius={100} />
          )}

          <Typography className="mr-2 text-gray-400" weight={500} variant="tiny">
            {usd ? '≈ ' + usd : <Skeleton borderRadius={100} width={80} height={16} />}
          </Typography>
        </div>
        <div className="flex flex-col items-end gap-3 ml-2">
          <TokenButton onClick={() => setOpen(true)} selectedToken={selectedToken} />
          {balance ? (
            <Typography className="mr-2 text-gray-500 cursor-pointer" weight={500} variant="tiny" onClick={onMax}>
              Balance: {balance}
            </Typography>
          ) : (
            <Skeleton width={100} height={18} borderRadius={100} />
          )}
        </div>
      </div>
      {open && <TokenSelector onClose={() => setOpen(false)} onSelect={onCurrencySelect} tokens={tokens} />}
    </div>
  )
}
