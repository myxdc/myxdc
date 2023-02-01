import Image from 'next/image'

export const Sections = () => {
  return (
    <div className="px-4 py-10 mx-auto max-w-5xl section 2xl:px-0 md:px-10 sm:px-0">
      <div className="flex flex-col-reverse gap-12 justify-between items-center md:flex-row">
        <div className="md:w-1/2">
          <h2 className="mb-2 text-2xl font-bold md:text-3xl">Securely store and manage your tokens.</h2>
          <p className="text-lg">
            Keep your XDC tokens safe and secure with multiple accounts, local wallet, ledger, and metamask support.
            With MyXDC you can easily store, swap, and stake your XDC network tokens without worrying about safety. Get
            started today!
          </p>
        </div>
        <div className="md:w-1/2">
          <Image src="/section-1.webp" alt="" width={450} height={450} />
        </div>
      </div>
      <div className="flex flex-col-reverse gap-12 justify-between items-center md:flex-row-reverse">
        <div className="md:w-1/2">
          <h2 className="mb-2 text-2xl font-bold md:text-3xl">Completely private and open-source</h2>
          <p className="text-lg">
            All data is stored on your local browser. We don&apos;t collet any data, but you don&apos;t have to trust
            because MyXDC is an open source project and you can verify everything by yourself.
          </p>
        </div>
        <div className="md:w-1/2">
          <Image src="/section-2.webp" width={450} height={450} alt="" />
        </div>
      </div>
      <div className="flex flex-col-reverse gap-12 justify-between items-center md:flex-row">
        <div className="md:w-1/2">
          <h2 className="mb-2 text-2xl font-bold md:text-3xl">Get started with crypto the easy way.</h2>
          <p className="text-lg">
            Crypto does not have to be complicated. MyXDC makes it easy for anyone to get started with their own wallet
            and manage their tokens. Its user-friendly interface and mobile responsive design make managing your tokens
            a breeze.
          </p>
        </div>
        <div className="md:w-1/2">
          <Image src="/section-3.webp" alt="" width={450} height={450} />
        </div>
      </div>
    </div>
  )
}
