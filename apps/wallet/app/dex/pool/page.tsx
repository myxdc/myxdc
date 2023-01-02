'use client'
import { useUserLiquidity } from '@myxdc/hooks/swap/useUserLiquidity'
import { useTokens } from '@myxdc/hooks/useTokens'
import { useWallet } from '@myxdc/hooks/useWallet'
import { PoolWidget, TokenType } from '@myxdc/ui'
import { toHumanReadable } from '@myxdc/utils/numbers/price'
import { fromWei } from '@myxdc/utils/web3'
import Link from 'next/link'
import { useState } from 'react'

export default function Page() {
  /**
   * * Initial states
   */
  const [token1, setToken1] = useState<TokenType | undefined>(undefined)
  const [token2, setToken2] = useState<TokenType | undefined>(undefined)
  const { tokens } = useTokens()
  const { account } = useWallet()
  const { liquidityTokens, pooledToken2, pooledToken1, poolShare, isLoading, error } = useUserLiquidity(
    account.address,
    token1?.address,
    token2?.address
  )

  /**
   * * Event handlers
   */
  const watchList = {
    add: (token: TokenType) => {
      console.log('add token to watchlist', token)
    },
    remove: (token: TokenType) => {
      console.log('remove token from watchlist', token)
    },
  }

  return (
    <PoolWidget
      tokens={tokens}
      token1={token1}
      token2={token2}
      onToken1Change={setToken1}
      onToken2Change={setToken2}
      addLiquidityButton={
        !isLoading ? (
          <Link href={`/dex/pool/add/${token1?.address || 'xdc'}/${token2?.address}`}>Add Liquidity</Link>
        ) : undefined
      }
      removeLiquidityButton={
        !isLoading ? (
          <Link href={`/dex/pool/remove/${token1?.address}/${token2?.address}`}>Remove Liquidity</Link>
        ) : undefined
      }
      liquidity={{
        pooledToken1: pooledToken1 ? toHumanReadable(fromWei(pooledToken1, token1?.decimals || 18), 4) : undefined,
        pooledToken2: pooledToken2 ? toHumanReadable(fromWei(pooledToken2, token2?.decimals || 18), 4) : undefined,
        totalPoolTokens: liquidityTokens ? toHumanReadable(fromWei(liquidityTokens, 18), 4) : undefined,
        poolShare: poolShare + '%',
      }}
      createPairButton={
        error?.message === 'PAIR_NOT_FOUND' ? (
          <Link href={`/dex/pool/add/${token1?.address || 'xdc'}/${token2?.address}`}>Create Pair</Link>
        ) : undefined
      }
      error={error?.message === 'PAIR_NOT_FOUND' ? "Pair doesn't exist" : undefined}
    />
  )
}
