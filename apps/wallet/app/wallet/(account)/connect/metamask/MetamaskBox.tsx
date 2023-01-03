'use client'

import { useMetaMask } from '@myxdc/hooks/wallet/useMetaMask'
import { Button, MetaMaskIcon, Spinner, Typography } from '@myxdc/ui'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

export const MetamaskBox = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { accounts, connectMetaMask } = useMetaMask()

  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => {
    setHasMounted(true)
  }, [])

  async function handleImport() {
    setIsLoading(true)
    await connectMetaMask()
      .then(() => {
        toast.success('Connected to MetaMask!')
      })
      .catch((err) => {
        toast.error(err.message)
      })
    setIsLoading(false)
  }

  return (
    <>
      {(isLoading || !hasMounted) && (
        <div className="p-6 pb-16 mt-6 mb-0 space-y-2 bg-white rounded-lg shadow-2xl">
          <Spinner className="mx-auto" text={isLoading ? 'Connecting...' : 'Loading...'} />
        </div>
      )}
      {hasMounted && accounts?.length > 0 && (
        <div className="p-6 mt-6 mb-0 space-y-2 bg-white rounded-lg shadow-2xl">
          <MetaMaskIcon className="w-32 h-32 mx-auto" />
          <Typography variant="p" weight={600} className="pt-4 pb-4 text-center">
            You&apos;re connected to MetaMask!
          </Typography>
        </div>
      )}
      {hasMounted && !isLoading && accounts.length < 1 && (
        <div className="p-6 mt-6 mb-0 space-y-2 bg-white rounded-lg shadow-2xl">
          <MetaMaskIcon className="w-32 h-32 mx-auto" />
          <Typography variant="p" weight={600} className="pt-4 pb-4">
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

          <div className="pt-8">
            <Button className="w-full " onClick={handleImport}>
              Authorize & Import Accounts
            </Button>
          </div>
          <p className="flex justify-between pt-4">
            <Link className="text-gray-800 text-md" href="/wallet/connect">
              Back
            </Link>
            <Link className="text-gray-800 text-md" href="/help/metamask">
              Still need help?
            </Link>
          </p>
        </div>
      )}
    </>
  )
}
