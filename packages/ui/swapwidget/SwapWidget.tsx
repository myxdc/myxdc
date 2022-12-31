'use client'

import { useState } from 'react'

import { SwapButton } from '../button'
import { CurrencyInput } from '../currencyinput'
import { TokenType } from '../tokenselector'
import { ExchangeRate } from './ExchangeRate'
import { MiddleButton } from './MiddleButton'
import { SwapHeader } from './SwapHeader'
import { TransactionSettings } from './TransactionSettings'

export interface SwapWidgetProps {
  showBetaBadge?: boolean
  buttonText?: string
  buttonVariant?: 'default' | 'loading' | 'error' | 'disabled'
  tokens?: TokenType[]
  input?: {
    token?: TokenType
    amount?: string
    balance?: string
    usd?: string
  }
  output?: {
    token?: TokenType
    amount?: string
    balance?: string
    usd?: string
  }
  minReceived?: string
  slippage?: number
  networkFee?: string
  priceImpact?: string
  rate1?: string
  rate2?: string
  usdRate1?: string
  usdRate2?: string
  deadline?: number
  setDeadline?: (deadline: number) => void
  setSlippage?: (slippage: number | 'auto') => void
  handleInputCurrencySelect?: (token: TokenType) => void
  handleInputAmountChange?: (amount: string) => void
  handleInputMax?: () => void
  handleOutputCurrencySelect?: (token: TokenType) => void
  handleOutputAmountChange?: (amount: string) => void
  handleOutputMax?: () => void
  handleButtonClick?: () => void
}

export const SwapWidget = ({
  showBetaBadge = true,
  buttonText = 'Swap',
  buttonVariant = 'disabled',
  input,
  output,
  minReceived,
  slippage,
  networkFee,
  priceImpact,
  rate1,
  rate2,
  usdRate1,
  usdRate2,
  deadline,
  setDeadline,
  setSlippage,
  handleInputCurrencySelect,
  handleInputAmountChange,
  handleInputMax,
  handleOutputCurrencySelect,
  handleOutputAmountChange,
  handleOutputMax,
  handleButtonClick,
  tokens,
}: SwapWidgetProps) => {
  const [openSettings, setOpenSettings] = useState(false)

  return (
    <div className="relative max-w-md mx-auto bg-white shadow-lg rounded-3xl min-h-[20rem] px-6 py-4">
      <SwapHeader showBeta={showBetaBadge} onSettings={() => setOpenSettings(true)} />
      <CurrencyInput
        label="You send"
        tokens={tokens}
        selectedToken={input?.token}
        amount={input?.amount}
        balance={input?.balance}
        usd={input?.usd}
        onCurrencySelect={handleInputCurrencySelect}
        setAmount={handleInputAmountChange}
        onMax={handleInputMax}
      />
      <MiddleButton showLoading={buttonVariant === 'loading'} />
      <CurrencyInput
        className="-mt-7"
        label="You receive (est.)"
        tokens={tokens}
        selectedToken={output?.token}
        amount={output?.amount}
        balance={output?.balance}
        usd={output?.usd}
        onCurrencySelect={handleOutputCurrencySelect}
        setAmount={handleOutputAmountChange}
        onMax={handleOutputMax}
        disabled={!handleOutputAmountChange}
      />
      <ExchangeRate
        minReceived={minReceived}
        networkFee={networkFee}
        priceImpact={priceImpact}
        rate1={rate1}
        rate2={rate2}
        usdRate1={usdRate1}
        usdRate2={usdRate2}
      />
      <SwapButton variant={buttonVariant} onClick={handleButtonClick}>
        {buttonText}
      </SwapButton>
      {openSettings && (
        <TransactionSettings
          deadline={deadline}
          slippage={slippage}
          setDeadline={setDeadline}
          setSlippage={setSlippage}
          onClose={() => setOpenSettings(false)}
        />
      )}
    </div>
  )
}
