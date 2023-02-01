import React from 'react'

export const Features = () => {
  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl xl:text-4xl font-pj">
            Get Started with Crypto - Easily and Securely.
          </h2>
          <p className="mt-4 text-base leading-7 text-gray-600 sm:mt-8 font-pj">
            Are you new to cryptocurrency? Get started on the XDC network now with Myxdc! Our user-friendly, local
            wallet and ledger makes it easy to store, swap, and stake tokens securely. With metamask support, a
            decentralised exchange, and NFT and XRC20 token support, you&apos;ll have all the necessary tools to manage
            multiple accounts. Start your crypto journey today with Myxdc!
          </p>
        </div>

        <div className="grid grid-cols-1 gap-y-12 mt-10 text-center sm:mt-16 sm:grid-cols-2 sm:gap-x-12 md:grid-cols-3 md:gap-0 xl:mt-24">
          <div className="md:p-8 lg:p-14">
            <svg width={56} height={56} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
              <path
                style={{
                  fill: 'none',
                  stroke: '#999',
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round',
                  strokeWidth: 2,
                }}
                d="m9 11 2 2 4-4"
              />
              <path
                d="m12 21 .88-.38a11 11 0 0 0 6.63-9.26l.43-5.52a1 1 0 0 0-.76-1L12 3 4.82 4.8a1 1 0 0 0-.76 1l.43 5.52a11 11 0 0 0 6.63 9.26Z"
                style={{
                  fill: 'none',
                  stroke: '#161616',
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round',
                  strokeWidth: 2,
                }}
              />
            </svg>
            <h3 className="mt-12 text-xl font-bold text-gray-900 font-pj">Ledger & MetaMask</h3>
            <p className="mt-5 text-base text-gray-600 font-pj">
              MyXDC supports Ledger hardware wallets and Metamask. You can use your existing hardware wallet or Metamask
              account to access MyXDC.
            </p>
          </div>

          <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200">
            <svg width={56} height={56} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
              <path d="M32 96h192l.008-40a8 8 0 0 0-8-8h-176a8 8 0 0 0-8 8Z" opacity={0.2} />
              <path d="M216.008 40h-176a16.018 16.018 0 0 0-16 16v39.845c-.001.052-.008.103-.008.155s.007.103.008.155V200a16.018 16.018 0 0 0 16 16h176a16.018 16.018 0 0 0 16-16V56a16.018 16.018 0 0 0-16-16Zm0 16 .002 32H40.008V56Zm0 144h-176v-96H216.01l.007 96Z" />
            </svg>
            <h3 className="mt-12 text-xl font-bold text-gray-900 font-pj">Local Wallet</h3>
            <p className="mt-5 text-base text-gray-600 font-pj">
              Need to create a quick account? With MyXDC you can create or import an account in seconds that is stored
              on your local browser.
            </p>
          </div>

          <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200">
            <svg
              width={56}
              height={56}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto"
            >
              <g opacity={0.4} stroke="#292D32" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.75 16.86v2.03c0 1.72-1.6 3.11-3.57 3.11-1.97 0-3.58-1.39-3.58-3.11v-2.03c0 1.72 1.6 2.94 3.58 2.94 1.97 0 3.57-1.23 3.57-2.94Z" />
                <path d="M10.75 14.11c0 .5-.14.96-.38 1.36-.59.97-1.8 1.58-3.2 1.58-1.4 0-2.61-.62-3.2-1.58-.24-.4-.38-.86-.38-1.36 0-.86.4-1.63 1.04-2.19.65-.57 1.54-.91 2.53-.91.99 0 1.88.35 2.53.91.66.55 1.06 1.33 1.06 2.19Z" />
                <path d="M10.75 14.11v2.75c0 1.72-1.6 2.94-3.57 2.94-1.97 0-3.58-1.23-3.58-2.94v-2.75C3.6 12.39 5.2 11 7.18 11c.99 0 1.88.35 2.53.91.64.56 1.04 1.34 1.04 2.2Z" />
              </g>
              <path
                d="M22 10.97v2.06c0 .55-.44 1-1 1.02h-1.96c-1.08 0-2.07-.79-2.16-1.87-.06-.63.18-1.22.6-1.63.37-.38.88-.6 1.44-.6H21c.56.02 1 .47 1 1.02Z"
                stroke="#292D32"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 10.5v-2c0-2.72 1.64-4.62 4.19-4.94.26-.04.53-.06.81-.06h9c.26 0 .51.01.75.05C19.33 3.85 21 5.76 21 8.5v1.45h-2.08c-.56 0-1.07.22-1.44.6-.42.41-.66 1-.6 1.63.09 1.08 1.08 1.87 2.16 1.87H21v1.45c0 3-2 5-5 5h-2.5"
                stroke="#292D32"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h3 className="mt-12 text-xl font-bold text-gray-900 font-pj">Mutiple Accounts</h3>
            <p className="mt-5 text-base text-gray-600 font-pj">
              With crypto one wallet is never enough, but don&apos;t you worry, you can use MyXDC to easily manage
              multiple accounts without disconnecting.
            </p>
          </div>

          <div className="md:p-8 lg:p-14 md:border-t md:border-gray-200">
            <svg
              width={56}
              height={56}
              viewBox="0 0 24 24"
              data-name="Line Color"
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto"
            >
              <path
                d="M14.57 4.43a8 8 0 0 1 3.09 1.91 8.13 8.13 0 0 1 2 3.3"
                style={{
                  fill: 'none',
                  stroke: '#999',
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round',
                  strokeWidth: 2,
                }}
              />
              <path
                data-name="secondary"
                style={{
                  fill: 'none',
                  stroke: '#999',
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round',
                  strokeWidth: 2,
                }}
                d="m17.85 8.81 1.81.84.84-1.81M4.35 14.36a8.13 8.13 0 0 0 2 3.3 8 8 0 0 0 3.09 1.91"
              />
              <path
                data-name="secondary"
                style={{
                  fill: 'none',
                  stroke: '#999',
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round',
                  strokeWidth: 2,
                }}
                d="m6.15 15.19-1.81-.84-.84 1.81"
              />
              <path
                d="M7 3a4 4 0 1 0 4 4 4 4 0 0 0-4-4Zm10 18a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"
                style={{
                  fill: 'none',
                  stroke: '#000',
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round',
                  strokeWidth: 2,
                }}
              />
            </svg>
            <h3 className="mt-12 text-xl font-bold text-gray-900 font-pj">Decentralized Exchange</h3>
            <p className="mt-5 text-base text-gray-600 font-pj">
              MyXDC has a built-in decentralized exchange, so you never have to leave your wallet to swap XDC for other
              tokens and vice versa in seconds.
            </p>
          </div>

          <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200 md:border-t">
            <svg
              width={56}
              height={56}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto"
            >
              <g opacity={0.4} stroke="#292D32" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.5 13.75c0 .97.75 1.75 1.67 1.75h1.88c.8 0 1.45-.68 1.45-1.53 0-.91-.4-1.24-.99-1.45l-3.01-1.05c-.59-.21-.99-.53-.99-1.45 0-.84.65-1.53 1.45-1.53h1.88c.92 0 1.67.78 1.67 1.75M12 7.5v9" />
              </g>
              <path
                d="M22 12c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2"
                stroke="#292D32"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17 3v4h4M22 2l-5 5"
                stroke="#292D32"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h3 className="mt-12 text-xl font-bold text-gray-900 font-pj">Liquidity Staking</h3>
            <p className="mt-5 text-base text-gray-600 font-pj">
              Not only you can swap tokens, but you can join the pool of liquidity providers and earn passive income
              from your assets.
            </p>
          </div>

          <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200 md:border-t">
            <svg
              width={56}
              height={56}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto"
            >
              <path
                d="M3.17 7.44 12 12.55l8.77-5.08M12 21.61v-9.07"
                stroke="#292D32"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21.61 12.83V9.17c0-1.38-.99-3.06-2.2-3.73l-5.34-2.96c-1.14-.64-3-.64-4.14 0L4.59 5.44c-1.21.67-2.2 2.35-2.2 3.73v5.66c0 1.38.99 3.06 2.2 3.73l5.34 2.96c.57.32 1.32.48 2.07.48.75 0 1.5-.16 2.07-.48"
                stroke="#292D32"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <g opacity={0.4} stroke="#292D32" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M19.2 21.4a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4ZM23 22l-1-1" />
              </g>
            </svg>
            <h3 className="mt-12 text-xl font-bold text-gray-900 font-pj">NFTs & XRC20 tokens</h3>
            <p className="mt-5 text-base text-gray-600 font-pj">
              Every XDC asset can be managed with MyXDC. Send, receive, and store your NFTs and XRC20 tokens directly
              from MyXDC.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
  return (
    <div className="py-36 w-full bg-gray-50">
      <div className="container flex flex-col justify-center items-center mx-auto w-full h-full">
        <h2 className="text-4xl font-bold text-center">Features</h2>
        <p className="mt-4 text-center">MyXDC is a simple, secure and easy to use wallet for the XDC network.</p>
        <div className="flex flex-wrap gap-y-12 justify-between items-center mt-16 w-full">
          <div className="flex flex-col lg:w-[calc(33%-2rem)] p-8 shadow-lg rounded-3xl bg-primary-100">
            <h3 className="text-2xl font-bold">Your keys, your coins</h3>
            <p className="mt-4">
              MyXDC is a non-custodial wallet, which means that you are in control of your private keys. We never have
              access to your funds.
            </p>
          </div>
          <div className="flex flex-col lg:w-[calc(33%-2rem)] p-8 shadow-lg rounded-3xl bg-primary-100">
            <h3 className="text-2xl font-bold">Ledger and Metamask support</h3>
            <p className="mt-4">
              MyXDC supports Ledger hardware wallets and Metamask. You can use your existing hardware wallet or Metamask
              account to access MyXDC.
            </p>
          </div>
          <div className="flex flex-col lg:w-[calc(33%-2rem)] p-8 shadow-lg rounded-3xl bg-primary-100">
            <h3 className="text-2xl font-bold">NFTs & XRC20 Tokens</h3>
            <p className="mt-4">
              MyXDC supports NFTs and XRC20 tokens. You can send, receive, and store your NFTs and XRC20 tokens directly
              from MyXDC.
            </p>
          </div>
          <div className="flex flex-col lg:w-[calc(33%-2rem)] p-8 shadow-lg rounded-3xl bg-primary-100">
            <h3 className="text-2xl font-bold">Decentralized Exchange</h3>
            <p className="mt-4">
              MyXDC has a built-in decentralized exchange, allowing you to swap XDC for other tokens and vice versa in
              seconds. For the best rates.
            </p>
          </div>
          <div className="flex flex-col lg:w-[calc(33%-2rem)] p-8 shadow-lg rounded-3xl bg-primary-100">
            <h3 className="text-2xl font-bold">Liquidity Staking</h3>
            <p className="mt-4">
              MyXDC has a built-in liquidity staking feature, allowing you to stake your XDC and earn rewards in XDC.
              0.3% of all transaction fees are distributed to liquidity providers.
            </p>
          </div>
          <div className="flex flex-col lg:w-[calc(33%-2rem)] p-8 shadow-lg rounded-3xl bg-primary-100">
            <h3 className="text-2xl font-bold">Multiple Wallets</h3>
            <p className="mt-4">
              MyXDC supports multiple wallets, allowing you to manage multiple accounts from a single interface. You can
              also import your existing wallets.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
