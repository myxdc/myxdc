'use client'

import XRC_20 from '@myxdc/constants/artifacts/XRC20.json'
import { useWeb3 } from '@myxdc/hooks/contracts/useWeb3'
import { useConfig } from '@myxdc/hooks/custom/useConfig'
import { useTokensWithBalances } from '@myxdc/hooks/tokens/useTokensWithBalances'
import { txObj } from '@myxdc/hooks/wallet/types'
import { useAccount } from '@myxdc/hooks/wallet/useAccount'
import { useSigner } from '@myxdc/hooks/wallet/useSigner'
import { AddressInput, CurrencyInput, FormButton, Spinner } from '@myxdc/ui'
import { isAddress, toChecksumAddress, toWei } from '@myxdc/utils/web3'
import React, { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { ethers } from 'ethers'

export default function Page() {
  const { EXPLORER_URL } = useConfig()
  const [error, setError] = useState<string | undefined>()
  const [loading, setLoading] = useState(false)
  const [to, setTo] = useState('')
  const [amount, setAmount] = useState<string>('')
  const { activeAccount } = useAccount()

  const { tokens, mutate } = useTokensWithBalances({
    address: activeAccount?.address,
  })
  const [token, setToken] = useState(tokens?.[0].address || undefined)
  const Web3 = useWeb3()
  const { signer } = useSigner({
    type: activeAccount?.type,
  })

  const selectedToken = useMemo(() => {
    return tokens?.find((t) => t.address === token)
  }, [tokens, token])

  useEffect(() => {
    if (!selectedToken?.balance || parseFloat(amount) > selectedToken?.balance) {
      setError('Insufficient balance')
    } else {
      setError(undefined)
    }
  }, [amount, token])

  useEffect(() => {
    if (to && !isAddress(to)) {
      setError('Invalid Address')
    } else {
      setError(undefined)
    }
  }, [to])

  async function handleSubmit() {
    if (!activeAccount) {
      toast.error('No active account')
      return
    }
    const fromAddress = toChecksumAddress(activeAccount.address)
    setLoading(true)
    console.log(`Sending ${amount} ${selectedToken!.symbol} to ${to}`)
    let tx: txObj
    if (selectedToken!.symbol === 'XDC') {
      tx = {
        to: toChecksumAddress(to),
        value: ethers.utils.parseEther(amount),
        // from: fromAddress,
      }
    } else {
      const method = new Web3.eth.Contract(
        XRC_20.abi as any,
        toChecksumAddress(selectedToken!.address)
      ).methods.transfer(toChecksumAddress(to), toWei(amount, selectedToken!.decimals || 18).toString())
      tx = {
        to: toChecksumAddress(selectedToken!.address),
        data: method.encodeABI(),
        // from: fromAddress,
      }
    }

    signer?.(tx, fromAddress)
      .then((res) => {
        setLoading(false)
        setAmount('')
        setTo('')
        setTimeout(() => {
          mutate()
        }, 2000)

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
      .catch((err: Error) => {
        toast.error(err.message, {
          duration: 5000,
        })
        setLoading(false)
        console.error(err)
      })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-full pt-10 pb-20 mt-8 card">
        <Spinner text="sending" />
      </div>
    )
  }

  return (
    <>
      <CurrencyInput
        className="w-full mt-2"
        amount={amount}
        setAmount={(value) => {
          setAmount(value)
        }}
        tokens={tokens}
        selectedToken={token}
        onCurrencySelect={(token) => {
          setToken(token)
        }}
        label="Amount"
        onMax={() => {
          setAmount(
            selectedToken?.balance
              ? (
                  parseFloat(String(selectedToken!.balance)) -
                  (selectedToken.symbol?.toLowerCase() === 'xdc' ? 0.0001 : 0)
                ).toString()
              : '0'
          )
        }}
        disabled={loading}
      />
      <AddressInput className="w-full mt-8" value={to} setValue={setTo} label="To Address" disabled={loading} />

      <FormButton
        onClick={!error && !loading && to && amount ? handleSubmit : undefined}
        className="w-full mt-8"
        variant={error ? 'error' : loading ? 'loading' : !to || !amount ? 'disabled' : 'default'}
      >
        {error ? error : loading ? 'Sending...' : !to || !amount ? 'Enter amount & address' : 'Send'}
      </FormButton>
    </>
  )
}
