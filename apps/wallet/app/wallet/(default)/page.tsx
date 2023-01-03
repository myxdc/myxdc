'use client'
import { useTokensWithBalances } from '@myxdc/hooks/tokens/useTokensWithBalances'
import { useAccount } from '@myxdc/hooks/wallet/useAccount'
import { BalanceRowBox, Button } from '@myxdc/ui'
import { toHumanReadable } from '@myxdc/utils/numbers/price'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Page() {
  const { activeAccount } = useAccount()
  const { tokens } = useTokensWithBalances({ address: activeAccount?.address })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div>
      {(!activeAccount || !mounted) && (
        <div className="flex flex-col items-center text-center">
          Please connect your wallet to view your balances
          <Button className="mx-auto mt-4" variant="primary" as={Link} href="/wallet/connect">
            Connect Wallet
          </Button>
        </div>
      )}
      {activeAccount &&
        mounted &&
        tokens?.map((t) => {
          const subtitle = t.price ? `$${toHumanReadable(t.price || 0, 2)}` : t.price === 0 ? '$0' : undefined
          const balance = t.balance
            ? `${toHumanReadable(t.balance, 4)} ${t.symbol}`
            : t.balance === 0
            ? `0 ${t.symbol}`
            : undefined

          const usd = toHumanReadable(t.usd?.toFixed(2), 2)
          const usdString = t.balance && t.price ? `$${usd}` : t.price === 0 || t.balance === 0 ? '$0' : undefined

          return (
            <BalanceRowBox
              key={t.symbol}
              title={t.name}
              subtitle={subtitle}
              currencySymbol={t.symbol}
              balance={balance}
              usd={usdString}
            />
          )
        })}
    </div>
  )
}
