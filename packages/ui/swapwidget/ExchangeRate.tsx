'use client'
import { useState } from 'react'

import { Skeleton } from '../animated'
import { IconButton } from '../iconbutton'
import { ChevronDownIcon, InfoIcon } from '../icons'
import { Typography } from '../typography'

export interface ExchangeRateProps {
  rate1?: string
  rate2?: string
  usdRate1?: string
  usdRate2?: string
  priceImpact?: number
  minReceived?: string
  liquidityFee?: string
}

export const ExchangeRate = ({ rate1, rate2, priceImpact, minReceived, liquidityFee }: ExchangeRateProps) => {
  const [open, setOpen] = useState(false)
  const [shownRate, setShownRate] = useState(1)

  return (
    <div className="mt-4">
      <div className="bg-gray-100 border border-gray-100 cursor-pointer rounded-xl" onClick={() => setOpen(!open)}>
        <div className="flex items-center gap-2 px-3 py-2">
          <InfoIcon className="w-5 h-5" />
          <Typography
            variant="tiny"
            weight={500}
            onClick={(e: any) => {
              e.stopPropagation()
              setShownRate(shownRate === 1 ? 2 : 1)
            }}
          >
            {shownRate === 1 && (rate1 || <Skeleton width={160} height={16} borderRadius={100} />)}
            {shownRate === 2 && (rate2 || <Skeleton width={160} height={16} borderRadius={100} />)}
          </Typography>
          {/* <Typography variant="tiny" className="text-gray-400" weight={500}>
            {shownRate === 1 && (usdRate1 ? `(${usdRate1})` : <Skeleton width={40} height={16} borderRadius={100} />)}
            {shownRate === 2 && (usdRate2 ? `(${usdRate2})` : <Skeleton width={40} height={16} borderRadius={100} />)}
          </Typography> */}
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
          <Typography
            variant="tiny"
            className={`py-2 ${
              priceImpact &&
              (priceImpact >= 5
                ? 'text-red-500'
                : priceImpact >= 3
                ? 'text-yellow-500'
                : priceImpact >= 1
                ? 'text-gray-600'
                : 'text-green-500')
            }`}
            weight={500}
          >
            {priceImpact ? (
              '-' + priceImpact + '%'
            ) : priceImpact === 0 ? (
              '0%'
            ) : (
              <Skeleton width={80} height={16} borderRadius={100} />
            )}
          </Typography>
        </div>
        <div className="flex items-center justify-between">
          <Typography variant="tiny" className="py-2 text-gray-400" weight={400}>
            Minimum Received
          </Typography>
          <Typography variant="tiny" className="py-2 text-gray-600" weight={500}>
            {minReceived || <Skeleton width={110} height={16} borderRadius={100} />}
          </Typography>
        </div>
        <div className="flex items-center justify-between">
          <Typography variant="tiny" className="py-2 text-gray-400" weight={400}>
            Liquidity Fee
          </Typography>
          <Typography variant="tiny" className="py-2 text-gray-600" weight={500}>
            {liquidityFee || <Skeleton width={70} height={16} borderRadius={100} />}
          </Typography>
        </div>
      </div>
    </div>
  )
}
