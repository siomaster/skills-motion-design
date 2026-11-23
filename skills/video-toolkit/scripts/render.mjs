// render.mjs — rendu image par image d'une page HTML pilotée par window.render(t) (renvoie une Promise)
// et window.DUR (durée en s). La page doit attendre ses images (img.decode) dans render().
//   node render.mjs <page.html> kf  <W> <H> <dossier_sortie> 0.5 2 7.25     → images clés <t>.jpg
//   node render.mjs <page.html> full <W> <H> <dossier_sortie> <fps> [workers=3] → fNNNNN.jpg puis encoder avec ffmpeg
// fps peut être une fraction (30000/1001). Les nombres comme "2.0" deviennent "2" côté JS : nommer les instants sans ".0".
import { createRequire } from "module";
import { fork } from "child_process";
import path from "path";
const require = createRequire("/Users/VOTRE_NOM/Documents/Saas/mamarque/package.json");
const { chromium } = require("playwright");
const [page, mode, W, H, out, ...rest] = process.argv.slice(2);
const fpsOf = (s) => (s.includes("/") ? s.split("/").reduce((a, b) => a / b) : Number(s));
async function open() {
  const b = await chromium.launch({ channel: "chrome" });
  const p = await b.newPage({ viewport: { width: +W, height: +H } });
  p.on("pageerror", (e) => console.log("ERR", e.message));
  await p.goto("file://" + path.resolve(page));
  await p.evaluate(() => Promise.resolve(window.ready).then(() => undefined));
  return { b, p };
}
if (mode === "kf") {
  const { b, p } = await open();
  for (const t of rest.map(Number)) { await p.evaluate((t) => window.render(t).then(() => undefined), t); await p.screenshot({ path: `${out}/${t}.jpg`, type: "jpeg", quality: 88 }); }
  await b.close();
} else if (mode === "full") {
  const fps = fpsOf(rest[0]), workers = +(rest[1] || 3);
  const { b, p } = await open();
  const N = Math.ceil((await p.evaluate(() => window.DUR)) * fps - 1e-6); await b.close();
  const per = Math.ceil(N / workers); let done = 0;
  await Promise.all(Array.from({ length: workers }, (_, k) => new Promise((res) => {
    const c = fork(process.argv[1], [page, "range", W, H, out, rest[0], String(k * per), String(Math.min(N, (k + 1) * per))]);
    c.on("exit", () => { done++; console.log(`worker ${k} fini (${done}/${workers})`); res(); });
  })));
  console.log("done", N, "images");
} else if (mode === "range") {
  const fps = fpsOf(rest[0]), a = +rest[1], z = +rest[2];
  const { b, p } = await open();
  for (let f = a; f < z; f++) { await p.evaluate((t) => window.render(t).then(() => undefined), f / fps); await p.screenshot({ path: `${out}/f${String(f).padStart(5, "0")}.jpg`, type: "jpeg", quality: 92 }); }
  await b.close();
}
