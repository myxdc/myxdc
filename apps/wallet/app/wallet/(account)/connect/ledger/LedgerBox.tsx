'use client'

import { useLedger } from '@myxdc/hooks/wallet/useLedger'
import { Button, LedgerIcon, Spinner, Typography } from '@myxdc/ui'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

export const LedgerBox = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [input, setInput] = useState('0')
  const { accounts, importAccount } = useLedger()

  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => {
    setHasMounted(true)
  }, [])

  async function handleImport() {
    setIsLoading(true)
    await importAccount(Number(input || 0))
      .then(() => {
        toast.success('Connected to Ledger!')
      })
      .catch((err) => {
        toast.error(err.message)
        console.error(err)
      })
    setIsLoading(false)
  }

  return (
    <>
      {(isLoading || !hasMounted) && (
        <div className="p-6 pb-16 mt-6 mb-0 bg-white rounded-lg shadow-2xl">
          <Spinner className="mx-auto" text={isLoading ? 'Connecting...' : 'Loading...'} />
        </div>
      )}
      {hasMounted && !isLoading && (
        <div className="p-6 mt-6 mb-0 space-y-2 bg-white rounded-lg shadow-2xl">
          <LedgerIcon className="w-32 h-32 mx-auto" />
          <Typography variant="p" weight={600} className="pt-4 pb-4">
            Follow these steps to connect your account:
          </Typography>
          <Typography variant="p">
            <b>1.</b> Install the XDC Network app on your ledger.
          </Typography>
          <Typography variant="p">
            <b>2.</b> Connect your ledger to your computer and unlock it.
          </Typography>
          <Typography variant="p">
            <b>3.</b> Open the XDC Network app on your Ledger.
          </Typography>
          <Typography variant="p">
            <b>4.</b> (Optional) Type a number below, each number represents a different account.
          </Typography>
          <Typography variant="p">
            <b>5.</b> Click the button below to authorize and import your account.
          </Typography>

          <div className="py-6">
            <Typography variant="p" weight={600}>
              Account Index (Optional)
            </Typography>
            <div className="px-3 py-2 text-base text-gray-700 placeholder-gray-500 border rounded-lg focus:shadow-outline w-fit">
              <span>44&apos;/550&apos;/0/0/</span>
              <input
                type="number"
                min="0"
                max="99"
                placeholder="0"
                className={
                  'font-medium border-none outline-none w-14 focus:outline-none ' +
                  (Number(input) in accounts ? 'text-red-500' : 'text-primary-600')
                }
                value={input}
                onChange={(e) => {
                  if (Number(e.target.value) > 99 && e.target.value !== '') return
                  setInput(e.target.value)
                }}
              />
            </div>
          </div>

          <div className="pt-4">
            {Number(input) in accounts ? (
              <Button className="w-full text-red-900 cursor-default from-red-400 to-red-300">
                Already Imported (try another index)
              </Button>
            ) : (
              <Button className="w-full " onClick={handleImport}>
                Authorize & Import Account
              </Button>
            )}
          </div>
          <p className="flex justify-between pt-4">
            <Link className="text-gray-800 text-md" href="/wallet/connect">
              Back
            </Link>
            <Link className="text-gray-800 text-md" href="/help/ledger">
              Still need help?
            </Link>
          </p>
        </div>
      )}
    </>
  )
}
