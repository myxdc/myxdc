import { SwapButton } from '../button'
import { CurrencyInput } from '../currencyinput'
import { TokenType } from '../tokenselector'
import { Typography } from '../typography'
import { MiddleButton } from './MiddleButton'
import { PricePoolShare } from './PricePoolShare'

export interface LiquidityWidgetAddProps {
  tokens?: TokenType[]
  inputAState?: {
    token?: TokenType
    amount?: string
  }
  inputBState?: {
    token?: TokenType
    amount?: string
  }
  inputAHandlers?: {
    currencySelect?: (token: TokenType) => void
    amountChange?: (amount: string) => void
    maxBalance?: () => void
  }
  inputBHandlers?: {
    currencySelect?: (token: TokenType) => void
    amountChange?: (amount: string) => void
    maxBalance?: () => void
  }
  uiConfig?: {
    buttonText?: string
    buttonVariant?: 'default' | 'loading' | 'error' | 'disabled'
    allowInputB?: boolean
  }
  prices?: {
    BperA?: string
    AperB?: string
    poolShare?: string
  }
  handleSubmit?: () => void
}

export const LiquidityWidgetAdd = ({
  tokens,
  inputAState,
  inputBState,
  inputAHandlers,
  inputBHandlers,
  uiConfig = {
    buttonText: 'Add Liquidity',
    buttonVariant: 'disabled',
    allowInputB: false,
  },
  prices,
  handleSubmit,
}: LiquidityWidgetAddProps) => {
  return (
    <div className="relative max-w-md mx-auto bg-white shadow-lg rounded-3xl min-h-[20rem] px-6 py-4">
      <Typography variant="h4" className="text-center text-gray-800" weight={500}>
        Add Liquidity
      </Typography>
      <CurrencyInput
        label="Token A"
        tokens={tokens}
        selectedToken={inputAState?.token}
        amount={inputAState?.amount}
        onCurrencySelect={inputAHandlers?.currencySelect}
        setAmount={inputAHandlers?.amountChange}
        onMax={inputAHandlers?.maxBalance}
      />
      <MiddleButton showLoading={uiConfig?.buttonVariant === 'loading'} variant="add" />
      <CurrencyInput
        className="-mt-7"
        label="Token B"
        tokens={tokens}
        selectedToken={inputBState?.token}
        amount={inputBState?.amount}
        onCurrencySelect={inputBHandlers?.currencySelect}
        setAmount={inputBHandlers?.amountChange}
        onMax={inputBHandlers?.maxBalance}
        disabled={!uiConfig?.allowInputB}
      />
      <div
        className={`max-h-0 transition-all duration-300 ease-in-out overflow-hidden ${
          prices?.AperB && prices?.BperA ? 'max-h-[20rem]' : 'max-h-0'
        }`}
      >
        <PricePoolShare
          price1={prices?.AperB}
          label1={inputAState && inputBState && `${inputAState?.token?.symbol} per ${inputBState?.token?.symbol}`}
          price2={prices?.BperA}
          label2={inputBState && inputAState && `${inputBState?.token?.symbol} per ${inputAState?.token?.symbol}`}
        />
      </div>
      <SwapButton variant={uiConfig?.buttonVariant} onClick={handleSubmit}>
        {uiConfig?.buttonText}
      </SwapButton>
    </div>
  )
}
