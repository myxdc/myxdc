import Link from 'next/link'
import { useEffect, useState } from 'react'
import Countdown from 'react-countdown'

export const MainnetLaunch = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="w-full text-white py-36 bg-gradient-to-br from-primary-900 to-black">
      <div className="container flex flex-col items-center justify-center w-full h-full mx-auto">
        <h2 className="text-4xl font-bold text-center">Mainnet Launch</h2>
        <p className="mt-4 text-center">
          MyXDC is launching on the XDC Mainnet on 1st February 2023. Stay tuned while we make sure the app is secure
          ready for you!
        </p>
        <div className="flex items-center justify-center mt-8">
          {mounted && (
            <Countdown
              onMount={({ completed }) => completed && console.log('Completed!')}
              date={new Date('2023-02-01T00:00:00')}
              renderer={({ days, hours, minutes, seconds, completed }) => {
                if (completed) {
                  return <span>MyXDC is live!</span>
                } else {
                  return (
                    <div className="flex items-center justify-center">
                      <div className="flex flex-col items-center justify-center w-24 h-24 p-4 mx-2 text-center text-gray-900 bg-white rounded-lg">
                        <span className="text-2xl font-bold">{days}</span>
                        <span className="text-sm">Days</span>
                      </div>
                      <div className="flex flex-col items-center justify-center w-24 h-24 p-4 mx-2 text-center text-gray-900 bg-white rounded-lg">
                        <span className="text-2xl font-bold">{hours}</span>
                        <span className="text-sm">Hours</span>
                      </div>
                      <div className="flex flex-col items-center justify-center w-24 h-24 p-4 mx-2 text-center text-gray-900 bg-white rounded-lg">
                        <span className="text-2xl font-bold">{minutes}</span>
                        <span className="text-sm">Minutes</span>
                      </div>
                      <div className="flex flex-col items-center justify-center w-24 h-24 p-4 mx-2 text-center text-gray-900 bg-white rounded-lg">
                        <span className="text-2xl font-bold">{seconds}</span>
                        <span className="text-sm">Seconds</span>
                      </div>
                    </div>
                  )
                }
              }}
            />
          )}
        </div>
        <div className="flex items-center justify-center mt-8">
          <Link
            href="https://testnet.myxdc.org/"
            className="inline-block px-4 py-2 text-sm font-semibold text-black bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
          >
            Try it out on Testnet
          </Link>
        </div>
      </div>
    </div>
  )
}
