'use client'
import { Skeleton } from '../animated'

export const SwapWidgetSkeleton = () => {
  return (
    <div className="relative max-w-md mx-auto bg-white shadow-lg rounded-3xl min-h-[20rem] px-6 py-4">
      <div className="flex justify-between">
        <Skeleton height={32} width={96} borderRadius={100} />
        <Skeleton height={40} width={40} borderRadius={14} />
      </div>
      <div className="mt-4">
        <Skeleton height={28} width={67} borderRadius={100} />
        <Skeleton height={112} width="100%" borderRadius={26} />
      </div>
      <div className="mt-6">
        <Skeleton height={28} width={67} borderRadius={100} />
        <Skeleton height={112} width="100%" borderRadius={26} />
      </div>
      <div className="mt-4">
        <Skeleton height={52} width="100%" borderRadius={26} />
      </div>
    </div>
  )
}
