/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   // appDir: true, // Enable the App Router

  // },
  images: {
    remotePatterns: [{ hostname: "res.cloudinary.com" }],
  },
};

export default nextConfig;
