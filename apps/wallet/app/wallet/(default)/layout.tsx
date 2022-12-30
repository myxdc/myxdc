'use client'
import { useTokens } from '@myxdc/hooks/useTokens'
import { RoundedTabs, WalletOverviewBox } from '@myxdc/ui'
import { toHumanReadable } from '@myxdc/utils/numbers/price'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [usdTotal, setUsdTotal] = useState<number | undefined>(undefined)
  const { tokens } = useTokens()
  const pathname = usePathname()

  useEffect(() => {
    if (!tokens) return
    const total = tokens.reduce((acc, token) => {
      if (!token.balance || !token.price) return acc
      return (acc || 0) + token.balance * token.price
    }, 0)
    setUsdTotal(total)
  }, [tokens])

  const path = pathname?.split('/')[2]

  return (
    <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto">
        <WalletOverviewBox
          balance={usdTotal || usdTotal === 0 ? '$' + toHumanReadable(usdTotal).split('.')[0] : undefined}
          balanceDecimals={
            usdTotal || usdTotal === 0 ? '.' + (toHumanReadable(usdTotal).split('.')[1] || '00') : undefined
          }
          linkComponent={Link}
        />

        <RoundedTabs
          linkComponent={Link}
          tabs={[
            {
              label: 'Assets',
              href: '/wallet',
              active: !path,
            },
            {
              label: 'NFTs',
              href: '/wallet/nfts',
              active: path === 'nfts',
            },
            {
              label: 'Settings',
              href: '/wallet/settings',
              active: path === 'settings',
            },
          ]}
          className="my-8"
        />
        {children}
      </div>
    </div>
  )
}
