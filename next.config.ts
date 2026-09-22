import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/awkw8wq8/image/upload/**",
      },
    ],
  },
};

export default nextConfig;
