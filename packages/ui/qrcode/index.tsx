// @ts-nocheck

import ReactQRCode from 'react-qr-code'

import { Skeleton } from '../animated'

interface QRCodeProps {
  value?: string
  size?: number
  className?: string
  props?: any
}

export const QRCode = ({ value, size = 256, className, props }: QRCodeProps) => {
  return (
    <div
      className={
        'flex flex-col gap-8 p-3 mx-auto bg-white border-2 border-gray-300 border-dashed rounded-xl ' + className
      }
    >
      {value ? (
        <ReactQRCode value={value} size={size} className="w-full h-full" {...props} />
      ) : (
        <Skeleton className="w-full h-full" width={size} height={size} />
      )}
    </div>
  )
}
