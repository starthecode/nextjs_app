/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['iokart.com', 'www.iokart.com', 'https://www.iokart.com'],
  },
};

module.exports = nextConfig;
