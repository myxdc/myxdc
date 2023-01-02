'use client'
import { TokenType } from '../tokenselector'
import { Typography } from '../typography'
import { LiquidityBox } from './LiquidityBox'
import { PoolSelector } from './PoolSelector'

export interface PoolWidgetProps {
  tokens?: TokenType[]
  token1?: TokenType
  token2?: TokenType
  onToken1Change?: (token?: TokenType) => void
  onToken2Change?: (token?: TokenType) => void
  liquidity?: {
    totalPoolTokens?: string
    poolShare?: string
    pooledToken1?: string
    pooledToken2?: string
  }
  addLiquidityButton?: React.ReactNode
  removeLiquidityButton?: React.ReactNode
  onAddToWatchlist?: () => void
  onRemoveFromWatchlist?: () => void
  createPairButton?: React.ReactNode
  error?: string
}

export const PoolWidget = ({
  tokens,
  token1,
  token2,
  onToken1Change,
  onToken2Change,
  liquidity,
  addLiquidityButton,
  removeLiquidityButton,
  onAddToWatchlist,
  onRemoveFromWatchlist,
  createPairButton,
  error,
}: PoolWidgetProps) => {
  return (
    <div className="relative max-w-md px-4 py-6 mx-auto bg-white shadow-lg sm:px-6 rounded-3xl">
      <Typography variant="h5" weight={600} className="text-center text-gray-800">
        Select a pair to view liquidity
      </Typography>
      <PoolSelector
        tokens={tokens}
        token1={token1}
        token2={token2}
        onToken1Change={onToken1Change}
        onToken2Change={onToken2Change}
      />
      <div
        className={
          'max-h-0 overflow-hidden transition-all duration-300 ease-in-out ' +
          (token1 && token2 ? 'max-h-[30rem]' : 'max-h-0')
        }
      >
        <LiquidityBox
          totalPoolTokens={liquidity?.totalPoolTokens}
          poolShare={liquidity?.poolShare}
          pooledToken1={liquidity?.pooledToken1}
          pooledToken2={liquidity?.pooledToken2}
          symbol1={token1?.symbol}
          symbol2={token2?.symbol}
          addLiquidityButton={addLiquidityButton}
          removeLiquidityButton={removeLiquidityButton}
          onAddToWatchlist={onAddToWatchlist}
          onRemoveFromWatchlist={onRemoveFromWatchlist}
          createPairButton={createPairButton}
        />
        {error && (
          <Typography variant="tiny" weight={500} className="mt-4 text-center text-red-500">
            {error}
          </Typography>
        )}
      </div>
    </div>
  )
}
