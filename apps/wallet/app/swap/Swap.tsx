'use client'

import { CloseIcon, IconButton, InfoIcon, RoundedTabs, SwapIcon, Typography } from '@myxdc/ui'
import { ChevronDownIcon } from '@myxdc/ui/icons/chevrondown'
import SettingsIcon from '@myxdc/ui/icons/settings'
import { useState } from 'react'

export default function Swap() {
  const [openSettings, setOpenSettings] = useState(false)
  return (
    <div className="relative max-w-md mx-auto bg-white shadow-lg rounded-3xl min-h-[20rem] px-6 py-4">
      <SwapHeader onSettings={() => setOpenSettings(true)} />
      <CurrencyInput />
      <SwapButton />
      <CurrencyInput />
      <ExchangeRate />
      <ExchangeButton />
      {openSettings && <TransactionSettings onClose={() => setOpenSettings(false)} />}
    </div>
  )
}

const SwapHeader = ({ onSettings }: { onSettings: () => void }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="text-2xl font-bold text-gray-800">Swap</div>
        <div className="ml-2 text-sm font-medium text-gray-500">beta</div>
      </div>
      <IconButton variant={2} onClick={onSettings}>
        <SettingsIcon />
      </IconButton>
    </div>
  )
}

const CurrencyInput = () => {
  return (
    <div className="mt-6">
      <Typography variant="tiny" className="relative block pl-2 text-gray-500 w-fit h-7" weight={600}>
        You pay (Estimated)
      </Typography>
      <div className="flex pl-4 py-4 rounded-[2rem] pr-2 bg-gray-100 ">
        <div className="flex flex-col justify-center flex-1 gap-1">
          <input
            className="w-full min-w-0 text-3xl font-medium text-gray-700 bg-transparent outline-none "
            placeholder="0.00"
          />
          <Typography className="mr-2 text-gray-400" weight={500} variant="tiny">
            ≈ $4,033.55
          </Typography>
        </div>
        <div className="flex flex-col items-end gap-3 ml-2">
          <button
            className="flex items-center justify-end min-w-32 gap-4 px-3 py-1.5 text-sm bg-primary-600 rounded-full shadow-lg
            bg-gradient-to-r from-primary-600 to-primary-500
          "
          >
            <ChevronDownIcon className="w-5 h-5 text-white" />
            <Typography className="py-1.5 text-white" weight={700} variant="tiny">
              Select token
            </Typography>
            {/* <Currency className="w-8 h-8 bg-white rounded-full" /> */}
          </button>
          <Typography className="mr-2 text-gray-500" weight={500} variant="tiny">
            Balance: 430.00
          </Typography>
        </div>
      </div>
    </div>
  )
}

const SwapButton = () => {
  return (
    <div className="relative w-full">
      <div className="absolute left-0 right-0 flex justify-center bg-gray-100 h-[3.22rem]">
        <div className="flex-1 h-full bg-white rounded-r-full"></div>
        <button className="relative h-full px-3">
          <SwapIcon className="rotate-90 text-primary-600" />
        </button>
        <div className="flex-1 h-full bg-white rounded-l-full"></div>
      </div>
    </div>
  )
}

const ExchangeRate = () => {
  const [open, setOpen] = useState(false)
  return (
    <div className="mt-4">
      <div className="bg-gray-100 border border-gray-100 cursor-pointer rounded-xl" onClick={() => setOpen(!open)}>
        <div className="flex items-center gap-2 px-3 py-2">
          <InfoIcon className="w-5 h-5" />
          <Typography variant="tiny" weight={500}>
            1 SUSHI = 0.0000784455 ETH
          </Typography>
          <Typography variant="tiny" className="text-gray-400" weight={500}>
            ($0.95)
          </Typography>
          <IconButton className={'ml-auto transition-transform' + (open ? ' rotate-180' : '')} size={1}>
            <ChevronDownIcon className="text-gray-400" />
          </IconButton>
        </div>
      </div>
      <div
        className={`px-4 mt-2 overflow-hidden transition-all border border-gray-200 rounded-xl ${
          open ? 'max-h-[10rem]' : 'max-h-0 border-none'
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-200">
          <Typography variant="tiny" className="py-2 text-gray-400" weight={400}>
            Price Impact
          </Typography>
          <Typography variant="tiny" className="py-2 text-gray-600" weight={500}>
            -2.81%
          </Typography>
        </div>
        <div className="flex items-center justify-between">
          <Typography variant="tiny" className="py-2 text-gray-400" weight={400}>
            Minimum Received
          </Typography>
          <Typography variant="tiny" className="py-2 text-gray-600" weight={500}>
            0.0000784455 ETH
          </Typography>
        </div>
        <div className="flex items-center justify-between">
          <Typography variant="tiny" className="py-2 text-gray-400" weight={400}>
            Network Fee
          </Typography>
          <Typography variant="tiny" className="py-2 text-gray-600" weight={500}>
            ~$9.78
          </Typography>
        </div>
      </div>
    </div>
  )
}

const ExchangeButton = () => {
  return (
    <div className="mt-4">
      <button className="flex items-center justify-center w-full gap-2 py-3 text-xl font-semibold text-white transition-all shadow-xl rounded-2xl bg-primary-600 bg-gradient-to-r from-primary-600 to-primary-500 hover:opacity-95 ">
        <SwapIcon className="rotate-90 w-7 h-7" />
        <span>Swap</span>
      </button>
    </div>
  )
}

const TransactionSettings = ({ onClose }: { onClose: () => void }) => {
  const [slipageTab, setSlipageTab] = useState(0)
  const [customSlipage, setCustomSlipage] = useState('0.5')
  const [customDeadline, setCustomDeadline] = useState('30')

  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 p-4 bg-white shadow-lg rounded-3xl min-h-[20rem] px-6 py-4">
      <div className="flex items-center justify-between pb-4 border-b">
        <Typography variant="h5" weight={600}>
          Transaction Settings
        </Typography>
        <IconButton className="ml-auto" variant={1} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
      <div className="flex items-center justify-between pb-2 mt-4">
        <Typography variant="base" weight={400} className="text-gray-500">
          Slippage Tolerance
        </Typography>
        <Typography variant="tiny" weight={600}>
          {customSlipage}%
        </Typography>
      </div>
      <RoundedTabs
        size={1}
        tabs={[
          {
            label: 'Auto',
            onClick: () => setSlipageTab(0),
            active: slipageTab === 0,
          },
          {
            label: 'Custom',
            onClick: () => setSlipageTab(1),
            active: slipageTab === 1,
          },
        ]}
        linkComponent={'button'}
        className="mt-2 border border-primary-100"
      />
      {slipageTab === 1 && (
        <input
          type="range"
          min="0"
          max="100"
          value={customSlipage}
          onChange={(e) => setCustomSlipage(e.target.value)}
          className="w-full mt-4 bg-red-600 "
        />
      )}

      <Typography variant="base" weight={400} className="mt-8 text-gray-500">
        Transaction Deadline
      </Typography>
      <div className="flex items-center gap-2 mt-4">
        <input
          type="number"
          min="1"
          max="4320"
          value={customDeadline}
          onChange={(e) => setCustomDeadline(e.target.value)}
          className="w-32 p-2 bg-primary-100 border-primary-200 rounded-2xl"
          placeholder="30"
        />
        <Typography variant="tiny" weight={400} className="text-gray-500">
          Minutes
        </Typography>
      </div>
    </div>
  )
}
