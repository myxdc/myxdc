import { Features } from 'components/Features'
import Hero from 'components/Hero'
import { MainnetLaunch } from 'components/MainnetLaunch'
import Navbar from 'components/Navbar'
import Head from 'next/head'

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
