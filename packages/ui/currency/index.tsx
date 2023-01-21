'use client'

import Image from 'next/image'
import { useState } from 'react'

import { Skeleton } from '../animated'

interface CurrencyProps {
  currency?: string
  [key: string]: unknown
}

export const Currency = ({ currency, ...rest }: CurrencyProps) => {
  const [exists, setExists] = useState(true)
  const url = `/assets/img/tokens/${currency?.toUpperCase()}.png`

  if (!currency || currency?.toLowerCase() == 'xdc') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={26}
        height={26}
        xmlSpace="preserve"
        viewBox="0 0 337.963 337.958"
        {...rest}
      >
        <g>
          <path
            fill="#B7B5B1"
            d="M337.963 152.844C299.131-72.137 5.365-28.6.123 152.844c16.956 8.798 27.604 14.143 27.604 14.143S18.74 172.368 0 184.342c33.855 220.562 322.559 188.531 337.906-.254-18.355-11.253-28.363-17.191-28.363-17.191s8.584-4.089 28.42-14.053zm-144.541 78.554-27.555-47.372-28.049 47.372-21.157-1.45 39.854-67.188-35.92-58.004 21.652-1.935 25.584 43.021 25.59-41.086 20.174.483-33.459 57.039 36.9 68.638-23.614.482z"
          />
          <path
            fill="#244B81"
            d="M324.256 144.143c-52.643-199.915-293.91-145.83-310.436 0 33.476 18.836 41.072 23.263 41.072 23.263s-12.938 8.272-41.186 26.214c35.913 192.189 296.232 155.255 310.498-.234-26.271-16.467-41.77-26.063-41.77-26.063s35.423-19.799 41.822-23.18zm-130.838 87.512-27.553-47.361-28.043 47.361-21.154-1.45 39.848-67.176-35.912-57.992 21.646-1.935 25.582 43.012 25.586-41.078 20.17.483-33.457 57.025 36.898 68.625-23.611.486z"
          />
        </g>
      </svg>
    )
  } else if (exists && currency) {
    return (
      <Image
        src={url}
        alt={currency}
        width={26}
        height={26}
        className="rounded-full bg-primary-200"
        onError={(e) => {
          console.log(e)
          setExists(false)
        }}
        {...rest}
      />
    )
  } else {
    return (
      <svg width={26} height={26} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12ZM10.5 7.5V12a1.5 1.5 0 0 0 3 0V7.5a1.5 1.5 0 0 0-3 0ZM12 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
          fill="#758CA3"
        />
      </svg>
    )
  }
}

export const CurrencySkeleton = ({ ...rest }: { [key: string]: unknown }) => {
  return <Skeleton borderRadius={100} width={26} height={26} {...rest} />
}

export const CurrencyPair = ({
  currency1,
  currency2,
  ...rest
}: {
  currency1?: string
  currency2?: string
  [key: string]: unknown
}) => {
  return (
    <div className="flex items-center" {...rest}>
      <Currency currency={currency1} />
      <Currency currency={currency2} className="-ml-2" />
    </div>
  )
}

export const CurrencyPairSkeleton = ({ ...rest }: { [key: string]: unknown }) => {
  return (
    <div className="flex items-center" {...rest}>
      <CurrencySkeleton />
      <CurrencySkeleton className="-ml-2" />
    </div>
  )
}
