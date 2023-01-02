import { Skeleton } from '../animated'
import { Typography } from '../typography'

export interface PricePoolShareProps {
  label1?: string
  price1?: string
  label2?: string
  price2?: string
  label3?: string
  poolShare?: string
}

export const PricePoolShare = ({
  price1,
  label1,
  price2,
  label2,
  label3 = 'Share of Pool',
  poolShare,
}: PricePoolShareProps) => {
  return (
    <div className="px-6 py-4 mt-4 bg-gray-100 rounded-3xl">
      <Typography variant="tiny" className="pb-2 text-gray-600 border-b" weight={600}>
        Prices
      </Typography>
      <div className="flex justify-between pt-2 mt-2 text-center">
        <div className="w-1/2 border-r border-gray-300">
          {price1 ? (
            <Typography variant="tiny" className="text-gray-600" weight={600}>
              {price1}
            </Typography>
          ) : (
            <Skeleton className="h-4 rounded-full w-14" />
          )}
          {label1 ? (
            <Typography variant="tiny" className="text-gray-400">
              {label1}
            </Typography>
          ) : (
            <Skeleton className="w-20 h-4 rounded-full" />
          )}
        </div>
        <div className="w-1/2 border-r border-gray-300">
          {price2 ? (
            <Typography variant="tiny" className="text-gray-600" weight={600}>
              {price2}
            </Typography>
          ) : (
            <Skeleton className="h-4 rounded-full w-14" />
          )}
          {label2 ? (
            <Typography variant="tiny" className="text-gray-400">
              {label2}
            </Typography>
          ) : (
            <Skeleton className="w-20 h-4 rounded-full" />
          )}
        </div>
        {/* <div className="w-1/3">
          {poolShare ? (
            <Typography variant="tiny" className="text-gray-600" weight={600}>
              {poolShare}
            </Typography>
          ) : (
            <Skeleton className="h-4 rounded-full w-14" />
          )}
          {poolShare ? (
            <Typography variant="tiny" className="text-gray-400">
              {label3}
            </Typography>
          ) : (
            <Skeleton className="w-20 h-4 rounded-full" />
          )}
        </div> */}
      </div>
    </div>
  )
}
