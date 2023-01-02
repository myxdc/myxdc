'use client'
import { useSwapConfig } from '@myxdc/hooks/swap/useSwapConfig'
import { useUserLiquidity } from '@myxdc/hooks/swap/useUserLiquidity'
import { useTokens } from '@myxdc/hooks/useTokens'
import { useWallet } from '@myxdc/hooks/useWallet'
import { LiquidityWidgetRemove } from '@myxdc/ui'
import { LiquidityWidgetRemoveProps } from '@myxdc/ui/liquiditywidget/LiquidityRemove'
import { toHumanReadable } from '@myxdc/utils/numbers/price'
import { fromWei, toChecksumAddress, toWei } from '@myxdc/utils/web3'
import { useState } from 'react'

import LiquidityConfirmRemove from './RemoveConfirm'

export default function Page({
  params,
}: {
  params: {
    pair: string[]
  }
}) {
  const { tokens } = useTokens()
  const { account } = useWallet()
  const { config: swapConfig } = useSwapConfig()
  const [showConfirm, setShowConfirm] = useState(false)
  const outputA = {
    token: tokens?.find((t) => t.address.toLowerCase() === toChecksumAddress(params?.pair?.[0]).toLowerCase()),
  }
  const outputB = {
    token: tokens?.find((t) => t.address.toLowerCase() === toChecksumAddress(params?.pair?.[1]).toLowerCase()),
  }
  const { pooledToken1, pooledToken2, liquidityTokens, error } = useUserLiquidity(
    account.address,
    outputA?.token?.address,
    outputB?.token?.address
  )
  const [percent, setPercent] = useState<LiquidityWidgetRemoveProps['percent']>('25')

  if (!outputA?.token || !outputB?.token) return null

  const pooledTokenA = pooledToken1 ? fromWei(pooledToken1, outputA?.token?.decimals || 18) : undefined
  const pooledTokenB = pooledToken2 ? fromWei(pooledToken2, outputB?.token?.decimals || 18) : undefined
  const liquidityTokensNum = liquidityTokens ? fromWei(liquidityTokens, 18) : undefined

  const outputAAmount = pooledTokenA ? (pooledTokenA * Number(percent)) / 100 : undefined
  const outputBAmount = pooledTokenB ? (pooledTokenB * Number(percent)) / 100 : undefined
  const liquidityTokensAmount = liquidityTokensNum ? (liquidityTokensNum * Number(percent)) / 100 : undefined

  const outputAAmountMin = outputAAmount && outputAAmount * (1 - swapConfig?.slippage / 100)
  const outputBAmountMin = outputBAmount && outputBAmount * (1 - swapConfig?.slippage / 100)

  return (
    <>
      <LiquidityWidgetRemove
        outputB={{ ...outputB, amount: outputBAmount ? `${toHumanReadable(outputBAmount.toFixed(4), 4)}` : '0' }}
        outputA={{ ...outputA, amount: outputAAmount ? `${toHumanReadable(outputAAmount.toFixed(4), 4)}` : '0' }}
        percent={percent}
        setPercent={setPercent}
        buttonVariant={
          !error && outputAAmount && outputBAmount && outputAAmount > 0 && outputBAmount > 0 ? 'default' : 'disabled'
        }
        handleButtonClick={() => {
          if (
            !error &&
            outputAAmount &&
            outputBAmount &&
            outputAAmount > 0 &&
            outputBAmount > 0 &&
            liquidityTokensAmount
          ) {
            setShowConfirm(true)
          }
        }}
      />
      {showConfirm && (
        <LiquidityConfirmRemove
          outputAState={{
            token: outputA.token!,
            amount: outputAAmount ? `${outputAAmount.toFixed(4)}` : '0',
            minRaw: toWei(outputAAmountMin ? `${outputAAmountMin}` : '0', outputA.token?.decimals || 18),
          }}
          outputBState={{
            token: outputB.token!,
            amount: outputBAmount ? `${toHumanReadable(outputBAmount.toFixed(4), 4)}` : '0',
            minRaw: toWei(outputBAmountMin ? `${outputBAmountMin}` : '0', outputB.token?.decimals || 18),
          }}
          liquidityTokensAmount={toWei(liquidityTokensAmount!, 18)}
          onClose={() => {
            setShowConfirm(false)
          }}
        />
      )}
    </>
  )
}
