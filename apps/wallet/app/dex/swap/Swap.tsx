'use client'
import { useAmountOut } from '@myxdc/hooks/swap/useAmountOut'
import { useSwapConfig } from '@myxdc/hooks/swap/useSwapConfig'
import { useTokensWithBalances } from '@myxdc/hooks/tokens/useTokensWithBalances'
import { useAccount } from '@myxdc/hooks/wallet/useAccount'
import { SwapWidget } from '@myxdc/ui'
import { SwapWidgetProps } from '@myxdc/ui/swapwidget/SwapWidget'
import { toHumanReadable } from '@myxdc/utils/numbers/price'
import { fromWei, toWei } from '@myxdc/utils/web3'
import React, { useMemo } from 'react'

import SwapConfirm from './SwapConfirm'

export default function Swap() {
  const { activeAccount } = useAccount()
  const { tokens } = useTokensWithBalances({ address: activeAccount?.address })
  const { config: swapConfig, setDeadline, setSlippage } = useSwapConfig()
  const [input, setInput] = React.useState<SwapWidgetProps['inputState']>({
    token: tokens[0].address,
    amount: '',
  })
  const [output, setOutput] = React.useState<SwapWidgetProps['outputState']>({
    token: tokens[1].address,
    amount: '',
  })
  const [showSwapModal, setShowSwapModal] = React.useState<boolean>(false)

  const inputToken = useMemo(() => tokens.find((t) => t.address === input?.token), [input, tokens])
  const outputToken = useMemo(() => tokens.find((t) => t.address === output?.token), [output, tokens])

  const { amountOut, priceImpact, error, isLoading } = useAmountOut(
    input?.amount && toWei(input?.amount, inputToken?.decimals || 18),
    input?.token,
    output?.token
  )

  /**
   * * Event handlers
   */
  const inputHandlers = {
    amountChange: (amount: string) => {
      setInput((input) => ({ ...input, amount }))
    },
    currencySelect: (tokenAddress: string) => {
      if (tokenAddress === input?.token) {
        return
      } else if (tokenAddress === output?.token) {
        helpers.switchTokensPlaces()
      } else {
        setInput((input) => ({ ...input, token: tokenAddress }))
      }
    },
    maxBalance: () => {
      if (!inputToken?.balance) return
      let max = inputToken?.balance
      if (inputToken?.symbol === 'XDC') {
        max = parseFloat(String(inputToken?.balance)) - 0.0001
      }
      setInput((input) => ({ ...input, amount: max?.toString() || '' }))
    },
  }
  const outputHandlers = {
    currencySelect: (tokenAddress: string) => {
      if (tokenAddress === output?.token) {
        return
      } else if (tokenAddress === input?.token) {
        helpers.switchTokensPlaces()
      } else {
        setOutput({ amount: '', token: tokenAddress })
      }
    },
  }

  const handleSubmit = async () => {
    if (isLoading || error || !input?.amount || !amountOut) return
    setShowSwapModal(true)
  }

  /**
   * * Helpers
   */
  const helpers = {
    switchTokensPlaces: () => {
      setInput((input) => ({ ...input, token: output?.token }))
      setOutput((output) => ({ ...output, token: input?.token }))
    },
  }

  /**
   * * Render
   */

  const amountOutNum = amountOut ? fromWei(amountOut, outputToken?.decimals || 18) : 0

  const rateAtoB = amountOut && input?.amount && amountOutNum / parseFloat(input?.amount)
  const rateBtoA = amountOut && input?.amount && parseFloat(input?.amount) / amountOutNum

  const amountMin = amountOut && amountOutNum * (1 - swapConfig?.slippage / 100)

  return (
    <>
      <SwapWidget
        tokens={tokens}
        inputState={input}
        outputState={{
          token: output?.token,
          amount: amountOut && `${amountOutNum}`,
        }}
        inputHandlers={inputHandlers}
        outputHandlers={outputHandlers}
        uiConfig={{
          buttonText: error
            ? error.replaceAll('_', ' ')
            : isLoading
            ? 'loading'
            : !activeAccount
            ? 'Connect Wallet to Swap'
            : !input?.amount
            ? 'Enter an amount'
            : 'Swap',
          buttonVariant: error
            ? 'error'
            : isLoading
            ? 'loading'
            : !input?.amount || !amountOut || !activeAccount
            ? 'disabled'
            : 'default',
        }}
        handleSubmit={handleSubmit}
        handleSwitchPlaces={helpers.switchTokensPlaces}
        exchangeRate={
          amountOut
            ? {
                rate1: `1 ${inputToken?.symbol} = ${toHumanReadable(rateAtoB, 4)} ${outputToken?.symbol}`,
                rate2: `1 ${outputToken?.symbol} = ${toHumanReadable(rateBtoA, 4)} ${inputToken?.symbol}`,
                priceImpact: priceImpact ? parseFloat(priceImpact) : undefined,
                liquidityFee: '0.30%',
                minReceived:
                  amountMin || amountMin === 0 ? toHumanReadable(amountMin, 4) + ' ' + outputToken?.symbol : undefined,
              }
            : undefined
        }
        config={{
          deadline: swapConfig?.deadline,
          slippage: swapConfig?.slippage,
        }}
        configHandlers={{
          setDeadline,
          setSlippage,
        }}
      />
      {showSwapModal && (
        <SwapConfirm
          onClose={() => setShowSwapModal(false)}
          exchangeRate={{
            rate1: `1 ${inputToken?.symbol} = ${toHumanReadable(rateAtoB, 4)} ${outputToken?.symbol}`,
            rate2: `1 ${outputToken?.symbol} = ${toHumanReadable(rateBtoA, 4)} ${inputToken?.symbol}`,
            priceImpact: parseFloat(priceImpact!),
            liquidityFee: '0.30%',
            minReceived: toHumanReadable(amountMin, 4) + ' ' + outputToken?.symbol,
          }}
          inputState={{
            token: input!.token!,
            symbol: inputToken!.symbol!,
            amount: input!.amount!,
            amountRaw: toWei(input!.amount!, inputToken!.decimals || 18),
          }}
          outputState={{
            token: output!.token!,
            symbol: outputToken!.symbol!,
            amount: `${amountOutNum}`,
            amountRaw: amountOut!,
            min: `${amountMin}`,
            minRaw: toWei(amountMin!.toString(), outputToken!.decimals || 18),
          }}
        />
      )}
    </>
  )
}
