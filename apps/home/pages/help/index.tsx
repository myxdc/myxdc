import HelpCenterBlock from 'components/HelpCenterBlock'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import StartImage from '../../public/hero.webp'
import LedgerImage from '../../public/ledger.webp'
import MetaMaskImage from '../../public/metamask.webp'
import HeroImage from '../../public/monitor.svg'
import HelpCenterLayout from './_layout'

export default function Help() {
  return (
    <HelpCenterLayout>
      <div className="max-w-screen-xl mx-auto bg-white">
        <div className="flex flex-col flex-wrap items-start px-8 py-20 mx-auto md:flex-row">
          <div className="flex flex-col items-start justify-center w-full md:w-3/6">
            <h1 className="pt-4 text-3xl font-medium leading-tight text-gray-900">MyXDC help center</h1>
            <div className="py-6 text-lg leading-relaxed text-gray-700">
              Welcome to the MyXDC help center. Here you can advice and answers from MyXDC team to help you get the most
              out of MyXDC. If you can&apos;t find what you&apos;re looking for, please send a message at{' '}
              <a className="text-blue-600" href="https://t.me/+CNTsYshGlWRjNWY8">
                our Telegram Group
              </a>
            </div>
            <Link
              className="w-full px-3 py-2 font-semibold text-center text-white bg-blue-600 rounded-full md:w-auto"
              href="/"
            >
              Go Home
            </Link>
          </div>
          <div className="w-full py-8 text-center md:w-3/6 md:py-0">
            <Image
              className="z-50 float-right max-w-full px-8"
              src={HeroImage}
              alt="hero image"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
      <h2 className="max-w-screen-xl px-8 mx-auto text-2xl font-semibold text-gray-900">Help topics</h2>
      <section className="flex flex-wrap max-w-screen-xl mx-auto mt-4 text-gray-600 body-font">
        <HelpCenterBlock
          category="INTRODUCTION"
          title="Getting Started"
          description="Learn how to create or import the existing wallet on MyNearWallet."
          link="/help/getting-started"
          image={StartImage}
        />
        <HelpCenterBlock
          category="FAQ"
          title="MetaMask Help"
          description="Find out how to use MetaMask to connect to MyXDC."
          link="/help/metamask"
          image={MetaMaskImage}
        />
        <HelpCenterBlock
          category="FAQ"
          title="Ledger Help"
          description="Find out how to use Ledger to connect to MyXDC."
          link="/help/ledger"
          image={LedgerImage}
        />
      </section>
    </HelpCenterLayout>
  )
}
