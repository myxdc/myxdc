'use client'

import { useWallet } from '@myxdc/hooks/useWallet'
import { QRCode, Typography } from '@myxdc/ui'
import { toXDCAddress } from '@myxdc/utils/web3'
import React from 'react'

export default function Page() {
  const { account } = useWallet()

  if (!account?.address) return null
  const address = account?.address ? toXDCAddress(account?.address) : undefined
  return (
    <div className="text-center card">
      <Typography variant="h5" weight={600}>
        My Public Address
      </Typography>
      <Typography variant="p" className="mt-2 break-words">
        {address}
      </Typography>
      {/* <CopyButton text={address} className="mt-4" /> */}
      {account?.address && <QRCode value={address} size={256} className="w-64 h-64 mt-6" />}
      <p className="mt-5 text-base text-red-600">
        Send only XDC and XRC20 tokens to this address. Sending any other coin or token to this address will result in
        the loss of your deposit.
      </p>
    </div>
  )
}
