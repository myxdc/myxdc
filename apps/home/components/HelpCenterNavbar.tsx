import Link from 'next/link'
import React from 'react'
import Logo from './Logo'

const HelpCenterNavbar = () => {
  return (
    <nav className="sticky top-0 z-10 w-full bg-white">
      <div className="container flex flex-wrap justify-between w-full max-w-screen-xl px-8 py-8 mx-auto mt-0">
        <Link className="flex items-center text-lg text-gray-700" href="/help">
          <Logo />
          <span className="w-px h-full mx-4 bg-gray-400"></span>
          Help Center
        </Link>
      </div>
      <div className="w-full h-px bg-gray-300"></div>
    </nav>
  )
}

export default HelpCenterNavbar
