'use client'

import { useAtom } from 'jotai'
import React from 'react'

import { useConfig } from '../custom/useConfig'
import { metamaskAccountsAtom, writeActiveAccountAtom } from './state'
import { txObj } from './types'

declare global {
  interface Window {
    ethereum: any
  }
}

export const useMetaMask = () => {
  const { HEX_CHAIN_ID } = useConfig()
  const [accounts, setAccounts] = useAtom(metamaskAccountsAtom)
  const [activeAccount, setActiveAccount] = useAtom(writeActiveAccountAtom)

  const connectMetaMask = React.useCallback(async () => {
    if (!window.ethereum) {
      throw new Error('MetaMask not installed')
    }
    const chainId = await window.ethereum.request({
      method: 'eth_chainId',
    })
    if (chainId != HEX_CHAIN_ID) {
      throw new Error('MetaMask is not connected to XDC Network')
    }
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })

    setAccounts(accounts)
    window.ethereum.on('accountsChanged', (accounts: string[]) => {
      setAccounts(accounts)
    })
    if (accounts) {
      setActiveAccount({
        address: accounts[0],
        type: 'metamask',
      })
    }
    return accounts
  }, [])

  const disconnectMetaMask = React.useCallback(async () => {
    setAccounts([])
    if (activeAccount?.type == 'metamask') {
      setActiveAccount(null)
    }
  }, [])

  const signTransaction = React.useCallback(async (tx: txObj, accountId: string) => {
    tx.value = tx.value ? tx.value.toString(16) : '0x0'
    console.log(tx)

    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [tx],
    })
    return txHash
  }, [])

  return {
    accounts,
    connectMetaMask,
    disconnectMetaMask,
    signTransaction,
  }
}
