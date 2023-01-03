'use client'

import { useAtom, useAtomValue } from 'jotai'

import { accountsAtom, activeAccountAtom } from './state'

export const useAccount = () => {
  const [activeAccount, setActiveAccount] = useAtom(activeAccountAtom)
  const accounts = useAtomValue(accountsAtom)

  return {
    accounts,
    activeAccount: activeAccount,
    setActiveAccount: (address: string, type: 'local' | 'metamask' | 'ledger') => {
      setActiveAccount({
        address,
        type,
      })
    },
  }
}
