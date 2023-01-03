import { toHumanReadable, toShortNumber } from '@myxdc/utils/numbers/price'

import { Skeleton } from '../animated'
import { Currency } from '../currency'

interface PriceProps {
  amount?: string | number | null
  currency?: string
  decimals?: number
  format?: boolean
  currencyProps?: {
    [key: string]: unknown
  }
  [key: string]: unknown
}

export const Price = ({ amount, currency, decimals, format = true, currencyProps, ...rest }: PriceProps) => {
  if (format && amount) {
    if (Number(amount) > 99999) {
      amount = toShortNumber(amount)
    } else {
      amount = toHumanReadable(amount, decimals)
    }
  }
  return (
    <div className="flex items-center text-sm" {...rest}>
      <Currency currency={currency} {...currencyProps} />
      {amount || amount === 0 ? (
        <span className="ml-1 font-semibold">
          {amount || '0'} {currency ? currency.toUpperCase() : 'XDC'}
        </span>
      ) : (
        <span className="ml-1 font-semibold">
          <Skeleton height={16} width={100} />
        </span>
      )}
    </div>
  )
}
