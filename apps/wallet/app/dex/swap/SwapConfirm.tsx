import { useSwapRouter, useXRC20 } from '@myxdc/hooks/contracts/useContract'
import { useWeb3 } from '@myxdc/hooks/contracts/useWeb3'
import { useConfig } from '@myxdc/hooks/custom/useConfig'
import { useSwapConfig } from '@myxdc/hooks/swap/useSwapConfig'
import { useWallet } from '@myxdc/hooks/useWallet'
import {
  CloseIcon,
  Currency,
  CurrencySkeleton,
  ExchangeRate,
  IconButton,
  MiddleButton,
  Skeleton,
  Spinner,
  SwapButton,
  TokenType,
  Typography,
} from '@myxdc/ui'
import { toHumanReadable } from '@myxdc/utils/numbers/price'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

interface SwapConfirmProps {
  onClose: () => void

  inputState: {
    token: TokenType
    amount: string
    amountRaw: string
  }
  outputState: {
    token: TokenType
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
  const web3 = useWeb3()
  const { account, signThenSend, updateAccountsBalances } = useWallet()
  const token1 = useXRC20(inputState.token.address)

  const handleSwap = async () => {
    setLoading(true)

    // calculate Unix timestamp after which the transaction will revert.
    const deadlineUnix = Math.floor(Date.now() / 1000) + swapConfig.deadline * 60

    toast.loading(`Swapping from ${inputState.token.symbol} to ${outputState.token.symbol}...`, {
      duration: 2000,
    })

    // approve token1 for router
    let nonce = await web3.eth.getTransactionCount(account.address)
    let txObj = {
      to: inputState.token.address,
      data: await token1?.methods.approve(SWAP_ROUTER_ADDRESS, inputState.amountRaw).encodeABI(),
      nonce: nonce,
      value: '0',
    }
    await toast.promise(signThenSend(txObj), {
      loading: 'Approving token: ' + inputState.token.symbol || inputState.token.address,
      success: 'Approved token: ' + inputState.token.symbol || inputState.token.address,
      error: (err: Error) => {
        setLoading(false)
        return err.message
      },
    })

    nonce++
    if (inputState.token.symbol.toLowerCase() === 'xdc') {
      // XDC -> Token
      txObj = {
        to: SWAP_ROUTER_ADDRESS,
        data: await router.methods
          .swapExactETHForTokens(
            outputState.minRaw,
            [SWAP_WXDC_ADDRESS, outputState.token.address],
            account.address,
            deadlineUnix
          )
          .encodeABI(),
        nonce: nonce,
        value: inputState.amountRaw,
      }
    } else if (outputState.token.symbol.toLowerCase() === 'xdc') {
      // Token -> XDC
      txObj = {
        to: SWAP_ROUTER_ADDRESS,
        data: await router.methods
          .swapExactTokensForETH(
            inputState.amountRaw,
            outputState.minRaw,
            [inputState.token.address, SWAP_WXDC_ADDRESS],
            account.address,
            deadlineUnix
          )
          .encodeABI(),
        nonce: nonce,
        value: '0',
      }
    } else {
      // Token -> Token
      txObj = {
        to: SWAP_ROUTER_ADDRESS,
        data: await router.methods
          .swapExactTokensForTokens(
            inputState.amountRaw,
            outputState.minRaw,
            [inputState.token.address, outputState.token.address],
            account.address,
            deadlineUnix
          )
          .encodeABI(),
        nonce: nonce,
        value: '0',
      }
    }
    await toast.promise(
      signThenSend({ ...txObj, gasLimit: '200000' }),
      {
        loading: 'Swapping tokens',
        success: 'Tokens swapped',
        error: (err: Error) => {
          setLoading(false)
          return `Error swapping tokens: ${err.message}`
        },
      },
      {
        style: {
          minWidth: '460px',
        },
        duration: 10000,
      }
    )

    setTimeout(() => {
      toast.promise(updateAccountsBalances(), {
        loading: 'Updating balances',
        success: 'Balances updated',
        error: (err: Error) => {
          return `Error updating balances: ${err.message}`
        },
      })
    }, 2000)

    setLoading(false)
    onClose()
  }

  if (loading) {
    return (
      <div className="fixed inset-0 z-20 flex items-center justify-center overflow-y-auto transition-opacity bg-gray-800 bg-opacity-60 backdrop-filter backdrop-blur-sm">
        <div className="flex items-center justify-center w-full max-w-md px-4 py-4 bg-white shadow-lg rounded-3xl square">
          <Spinner text="Swapping" />
        </div>
      </div>
    )
  }

  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center overflow-y-auto transition-opacity bg-gray-800 bg-opacity-60 backdrop-filter backdrop-blur-sm"
      onClick={(e) => {
        e.target === e.currentTarget && onClose()
      }}
      aria-labelledby="token-selector"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-md px-4 py-4 bg-white shadow-lg rounded-3xl">
        <div className="flex items-center justify-between">
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
          symbol1={inputState.token.symbol}
          symbol2={outputState.token.symbol}
        />
        <ExchangeRate {...exchangeRate} alwaysOpen={true} />
        {outputState.amount && (
          <Typography variant="tiny" className="mt-4 text-center text-red-600">
            You will receive at least{' '}
            <b>
              {toHumanReadable(outputState.amount, 4)} {outputState.token.symbol}
            </b>{' '}
            or the transaction will revert.
          </Typography>
        )}
        <SwapButton onClick={handleSwap} variant="default">
          Confirm Swap
        </SwapButton>
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
