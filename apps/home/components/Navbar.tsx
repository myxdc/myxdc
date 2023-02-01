import Link from 'next/link'

import Logo from './Logo'

const Navbar = () => {
  return (
    <nav className="top-0 z-20 bg-gray-100 bg-opacity-30 backdrop-filter backdrop-blur transition duration-200">
      <div className="container flex flex-wrap justify-between px-8 py-8 mx-auto mt-0 w-full max-w-screen-xl">
        <Link href="/" className="flex items-center">
          <Logo />
        </Link>
        <Link href="/help" className="flex items-center mr-8 ml-auto text-gray-700">
          Need help?
        </Link>
        <div className="">
          <Link
            href="https://app.myxdc.org/"
            className="inline-block px-6 py-3 text-sm font-semibold text-white rounded-full transition-colors bg-primary-600 hover:bg-primary-700"
          >
            Launch App
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
