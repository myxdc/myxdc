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
      {(isLoading || !hasMounted) && <Spinner className="mx-auto" text={isLoading ? 'Connecting...' : 'Loading...'} />}
      {hasMounted && !isLoading && (
        <div className="max-w-lg p-6 mx-4 mt-6 mb-0 space-y-6 bg-white shadow-2xl md:p-8 rounded-3xl">
          <LedgerIcon className="mx-auto w-28 h-28" />
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

          <div className="py-4">
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
          <p className="flex justify-between pt-1">
            <Link className="text-gray-800 text-md" href="/connect">
              back
            </Link>
            <a
              className="text-gray-800 text-md"
              href="https://myxdc.org/help/ledger"
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
