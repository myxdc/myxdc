import { DrawingLockIcon, DrawingLoginIcon, Typography } from '@myxdc/ui'
import Link from 'next/link'

export default function Page() {
  return (
    <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <Typography variant="h2" as="h1" weight={600} className="text-center text-primary-700">
          Import or Create Account
        </Typography>
        <Typography className="max-w-lg mx-auto mt-4 text-center" variant="p">
          A local account is stored in your browser&apos;s local storage. It&apos;s not backed up anywhere, so
          you&apos;ll need to remember your password and keep it safe.
        </Typography>
        <div className="p-6 mt-6 mb-0 text-center bg-white rounded-lg shadow-2xl">
          <Typography variant="h5" weight={600} className="pb-6">
            What do you want to do?
          </Typography>
          <div className="flex gap-4">
            <Link
              type="button"
              className="flex flex-col items-center justify-center px-1 border border-gray-200 w-52 h-52 md:w-64 md:h-64 hover:bg-gray-100 rounded-3xl"
              href="/wallet/connect/local/import"
            >
              <DrawingLoginIcon className="w-24 h-24 mx-auto mb-4 md:w-32 md:h-32" />
              <span> Import an existing account</span>
            </Link>
            <Link
              type="button"
              className="flex flex-col items-center justify-center px-1 border border-gray-200 w-52 h-52 md:w-64 md:h-64 hover:bg-gray-100 rounded-3xl"
              href="/wallet/connect/local/create"
            >
              <DrawingLockIcon className="w-24 h-24 mx-auto mb-4 md:w-32 md:h-32" />
              <span>Create a new account</span>
            </Link>
          </div>

          <p className="mt-6 text-center">
            <Link className="text-gray-800 text-md" href="/wallet/connect">
              Back
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
