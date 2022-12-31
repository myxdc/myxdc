import { Skeleton } from '../animated'

export interface SwapButtonProps {
  variant?: 'default' | 'loading' | 'error' | 'disabled'
  onClick?: () => void
  children?: React.ReactNode
}

export const SwapButton = ({ variant = 'disabled', onClick, children }: SwapButtonProps) => {
  const classes =
    variant === 'default'
      ? 'bg-primary-600 bg-gradient-to-r from-primary-600 to-primary-500  hover:opacity-95 text-white '
      : variant === 'loading'
      ? 'bg-primary-200 text-primary-600 cursor-wait'
      : variant === 'error'
      ? 'bg-red-400 bg-gradient-to-r from-red-400 to-red-300 text-red-900 cursor-not-allowed'
      : variant === 'disabled'
      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
      : ''
  return (
    <div className="mt-4">
      {variant ? (
        <button
          className={`flex items-center justify-center w-full gap-2 py-3 text-xl font-semibold transition-all shadow-xl rounded-2xl ${classes}`}
          onClick={onClick}
        >
          {variant === 'loading' && (
            <svg
              className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25 text-primary-600"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                className="opacity-75 text-primary-500"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          {children}
        </button>
      ) : (
        <Skeleton className="w-full h-12 rounded-2xl" />
      )}
    </div>
  )
}
