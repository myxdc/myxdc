import { useMemo } from 'react'

import { useWeb3 } from '../contracts/useWeb3'
import { useConfig } from '../custom/useConfig'

export const usePairAddress = (tokenA?: string, tokenB?: string): string | undefined => {
  const web3 = useWeb3()
  const { SWAP_INIT_CODE_HASH, SWAP_FACTORY_ADDRESS } = useConfig()

  return useMemo(
    () => calculatePairAddress(tokenA, tokenB, web3, SWAP_FACTORY_ADDRESS, SWAP_INIT_CODE_HASH),
    [tokenA, tokenB, web3, SWAP_FACTORY_ADDRESS, SWAP_INIT_CODE_HASH]
  )
}

const calculatePairAddress = (
  tokenA?: string,
  tokenB?: string,
  web3?: any,
  SWAP_FACTORY_ADDRESS?: string,
  SWAP_INIT_CODE_HASH?: string
) => {
  if (!tokenA || !tokenB) return undefined

  const [token0, token1] = tokenA < tokenB ? [tokenA, tokenB] : [tokenB, tokenA]

  let abiEncoded1 = web3.eth.abi.encodeParameters(['address', 'address'], [token0, token1])

  abiEncoded1 = abiEncoded1.split('0'.repeat(24)).join('')

  const salt = web3.utils.soliditySha3(abiEncoded1)

  let abiEncoded2 = web3.eth.abi.encodeParameters(['address', 'bytes32'], [SWAP_FACTORY_ADDRESS, salt])
  abiEncoded2 = abiEncoded2.split('0'.repeat(24)).join('').substr(2)

  const pair = '0x' + web3.utils.soliditySha3('0xff' + abiEncoded2, SWAP_INIT_CODE_HASH)?.substr(26)

  return pair
}
