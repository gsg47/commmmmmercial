import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * Cloudflare Workers Builds runs `npm run build` then `npx wrangler deploy`.
 * OpenNext deploy looks for `.open-next/.build/open-next.config.edge.mjs`,
 * so `npm run build` must run `opennextjs-cloudflare build`.
 * That command would recurse if it invoked `npm run build` again; point it at Next.js instead.
 */
export default {
  ...defineCloudflareConfig(),
  buildCommand: "npx next build",
};
