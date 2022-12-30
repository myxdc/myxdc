import { ExternalIcon, Typography } from '@myxdc/ui'
import React from 'react'

const exchanges = [
  {
    id: 'bitrue',
    link: 'https://www.bitrue.com/act/kol/landing?cn=600000&inviteCode=QZWZGVL',
    name: 'Bitrue',
    logo: '/assets/img/exchanges/bitrue.png',
  },
  {
    id: 'kucoin',
    link: 'https://www.kucoin.com/r/rf/rMP2656',
    name: 'KuCoin',
    logo: '/assets/img/exchanges/kucoin.png',
  },
  {
    id: 'bybit',
    link: 'https://www.bybit.com/invite?ref=OLZ0PR',
    name: 'Bybit',
    logo: '/assets/img/exchanges/bybit.png',
  },
  {
    id: 'bitfinex',
    link: 'https://www.bitfinex.com/sign-up?refcode=umBUmHMP3',
    name: 'Bitfinex',
    logo: '/assets/img/exchanges/bitfinex.png',
  },
]

const bridges: any = []

export default function Page() {
  return (
    <main className="relative max-w-2xl pt-8 pb-32 mx-auto lg:px-8 sm:pb-40">
      <div className="p-8 bg-white rounded-lg ">
        <Typography variant="h2" as="h2" weight={600}>
          Supported Exchanges
        </Typography>
        <Typography variant="p" className="mt-3">
          XDC is available on the following exchanges. Please note that the following links may be affiliate links by
          MyXDC developers.
        </Typography>
        <div className="flex flex-col gap-6 mt-8">
          {exchanges.map((exchange) => (
            <a
              key={exchange.id}
              href={exchange.link}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 px-6 py-4 bg-gray-100 rounded-xl hover:bg-gray-200"
            >
              <img src={exchange.logo} alt={exchange.name} className="w-12 h-12 rounded-full" />
              <span className="text-lg font-bold">{exchange.name}</span>
              <ExternalIcon className="w-5 h-5 ml-auto" />
            </a>
          ))}
        </div>
      </div>
      <div className="p-8 mt-8 bg-white rounded-lg">
        <Typography variant="h2" as="h2" weight={600}>
          Bridges from Other Networks
        </Typography>
        <div className="flex flex-col gap-8 mt-4">
          {bridges?.map((bridge: any) => (
            <a key={bridge.id} href={bridge.link} target="_blank" rel="noreferrer" className="flex items-center gap-4">
              <img src={bridge.logo} alt={bridge.name} className="w-12 h-12 rounded-full" />
              <span className="text-lg font-bold">{bridge.name}</span>
            </a>
          ))}
          {bridges.length === 0 && (
            <Typography variant="p" className="mt-3">
              There are no bridges available at this time.
            </Typography>
          )}
        </div>
      </div>
    </main>
  )
}
