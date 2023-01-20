import { useMemo } from 'react'

import Web3 from 'web3'

import { useConfig } from '../custom/useConfig'

export const useWeb3 = () => {
  const { RPC_URL } = useConfig()
  return useMemo(() => new Web3(RPC_URL), [RPC_URL])
}
