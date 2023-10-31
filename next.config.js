/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['192.168.3.42', 'wsrv.nl'],
  },
  async rewrites() {
    return [
      {
        source: '/auth/api/:path*',
        destination: 'http://45.142.215.48:4200/api/:path*' // Proxy to Backend
      },
      {
        source: '/api/:path*',
        destination: 'http://45.142.215.48:4200/api/:path*' // Proxy to Backend
      },

    ]
  }
};

module.exports = nextConfig;
