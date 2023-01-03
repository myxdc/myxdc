// tokens
import { default_tokens } from '@myxdc/constants'
import { atom } from 'jotai'

import type { Token } from './types'

export const tokensAtom = atom<Token[]>(default_tokens(process.env.NEXT_PUBLIC_CHAIN_ID as any))

// add token without duplicates
export const addTokenAtom = atom(null, (get, set, token: Token) => {
  const tokens = get(tokensAtom)
  const newTokens = tokens.filter((t) => t.address !== token.address)
  newTokens.push(token)
  set(tokensAtom, newTokens)
})
