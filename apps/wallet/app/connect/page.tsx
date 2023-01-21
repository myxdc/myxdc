import { ConnectSelector, Typography } from '@myxdc/ui'
import React from 'react'

export default function page() {
  return (
    <>
      <div className="text-center">
        <Typography variant="h2" as="h1" weight={800}>
          Connect Your Wallet
        </Typography>
        <Typography variant="h5" as="p" className="max-w-xl mt-4">
          Securely store, manage and trade your XDC tokens and compatible assets with MyXDC Wallet.
        </Typography>
      </div>
      <div className="my-4">
        <ConnectSelector />
      </div>
    </>
  )
}
