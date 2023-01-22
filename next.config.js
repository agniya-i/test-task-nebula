/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['astrocrmmedia.obrio.net'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/experts',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
