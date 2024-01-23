/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.REMOTE_IMAGE_HOSTNAME,
        pathname: process.env.REMOTE_IMAGE_PATHNAME
      }
    ]
  }
}

module.exports = nextConfig
