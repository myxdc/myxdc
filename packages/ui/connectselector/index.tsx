import Link from 'next/link'
import React from 'react'

import { LedgerIcon, LocalWalletIcon, MetaMaskIcon } from '../icons'
import { Typography } from '../typography'

const CHOICES = [
  {
    id: 'local',
    title: 'Local Wallet',
    description: 'Create a new wallet or import an existing wallet.',
    href: '/connect/local',
  },
  {
    id: 'ledger',
    title: 'Ledger Hardware Wallet',
    description: 'Connect to your Ledger hardware wallet.',
    href: '/connect/ledger',
  },
  {
    id: 'metamask',
    title: 'Metamask',
    description: 'Connect to your Metamask wallet.',
    href: '/connect/metamask',
  },
]

export const ConnectSelector = () => {
  return (
    <div className="p-6 mt-6 mb-0 space-y-6 bg-white shadow-2xl md:p-8 md:pb-10 rounded-3xl">
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
