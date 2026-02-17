const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const createNextPluginPreval = require('next-plugin-preval/config');
const withNextPluginPreval = createNextPluginPreval();

const optimizedImages = require("next-optimized-images");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: true,
    turbo: {},
  },
};

module.exports = withPlugins([
  [
    optimizedImages,
    {
      /* config for next-optimized-images */
    },
  ],

  withPWA({
    reactStrictMode: false,
    trailingSlash: true,
  }),

  withNextPluginPreval(),
],nextConfig);
