'use client'
import { ethers } from 'ethers'
import { useAtom } from 'jotai'
import React from 'react'

import { useWeb3 } from '../contracts/useWeb3'
import { encryptedlocalAccountsAtom, localAccountsAtom, writeActiveAccountAtom } from './state'
import { txObj } from './types'

export const useLocalWallet = () => {
  const Web3 = useWeb3()
  const [password, setPassword] = React.useState('abc123')
  const [encryptedAccounts, setEncryptedAccounts] = useAtom(encryptedlocalAccountsAtom)
  const [accounts] = useAtom(localAccountsAtom)
  const [activeAccount, setActiveAccount] = useAtom(writeActiveAccountAtom)

  const importAccountFromPrivateKey = React.useCallback(
    async (privateKey: string) => {
      const encrypted_account = Web3.eth.accounts.encrypt(privateKey, password)
      await _addAccount(encrypted_account)

      return '0x' + encrypted_account.address
    },
    [password]
  )
  const importAccountFromMnemonic = React.useCallback(
    async (mnemonic: string) => {
      const privateKey = ethers.Wallet.fromMnemonic(mnemonic, "m/44'/550'/0'/0").privateKey
      const encrypted_account = Web3.eth.accounts.encrypt(privateKey, password)
      await _addAccount(encrypted_account)
      return '0x' + encrypted_account.address
    },
    [password]
  )
  const removeAccount = React.useCallback(
    async (accountId: string) => {
      const accounts = fromBase64(encryptedAccounts).filter((account: any) => '0x' + account.address !== accountId)
      setEncryptedAccounts(toBase64(JSON.stringify(accounts)))
      if (activeAccount?.address === accountId) {
        setActiveAccount(null)
      }
    },
    [encryptedAccounts]
  )

  const signTransaction = React.useCallback(
    async (tx: txObj, accountId: string) => {
      const account = fromBase64(encryptedAccounts).find(
        (account: any) => '0x' + account.address.toLowerCase() === accountId.toLowerCase()
      )
      if (!account) {
        throw new Error('Account not found')
      }
      const decrypted_account = Web3.eth.accounts.decrypt(account, password)
      const signedTx = await Web3.eth.accounts.signTransaction(tx as any, decrypted_account.privateKey)
      return (await Web3.eth.sendSignedTransaction(signedTx.rawTransaction!)).transactionHash
    },
    [password, encryptedAccounts]
  )

  // * helpers
  const _addAccount = React.useCallback(
    async (encrypted_account: any) => {
      const account = fromBase64(encryptedAccounts).find(
        (account: any) => account.address === encrypted_account.address
      )
      if (!account) {
        const accounts = [...fromBase64(encryptedAccounts), encrypted_account]
        setEncryptedAccounts(toBase64(JSON.stringify(accounts)))
        setActiveAccount({
          address: '0x' + encrypted_account.address,
          type: 'local',
        })
      }
    },
    [encryptedAccounts]
  )

  return {
    importAccountFromPrivateKey,
    importAccountFromMnemonic,
    signTransaction,
    setPassword,
    removeAccount,
    accounts,
  }
}

// * helpers
export function toBase64(str: string) {
  return Buffer.from(str).toString('base64')
}

export function fromBase64(str: string) {
  return JSON.parse(Buffer.from(str, 'base64').toString() || '[]')
}
