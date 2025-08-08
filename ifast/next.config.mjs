/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { appDir: true },
  headers: async () => ([{
    source: '/(.*)',
    headers: [
      { key: 'X-Robots-Tag', value: 'noindex' }
    ]
  }])
};
export default nextConfig;