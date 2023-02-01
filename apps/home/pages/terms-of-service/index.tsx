import { Footer } from 'components/Footer'
import Navbar from 'components/Navbar'
import { TermsOfService } from 'components/TermsOfService'
import Head from 'next/head'

export default function TOS() {
  return (
    <>
      <Head>
        <title>MyXDC | Terms of Service</title>
        <meta name="description" content="MyXDC Terms of Service. Last updated: 21st January 2023" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <TermsOfService />
      <Footer />
    </>
  )
}
