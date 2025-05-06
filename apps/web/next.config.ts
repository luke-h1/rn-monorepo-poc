import type { NextConfig } from "next";
// test
const nextConfig: NextConfig = {
  transpilePackages: ['@acme/feature-home', '@acme/ui'],
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "react-native$": "react-native-web",
    };
    return config;
  },
};

export default nextConfig;
