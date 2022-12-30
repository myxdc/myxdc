import Utils from 'web3-utils'

/**
 * Convert from XDC address to checksum address
 */
export const toChecksumAddress = (address: string) => {
  if (!isAddress(address)) return address
  if (address.substring(0, 3) === 'xdc') {
    address = '0x' + address.substring(3)
  }
  return Utils.toChecksumAddress(address)
}

/**
 * Convert from checksum address to XDC address
 */
export const toXDCAddress = (address: string) => {
  if (address === null) return undefined
  if (address.substring(0, 2) === '0x') {
    address = 'xdc' + address.substring(2)
  }
  return address
}

/**
 * Check if address is valid
 */
export const isAddress = (address: string) => {
  if (address.substring(0, 3) === 'xdc') {
    address = '0x' + address.substring(3)
  }
  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
    return false
  } else if (/^(0x|0X)?[0-9a-f]{40}$/.test(address) || /^(0x|0X)?[0-9A-F]{40}$/.test(address)) {
    return true
  }
  return Utils.checkAddressChecksum(address)
}
