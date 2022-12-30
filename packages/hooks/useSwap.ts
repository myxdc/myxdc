"use client";
import { createContext, useEffect, useState, useContext } from "react";
import COINS from "../constants/coins";
import { fromWei, toChecksumAddress } from "../lib/utils";
import { useWallet } from "./useWallet";
import { ethers, BigNumber } from "ethers";
import { toast } from "react-hot-toast";

const SwapContext = createContext();

const XRC20_ABI = require("../constants/abis/XRC20.json").abi;
const PAIR_ABI = require("../constants/abis/IUniswapV2Pair.json").abi;
const ROUTER_ABI = require("../constants/abis/IUniswapV2Router02.json").abi;
const FACTORY_ABI = require("../constants/abis/IUniswapV2Factory.json").abi;

const ROUTER_ADDRESS = process.env.NEXT_PUBLIC_ROUTER_ADDRESS;

const ENABLE_TOAST = true;

export function SwapProvider({ children }) {
  const [factory, setFactory] = useState();
  const [router, setRouter] = useState();
  const [pair, setPair] = useState();
  const { web3, account, signThenSend } = useWallet();

  useEffect(() => {
    if (!web3) return;
    init_swap(web3).then((swap) => {
      setFactory(swap.factory);
      setRouter(swap.router);
      setPair(swap.pair);
    });
  }, [web3]);

  /**
   *  Function used to add Liquidity to any pair of tokens or token-XDC
   * @param {string} address1 - Address of the coin to add from (either a XRC20 token or XDC)
   * @param {string} address2 - Address of the coin to add to (either a XRC20 token or XDC)
   * @param {number} amount1 - A float or similar number representing the value of address1's coin to add
   * @param {number} amount2 - A float or similar number representing the value of address2's coin to add
   * @param {number} amount1Min - A float or similar number representing the minimum of address1's coin to add
   * @param {number} amount2Min - A float or similar number representing the minimum of address2's coin to add
   */
  const addLiquidity = async (...args) => {
    return await _addLiquidity(
      ...args,
      router,
      account?.address,
      web3,
      signThenSend
    );
  };

  /**
   * Function used to swap any pair of tokens or token-XDC
   * @param {string} address1 - Address of the coin to swap from (either a XRC20 token or XDC)
   * @param {string} address2 - Address of the coin to swap to (either a XRC20 token or XDC)
   * @param {number} amount - A float or similar number representing the value of address1's coin to swap
   */
  const swapTokens = async (...args) => {
    return await _swapTokens(
      ...args,
      router,
      account?.address,
      web3,
      signThenSend
    );
  };

  /**
   *  Get how much of address2's coin to receive for a given amount of address1's coin
   *  @param {string} address1 - Address of the coin to swap from (either a XRC20 token or XDC)
   *  @param {string} address2 - Address of the coin to swap to (either a XRC20 token or XDC)
   *  @param {number} amount - A float or similar number representing the value of address1's coin to swap
   *
   * @returns {number} - A float or similar number representing the value of address2's coin to receive
   */
  const getAmountOut = async (...args) => {
    return await _getAmountOut(...args, router, web3);
  };

  /**
   * Get how much of address1's coin to swap for a given amount of address2's coin
   * @param {string} address1 - Address of the coin to swap from (either a XRC20 token or XDC)
   * @param {string} address2 - Address of the coin to swap to (either a XRC20 token or XDC)
   * @param {number} amount - A float or similar number representing the value of address2's coin to swap
   *
   * @returns {number} - A float or similar number representing the value of address1's coin to receive
   */
  const getAmountIn = async (...args) => {
    return await _getAmountIn(...args, router, web3);
  };

  /**
   * Get the reserves of a pair of coins
   * @param {string} address1 - Address of the coin to swap from (either a XRC20 token or XDC)
   * @param {string} address2 - Address of the coin to swap to (either a XRC20 token or XDC)
   *
   * @returns {array} - An array of two numbers representing the reserves of address1 and address2
   */
  const getReserves = async (...args) => {
    return await _getReserves(...args, factory, web3);
  };

  /**
   * Get user liquidity of a pair of coins
   * @param {string} address1 - Address of the coin to swap from (either a XRC20 token or XDC)
   * @param {string} address2 - Address of the coin to swap to (either a XRC20 token or XDC)
   * @param {string} address - Address of the user, if not provided, the current user will be used
   *
   * @returns {number} - A float or similar number representing the user liquidity of the pair
   */
  const getUserLiquidity = async (...args) => {
    args[2] = args[2] || account?.address;
    return await _getUserLiquidity(...args, factory, web3);
  };

  return (
    <SwapContext.Provider
      value={{
        addLiquidity,
        swapTokens,
        getAmountOut,
        getAmountIn,
        getReserves,
        getUserLiquidity,
        factory,
      }}
    >
      {children}
    </SwapContext.Provider>
  );
}

