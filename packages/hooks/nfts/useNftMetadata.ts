import XRC_721 from '@myxdc/constants/artifacts/XRC721.json'
import React from 'react'
import useSWR from 'swr'

import { useWeb3 } from '../contracts/useWeb3'

export const useNftMetadata = ({ contractAddress, tokenId }: { contractAddress?: string; tokenId?: string }) => {
  const Web3 = useWeb3()

  const fetcher = React.useCallback(
    async ([contractAddress, tokenId]: any) => {
      if (!contractAddress || !tokenId) return null

      const contract = new Web3.eth.Contract(XRC_721.abi as any, contractAddress)
      const tokenURI = await contract.methods.tokenURI(tokenId).call()
      const res = await fetch(tokenURI)
      if (!res.ok) {
        throw new Error('Failed to fetch NFT metadata')
      }
      const owner = await contract.methods.ownerOf(tokenId).call()
      const metadata = await res.json()
      return { ...metadata, owner }
    },
    [contractAddress, tokenId]
  )

  const { data, mutate, isLoading, error } = useSWR([contractAddress, tokenId, 'nftMetadata'], fetcher, {
    refreshInterval: 0,
    revalidateOnFocus: false,
  })

  return {
    nftData: data,
    mutate,
    isLoading,
    error,
  }
}
