import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',  // 添加这一行，指定静态导出
  images: {
    unoptimized: true, // 对于静态导出需要
  },
  // 确保没有使用依赖服务器的功能
  trailingSlash: true, // 有助于在静态托管时正确处理路径
};

export default nextConfig;
