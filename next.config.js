const { hostname } = require("os");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
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
