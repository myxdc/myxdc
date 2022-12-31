import { Skeleton } from '../animated'
import { Currency, CurrencySkeleton } from '../currency'
import { Typography } from '../typography'

export interface ReceiveAmountsProps {
  amount1?: string
  symbol1?: string
  amount2?: string
  symbol2?: string
}

export const ReceiveAmounts = ({ amount1, symbol1, amount2, symbol2 }: ReceiveAmountsProps) => {
  return (
    <div className="p-4 bg-gray-100 rounded-3xl">
      <div className="flex">
        <div className="mr-auto">
          {amount1 ? (
            <Typography variant="h4" weight={600} className="mr-auto text-gray-800">
              {amount1}
            </Typography>
          ) : (
            <Skeleton width={80} height={26} borderRadius={100} />
          )}
        </div>
        {symbol1 ? <Currency currency={symbol1} /> : <CurrencySkeleton />}
        {symbol1 ? (
          <Typography variant="h5" weight={700} className="ml-2 text-gray-800">
            {symbol1}
          </Typography>
        ) : (
          <Skeleton width={60} height={26} className="ml-2" borderRadius={100} />
        )}
      </div>
      <hr className="my-4" />
      <div className="flex mt-4">
        <div className="mr-auto">
          {amount2 ? (
            <Typography variant="h4" weight={600} className="mr-auto text-gray-800">
              {amount2}
            </Typography>
          ) : (
            <Skeleton width={100} height={26} borderRadius={100} />
          )}
        </div>
        {symbol2 ? <Currency currency={symbol2} /> : <CurrencySkeleton />}
        {symbol2 ? (
          <Typography variant="h5" weight={700} className="ml-2 text-gray-800">
            {symbol2}
          </Typography>
        ) : (
          <Skeleton width={40} height={26} className="ml-2" borderRadius={100} />
        )}
      </div>
    </div>
  )
}
