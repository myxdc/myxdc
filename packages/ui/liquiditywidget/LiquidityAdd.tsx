import { SwapButton } from '../button'
import { CurrencyInput } from '../currencyinput'
import { TokenType } from '../tokenselector'
import { Typography } from '../typography'
import { MiddleButton } from './MiddleButton'
import { PricePoolShare } from './PricePoolShare'

export interface LiquidityWidgetAddProps {
  buttonText?: string
  buttonVariant?: 'default' | 'loading' | 'error' | 'disabled'
  tokens?: TokenType[]
  inputA?: {
    token?: TokenType
    amount?: string
    balance?: string
    usd?: string
  }
  inputB?: {
    token?: TokenType
    amount?: string
    balance?: string
    usd?: string
  }
  priceBperA?: string
  priceAperB?: string
  poolShare?: string
  handleTokenACurrencySelect?: (token?: TokenType) => void
  handleTokenAAmountChange?: (amount: string) => void
  handleTokenAMax?: () => void
  handleTokenBCurrencySelect?: (token?: TokenType) => void
  handleTokenBAmountChange?: (amount: string) => void
  handleTokenBMax?: () => void
  handleButtonClick?: () => void
}

export const LiquidityWidgetAdd = ({
  buttonText = 'Add Liquidity',
  buttonVariant = 'disabled',
  tokens,
  inputA,
  inputB,
  priceBperA,
  priceAperB,
  poolShare,
  handleTokenACurrencySelect,
  handleTokenAAmountChange,
  handleTokenAMax,
  handleTokenBCurrencySelect,
  handleTokenBAmountChange,
  handleTokenBMax,
  handleButtonClick,
}: LiquidityWidgetAddProps) => {
  return (
    <div className="relative max-w-md mx-auto bg-white shadow-lg rounded-3xl min-h-[20rem] px-6 py-4">
      <Typography variant="h4" className="text-center text-gray-800" weight={500}>
        Add Liquidity
      </Typography>
      <CurrencyInput
        label="Token A"
        tokens={tokens}
        selectedToken={inputA?.token}
        amount={inputA?.amount}
        balance={inputA?.balance}
        usd={inputA?.usd}
        onCurrencySelect={handleTokenACurrencySelect}
        setAmount={handleTokenAAmountChange}
        onMax={handleTokenAMax}
      />
      <MiddleButton showLoading={buttonVariant === 'loading'} variant="add" />
      <CurrencyInput
        className="-mt-7"
        label="Token B"
        tokens={tokens}
        selectedToken={inputB?.token}
        amount={inputB?.amount}
        balance={inputB?.balance}
        usd={inputB?.usd}
        onCurrencySelect={handleTokenBCurrencySelect}
        setAmount={handleTokenBAmountChange}
        onMax={handleTokenBMax}
      />
      <PricePoolShare
        price1={priceAperB}
        label1={inputA && `${inputA?.token?.symbol} per ${inputB?.token?.symbol}`}
        price2={priceBperA}
        label2={inputB && `${inputB?.token?.symbol} per ${inputA?.token?.symbol}`}
        poolShare={poolShare}
      />
      <SwapButton variant={buttonVariant} onClick={handleButtonClick}>
        {buttonText}
      </SwapButton>
    </div>
  )
}
