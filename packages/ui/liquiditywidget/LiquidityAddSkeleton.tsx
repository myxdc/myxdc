import { Skeleton } from '../animated'

export const LiquidityWidgetAddSkeleton = () => {
  return (
    <div className="relative max-w-md mx-auto bg-white shadow-lg rounded-3xl min-h-[20rem] px-6 py-4">
      <div className="text-center">
        <Skeleton width={130} height={30} borderRadius={100} />
      </div>
      <div className="mt-4">
        <Skeleton height={28} width={67} borderRadius={100} />
        <Skeleton height={112} width="100%" borderRadius={26} />
      </div>
      <div className="mt-4">
        <Skeleton height={28} width={67} borderRadius={100} />
        <Skeleton height={112} width="100%" borderRadius={26} />
      </div>
      <div className="mt-4">
        <Skeleton height={52} width="100%" borderRadius={26} />
      </div>
    </div>
  )
}
