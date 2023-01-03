import { Typography } from '@myxdc/ui'

import { MetamaskBox } from './MetamaskBox'

export default function Page() {
  return (
    <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto">
        <Typography variant="h2" as="h1" weight={600} className="text-center text-primary-700">
          Connect to MetaMask
        </Typography>
        <Typography className="max-w-lg mx-auto mt-4 text-center" variant="p">
          You need MetaMask extension to connect your account. If you don&apos;t have one, you need to install it first.
        </Typography>
        <MetamaskBox />
      </div>
    </div>
  )
}
