import React from 'react'

import { Skeleton } from '../animated'
import { CurrencyPair, CurrencyPairSkeleton } from '../currency'
import { Typography } from '../typography'

export interface LiquidityBoxProps {
  symbol1?: string
  symbol2?: string
  totalPoolTokens?: string
  poolShare?: string
  pooledToken1?: string
  pooledToken2?: string
  addLiquidityButton?: React.ReactNode
  removeLiquidityButton?: React.ReactNode
  onAddToWatchlist?: () => void
  onRemoveFromWatchlist?: () => void
}

export const LiquidityBox = ({
  symbol1,
  symbol2,
  totalPoolTokens,
  poolShare,
  pooledToken1,
  pooledToken2,
  addLiquidityButton,
  removeLiquidityButton,
  onAddToWatchlist,
  onRemoveFromWatchlist,
}: LiquidityBoxProps) => {
  return (
    <div className="p-4 mt-6 border border-gray-200 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {symbol1 && symbol2 ? <CurrencyPair currency1={symbol1} currency2={symbol2} /> : <CurrencyPairSkeleton />}
          {symbol1 && symbol2 ? (
            <Typography variant="h6" weight={600} className="ml-2 text-gray-800">
              {symbol1}/{symbol2}
            </Typography>
          ) : (
            <Skeleton className="w-20 h-4 ml-2" borderRadius={100} />
          )}
        </div>
        {onAddToWatchlist && !onRemoveFromWatchlist && (
          <button className="px-2 py-1 text-sm font-medium rounded-lg" onClick={onAddToWatchlist}>
            Add to watchlist
          </button>
        )}
        {onRemoveFromWatchlist && !onAddToWatchlist && (
          <button className="px-2 py-1 text-sm font-medium rounded-lg" onClick={onRemoveFromWatchlist}>
            Remove from watchlist
          </button>
        )}
        {!onAddToWatchlist && !onRemoveFromWatchlist && <Skeleton className="w-24 h-4" borderRadius={100} />}
      </div>
      <div className="flex items-center justify-between pt-4 mt-4 border-t">
        <Typography variant="tiny" weight={500} className="text-gray-500">
          Your total pool tokens
        </Typography>
        {totalPoolTokens ? (
          <Typography variant="h6" weight={600} className="text-gray-800">
            {totalPoolTokens}
          </Typography>
        ) : (
          <Skeleton className="w-20 h-4" borderRadius={100} />
        )}
      </div>
      <div className="flex items-center justify-between mt-4">
        <Typography variant="tiny" weight={500} className="text-gray-500">
          Your pool share
        </Typography>
        {poolShare ? (
          <Typography variant="h6" weight={600} className="text-gray-800">
            {poolShare}
          </Typography>
        ) : (
          <Skeleton className="h-4 w-28" borderRadius={100} />
        )}
      </div>
      <div className="flex items-center justify-between mt-4">
        <Typography variant="tiny" weight={500} className="text-gray-500">
          Pooled XDC
        </Typography>
        {pooledToken1 ? (
          <Typography variant="h6" weight={600} className="text-gray-800">
            {pooledToken1}
          </Typography>
        ) : (
          <Skeleton className="w-20 h-4" borderRadius={100} />
        )}
      </div>
      <div className="flex items-center justify-between mt-4">
        <Typography variant="tiny" weight={500} className="text-gray-500">
          Pooled ETH
        </Typography>
        {pooledToken2 ? (
          <Typography variant="h6" weight={600} className="text-gray-800">
            {pooledToken2}
          </Typography>
        ) : (
          <Skeleton className="w-24 h-4" borderRadius={100} />
        )}
      </div>
      <div className="flex items-center gap-4 mt-4">
        {addLiquidityButton ? (
          React.cloneElement(addLiquidityButton as React.ReactElement, {
            className: 'w-full py-2 text-sm font-medium text-white bg-green-500 rounded-lg text-center',
          })
        ) : (
          <Skeleton className="w-full h-10" borderRadius={14} />
        )}
        {removeLiquidityButton ? (
          React.cloneElement(removeLiquidityButton as React.ReactElement, {
            className: 'w-full py-2 text-sm font-medium text-white bg-red-500 rounded-lg text-center',
          })
        ) : (
          <Skeleton className="w-full h-10" borderRadius={14} />
        )}
      </div>
    </div>
  )
}
