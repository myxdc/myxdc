import React from 'react'

export const CenterNavbar = () => {
  return (
    <nav className="fixed relative top-0 left-0 z-20 flex justify-center w-full py-6 sm:px-4">
      <a href="/" className="flex items-center">
        <img src="/assets/img/logo.svg" className="h-8 sm:mr-2 sm:h-9" alt="MyXDC Logo" />
        <span className="self-center text-xl font-extrabold text-gray-700 whitespace-nowrap">MyXDC</span>
      </a>
    </nav>
  )
}
