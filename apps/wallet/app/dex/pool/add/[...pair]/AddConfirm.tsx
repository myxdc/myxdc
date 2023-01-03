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
  FormButton,
  IconButton,
  MiddleButton,
  PricePoolShare,
  Skeleton,
  Spinner,
  Typography,
} from '@myxdc/ui'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

interface LiquidityConfirmAddProps {
  onClose: () => void

  inputAState: {
    token: string
    amount: string
    amountRaw: string
    minRaw: string
    symbol: string
  }
  inputBState: {
    token: string
    amount: string
    amountRaw: string
    minRaw: string
    symbol: string
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
  const { SWAP_ROUTER_ADDRESS } = useConfig()
  const token1 = useXRC20(inputAState.token)
  const token2 = useXRC20(inputBState.token)
  const router = useSwapRouter()
  const { activeAccount } = useAccount()
  const { signer } = useSigner({
    type: activeAccount?.type,
  })
  const { mutate } = useTokensWithBalances({
    address: activeAccount?.address,
  })

  const handleAdd = async () => {
    if (!activeAccount) return null
    setLoading(true)

    // calculate Unix timestamp after which the transaction will revert.
    const deadlineUnix = Math.floor(Date.now() / 1000) + swapConfig.deadline * 60

    // approve token1 for router
    let txObj: txObj = {
      to: inputAState.token,
      data: await token1?.methods.approve(SWAP_ROUTER_ADDRESS, inputAState.amountRaw).encodeABI(),
    }
    await toast.promise(signer(txObj, activeAccount?.address), {
      loading: 'Approving token: ' + inputAState.symbol || inputAState.token,
      success: 'Approved token: ' + inputAState.symbol || inputAState.token,
      error: (err: Error) => {
        setLoading(false)
        return err.message
      },
    })

    // approve token2 for router
    txObj = {
      to: inputBState.token,
      data: await token2?.methods.approve(SWAP_ROUTER_ADDRESS, inputBState.amountRaw).encodeABI(),
    }
    await toast.promise(signer(txObj, activeAccount.address), {
      loading: 'Approving token: ' + inputBState.symbol || inputBState.token,
      success: 'Approved token: ' + inputBState.symbol || inputBState.token,
      error: (err: Error) => {
        setLoading(false)
        return err.message
      },
    })

    // add liquidity
    if (inputAState.symbol.toLowerCase() === 'xdc') {
      // XDC + token
      txObj = {
        to: SWAP_ROUTER_ADDRESS,
        data: await router.methods
          .addLiquidityETH(
            inputBState.token,
            inputBState.amountRaw,
            inputBState.minRaw,
            inputAState.minRaw,
            activeAccount.address,
            deadlineUnix
          )
          .encodeABI(),
        value: inputAState.amountRaw,
      }
    } else if (inputBState.symbol.toLowerCase() === 'xdc') {
      // token + XDC
      txObj = {
        to: SWAP_ROUTER_ADDRESS,
        data: await router.methods
          .addLiquidityETH(
            inputAState.token,
            inputAState.amountRaw,
            inputAState.minRaw,
            inputBState.minRaw,
            activeAccount.address,
            deadlineUnix
          )
          .encodeABI(),
        value: inputBState.amountRaw,
      }
    } else {
      // token + token
      txObj = {
        to: SWAP_ROUTER_ADDRESS,
        data: await router.methods
          .addLiquidity(
            inputAState.token,
            inputBState.token,
            inputAState.amountRaw,
            inputBState.amountRaw,
            inputAState.minRaw,
            inputBState.minRaw,
            activeAccount.address,
            deadlineUnix
          )
          .encodeABI(),
        value: '0',
      }
    }
    await toast.promise(
      signer(txObj, activeAccount?.address),
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
      mutate()
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
          symbol1={inputAState.symbol}
          symbol2={inputBState.symbol}
        />
        <PricePoolShare
          price1={exchangeRate?.AperB}
          label1={inputAState && inputBState && `${inputAState?.symbol} per ${inputBState?.symbol}`}
          price2={exchangeRate?.BperA}
          label2={inputBState && inputAState && `${inputBState?.symbol} per ${inputAState?.symbol}`}
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
        <FormButton onClick={handleAdd} variant="default">
          {isNewPair ? 'Confirm & Create Pair' : 'Confirm & Add Liquidity'}
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
