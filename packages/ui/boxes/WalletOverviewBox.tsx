import { Skeleton } from '../animated'
import { ArrowDownIcon } from '../icons'
import { ArrowUpRightIcon } from '../icons/arrowupright'
import { CreditCardIcon } from '../icons/creditcard'
import { SwapIcon } from '../icons/swap'
import { Typography } from '../typography'

interface WalletOverviewBoxProps {
  balance?: string
  balanceDecimals?: string
  linkComponent?: React.ElementType
}

export const WalletOverviewBox = ({ balance, balanceDecimals, linkComponent }: WalletOverviewBoxProps) => {
  return (
    <div className="px-6 py-12 shadow-lg rounded-3xl bg-gradient-to-br from-primary-700 to-primary-600">
      <div>
        <Typography variant="hero" className="flex items-end justify-center text-white" weight={700}>
          {balance || <Skeleton inline={true} width={100} height={38} className="opacity-60" />}
          {balanceDecimals ? (
            <Typography as="span" variant="h4" className="text-primary-200" weight={700}>
              {balanceDecimals}
            </Typography>
          ) : (
            <Skeleton inline={true} width={50} height={20} className="ml-1 opacity-60" />
          )}
        </Typography>
        <div className="flex items-center justify-center gap-6 mt-8">
          <IconButton
            href="/wallet/send"
            label="Send"
            icon={<ArrowUpRightIcon className="w-full h-full" />}
            linkComponent={linkComponent}
          />
          <IconButton
            href="/wallet/receive"
            label="Receive"
            icon={<ArrowDownIcon className="w-full h-full" />}
            linkComponent={linkComponent}
          />
          <IconButton
            href="/wallet/top-up"
            label="Top Up"
            icon={<CreditCardIcon className="w-full h-full" />}
            linkComponent={linkComponent}
          />
          <IconButton
            href="/dex/swap"
            label="Swap"
            icon={<SwapIcon className="w-full h-full" />}
            linkComponent={linkComponent}
          />
        </div>
      </div>
    </div>
  )
}

const IconButton = ({
  href,
  label,
  icon,
  linkComponent = 'a',
}: {
  href: string
  label: string
  icon: React.ReactNode
  linkComponent?: React.ElementType
}) => {
  const Link = linkComponent
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
