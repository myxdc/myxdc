import Image from 'next/image'

import { Container } from '../container'
import { AccountSelector } from './AccountSelector'

interface NavbarProps {
  linkComponent?: React.ElementType
  activeLink?: string
}

function handleToggle() {
  const id = 'the-navbar-sticky'
  const element = document.getElementById(id)
  if (element) {
    element.classList.toggle('hidden')
  }
}

export const Navbar = ({ linkComponent, activeLink }: NavbarProps) => {
  const LinkComponent = linkComponent || 'a'

  const activeLinkClass =
    'block py-2 pl-3 pr-4 text-white rounded bg-primary-700 md:bg-transparent md:text-primary-700 md:p-0 '
  const linkClass =
    'block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary-700 md:p-0 '

  return (
    <nav className="relative top-0 left-0 z-20 w-full py-3 bg-white border-b border-gray-200 sm:px-4">
      <Container>
        <div className="flex items-center justify-between mx-auto">
          <LinkComponent href="/wallet" className="flex items-center">
            <Image
              src="/assets/img/logo.svg"
              className="w-auto h-8 sm:mr-2 sm:h-9"
              alt="MyXDC Logo"
              width={32}
              height={32}
            />
            <span className="self-center hidden text-xl font-extrabold text-gray-700 whitespace-nowrap md:block">
              MyXDC
            </span>
            <div className="p-1 ml-2 text-xs font-medium bg-gray-300 rounded-lg">alpha</div>
          </LinkComponent>
          <div className="flex justify-end md:order-2">
            <AccountSelector />
            <button
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg sm:ml-3 md:hidden hover:bg-gray-100"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={handleToggle}
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
            id="the-navbar-sticky"
            className={`lg:ml-10 lg:mr-auto absolute md:relative top-full left-0 right-0 items-center justify-center w-full md:flex md:w-auto md:order-1 shadow-xl border md:shadow-none md:border-0 hidden`}
          >
            <ul className="flex flex-col p-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white ">
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
                <LinkComponent href="/dex/swap" className={activeLink === 'dex' ? activeLinkClass : linkClass}>
                  Swap
                </LinkComponent>
              </li>
              <li>
                <a href="http://myxdc.org/help" className={linkClass} target="_blank" rel="noopener noreferrer">
                  Help
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </nav>
  )
}
