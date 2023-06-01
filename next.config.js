const { hostname } = require("os");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["pbs.twimg.com"],
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "pbs.twimg.com",
    //     pathname: "profile_banners",
    //   },
    // ],
  },
};

module.exports = nextConfig;
