'use client'
import LedgerXRP from '@ledgerhq/hw-app-eth'
import TransportWebHID from '@ledgerhq/hw-transport-webhid'
import { fromWei } from '@myxdc/utils/web3'
import { completeTxObject, toHexTxObj } from '@myxdc/utils/web3/transactions'
import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import { createContext, useContext } from 'react'
import Web3 from 'web3'

const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || 'https://erpc.xinfin.network'
const CHAIN_ID = Number(process.env.NEXT_PUBLIC_CHAIN_ID)
const HEX_CHAIN_ID = '0x' + CHAIN_ID.toString(16)

declare global {
  interface Window {
    ethereum?: any
    ledger?: LedgerXRP
  }
}
export interface Account {
  address: string
  privateKey?: string
  signerType?: 'privateKey' | 'metamask' | 'ledger'
  balance?: string
}

export interface TxData {
  to: string
  value: string
  data: string
  gasLimit?: string
  gasPrice?: string
  nonce?: number
}

interface WalletContext {
  account: Account
  accounts: Account[]
  web3: any
  importFromPrivateKey: (privateKey: string) => Account
  importFromMnemonic: (mnemonic: string) => Account
  importFromMetaMask: () => Promise<Account>
  importFromLedger: () => Promise<Account>
  switchActiveAccount: (address: string) => void
  removeAccount: (address: string) => void
  signThenSend: (tx: TxData) => Promise<unknown>
  updateAccountsBalances: () => Promise<void>
}

const WalletContext = createContext<WalletContext>({} as WalletContext)

