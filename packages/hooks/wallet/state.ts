import { atom } from 'jotai'
import { Provider } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import { fromBase64 } from './useLocalWallet'

export const encryptedlocalAccountsAtom = atomWithStorage<string>('myxdc:wallet:local:encryptedAccounts', '')

export const localAccountsAtom = atom<string[]>((get) => {
  const encryptedAccounts = get(encryptedlocalAccountsAtom)
  if (!encryptedAccounts) {
    return []
  }
  const accounts = fromBase64(encryptedAccounts).map((account: any) => '0x' + account.address) || []
  return accounts
})

export const metamaskAccountsAtom = atomWithStorage<string[]>('myxdc:wallet:metamask:accounts', [])
export const ledgerAccountsAtom = atomWithStorage<{ [key: number]: string }>('myxdc:wallet:ledger:accounts', [])

export const activeAccountAtom = atomWithStorage<{
  address: string
  type: 'local' | 'metamask' | 'ledger'
} | null>('myxdc:wallet:activeAccount', null)

export const accountsAtom = atom((get) => {
  const metamaskAccounts = get(metamaskAccountsAtom)
  const localAccounts = get(localAccountsAtom)
  const ledgerAccountsObj = get(ledgerAccountsAtom)
  const ledgerAccounts = Object.values(ledgerAccountsObj)
  const active = get(activeAccountAtom)
  return {
    metamask: metamaskAccounts,
    local: localAccounts,
    ledger: ledgerAccounts,
    active: active?.address,
  }
})

export const writeActiveAccountAtom = atom(
  (get) => get(activeAccountAtom),
  (
    get,
    set,
    value: {
      address: string
      type: 'local' | 'metamask' | 'ledger'
    } | null
  ) => {
    const accounts = get(accountsAtom)
    if (!value) {
      if (accounts.metamask.length > 0) {
        set(activeAccountAtom, {
          address: accounts.metamask[0],
          type: 'metamask',
        })
      } else if (accounts.local.length > 0) {
        set(activeAccountAtom, {
          address: accounts.local[0],
          type: 'local',
        })
      } else if (accounts.ledger.length > 0) {
        set(activeAccountAtom, {
          address: accounts.ledger[0],
          type: 'ledger',
        })
      } else {
        set(activeAccountAtom, null)
      }
    } else {
      set(activeAccountAtom, value)
    }
  }
)

export const WalletProvider = Provider
