import { Skeleton } from '../animated'

export const LiquidityWidgetRemoveSkeleton = () => {
  return (
    <div className="relative max-w-md mx-auto bg-white shadow-lg rounded-3xl min-h-[20rem] px-6 py-4">
      <div className="text-center">
        <Skeleton width={130} height={30} borderRadius={100} />
      </div>
      <div className="mt-4">
        <Skeleton height={200} width="100%" borderRadius={26} />
      </div>
      <div className="mt-4">
        <Skeleton height={120} width="100%" borderRadius={26} />
      </div>
      <div className="mt-4">
        <Skeleton height={52} width="100%" borderRadius={26} />
      </div>
    </div>
  )
}
