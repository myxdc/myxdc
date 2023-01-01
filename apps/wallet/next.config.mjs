// @ts-check
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['@myxdc/ui'],
  },
  transpilePackages: ['@myxdc/ui'],
}

export default nextConfig
