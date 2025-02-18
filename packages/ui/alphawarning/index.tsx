'use client'
import React from 'react'

import { Button } from '../button'

export function AlphaWarning() {
  const [show, setShow] = React.useState(
    typeof window !== 'undefined' && localStorage.getItem('myxdc:alpha:accept') != 'true'
  )

  function onAgree() {
    localStorage.setItem('myxdc:alpha:accept', 'true')
    setShow(false)
  }

  React.useEffect(() => {
    const lastAlertTime = localStorage.getItem('lastAlertTime')
    const currentTime = new Date().getTime()

    // If no alert was shown or if 10 minutes have passed
    if (!lastAlertTime || currentTime - lastAlertTime >= 600000) {
      localStorage.setItem('lastAlertTime', currentTime)
      alert('Please move your funds to other wallets, and do not use the Swap. MyXDC may be taken down in the future.')
    }
  }, [])

  if (!show) {
    return null
  }

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-40 flex items-center justify-center ">
      <div className="absolute top-0 bottom-0 left-0 right-0 z-0 bg-black opacity-75 bg-gradient-to-b from-black to-transparent blur-4" />
      <div className="relative z-10 flex flex-col w-full max-w-lg px-4 py-6 m-2 bg-white shadow-md rounded-2xl">
        <h2 className="mb-4 text-xl font-bold">Disclaimer</h2>
        <p className="mb-4 text-base leading-relaxed">
          This is an Alpha version of MyXDC and is still undergoing testing and development.{' '}
          <b>Please be aware that there may be bugs, unfinished features, and other issues present.</b> Use at your own
          risk and do not store large amounts of assets in the wallet. We appreciate your feedback and suggestions as we
          continue to improve and refine the product. Thank you for your support!
        </p>
        <p className="mb-4 text-base leading-relaxed">
          Please report any issues or provide feedback by submitting an issue on our{' '}
          <a href="https://github.com/myxdc" target="_blank" rel="noreferrer" className="text-blue-500 underline">
            Github
          </a>
        </p>
        <footer className="flex justify-end">
          <Button variant="primary" onClick={onAgree} className="px-4 py-2 rounded-sm">
            I understand and agree
          </Button>
        </footer>
      </div>
    </div>
  )
}
