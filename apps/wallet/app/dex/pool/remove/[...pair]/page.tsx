'use client'
import { useWeb3 } from '@myxdc/hooks/contracts/useWeb3'
import { useSwapConfig } from '@myxdc/hooks/swap/useSwapConfig'
import { useUserLiquidity } from '@myxdc/hooks/swap/useUserLiquidity'
import { useTokensWithBalances } from '@myxdc/hooks/tokens/useTokensWithBalances'
import { useAccount } from '@myxdc/hooks/wallet/useAccount'
import { LiquidityWidgetRemove } from '@myxdc/ui'
import { LiquidityWidgetRemoveProps } from '@myxdc/ui/liquiditywidget/LiquidityRemove'
import { toHumanReadable } from '@myxdc/utils/numbers/price'
import { fromWei, toChecksumAddress } from '@myxdc/utils/web3'
import { useState } from 'react'

import LiquidityConfirmRemove from './RemoveConfirm'

export default function Page({
  params,
}: {
  params: {
    pair: string[]
  }
}) {
  const { activeAccount } = useAccount()
  const { tokens } = useTokensWithBalances({
    address: activeAccount?.address,
  })
  const { config: swapConfig } = useSwapConfig()
  const [showConfirm, setShowConfirm] = useState(false)
  const outputA = {
    token: tokens?.find((t) => t.address.toLowerCase() === toChecksumAddress(params?.pair?.[0]).toLowerCase()),
  }
  const outputB = {
    token: tokens?.find((t) => t.address.toLowerCase() === toChecksumAddress(params?.pair?.[1]).toLowerCase()),
  }
  const { pooledToken1, pooledToken2, liquidityTokens, error } = useUserLiquidity(
    activeAccount?.address,
    outputA?.token?.address,
    outputB?.token?.address
  )
  const [percent, setPercent] = useState<LiquidityWidgetRemoveProps['percent']>('25')
  const web3 = useWeb3()

  if (!outputA?.token || !outputB?.token || !activeAccount) return null

  const liquidityTokensNum = liquidityTokens ? fromWei(liquidityTokens, 18) : undefined

  const output1Amount = pooledToken1
    ? web3.utils
        .toBN(pooledToken1)
        .mul(web3.utils.toBN(percent || 0))
        .div(web3.utils.toBN(100))
    : undefined
  const output2Amount = pooledToken2
    ? web3.utils
        .toBN(pooledToken2)
        .mul(web3.utils.toBN(percent || 0))
        .div(web3.utils.toBN(100))
    : undefined
  const output1AmountMin = output1Amount
    ? output1Amount
        .mul(web3.utils.toBN((1000 - (swapConfig?.slippage || 0) * 10).toFixed(0)))
        .div(web3.utils.toBN(1000))
    : undefined
  const output2AmountMin = output2Amount
    ? output2Amount
        .mul(web3.utils.toBN((1000 - (swapConfig?.slippage || 0) * 10).toFixed(0)))
        .div(web3.utils.toBN(1000))
    : undefined

  const outputAAmount = output1Amount ? fromWei(output1Amount.toString(), outputA?.token?.decimals || 18) : undefined
  const outputBAmount = output2Amount ? fromWei(output2Amount.toString(), outputB?.token?.decimals || 18) : undefined

  const liquidityTokensAmount = liquidityTokensNum ? (liquidityTokensNum * Number(percent)) / 100 : undefined
  return (
    <>
      <LiquidityWidgetRemove
        outputB={{ ...outputB, amount: outputBAmount ? `${toHumanReadable(outputBAmount.toFixed(4), 4)}` : '0' }}
        outputA={{ ...outputA, amount: outputAAmount ? `${toHumanReadable(outputAAmount.toFixed(4), 4)}` : '0' }}
        percent={percent}
        setPercent={setPercent}
        buttonVariant={
          !error && outputAAmount && outputBAmount && outputAAmount > 0.0001 && outputBAmount > 0.0001
            ? 'default'
            : 'disabled'
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
            minRaw: output1AmountMin?.toString() || '0',
          }}
          outputBState={{
            token: outputB.token!,
            amount: outputBAmount ? `${toHumanReadable(outputBAmount.toFixed(4), 4)}` : '0',
            minRaw: output2AmountMin?.toString() || '0',
          }}
          liquidityTokensAmount={liquidityTokens!}
          onClose={() => {
            setShowConfirm(false)
          }}
        />
      )}
    </>
  )
}
