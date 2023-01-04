import Link from 'next/link'
import Logo from './Logo'

const Navbar = () => {
  return (
    <nav className="top-0 z-20 px-4 py-4 transition duration-200 bg-gray-100 border-b border-gray-200 backdrop-filter backdrop-blur bg-opacity-30">
      <div className="container flex items-center w-full py-4 mx-auto">
        <Link href="/" className="flex items-center">
          <Logo />
        </Link>
        <Link href="/help" className="flex items-center ml-auto mr-8 text-gray-700">
          Need help?
        </Link>
        <div className="">
          <Link
            href="https://testnet.myxdc.org/"
            className="inline-block px-4 py-2 text-sm font-semibold text-gray-300 bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 "
          >
            Enter App
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
