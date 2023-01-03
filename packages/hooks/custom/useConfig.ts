const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || 'https://erpc.xinfin.network'
const CHAIN_ID = Number(process.env.NEXT_PUBLIC_CHAIN_ID)
const HEX_CHAIN_ID = '0x' + CHAIN_ID.toString(16)

const SWAP_ROUTER_ADDRESS = process.env.NEXT_PUBLIC_ROUTER_ADDRESS!
const SWAP_FACTORY_ADDRESS = process.env.NEXT_PUBLIC_FACTORY_ADDRESS!
const SWAP_WXDC_ADDRESS = process.env.NEXT_PUBLIC_WXDC_ADDRESS!
const SWAP_INIT_CODE_HASH = process.env.NEXT_PUBLIC_INIT_CODE_HASH!
const EXPLORER_URL = CHAIN_ID === 51 ? 'https://explorer.apothem.network' : 'https://explorer.xinfin.network'

export const useConfig = () => {
  return {
    RPC_URL,
    CHAIN_ID,
    HEX_CHAIN_ID,
    SWAP_ROUTER_ADDRESS,
    SWAP_FACTORY_ADDRESS,
    SWAP_WXDC_ADDRESS,
    SWAP_INIT_CODE_HASH,
    EXPLORER_URL,
  }
}
