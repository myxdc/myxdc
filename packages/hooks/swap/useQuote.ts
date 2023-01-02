import { BigNumber } from 'ethers'
import { useMemo } from 'react'

import { useReserves } from './useReserves'

export const useQuote = (amountIn?: string, tokenA?: string, tokenB?: string) => {
  const { reserves, error: reserves_error, isLoading: reserves_loading } = useReserves(tokenA, tokenB)

  return useMemo(() => {
    if (!reserves || !amountIn) {
      return ''
    }

    const reserveA = BigNumber.from(reserves[0])
    const reserveB = BigNumber.from(reserves[1])

    const amountB = BigNumber.from(amountIn).mul(reserveB).div(reserveA)

    return amountB.toString()
  }, [reserves, amountIn])
}
