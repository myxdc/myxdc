import React from 'react'
import useSWR from 'swr'

import { useWeb3 } from '../contracts/useWeb3'

export const useBalance = ({
  address,
  wei = false,
  autoRefresh = false,
}: {
  address?: string
  wei?: boolean
  autoRefresh?: boolean
}) => {
  const Web3 = useWeb3()

  const fetcher = React.useMemo(
    () =>
      async ([address]: any) => {
        if (!address) return null
        const balance = await Web3.eth.getBalance(address)
        return wei ? balance : Web3.utils.fromWei(balance)
      },
    [address, wei]
  )

  const { data: balance, mutate } = useSWR([address, 'userBalance'], fetcher, {
    refreshInterval: autoRefresh ? 30000 : 0,
  })

  return {
    balance,
    mutate,
  }
}
