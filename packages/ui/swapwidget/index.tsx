'use client'

import { useState } from 'react'

import { CurrencyInput } from './CurrencyInput'
import { ExchangeButton } from './ExchangeButton'
import { ExchangeRate } from './ExchangeRate'
import { SwapButton } from './SwapButton'
import { SwapHeader } from './SwapHeader'
import { TransactionSettings } from './TransactionSettings'

export default function SwapWidget() {
  const [openSettings, setOpenSettings] = useState(false)
  return (
    <div className="relative max-w-md mx-auto bg-white shadow-lg rounded-3xl min-h-[20rem] px-6 py-4">
      <SwapHeader onSettings={() => setOpenSettings(true)} />
      <CurrencyInput label="You send" />
      <SwapButton />
      <CurrencyInput label="You receive (Estimate)" />
      <ExchangeRate />
      <ExchangeButton>Swap</ExchangeButton>
      {openSettings && <TransactionSettings onClose={() => setOpenSettings(false)} />}
    </div>
  )
}
