import React from 'react'
import useSWR from 'swr'

import { useConfig } from '../custom/useConfig'

export const useUserNfts = ({ address, page = 0 }: { address?: string; page?: number }) => {
  const { CHAIN_ID } = useConfig()

  const fetcher = React.useCallback(
    async ([address]: any) => {
      if (!address) return null
      const res = await fetch(
        CHAIN_ID === 51
          ? `https://explorer.apothem.network/api/tokens/holding/xrc721/${address}?page=${page}&limit=10`
          : `https://explorer.xinfin.network/api/tokens/holding/xrc721/${address}?page=${page}&limit=10`
      )
      if (!res.ok) {
        throw new Error('Failed to fetch account NFTs')
      }
      return res.json()
    },
    [address, page]
  )

  const { data, mutate, isLoading, error } = useSWR([address, 'userNfts'], fetcher, {
    refreshInterval: 0,
  })

  return {
    nfts: data,
    mutate,
    isLoading,
    error,
  }
}
