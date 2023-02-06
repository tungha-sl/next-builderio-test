/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en-US', 'jp-JP'],
    defaultLocale: 'en-US',
    domains: [
      {
        domain: process.env.NEXT_PUBLIC_DOMAIN_EN_US,
        locales: ['en-US'],
        defaultLocale: 'en-US'
      },
      {
        domain: process.env.NEXT_PUBLIC_DOMAIN_JP_JP,
        locales: ['jp-JP'],
        defaultLocale: 'jp-JP'
      }
    ]
  }
}

module.exports = nextConfig
