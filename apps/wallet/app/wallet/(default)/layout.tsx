'use client'
import { RoundedTabs } from '@myxdc/ui'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { WalletOverviewBox } from './WalletOverviewBox'

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const path = pathname?.split('/')[2]

  return (
    <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto">
        <WalletOverviewBox />

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
