'use client'
import { useNftMetadata } from '@myxdc/hooks/nfts/useNftMetadata'
import { NftBox } from '@myxdc/ui'
import { toChecksumAddress, toXDCAddress } from '@myxdc/utils/web3'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function Page({ params: { contractId, tokenId } }: { params: { contractId: string; tokenId: string } }) {
  const { nftData, isLoading, error } = useNftMetadata({
    contractAddress: toChecksumAddress(contractId),
    tokenId: tokenId,
  })

  if (error) {
    toast.error(error.message)
  }

  return (
    <>
      <NftBox
        description={nftData?.description}
        image={nftData?.image}
        name={nftData?.name}
        owner={nftData?.owner ? toXDCAddress(nftData?.owner) : undefined}
      />

      <Link className="block mt-6 text-center text-gray-800 text-md" href="/wallet/nfts">
        Back
      </Link>
    </>
  )
}
