/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com", "deow9bq0xqvbj.cloudfront.net", "mcusercontent.com", "pbcdn1.podbean.com"],
  },
};

module.exports = nextConfig;