function WalletProvider({ children }: { children: React.ReactNode }) {
  const [account, setAccount] = useState<Account>({
    address: '',
    privateKey: undefined,
    signerType: undefined,
    balance: undefined,
  })
  const [accounts, setAccounts] = useState<Account[]>([])
  const [web3] = useState<any>(new Web3(RPC_URL))

  useEffect(() => {
    // load cached accounts
    loadAccounts()
  }, [])

  function importFromPrivateKey(privateKey: string) {
    const newAccount = web3.eth.accounts.privateKeyToAccount(privateKey)
    // push to accounts if not already there
    const accountsList = accounts || []
    if (!accountsList.find((acc) => acc.address.toLowerCase() === newAccount.address.toLowerCase())) {
      accountsList.push({
        address: newAccount.address,
        privateKey: newAccount.privateKey,
        signerType: 'privateKey',
      })
    }
    setAccount({
      address: newAccount.address,
      privateKey: newAccount.privateKey,
      signerType: 'privateKey',
    })
    setAccounts(accountsList)
    // save accounts to localStorage
    saveAccounts()
    // update balances
    updateAccountsBalances()
    return newAccount
  }

  function importFromMnemonic(mnemonic: string) {
    return importFromPrivateKey(ethers.Wallet.fromMnemonic(mnemonic, "m/44'/550'/0'/0").privateKey)
  }

  async function importFromMetaMask() {
    // check if metamask is installed
    if (!window.ethereum) {
      throw new Error('MetaMask not found')
    }
    // check if chainId is correct
    const chainId = await window.ethereum.request({
      method: 'eth_chainId',
    })
    if (chainId != HEX_CHAIN_ID) {
      throw new Error('Wrong network, please switch to XDC ' + (HEX_CHAIN_ID == '0x33' ? 'Testnet' : 'Mainnet'))
    }

    const accountsAddresses = await window.ethereum.request({
      method: 'eth_requestAccounts',
    })
    const newAccount: Account = {
      address: accountsAddresses[0],
      privateKey: undefined,
      signerType: 'metamask',
    }
    // add metamask accounts to accounts if not already there
    accountsAddresses.forEach((address: string) => {
      if (!accounts.find((acc) => acc.address.toLowerCase() === address.toLowerCase())) {
        accounts.push({
          address: address,
          privateKey: undefined,
          signerType: 'metamask',
        })
      }
    })
    setAccount(newAccount)
    setAccounts(accounts)

    // save accounts to localStorage
    saveAccounts()
    // update balances
    updateAccountsBalances()
    return newAccount
  }
  async function importFromLedger() {
    if (!window.ledger) {
      const transport = await TransportWebHID.create()
      window.ledger = new LedgerXRP(transport)
    }
    // `44'/550'/0/0/${index}`
    const { address } = await window.ledger.getAddress("44'/'/550'/0/0", false)

    const newAccount: Account = {
      address: address,
      privateKey: undefined,
      signerType: 'ledger',
    }
    // add ledger account to accounts if not already there
    if (!accounts.find((acc) => acc.address.toLowerCase() === newAccount.address.toLowerCase())) {
      accounts.push({
        address: newAccount.address,
        privateKey: undefined,
        signerType: 'ledger',
      })
    }
    setAccount(newAccount)
    setAccounts(accounts)
    // save accounts to localStorage
    saveAccounts()
    // update balances
    updateAccountsBalances()
    return newAccount
  }

  // sets the active account
  function switchActiveAccount(address: string) {
    const newAccount = accounts.find((acc) => acc.address.toLowerCase() == address.toLowerCase())
    if (!newAccount) return
    setAccount(newAccount)
    // update localStorage
    localStorage.setItem('myxdc:activeAccount', address)
    // update balances
    updateAccountsBalances()
  }

  // remove account from accounts
  function removeAccount(address: string) {
    const newAccounts = accounts.filter((acc) => acc.address.toLowerCase() !== address.toLowerCase())
    setAccounts(newAccounts)
    // save accounts to localStorage
    saveAccounts(newAccounts)
    // update balances
    updateAccountsBalances()
  }

  // save accounts to localStorage
  function saveAccounts(newAccounts?: Account[]) {
    localStorage.setItem('myxdc:accounts', JSON.stringify(newAccounts || accounts))
    localStorage.setItem('myxdc:activeAccount', account.address || '')
  }

  // load accounts from localStorage
  async function loadAccounts() {
    const localAccounts = localStorage.getItem('myxdc:accounts')
    if (!localAccounts) return
    let accountsList: Account[] = JSON.parse(localAccounts)
    accountsList = await Promise.all(accountsList.map((acc) => getAccountBalance(acc, web3)))
    const activeAccountAddress = localStorage.getItem('myxdc:activeAccount')
    if (accountsList) {
      setAccounts(accountsList)
      const activeAccount = accountsList.find(
        (acc: Account) => acc.address.toLowerCase() === activeAccountAddress?.toLowerCase()
      )
      if (activeAccount) {
        setAccount(activeAccount)
      } else {
        setAccount(accountsList[0])
      }
    }
  }

  // returns txHash
  async function signThenSend(tx: TxData) {
    tx = toHexTxObj(completeTxObject(tx))
    if (account.signerType === 'privateKey') {
      if (!account.privateKey) throw new Error('No private key found for account, please import account again')
      const signedTx = await web3.eth.accounts.signTransaction(tx, account.privateKey)
      return (await web3.eth.sendSignedTransaction(signedTx.rawTransaction!)).transactionHash
    } else if (account.signerType === 'metamask') {
      return await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            ...tx,
            from: account?.address,
            nonce: '0x' + (await web3.eth.getTransactionCount(account.address!)).toString(16),
          },
        ],
      })
    } else if (account.signerType === 'ledger') {
      if (CHAIN_ID == 51) {
        alert("Ledger doesn't support XDC Apothem Network, please use XDC Mainnet or use a non-ledger wallet")
        throw new Error("Ledger doesn't support XDC Apothem Network")
      }
      if (!window.ledger) {
        const transport = await TransportWebHID.create()
        window.ledger = new LedgerXRP(transport)
      }

      const rawTx = ethers.utils.serializeTransaction(tx).substring(2)
      // const resolution = await ledgerService.resolveTransaction(rawTx);
      // let res = {
      //   xrc20Tokens: [],
      //   nfts: [],
      //   externalPlugins: [],
      //   plugin: [],
      // };
      const signed = await window.ledger.signTransaction("44'/'/550'/0/0", rawTx, null)

      const signature = {
        r: '0x' + signed.r,
        s: '0x' + signed.s,
        v: parseInt(signed.v),
      }

      //Serialize the same transaction as before, but adding the signature on it
      const signedTx = ethers.utils.serializeTransaction(tx, signature)

      //Sending the transaction to the blockchain
      return await web3.eth.sendSignedTransaction('0x' + signedTx)
    } else {
      throw new Error('No signer type found, disconnect and reconnect again')
    }
  }

  // update accounts balances
  async function updateAccountsBalances() {
    const newAccounts = await Promise.all(accounts.map((acc) => getAccountBalance(acc, web3)))
    setAccounts(newAccounts)
    saveAccounts(newAccounts)
  }

  const wallet: WalletContext = {
    account,
    accounts,
    web3,
    importFromPrivateKey,
    importFromMnemonic,
    importFromMetaMask,
    importFromLedger,
    switchActiveAccount,
    removeAccount,
    signThenSend,
    updateAccountsBalances,
  }

  return React.createElement(WalletContext.Provider, { value: wallet }, children)
}

function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}

export { useWallet, WalletProvider }

async function getAccountBalance(account: Account, web3: any) {
  return {
    ...account,
    balance: fromWei(await web3.eth.getBalance(account.address)),
  }
}
