import Link from 'next/link'
import React from 'react'

const NFT = {
  title: 'CryptoPunk #1',
  description: 'CryptoPunks are 24x24 pixel art images.',
  image: 'https://www.arweave.net/2q0j6_oYV0WJ_V1vR6ixWGhkqB_dXiZmCZotKWozdB4',
  owner: '0x495f947276749ce646f68ac8c248420045cb7b5e',
}

// TODO: Add a XRC721 transfer functionality
export default function Page({ params: { contractId, itemId } }: { params: { contractId: string; itemId: string } }) {
  return (
    <main className="relative max-w-2xl pt-4 pb-20 mx-auto lg:px-8">
      <div className="card">
        <div className="flex items-center mt-4">
          <img src={NFT.image} className="w-20 h-20 mr-4 rounded-lg" />
          <div className="flex-1">
            <div className="text-lg font-semibold">{NFT.title}</div>
            <div className="text-gray-600">{NFT.description}</div>
          </div>
        </div>
        <h1 className="text-3xl font-bold sm:text-4xl mt-9">Transfer NFT</h1>
        <p className="mt-8 text-lg text-gray-600">
          Enter the address of the new owner, and confirm the transaction to transfer this NFT.
        </p>
        <h5 className="mt-6 text-lg font-bold text-gray-600">Transfer to</h5>
        <input type="text" className="block w-full mt-1 form-input" placeholder="Address" />
        <Link href={`/nft/${contractId}/${itemId}/transfer`} className="mt-8 form-btn">
          Confirm
        </Link>
      </div>
    </main>
  )
}
