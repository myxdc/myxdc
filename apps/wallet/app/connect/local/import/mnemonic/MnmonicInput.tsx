'use client'
import { useLocalWallet } from '@myxdc/hooks/wallet/useLocalWallet'
import { Button, Input, Spinner, Typography } from '@myxdc/ui'
import { isValidMnemonic } from '@myxdc/utils/web3'
import Link from 'next/link'
import React from 'react'
import { toast } from 'react-hot-toast'

export const MnemonicInput = () => {
  const [input, setInput] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const { importAccountFromMnemonic } = useLocalWallet()

  async function handleImport() {
    if (!isValidMnemonic(input)) {
      toast.error('Invalid mnemonic phrase')
      return
    }
    setLoading(true)
    await importAccountFromMnemonic(input)
      .then(() => {
        toast.success('Successfully imported account from private key')
        setInput('')
      })
      .catch((err) => {
        toast.error(err.message)
        console.error(err)
      })
    setLoading(false)
  }

  return (
    <>
      {loading && (
        <div className="p-6 pb-16 mt-6 mb-0 space-y-2 bg-white rounded-lg shadow-2xl">
          <Spinner className="mx-auto" text={loading ? 'Connecting...' : 'Loading...'} />
        </div>
      )}
      {!loading && (
        <>
          <Typography className="text-center" variant="p">
            Mnemonic Phrase:
          </Typography>
          <Input
            type="text"
            placeholder="Type or paste your 12 words here..."
            onKeyPress={(e: any) => {
              if (e.key === 'Enter') {
                handleImport()
              }
            }}
            onChange={(e: any) => setInput(e.target.value)}
            value={input}
          />
          <Button className="w-full" onClick={handleImport}>
            Import Account
          </Button>
          <p className="mt-5 text-center">
            <Link className="text-gray-800 text-md" href="/connect/local/import">
              back
            </Link>
          </p>
        </>
      )}
    </>
  )
}
