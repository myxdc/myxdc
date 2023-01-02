'use client'
import { useQuote } from '@myxdc/hooks/swap/useQuote'
import { useSwapConfig } from '@myxdc/hooks/swap/useSwapConfig'
import { useUserLiquidity } from '@myxdc/hooks/swap/useUserLiquidity'
import { useTokens } from '@myxdc/hooks/useTokens'
import { useWallet } from '@myxdc/hooks/useWallet'
import { LiquidityWidgetAdd, TokenType } from '@myxdc/ui'
import { LiquidityWidgetAddProps } from '@myxdc/ui/liquiditywidget/LiquidityAdd'
import { toHumanReadable } from '@myxdc/utils/numbers/price'
import { fromWei, toChecksumAddress, toWei } from '@myxdc/utils/web3'
import { useState } from 'react'

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

  const { tokens } = useTokens()
  const [inputA, setInputA] = useState<LiquidityWidgetAddProps['inputAState']>({
    token: tokens?.find((t) => t.address.toLowerCase() === toChecksumAddress(params?.pair?.[0]).toLowerCase()),
    amount: '',
  })
  const [inputB, setInputB] = useState<LiquidityWidgetAddProps['inputBState']>({
    token: tokens?.find((t) => t.address.toLowerCase() === toChecksumAddress(params?.pair?.[1]).toLowerCase()),
    amount: '',
  })
  const [showConfirm, setShowConfirm] = useState(false)
  const { account } = useWallet()
  const quotedB = useQuote(
    inputA?.amount ? toWei(inputA?.amount, inputA?.token?.decimals || 18) : undefined,
    inputA?.token?.address,
    inputB?.token?.address
  )
  const [customQuoteB, setCustomQuoteB] = useState<string | undefined>(undefined)
  const { error } = useUserLiquidity(account.address, inputA?.token?.address, inputB?.token?.address)
  const { config: swapConfig } = useSwapConfig()

  /**
   * * Event handlers
   */
  const inputAHandlers = {
    amountChange: (amount: string) => {
      setInputA((input) => ({ ...input, amount }))
    },
    currencySelect: (token: TokenType) => {
      if (token.address === inputA?.token?.address) {
        return
      } else if (token.address === inputB?.token?.address) {
        helpers.switchTokensPlaces()
      } else {
        setInputA((input) => ({ ...input, token }))
      }
    },
    maxBalance: () => {
      if (!inputA?.token?.balance) return
      // set to max minus 0.01% of the balance to avoid errors
      const max = inputA?.token?.balance - inputA?.token?.balance * 0.0001
      setInputA((input) => ({ ...input, amount: max?.toString() || '' }))
    },
  }
  const inputBHandlers = {
    amountChange: (amount: string) => {
      setCustomQuoteB(amount)
    },
    currencySelect: (token: TokenType) => {
      if (token.address === inputB?.token?.address) {
        return
      } else if (token.address === inputA?.token?.address) {
        helpers.switchTokensPlaces()
      } else {
        setInputB((input) => ({ ...input, token }))
      }
    },
    maxBalance: () => {
      if (!inputB?.token?.balance) return
      // set to max minus 0.01% of the balance to avoid errors
      const max = inputB?.token?.balance - inputB?.token?.balance * 0.0001
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
    inputBNum = quotedB ? fromWei(quotedB, inputB?.token?.decimals || 18) : 0
  }

  const rateAtoB = quotedB || isNewPair ? inputA?.amount && parseFloat(inputA.amount) / inputBNum : '0'
  const rateBtoA = quotedB || isNewPair ? inputA?.amount && inputBNum / parseFloat(inputA.amount) : '0'

  const inputAMin = inputA?.amount && parseFloat(inputA.amount) * (1 - swapConfig?.slippage / 100)
  const inputBMin = inputBNum && inputBNum * (1 - swapConfig?.slippage / 100)

  const inputAMinRaw = inputAMin ? toWei(inputAMin.toString(), inputA?.token?.decimals || 18) : undefined
  const inputBMinRaw = inputBMin ? toWei(inputBMin.toString(), inputB?.token?.decimals || 18) : undefined

  return (
    <>
      <LiquidityWidgetAdd
        tokens={tokens}
        inputAState={inputA}
        inputBState={{
          token: inputB?.token,
          amount: isNewPair ? `${customQuoteB}` : quotedB ? `${inputBNum}` : quotedB,
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
          if (!account.address) return
          if (!inputA?.amount || !inputA.token?.address) return
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
            amountRaw: toWei(inputA!.amount!, inputA?.token?.decimals || 18),
            minRaw: inputAMinRaw || '0',
          }}
          inputBState={{
            token: inputB!.token!,
            amount: isNewPair ? customQuoteB! : inputBNum.toString(),
            amountRaw: isNewPair ? toWei(customQuoteB!, inputB?.token?.decimals || 18) : quotedB!,
            minRaw: inputBMinRaw || '0',
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
