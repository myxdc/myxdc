import { Button, Typography } from '@myxdc/ui'
import Link from 'next/link'

export default function Page() {
  return (
    <>
      <Typography variant="h2" as="h1" weight={600} className="text-center text-primary-700">
        Create New Account
      </Typography>
      <Typography className="max-w-lg mx-auto mt-4 text-center" variant="p">
        You can use MyXDC to create a new XDC account or manage your already existing XDC accounts.
      </Typography>

      <div className="p-6 mt-6 mb-0 space-y-4 bg-white rounded-lg shadow-2xl">
        <Typography className="max-w-lg mx-auto mt-4 text-center" variant="p">
          We highly recommend you to use a hardware wallet account like Ledger to store the majority of your funds. And
          use a local account to store a small amount of funds for daily use.
        </Typography>
        <Typography className="max-w-lg mx-auto mt-4 text-center" variant="p">
          You can create as many accounts as you need.
        </Typography>

        <Button as={Link} href="/wallet/create/security-method">
          Get Started
        </Button>
        <p className="mt-5 text-center text-gray-600 text-md">
          Wanna use MetaMask or import an existing account?{` `}
          <Link className="text-gray-800 underline hover:no-underline" href="/wallet/import">
            Click here
          </Link>
        </p>
      </div>
    </>
  )
}
