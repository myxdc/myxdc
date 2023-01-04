import Head from 'next/head'
import { Inter } from '@next/font/google'
import Hero from 'components/Hero'
import Navbar from 'components/Navbar'
import { MainnetLaunch } from 'components/MainnetLaunch'
import { Features } from 'components/Features'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>MyXDC | Securely store, manage, swap and stake your XDC</title>
        <meta
          name="description"
          content="MyXDC is a web app that allows you to securely store, manage, swap and stake your XDC assets"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Hero />
      <MainnetLaunch />
      <Features />
    </>
  )
}
