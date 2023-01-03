import '@myxdc/ui/index.css'

import Navbar from './navbar'
import Toaster from './toaster'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <div className="mb-4 h-14 md:h-16">
          <Navbar />
        </div>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
