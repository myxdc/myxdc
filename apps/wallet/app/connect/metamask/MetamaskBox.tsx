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
        <div className="flex pb-6 mt-6 mb-0 w-96 max-w-lg bg-white rounded-3xl shadow-2xl aspect-square">
          <Spinner className="!m-auto" text={isLoading ? 'Connecting...' : 'Loading...'} />
        </div>
      )}
      {hasMounted && accounts?.length > 0 && (
        <div className="p-6 mt-6 mb-0 space-y-4 max-w-lg bg-white rounded-3xl shadow-2xl md:p-8">
          <MetaMaskIcon className="mx-auto w-32 h-32" />
          <Typography variant="p" weight={600} className="pt-4 pb-4 text-center">
            You&apos;re connected to MetaMask!
          </Typography>
        </div>
      )}
      {hasMounted && !isLoading && accounts.length < 1 && (
        <div className="p-6 mt-6 mb-0 space-y-4 max-w-lg bg-white rounded-3xl shadow-2xl md:p-8">
          <MetaMaskIcon className="mx-auto w-32 h-32" />
          <Typography variant="p" weight={600} className="pt-2 pb-2">
            Follow these steps to connect your account:
          </Typography>
          <Typography variant="p">
            <b>1.</b> Install the MetaMask extension on your browser.
          </Typography>
          <Typography variant="p">
            <b>2.</b> Log in to your MetaMask account.
          </Typography>
          <Typography variant="p">
            <b>3.</b> Connect to the XDC Mainnet.{' '}
            <a href="https://myxdc.org/help/metamask" target="_blank" rel="noreferrer noopener">
              (Need help?)
            </a>
          </Typography>
          <Typography variant="p">
            <b>4.</b> Click the button below to import your accounts.
          </Typography>

          <div className="pt-6">
            <Button className="w-full" onClick={handleImport}>
              Authorize & Import Accounts
            </Button>
          </div>
          <p className="flex justify-between pt-1">
            <Link className="text-gray-800 text-md" href="/connect">
              back
            </Link>
            <a
              className="text-gray-800 text-md"
              href="https://myxdc.org/help/metamask"
              target="_blank"
              rel="noreferrer noopener"
            >
              Still need help?
            </a>
          </p>
        </div>
      )}
    </>
  )
}
