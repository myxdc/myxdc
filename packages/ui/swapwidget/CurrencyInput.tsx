'use client'
import { useState } from 'react'

import { Skeleton } from '../animated'
import { Currency } from '../currency'
import { ChevronDownIcon } from '../icons'
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
  setAmount?: (amount: string) => void
  onMax?: () => void
  onCurrencySelect?: () => void
}

export const CurrencyInput = ({
  label = 'Asset',
  amount,
  usd,
  balance,
  tokens,
  selectedToken,
  setAmount = () => {},
  onMax = () => {},
  onCurrencySelect = () => {},
}: CurrencyInputProps) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="mt-6">
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
              onChange={(e) => setAmount(e.target.value)}
            />
          ) : (
            <Skeleton width={140} height={24} borderRadius={100} />
          )}

          <Typography className="mr-2 text-gray-400" weight={500} variant="tiny">
            {usd ? '≈ ' + usd : <Skeleton borderRadius={100} width={80} height={16} />}
          </Typography>
        </div>
        <div className="flex flex-col items-end gap-3 ml-2">
          <button
            className="flex items-center justify-end min-w-32 gap-4 px-3 py-1.5 text-sm bg-primary-600 rounded-full shadow-lg bg-gradient-to-r from-primary-600 to-primary-500"
            onClick={() => setOpen(true)}
          >
            <ChevronDownIcon className="w-5 h-5 text-white" />
            <Typography className="py-1.5 text-white" weight={700} variant="tiny">
              {selectedToken ? selectedToken.symbol : 'Select token'}
            </Typography>
            {selectedToken && <Currency className="w-8 h-8 bg-white rounded-full" currency={selectedToken.symbol} />}
          </button>
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
