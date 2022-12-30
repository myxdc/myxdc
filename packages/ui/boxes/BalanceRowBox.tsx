import { Skeleton } from '../animated/skeleton'
import { Currency } from '../currency'

interface BalanceRowBoxProps {
  currencySymbol?: string
  title?: string
  subtitle?: string
  balance?: string
  usd?: string
}

export const BalanceRowBox = ({ currencySymbol, title, subtitle, balance, usd }: BalanceRowBoxProps) => {
  return (
    <div className="flex items-center gap-4 p-6 rounded-xl">
      <Currency className="w-10 h-10" currency={currencySymbol?.toUpperCase()} />
      <div>
        <div className="text-base font-bold text-gray-900">{title || <Skeleton />}</div>
        <div className="text-sm text-gray-500">{subtitle || <Skeleton />}</div>
      </div>
      <div className="ml-auto text-right">
        <div className="text-base font-semibold text-gray-900">{balance || <Skeleton width={120} />}</div>
        <div className="text-sm text-gray-500">{usd || <Skeleton width={80} />}</div>
      </div>
    </div>
  )
}
