import { Typography } from '@myxdc/ui'

import { MnemonicInput } from './MnmonicInput'

export default function Page() {
  return (
    <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto">
        <Typography variant="h2" as="h1" weight={600} className="text-center text-primary-700">
          Import Using Mnemonic Phrase
        </Typography>
        <Typography className="max-w-lg mx-auto mt-4 text-center" variant="p">
          Enter the mnemonic phrase associated with your account, and we&apos;ll import your account.
        </Typography>
        <div className="p-6 mt-6 mb-0 space-y-4 bg-white rounded-lg shadow-2xl">
          <MnemonicInput />
        </div>
      </div>
    </div>
  )
}