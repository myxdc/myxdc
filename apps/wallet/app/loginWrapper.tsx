'use client'
import { useAccount } from '@myxdc/hooks/wallet/useAccount'
import { Typography } from '@myxdc/ui'
import { Navbar as NavbarUI } from '@myxdc/ui'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import Logo from '../public/assets/img/logo.svg'

export const LoginWrapper = ({ children }: { children: React.ReactNode }) => {
  const { activeAccount } = useAccount()
  const [isMounted, setIsMounted] = useState(false)
  const pathnames = usePathname()?.split('/')

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true)
    }
  }, [])

  if (!isMounted) {
    return <div />
  }

  if (!activeAccount) {
    if (pathnames?.[1] !== 'connect') {
      window.location.href = '/connect'
      return null
    }
    return (
      <>
        <div className="relative z-10 flex items-center justify-center gap-2 py-4 sm:py-6 lg:py-[3vh]">
          <Image src={Logo} alt="MyXDC Logo" width={42} height={42} priority={true} loading="eager" />
          <Typography variant="h4" weight={800}>
            MyXDC
          </Typography>
        </div>
        {children}
      </>
    )
  }

  return (
    <>
      <div className="w-full">
        <NavbarUI activeLink={pathnames?.[1]} linkComponent={Link} />
      </div>
      {children}
    </>
  )
}
