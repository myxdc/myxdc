'use client'
import { useTokens } from '@myxdc/hooks/useTokens'
import { useSwap } from '@myxdc/hooks/useSwap'
import { SwapWidget, SwapWidgetSkeleton, TokenType } from '@myxdc/ui'
import { SwapWidgetProps } from '@myxdc/ui/swapwidget/SwapWidget'
import React from 'react'
import { toHumanReadable } from '@myxdc/utils/numbers/price'
import { toast } from 'react-hot-toast'
import { useWallet } from '@myxdc/hooks/useWallet'

export default function Swap() {
  /**
   * * Initial states
   */
  const swap = useSwap()
  const { tokens } = useTokens()
  const { updateAccountsBalances } = useWallet()
  const [input, setInput] = React.useState<SwapWidgetProps['inputState']>({
    token: tokens[0],
    amount: '',
  })
  const [output, setOutput] = React.useState<SwapWidgetProps['outputState']>({
    token: tokens[1],
    amount: '',
  })
  const [priceImpact, setPriceImpact] = React.useState<number | undefined>(undefined)
  const [minReceived, setMinReceived] = React.useState<string | undefined>(undefined)
  const [error, setError] = React.useState<string | undefined>(undefined)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [showSkeleton, setShowSkeleton] = React.useState<boolean>(false)

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

  const handleSubmit = () => {
    if (loading || error || !input?.amount || !output?.amount) return
    setShowSkeleton(true)
    swap.send
      ?.swapTokens(input?.token?.address!, output?.token?.address!, input?.amount!, minReceived!)
      .then(() => {
        setShowSkeleton(false)
        setInput((input) => ({ ...input, amount: '' }))
        setOutput((output) => ({ ...output, amount: '' }))
        updateAccountsBalances()
      })
      .catch((err) => {
        setShowSkeleton(false)
      })
  }

  /**
   * * Helpers
   */
  const helpers = {
    switchTokensPlaces: () => {
      setInput((input) => ({ ...input, token: output?.token, amount: output?.amount }))
      setOutput((output) => ({ ...output, token: input?.token, amount: '' }))
    },
  }

  /**
   * * Effects
   */
  // if input amount or input token or output token changes, update output amount
  React.useEffect(() => {
    if (input?.token?.address && output?.token?.address && input?.amount && input?.amount !== '0') {
      // reset the state
      setOutput((output) => ({ ...output, amount: undefined }))
      setPriceImpact(undefined)
      setMinReceived(undefined)
      setError(undefined)
      setLoading(true)

      if (Number(input?.amount) > Number(input?.token?.balance)) {
        setError('Insufficient balance')
        setLoading(false)
      }

      // using setTimeout to only fetch output amount after user stops typing
      const timeout = setTimeout(() => {
        // fetch output amount
        swap.call
          ?.amountOut(input?.token?.address!, output?.token?.address!, input?.amount!)
          .then((data) => {
            setOutput((output) => ({ ...output, amount: data.amountOut }))
            setPriceImpact(Number(data.priceImpact))
            setMinReceived(data.amountOutMin)
            setLoading(false)
          })
          .catch((err) => {
            toast.error(err.message, { duration: 5000 })
            setError(err.message)
            setLoading(false)
          })
      }, 500)
      return () => clearTimeout(timeout)
    } else {
      setOutput((output) => ({ ...output, amount: '' }))
    }
  }, [input?.amount, input?.token, output?.token])

  /**
   * * Render
   */
  if (showSkeleton) {
    return <SwapWidgetSkeleton />
  }
  return (
    <SwapWidget
      tokens={tokens}
      inputState={input}
      outputState={output}
      inputHandlers={inputHandlers}
      outputHandlers={outputHandlers}
      uiConfig={{
        buttonText: error
          ? error
          : loading
          ? 'loading'
          : !input?.amount || !output?.amount
          ? 'Enter an amount'
          : 'Swap',
        buttonVariant: error
          ? 'error'
          : loading
          ? 'loading'
          : !input?.amount || !output?.amount
          ? 'disabled'
          : 'default',
      }}
      handleSubmit={handleSubmit}
      handleSwitchPlaces={helpers.switchTokensPlaces}
      exchangeRate={
        output?.amount
          ? {
              rate1: `1 ${input?.token?.symbol} = ${toHumanReadable(Number(output?.amount) / Number(input?.amount))} ${
                output?.token?.symbol
              }`,
              rate2: `1 ${output?.token?.symbol} = ${toHumanReadable(Number(input?.amount) / Number(output?.amount))} ${
                input?.token?.symbol
              }`,
              priceImpact: priceImpact,
              liquidityFee: '0.30%',
              minReceived: minReceived && toHumanReadable(minReceived) + ' ' + output?.token?.symbol,
            }
          : undefined
      }
      config={{
        deadline: swap.config?.deadline,
        slippage: swap.config?.slippage,
      }}
      configHandlers={{
        setDeadline(deadline) {
          swap.config?.setDeadline(deadline)
        },
        setSlippage(slippage) {
          if (slippage === 'auto') {
            swap.config?.setSlippage(0.5)
            return
          }
          swap.config?.setSlippage(slippage)
        },
      }}
    />
  )
}
