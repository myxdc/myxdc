'use client'

import LedgerXRP from '@ledgerhq/hw-app-eth'
import TransportWebHID from '@ledgerhq/hw-transport-webhid'
import { ethers } from 'ethers'
import { useAtom } from 'jotai'
import React, { useState } from 'react'

import { useWeb3 } from '../contracts/useWeb3'
import { useConfig } from '../custom/useConfig'
import { ledgerAccountsAtom, writeActiveAccountAtom } from './state'
import { txObj } from './types'

export const useLedger = () => {
  const Web3 = useWeb3()
  const [accounts, setAccounts] = useAtom(ledgerAccountsAtom)
  const [activeAccount, setActiveAccount] = useAtom(writeActiveAccountAtom)
  const [Ledger, setLedger] = useState<LedgerXRP | null>(null)
  const { CHAIN_ID } = useConfig()

  const connectLedger = React.useCallback(async () => {
    const transport = await TransportWebHID.create()
    const ledger = new LedgerXRP(transport)
    setLedger(ledger)
    return ledger
  }, [])

  const importAccount = React.useCallback(
    async (index: number) => {
      let ledger = Ledger
      if (!Ledger) {
        ledger = await connectLedger()
      }

      const { address } = await ledger!.getAddress(`44'/550'/0/0/${index}`, false).catch((e: any) => {
        if (e.message.includes('0x6b0c')) {
          throw new Error('Ledger is locked, please unlock it and try again')
        } else if (e.message.includes('0x6511')) {
          throw new Error('Open XDC app on Ledger and try again')
        }
        throw e
      })

      await _addAccount(address, index)
      return address
    },
    [accounts, Ledger]
  )

  const removeAccount = React.useCallback(
    async (address: string) => {
      const accs = { ...accounts }
      for (const a in accs) {
        if (accounts[a] == address) {
          delete accs[a]
          setAccounts(accs)
          if (activeAccount?.address == address) {
            setActiveAccount(null)
          }
        }
      }
    },
    [accounts, activeAccount]
  )

  const signTransaction = React.useCallback(
    async (tx: txObj, accountId: string) => {
      // if (CHAIN_ID == 51) {
      //   throw new Error('Ledger only supports XDC Mainnet')
      // }
      const index = Object.values(accounts).indexOf(accountId)
      let ledger = Ledger
      if (!ledger) {
        ledger = await connectLedger()
      }
      console.log('2ttt', tx)
      const rawTx = ethers.utils.serializeTransaction(tx).substring(2)
      console.log('raw', rawTx)
      const signed = await ledger!.signTransaction(`44'/'/550'/0/0/${index}`, rawTx, null)
      const signature = {
        r: '0x' + signed.r,
        s: '0x' + signed.s,
        v: parseInt(signed.v),
      }
      const signedTx = ethers.utils.serializeTransaction(tx, signature)

      return await Web3.eth.sendSignedTransaction('0x' + signedTx)
    },
    [accounts, Ledger]
  )

  // * helpers
  const _addAccount = React.useCallback(
    async (address: string, index: number) => {
      const accs = { ...accounts }
      accs[index] = address
      setAccounts(accs)
      setActiveAccount({
        address,
        type: 'ledger',
      })
    },
    [accounts]
  )

  return {
    accounts,
    importAccount,
    signTransaction,
    removeAccount,
  }
}