export function useSwap() {
  const context = useContext(SwapContext);
  if (context === undefined) {
    throw new Error("useSwap must be used within a SwapProvider");
  }
  return context;
}

/**
 * Helper functions
 */

export function getRouter(address, web3) {
  return new web3.eth.Contract(ROUTER_ABI, address).methods;
}

export function getFactory(address, web3) {
  return new web3.eth.Contract(FACTORY_ABI, address).methods;
}

export function getXRC20(address, web3) {
  return new web3.eth.Contract(XRC20_ABI, address).methods;
}

export async function getDecimals(token) {
  const decimals = await token
    .decimals()
    .call()
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log("No tokenDecimals function for this token, set to 0");
      return 0;
    });
  return decimals;
}

async function init_swap(web3) {
  // get default coins
  const coins = COINS;

  // get the router contract
  const router = await getRouter(ROUTER_ADDRESS, web3);

  // get the factory contract from the router
  const factory = await router
    .factory()
    .call()
    .then((address) => getFactory(address, web3));

  // get the WXDC contract and add it to the coins list
  const wxdc = await router
    .WETH()
    .call()
    .then(async (wxdc_address) => {
      coins[0].address = wxdc_address;
      return await getXRC20(wxdc_address, web3);
    });

  return {
    coins,
    router,
    factory,
    wxdc,
  };
}

async function _addLiquidity(
  address1,
  address2,
  amount1,
  amount2,
  amount1min,
  amount2min,
  routerContract,
  accountAddress,
  web3,
  signThenSend
) {
  const token1 = new web3.eth.Contract(XRC20_ABI, address1).methods;
  const token2 = new web3.eth.Contract(XRC20_ABI, address2).methods;

  const token1Decimals = await getDecimals(token1);
  const token2Decimals = await getDecimals(token2);

  const amountIn1 = ethers.utils.parseUnits(amount1, token1Decimals);
  const amountIn2 = ethers.utils.parseUnits(amount2, token2Decimals);

  const amount1Min = ethers.utils.parseUnits(amount1min, token1Decimals);
  const amount2Min = ethers.utils.parseUnits(amount2min, token2Decimals);

  const time = Math.floor(Date.now() / 1000) + 200000; // 2 days
  const deadline = ethers.BigNumber.from(time);

  let nonce = await web3.eth.getTransactionCount(accountAddress);
  let txObj = {
    to: toChecksumAddress(address1),
    data: await token1.approve(ROUTER_ADDRESS, amountIn1).encodeABI(),
    nonce: nonce,
  };
  let promise = signThenSend(txObj);
  if (ENABLE_TOAST) {
    await toast.promise(
      promise,
      {
        loading: "Approving token: " + address1,
        success: "Approved token" + address1,
        error: (err) => err.message,
      },
      {
        style: {
          minWidth: "460px",
        },
        position: "bottom-center",
      }
    );
  } else {
    await promise;
  }

  nonce++;
  txObj = {
    to: toChecksumAddress(address2),
    data: await token2.approve(ROUTER_ADDRESS, amountIn2).encodeABI(),
    nonce: nonce,
  };
  promise = signThenSend(txObj);
  if (ENABLE_TOAST) {
    await toast.promise(
      promise,
      {
        loading: "Approving token: " + address2,
        success: "Approved token: " + address2,
        error: (err) => err.message,
      },
      {
        style: {
          minWidth: "460px",
        },
        position: "bottom-center",
      }
    );
  } else {
    await promise;
  }

  const WXDC_Address = await routerContract.WETH().call();

  console.log([
    address1,
    address2,
    amountIn1,
    amountIn2,
    amount1Min,
    amount2Min,
    accountAddress,
    deadline,
  ]);

  nonce++;
  if (address1 === WXDC_Address) {
    // XDC + Token
    txObj = {
      to: ROUTER_ADDRESS,
      data: await routerContract
        .addLiquidityETH(
          address2,
          amountIn2,
          amount2Min,
          amount1Min,
          accountAddress,
          deadline
        )
        .encodeABI(),
      nonce: nonce,
      value: amountIn1,
    };
  } else if (address2 === WXDC_Address) {
    // Token + XDC
    txObj = {
      to: ROUTER_ADDRESS,
      data: await routerContract
        .addLiquidityETH(
          address1,
          amountIn1,
          amount1Min,
          amount2Min,
          accountAddress,
          deadline
        )
        .encodeABI(),
      nonce: nonce,
      value: amountIn2,
    };
  } else {
    // Token + Token
    txObj = {
      to: ROUTER_ADDRESS,
      data: await routerContract
        .addLiquidity(
          address1,
          address2,
          amountIn1,
          amountIn2,
          amount1Min,
          amount2Min,
          accountAddress,
          deadline
        )
        .encodeABI(),
      nonce: nonce,
    };
  }

  promise = signThenSend({ ...txObj, gasLimit: 200000 });
  if (ENABLE_TOAST) {
    return await toast.promise(
      promise,
      {
        loading: "Adding Liquidity",
        success: "Liquidity Added",
        error: (err) => `Error adding liquidity: ${err.message}`,
      },
      {
        style: {
          minWidth: "460px",
        },
        position: "bottom-center",
        duration: 10000,
      }
    );
  } else {
    return await promise;
  }
}

