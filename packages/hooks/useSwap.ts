'use client'
import React, { createContext, useEffect, useState, useContext } from 'react'
import { default_tokens } from '@myxdc/constants/xdcnetwork'
import { useWallet } from './useWallet'
import { ethers, BigNumber } from 'ethers'
import type Web3 from 'web3'
import { toChecksumAddress } from '@myxdc/utils/web3'
import { toast } from 'react-hot-toast'

import XRC20 from '@myxdc/constants/artifacts/XRC20.json'
import PAIR from '@myxdc/constants/artifacts/IUniswapV2Pair.json'
import ROUTER from '@myxdc/constants/artifacts/IUniswapV2Router02.json'
import FACTORY from '@myxdc/constants/artifacts/IUniswapV2Factory.json'

export interface SwapContext {
  factory?: any
  router?: any
  call?: {
    amountOut: (
      address1: string,
      address2: string,
      amountIn: string
    ) => Promise<{
      amountOut: string
      priceImpact: string
      amountOutMin: string
      reserve1: string
      reserve2: string
    }>
    reserves: (address1: string, address2: string) => Promise<{ reserve1: string; reserve2: string }>
    userLiquidity: (
      address1: string,
      address2: string,
      address?: string
    ) => Promise<{
      reserve1: string
      reserve2: string
      liquidityTokens: string
      poolShare: string
      pooledToken1: string
      pooledToken2: string
    }>
  }
  send?: {
    addLiquidity: (
      address1: string,
      address2: string,
      amount1: string,
      amount2: string,
      amount1Min: string,
      amount2Min: string
    ) => Promise<any>
    swapTokens: (address1: string, address2: string, amount: string, amountOutMin: string) => Promise<any>
  }
  config?: {
    slippage: number
    deadline: number
    setSlippage: (slippage: number) => void
    setDeadline: (deadline: number) => void
  }
}

const SwapContext = createContext<SwapContext | undefined>(undefined)

const ROUTER_ADDRESS: string = process.env.NEXT_PUBLIC_ROUTER_ADDRESS!

const ENABLE_TOAST = true

export function SwapProvider({ children }: { children: React.ReactNode }) {
  const [factory, setFactory] = useState()
  const [router, setRouter] = useState()
  const { web3, account, signThenSend } = useWallet()
  const [config, setConfig] = useState({
    slippage: 0.5,
    deadline: 20, // 20 minutes
  })

  useEffect(() => {
    const savedConfig = localStorage.getItem('myxdc:swap:config')
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig))
    }
  }, [])

  useEffect(() => {
    if (!web3) return
    init_swap(web3).then((swap) => {
      setFactory(swap.factory)
      setRouter(swap.router)
    })
  }, [web3])

  const call = {
    amountOut: async (address1: string, address2: string, amountIn: string) => {
      return _getAmountOut(address1, address2, amountIn, config.slippage, router, factory, web3)
    },
    reserves: async (address1: string, address2: string) => {
      return _getReserves(address1, address2, factory, web3)
    },
    userLiquidity: async (address1: string, address2: string, address?: string) => {
      return _getUserLiquidity(address1, address2, address || account?.address, factory, web3)
    },
  }

  const send = {
    addLiquidity: async (
      address1: string,
      address2: string,
      amount1: string,
      amount2: string,
      amount1Min: string,
      amount2Min: string
    ) => {
      return _addLiquidity(
        address1,
        address2,
        amount1,
        amount2,
        amount1Min,
        amount2Min,
        router,
        account?.address,
        web3,
        signThenSend
      )
    },
    swapTokens: async (address1: string, address2: string, amount: string, amountOutMin: string) => {
      return _swapTokens(
        address1,
        address2,
        amount,
        amountOutMin,
        config.deadline,
        router,
        account?.address,
        web3,
        signThenSend
      )
    },
  }

  const configValue = {
    slippage: config.slippage,
    deadline: config.deadline,
    setSlippage: (slippage: number) => {
      if (slippage < 0 || slippage > 100) {
        toast.error('Slippage must be between 0 and 100')
        return
      }
      setConfig({ ...config, slippage })
      localStorage.setItem('myxdc:swap:config', JSON.stringify({ ...config, slippage }))
    },
    setDeadline: (deadline: number) => {
      if (deadline < 0) {
        toast.error('Deadline must be greater than 0')
        return
      }
      setConfig({ ...config, deadline })
      localStorage.setItem('myxdc:swap:config', JSON.stringify({ ...config, deadline }))
    },
  }

  return React.createElement(
    SwapContext.Provider,
    {
      value: {
        factory,
        router,
        call,
        send,
        config: configValue,
      },
    },
    children
  )
}

