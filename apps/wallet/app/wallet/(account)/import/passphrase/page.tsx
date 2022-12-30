'use client'

import { useWallet } from '@myxdc/hooks/useWallet'
import { Button, Input, Spinner, Typography } from '@myxdc/ui'
import { isValidMnemonic } from '@myxdc/utils/web3/wallet'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function Page() {
  const wallet = useWallet()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleImport() {
    // @ts-ignore
    const passphrase = document.querySelector('#passphrase')?.value
    // check if passphrase is valid
    if (!passphrase || passphrase.length === 0) {
      toast.error('Passphrase is required')
      return
    }
    if (!isValidMnemonic(passphrase)) {
      toast.error('Invalid passphrase')
      return
    }
    setLoading(true)
    wallet.importFromMnemonic(passphrase)
    toast.success('Successfully imported accounts from passphrase')
    router.push('/wallet')
  }

  if (loading)
    return (
      <div className="flex items-center justify-center w-full h-full mb-6">
        <Spinner />
      </div>
    )

  return (
    <>
      <Typography variant="h2" as="h1" weight={600} className="text-center text-primary-700">
        Import Using Passphrase
      </Typography>
      <Typography className="max-w-lg mx-auto mt-4 text-center" variant="p">
        Enter the mnemonic passphrase associated with your account, and we&apos;ll import your account.
      </Typography>
      <div className="p-6 mt-6 mb-0 space-y-4 bg-white rounded-lg shadow-2xl">
        <Typography className="text-center" variant="p">
          Passphrase:
        </Typography>
        <Input
          type="text"
          placeholder={'Type your passphrase here...'}
          onKeyPress={(e: any) => {
            if (e.key === 'Enter') {
              handleImport()
            }
          }}
          id="passphrase"
        />

        <Button className="w-full" onClick={handleImport}>
          Import Account
        </Button>
        <p className="mt-5 text-center">
          <Link className="text-gray-800 text-md" href="/wallet/import">
            Back
          </Link>
        </p>
      </div>
    </>
  )
}