export async function _swapTokens(
  address1,
  address2,
  amount,
  routerContract,
  accountAddress,
  web3,
  signThenSend
) {
  const tokens = [address1, address2];
  const time = Math.floor(Date.now() / 1000) + 200000;
  const deadline = BigNumber.from(time);

  const token1 = new web3.eth.Contract(XRC20_ABI, address1).methods;
  const tokenDecimals = await getDecimals(token1);

  const amountIn = ethers.utils.parseUnits(String(amount), tokenDecimals);
  const amountOut = await routerContract.getAmountsOut(amountIn, tokens).call();

  let nonce = await web3.eth.getTransactionCount(accountAddress);
  let txObj = {
    to: toChecksumAddress(address1),
    data: await token1.approve(ROUTER_ADDRESS, amountIn).encodeABI(),
    nonce: nonce,
  };
  let promise = signThenSend(txObj);
  if (ENABLE_TOAST) {
    await toast.promise(
      promise,
      {
        loading: "Approving token: " + address1,
        success: "Approved token" + address1,
        error: (err) => err.message,
      },
      {
        style: {
          minWidth: "460px",
        },
        position: "bottom-center",
      }
    );
  } else {
    await promise;
  }

  const wxdcAddress = await routerContract.WETH().call();

  nonce++;
  if (address1 === wxdcAddress) {
    // XDC -> Token
    txObj = {
      to: ROUTER_ADDRESS,
      data: await routerContract
        .swapExactETHForTokens(amountOut[1], tokens, accountAddress, deadline)
        .encodeABI(),
      nonce: nonce,
      value: amountIn,
    };
  } else if (address2 === wxdcAddress) {
    // Token -> XDC
    txObj = {
      to: ROUTER_ADDRESS,
      data: await routerContract
        .swapExactTokensForETH(
          amountIn,
          amountOut[1],
          tokens,
          accountAddress,
          deadline
        )
        .encodeABI(),
      nonce: nonce,
    };
  } else {
    // Token -> Token
    txObj = {
      to: ROUTER_ADDRESS,
      data: await routerContract
        .swapExactTokensForTokens(
          amountIn,
          amountOut[1],
          tokens,
          accountAddress,
          deadline
        )
        .encodeABI(),
      nonce: nonce,
    };
  }
  promise = signThenSend({ ...txObj, gasLimit: 200000 });

  if (ENABLE_TOAST) {
    return await toast.promise(
      promise,
      {
        loading: "Swapping tokens",
        success: "Tokens swapped",
        error: (err) => `Error swapping tokens: ${err.message}`,
      },
      {
        style: {
          minWidth: "460px",
        },
        position: "bottom-center",
        duration: 10000,
      }
    );
  } else {
    return await promise;
  }
}

