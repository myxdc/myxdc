'use client'
import { Navbar as NavbarUI } from '@myxdc/ui'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathnames = usePathname()?.split('/')

  return <NavbarUI activeLink={pathnames?.[1]} linkComponent={Link} />
}
