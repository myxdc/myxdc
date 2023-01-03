import MAINNET_TOKENS from './mainnet/tokens.json'
import TESTNET_TOKENS from './testnet/tokens.json'

export function default_tokens(chainId: 51 | 50 = 51) {
  return chainId === 51 ? TESTNET_TOKENS : MAINNET_TOKENS
}