export function useSwap() {
  const context = useContext(SwapContext)
  if (context === undefined) {
    throw new Error('useSwap must be used within a SwapProvider')
  }
  return context
}

/**
 * Helper functions
 */

export function getRouter(address: string, web3: Web3) {
  return new web3.eth.Contract(ROUTER.abi as any, address).methods
}

export function getFactory(address: string, web3: Web3) {
  return new web3.eth.Contract(FACTORY.abi as any, address).methods
}

export function getXRC20(address: string, web3: Web3) {
  return new web3.eth.Contract(XRC20.abi as any, address).methods
}

export async function getDecimals(token: any) {
  const decimals = await token
    .decimals()
    .call()
    .then((result: any) => {
      return Number(result)
    })
    .catch((error: any) => {
      console.log('No tokenDecimals function for this token, returning 18 by default')
      return 18
    })
  return decimals
}

async function init_swap(web3: Web3) {
  // get default coins
  const tokens = default_tokens()

  // get the router contract
  const router = await getRouter(ROUTER_ADDRESS, web3)

  // get the factory contract from the router
  const factory = await router
    .factory()
    .call()
    .then((address: string) => getFactory(address, web3))

  // get the WXDC contract and add it to the coins list
  const wxdc = await router
    .WETH()
    .call()
    .then(async (wxdc_address: string) => {
      tokens[0].address = wxdc_address
      return await getXRC20(wxdc_address, web3)
    })

  return {
    tokens: tokens,
    router,
    factory,
    wxdc,
  }
}

async function _addLiquidity(
  address1: string,
  address2: string,
  amount1: string,
  amount2: string,
  amount1min: string,
  amount2min: string,
  routerContract: any,
  accountAddress: string,
  web3: Web3,
  signThenSend: any
) {
  const token1 = new web3.eth.Contract(XRC20.abi as any, address1).methods
  const token2 = new web3.eth.Contract(XRC20.abi as any, address2).methods

  const token1Decimals = await getDecimals(token1)
  const token2Decimals = await getDecimals(token2)

  const amountIn1 = ethers.utils.parseUnits(amount1, token1Decimals)
  const amountIn2 = ethers.utils.parseUnits(amount2, token2Decimals)

  const amount1Min = ethers.utils.parseUnits(amount1min, token1Decimals)
  const amount2Min = ethers.utils.parseUnits(amount2min, token2Decimals)

  const time = Math.floor(Date.now() / 1000) + 200000 // 2 days
  const deadline = ethers.BigNumber.from(time)

  let nonce = await web3.eth.getTransactionCount(accountAddress)
  let txObj = {
    to: toChecksumAddress(address1),
    data: await token1.approve(ROUTER_ADDRESS, amountIn1).encodeABI(),
    nonce: nonce,
    value: BigNumber.from(0),
  }
  let promise = signThenSend(txObj)
  if (ENABLE_TOAST) {
    await toast.promise(
      promise,
      {
        loading: 'Approving token: ' + address1,
        success: 'Approved token' + address1,
        error: (err: Error) => err.message,
      },
      {
        style: {
          minWidth: '460px',
        },
        position: 'bottom-center',
      }
    )
  } else {
    await promise
  }

  nonce++
  txObj = {
    to: toChecksumAddress(address2),
    data: await token2.approve(ROUTER_ADDRESS, amountIn2).encodeABI(),
    nonce: nonce,
    value: BigNumber.from(0),
  }
  promise = signThenSend(txObj)
  if (ENABLE_TOAST) {
    await toast.promise(
      promise,
      {
        loading: 'Approving token: ' + address2,
        success: 'Approved token: ' + address2,
        error: (err: Error) => err.message,
      },
      {
        style: {
          minWidth: '460px',
        },
        position: 'bottom-center',
      }
    )
  } else {
    await promise
  }

  const WXDC_Address = await routerContract.WETH().call()

  console.log([address1, address2, amountIn1, amountIn2, amount1Min, amount2Min, accountAddress, deadline])

  nonce++
  if (address1 === WXDC_Address) {
    // XDC + Token
    txObj = {
      to: ROUTER_ADDRESS,
      data: await routerContract
        .addLiquidityETH(address2, amountIn2, amount2Min, amount1Min, accountAddress, deadline)
        .encodeABI(),
      nonce: nonce,
      value: amountIn1,
    }
  } else if (address2 === WXDC_Address) {
    // Token + XDC
    txObj = {
      to: ROUTER_ADDRESS,
      data: await routerContract
        .addLiquidityETH(address1, amountIn1, amount1Min, amount2Min, accountAddress, deadline)
        .encodeABI(),
      nonce: nonce,
      value: amountIn2,
    }
  } else {
    // Token + Token
    txObj = {
      to: ROUTER_ADDRESS,
      data: await routerContract
        .addLiquidity(address1, address2, amountIn1, amountIn2, amount1Min, amount2Min, accountAddress, deadline)
        .encodeABI(),
      nonce: nonce,
      value: BigNumber.from(0),
    }
  }

  promise = signThenSend({ ...txObj, gasLimit: 200000 })
  if (ENABLE_TOAST) {
    return await toast.promise(
      promise,
      {
        loading: 'Adding Liquidity',
        success: 'Liquidity Added',
        error: (err: Error) => `Error adding liquidity: ${err.message}`,
      },
      {
        style: {
          minWidth: '460px',
        },
        position: 'bottom-center',
        duration: 10000,
      }
    )
  } else {
    return await promise
  }
}

