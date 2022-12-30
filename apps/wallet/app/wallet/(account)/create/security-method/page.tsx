'use client'
import { Button, LargeCheckBox, Typography } from '@myxdc/ui'
import Link from 'next/link'
import React from 'react'

const wallet_options = [
  {
    id: 'ledger',
    link: '/wallet/import/ledger',
    title: 'Ledger Hardware Wallet (Most Secure)',
    description: 'A physical wallet that you can use to store your XDC tokens and assets safe from internet threats',
  },
  {
    id: 'mnemonic',
    link: '/wallet/create/setup-passphrase',
    title: 'Secure Passphrase (Most Convenient)',
    description: 'A 12-word passphrase that you can write down and store in a safe place',
  },
  {
    id: 'metamask',
    link: '/wallet/import/metamask',
    title: 'Metamask ',
    description: 'A browser extension that you can use to store your XDC tokens and assets',
  },
]
export default function Page() {
  const [selected, setSelected] = React.useState('mnemonic')

  return (
    <>
      <Typography variant="h2" as="h1" weight={600} className="text-center text-primary-700">
        Security Method
      </Typography>
      <Typography className="max-w-lg mx-auto mt-4 text-center" variant="p">
        A hardware wallet is better for storing large amounts of XDC, while a passphrase is better for daily use.
      </Typography>
      <form action="" className="p-6 mt-6 mb-0 space-y-4 bg-white rounded-lg shadow-2xl">
        <Typography as="h3" variant="h4" weight={500} className="mb-6">
          Select a method to secure your account.
        </Typography>
        <div className="flex flex-col items-center justify-center w-full h-full gap-4">
          {wallet_options.map((option) => (
            <LargeCheckBox
              title={option.title}
              description={option.description}
              key={option.id}
              onChange={(checked) => checked && setSelected(option.id)}
              checked={selected === option.id}
            />
          ))}
        </div>
        <Button as={Link} href={wallet_options.find((option) => option.id === selected)?.link || ''}>
          Continue
        </Button>
        <p className="mt-5 text-center text-gray-600 text-md">
          Already have an account?{` `}
          <Link className="text-gray-800 underline hover:no-underline" href="/wallet/import">
            Click here
          </Link>
        </p>
      </form>
    </>
  )
}
