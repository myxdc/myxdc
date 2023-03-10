import React from 'react'

import { Skeleton } from '../animated'
import { CurrencyPair, CurrencyPairSkeleton } from '../currency'
import { Typography } from '../typography'

export interface LiquidityBoxProps {
  symbol1?: string
  symbol2?: string
  token1?: string
  token2?: string
  totalPoolTokens?: string
  poolShare?: string
  pooledToken1?: string
  pooledToken2?: string
  addLiquidityButton?: React.ReactNode
  removeLiquidityButton?: React.ReactNode
  createPairButton?: React.ReactNode
}

export const LiquidityBox = ({
  symbol1,
  symbol2,
  token1,
  token2,
  totalPoolTokens,
  poolShare,
  pooledToken1,
  pooledToken2,
  addLiquidityButton,
  removeLiquidityButton,
  createPairButton,
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
        <WatchListButton token1={token1} token2={token2} />
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
          Pooled {symbol1}
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
          Pooled {symbol2}
        </Typography>
        {pooledToken2 ? (
          <Typography variant="h6" weight={600} className="text-gray-800">
            {pooledToken2}
          </Typography>
        ) : (
          <Skeleton className="w-24 h-4" borderRadius={100} />
        )}
      </div>
      {createPairButton ? (
        <div className="w-full mt-4">
          {React.cloneElement(createPairButton as React.ReactElement, {
            className: 'w-full block py-2 text-sm font-medium text-white bg-green-500 rounded-lg text-center',
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center gap-4 mt-4">
          {addLiquidityButton ? (
            React.cloneElement(addLiquidityButton as React.ReactElement, {
              className: 'w-full py-2 text-sm font-medium text-white bg-green-500 rounded-lg text-center',
            })
          ) : (
            <div className="flex-1">
              <Skeleton className="w-full h-9" borderRadius={14} />
            </div>
          )}
          {removeLiquidityButton ? (
            React.cloneElement(removeLiquidityButton as React.ReactElement, {
              className: 'w-full py-2 text-sm font-medium text-white bg-red-500 rounded-lg text-center',
            })
          ) : (
            <div className="flex-1">
              <Skeleton className="w-full h-9" borderRadius={14} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

import { useSwapWatchList } from '@myxdc/hooks/swap/useSwapWatchList'
import { useCallback, useMemo } from 'react'

import { StarIcon } from '../icons'

const WatchListButton = ({ token1, token2 }: { token1?: string; token2?: string }) => {
  const { addPair, removePair, watchList } = useSwapWatchList()

  const handleAddToWatchList = useCallback(() => {
    if (!token1 || !token2) return
    addPair([token1, token2])
  }, [addPair, token1, token2])

  const handleRemoveFromWatchList = useCallback(() => {
    if (!token1 || !token2) return
    removePair([token1, token2])
  }, [removePair, token1, token2])

  const isWatched = useMemo(() => {
    if (!token1 || !token2) return false
    return watchList.some((pair) => pair[0] === token1 && pair[1] === token2)
  }, [watchList, token1, token2])

  return (
    <>
      {!isWatched && (
        <button onClick={handleAddToWatchList}>
          <StarIcon className="w-6 h-6 text-gray-400" />
        </button>
      )}
      {isWatched && (
        <button onClick={handleRemoveFromWatchList}>
          <StarIcon className="w-6 h-6 text-yellow-500" />
        </button>
      )}
    </>
  )
}