export async function _swapTokens(
  address1: string,
  address2: string,
  amount: string,
  amountOutMin: string,
  deadline: number,
  routerContract: any,
  accountAddress: string,
  web3: Web3,
  signThenSend: any
) {
  const tokens = [address1, address2]

  const token1 = new web3.eth.Contract(XRC20.abi as any, address1).methods
  const tokenDecimals = await getDecimals(token1)

  const amountIn = ethers.utils.parseUnits(String(amount), tokenDecimals)
  const amountOutMinRaw = ethers.utils.parseUnits(String(amountOutMin), tokenDecimals)

  // calculate Unix timestamp after which the transaction will revert.
  const deadlineUnix = Math.floor(Date.now() / 1000) + deadline * 60

  let nonce = await web3.eth.getTransactionCount(accountAddress)
  let txObj = {
    to: toChecksumAddress(address1),
    data: await token1.approve(ROUTER_ADDRESS, amountIn).encodeABI(),
    nonce: nonce,
    value: BigNumber.from(0),
  }
  let promise = signThenSend(txObj)
  if (ENABLE_TOAST) {
    await toast.promise(
      promise,
      {
        loading: 'Approving token: ' + address1,
        success: 'Approved token: ' + address1,
        error: (err: Error) => err.message,
      },
      {
        style: {
          minWidth: '460px',
        },
        position: 'bottom-center',
      }
    )
  } else {
    await promise
  }

  const wxdcAddress = await routerContract.WETH().call()

  nonce++
  if (address1 === wxdcAddress) {
    // XDC -> Token
    txObj = {
      to: ROUTER_ADDRESS,
      data: await routerContract
        .swapExactETHForTokens(amountOutMinRaw, tokens, accountAddress, deadlineUnix)
        .encodeABI(),
      nonce: nonce,
      value: amountIn,
    }
  } else if (address2 === wxdcAddress) {
    // Token -> XDC
    txObj = {
      to: ROUTER_ADDRESS,
      data: await routerContract
        .swapExactTokensForETH(amountIn, amountOutMinRaw, tokens, accountAddress, deadlineUnix)
        .encodeABI(),
      nonce: nonce,
      value: BigNumber.from(0),
    }
  } else {
    // Token -> Token
    txObj = {
      to: ROUTER_ADDRESS,
      data: await routerContract
        .swapExactTokensForTokens(amountIn, amountOutMinRaw, tokens, accountAddress, deadlineUnix)
        .encodeABI(),
      nonce: nonce,
      value: BigNumber.from(0),
    }
  }
  promise = signThenSend({ ...txObj, gasLimit: 200000 })

  if (ENABLE_TOAST) {
    return await toast.promise(
      promise,
      {
        loading: 'Swapping tokens',
        success: 'Tokens swapped',
        error: (err: Error) => `Error swapping tokens: ${err.message}`,
      },
      {
        style: {
          minWidth: '460px',
        },
        position: 'bottom-center',
        duration: 10000,
      }
    )
  } else {
    return await promise
  }
}

