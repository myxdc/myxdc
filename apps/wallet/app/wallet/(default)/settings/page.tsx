'use client'

import { useWallet } from '@myxdc/hooks/useWallet'
import { Button, CloseIcon, IconButton, Typography } from '@myxdc/ui'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

const Page = () => {
  const [openPrivateKeyModal, setOpenPrivateKeyModal] = useState(false)
  const { account } = useWallet()

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 bg-white rounded-3xl">
      <Typography variant="h3" weight={500}>
        Settings
      </Typography>
      {/* //TODO: Implement Private Key Export and improve settings overall*/}
      <Button
        className="w-full mt-6"
        onClick={() => {
          if (account?.privateKey) {
            setOpenPrivateKeyModal(true)
          } else {
            toast.error('No private key found')
          }
        }}
        disabled={!account?.privateKey}
      >
        Export Private Key
      </Button>

      {openPrivateKeyModal && (
        <div
          className="fixed inset-0 z-20 flex items-center justify-center overflow-y-auto transition-opacity bg-gray-800 bg-opacity-60 backdrop-filter backdrop-blur-sm"
          onClick={(e) => {
            e.target === e.currentTarget && setOpenPrivateKeyModal(false)
          }}
          aria-labelledby="token-selector"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md px-4 py-6 bg-white shadow-lg md:px-8 md:py-8 rounded-3xl">
            <div className="flex items-center justify-between">
              <Typography variant="h4" weight={600} as="h2">
                Private Key
              </Typography>
              <IconButton
                type="button"
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setOpenPrivateKeyModal(false)}
              >
                <CloseIcon className="w-6 h-6" />
              </IconButton>
            </div>
            <div className="p-4 mt-6 text-gray-400 bg-gray-600 rounded-lg">
              <Typography variant="tiny" weight={500} className="break-words">
                {account?.privateKey}
              </Typography>
            </div>
            <Typography variant="base" weight={400} className="mt-4 text-red-600">
              Please keep your private key safe. If someone else gets access to it, they can steal all your funds.
            </Typography>
          </div>
        </div>
      )}
    </div>
  )
}

export default Page
