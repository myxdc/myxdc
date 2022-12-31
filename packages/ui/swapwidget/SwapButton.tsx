import { RefreshIcon, SwapIcon } from '../icons'

export interface SwapButtonProps {
  onClick?: () => void
  showLoading?: boolean
}

export const SwapButton = ({ onClick, showLoading = false }: SwapButtonProps) => {
  return (
    <div className="relative w-full">
      <div className="absolute left-0 right-0 flex justify-center bg-gray-100 h-[3.22rem]">
        <div className="flex-1 h-full bg-white rounded-r-full"></div>
        <button
          className={'relative h-full px-4 ' + (!showLoading && onClick ? 'cursor-pointer' : '')}
          disabled={showLoading}
        >
          {showLoading ? (
            <RefreshIcon className="w-6 h-6 text-gray-600 animate-spin" />
          ) : (
            <SwapIcon className="rotate-90 text-primary-600" />
          )}
        </button>
        <div className="flex-1 h-full bg-white rounded-l-full"></div>
      </div>
    </div>
  )
}
