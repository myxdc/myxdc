import { ArrowDownIcon, ArrowUpRightIcon, CreditCardIcon, SwapIcon, Typography } from '@myxdc/ui'
import Link from 'next/link'

import { OverviewBalance } from './OverviewBalance'

export const WalletOverviewBox = () => {
  return (
    <div className="px-6 py-12 shadow-lg rounded-3xl bg-gradient-to-br from-primary-700 to-primary-600">
      <div>
        <Typography variant="hero" className="flex items-end justify-center text-white" weight={700}>
          <OverviewBalance />
        </Typography>
        <div className="flex items-center justify-center gap-6 mt-8">
          <IconButton href="/wallet/send" label="Send" icon={<ArrowUpRightIcon className="w-full h-full" />} />
          <IconButton href="/wallet/receive" label="Receive" icon={<ArrowDownIcon className="w-full h-full" />} />
          <IconButton href="/wallet/top-up" label="Top Up" icon={<CreditCardIcon className="w-full h-full" />} />
          <IconButton href="/dex/swap" label="Swap" icon={<SwapIcon className="w-full h-full" />} />
        </div>
      </div>
    </div>
  )
}

const IconButton = ({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) => {
  return (
    <Link href={href} className="flex flex-col items-center gap-2">
      <span className="block w-12 h-12 p-3 text-white transition-all duration-300 shadow-sm md:p-4 md:w-14 md:h-14 rounded-2xl md:rounded-3xl bg-primary-500 hover:shadow-lg hover:scale-105">
        {icon}
      </span>
      <Typography variant="tiny" className="text-primary-100" weight={500}>
        {label}
      </Typography>
    </Link>
  )
}
