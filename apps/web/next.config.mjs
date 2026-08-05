/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@projectforge/ui"],
  output: "standalone",
};

export default nextConfig;
