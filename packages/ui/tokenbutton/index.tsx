import { Currency } from '../currency'
import { ChevronDownIcon } from '../icons'
import { TokenType } from '../tokenselector'
import { Typography } from '../typography'

interface TokenButtonProps {
  selectedToken?: TokenType
  onClick?: () => void
  className?: string
  [key: string]: any
}

export const TokenButton = ({ selectedToken, onClick, className, ...props }: TokenButtonProps) => {
  return (
    <button
      className={
        'flex items-center justify-end min-w-32 gap-4 px-3 py-1.5 text-sm bg-primary-600 rounded-full shadow-lg bg-gradient-to-r from-primary-600 to-primary-500 ' +
        className
      }
      onClick={() => onClick && onClick()}
      {...props}
    >
      <ChevronDownIcon className="w-5 h-5 text-white" />
      <Typography className="py-1.5 text-white" weight={700} variant="tiny">
        {selectedToken ? selectedToken.symbol : 'Select token'}
      </Typography>
      {selectedToken && <Currency className="w-8 h-8 bg-white rounded-full" currency={selectedToken.symbol} />}
    </button>
  )
}
