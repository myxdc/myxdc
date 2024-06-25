import { BigNumber } from 'ethers'
import { useMemo } from 'react'
import useSWR from 'swr'

import { useSwapPair } from '../contracts/useContract'
import { usePairAddress } from './usePairAddress'
import { useReserves } from './useReserves'

export const useUserLiquidity = (address?: string, tokenA?: string, tokenB?: string) => {
  const pairAddress = usePairAddress(tokenA, tokenB)
  const pairContract = useSwapPair(pairAddress)
  const { reserves, error: reserves_error, isLoading: reserves_loading } = useReserves(tokenA, tokenB)

  const fetcher = useMemo(
    () =>
      async ([method, address, pairAddress, reserves]: string[]) => {
        if (!pairContract || !address || !reserves) {
          return {
            liquidityTokens: undefined,
            poolShare: undefined,
            pooledToken1: undefined,
            pooledToken2: undefined,
          }
        }

        const liquidityTokensRaw = BigNumber.from(
          await pairContract.methods
            .balanceOf(address)
            .call()
            .catch(() => {
              throw new Error('PAIR_NOT_FOUND')
            })
        )

        // pool share in percent
        const totalSupply = BigNumber.from(await pairContract.methods.totalSupply().call())
        const poolShare = liquidityTokensRaw.mul(100).div(totalSupply)

        // calculate user share of reserves
        const pooledToken1Raw = BigNumber.from(reserves?.[0]).mul(liquidityTokensRaw).div(totalSupply)
        const pooledToken2Raw = BigNumber.from(reserves?.[1]).mul(liquidityTokensRaw).div(totalSupply)

        return {
          liquidityTokens: liquidityTokensRaw.toString(),
          poolShare: poolShare.toString(),
          pooledToken1: pooledToken1Raw.toString(),
          pooledToken2: pooledToken2Raw.toString(),
        }
      },
    [pairContract]
  )

  // @ts-ignore
  const { data, error, isLoading } = useSWR(['getLiquidityTokens', address, pairAddress, reserves], fetcher)

  if (reserves_error?.message === 'PAIR_NOT_FOUND') {
    return {
      error: reserves_error,
      isLoading: false,
      liquidityTokens: '0',
      poolShare: '0',
      pooledToken1: '0',
      pooledToken2: '0',
    }
  }

  return {
    error: reserves_error || error || undefined,
    isLoading: reserves_loading || isLoading || false,
    liquidityTokens: data?.liquidityTokens,
    poolShare: data?.poolShare,
    pooledToken1: data?.pooledToken1,
    pooledToken2: data?.pooledToken2,
  }
}
