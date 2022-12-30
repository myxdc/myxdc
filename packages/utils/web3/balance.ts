import { ethers } from 'ethers'

export const toWei = (amount: string | number, decimals = 18) => {
  return ethers.utils.parseUnits(String(amount), decimals)
}

export const fromWei = (amount: string | number, decimals = 18) => {
  return ethers.utils.formatUnits(String(amount), decimals)
}
