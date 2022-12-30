// @ts-nocheck
// TODO: Add types

import Utils from 'web3-utils'

const CHAIN_ID = Number(process.env.NEXT_PUBLIC_CHAIN_ID) || 50

/**
 * Add the missing fields to the transaction object
 */
export const completeTxObject = (txObject) => {
  if (!txObject.gasLimit) {
    txObject.gasLimit = '50000'
  }
  if (!txObject.gasPrice) {
    txObject.gasPrice = '250000000'
  }
  if (!txObject.chainId) {
    txObject.chainId = CHAIN_ID
  }
  if (!txObject.value) {
    txObject.value = '0'
  }
  // if(!txObject.data) {
  //   txObject.data = "0x00";
  // }
  // if(!txObject.nonce) {
  //   txObject.nonce = 0;
  // }

  return txObject
}

const toHex = (str) => {
  return Utils.toHex(str)
}

/**
 *  convert tx data object values to hex
 * */
export const toHexTxObj = (txObject) => {
  txObject.gasLimit = toHex(txObject.gasLimit)
  txObject.gasPrice = toHex(txObject.gasPrice)
  txObject.value = toHex(txObject.value)
  // txObject.data = toHex(txObject.data);
  // txObject.nonce = toHex(txObject.nonce);
  return txObject
}
