import { useWallet } from '@myxdc/hooks/useWallet'
import { Navbar as NavbarUI } from '@myxdc/ui'
import { toChecksumAddress } from '@myxdc/utils/web3/address'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const { accounts, account, switchActiveAccount, removeAccount } = useWallet()

  const accountsForNavbar = accounts?.map((a) => {
    return {
      active: a?.address === account?.address,
      type: a?.signerType,
      address: a?.address?.substring(0, 2) === '0x' ? 'xdc' + a?.address?.substring(2) : a?.address,
      balance: a?.balance,
    }
  })

  const pathnames = usePathname()?.split('/')

  return (
    <NavbarUI
      accounts={accountsForNavbar}
      activeLink={pathnames?.[1]}
      linkComponent={Link}
      onAccountRemove={({ address }) => {
        removeAccount(toChecksumAddress(address as string) || '')
      }}
      onAccountSelected={({ address }) => {
        switchActiveAccount(toChecksumAddress(address as string) || '')
      }}
    />
  )
}
