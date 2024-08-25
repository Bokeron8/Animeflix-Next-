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
      {
        protocol: "https",
        hostname: "nextui.org",
        pathname: "/images/**",
      },
    ],
  },
  headers() {
    return [
      {
        // matching all API routes
        source: "/anime/:slug/:episodeNumber*",
        headers: [{ key: "Access-Control-Allow-Origin", value: "*" }],
      },
    ];
  },

  reactStrictMode: true, // Enable React strict mode for improved error handling
  swcMinify: true, // Enable SWC minification for improved performance
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development", // Remove console.log in production
  },
};
import withPWA from "next-pwa";

export default withPWA({
  dest: "public", // destination directory for the PWA files
  disable: process.env.NODE_ENV === "development", // disable PWA in the development environment
  register: true, // register the PWA service worker
  skipWaiting: true, // skip waiting for service worker activation
})(nextConfig);
