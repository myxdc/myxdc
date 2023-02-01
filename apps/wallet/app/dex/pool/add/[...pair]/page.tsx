'use client'
import { useQuote } from '@myxdc/hooks/swap/useQuote'
import { useSwapConfig } from '@myxdc/hooks/swap/useSwapConfig'
import { useUserLiquidity } from '@myxdc/hooks/swap/useUserLiquidity'
import { useBalance } from '@myxdc/hooks/tokens/useBalance'
import { useTokensWithBalances } from '@myxdc/hooks/tokens/useTokensWithBalances'
import { useAccount } from '@myxdc/hooks/wallet/useAccount'
import { LiquidityWidgetAdd } from '@myxdc/ui'
import { LiquidityWidgetAddProps } from '@myxdc/ui/liquiditywidget/LiquidityAdd'
import { toHumanReadable } from '@myxdc/utils/numbers/price'
import { fromWei, toChecksumAddress, toWei } from '@myxdc/utils/web3'
import React, { useMemo, useState } from 'react'

import LiquidityConfirmAdd from './AddConfirm'

const GAS_ESTIMATE = 0.0001

export default function Page({
  params,
}: {
  params: {
    pair: string[]
  }
}) {
  /**
   * * Initial states
   */
  const { activeAccount } = useAccount()
  const { tokens } = useTokensWithBalances({
    address: activeAccount?.address,
  })
  const [inputA, setInputA] = useState<LiquidityWidgetAddProps['inputAState']>({
    token: toChecksumAddress(params?.pair?.[0]),
    amount: '',
  })
  const [inputB, setInputB] = useState<LiquidityWidgetAddProps['inputBState']>({
    token: toChecksumAddress(params?.pair?.[1]),
    amount: '',
  })
  const [showConfirm, setShowConfirm] = useState(false)
  const { balance } = useBalance({ address: activeAccount?.address })

  const tokenA = useMemo(
    () => tokens.find((t) => t.address.toLowerCase() === inputA?.token?.toLowerCase()),
    [inputA, tokens]
  )
  const tokenB = useMemo(
    () => tokens.find((t) => t.address.toLowerCase() === inputB?.token?.toLowerCase()),
    [inputB, tokens]
  )
  const quotedB = useQuote(
    inputA?.amount ? toWei(inputA?.amount, tokenA?.decimals || 18) : undefined,
    inputA?.token,
    inputB?.token
  )
  const [customQuoteB, setCustomQuoteB] = useState<string | undefined>(undefined)
  const { error: liquidityError } = useUserLiquidity(activeAccount?.address, inputA?.token, inputB?.token)
  const { config: swapConfig } = useSwapConfig()

  const [error, setError] = React.useState<string | undefined>(undefined)

  /**
   * * Event handlers
   */
  const inputAHandlers = {
    amountChange: (amount: string) => {
      setInputA((input) => ({ ...input, amount }))
    },
    currencySelect: (token: string) => {
      if (token.toLowerCase() === inputA?.token?.toLowerCase()) {
        return
      } else if (token.toLowerCase() === inputB?.token?.toLowerCase()) {
        helpers.switchTokensPlaces()
      } else {
        setInputA((input) => ({ ...input, token }))
      }
    },
    maxBalance: () => {
      if (!tokenA?.balance || parseFloat(String(tokenA?.balance)) <= 0.0001) return
      // set to max minus 0.01% of the balance to avoid errors
      const max = parseFloat(String(tokenA?.balance)) - parseFloat(String(tokenA?.balance)) * 0.0001
      setInputA((input) => ({ ...input, amount: max?.toString() || '' }))
    },
  }
  const inputBHandlers = {
    amountChange: (amount: string) => {
      setCustomQuoteB(amount)
    },
    currencySelect: (token: string) => {
      if (token.toLowerCase() === inputB?.token?.toLowerCase()) {
        return
      } else if (token.toLowerCase() === inputA?.token?.toLowerCase()) {
        helpers.switchTokensPlaces()
      } else {
        setInputB((input) => ({ ...input, token }))
      }
    },
    maxBalance: () => {
      if (!tokenB?.balance || parseFloat(String(tokenB?.balance)) <= 0.0001) return
      // set to max minus 0.01% of the balance to avoid errors
      const max = parseFloat(String(tokenB?.balance)) - parseFloat(String(tokenB?.balance)) * 0.0001
      setInputB((input) => ({ ...input, amount: max?.toString() || '' }))
    },
  }

  /**
   * * Helpers
   */
  const helpers = {
    switchTokensPlaces: () => {
      setInputA((inputA) => ({ ...inputA, token: inputB?.token, amount: inputB?.amount }))
      setInputB((inputB) => ({ ...inputB, token: inputA?.token, amount: inputA?.amount }))
    },
  }
  const isNewPair = liquidityError?.message === 'PAIR_NOT_FOUND'

  let inputBNum = 0
  if (isNewPair) {
    inputBNum = parseFloat(customQuoteB || '0')
  } else {
    inputBNum = quotedB ? fromWei(quotedB, tokenB?.decimals || 18) : 0
  }

  const rateAtoB = quotedB || isNewPair ? inputA?.amount && parseFloat(inputA.amount) / inputBNum : '0'
  const rateBtoA = quotedB || isNewPair ? inputA?.amount && inputBNum / parseFloat(inputA.amount) : '0'

  const inputAMin = inputA?.amount && parseFloat(inputA.amount) * (1 - swapConfig?.slippage / 100)
  const inputBMin = inputBNum && inputBNum * (1 - swapConfig?.slippage / 100)

  const inputAMinRaw = inputAMin ? toWei(inputAMin.toString(), tokenA?.decimals || 18) : undefined
  const inputBMinRaw = inputBMin ? toWei(inputBMin.toString(), tokenB?.decimals || 18) : undefined

  React.useEffect(() => {
    if (!inputA?.amount && !inputB?.amount) return setError(undefined)
    const amountB = parseFloat(isNewPair ? `${customQuoteB}` : quotedB ? `${inputBNum}` : quotedB)

    if (
      parseFloat(inputA?.amount || '0') > parseFloat(String(tokenA?.balance)) ||
      amountB > parseFloat(String(tokenB?.balance))
    ) {
      setError('Insufficient balance')
    } else if (parseFloat(balance || '0') < GAS_ESTIMATE) {
      setError('Insufficient gas')
    } else if (
      (tokenB?.symbol === 'XDC' && amountB > parseFloat(String(tokenB?.balance)) - GAS_ESTIMATE) ||
      (tokenA?.symbol === 'XDC' && amountB > parseFloat(String(tokenA?.balance)) - GAS_ESTIMATE)
    ) {
      setError('Insufficient balance')
    } else if (amountB <= 0.0001 || parseFloat(inputA?.amount || '0') <= 0.0001) {
      setError('Amount too small')
    } else {
      setError(undefined)
    }
  }, [inputB, balance, tokenB, inputA, tokenA, quotedB, inputBNum])

  if (!activeAccount) return null

  return (
    <>
      <LiquidityWidgetAdd
        tokens={tokens}
        inputAState={{
          token: inputA?.token,
          amount: inputA?.amount,
          symbol: tokenA?.symbol,
        }}
        inputBState={{
          token: inputB?.token,
          amount: isNewPair ? `${customQuoteB}` : quotedB ? `${inputBNum}` : quotedB,
          symbol: tokenB?.symbol,
        }}
        inputAHandlers={inputAHandlers}
        inputBHandlers={inputBHandlers}
        prices={{
          AperB: rateAtoB ? toHumanReadable(rateAtoB, 4) : undefined,
          BperA: rateBtoA ? toHumanReadable(rateBtoA, 4) : undefined,
        }}
        uiConfig={{
          allowInputB: isNewPair,
          buttonText: error ? error.replaceAll('_', ' ') : isNewPair ? 'Create Pair' : 'Add liquidity',
          buttonVariant: error ? 'error' : quotedB || isNewPair ? 'default' : 'disabled',
        }}
        handleSubmit={() => {
          if (!activeAccount) return
          if (!inputA?.amount || !inputA.token) return
          if (quotedB || (isNewPair && customQuoteB)) {
            setShowConfirm(true)
          }
        }}
      />

      {showConfirm && (
        <LiquidityConfirmAdd
          inputAState={{
            token: inputA!.token!,
            amount: inputA!.amount!,
            amountRaw: toWei(inputA!.amount!, tokenA?.decimals || 18),
            minRaw: inputAMinRaw || '0',
            symbol: tokenA!.symbol!,
          }}
          inputBState={{
            token: inputB!.token!,
            amount: isNewPair ? customQuoteB! : inputBNum.toString(),
            amountRaw: isNewPair ? toWei(customQuoteB!, tokenB?.decimals || 18) : quotedB!,
            minRaw: inputBMinRaw || '0',
            symbol: tokenB!.symbol!,
          }}
          exchangeRate={{
            AperB: toHumanReadable(rateAtoB, 4),
            BperA: toHumanReadable(rateBtoA, 4),
          }}
          isNewPair={isNewPair}
          onClose={() => {
            setShowConfirm(false)
          }}
        />
      )}
    </>
  )
}
