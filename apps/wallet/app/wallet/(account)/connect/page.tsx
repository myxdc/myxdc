import { LedgerIcon, LocalWalletIcon, MetaMaskIcon, Typography } from '@myxdc/ui'
import Link from 'next/link'
import React from 'react'

const CHOICES = [
  {
    id: 'local',
    title: 'Local Wallet',
    description: 'Create a new wallet or import an existing wallet.',
    href: '/wallet/connect/local',
  },
  {
    id: 'ledger',
    title: 'Ledger Hardware Wallet',
    description: 'Connect to your Ledger hardware wallet.',
    href: '/wallet/connect/ledger',
  },
  {
    id: 'metamask',
    title: 'Metamask',
    description: 'Connect to your Metamask wallet.',
    href: '/wallet/connect/metamask',
  },
]

export default function page() {
  return (
    <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Typography variant="h2" as="h1" weight={600} className="text-center text-primary-700">
          Connect Your Wallet
        </Typography>
        <Typography className="max-w-lg mx-auto mt-4 text-center" variant="p">
          MyXDC Wallet is a secure wallet and account manager for your accounts on the XDC network. You can use local
          accounts or connect to another wallet.
        </Typography>
        <div className="p-6 mt-6 mb-0 space-y-6 bg-white rounded-lg shadow-2xl">
          <Typography as="h3" variant="h4" weight={500} className="mb-6">
            Select a method to connect your wallet.
          </Typography>
          <div className="flex flex-col items-center justify-center w-full h-full gap-6">
            {CHOICES.map((option) => (
              <Choice
                title={option.title}
                description={option.description}
                key={option.id}
                id={option.id}
                href={option.href}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const Choice = ({ title, description, id, href }: any) => {
  return (
    <Link className="flex items-center w-full h-full gap-6 p-4 bg-gray-100 rounded-lg hover:bg-gray-200" href={href}>
      {id === 'local' && <LocalWalletIcon height={40} width={40} />}
      {id === 'ledger' && <LedgerIcon height={40} width={40} />}
      {id === 'metamask' && <MetaMaskIcon height={40} width={40} />}
      <div className="flex flex-col items-start justify-center w-full h-full gap-2 ">
        <Typography as="h3" variant="h5" weight={500}>
          {title}
        </Typography>
        <Typography variant="p">{description}</Typography>
      </div>
    </Link>
  )
}
