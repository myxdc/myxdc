'use client'
import { useState } from 'react'

import { Skeleton } from '../animated'
import { IconButton } from '../iconbutton'
import { CloseIcon } from '../icons'
import { RoundedTabs } from '../tabs'
import { Typography } from '../typography'

export interface TransactionSettingsProps {
  slippage?: number
  deadline?: number
  setSlippage?: (slippage: number) => void
  setDeadline?: (deadline: number) => void
  onClose?: () => void
}

export const TransactionSettings = ({
  slippage,
  deadline,
  setSlippage,
  setDeadline,
  onClose,
}: TransactionSettingsProps) => {
  const [slipageTab, setSlipageTab] = useState(0)

  return (
    <div className="absolute z-10 top-0 bottom-0 left-0 right-0 p-4 bg-white shadow-lg rounded-3xl min-h-[20rem] px-6 py-4">
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
          {slippage || slippage === 0 ? `${slippage}%` : <Skeleton width={40} borderRadius={100} />}
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
          value={slippage}
          onChange={(e) => {
            setSlippage && setSlippage(Number(e.target.value))
          }}
          className="w-full mt-4 bg-red-600 "
        />
      )}

      <Typography variant="base" weight={400} className="mt-8 text-gray-500">
        Transaction Deadline
      </Typography>
      <div className="flex items-center gap-2 mt-4">
        {deadline || deadline === 0 ? (
          <input
            type="number"
            min="1"
            max="4320"
            value={deadline}
            onChange={(e) => {
              setDeadline && setDeadline(Number(e.target.value))
            }}
            className="w-32 p-2 bg-primary-100 border-primary-200 rounded-2xl"
            placeholder="30"
          />
        ) : (
          <Skeleton width={40} borderRadius={100} />
        )}

        <Typography variant="tiny" weight={400} className="text-gray-500">
          Minutes
        </Typography>
      </div>
    </div>
  )
}
