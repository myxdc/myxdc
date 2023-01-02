import { ethers } from 'ethers'

export const toWei = (amount: string | number, decimals = 18) => {
  return ethers.utils.parseUnits(String(amount), decimals).toString()
}

export const fromWei = (amount: string | number, decimals = 18) => {
  return parseFloat(ethers.utils.formatUnits(String(amount), decimals))
}
