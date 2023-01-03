import { Skeleton } from '../animated'
import { RefreshIcon } from '../icons'

export interface FormButtonProps {
  variant?: 'default' | 'loading' | 'error' | 'disabled'
  onClick?: () => void
  children?: React.ReactNode
  className?: string
}

export const FormButton = ({ variant = 'disabled', onClick, children, className }: FormButtonProps) => {
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
    <div className={'mt-4 ' + className}>
      {variant ? (
        <button
          className={`relative z-10 flex items-center justify-center w-full gap-2 py-3 text-xl font-semibold transition-all shadow-xl rounded-2xl ${classes}`}
          onClick={onClick}
        >
          {variant === 'loading' && <RefreshIcon className="w-5 h-5 mr-3 -ml-1 animate-spin" />}
          {children}
        </button>
      ) : (
        <Skeleton className="w-full h-12 rounded-2xl" />
      )}
    </div>
  )
}
