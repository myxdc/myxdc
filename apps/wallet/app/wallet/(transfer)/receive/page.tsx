'use client'

import { useAccount } from '@myxdc/hooks/wallet/useAccount'
import { QRCode, Typography } from '@myxdc/ui'
import { CopyButton } from '@myxdc/ui/copybutton'
import { toXDCAddress } from '@myxdc/utils/web3'
import React from 'react'

export default function Page() {
  const { activeAccount } = useAccount()

  if (!activeAccount) return null
  const address = toXDCAddress(activeAccount.address)
  return (
    <div className="text-center">
      <Typography variant="h5" weight={600}>
        My Public Address
      </Typography>
      <Typography variant="p" className="mt-2 break-words">
        {address}
        <CopyButton text={address} className="ml-3" />
      </Typography>
      <QRCode value={address} size={256} className="w-64 h-64 mt-6" />
      <p className="mt-5 text-base text-red-600">
        Send only XDC and XRC20 tokens to this address. Sending any other coin or token to this address will result in
        the loss of your deposit.
      </p>
    </div>
  )
}
