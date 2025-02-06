/** @type {import('next').NextConfig} */
const nextConfig = {
  //add your next config here

  trailingSlash: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pooks-nfts.s3.us-east-2.amazonaws.com",
        // pathname: "/static/media/pooks-nfts/",
      },
      {
        protocol: "https",
        hostname: "arweave.net",
      },
      {
        protocol: "https",
        hostname: "**.ipfs.nftstorage.link",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
