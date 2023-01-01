'use client'

import { useState } from 'react'

import { SwapButton } from '../button'
import { CurrencyInput } from '../currencyinput'
import { InfoIcon } from '../icons'
import { TokenType } from '../tokenselector'
import { Typography } from '../typography'
import { ExchangeRate } from './ExchangeRate'
import { MiddleButton } from './MiddleButton'
import { SwapHeader } from './SwapHeader'
import { TransactionSettings } from './TransactionSettings'

export interface SwapWidgetProps {
  tokens?: TokenType[]
  inputState?: {
    token?: TokenType
    amount?: string
  }
  inputHandlers?: {
    currencySelect?: (token: TokenType) => void
    amountChange?: (amount: string) => void
    maxBalance?: () => void
  }
  outputState?: {
    token?: TokenType
    amount?: string
  }
  outputHandlers?: {
    currencySelect?: (token: TokenType) => void
    amountChange?: (amount: string) => void
    maxBalance?: () => void
  }
  exchangeRate?: {
    minReceived?: string
    liquidityFee?: string
    priceImpact?: number
    rate1?: string
    rate2?: string
  }
  config?: {
    deadline?: number
    slippage?: number
  }
  configHandlers?: {
    setDeadline?: (deadline: number) => void
    setSlippage?: (slippage: number | 'auto') => void
  }
  uiConfig?: {
    showBetaBadge?: boolean
    buttonText?: string
    buttonVariant?: 'default' | 'loading' | 'error' | 'disabled'
    showTips?: boolean
  }
  handleSwitchPlaces?: () => void
  handleSubmit?: () => void
}

export const SwapWidget = ({
  tokens,
  inputState,
  outputState,
  inputHandlers,
  outputHandlers,
  exchangeRate,
  config,
  configHandlers,
  uiConfig = {
    showBetaBadge: true,
    buttonText: 'Swap',
    buttonVariant: 'disabled',
    showTips: true,
  },
  handleSwitchPlaces,
  handleSubmit,
}: SwapWidgetProps) => {
  const [openSettings, setOpenSettings] = useState(false)

  let tipConfig: any = {}
  if (exchangeRate?.priceImpact && exchangeRate?.priceImpact > 10) {
    tipConfig.tipVariant = 'danger'
    tipConfig.tipTitle = 'High price impact'
    tipConfig.tipDescription =
      'The price impact is too high and you will get a bad deal, try a smaller amount for a better price.'
  }

  return (
    <div className="relative max-w-md mx-auto bg-white shadow-lg rounded-3xl min-h-[20rem] px-6 py-4">
      <SwapHeader showBeta={uiConfig?.showBetaBadge} onSettings={() => setOpenSettings(true)} />
      <CurrencyInput
        label="You send"
        tokens={tokens}
        selectedToken={inputState?.token}
        amount={inputState?.amount}
        onCurrencySelect={inputHandlers?.currencySelect}
        setAmount={inputHandlers?.amountChange}
        onMax={inputHandlers?.maxBalance}
      />
      <MiddleButton onClick={handleSwitchPlaces} showLoading={uiConfig?.buttonVariant === 'loading'} />
      <CurrencyInput
        className="-mt-7"
        label="You receive (est.)"
        tokens={tokens}
        selectedToken={outputState?.token}
        amount={outputState?.amount}
        onCurrencySelect={outputHandlers?.currencySelect}
        setAmount={outputHandlers?.amountChange}
        onMax={outputHandlers?.maxBalance}
        disabled={!outputHandlers?.amountChange}
      />
      {
        <div
          className={`max-h-0 transition-all duration-300 ease-in-out overflow-hidden ${
            exchangeRate ? 'max-h-[20rem]' : 'max-h-0'
          }`}
        >
          <ExchangeRate {...exchangeRate} />
        </div>
      }
      <SwapButton variant={uiConfig?.buttonVariant} onClick={handleSubmit}>
        {uiConfig?.buttonText}
      </SwapButton>
      <SwapInfo
        variant={tipConfig.tipVariant}
        title={tipConfig.tipTitle}
        description={tipConfig.tipDescription}
        show={tipConfig.tipVariant}
      />
      {openSettings && <TransactionSettings {...config} {...configHandlers} onClose={() => setOpenSettings(false)} />}
    </div>
  )
}

const SwapInfo = ({
  variant,
  title,
  description,
  show,
}: {
  variant?: 'danger' | 'warning'
  title?: string
  description?: string
  show?: boolean
}) => {
  return (
    <div className={'transition-all overflow-hidden ' + (!show ? 'max-h-0' : 'max-h-[10rem]')}>
      <div
        className={`flex items-center justify-between px-4 py-3 mt-4 rounded-md transition overflow-hidden ${
          variant === 'danger' ? 'bg-red-50 text-red-700' : 'bg-yellow-50 text-yellow-700'
        }`}
      >
        <div>
          <InfoIcon className="mr-3 w-7 h-7" />
        </div>
        <div>
          <Typography variant="h6" weight={600}>
            {title}
          </Typography>
          <Typography variant="base" weight={500} className="mt-2 text-gray-600">
            {description}
          </Typography>
        </div>
      </div>{' '}
    </div>
  )
}
