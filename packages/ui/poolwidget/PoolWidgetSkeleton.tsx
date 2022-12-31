'use client'
import { Skeleton } from '../animated'

export const PoolWidgetSkeleton = () => {
  return (
    <div className="relative flex flex-col items-center max-w-md px-6 py-6 mx-auto bg-white shadow-lg rounded-3xl">
      <Skeleton borderRadius={100} width={240} height={28} className="mx-auto" />
      <div className="flex items-center mt-6">
        <Skeleton borderRadius={100} width={145} height={44} />
        <Skeleton borderRadius={100} width={32} height={32} className="mx-4" />
        <Skeleton borderRadius={100} width={145} height={44} />
      </div>
    </div>
  )
}
