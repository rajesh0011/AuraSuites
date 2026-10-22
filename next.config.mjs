/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "homesweb.staah.net",
        port: "",
        pathname: "/imagelibrary/**",
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.aurasuites.co.tz", // ✅ FIXED
        pathname: "/blogcms/**", // ✅ FIXED
      },
    ],
    unoptimized: true,
  },

  async redirects() {
    return [
      {
        source: "/events",
        destination: "/event-venue-dar-es-salam-tanzania",
        permanent: true, // 301 redirect
      },
      {
        source: "/blog/why-serviced-apartments-are-better-than-traditional-hotels-in-dar-es-salaam",
        destination: "/blog/serviced-apartments-vs-hotels-dar-es-salaam",
        permanent: true, // 301 redirect
      },
      {
        source: "/blog/affordable-luxury-hotels-in-dar-es-salaam-what-to-expect",
        destination: "/blog/affordable-luxury-hotels-dar-es-salaam",
        permanent: true, // 301 redirect
      },
      {
        source: "/blog/top-living-suites-in-dar-es-salaam-for-modern-travelers",
        destination: "/blog/living-suites-dar-es-salaam",
        permanent: true, // 301 redirect
      },
       {
        source: "/blog/experience-rooftop-dining-at-one-of-the-best-hotels-in-dar-es-salaam",
        destination: "/blog/rooftop-dining-dar-es-salaam",
        permanent: true, // 301 redirect
      },
       {
        source: "/blog/best-boutique-amenities-hotel-in-dar-es-salaam-explained",
        destination: "/blog/boutique-hotel-amenities-dar-es-salaam",
        permanent: true, // 301 redirect
      },
    ];
  },
};

export default nextConfig;
