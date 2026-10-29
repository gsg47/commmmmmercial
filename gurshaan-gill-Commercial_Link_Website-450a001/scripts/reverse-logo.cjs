const sharp = require("sharp");
const SRC = "src/assets/brand/logo-original.png";

(async () => {
  const { data, info } = await sharp(SRC).raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height, N = W * H;
  const px = (p) => [data[p * 4], data[p * 4 + 1], data[p * 4 + 2]];
  const sat = (p) => { const [r, g, b] = px(p); return Math.max(r, g, b) - Math.min(r, g, b); };
  const lum = (p) => { const [r, g, b] = px(p); return (r + g + b) / 3; };
  const isWhite = (p) => lum(p) > 200 && sat(p) < 30;
  const isGold = (p) => sat(p) > 60;

  // Label connected near-white regions; each is either background (drop) or white artwork on gold (keep).
  const comp = new Int32Array(N).fill(-1);
  const drop = [];
  for (let s = 0; s < N; s++) {
    if (comp[s] !== -1 || !isWhite(s)) continue;
    const id = drop.length, stack = [s];
    let touchesEdge = false, gold = 0, dark = 0;
    comp[s] = id;
    while (stack.length) {
      const p = stack.pop(), x = p % W, y = (p / W) | 0;
      if (x === 0 || y === 0 || x === W - 1 || y === H - 1) touchesEdge = true;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
        const q = ny * W + nx;
        if (isWhite(q)) { if (comp[q] === -1) { comp[q] = id; stack.push(q); } }
        else if (isGold(q)) gold++;
        else dark++;
      }
    }
    drop.push(touchesEdge || dark >= gold);
  }

  const nearDropped = (p, r = 2) => {
    const x = p % W, y = (p / W) | 0;
    for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) {
      const nx = x + dx, ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
      const c = comp[ny * W + nx];
      if (c !== -1 && drop[c]) return true;
    }
    return false;
  };

  // The script C's white stroke breaks out of the gold disc, so it joins the background region.
  const CX = 156, CY = 104, R = 81;
  const inDisc = (p) => { const x = p % W, y = (p / W) | 0; return (x - CX) ** 2 + (y - CY) ** 2 <= R * R; };
  const nearGold = (p) => {
    const x = p % W, y = (p / W) | 0;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      const nx = x + dx, ny = y + dy;
      if (nx >= 0 && ny >= 0 && nx < W && ny < H && isGold(ny * W + nx)) return true;
    }
    return false;
  };

  const out = Buffer.alloc(N * 4);
  for (let p = 0; p < N; p++) {
    const [r, g, b] = px(p), o = p * 4;
    const c = comp[p];
    if (c !== -1) {
      if (drop[c] && !inDisc(p)) { out[o + 3] = 0; } else { out[o] = r; out[o + 1] = g; out[o + 2] = b; out[o + 3] = 255; }
    } else if (isGold(p) || sat(p) > 30 || nearGold(p)) {
      if (nearDropped(p) && !inDisc(p)) {
        const a = Math.min(1, Math.max(0.01, (255 - b) / (255 - 23)));
        const un = (v) => Math.max(0, Math.min(255, Math.round(255 - (255 - v) / a)));
        out[o] = un(r); out[o + 1] = un(g); out[o + 2] = un(b); out[o + 3] = Math.round(a * 255);
      } else {
        out[o] = r; out[o + 1] = g; out[o + 2] = b; out[o + 3] = 255;
      }
    } else {
      const a = Math.min(1, Math.max(0, (255 - lum(p)) / (255 - 40)));
      out[o] = 255; out[o + 1] = 255; out[o + 2] = 255; out[o + 3] = Math.round(a * 255);
    }
  }

  const save = (name, box) =>
    sharp(out, { raw: info }).extract(box).png({ compressionLevel: 9 }).toFile(`src/assets/brand/${name}`)
      .then((r) => console.log(name, r.width, r.height));
  await save("logo-reverse.png", { left: 21, top: 18, width: 270, height: 242 });
  await save("logo-mark-reverse.png", { left: 71, top: 19, width: 171, height: 171 });
  await save("logo-wordmark-reverse.png", { left: 22, top: 188, width: 268, height: 70 });

})();
