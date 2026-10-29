#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");

const binDir = path.join(__dirname, "..", "node_modules", ".bin");
const wrapper = path.join(__dirname, "opennextjs-cloudflare.cjs");
const dest = path.join(binDir, "opennextjs-cloudflare");

if (!fs.existsSync(path.join(__dirname, "..", "node_modules", "@opennextjs", "cloudflare"))) {
  process.exit(0);
}

fs.mkdirSync(binDir, { recursive: true });
fs.chmodSync(wrapper, 0o755);

try {
  fs.unlinkSync(dest);
} catch {
  // ignore missing bin
}

fs.symlinkSync(path.relative(binDir, wrapper), dest);
