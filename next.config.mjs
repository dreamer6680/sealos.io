import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  output: 'standalone',
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
    domains: ['oss.laf.run', 'static.ppinfra.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'oss.laf.run',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'static.ppinfra.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // 添加对 .node 原生模块的支持
    config.module.rules.push({
      test: /\.node$/,
      use: ['node-loader'],
    });

    if (!isServer) {
      // 客户端构建时不包含 canvas
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false,
      };
    }

    return config;
  },
};

export default withMDX(config);
