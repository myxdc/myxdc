'use client'
import { useBalance } from '@myxdc/hooks/tokens/useBalance'
import { useAccount } from '@myxdc/hooks/wallet/useAccount'
import { useLedger } from '@myxdc/hooks/wallet/useLedger'
import { useLocalWallet } from '@myxdc/hooks/wallet/useLocalWallet'
import { useMetaMask } from '@myxdc/hooks/wallet/useMetaMask'
import { toXDCAddress } from '@myxdc/utils/web3/address'
import Link from 'next/link'
import React from 'react'

import { Skeleton } from '../animated'
import { Button } from '../button'
import { CopyButton } from '../copybutton'
import { IconButton } from '../iconbutton'
import { ChevronDownIcon, CloseIcon } from '../icons'
import { LedgerIcon } from '../icons/ledger'
import { LocalWalletIcon } from '../icons/localwallet'
import { MetaMaskIcon } from '../icons/metamask'
import { Price } from '../price'
import { Typography } from '../typography'

export const AccountSelector = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const { activeAccount } = useAccount()
  const { balance } = useBalance({ address: activeAccount?.address || undefined })

  const toggle = () => setIsOpen(!isOpen)

  React.useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (isOpen && !event.target.closest('.account-selector')) {
        setIsOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [isOpen])

  const [hasMounted, setHasMounted] = React.useState(false)
  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted)
    return (
      <>
        <Skeleton width={293} height={50} borderRadius={100} className="hidden lg:inline-block" />
        <Skeleton width={160} height={40} borderRadius={100} className="lg:hidden" />
      </>
    )

  return (
    <div className="sm:relative account-selector">
      {activeAccount && (
        <button
          className="flex items-center py-1 pl-4 pr-2 ml-2 text-sm font-medium text-gray-700 transition duration-150 ease-in-out bg-gray-200 rounded-full hover:bg-gray-300 lg:pl-1"
          onClick={toggle}
          type="button"
          title="Account Selector"
        >
          <div className="items-center hidden p-2 mr-2 text-black bg-white rounded-full lg:flex">
            <Price amount={balance} />
          </div>
          <div className="truncate ... max-w-[6rem] md:max-w-[8rem]">{toXDCAddress(activeAccount?.address)}</div>
          <div className="flex items-center justify-center w-8 h-8 ml-2 text-gray-800 bg-gray-100 rounded-full">
            <ChevronDownIcon height="1.22em" width="1.22em" />
          </div>
        </button>
      )}
      {!activeAccount && (
        <Link href="/connect">
          <Button className="ml-2" variant="primary">
            Connect Wallet
          </Button>
        </Link>
      )}
      {isOpen && <AccountsModal activeAccount={activeAccount} onClose={toggle} />}
    </div>
  )
}

