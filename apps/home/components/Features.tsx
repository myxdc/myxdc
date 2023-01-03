import React from 'react'

export const Features = () => {
  return (
    <div className="w-full py-36 bg-gray-50">
      <div className="container flex flex-col items-center justify-center w-full h-full mx-auto">
        <h2 className="text-4xl font-bold text-center">Features</h2>
        <p className="mt-4 text-center">MyXDC is a simple, secure and easy to use wallet for the XDC network.</p>
        <div className="flex flex-wrap items-center justify-between w-full mt-16 gap-y-12">
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
