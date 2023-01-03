'use client'
import { useLocalWallet } from '@myxdc/hooks/wallet/useLocalWallet'
import { Button, Input, RefreshIcon, Typography } from '@myxdc/ui'
import { generateMnemonic } from '@myxdc/utils/web3/wallet'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

export default function Page() {
  const [step, setStep] = React.useState(1)
  const [phrase, setPhrase] = React.useState('- - - - - - - - - - - -')
  const [word, setWord] = React.useState(1)
  const [input, setInput] = React.useState('')
  const { importAccountFromMnemonic } = useLocalWallet()
  const router = useRouter()

  function handleContinue() {
    setWord(Math.floor(Math.random() * 12) + 1)
    setStep(2)
  }
  function handleVerify() {
    const inp = input.trim().toLowerCase()
    if (inp === phrase.split(' ')[word - 1].trim()) {
      handleSuccess()
    } else {
      toast.error('Incorrect word. Try again or start over.')
    }
  }
  async function handleSuccess() {
    await importAccountFromMnemonic(phrase)
      .then(() => {
        toast.success('Successfully created account')
        router.push('/wallet')
      })
      .catch((err) => {
        toast.error(err.message)
      })
  }

  function generateNew() {
    setPhrase(generateMnemonic().phrase)
  }
  React.useEffect(() => {
    generateNew()
  }, [])

  if (step === 1) {
    return (
      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto">
          <Typography variant="h2" as="h1" weight={600} className="text-center text-primary-700">
            Save Your Passphrase
          </Typography>
          <Typography className="max-w-lg mx-auto mt-4 text-center" variant="p">
            Write down the following words in the exact order and keep them somewhere safe. {` `}
            <b>
              If you lose your passphrase, you will lose access to your account and any XDC tokens or assets you have
            </b>
          </Typography>
          <div className="p-6 mt-6 mb-0 space-y-4 bg-white rounded-lg shadow-2xl">
            <div className="grid grid-cols-3 gap-4 mb-6">
              {phrase.length > 1 &&
                phrase.split(' ').map((word, index) => (
                  <div key={index} className="relative py-3 text-center bg-gray-100 rounded-lg">
                    <span className="absolute top-0 left-0 flex items-center justify-center w-6 h-6 rounded-full opacity-50 select-none text-primary-600">
                      {index + 1}
                    </span>
                    <span className="font-normal text-gray-900">{word}</span>
                  </div>
                ))}
            </div>
            <Button onClick={phrase.split(' ')[0].length > 1 ? handleContinue : () => null} className="w-full">
              I&apos;ve Written It Down
            </Button>
            <Button
              variant="secondary"
              className="w-full py-3 text-sm font-semibold"
              size="small"
              onClick={generateNew}
            >
              <RefreshIcon />
              Generate New
            </Button>
            <p className="mt-5 text-center">
              <Link className="text-gray-800 text-md" href="/wallet/connect/local">
                Back
              </Link>
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (step === 2) {
    return (
      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto">
          <Typography variant="h2" as="h1" weight={600} className="text-center text-primary-700">
            Verify Your Passphrase
          </Typography>
          <Typography className="max-w-lg mx-auto mt-4 text-center" variant="p">
            This is for your own safety. Please verify that you have written down your passphrase correctly.
          </Typography>

          <div className="p-6 mt-6 mb-0 space-y-4 bg-white rounded-lg shadow-2xl">
            <Typography className="text-center" variant="p">
              Enter the <b>#{word}</b> word of your passphrase.
            </Typography>
            <Input
              type="text"
              placeholder={'Enter word #' + word}
              onKeyPress={(e: any) => {
                if (e.key === 'Enter') {
                  handleVerify()
                }
              }}
              onChange={(e: any) => setInput(e.target.value)}
              value={input}
            />

            <Button className="w-full" onClick={handleVerify}>
              Verify &amp; Continue
            </Button>
            <p className="mt-5 text-center">
              <button className="text-gray-800 text-md" onClick={() => setStep(1)}>
                Start Over
              </button>
            </p>
          </div>
        </div>
      </div>
    )
  }
}
