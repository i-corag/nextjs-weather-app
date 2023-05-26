/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  images: {
    domains: [
      'images.unsplash.com',
      'a-static.besthdwallpaper.com',
      'openweathermap.org',
    ],
  },
  nextConfig,
};