const AccountsModal = ({ activeAccount, onClose }: any) => {
  const [tab, setTab] = React.useState(activeAccount?.type || 'local')

  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center overflow-y-auto transition-opacity bg-gray-800 bg-opacity-60 backdrop-filter backdrop-blur-sm"
      onClick={(e) => {
        e.target === e.currentTarget && onClose()
      }}
    >
      <div className="w-full max-w-2xl max-h-screen px-4 py-4 bg-white shadow-lg rounded-3xl">
        <div className="flex items-center justify-between px-4 pb-4">
          <Typography variant="h4" weight={600} as="h2">
            Select Account
          </Typography>
          <IconButton type="button" className="text-gray-400 hover:text-gray-500" onClick={onClose}>
            <CloseIcon className="w-6 h-6" />
          </IconButton>
        </div>
        <div className="flex flex-col gap-4 lg:flex-row min-h-[24rem] max-h-[90vh]">
          <div className="flex w-full gap-4 overflow-x-auto lg:flex-col lg:w-1/3 lg:overflow-y-auto">
            <button
              className={
                'flex flex-col justify-center lg:justify-start lg:flex-row items-center lg:h-16 gap-4 p-4 lg:py-0 transition bg-white rounded-xl min-w-[6rem] ' +
                (tab === 'local' ? 'bg-primary-200' : 'hover:bg-gray-200')
              }
              onClick={() => setTab('local')}
            >
              <LocalWalletIcon height={40} width={40} />
              Local Wallet
            </button>
            <button
              className={
                'flex flex-col justify-center lg:justify-start lg:flex-row items-center lg:h-16 gap-4 p-4 lg:py-0 transition bg-white rounded-xl ' +
                (tab === 'ledger' ? 'bg-primary-200' : 'hover:bg-gray-200')
              }
              onClick={() => setTab('ledger')}
            >
              <LedgerIcon height={40} width={40} />
              Ledger
            </button>
            <button
              className={
                'flex flex-col justify-center lg:justify-start lg:flex-row items-center lg:h-16 gap-4 p-4 lg:py-0 transition bg-white rounded-xl ' +
                (tab === 'metamask' ? 'bg-primary-200' : 'hover:bg-gray-200')
              }
              onClick={() => setTab('metamask')}
            >
              <MetaMaskIcon height={40} width={40} />
              MetaMask
            </button>
            <Button
              as={Link}
              href="/connect"
              className="w-full mt-auto text-sm rounded-full"
              variant="primary"
              onClick={() => {
                onClose()
              }}
            >
              Add Account
            </Button>
          </div>
          <div className="flex flex-col w-full h-auto lg:w-2/3">
            {tab === 'local' && <LocalAccounts onClose={onClose} />}
            {tab === 'metamask' && <MetaMaskAccounts onClose={onClose} />}
            {tab === 'ledger' && <LedgerAccounts onClose={onClose} />}
          </div>
        </div>
      </div>
    </div>
  )
}

const LocalAccounts = ({ onClose }: any) => {
  const { accounts, activeAccount, setActiveAccount } = useAccount()
  const { removeAccount } = useLocalWallet()

  return (
    <Accounts
      activeAccount={activeAccount}
      accounts={accounts.local}
      setActiveAccount={setActiveAccount}
      removeAccount={removeAccount}
      type="local"
      onClose={onClose}
    />
  )
}

const MetaMaskAccounts = ({ onClose }: any) => {
  const { activeAccount, setActiveAccount, accounts } = useAccount()
  const { disconnectMetaMask } = useMetaMask()

  return (
    <Accounts
      activeAccount={activeAccount}
      accounts={accounts.metamask}
      setActiveAccount={setActiveAccount}
      removeAccount={() => {
        disconnectMetaMask()
      }}
      type="metamask"
      onClose={onClose}
    />
  )
}

const LedgerAccounts = ({ onClose }: any) => {
  const { activeAccount, setActiveAccount, accounts } = useAccount()
  const { removeAccount } = useLedger()

  return (
    <Accounts
      activeAccount={activeAccount}
      accounts={accounts.ledger}
      setActiveAccount={setActiveAccount}
      removeAccount={removeAccount}
      type="ledger"
    />
  )
}

const Accounts = ({ onClose, activeAccount, accounts, setActiveAccount, removeAccount, type }: any) => {
  return (
    <>
      {accounts.length === 0 ? (
        <div className="w-full h-full text-center">
          <div className="text-sm text-gray-400">No accounts found</div>
        </div>
      ) : (
        <ul className="flex flex-col w-full overflow-y-auto max-h-[50vh] gap-1">
          {accounts.map((account: string) => (
            <li
              key={account}
              className={
                'flex flex-col w-full gap-3 px-4 py-4 text-sm text-gray-600 rounded-md  ' +
                (activeAccount.address === account ? 'bg-primary-100' : 'hover:bg-gray-100')
              }
            >
              <div className="flex items-center justify-between font-medium">
                <span className="truncate">{toXDCAddress(account)}</span>
                <CopyButton text={toXDCAddress(account)} className="ml-2" />
              </div>
              <div className="flex gap-4">
                <button
                  className={
                    'flex items-center gap-2 text-sm ' +
                    (activeAccount.address === account
                      ? 'text-green-500 cursor-default'
                      : 'text-gray-400 hover:text-green-500 cursor-pointer')
                  }
                  onClick={() => {
                    setActiveAccount(account, type)
                  }}
                >
                  {activeAccount.address === account ? 'Active' : 'Activate'}
                </button>
                <button
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-500"
                  onClick={() => removeAccount(account)}
                >
                  <span>Remove</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
