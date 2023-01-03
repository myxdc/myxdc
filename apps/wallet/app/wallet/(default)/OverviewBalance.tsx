'use client'

import { useTokensWithBalances } from '@myxdc/hooks/tokens/useTokensWithBalances'
import { useAccount } from '@myxdc/hooks/wallet/useAccount'
import { Skeleton, Typography } from '@myxdc/ui'
import { toHumanReadable } from '@myxdc/utils/numbers/price'
import React from 'react'

export const OverviewBalance = () => {
  const { activeAccount } = useAccount()
  const { totalUsd } = useTokensWithBalances({ address: activeAccount?.address })

  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || (!totalUsd && totalUsd !== 0)) return <Skeleton width={120} height={38} className="opacity-60" />

  if (!activeAccount)
    return (
      <>
        <Typography as="span" variant="h4" className="text-primary-200" weight={700}>
          Please connect your wallet
        </Typography>
      </>
    )

  return (
    <>
      ${toHumanReadable(totalUsd.toString().split('.')[0])}
      <Typography as="span" variant="h4" className="text-primary-200" weight={700}>
        .{totalUsd?.toFixed(2).toString()?.split('.')[1]?.slice(0, 2)}
      </Typography>
    </>
  )
}
