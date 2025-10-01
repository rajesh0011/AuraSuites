/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'homesweb.staah.net',
        port: '',
        pathname: '/imagelibrary/**',
      },
    ],
    unoptimized: true,
  }
};

export default nextConfig;