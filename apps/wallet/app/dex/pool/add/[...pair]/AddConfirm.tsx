import { useSwapRouter, useXRC20 } from '@myxdc/hooks/contracts/useContract'
import { useWeb3 } from '@myxdc/hooks/contracts/useWeb3'
import { useConfig } from '@myxdc/hooks/custom/useConfig'
import { useSwapConfig } from '@myxdc/hooks/swap/useSwapConfig'
import { useWallet } from '@myxdc/hooks/useWallet'
import {
  CloseIcon,
  Currency,
  CurrencySkeleton,
  IconButton,
  MiddleButton,
  PricePoolShare,
  Skeleton,
  Spinner,
  SwapButton,
  TokenType,
  Typography,
} from '@myxdc/ui'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

interface LiquidityConfirmAddProps {
  onClose: () => void

  inputAState: {
    token: TokenType
    amount: string
    amountRaw: string
    minRaw: string
  }
  inputBState: {
    token: TokenType
    amount: string
    amountRaw: string
    minRaw: string
  }
  exchangeRate: {
    AperB: string
    BperA: string
  }
  isNewPair?: boolean
}

export default function LiquidityConfirmAdd({
  onClose,
  inputAState,
  inputBState,
  exchangeRate,
  isNewPair = false,
}: LiquidityConfirmAddProps) {
  const [loading, setLoading] = useState(false)
  const { config: swapConfig } = useSwapConfig()
  const { SWAP_ROUTER_ADDRESS, SWAP_WXDC_ADDRESS } = useConfig()
  const web3 = useWeb3()
  const { account, signThenSend, updateAccountsBalances } = useWallet()
  const token1 = useXRC20(inputAState.token.address)
  const token2 = useXRC20(inputBState.token.address)
  const router = useSwapRouter()

  const handleAdd = async () => {
    setLoading(true)

    // calculate Unix timestamp after which the transaction will revert.
    const deadlineUnix = Math.floor(Date.now() / 1000) + swapConfig.deadline * 60

    // approve token1 for router
    let nonce = await web3.eth.getTransactionCount(account.address)
    let txObj = {
      to: inputAState.token.address,
      data: await token1?.methods.approve(SWAP_ROUTER_ADDRESS, inputAState.amountRaw).encodeABI(),
      nonce: nonce,
      value: '0',
    }
    await toast.promise(signThenSend(txObj), {
      loading: 'Approving token: ' + inputAState.token.symbol || inputAState.token.address,
      success: 'Approved token: ' + inputAState.token.symbol || inputAState.token.address,
      error: (err: Error) => {
        setLoading(false)
        return err.message
      },
    })

    // approve token2 for router
    nonce++
    txObj = {
      to: inputBState.token.address,
      data: await token2?.methods.approve(SWAP_ROUTER_ADDRESS, inputBState.amountRaw).encodeABI(),
      nonce: nonce,
      value: '0',
    }
    await toast.promise(signThenSend(txObj), {
      loading: 'Approving token: ' + inputBState.token.symbol || inputBState.token.address,
      success: 'Approved token: ' + inputBState.token.symbol || inputBState.token.address,
      error: (err: Error) => {
        setLoading(false)
        return err.message
      },
    })

    // add liquidity
    nonce++
    if (inputAState.token.symbol.toLowerCase() === 'xdc') {
      // XDC + token
      txObj = {
        to: SWAP_ROUTER_ADDRESS,
        data: await router.methods
          .addLiquidityETH(
            inputBState.token.address,
            inputBState.amountRaw,
            inputBState.minRaw,
            inputAState.minRaw,
            account.address,
            deadlineUnix
          )
          .encodeABI(),
        nonce: nonce,
        value: inputAState.amountRaw,
      }
    } else if (inputBState.token.symbol.toLowerCase() === 'xdc') {
      // token + XDC
      txObj = {
        to: SWAP_ROUTER_ADDRESS,
        data: await router.methods
          .addLiquidityETH(
            inputAState.token.address,
            inputAState.amountRaw,
            inputAState.minRaw,
            inputBState.minRaw,
            account.address,
            deadlineUnix
          )
          .encodeABI(),
        nonce: nonce,
        value: inputBState.amountRaw,
      }
    } else {
      // token + token
      txObj = {
        to: SWAP_ROUTER_ADDRESS,
        data: await router.methods
          .addLiquidity(
            inputAState.token.address,
            inputBState.token.address,
            inputAState.amountRaw,
            inputBState.amountRaw,
            inputAState.minRaw,
            inputBState.minRaw,
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
        loading: 'Adding liquidity',
        success: 'Liquidity will be added after the transaction is confirmed',
        error: (err: Error) => {
          setLoading(false)
          return `Error adding liquidity: ${err.message}`
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
      updateAccountsBalances()
    }, 2000)

    setLoading(false)
    onClose()
  }

  if (loading) {
    return (
      <div className="fixed inset-0 z-20 flex items-center justify-center overflow-y-auto transition-opacity bg-gray-800 bg-opacity-60 backdrop-filter backdrop-blur-sm">
        <div className="flex items-center justify-center w-full max-w-md px-4 py-4 bg-white shadow-lg rounded-3xl square">
          <Spinner text="Adding" />
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
            Confirm Add Liquidity
          </Typography>
          <IconButton type="button" className="text-gray-400 hover:text-gray-500" onClick={onClose}>
            <CloseIcon className="w-6 h-6" />
          </IconButton>
        </div>
        <ReceiveAmounts
          amount1={inputAState.amount}
          amount2={inputBState.amount}
          symbol1={inputAState.token.symbol}
          symbol2={inputBState.token.symbol}
        />
        <PricePoolShare
          price1={exchangeRate?.AperB}
          label1={inputAState && inputBState && `${inputAState?.token?.symbol} per ${inputBState?.token?.symbol}`}
          price2={exchangeRate?.BperA}
          label2={inputBState && inputAState && `${inputBState?.token?.symbol} per ${inputAState?.token?.symbol}`}
        />
        {/* {inputBState.amount && (
          <Typography variant="tiny" className="mt-4 text-center text-red-600">
            You will receive at least{' '}
            <b>
              {toHumanReadable(inputBState.amount, 4)} {inputBState.token.symbol}
            </b>{' '}
            or the transaction will revert.
          </Typography>
        )} */}
        <SwapButton onClick={handleAdd} variant="default">
          {isNewPair ? 'Confirm & Create Pair' : 'Confirm & Add Liquidity'}
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
      <MiddleButton variant="add" />
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
