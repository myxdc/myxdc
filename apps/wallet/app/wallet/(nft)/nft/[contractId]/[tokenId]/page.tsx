'use client'
import XRC_721 from '@myxdc/constants/artifacts/XRC721.json'
import { useWallet } from '@myxdc/hooks/useWallet'
import { NftBox } from '@myxdc/ui'
import { isAddress, toChecksumAddress, toXDCAddress } from '@myxdc/utils/web3'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function Page({ params: { contractId, tokenId } }: { params: { contractId: string; tokenId: string } }) {
  const [NFT, setNFT] = useState<any>(undefined)
  const [owner, setOwner] = useState<string | undefined>(undefined)

  const { web3 } = useWallet()

  useEffect(() => {
    if (isAddress(contractId) == false) return
    const contract = new web3.eth.Contract(XRC_721.abi, toChecksumAddress(contractId))
    contract.methods
      .tokenURI(tokenId)
      .call()
      .then((uri: any) => {
        fetch(uri)
          .then((res) => res.json())
          .then((data) => {
            setNFT(data)
          })
          .catch((e) => {
            toast.error('Could not fetch NFT data: ' + e.message, { duration: 5000 })
          })
      })
      .catch((e: Error) => {
        toast.error('Could not fetch NFT data: ' + e.message, { duration: 5000 })
      })

    contract.methods
      .ownerOf(tokenId)
      .call()
      .then((owner: string) => {
        console.log('NFT Owner: ', owner)
        setOwner(owner)
      })
      .catch((e: Error) => {
        toast.error('Could not fetch NFT owner: ' + e.message)
      })
  }, [contractId, tokenId])

  return (
    <>
      <NftBox
        description={NFT?.description}
        image={NFT?.image}
        name={NFT?.name}
        owner={owner ? toXDCAddress(owner)! : undefined}
      />

      <Link className="block mt-6 text-center text-gray-800 text-md" href="/wallet/nfts">
        Back
      </Link>
    </>
  )
}
