'use client'
import { useState } from 'react'

import { Container } from '../container'
import { AccountSelector, AccountSelectorProps } from './AccountSelector'

interface NavbarProps {
  linkComponent?: React.ElementType
  activeLink?: string
  accounts?: AccountSelectorProps['accounts']
  onAccountSelected?: AccountSelectorProps['onSelected']
  onAccountRemove?: AccountSelectorProps['onRemove']
}

export const Navbar = ({ linkComponent, activeLink, accounts, onAccountSelected, onAccountRemove }: NavbarProps) => {
  const [navbarOpen, setNavbarOpen] = useState(false)
  const LinkComponent = linkComponent || 'a'

  const activeLinkClass =
    'block py-2 pl-3 pr-4 text-white rounded bg-primary-700 md:bg-transparent md:text-primary-700 md:p-0 '
  const linkClass =
    'block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary-700 md:p-0 '

  return (
    <nav className="fixed top-0 left-0 z-20 w-full px-2 py-3 bg-white border-b border-gray-200 sm:px-4 ">
      <Container>
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <LinkComponent href="/" className="flex items-center flex-1">
            <img src="https://www.svgrepo.com/show/10349/circle.svg" className="h-8 mr-3 sm:h-9" alt="MyXDC Logo" />
            <span className="self-center hidden text-xl font-semibold whitespace-nowrap md:block">MyXDC</span>
          </LinkComponent>
          <div className="flex md:order-2">
            {accounts && accounts.length > 0 ? (
              <AccountSelector
                accounts={accounts}
                linkComponent={linkComponent}
                onSelected={onAccountSelected}
                onRemove={onAccountRemove}
              />
            ) : (
              <>
                <LinkComponent
                  href="/wallet/import"
                  className="text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3"
                >
                  Import Existing Account
                </LinkComponent>
                <LinkComponent
                  href="/wallet/create"
                  className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 "
                >
                  Create Account
                </LinkComponent>
              </>
            )}
            <button
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            id="navbar-sticky"
            className={`flex-1 items-center justify-between w-full md:flex md:w-auto md:order-1 ${
              navbarOpen ? 'block' : 'hidden'
            }`}
          >
            <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white ">
              <li>
                <LinkComponent
                  href="/wallet"
                  className={activeLink === 'wallet' ? activeLinkClass : linkClass}
                  aria-current="page"
                >
                  Wallet
                </LinkComponent>
              </li>
              <li>
                <LinkComponent href="/swap" className={activeLink === 'swap' ? activeLinkClass : linkClass}>
                  Swap
                </LinkComponent>
              </li>
              <li>
                <LinkComponent href="/account" className={activeLink === 'account' ? activeLinkClass : linkClass}>
                  Account
                </LinkComponent>
              </li>
              <li>
                <LinkComponent href="/help" className={activeLink === 'help' ? activeLinkClass : linkClass}>
                  Help
                </LinkComponent>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </nav>
  )
}
