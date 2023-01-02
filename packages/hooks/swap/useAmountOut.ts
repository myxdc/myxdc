import { BigNumber } from 'ethers'

import { useConfig } from '../custom/useConfig'
import { useReserves } from './useReserves'

export const useAmountOut = (amountIn?: string, tokenA?: string, tokenB?: string) => {
  const { SWAP_WXDC_ADDRESS } = useConfig()
  if (tokenA?.toLowerCase() == 'xdc') {
    tokenA = SWAP_WXDC_ADDRESS
  }
  if (tokenB?.toLowerCase() == 'xdc') {
    tokenB = SWAP_WXDC_ADDRESS
  }

  const { reserves, error: reserves_error, isLoading } = useReserves(tokenA, tokenB)

  if (!amountIn || !reserves)
    return {
      amountOut: isLoading ? undefined : '',
      priceImpact: undefined,
      error: reserves_error?.message,
      isLoading: false,
    }

  const amountIn_BN = BigNumber.from(amountIn)

  const reserves_BN = reserves!.map((reserve) => BigNumber.from(reserve))

  // Calculate amountOut using the Uniswap formula: amountOut = amountIn * (1 - fee) * reserveOut / (reserveIn * (1 + fee))
  const amountInWithFee_BN = amountIn_BN.mul(997)
  const numerator = amountInWithFee_BN.mul(reserves_BN[1])
  const denominator = reserves_BN[0].mul(1000).add(amountInWithFee_BN)
  const amountOut_BN = numerator.div(denominator)

  // Calculate the price impact
  const priceImpact_BN = amountIn_BN.mul(100).div(reserves_BN[0].add(amountIn_BN))

  return {
    amountOut: amountOut_BN.toString(),
    priceImpact: priceImpact_BN.toString(),
    error: reserves_error?.message,
    isLoading,
  }
}
