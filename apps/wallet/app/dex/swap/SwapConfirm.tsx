'use client'
import { useSwapRouter, useXRC20 } from '@myxdc/hooks/contracts/useContract'
import { useConfig } from '@myxdc/hooks/custom/useConfig'
import { useSwapConfig } from '@myxdc/hooks/swap/useSwapConfig'
import { useTokensWithBalances } from '@myxdc/hooks/tokens/useTokensWithBalances'
import { txObj } from '@myxdc/hooks/wallet/types'
import { useAccount } from '@myxdc/hooks/wallet/useAccount'
import { useSigner } from '@myxdc/hooks/wallet/useSigner'
import {
  CloseIcon,
  Currency,
  CurrencySkeleton,
  ExchangeRate,
  FormButton,
  IconButton,
  MiddleButton,
  Skeleton,
  Spinner,
  Typography,
} from '@myxdc/ui'
import { toHumanReadable } from '@myxdc/utils/numbers/price'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

interface SwapConfirmProps {
  onClose: () => void

  inputState: {
    token: string
    symbol: string
    amount: string
    amountRaw: string
  }
  outputState: {
    token: string
    symbol: string
    amount: string
    amountRaw: string
    min: string
    minRaw: string
  }
  exchangeRate: {
    minReceived: string
    liquidityFee: string
    priceImpact: number
    rate1: string
    rate2: string
  }
}

export default function SwapConfirm({ onClose, inputState, outputState, exchangeRate }: SwapConfirmProps) {
  const [loading, setLoading] = useState(false)
  const { config: swapConfig } = useSwapConfig()
  const { SWAP_ROUTER_ADDRESS, SWAP_WXDC_ADDRESS } = useConfig()
  const router = useSwapRouter()

  const token1 = useXRC20(inputState.token)
  const { activeAccount } = useAccount()
  const { signer } = useSigner({ type: activeAccount?.type })
  const { mutate } = useTokensWithBalances({
    address: activeAccount?.address,
  })

  const handleSwap = async () => {
    if (!activeAccount || !signer) return
    setLoading(true)

    // calculate Unix timestamp after which the transaction will revert.
    const deadlineUnix = Math.floor(Date.now() / 1000) + swapConfig.deadline * 60

    // approve token1 for router
    let txObj: txObj = {
      to: inputState.token,
      data: await token1?.methods.approve(SWAP_ROUTER_ADDRESS, inputState.amountRaw).encodeABI(),
    }
    await toast.promise(signer(txObj, activeAccount.address), {
      loading: 'Approving token: ' + inputState.symbol || inputState.token,
      success: 'Approved token: ' + inputState.symbol || inputState.token,
      error: (err: Error) => {
        setLoading(false)
        return err.message
      },
    })

    if (inputState.symbol.toLowerCase() === 'xdc') {
      // XDC -> Token
      txObj = {
        to: SWAP_ROUTER_ADDRESS,
        data: await router.methods
          .swapExactETHForTokens(
            outputState.minRaw,
            [SWAP_WXDC_ADDRESS, outputState.token],
            activeAccount.address,
            deadlineUnix
          )
          .encodeABI(),
        value: inputState.amountRaw,
      }
    } else if (outputState.symbol.toLowerCase() === 'xdc') {
      // Token -> XDC
      txObj = {
        to: SWAP_ROUTER_ADDRESS,
        data: await router.methods
          .swapExactTokensForETH(
            inputState.amountRaw,
            outputState.minRaw,
            [inputState.token, SWAP_WXDC_ADDRESS],
            activeAccount.address,
            deadlineUnix
          )
          .encodeABI(),
      }
    } else {
      // Token -> Token
      txObj = {
        to: SWAP_ROUTER_ADDRESS,
        data: await router.methods
          .swapExactTokensForTokens(
            inputState.amountRaw,
            outputState.minRaw,
            [inputState.token, outputState.token],
            activeAccount.address,
            deadlineUnix
          )
          .encodeABI(),
      }
    }
    await toast.promise(
      signer(txObj, activeAccount.address),
      {
        loading: 'Swapping tokens',
        success: 'Tokens swapped!',
        error: (err: Error) => {
          setLoading(false)
          return `Transaction reverted. We suggest you the following solutions:
          1. Make sure you have enough XDC to pay for gas.
          2. Refresh the page.
          2. Manually increase slippage tolerance.
          3. Change Uniswap deadline in Settings.         
          `
        },
      },
      {
        style: {
          width: '460px',
        },
        duration: 10000,
      }
    )

    setTimeout(() => {
      mutate()
    }, 3000)

    setLoading(false)
    onClose()
  }

  if (loading) {
    return (
      <div className="flex overflow-y-auto fixed inset-0 z-20 justify-center items-center bg-gray-800 bg-opacity-60 backdrop-filter backdrop-blur-sm transition-opacity">
        <div className="flex justify-center items-center px-4 py-4 w-full max-w-md bg-white rounded-3xl shadow-lg square">
          <Spinner text="Swapping" />
        </div>
      </div>
    )
  }

  return (
    <div
      className="flex overflow-y-auto fixed inset-0 z-20 justify-center items-center bg-gray-800 bg-opacity-60 backdrop-filter backdrop-blur-sm transition-opacity"
      onClick={(e) => {
        e.target === e.currentTarget && onClose()
      }}
      aria-labelledby="token-selector"
      role="dialog"
      aria-modal="true"
    >
      <div className="px-4 py-4 w-full max-w-md bg-white rounded-3xl shadow-lg">
        <div className="flex justify-between items-center">
          <Typography variant="h4" weight={600} as="h2">
            Confirm Swap
          </Typography>
          <IconButton type="button" className="text-gray-400 hover:text-gray-500" onClick={onClose}>
            <CloseIcon className="w-6 h-6" />
          </IconButton>
        </div>
        <ReceiveAmounts
          amount1={inputState.amount}
          amount2={outputState.amount}
          symbol1={inputState.symbol}
          symbol2={outputState.symbol}
        />
        <ExchangeRate {...exchangeRate} alwaysOpen={true} />
        {outputState.amount && (
          <Typography variant="tiny" className="mt-4 text-center text-red-600">
            You will receive at least{' '}
            <b>
              {toHumanReadable(outputState.amount, 4)} {outputState.symbol}
            </b>{' '}
            or the transaction will revert.
          </Typography>
        )}
        <FormButton onClick={handleSwap} variant="default">
          Confirm Swap
        </FormButton>
      </div>
    </div>
  )
}

