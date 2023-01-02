'use client'
import { toHumanReadable } from '@myxdc/utils/numbers/price'
import { isAddress, toChecksumAddress } from '@myxdc/utils/web3/address'
import { useEffect, useState } from 'react'

import { BalanceRowBox } from '../boxes'
import { IconButton } from '../iconbutton'
import { CloseIcon } from '../icons'
import { Input } from '../input'
import { Typography } from '../typography'

export type TokenType = {
  symbol: string
  address: string
  name?: string
  decimals?: number
  coinGeckoId?: string
  balance?: number
  price?: number
}

export interface TokenSelectorProps {
  tokens?: TokenType[]
  onSelect?: (token: any) => void
  onClose?: () => void
}

export function TokenSelector({ tokens, onSelect = () => {}, onClose = () => {} }: TokenSelectorProps) {
  const [input, setInput] = useState('')
  const [filteredTokens, setFilteredTokens] = useState<any[] | undefined>(undefined)

  const handleInput = (e: any) => {
    setInput(e?.target?.value)
  }

  // filter tokens
  useEffect(() => {
    if (!tokens || input === '') return setFilteredTokens(undefined)
    const searchResults = tokens?.filter((token) => {
      if (token.symbol && token.symbol.toLowerCase().startsWith(input.trim().toLowerCase())) return true
      if (token.name && token.name.toLowerCase().startsWith(input.trim().toLowerCase())) return true
      if (
        token.address &&
        toChecksumAddress(token.address.toLowerCase()).startsWith(toChecksumAddress(input.trim().toLowerCase()))
      )
        return true
      return false
    })
    setFilteredTokens(searchResults)
  }, [input, tokens])

  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center overflow-y-auto transition-opacity bg-gray-800 bg-opacity-60 backdrop-filter backdrop-blur-sm"
      onClick={(e) => {
        e.target === e.currentTarget && onClose()
      }}
      aria-labelledby="token-selector"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-md px-4 py-4 bg-white shadow-lg rounded-3xl">
        <div className="flex items-center justify-between">
          <Typography variant="h4" weight={600} as="h2">
            Select Token
          </Typography>
          <IconButton type="button" className="text-gray-400 hover:text-gray-500" onClick={onClose}>
            <CloseIcon className="w-6 h-6" />
          </IconButton>
        </div>
        <div className="mt-6">
          <Input
            type="text"
            placeholder="Search symbol or paste an XRC20 address"
            value={input}
            onChange={handleInput}
          />
        </div>
        <div className="flex flex-col h-full mt-4 overflow-y-auto max-h-[calc(100vh-300px)]">
          {(filteredTokens ? filteredTokens : tokens)?.map((t) => {
            const subtitle = t.price ? `$${toHumanReadable(t.price || 0, 2)}` : t.price === 0 ? '$0' : undefined
            const balance = t.balance
              ? `${toHumanReadable(t.balance, 4)} ${t.symbol}`
              : t.balance === 0
              ? `0 ${t.symbol}`
              : undefined

            const usd = toHumanReadable(Number(t.balance) * (t.price || 0), 2)
            const usdString = t.balance && t.price ? `$${usd}` : t.price === 0 || t.balance === 0 ? '$0' : undefined

            return (
              <BalanceRowBox
                key={t.symbol}
                title={t.name}
                subtitle={subtitle}
                currencySymbol={t.symbol}
                balance={balance}
                usd={usdString}
                className="my-2 transition-colors cursor-pointer bg-gray-50 hover:bg-primary-100 duration-20 active:bg-primary-200"
                onClick={() => onSelect(t)}
              />
            )
          })}
          {filteredTokens?.length === 0 && isAddress(input.trim()) && (
            <BalanceRowBox
              title="Unknown Token"
              subtitle="-"
              currencySymbol={'unknown'}
              balance={input.slice(0, 6) + '...' + input.slice(-4)}
              usd={'-'}
              className="my-2 transition-colors cursor-pointer bg-gray-50 hover:bg-primary-100 duration-20 active:bg-primary-200"
              onClick={() =>
                onSelect({
                  symbol: 'Unknown',
                  name: 'Unknown',
                  address: input,
                })
              }
            />
          )}
        </div>
      </div>
    </div>
  )
}
