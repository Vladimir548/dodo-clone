/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost:5000'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '**',
      },{
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
