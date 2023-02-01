import { Footer } from 'components/Footer'
import Navbar from 'components/Navbar'
import { PrivacyPolicy } from 'components/PrivacyPolicy'
import Head from 'next/head'

export default function PP() {
  return (
    <>
      <Head>
        <title>MyXDC | Privacy Policy</title>
        <meta name="description" content="MyXDC Privacy Policy. Last updated: 21st January 2023" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <PrivacyPolicy />
      <Footer />
    </>
  )
}
