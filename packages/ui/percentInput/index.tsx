'use client'
import 'rc-slider/assets/index.css'

import Slider from 'rc-slider'

import { Typography } from '../typography'

export interface PercentInputProps {
  label?: string
  value?: string
  onChange?: (value: string) => void
}

export const PercentInput = ({ label, value = '50', onChange }: PercentInputProps) => {
  return (
    <div className="p-4 mt-4 bg-gray-100 rounded-3xl">
      {label && (
        <Typography variant="tiny" className="text-gray-500" weight={600}>
          {label}
        </Typography>
      )}
      <Typography variant="h1" className="mt-4 text-gray-900" weight={600}>
        {value}%
      </Typography>
      <Slider
        defaultValue={parseInt(value)}
        value={parseInt(value)}
        onChange={(v) => {
          onChange && onChange(v.toString())
        }}
        className="mt-4"
      />

      <div className="flex justify-between mt-4">
        <button
          onClick={() => {
            onChange && onChange('25')
          }}
          className="px-4 py-2 text-sm transition rounded-full text-primary-700 bg-primary-200 hover:opacity-90"
        >
          25%
        </button>
        <button
          onClick={() => {
            onChange && onChange('50')
          }}
          className="px-4 py-2 text-sm transition rounded-full text-primary-700 bg-primary-200 hover:opacity-90"
        >
          50%
        </button>
        <button
          onClick={() => {
            onChange && onChange('75')
          }}
          className="px-4 py-2 text-sm transition rounded-full text-primary-700 bg-primary-200 hover:opacity-90"
        >
          75%
        </button>
        <button
          onClick={() => {
            onChange && onChange('100')
          }}
          className="px-4 py-2 text-sm transition rounded-full text-primary-700 bg-primary-200 hover:opacity-90"
        >
          100%
        </button>
      </div>
    </div>
  )
}
