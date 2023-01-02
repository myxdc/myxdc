'use client'
import { useAmountOut } from '@myxdc/hooks/swap/useAmountOut'
import { useSwapConfig } from '@myxdc/hooks/swap/useSwapConfig'
import { useTokens } from '@myxdc/hooks/useTokens'
import { SwapWidget, TokenType } from '@myxdc/ui'
import { SwapWidgetProps } from '@myxdc/ui/swapwidget/SwapWidget'
import { toHumanReadable } from '@myxdc/utils/numbers/price'
import { fromWei, toWei } from '@myxdc/utils/web3'
import React from 'react'

import SwapConfirm from './SwapConfirm'

export default function Swap() {
  const { tokens } = useTokens()
  const { config: swapConfig, setDeadline, setSlippage } = useSwapConfig()
  const [input, setInput] = React.useState<SwapWidgetProps['inputState']>({
    token: tokens[0],
    amount: '',
  })
  const [output, setOutput] = React.useState<SwapWidgetProps['outputState']>({
    token: tokens[1],
    amount: '',
  })
  const [showSwapModal, setShowSwapModal] = React.useState<boolean>(false)

  const { amountOut, priceImpact, error, isLoading } = useAmountOut(
    input?.amount && toWei(input?.amount, input?.token?.decimals || 18),
    input?.token?.address,
    output?.token?.address
  )

  /**
   * * Event handlers
   */
  const inputHandlers = {
    amountChange: (amount: string) => {
      setInput((input) => ({ ...input, amount }))
    },
    currencySelect: (token: TokenType) => {
      if (token.address === input?.token?.address) {
        return
      } else if (token.address === output?.token?.address) {
        helpers.switchTokensPlaces()
      } else {
        setInput((input) => ({ ...input, token }))
      }
    },
    maxBalance: () => {
      if (!input?.token?.balance) return
      // set to max minus 0.01% of the balance to avoid errors
      const max = input?.token?.balance - input?.token?.balance * 0.0001
      setInput((input) => ({ ...input, amount: max?.toString() || '' }))
    },
  }
  const outputHandlers = {
    currencySelect: (token: TokenType) => {
      if (token.address === output?.token?.address) {
        return
      } else if (token.address === input?.token?.address) {
        helpers.switchTokensPlaces()
      } else {
        setOutput({ token, amount: '' })
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

  const amountOutNum = amountOut ? fromWei(amountOut, output?.token?.decimals || 18) : 0

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
            : !input?.amount
            ? 'Enter an amount'
            : 'Swap',
          buttonVariant: error
            ? 'error'
            : isLoading
            ? 'loading'
            : !input?.amount || !amountOut
            ? 'disabled'
            : 'default',
        }}
        handleSubmit={handleSubmit}
        handleSwitchPlaces={helpers.switchTokensPlaces}
        exchangeRate={
          amountOut
            ? {
                rate1: `1 ${input?.token?.symbol} = ${toHumanReadable(rateAtoB, 4)} ${output?.token?.symbol}`,
                rate2: `1 ${output?.token?.symbol} = ${toHumanReadable(rateBtoA, 4)} ${input?.token?.symbol}`,
                priceImpact: priceImpact ? parseFloat(priceImpact) : undefined,
                liquidityFee: '0.30%',
                minReceived:
                  amountMin || amountMin === 0
                    ? toHumanReadable(amountMin, 4) + ' ' + output?.token?.symbol
                    : undefined,
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
            rate1: `1 ${input?.token?.symbol} = ${toHumanReadable(rateAtoB, 4)} ${output?.token?.symbol}`,
            rate2: `1 ${output?.token?.symbol} = ${toHumanReadable(rateBtoA, 4)} ${input?.token?.symbol}`,
            priceImpact: parseFloat(priceImpact!),
            liquidityFee: '0.30%',
            minReceived: toHumanReadable(amountMin, 4) + ' ' + output?.token?.symbol,
          }}
          inputState={{
            token: input!.token!,
            amount: input!.amount!,
            amountRaw: toWei(input!.amount!, input!.token!.decimals || 18),
          }}
          outputState={{
            token: output!.token!,
            amount: `${amountOutNum}`,
            amountRaw: amountOut!,
            min: `${amountMin}`,
            minRaw: toWei(amountMin!.toString(), output!.token!.decimals || 18),
          }}
        />
      )}
    </>
  )
}
