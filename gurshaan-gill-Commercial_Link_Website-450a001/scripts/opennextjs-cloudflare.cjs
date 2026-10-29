#!/usr/bin/env node
/**
 * Wrangler CI runs `npx wrangler deploy`, which immediately delegates to
 * `opennextjs-cloudflare deploy`. Cloudflare Workers Builds often skips the
 * optional build command, so this wrapper runs OpenNext build first when the
 * compiled config is missing.
 */
const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const args = process.argv.slice(2);
const command = args[0];
const compiledConfig = path.join(
  process.cwd(),
  ".open-next",
  ".build",
  "open-next.config.edge.mjs",
);

const pkgDir = path.dirname(
  require.resolve("@opennextjs/cloudflare/package.json"),
);
const cli = path.join(pkgDir, "dist/cli/index.js");

function run(cliArgs) {
  const result = spawnSync(process.execPath, [cli, ...cliArgs], {
    stdio: "inherit",
    env: process.env,
  });
  if (result.error) {
    throw result.error;
  }
  process.exit(result.status ?? 1);
}

const needsCompiledConfig =
  command === "deploy" || command === "upload" || command === "preview";

if (needsCompiledConfig && !fs.existsSync(compiledConfig)) {
  console.log(
    "OpenNext compiled config missing; running `opennextjs-cloudflare build` first.",
  );
  const build = spawnSync(process.execPath, [cli, "build"], {
    stdio: "inherit",
    env: process.env,
  });
  if (build.error) {
    throw build.error;
  }
  if (build.status) {
    process.exit(build.status);
  }
}

run(args);
