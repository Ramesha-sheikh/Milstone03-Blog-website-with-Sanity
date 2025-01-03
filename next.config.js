// import type { NextConfig } from "next";

const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'cdn.sanity.io',
          port: '',
          pathname: '/images/**', // Matches the URL path for Sanity images
        },
      ],
    },
  };
  
  export default nextConfig;