import { Typography } from '@myxdc/ui'

import { PrivateKeyInput } from './PrivateKeyInput'

export default function Page() {
  return (
    <>
      <div className="text-center">
        <Typography variant="h2" as="h1" weight={800}>
          Import Using Private Key
        </Typography>
        <Typography variant="h5" as="p" className="max-w-xl mt-4">
          Enter the private key associated with your account, and we&apos;ll import your account.
        </Typography>
      </div>
      <div className="w-full max-w-lg p-6 my-4 mt-6 mb-4 space-y-4 bg-white shadow-2xl rounded-3xl">
        <PrivateKeyInput />
      </div>
    </>
  )
}