const ReceiveAmounts = ({ amount1, amount2, symbol1, symbol2 }: any) => {
  return (
    <div className="mt-4">
      <div className="flex p-4 bg-gray-100 rounded-3xl">
        <div className="mr-auto">
          {amount1 ? (
            <Typography variant="h4" weight={600} className="mr-auto text-gray-800">
              {amount1}
            </Typography>
          ) : (
            <Skeleton width={80} height={26} borderRadius={100} />
          )}
        </div>
        {symbol1 ? <Currency currency={symbol1} /> : <CurrencySkeleton />}
        {symbol1 ? (
          <Typography variant="h5" weight={700} className="ml-2 text-gray-800">
            {symbol1}
          </Typography>
        ) : (
          <Skeleton width={60} height={26} className="ml-2" borderRadius={100} />
        )}
      </div>
      <MiddleButton variant="down" />
      <div className="flex p-4 bg-gray-100 rounded-3xl">
        <div className="mr-auto">
          {amount2 ? (
            <Typography variant="h4" weight={600} className="mr-auto text-gray-800">
              {amount2}
            </Typography>
          ) : (
            <Skeleton width={100} height={26} borderRadius={100} />
          )}
        </div>
        {symbol2 ? <Currency currency={symbol2} /> : <CurrencySkeleton />}
        {symbol2 ? (
          <Typography variant="h5" weight={700} className="ml-2 text-gray-800">
            {symbol2}
          </Typography>
        ) : (
          <Skeleton width={40} height={26} className="ml-2" borderRadius={100} />
        )}
      </div>
    </div>
  )
}
