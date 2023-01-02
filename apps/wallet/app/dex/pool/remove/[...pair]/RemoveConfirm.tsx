import { useSwapPair, useSwapRouter } from '@myxdc/hooks/contracts/useContract'
import { useWeb3 } from '@myxdc/hooks/contracts/useWeb3'
import { useConfig } from '@myxdc/hooks/custom/useConfig'
import { usePairAddress } from '@myxdc/hooks/swap/usePairAddress'
import { useSwapConfig } from '@myxdc/hooks/swap/useSwapConfig'
import { useWallet } from '@myxdc/hooks/useWallet'
import {
  CloseIcon,
  Currency,
  CurrencySkeleton,
  IconButton,
  MiddleButton,
  Skeleton,
  Spinner,
  SwapButton,
  TokenType,
  Typography,
} from '@myxdc/ui'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

interface LiquidityConfirmRemoveProps {
  onClose: () => void

  outputAState: {
    token: TokenType
    amount: string
    minRaw: string
  }
  outputBState: {
    token: TokenType
    amount: string
    minRaw: string
  }
  liquidityTokensAmount: string
}

export default function LiquidityConfirmRemove({
  onClose,
  outputAState,
  outputBState,
  liquidityTokensAmount,
}: LiquidityConfirmRemoveProps) {
  const [loading, setLoading] = useState(false)
  const { config: swapConfig } = useSwapConfig()
  const { SWAP_ROUTER_ADDRESS, SWAP_WXDC_ADDRESS } = useConfig()
  const web3 = useWeb3()
  const { account, signThenSend, updateAccountsBalances } = useWallet()
  const pairAddress = usePairAddress(outputAState.token.address, outputBState.token.address)
  const pair = useSwapPair(pairAddress)
  const router = useSwapRouter()

  const handleRemove = async () => {
    setLoading(true)

    console.log(liquidityTokensAmount)

    // calculate Unix timestamp after which the transaction will revert.
    const deadlineUnix = Math.floor(Date.now() / 1000) + swapConfig.deadline * 60

    // approve pair
    let nonce = await web3.eth.getTransactionCount(account.address)
    let txObj = {
      to: pairAddress!,
      data: await pair!.methods.approve(SWAP_ROUTER_ADDRESS, liquidityTokensAmount).encodeABI(),
      nonce: nonce,
      value: '0',
    }

    await toast.promise(signThenSend(txObj), {
      loading: 'Approving pair...',
      success: 'Approved the pair',
      error: (err: Error) => {
        setLoading(false)
        return err.message
      },
    })

    // remove liquidity
    nonce++
    if (outputAState.token.symbol.toLowerCase() === 'xdc') {
      // XDC + token
      txObj = {
        to: SWAP_ROUTER_ADDRESS,
        data: await router.methods
          .removeLiquidityETH(
            outputBState.token.address,
            liquidityTokensAmount,
            outputBState.minRaw,
            outputAState.minRaw,
            account.address,
            deadlineUnix
          )
          .encodeABI(),
        nonce: nonce,
        value: '0',
      }
    } else if (outputBState.token.symbol.toLowerCase() === 'xdc') {
      // token + XDC
      txObj = {
        to: SWAP_ROUTER_ADDRESS,
        data: await router.methods
          .removeLiquidityETH(
            outputAState.token.address,
            liquidityTokensAmount,
            outputAState.minRaw,
            outputBState.minRaw,
            account.address,
            deadlineUnix
          )
          .encodeABI(),
        nonce: nonce,
        value: '0',
      }
    } else {
      // token + token
      txObj = {
        to: SWAP_ROUTER_ADDRESS,
        data: await router.methods
          .removeLiquidity(
            outputAState.token.address,
            outputBState.token.address,
            liquidityTokensAmount,
            outputAState.minRaw,
            outputBState.minRaw,
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
        loading: 'Withdrawing liquidity...',
        success: 'You will receive your tokens shortly after the transaction is confirmed',
        error: (err: Error) => {
          setLoading(false)
          return `Error removing liquidity: ${err.message}`
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
          <Spinner text="Removing" />
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
            Confirm Remove Liquidity
          </Typography>
          <IconButton type="button" className="text-gray-400 hover:text-gray-500" onClick={onClose}>
            <CloseIcon className="w-6 h-6" />
          </IconButton>
        </div>
        <ReceiveAmounts
          amount1={outputAState.amount}
          amount2={outputBState.amount}
          symbol1={outputAState.token.symbol}
          symbol2={outputBState.token.symbol}
        />
        <SwapButton onClick={handleRemove} variant="default">
          Withdraw Tokens
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
