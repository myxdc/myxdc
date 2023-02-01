import XRC_20 from '@myxdc/constants/artifacts/XRC20.json'
import { fromWei } from '@myxdc/utils/web3'
import { useAtomValue } from 'jotai'
import React from 'react'
import useSWR from 'swr'
import { useSWRConfig } from 'swr'

import { useWeb3 } from '../contracts/useWeb3'
import { tokensAtom } from './state'
import { Token } from './types'

export const useTokensWithBalances = ({
  address,
  wei = false,
  autoRefresh = 60000,
}: {
  address?: string
  wei?: boolean
  autoRefresh?: number
}) => {
  const tokens = useAtomValue(tokensAtom)
  const Web3 = useWeb3()
  const { mutate } = useSWRConfig()

  const fetcher = React.useMemo(() => {
    return async ({ address, tokens }: { address: string; tokens: Token[] }) => {
      if (!address) return null
      console.log('fetching tokens balances & prices...')

      const balances = await Promise.all(
        tokens.map(async (token) => {
          if (token.symbol === 'XDC') {
            const balance = await Web3.eth.getBalance(address)
            return {
              ...token,
              balance: wei ? balance : fromWei(balance, token.decimals || 18),
            }
          }
          const contract = new Web3.eth.Contract(XRC_20.abi as any, token.address)
          const balance = await contract.methods.balanceOf(address).call()
          return {
            ...token,
            balance: wei ? balance : fromWei(balance, token.decimals || 18),
          }
        })
      ).catch((e: any) => {
        console.error(e)
        throw e
      })

      let coinGeckoIds = ''
      balances.forEach((token) => {
        if (token.coinGeckoId && token.coinGeckoId !== '') {
          coinGeckoIds += `${token.coinGeckoId},`
        }
      })

      let balanceWithPrice = balances
      const data = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinGeckoIds}&vs_currencies=usd`)
        .then((response) => {
          return response.json()
        })
        .catch((e) => {
          console.error(e)
        })
      balanceWithPrice = balances.map((token) => {
        if (token.coinGeckoId && data[token.coinGeckoId]) {
          return {
            ...token,
            price: data[token.coinGeckoId].usd,
            usd: wei
              ? fromWei(token.balance, token.decimals || 18) * data[token.coinGeckoId].usd
              : token.balance * data[token.coinGeckoId].usd,
          }
        } else {
          return {
            ...token,
            price: 0,
            usd: 0,
          }
        }
      })

      return balanceWithPrice
    }
  }, [address, tokens, wei])

  const {
    data: tokensWithBalance,
    mutate: mutateTokensWithBalance,
    isLoading,
    error,
  } = useSWR({ address, tokens }, fetcher, {
    refreshInterval: autoRefresh ? autoRefresh : 0,
    dedupingInterval: 10000,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateOnMount: true,
  })

  const totalUsd = React.useMemo(() => {
    if (!tokensWithBalance) return 0
    return tokensWithBalance.reduce((acc, token) => {
      return acc + (token.usd || 0)
    }, 0)
  }, [tokensWithBalance])

  // mutate useTokensWithBalances in addition to useBalance hook
  const mutateAll = React.useCallback(() => {
    mutateTokensWithBalance()
    mutate([address, 'userBalance'])
  }, [address])

  return {
    tokens: (tokensWithBalance as Token[]) || tokens,
    totalUsd,
    mutate: mutateAll,
    isLoading,
    error,
  }
}
