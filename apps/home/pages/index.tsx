import { CallToAction } from 'components/CallToAction'
import { Features } from 'components/Features'
import { Footer } from 'components/Footer'
import Hero from 'components/Hero'
import Navbar from 'components/Navbar'
import { Sections } from 'components/Sections'
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
      <Features />
      <Sections />
      <CallToAction />
      <Footer />
    </>
  )
}
