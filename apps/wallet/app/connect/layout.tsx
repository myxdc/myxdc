import Image from 'next/image'

import BGImage from '../../public/assets/img/guest-bg-1.webp'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full">
        <Image
          src={BGImage}
          alt=""
          fill={true}
          className="object-cover"
          placeholder="blur"
          priority={true}
          loading="eager"
        />
      </div>
      <div className="relative z-10 flex flex-col items-center mt-10">
        {children}
        <div className="flex justify-center w-full max-w-lg gap-6 px-4 mt-2 text-sm">
          <a href="https://www.myxdc.org/help" target="_blank" rel="noreferrer" className="mr-auto">
            Help Center
          </a>
          <a href="https://www.myxdc.org/privacy-policy" target="_blank" rel="noreferrer">
            Privacy Policy
          </a>
          <a href="https://www.myxdc.org/terms-of-service" target="_blank" rel="noreferrer">
            Terms of Service
          </a>
        </div>
      </div>
    </>
  )
}
