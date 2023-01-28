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
