import { ethers } from 'ethers'

/**
 * Check if a private key is valid
 */
export const isValidPrivateKey = (privateKey: string) => {
  return ethers.utils.isHexString(privateKey, 32)
}

/**
 * Check if a mnemonic is valid
 */
export const isValidMnemonic = (mnemonic: string) => {
  return ethers.utils.isValidMnemonic(mnemonic)
}

/**
 * Generate a random mnemonic
 */
export const generateMnemonic = (customPath?: string) => {
  return ethers.Wallet.createRandom({ path: customPath }).mnemonic
}
