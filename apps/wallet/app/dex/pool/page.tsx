'use client'
import { useTokens } from '@myxdc/hooks/useTokens'
import { PoolWidget, TokenType } from '@myxdc/ui'
import Link from 'next/link'
import { useState } from 'react'

export default function Page() {
  const [token1, setToken1] = useState<TokenType | undefined>(undefined)
  const [token2, setToken2] = useState<TokenType | undefined>(undefined)

  const { tokens } = useTokens()
  return (
    <PoolWidget
      tokens={tokens}
      token1={token1}
      token2={token2}
      onToken1Change={setToken1}
      onToken2Change={setToken2}
      addLiquidityButton={
        <Link href="/dex/pool/add/xdc/0x1111111111111111111111111111111111111111">Add Liquidity</Link>
      }
      removeLiquidityButton={
        <Link href="/dex/pool/remove/xdc/0x1111111111111111111111111111111111111111">Remove Liquidity</Link>
      }
    />
  )
}
