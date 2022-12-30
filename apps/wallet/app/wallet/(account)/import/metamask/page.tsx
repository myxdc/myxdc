'use client'

import { useWallet } from '@myxdc/hooks/useWallet'
import { Button, Spinner, Typography } from '@myxdc/ui'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function Page() {
  const wallet = useWallet()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  function handleImport() {
    setLoading(true)
    wallet
      .importFromMetaMask()
      .then((res) => {
        toast.success('Successfully imported accounts from MetaMask')
        router.push('/wallet')
      })
      .catch((err) => {
        toast.error(err.message)
        console.log(err)
        setLoading(false)
      })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-full mb-6">
        <Spinner />
      </div>
    )
  }

  return (
    <>
      <Typography variant="h2" as="h1" weight={600} className="text-center text-primary-700">
        Connect to MetaMask
      </Typography>
      <Typography className="max-w-lg mx-auto mt-4 text-center" variant="p">
        You need MetaMask extension to connect your account. If you don&apos;t have one, you need to install it first.
      </Typography>
      <div className="p-6 mt-6 mb-0 space-y-4 text-center bg-white rounded-lg shadow-2xl">
        <Typography variant="p" weight={600} className="!mb-8">
          Follow these steps to connect your account:
        </Typography>
        <Typography variant="p">
          <b>1.</b> Install the MetaMask extension on your browser.
        </Typography>
        <Typography variant="p">
          <b>2.</b> Log in to your MetaMask account.
        </Typography>
        <Typography variant="p">
          <b>3.</b> Connect to the XDC Mainnet. <Link href="/help/metamask">(Need help?)</Link>
        </Typography>
        <Typography variant="p">
          <b>4.</b> Click the button below to import your accounts.
        </Typography>

        <Button className="w-full !mt-6" onClick={handleImport}>
          Authorize & Import Accounts
        </Button>
        <p className="flex justify-between mt-5">
          <Link className="text-gray-800 text-md" href="/wallet/import">
            Back
          </Link>
          <Link className="text-gray-800 text-md" href="/help/metamask">
            Still need help?
          </Link>
        </p>
      </div>
    </>
  )

  return (
    <div>
      <h1 className="text-3xl font-bold sm:text-4xl">Import Account from MetaMask</h1>
      <p className="mt-6 text-lg text-gray-600">
        Check that MetaMask is installed and that you are logged in. Then connect to the XDC Mainnet. Then, to import
        your accounts, click the button below.
      </p>

      <div className="mt-10">
        <button className="form-btn" onClick={handleImport}>
          Authorize & Import
        </button>
      </div>
    </div>
  )
}
