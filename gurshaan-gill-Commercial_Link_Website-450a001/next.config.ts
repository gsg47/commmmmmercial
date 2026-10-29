import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Cache Components / PPR currently throws Cloudflare Worker error 1101
  // (https://github.com/vercel/next.js/issues/100122). Keep it off so the
  // workers.dev URL can serve the app. Visual output is unchanged.
  cacheComponents: false,
  allowedDevOrigins: ["127.0.0.1", "*.trycloudflare.com"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

initOpenNextCloudflareForDev();

