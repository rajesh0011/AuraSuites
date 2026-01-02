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
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", 
        pathname: "/**"
      }
      
    ],
    unoptimized: true,
  }
};

export default nextConfig;