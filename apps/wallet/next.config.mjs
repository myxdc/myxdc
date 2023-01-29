// @ts-check
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['@myxdc/ui'],
  experimental: {
    appDir: true,
    // serverComponentsExternalPackages: ['@myxdc/ui'],
  },
  env: {
    // declare here all your variables
    NEXT_PUBLIC_STAGE: process.env.NEXT_PUBLIC_STAGE,
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/wallet',
      },
    ]
  },
}

export default nextConfig
