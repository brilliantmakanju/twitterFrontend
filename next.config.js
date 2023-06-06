const { hostname } = require("os");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["127.0.0.1"],
    remotePatterns: [
      // {
      //   protocol: "http",
      //   hostname: "**",
      //   // pathname: "media/profile",
      // },
    ],
  },
};

module.exports = nextConfig;
