'use client'
import { useSwapWatchList } from '@myxdc/hooks/swap/useSwapWatchList'
import { useUserLiquidity } from '@myxdc/hooks/swap/useUserLiquidity'
import { useTokensWithBalances } from '@myxdc/hooks/tokens/useTokensWithBalances'
import { useAccount } from '@myxdc/hooks/wallet/useAccount'
import { Typography } from '@myxdc/ui'
import { LiquidityBox } from '@myxdc/ui/poolwidget/LiquidityBox'
import { toHumanReadable } from '@myxdc/utils/numbers/price'
import { fromWei } from '@myxdc/utils/web3'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

export default function Page() {
  /**
   * * Initial states
   */
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  const { activeAccount } = useAccount()
  const { watchList } = useSwapWatchList()

  if (!mounted) {
    return (
      <div className="relative max-w-md px-4 py-6 mx-auto bg-white shadow-lg sm:px-6 rounded-3xl">
        <LiquidityBox />
      </div>
    )
  }

  if (!activeAccount) {
    return (
      <div className="relative max-w-md px-4 py-6 mx-auto bg-white shadow-lg sm:px-6 rounded-3xl">
        <Typography variant="h5" weight={600} className="text-center text-gray-800">
          Please connect your wallet to view your watchList
        </Typography>
      </div>
    )
  }

  return (
    <div className="relative max-w-md px-4 py-6 mx-auto bg-white shadow-lg sm:px-6 rounded-3xl">
      <Typography variant="h5" weight={600} className="text-center text-gray-800">
        Your Watchlist
      </Typography>
      {watchList.map((pair, index) => {
        return <WatchListBox key={index} token1={pair[0]} token2={pair[1]} />
      })}
      {watchList.length === 0 && (
        <Typography variant="p" className="mt-4 text-center text-gray-800">
          You have no tokens in your watchlist. Add tokens to your watchlist by clicking the star icon on the pool page.
        </Typography>
      )}
    </div>
  )
}

const WatchListBox = ({ token1, token2 }: { token1: string; token2: string }) => {
  const { activeAccount } = useAccount()
  const { liquidityTokens, pooledToken2, pooledToken1, poolShare, isLoading, error } = useUserLiquidity(
    activeAccount?.address,
    token1,
    token2
  )
  const { tokens } = useTokensWithBalances({
    address: activeAccount?.address,
  })

  const token1Data = useMemo(() => {
    return tokens.find((token) => token.address.toLowerCase() === token1.toLowerCase())
  }, [tokens, token1])

  const token2Data = useMemo(() => {
    return tokens.find((token) => token.address.toLowerCase() === token2.toLowerCase())
  }, [tokens, token2])

  const liquidity = useMemo(() => {
    return {
      pooledToken1: pooledToken1 ? toHumanReadable(fromWei(pooledToken1, token1Data?.decimals || 18), 4) : undefined,
      pooledToken2: pooledToken2 ? toHumanReadable(fromWei(pooledToken2, token2Data?.decimals || 18), 4) : undefined,
      totalPoolTokens: liquidityTokens ? toHumanReadable(fromWei(liquidityTokens, 18), 4) : undefined,
      poolShare: poolShare ? poolShare + '%' : undefined,
    }
  }, [pooledToken1, pooledToken2, liquidityTokens, poolShare])

  return (
    <LiquidityBox
      totalPoolTokens={liquidity?.totalPoolTokens}
      poolShare={liquidity?.poolShare}
      pooledToken1={liquidity?.pooledToken1}
      pooledToken2={liquidity?.pooledToken2}
      symbol1={token1Data?.symbol}
      symbol2={token2Data?.symbol}
      token1={token1Data?.address}
      token2={token2Data?.address}
      addLiquidityButton={
        !isLoading ? (
          <Link href={`/dex/pool/add/${token1Data?.address || 'xdc'}/${token2Data?.address}`}>Add Liquidity</Link>
        ) : undefined
      }
      removeLiquidityButton={
        !isLoading ? (
          parseFloat(liquidityTokens || '0') > 0.0001 ? (
            <Link href={`/dex/pool/remove/${token1Data?.address}/${token2Data?.address}`}>Remove Liquidity</Link>
          ) : (
            <></>
          )
        ) : undefined
      }
      createPairButton={
        error?.message === 'PAIR_NOT_FOUND' ? (
          <Link href={`/dex/pool/add/${token1Data?.address || 'xdc'}/${token2Data?.address}`}>Create Pair</Link>
        ) : undefined
      }
    />
  )
}