async function _getAmountOut(
  address1: string,
  address2: string,
  amountIn: string,
  slippage: number,
  routerContract: any,
  factoryContract: any,
  web3: Web3
) {
  const token1 = new web3.eth.Contract(XRC20.abi as any, address1).methods
  const token1Decimals = await getDecimals(token1)

  const token2 = new web3.eth.Contract(XRC20.abi as any, address2).methods
  const token2Decimals = await getDecimals(token2)

  const amountInRaw = ethers.utils.parseUnits(String(amountIn), token1Decimals)

  // get reserves
  const { reserve1, reserve2, reserve1Raw, reserve2Raw } = await _getReserves(address1, address2, factoryContract, web3)

  const amount_out_d = await routerContract.getAmountOut(amountInRaw, reserve1Raw, reserve2Raw).call()

  const amount_out = ethers.utils.formatUnits(amount_out_d, token2Decimals)
  // const amount_out = values_out[1] * 10 ** -token2Decimals

  // calculate price impact
  const d = BigNumber.from(reserve1Raw).add(amountInRaw)
  const price_impact = amountInRaw.mul(100).div(d)

  // calculate min amount out
  const amount_out_min = parseFloat(amount_out) * (1 - slippage / 100)

  return {
    amountOut: amount_out,
    priceImpact: price_impact.toString(),
    amountOutMin: amount_out_min.toString(),
    reserve1,
    reserve2,
  }
}

async function _getReserves(
  address1: string,
  address2: string,
  factoryContract: any,
  web3: Web3
): Promise<{ reserve1: string; reserve2: string; reserve1Raw: string; reserve2Raw: string }> {
  const pairAddress = await factoryContract.getPair(address1, address2).call()
  const pair = new web3.eth.Contract(PAIR.abi as any, pairAddress).methods

  if (pairAddress == '0x0000000000000000000000000000000000000000') {
    throw new Error('Pair does not exist')
  }

  // Get decimals for each coin
  const coin1 = new web3.eth.Contract(XRC20.abi as any, address1).methods
  const coin2 = new web3.eth.Contract(XRC20.abi as any, address2).methods

  const coin1Decimals = await getDecimals(coin1)
  const coin2Decimals = await getDecimals(coin2)

  // Get reserves
  const reservesRaw = await pair.getReserves().call()

  // Put the results in the right order
  const results = [
    (await pair.token0().call()) === address1 ? reservesRaw[0] : reservesRaw[1],
    (await pair.token1().call()) === address2 ? reservesRaw[1] : reservesRaw[0],
  ]

  // Scale each to the right decimal place
  const c = [ethers.utils.formatUnits(results[0], coin1Decimals), ethers.utils.formatUnits(results[1], coin2Decimals)]
  // const c = [results[0] * 10 ** -coin1Decimals, results[1] * 10 ** -coin2Decimals]

  return {
    reserve1: c[0],
    reserve2: c[1],
    reserve1Raw: results[0],
    reserve2Raw: results[1],
  }
}

async function _getUserLiquidity(
  address1: string,
  address2: string,
  accountAddress: string,
  factoryContract: any,
  web3: Web3
): Promise<{
  reserve1: string
  reserve2: string
  liquidityTokens: string
  poolShare: string
  pooledToken1: string
  pooledToken2: string
}> {
  const pairAddress = await factoryContract.getPair(address1, address2).call()
  const pair = new web3.eth.Contract(PAIR.abi as any, pairAddress).methods

  if (pairAddress == '0x0000000000000000000000000000000000000000') {
    throw new Error('Pair does not exist')
  }

  const { reserve1, reserve2 } = await _getReserves(address1, address2, factoryContract, web3)

  const liquidityTokens = BigNumber.from(await pair.balanceOf(accountAddress).call())

  // pool share in percent
  const totalSupply = BigNumber.from(await pair.totalSupply().call())
  const poolShare = liquidityTokens.div(totalSupply).mul(BigNumber.from(100))

  // calculate user share of reserves
  const pooledToken1 = BigNumber.from(reserve1).mul(liquidityTokens).div(totalSupply)
  const pooledToken2 = BigNumber.from(reserve2).mul(liquidityTokens).div(totalSupply)

  return {
    reserve1: reserve1,
    reserve2: reserve2,
    liquidityTokens: liquidityTokens.toString(),
    poolShare: poolShare.toString(),
    pooledToken1: pooledToken1.toString(),
    pooledToken2: pooledToken2.toString(),
  }
}
