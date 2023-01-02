import FACTORY from '@myxdc/constants/artifacts/IUniswapV2Factory.json'
import PAIR from '@myxdc/constants/artifacts/IUniswapV2Pair.json'
import ROUTER from '@myxdc/constants/artifacts/IUniswapV2Router02.json'
import XRC20 from '@myxdc/constants/artifacts/XRC20.json'
import { useMemo } from 'react'
import type { AbiItem } from 'web3-utils'

import { useConfig } from '../custom/useConfig'
import { useWeb3 } from './useWeb3'

export const useXRC20 = (address?: string) => {
  const { eth } = useWeb3()

  return useMemo(() => (address ? new eth.Contract(XRC20.abi as AbiItem[], address) : undefined), [address, eth])
}

export const useSwapFactory = () => {
  const { eth } = useWeb3()
  const { SWAP_FACTORY_ADDRESS } = useConfig()
  return useMemo(() => new eth.Contract(FACTORY.abi as AbiItem[], SWAP_FACTORY_ADDRESS), [SWAP_FACTORY_ADDRESS, eth])
}

export const useSwapRouter = () => {
  const { eth } = useWeb3()
  const { SWAP_ROUTER_ADDRESS } = useConfig()
  return useMemo(() => new eth.Contract(ROUTER.abi as AbiItem[], SWAP_ROUTER_ADDRESS), [SWAP_ROUTER_ADDRESS, eth])
}

export const useSwapPair = (address?: string) => {
  const { eth } = useWeb3()

  return useMemo(() => {
    if (!address) return undefined
    return new eth.Contract(PAIR.abi as AbiItem[], address)
  }, [eth, address])
}
