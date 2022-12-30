'use client'
import '@myxdc/ui/index.css'

import { TokensProvider } from '@myxdc/hooks/useTokens'
import { WalletProvider } from '@myxdc/hooks/useWallet'

import Navbar from './navbar'
import Toaster from './toaster'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <WalletProvider>
          <div className="mb-4 h-14 md:h-16">
            <Navbar />
          </div>
          <TokensProvider>{children}</TokensProvider>
          <Toaster />
        </WalletProvider>
      </body>
    </html>
  )
}
