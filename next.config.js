/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
      };
    }
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.join(__dirname, "src"),
    };
    return config;
  },
  experimental: {
    serverComponentsExternalPackages: ["gray-matter", "remark", "remark-html"],
  },
};

module.exports = nextConfig;
