import '@myxdc/ui/index.css'

import { AlphaWarning } from '@myxdc/ui/alphawarning'

import { LoginWrapper } from './loginWrapper'
import Toaster from './toaster'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <LoginWrapper>{children}</LoginWrapper>
        <Toaster />
        <AlphaWarning />
      </body>
    </html>
  )
}
