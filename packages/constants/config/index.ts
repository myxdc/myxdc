const STAGE = process.env.NEXT_PUBLIC_STAGE || 'dev'
const CHAIN_ID = (() => {
  if (STAGE === 'mainnet' || STAGE === 'beta') {
    return 50
  }
  return 51
})()

export const config = {
  // Project stage (dev, alpha, testnet, beta, live)
  STAGE: STAGE,

  // ChainId of the network to connect to (50, 51)
  CHAIN_ID: CHAIN_ID,

  // HexChainId of the network to connect to (0x32, 0x33)
  HEX_CHAIN_ID: '0x' + CHAIN_ID.toString(16),

  // Node to connect to
  RPC_URL: (() => {
    if (CHAIN_ID === 50) {
      return 'https://erpc.xinfin.network/'
    }
    return 'https://erpc.apothem.network/'
  })(),

  // Explorer URL
  EXPLORER_URL: (() => {
    if (CHAIN_ID === 50) {
      return 'https://explorer.xinfin.network/'
    }
    return 'https://explorer.apothem.network/'
  })(),

  /// Swap config

  // Router contract address
  SWAP_ROUTER_ADDRESS: (() => {
    if (CHAIN_ID === 50) {
      return ''
    }
    return '0x6239627c43B6e446dDAFB8D7B2449BEC70CB5cD2'
  })(),

  // Factory contract address
  SWAP_FACTORY_ADDRESS: (() => {
    if (CHAIN_ID === 50) {
      return ''
    }
    return '0x0F234118B9Cbc2132Ab336A1F70013608c19AEdb'
  })(),

  // WXDC contract address
  SWAP_WXDC_ADDRESS: (() => {
    if (CHAIN_ID === 50) {
      return ''
    }
    return '0xe99500ab4a413164da49af83b9824749059b46ce'
  })(),

  // Swap init code hash
  SWAP_INIT_CODE_HASH: (() => {
    if (CHAIN_ID === 50) {
      return ''
    }
    return '0x5d4a6e64a856dad00db3515c1a59cbc7589e0d21e0d5eccb2f09912b4f930860'
  })(),
}
