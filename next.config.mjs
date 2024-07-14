/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.jkdesu.com",
        port: "",
        pathname: "/assets/images/animes/image/**",
      },
    ],
  },
};

export default nextConfig;
