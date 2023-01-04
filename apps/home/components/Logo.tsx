import Image from 'next/image'
import React from 'react'
import LogoImage from '../public/logo.svg'

export default function Logo() {
  return (
    <>
      <Image src={LogoImage} className="sm:mr-2" alt="MyXDC Logo" height={36} width={36} />
      <span className="self-center hidden text-xl font-extrabold text-gray-700 whitespace-nowrap md:block">MyXDC</span>
    </>
  )
}
