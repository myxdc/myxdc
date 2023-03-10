import Image from 'next/image'
import BGImage from '../../public/assets/img/connected-bg.jpg'

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
      <div className="relative z-10">{children}</div>
    </>
  )
}
