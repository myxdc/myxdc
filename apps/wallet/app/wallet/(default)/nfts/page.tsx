'use client'
import { useWallet } from '@myxdc/hooks/useWallet'
import { Spinner } from '@myxdc/ui'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const CHAIN_ID = Number(process.env.NEXT_PUBLIC_CHAIN_ID)

async function getAccountNFTs(address: string, page: number) {
  // address = 'xdc18edfe1e49ca89157384832482c66e95ea9b0fca'
  const res = await fetch(
    CHAIN_ID === 51
      ? `https://explorer.apothem.network/api/tokens/holding/xrc721/${address}?page=${page}&limit=10`
      : `https://explorer.xinfin.network/api/tokens/holding/xrc721/${address}?page=${page}&limit=10`
  )
  if (!res.ok) {
    throw new Error('Failed to fetch account NFTs')
  }
  return res.json()
}

// TODO: Add pagination to NFTs
export default function Page() {
  const [nftData, setNftData] = useState<any>(null)
  const { account } = useWallet()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!account?.address) return
    getAccountNFTs(account.address, 1).then((data) => {
      setNftData(data)
      setLoading(false)
    })
  }, [account])

  if (loading) {
    return <Spinner />
  }

  if (nftData?.items?.length > 0) {
    return (
      <div className="flex flex-col gap-8 p-6">
        {nftData?.items.map((collectible: any) => (
          <Link
            className="flex items-center"
            key={collectible._id}
            href={'/wallet/nft/' + collectible.token + '/' + collectible.tokenId}
          >
            <img src={collectible.tokenImage} className="w-20 h-20 mr-4 rounded-lg bg-primary-200" />
            <div className="flex-1">
              <div className="text-lg font-semibold">{collectible.tokenName}</div>
              <div className="text-gray-600">{collectible.tokenDescription}</div>
            </div>
          </Link>
        ))}
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-8 p-6">
      <div className="text-center">
        <img src="/assets/img/nft.png" className="object-contain w-32 h-32 mx-auto opacity-90" />
        <div className="mt-4 text-lg font-semibold">No NFTs</div>
        <div className="mt-2 text-gray-600">You don&apos;t have any NFTs yet.</div>
      </div>
    </div>
  )
}
