/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  images: {
    loader: "custom",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.arweave.net",
      },
    ],
  },
};

module.exports = nextConfig;
