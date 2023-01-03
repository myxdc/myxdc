'use client'
import { useUserLiquidity } from '@myxdc/hooks/swap/useUserLiquidity'
import { useTokensWithBalances } from '@myxdc/hooks/tokens/useTokensWithBalances'
import { useAccount } from '@myxdc/hooks/wallet/useAccount'
import { PoolWidget, PoolWidgetSkeleton, TokenType, Typography } from '@myxdc/ui'
import { toHumanReadable } from '@myxdc/utils/numbers/price'
import { fromWei } from '@myxdc/utils/web3'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Page() {
  /**
   * * Initial states
   */
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  const [token1, setToken1] = useState<TokenType | undefined>(undefined)
  const [token2, setToken2] = useState<TokenType | undefined>(undefined)
  const { activeAccount } = useAccount()
  const { tokens } = useTokensWithBalances({
    address: activeAccount?.address,
  })
  const { liquidityTokens, pooledToken2, pooledToken1, poolShare, isLoading, error } = useUserLiquidity(
    activeAccount?.address,
    token1?.address,
    token2?.address
  )

  if (!mounted) {
    return <PoolWidgetSkeleton />
  }

  if (!activeAccount) {
    return (
      <div className="relative max-w-md px-4 py-6 mx-auto bg-white shadow-lg sm:px-6 rounded-3xl">
        <Typography variant="h5" weight={600} className="text-center text-gray-800">
          Please connect your wallet to view your liquidity
        </Typography>
      </div>
    )
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
        poolShare: poolShare ? poolShare + '%' : undefined,
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
