'use client'
import { useTokens } from '@myxdc/hooks/useTokens'
import { BalanceRowBox } from '@myxdc/ui'
import { toHumanReadable } from '@myxdc/utils/numbers/price'

export default function Page() {
  const { tokens } = useTokens()

  return (
    <div>
      {tokens?.map((t) => {
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
          />
        )
      })}
    </div>
  )
}
