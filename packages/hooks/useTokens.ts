'use client'
import XRC20 from '@myxdc/constants/artifacts/XRC20.json'
import { fromWei, toChecksumAddress } from '@myxdc/utils/web3'
import { createContext, createElement, useContext, useEffect, useState } from 'react'

import { Account, useWallet } from './useWallet'

type Token = {
  name: string
  symbol: string
  address: string
  decimals?: number
  coinGeckoId?: string
  balance?: number
  price?: number
}

type TokensContext = {
  xdc: Token | undefined
  tokens: Token[]
  customTokens: Token[]
  addCustomToken: (address: string, symbol: string, name: string, decimals: number) => void
  removeCustomToken: (address: string) => void
  updateXDCBalance: () => void
  updateAllBalances: () => void
}

const CHAIN_ID = Number(process.env.NEXT_PUBLIC_CHAIN_ID)

const TOKENS: Token[] =
  CHAIN_ID === 51
    ? require('@myxdc/constants/xdcnetwork/testnet/tokens.json')
    : require('@myxdc/constants/xdcnetwork/mainnet/tokens.json')

const TokensContext = createContext<TokensContext>({} as TokensContext)
function TokensProvider({ children }: { children: React.ReactNode }) {
  const [tokens, setTokens] = useState<Token[]>(TOKENS)
  const [customTokens, setCustomTokens] = useState<Token[]>([])
  const { web3, account } = useWallet()

  useEffect(() => {
    updatePrices()
  }, [])

  useEffect(() => {
    if (!web3 || !account?.address) return
    const cachedCustomTokens = getCachedCustomTokens(account?.address)
    if (cachedCustomTokens) setCustomTokens(cachedCustomTokens)
    updateAllBalances()
  }, [account])

  function updateAllBalances() {
    fetchTokensBalances(tokens, web3, account).then((tokensWithBalance) => {
      setTokens(tokensWithBalance)
    })
    fetchTokensBalances(customTokens, web3, account).then((customTokensWithBalance) => {
      setCustomTokens(customTokensWithBalance)
    })
  }

  function updatePrices() {
    fetchTokensPrices(tokens).then((tokensWithPrice) => {
      // console.log("tokensWithPrice", tokensWithPrice);
      setTokens(tokensWithPrice)
    })
  }

  function updateXDCBalance() {
    fetchTokenBalance(tokens.find((token) => token.symbol === 'XDC') as Token, web3, account).then((xdc) => {
      setTokens(tokens.map((token) => (token.symbol === 'XDC' ? xdc : token)))
    })
  }

  async function addCustomToken(address: string, symbol?: string, name?: string, decimals?: number) {
    if (!address) return
    // Check if token already exists
    const tokenExists =
      customTokens.find((token) => token.address === address) || tokens.find((token) => token.address === address)
    if (tokenExists) return

    // Fetch token info
    const contract = new web3.eth.Contract(XRC20.abi as any, toChecksumAddress(address))
    const promises = [
      symbol ? Promise.resolve(symbol) : contract.methods.symbol().call(),
      name ? Promise.resolve(name) : contract.methods.name().call(),
      decimals ? Promise.resolve(decimals) : contract.methods.decimals().call(),
      contract.methods.balanceOf(account.address).call(),
    ]
    const [tokenSymbol, tokenName, tokenDecimals, tokenBalance] = await Promise.all(promises)

    // Add token to custom tokens
    const newCustomToken: Token = {
      address,
      symbol: tokenSymbol,
      name: tokenName,
      decimals: Number(tokenDecimals),
      balance: Number(fromWei(tokenBalance, tokenDecimals)),
    }

    const newCustomTokens = [...customTokens, newCustomToken]

    setCustomTokens(newCustomTokens)

    // Save custom tokens to local storage
    saveCustomTokens(newCustomTokens, account.address as string)
  }

  function removeCustomToken(address: string) {
    const newCustomTokens = customTokens.filter((token) => token.address !== address)
    setCustomTokens(newCustomTokens)
  }

  const xdc = tokens.find((token) => token.symbol === 'XDC')

  const value = {
    xdc,
    tokens,
    customTokens,
    addCustomToken,
    removeCustomToken,
    updateXDCBalance,
    updateAllBalances,
  }

  return createElement(TokensContext.Provider, { value }, children)
}

function useTokens() {
  const context = useContext(TokensContext)
  if (context === undefined) {
    throw new Error('useTokens must be used within a TokensProvider')
  }
  return context
}

/**
 * Helper functions
 */
async function fetchTokensBalances(tokens: Token[], web3: any, account: Account) {
  if (!web3 || !account?.address) return tokens
  const tokensWithBalance = []
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]
    const tokenWithBalance = await fetchTokenBalance(token, web3, account)
    tokensWithBalance.push(tokenWithBalance)
  }
  return tokensWithBalance
}

async function fetchTokenBalance(token: Token, web3: any, account: Account) {
  if (!web3 || !account?.address) return token

  if (token.symbol === 'XDC') {
    token.balance = Number(fromWei(await web3.eth.getBalance(toChecksumAddress(account?.address))))
  } else {
    const contract = new web3.eth.Contract(XRC20.abi, toChecksumAddress(token?.address))
    const balance = await contract.methods.balanceOf(toChecksumAddress(account?.address)).call()
    token.balance = Number(fromWei(balance))
  }

  return token
}

async function fetchTokensPrices(tokens: Token[]) {
  if (!tokens) return tokens
  let coinGeckoIds = ''
  tokens.forEach(async (token) => {
    if (token.coinGeckoId && token.coinGeckoId !== '') {
      coinGeckoIds += `${token.coinGeckoId},`
    }
  })
  if (coinGeckoIds) {
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinGeckoIds}&vs_currencies=usd`)
    const data = await response.json()
    tokens.forEach((token) => {
      if (token.coinGeckoId && token.coinGeckoId !== '') {
        token.price = data[token.coinGeckoId].usd
      } else {
        token.price = 0
      }
    })
  }
  return tokens
}

function getCachedCustomTokens(address: string) {
  const customTokens = localStorage.getItem('myxdc:customTokens:' + address)
  if (customTokens) {
    return JSON.parse(customTokens)
  }
  return []
}

function saveCustomTokens(customTokens: Token[], address: string) {
  localStorage.setItem('myxdc:customTokens:' + address, JSON.stringify(customTokens))
}

export { TokensProvider, useTokens }
