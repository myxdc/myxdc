export interface Token {
  address: string
  symbol?: string
  name?: string
  decimals?: number
  coinGeckoId?: string
  price?: number
  usd?: number
  balance?: number | string
}
