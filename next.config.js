/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
