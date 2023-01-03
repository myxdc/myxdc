import theme from 'tailwindcss/defaultTheme'
import Link from 'next/link'
import Image from 'next/image'

const Hero = () => {
  return (
    <div className="container flex flex-col-reverse w-full gap-4 px-4 py-6 mx-auto md:py-20 lg:py-32 lg:max-w-7xl md:flex-row">
      <div className="w-full md:w-1/2">
        <h1 className="text-3xl md:text-7xl">
          <div className="inline-flex flex-col items-start mr-1 font-bold game-name">
            <span className="bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-700">Store</span>
            <span className="bg-clip-text bg-gradient-to-r from-primary-500 to-primary-700">Swap</span>
            <span className="bg-clip-text bg-gradient-to-r from-red-500 to-red-700">Stake</span>
            <span className="bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Earn</span>
            <span className="bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-700">Store</span>
          </div>{' '}
          your <span className="font-semibold">XDC</span> with ease
        </h1>

        <p className="pt-8 text-gray-900 text-md md:text-lg">
          Myxdc is the easiest and most user-friendly way to store, swap, and stake your XDC network tokens. We make it
          easy for you to get started with crypto.
        </p>

        <Link
          href="https://testnet.myxdc.org/"
          className="inline-block px-4 py-3 mt-4 text-sm font-semibold text-gray-300 bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 "
        >
          Try it out
        </Link>
      </div>
      <div className="w-full md:w-1/2">
        <Image src={'/hero.webp'} alt="hero image" width={1200} height={1200} className="object-contain" />
      </div>

      <style jsx>{`
        @keyframes move-up {
          12.5% {
            transform: translateY(0);
          }
          25% {
            transform: translateY(-100%);
          }
          37.5% {
            transform: translateY(-100%);
          }
          50% {
            transform: translateY(-200%);
          }
          62.5% {
            transform: translateY(-200%);
          }
          75% {
            transform: translateY(-300%);
          }
          87.5% {
            transform: translateY(-300%);
          }
          100% {
            transform: translateY(-400%);
          }
        }

        @keyframes game-1 {
          0% {
            opacity: 1;
          }
          12.5% {
            opacity: 1;
          }
          25% {
            opacity: 0;
          }
        }

        @keyframes game-2 {
          12.5% {
            opacity: 0;
          }
          25% {
            opacity: 1;
          }
          37.5% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }

        @keyframes game-3 {
          37.5% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          62.5% {
            opacity: 1;
          }
          75% {
            opacity: 0;
          }
        }

        @keyframes game-4 {
          62.5% {
            opacity: 0;
          }
          75% {
            opacity: 1;
          }
          87.5% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes game-5 {
          87.5% {
            opacity: 0;
          }
          100% {
            opacity: 1 !important;
          }
        }

        .game-name {
          position: relative;
          top: 4px;
          width: 2.6em;
          max-height: 1.2em;
          animation: move-up 8s infinite;
          pointer-events: none;
        }

        @media (min-width: ${theme.screens.md}) {
          .game-name {
            max-height: 1em;
            top: 2px;
          }
        }

        .game-name span {
          animation-duration: 8s;
          animation-iteration-count: infinite;
          opacity: 0;
        }

        .game-name span:nth-child(1) {
          animation-name: game-1;
        }

        .game-name span:nth-child(2) {
          animation-name: game-2;
        }

        .game-name span:nth-child(3) {
          animation-name: game-3;
        }

        .game-name span:nth-child(4) {
          animation-name: game-4;
        }

        .game-name span:nth-child(5) {
          animation-name: game-5;
        }

        .game-name span {
          -webkit-text-fill-color: transparent;
          -moz-text-fill-color: transparent;
        }
      `}</style>
    </div>
  )
}

export default Hero
