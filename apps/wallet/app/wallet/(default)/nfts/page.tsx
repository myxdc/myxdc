'use client'
import { useUserNfts } from '@myxdc/hooks/nfts/useUserNfts'
import { useAccount } from '@myxdc/hooks/wallet/useAccount'
import { Spinner } from '@myxdc/ui'
import Link from 'next/link'
import { toast } from 'react-hot-toast'

// TODO: Add pagination to NFTs
export default function Page() {
  const { activeAccount } = useAccount()
  const { nfts, isLoading, error } = useUserNfts({ address: activeAccount?.address })

  if (error) {
    toast.error(error.message)
  }

  if (isLoading) {
    return <Spinner />
  }

  if (nfts?.items?.length > 0) {
    return (
      <div className="flex flex-col gap-8 p-6">
        {nfts?.items.map((collectible: any) => (
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
        {activeAccount ? (
          <div className="mt-2 text-gray-600">You don&apos;t have any NFTs yet.</div>
        ) : (
          <div className="mt-2 text-gray-600">Connect your wallet to view your NFTs.</div>
        )}
      </div>
    </div>
  )
}
