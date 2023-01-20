import { Typography } from '@myxdc/ui'

import { LedgerBox } from './LedgerBox'

export default function Page() {
  return (
    <>
      <div className="text-center">
        <Typography variant="h2" as="h1" weight={800}>
          Connect to Ledger
        </Typography>
        <Typography variant="h5" as="p" className="max-w-xl mt-4">
          You need a Ledger device to connect your account. If you don&apos;t have one, you need to purchase one first.
        </Typography>
      </div>
      <div className="my-4">
        <LedgerBox />
      </div>
    </>
  )
}
