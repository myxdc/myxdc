'use client'

import { useEffect, useState } from 'react'

import { CopyIcon, LogoutIcon } from '../icons'
import { ChevronDownIcon } from '../icons/chevrondown'
import { Price } from '../price'

export interface accountType {
  address?: string
  type?: string
  balance?: string | number
  active?: boolean
}

export interface AccountSelectorProps {
  accounts?: {
    address?: string
    type?: string
    balance?: string | number
    active?: boolean
  }[]
  onSelected?: (account: accountType) => void
  onRemove?: (account: accountType) => void
  linkComponent?: React.ElementType
}

export const AccountSelector = ({ accounts, onSelected, onRemove, linkComponent }: AccountSelectorProps) => {
  const LinkComponent = linkComponent || 'a'
  const [isOpen, setIsOpen] = useState(false)
  const [isCopied, setIsCopied] = useState('')

  const toggle = () => setIsOpen(!isOpen)
  const onCopy = (address?: string) => {
    if (!address) return
    navigator.clipboard.writeText(address)
    setIsCopied(address)
    setTimeout(() => setIsCopied(''), 2000)
  }

  const handleClickOutside = (event: MouseEvent) => {
    // @ts-ignore
    if (isOpen && !event.target.closest('.account-selector')) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [isOpen])

  // sort accounts to have active account the first account in the array
  // accounts = accounts?.sort((a) => (a.active ? -1 : 1))
  const activeAccount = accounts?.find((a) => a.active)

  return (
    <div className="sm:relative account-selector">
      <button
        className="flex items-center py-1 pl-4 pr-2 ml-2 text-sm font-medium text-gray-700 transition duration-150 ease-in-out bg-gray-200 rounded-full hover:bg-gray-300 lg:pl-1"
        onClick={toggle}
        type="button"
        title="Account Selector"
      >
        <div className="items-center hidden p-2 mr-2 text-black bg-white rounded-full lg:flex">
          <Price amount={activeAccount?.balance || 0} />
        </div>
        <div className="truncate ... max-w-[6rem] md:max-w-[8rem]">{activeAccount?.address}</div>
        <div className="flex items-center justify-center w-8 h-8 ml-2 text-gray-800 bg-gray-100 rounded-full">
          <ChevronDownIcon height="1.22em" width="1.22em" />
        </div>
      </button>
      {isOpen && (
        <div className="absolute left-0 right-0 z-50 mt-2 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg sm:left-auto ">
          <div className="px-3 py-2">
            <h4 className="mx-4 my-2 text-sm text-gray-600">Your Accounts</h4>
            <ul className="flex flex-col w-full overflow-y-auto max-h-[50vh]">
              {accounts?.map((account, i) => (
                <li
                  key={i}
                  className={
                    `flex items-stretch w-full mb-2 text-base rounded-lg justify-between ` +
                    (account.active
                      ? 'bg-primary-100 border border-primary-400 cursor-default'
                      : 'hover:bg-gray-100 cursor-pointer focus:bg-gray-100')
                  }
                  onClick={(e) => {
                    if (account.active) return
                    e.stopPropagation()
                    onSelected?.(account)
                    setIsOpen(false)
                  }}
                  onKeyDown={(e) => {
                    if (account.active) return
                    if (e.key === ' ' || e.key === 'Enter' || e.key === 'Spacebar') {
                      e.stopPropagation()
                      onSelected?.(account)
                      setIsOpen(false)
                    }
                  }}
                  role="button"
                  tabIndex={account.active ? -1 : 0}
                >
                  <div className="p-4">
                    <h5 className="text-xs text-gray-400">address</h5>
                    <span className="block text-sm font-normal truncate max-w-[12rem] sm:max-w-none">
                      {account.address}
                    </span>
                    <h5 className="mt-3 text-xs text-gray-400">type</h5>
                    <span className="block text-sm font-normal">{account.type}</span>
                    <h5 className="mt-3 text-xs font-medium text-gray-400">balance</h5>
                    <span className="block text-sm">
                      <Price
                        amount={account.balance}
                        currencyProps={{
                          width: '1.22em',
                          height: '1.22em',
                        }}
                      />
                    </span>
                  </div>
                  <div className="flex flex-col items-center w-20 ml-4 justify-evenly">
                    <button
                      className={`flex flex-col items-center justify-center gap-1 text-gray-700 rounded-full w-14 h-14 hover:text-primary-600 transition duration-150 ease-in-out ${
                        isCopied === account?.address ? 'text-green-500 hover:text-green-500' : ''
                      }`}
                      onClick={(e) => {
                        e.stopPropagation()
                        onCopy(account?.address)
                      }}
                    >
                      <CopyIcon />
                      <span className="text-sm font-medium">{isCopied === account?.address ? 'copied!' : 'copy'}</span>
                    </button>
                    <button
                      className="flex flex-col items-center justify-center gap-1 text-gray-700 transition duration-150 ease-in-out rounded-full w-14 h-14 hover:text-red-600"
                      onClick={(e) => {
                        e.stopPropagation()
                        onRemove?.(account)
                        setIsOpen(false)
                      }}
                    >
                      <LogoutIcon height="1.22em" width="1.22em" />
                      <span className="text-sm font-medium">logout</span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-center w-full text-sm text-gray-700 border-t border-gray-200 rounded-md">
            <LinkComponent
              className="flex items-center justify-center w-full px-4 py-4 text-sm text-center text-gray-700 transition duration-150 ease-in-out bg-white rounded-md hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
              href="/wallet/import"
            >
              Import Account
            </LinkComponent>
            <LinkComponent
              className="flex items-center justify-center w-full px-4 py-4 text-sm text-center text-gray-700 transition duration-150 ease-in-out bg-white rounded-md hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
              href="/wallet/create"
            >
              Create New Account
            </LinkComponent>
          </div>
        </div>
      )}
    </div>
  )
}
