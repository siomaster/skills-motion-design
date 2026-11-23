// node render_sub.mjs page.html <W> <H> <outdir> <fps> <sub> <workers> [t0 t1]
// Captures SUB subframes per frame over a 180° shutter (window.render(t) Promise) -> s_%06d.jpg
import { createRequire } from "module"; import { fork } from "child_process"; import path from "path";
// Playwright est pris dans le projet MaMarque (ou PW_FROM=/chemin/vers/package.json)
const require = createRequire(process.env.PW_FROM || "/Users/VOTRE_NOM/Documents/Saas/mamarque/package.json");
const { chromium } = require("playwright");
const [page, W, H, out, fps, sub, workers, a0, a1] = process.argv.slice(2);
const FPS = +fps, SUB = +sub;
async function open() {
  const b = await chromium.launch({ channel: "chrome" });
  const p = await b.newPage({ viewport: { width: +W, height: +H } });
  p.on("pageerror", (e) => console.log("ERR", e.message));
  await p.goto("file://" + path.resolve(page));
  await p.evaluate(() => Promise.resolve(window.ready).then(() => undefined));
  return { b, p };
}
const tOf = (k, DUR) => { const i = Math.floor(k / SUB), j = k % SUB; return Math.min(DUR - 1e-3, Math.max(0, i / FPS + ((j - (SUB - 1) / 2) / (SUB - 1 || 1)) * (0.5 / FPS))); };
if (a0 === undefined) {
  const { b, p } = await open(); const DUR = await p.evaluate(() => window.DUR); await b.close();
  const N = Math.round(DUR * FPS) * SUB, per = Math.ceil(N / workers); let done = 0;
  await Promise.all(Array.from({ length: +workers }, (_, k) => new Promise((res) => {
    const c = fork(process.argv[1], [page, W, H, out, fps, sub, workers, String(k * per), String(Math.min(N, (k + 1) * per))]);
    c.on("exit", () => { console.log(`worker ${k} done (${++done}/${workers})`); res(); });
  })));
  console.log("done", N);
} else {
  const { b, p } = await open(); const DUR = await p.evaluate(() => window.DUR);
  for (let k = +a0; k < +a1; k++) {
    await p.evaluate((t) => window.render(t).then(() => undefined), tOf(k, DUR));
    await p.screenshot({ path: `${out}/s_${String(k).padStart(6, "0")}.jpg`, type: "jpeg", quality: 93 });
  }
  await b.close();
}
