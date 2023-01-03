'use client'

import { useAccount } from '@myxdc/hooks/wallet/useAccount'
import { IconButton } from '@myxdc/ui'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const { activeAccount } = useAccount()
  const router = useRouter()

  React.useEffect(() => {
    if (!activeAccount) {
      router.replace('/wallet/connect')
    }
  }, [activeAccount])

  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !activeAccount) {
    return null
  }

  const paths = pathname?.split('/')
  return (
    <main className="relative max-w-xl pt-5 pb-32 mx-auto lg:px-8 sm:pb-40">
      <Link href={`/wallet`} className="flex items-center mb-4">
        <IconButton as={'span'} className="!w-11 !h-11 mr-1 rounded-full !bg-transparent" title="Back to Wallet">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M14.5 17L9.5 12L14.5 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </IconButton>
        <span>Back</span>
      </Link>
      <div className="overflow-hidden bg-white shadow-xl rounded-3xl">
        <div className="flex w-full rounded-t-3xl">
          <Link
            href="/wallet/send"
            className={
              'w-1/2 p-6 font-semibold text-center ' +
              (paths?.[2] == 'send'
                ? 'text-primary-600 bg-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-100 transition-colors duration-200')
            }
          >
            Send
          </Link>
          <Link
            href="/wallet/receive"
            className={
              'w-1/2 p-6 font-semibold text-center ' +
              (paths?.[2] == 'receive'
                ? 'text-primary-600 bg-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-100 transition-colors duration-200')
            }
          >
            Receive
          </Link>
        </div>
        <div className="p-8">{children}</div>
      </div>
    </main>
  )
}
