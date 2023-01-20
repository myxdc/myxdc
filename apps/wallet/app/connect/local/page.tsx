import { Button, DrawingLockIcon, DrawingLoginIcon, Typography } from '@myxdc/ui'
import Link from 'next/link'

export default function Page() {
  return (
    <>
      <div className="text-center">
        <Typography variant="h2" as="h1" weight={800}>
          Import or Create Account
        </Typography>
        <Typography variant="h5" as="p" className="max-w-xl mt-4">
          A local account is stored in your browser&apos;s local storage. It&apos;s not backed up anywhere, so
          you&apos;ll need to remember your password and keep it safe.
        </Typography>
      </div>
      <div className="w-full max-w-lg p-6 mx-4 mt-6 mb-0 space-y-6 bg-white shadow-2xl md:p-8 md:pb-6 rounded-3xl">
        <Typography as="h3" variant="h4" weight={500} className="mb-6">
          What do you want to do?
        </Typography>
        <div className="flex w-full gap-4">
          <Link
            type="button"
            className="flex flex-col items-center justify-center flex-1 m-2 font-semibold aspect-square hover:bg-gray-100 rounded-3xl"
            href="/connect/local/import"
          >
            <DrawingLoginIcon className="w-24 h-24 mx-auto mb-4" />
            <span> Import account</span>
          </Link>
          <Link
            type="button"
            className="flex flex-col items-center justify-center flex-1 m-2 font-semibold aspect-square hover:bg-gray-100 rounded-3xl"
            href="/connect/local/create"
          >
            <DrawingLockIcon className="w-24 h-24 mx-auto mb-4" />
            <span>Create account</span>
          </Link>
        </div>
        <p className="mt-12 text-center">
          <Link className="text-gray-800 text-md" href="/connect">
            back
          </Link>
        </p>
      </div>
    </>
  )
}