async function _getAmountOut(
  address1,
  address2,
  amountIn,
  routerContract,
  web3
) {
  const token1 = new web3.eth.Contract(XRC20_ABI, address1).methods;
  const token1Decimals = await getDecimals(token1);

  const token2 = new web3.eth.Contract(XRC20_ABI, address2).methods;
  const token2Decimals = await getDecimals(token2);

  const values_out = await routerContract
    .getAmountsOut(ethers.utils.parseUnits(String(amountIn), token1Decimals), [
      address1,
      address2,
    ])
    .call();
  const amount_out = values_out[1] * 10 ** -token2Decimals;
  return Number(amount_out);
}

async function _getAmountIn(
  address1,
  address2,
  amountOut,
  routerContract,
  web3
) {
  const token1 = new web3.eth.Contract(XRC20_ABI, address1).methods;
  const token1Decimals = await getDecimals(token1);

  const token2 = new web3.eth.Contract(XRC20_ABI, address2).methods;
  const token2Decimals = await getDecimals(token2);

  const values_in = await routerContract
    .getAmountsIn(ethers.utils.parseUnits(String(amountOut), token2Decimals), [
      address1,
      address2,
    ])
    .call();
  const amount_in = values_in[0] * 10 ** -token1Decimals;
  return Number(amount_in);
}

async function _getReserves(address1, address2, factoryContract, web3) {
  const pairAddress = await factoryContract.getPair(address1, address2).call();
  const pair = new web3.eth.Contract(PAIR_ABI, pairAddress).methods;

  if (pairAddress == "0x0000000000000000000000000000000000000000") {
    throw new Error("Pair does not exist");
  }

  // Get decimals for each coin
  const coin1 = new web3.eth.Contract(XRC20_ABI, address1).methods;
  const coin2 = new web3.eth.Contract(XRC20_ABI, address2).methods;

  const coin1Decimals = await getDecimals(coin1);
  const coin2Decimals = await getDecimals(coin2);

  // Get reserves
  const reservesRaw = await pair.getReserves().call();

  // Put the results in the right order
  const results = [
    (await pair.token0().call()) === address1 ? reservesRaw[0] : reservesRaw[1],
    (await pair.token1().call()) === address2 ? reservesRaw[1] : reservesRaw[0],
  ];

  // Scale each to the right decimal place
  return [results[0] * 10 ** -coin1Decimals, results[1] * 10 ** -coin2Decimals];
}

async function _getUserLiquidity(
  address1,
  address2,
  accountAddress,
  factoryContract,
  web3
) {
  const pairAddress = await factoryContract.getPair(address1, address2).call();
  const pair = new web3.eth.Contract(PAIR_ABI, pairAddress).methods;

  if (pairAddress == "0x0000000000000000000000000000000000000000") {
    throw new Error("Pair does not exist");
  }

  const [reserves1, reserves2] = await _getReserves(
    address1,
    address2,
    factoryContract,
    web3
  );

  const liquidityTokens_BN = await pair.balanceOf(accountAddress).call();
  const liquidityTokens = Number(ethers.utils.formatEther(liquidityTokens_BN));

  // pool share in percent
  const totalSupply = Number(
    ethers.utils.formatEther(await pair.totalSupply().call())
  ).toFixed(2);
  const poolShare = (liquidityTokens / totalSupply) * 100;

  // calculate user share of reserves
  const pooledToken1 = (reserves1 * liquidityTokens) / totalSupply;
  const pooledToken2 = (reserves2 * liquidityTokens) / totalSupply;

  return {
    reserves1: reserves1,
    reserves2: reserves2,
    liquidityTokens: liquidityTokens,
    poolShare: poolShare,
    pooledToken1: pooledToken1,
    pooledToken2: pooledToken2,
  };
}
