import { SwapButton } from '../button'
import { PercentInput } from '../percentInput'
import { TokenType } from '../tokenselector'
import { Typography } from '../typography'
import { MiddleButton } from './MiddleButton'
import { PricePoolShare } from './PricePoolShare'
import { ReceiveAmounts } from './ReceiveAmounts'

export interface LiquidityWidgetRemoveProps {
  buttonText?: string
  buttonVariant?: 'default' | 'loading' | 'error' | 'disabled'
  outputA?: {
    token?: TokenType
    amount?: string
    balance?: string
    usd?: string
  }
  outputB?: {
    token?: TokenType
    amount?: string
    balance?: string
    usd?: string
  }
  priceAperB?: string
  priceBperA?: string
  poolShare?: string
  percent?: string
  setPercent?: (percent: string) => void
  handleButtonClick?: () => void
}

export const LiquidityWidgetRemove = ({
  buttonText = 'Remove Liquidity',
  buttonVariant = 'disabled',
  outputA,
  outputB,
  priceAperB,
  priceBperA,
  poolShare,
  percent,
  setPercent,
  handleButtonClick,
}: LiquidityWidgetRemoveProps) => {
  return (
    <div className="relative max-w-md mx-auto bg-white shadow-lg rounded-3xl min-h-[20rem] px-6 py-4">
      <Typography variant="h4" className="text-center text-gray-800" weight={500}>
        Remove Liquidity
      </Typography>
      <PercentInput label="Remove amount" value={percent} onChange={setPercent} />
      <MiddleButton variant="remove" />
      <ReceiveAmounts
        amount1={outputA?.amount}
        amount2={outputB?.amount}
        symbol1={outputA?.token?.symbol}
        symbol2={outputB?.token?.symbol}
      />
      <PricePoolShare
        price1={priceAperB}
        label1={outputA && `${outputA?.token?.symbol} per ${outputB?.token?.symbol}`}
        price2={priceBperA}
        label2={outputB && `${outputB?.token?.symbol} per ${outputA?.token?.symbol}`}
        poolShare={poolShare}
        label3="New pool share"
      />
      <SwapButton variant={buttonVariant} onClick={handleButtonClick}>
        {buttonText}
      </SwapButton>
    </div>
  )
}
