'use client'
import { useQuote } from '@myxdc/hooks/swap/useQuote'
import { useSwapConfig } from '@myxdc/hooks/swap/useSwapConfig'
import { useUserLiquidity } from '@myxdc/hooks/swap/useUserLiquidity'
import { useTokensWithBalances } from '@myxdc/hooks/tokens/useTokensWithBalances'
import { useAccount } from '@myxdc/hooks/wallet/useAccount'
import { LiquidityWidgetAdd } from '@myxdc/ui'
import { LiquidityWidgetAddProps } from '@myxdc/ui/liquiditywidget/LiquidityAdd'
import { toHumanReadable } from '@myxdc/utils/numbers/price'
import { fromWei, toChecksumAddress, toWei } from '@myxdc/utils/web3'
import { useMemo, useState } from 'react'

import LiquidityConfirmAdd from './AddConfirm'

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
  const { error } = useUserLiquidity(activeAccount?.address, inputA?.token, inputB?.token)
  const { config: swapConfig } = useSwapConfig()

  if (!activeAccount) return null

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
      if (!tokenA?.balance) return
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
      if (!tokenB?.balance) return
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
  const isNewPair = error?.message === 'PAIR_NOT_FOUND'

  let inputBNum
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
          buttonText: isNewPair ? 'Create Pair' : 'Add liquidity',
          buttonVariant: quotedB || isNewPair ? 'default' : 'disabled',
          allowInputB: isNewPair,
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
