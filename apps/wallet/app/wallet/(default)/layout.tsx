'use client'
import { useTokens } from '@myxdc/hooks/useTokens'
import { RoundedTabs, WalletOverviewBox } from '@myxdc/ui'
import { toHumanReadable } from '@myxdc/utils/numbers/price'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { usdTotal } = useTokens()
  const pathname = usePathname()

  const path = pathname?.split('/')[2]

  return (
    <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto">
        <WalletOverviewBox
          balance={'$' + (toHumanReadable(usdTotal).split('.')[0] || '0')}
          balanceDecimals={'.' + (toHumanReadable(usdTotal).split('.')[1] || '00')}
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
