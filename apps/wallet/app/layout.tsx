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
          <div className="h-16 mb-4">
            <Navbar />
          </div>
          <TokensProvider>{children}</TokensProvider>
          <Toaster />
        </WalletProvider>
      </body>
    </html>
  )
}
