import { Container } from '@myxdc/ui'
import { Footer } from 'components/Footer'
import HelpCenterNavbar from 'components/HelpCenterNavbar'
import Head from 'next/head'
import React from 'react'

export default function HelpCenterLayout({ children }: any) {
  return (
    <>
      <Head>
        <title>MyXDC | Help Center</title>
        <meta name="description" content="Get help from MyXDC team" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HelpCenterNavbar />
      <Container className="mb-8">{children}</Container>
      <Footer />
    </>
  )
}
