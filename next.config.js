/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/examples",
        destination: "/showcase",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
