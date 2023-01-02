'use client'

import { TextTabs } from '@myxdc/ui'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathnames = usePathname()?.split('/')

  return (
    <div className="mt-4">
      <TextTabs
        className="mx-auto w-80"
        tabs={[
          {
            label: 'Swap',
            active: pathnames?.[2] === 'swap',
            href: '/dex/swap',
          },
          {
            label: 'Pool',
            active: pathnames?.[2] === 'pool',
            href: '/dex/pool',
          },
          {
            label: 'Watchlist',
            active: pathnames?.[2] === 'watchlist',
            href: '/dex/watchlist',
          },
        ]}
        linkComponent={Link}
      />
      {children}
    </div>
  )
}
