import { Typography } from '@myxdc/ui'

import { MetamaskBox } from './MetamaskBox'

export default function Page() {
  return (
    <>
      <div className="text-center">
        <Typography variant="h2" as="h1" weight={800}>
          Connect to MetaMask
        </Typography>
        <Typography variant="h5" as="p" className="max-w-xl mt-4">
          You need MetaMask extension to connect your account. If you don&apos;t have one, you need to install it first.
        </Typography>
      </div>
      <div className="my-4">
        <MetamaskBox />
      </div>
    </>
  )
}
