import { RefreshIcon, SwapIcon } from '../icons'

export interface MiddleButtonProps {
  onClick?: () => void
  showLoading?: boolean
}

export const MiddleButton = ({ onClick, showLoading = false }: MiddleButtonProps) => {
  return (
    <div className="relative w-full h-[44px]">
      <div className="absolute left-0 right-0 flex justify-center bg-gray-100 h-[44px]">
        <div className="flex-1 h-full bg-white rounded-r-full"></div>
        <button
          className={'relative h-full px-4 ' + (!showLoading && onClick ? 'cursor-pointer' : 'cursor-default')}
          disabled={showLoading}
          onClick={onClick}
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
