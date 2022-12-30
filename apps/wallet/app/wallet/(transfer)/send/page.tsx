'use client'

import XRC_20 from '@myxdc/constants/artifacts/XRC20.json'
import { default_tokens } from '@myxdc/constants/xdcnetwork'
import { useTokens } from '@myxdc/hooks/useTokens'
import type { TxData } from '@myxdc/hooks/useWallet'
import { useWallet } from '@myxdc/hooks/useWallet'
import { Button, Currency, Input, Spinner, TokenSelector, Typography } from '@myxdc/ui'
import { fromWei, isAddress, toChecksumAddress, toWei } from '@myxdc/utils/web3'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const CHAIN_ID = Number(process.env.NEXT_PUBLIC_CHAIN_ID)

const EXPLORER_URL = CHAIN_ID === 51 ? 'https://explorer.apothem.network' : 'https://explorer.xinfin.network'

export default function Page() {
  const [to, setTo] = useState('')
  const [errors, setErrors] = useState<any>({
    to: false,
    amount: false,
  })

  const [loading, setLoading] = useState(false)
  const [available, setAvailable] = useState<number | undefined>()
  const [amount, setAmount] = useState<number | undefined>()
  const [openSelect, setOpenSelect] = useState(false)
  const [token, setToken] = useState({
    ...default_tokens(CHAIN_ID as any)[0],
    amount: '',
    balance: '',
  })

  const { account, web3, signThenSend, updateAccountsBalances } = useWallet()
  const { updateXDCBalance, tokens, customTokens } = useTokens()

  useEffect(() => {
    if (!account?.address) return
    updateAvailable()
  }, [token, account])

  function updateAvailable() {
    if (token.symbol === 'XDC') {
      web3.eth.getBalance(account?.address).then((balance: any) => {
        setAvailable(Number(fromWei(balance)) >= 0.001 ? Number(fromWei(balance)) - 0.001 : 0)
      })
    } else {
      if (token.address === '' || !isAddress(token?.address)) return
      const contract = new web3.eth.Contract(XRC_20.abi, toChecksumAddress(token.address))
      contract.methods
        .balanceOf(account?.address)
        .call()
        .then((balance: any) => {
          setAvailable(Number(fromWei(balance)) || 0)
        })
    }
  }

  function handleMax() {
    if (!available || available <= 0) return
    if (token.symbol === 'XDC') {
      setAmount(available)
      return
    }
    setAmount(available)
  }

  function clearInput() {
    setAmount(undefined)
    setTo('')
  }

  async function handleSubmit() {
    setErrors({ to: false, amount: false })
    console.log(to, amount, token, available)
    if (isAddress(to) == false) {
      setErrors({ ...errors, to: 'Invalid Address' })
      return
    }

    if (!amount || amount <= 0) {
      setErrors({ ...errors, amount: 'The amount must be greater than 0' })
      return
    }

    if (available && amount > available) {
      setErrors({ ...errors, amount: 'Insufficient balance' })
      return
    }

    setLoading(true)
    console.log(`Sending ${amount} ${token.symbol} to ${to}`)
    let tx: TxData
    if (token.symbol === 'XDC') {
      tx = {
        to: toChecksumAddress(to),
        value: toWei(amount).toString(),
        nonce: await web3.eth.getTransactionCount(account.address),
        data: '0x00',
      }
    } else {
      const method = new web3.eth.Contract(XRC_20.abi, toChecksumAddress(token.address)).methods.transfer(
        toChecksumAddress(to),
        toWei(amount).toString()
      )
      tx = {
        to: toChecksumAddress(token.address),
        data: method.encodeABI(),
        gasLimit: (await method.estimateGas({ from: account.address })) + 10000,
        nonce: await web3.eth.getTransactionCount(account.address),
        value: '0x00',
      }
    }

    signThenSend(tx)
      .then((res) => {
        clearInput()
        setLoading(false)
        setTimeout(() => {
          updateXDCBalance()
          updateAvailable()
          updateAccountsBalances()
        }, 5000)
        toast.success(
          <>
            Transaction sent! View on{' '}
            <a
              target="_blank"
              rel="noreferrer"
              className="ml-1 underline text-primary-600"
              href={`${EXPLORER_URL}/tx/${res}`}
            >
              Explorer
            </a>
          </>,
          {
            duration: 10000,
            style: {
              maxWidth: '500px',
            },
          }
        )
      })
      .catch((err) => {
        toast.error(err.message, {
          duration: 5000,
        })
        setLoading(false)
        console.error(err)
      })
    // TODO: Add a popup to show the error and take care of gas before sending

    // wait 2 seconds
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    // TODO: Add a popup to show the transaction hash
    // router.push(`/wallet`);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-full pt-10 pb-20 mt-8 card">
        <Spinner text="sending" />
      </div>
    )
  }

  return (
    <div>
      <Typography variant="base" className="mb-4" weight={600}>
        Send Amount
      </Typography>
      <div className="flex mt-2">
        <Input
          type="number"
          className="border-r-0 rounded-r-none"
          containerClassName="w-3/4"
          placeholder="0.00"
          min="0"
          max="100000000000"
          value={amount || ''}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <button
          onClick={() => setOpenSelect(true)}
          type="button"
          className="flex items-center justify-center w-1/4 pl-4 pr-6 text-base font-semibold border text-primary-700 bg-primary-100 border-primary-200 rounded-r-md min-w-fit hover:bg-primary-200 hover:text-primary-800 active:bg-primary-300"
        >
          {token.address === '' ? (
            <span>Select Token</span>
          ) : (
            <>
              <Currency currency={token.symbol} />
              <span className="ml-2">{token.symbol.toUpperCase()}</span>
            </>
          )}
        </button>
        {openSelect && (
          <TokenSelector
            tokens={tokens}
            onSelect={(token) => {
              console.log(token)

              setToken(token)
              setOpenSelect(false)
            }}
            onClose={() => setOpenSelect(false)}
          />
        )}
      </div>
      <div className="flex items-center mt-2">
        <p className="text-sm text-gray-600">
          Available: {available} {token.symbol}
        </p>
        <button onClick={handleMax} className="ml-2 font-semibold text-primary-600" type="button">
          Max
        </button>
      </div>
      <Typography variant="base" className="mt-6 mb-4" weight={600}>
        To Address
      </Typography>
      <div className="relative mt-2">
        <Input
          type="text"
          className={'!pr-16 ' + (errors.to ? '!border-red-600' : '')}
          placeholder="xdc..."
          value={to}
          onChange={(e) => setTo(e.target.value)}
          id="to-address-input"
        />
        <button
          type="button"
          className="absolute top-0 right-0 mr-4 font-semibold translate-y-1/2 text-primary-600 focus:outline-none"
          onClick={() => {
            navigator.clipboard.readText().then((text) => {
              setTo(text)
            })
          }}
        >
          Paste
        </button>
      </div>
      {errors.to && <p className="mt-2 text-base text-red-600">{errors.to}</p>}
      {errors.amount && <p className="mt-2 text-base text-red-600">{errors.amount}</p>}
      <Button className="w-full mt-10 form-btn" role="submit" onClick={handleSubmit}>
        Send
      </Button>
    </div>
  )
}
