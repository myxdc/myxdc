import { BigNumber } from 'ethers'
import { useMemo } from 'react'
import useSWR from 'swr'

import { useSwapPair } from '../contracts/useContract'
import { usePairAddress } from './usePairAddress'

export const useReserves = (tokenA?: string, tokenB?: string) => {
  const pairAddress = usePairAddress(tokenA, tokenB)
  const pairContract = useSwapPair(pairAddress)

  const fetcher = useMemo(
    () =>
      async ([method, tokenA, tokenB]: string[]) => {
        if (!pairContract) {
          return undefined
        }

        const reservesRaw = await pairContract.methods
          .getReserves()
          .call()
          .catch((e: any) => {
            console.log('Error fetching reserves', e)
            throw new Error('PAIR_NOT_FOUND')
          })

        // Put the results in the right order
        const results: string[] = [
          (await pairContract.methods.token0().call()).toLowerCase() === tokenA.toLowerCase()
            ? reservesRaw[0]
            : reservesRaw[1],
          (await pairContract.methods.token1().call()).toLowerCase() === tokenB.toLowerCase()
            ? reservesRaw[1]
            : reservesRaw[0],
        ]

        if (BigNumber.from(results[0]).lte(0) || BigNumber.from(results[1]).lte(0)) {
          throw new Error('NO_LIQUIDITY')
        }

        return results
      },
    [pairContract]
  )

  const { data, error } = useSWR(['getReserves', tokenA, tokenB], fetcher, {
    refreshInterval: 10000,
    errorRetryInterval: 20000,
  })

  const isLoading = !data && !error

  return {
    reserves: data,
    isLoading,
    error,
  }
}
