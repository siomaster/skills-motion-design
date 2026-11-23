/* Moteur de sous-titres dynamiques — déterministe (rendu image par image).
 * Usage :
 *   const cap = Captions.create({ root, behindRoot, style: "neon", words, keywords: ["chine"], accent: "#ff6a1a",
 *                                 W: 1080, H: 1920, y: 0.62, heroes: [{ t: "SURVEILLÉ", s: 2.4, e: 3.1 }] });
 *   cap.render(t);   // à appeler dans window.render(t)
 * words = [{ w: "Est-ce", s: 0.56, e: 0.8 }]  (mots ponctués Deepgram, minutages de la vidéo MONTÉE)
 * Styles : cine · neon · gaming · high · edito · behind · mini · multi · count · type
 */
(function () {
  const clamp = (x) => Math.min(1, Math.max(0, x));
  const eOut = (x) => 1 - Math.pow(1 - clamp(x), 3);
  const eBack = (x) => { x = clamp(x); const c = 1.9; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); };
  const strip = (w) => w.replace(/[.,!?;:…]+$/u, "");
  const norm = (w) => strip(w).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/^[ldjmtsnqu]'/, "");
  const isNum = (w) => /\d/.test(w);
  const MAXW = { cine: 4, neon: 3, gaming: 4, high: 3, edito: 4, behind: 3, mini: 3, multi: 4, count: 3, type: 7 };
  const PALETTE = { multi: ["#ffe14d", "#c6ff3d", "#b98cff", "#ffffff"], gaming: ["#ff2d3d", "#3d6bff", "#2de0c4", "#ffd60a"] };

  function group(words, maxW, pause = 0.3) {
    const phr = []; let cur = [];
    words.forEach((w, i) => {
      cur.push(i);
      const end = /[.,!?;:…]$/u.test(w.w) || (i + 1 < words.length && words[i + 1].s - w.e > pause);
      if (end) { phr.push(cur); cur = []; }
    });
    if (cur.length) phr.push(cur);
    const out = [];
    phr.forEach((p) => { const k = Math.ceil(p.length / maxW), size = Math.ceil(p.length / k); for (let j = 0; j < p.length; j += size) out.push(p.slice(j, j + size)); });
    return out;
  }

  function create(o) {
    const st = o.style, W = o.W || 1080, H = o.H || 1920, u = Math.min(W, H) / 100;
    const kw = new Set((o.keywords || []).map(norm));
    const words = o.words.map((w) => ({ ...w, k: w.k || kw.has(norm(w.w)) || (st === "count" && isNum(w.w)) }));
    const root = o.root; root.classList.add("cap-layer", "st-" + st);
    root.style.setProperty("--u", u + "px"); root.style.setProperty("--acc", o.accent || "#ff6a1a");
    const G = group(words, o.maxWords || MAXW[st], o.pause).map((ix, gi) => {
      const ws = ix.map((i) => words[i]);
      let big = ws.findIndex((w) => w.k);
      if (big < 0) big = ws.reduce((b, w, j) => (strip(w.w).length > strip(ws[b].w).length ? j : b), 0);
      return { ws, s: ws[0].s, e: ws[ws.length - 1].e, big, gi, last: /[.!?]$/.test(ws[ws.length - 1].w) };
    });
    G.forEach((g, i) => { g.next = i + 1 < G.length ? G[i + 1].s : 1e9; g.until = Math.min(g.next - 0.03, g.e + (o.hold || 0.8)); });
    const pos = (el, y) => { el.style.top = (y * 100).toFixed(2) + "%"; };
    const span = (cls, txt) => `<span class="cap-w ${cls}">${txt}</span>`;

    // ── construction par style
    G.forEach((g) => {
      const el = document.createElement("div"); el.className = "cap-g"; pos(el, o.y ?? 0.62);
      const t = g.ws.map((w) => strip(w.w));
      if (st === "cine") {
        const before = t.slice(0, g.big).map((x) => span("sm", x + " ")).join(""), after = t.slice(g.big + 1).map((x) => span("sm", x + " ")).join("");
        const serif = g.gi % 7 === 5 ? " serif" : "";
        el.innerHTML = `<div class="cap-line">${before}</div><div class="cap-line">${span("big" + serif + (g.ws[g.big].k ? " k" : ""), t[g.big])}</div><div class="cap-line">${after}</div>`;
      } else if (st === "neon") {
        el.innerHTML = t.map((x, j) => span(g.ws[j].k ? "k" : "", x + (j < t.length - 1 ? " " : ""))).join("") + (g.last ? span("dot", ".") : "");
      } else if (st === "gaming") {
        const cut = Math.ceil(t.length / 2), acc = PALETTE.gaming[g.gi % 4];
        el.style.setProperty("--acc", o.accent && o.lockAccent ? o.accent : acc);
        el.innerHTML = `<span class="cap-line">${t.slice(0, cut).map((x) => span("", x + " ")).join("")}</span><span class="l2">${t.slice(cut).map((x) => span("", x + " ")).join("")}</span>`;
      } else if (st === "high") {
        el.innerHTML = t.map((x, j) => (j === g.big ? `<div class="cap-line">${`<span class="cap-w big">${x}<i class="hl"></i></span>`}</div>` : span("sm", x + " "))).join("");
      } else if (st === "edito") {
        const cut = Math.max(1, g.big);
        el.innerHTML = `<div class="cap-line">${t.slice(0, cut).map((x, j) => span(j === g.big ? "big k" : "sm", x + " ")).join("")}</div><div class="cap-line">${t.slice(cut).map((x, j) => span(j + cut === g.big ? "big k" : "big", x + " ")).join("")}</div>`;
      } else if (st === "multi") {
        const c = PALETTE.multi, rows = [];
        rows.push(span("r0", t[0] + " "));
        t.slice(1).forEach((x, j) => rows.push(`<div class="cap-line">${span(isNum(x) ? "num" : j % 2 ? "r2" : "r1", x)}</div>`));
        el.innerHTML = rows.join("");
        [...el.querySelectorAll(".r1,.r2,.num")].forEach((s, j) => (s.style.color = c[(g.gi + j) % c.length]));
      } else if (st === "count") {
        const n = t.findIndex((x) => isNum(x));
        if (n >= 0) { g.num = t[n]; el.innerHTML = `<span class="ctx">${t.slice(0, n).join(" ")}</span><span class="cap-w nm">${t[n]}</span><span class="suf">${t.slice(n + 1).join(" ")}</span>`; }
        else { el.classList.add("plain"); el.style.fontFamily = "Jakarta"; el.style.fontWeight = 600; el.style.fontSize = u * 5.6 + "px"; el.innerHTML = t.map((x) => span("", x + " ")).join(""); }
      } else if (st === "type") {
        el.style.display = "none"; el.innerHTML = `<span class="bar"><i class="ico"></i><span class="tx"></span><i class="caret"></i></span>`; g.full = t.join(" ");
      } else {
        el.innerHTML = t.map((x) => span("", x + " ")).join("");
      }
      root.appendChild(el); g.el = el; g.spans = [...el.querySelectorAll(".cap-w")];
    });
    // mots géants derrière le sujet
    const heroes = (o.heroes || []).map((h, i, a) => ({ ...h, end: h.e ?? Math.min(h.s + 1.6, i + 1 < a.length ? a[i + 1].s - 0.12 : h.s + 1.6) }));
    if (heroes.length && o.behindRoot) {
      o.behindRoot.classList.add("cap-layer", "st-behind"); o.behindRoot.style.setProperty("--u", u + "px"); o.behindRoot.style.setProperty("--acc", o.heroColor || o.accent || "#ff2b2b");
      heroes.forEach((h) => { const d = document.createElement("div"); d.className = "hero"; pos(d, o.heroY ?? 0.24); d.innerHTML = `<span>${h.t}</span>`; o.behindRoot.appendChild(d); h.el = d; });
    }
    let fitted = false;
    function fit() {
      heroes.forEach((h) => { let fs = u * 30; h.el.style.fontSize = fs + "px"; while (h.el.firstChild.offsetWidth > W * 0.94 && fs > u * 8) { fs -= u * 0.5; h.el.style.fontSize = fs + "px"; } });
      G.forEach((g) => { let s = 1; g.el.style.display = "block"; while (g.el.scrollWidth > W * 0.9 && s > 0.5) { s -= 0.04; g.el.style.fontSize = ""; g.el.style.transform = `translateY(-50%) scale(${s})`; } g.fit = s; g.el.style.display = "none"; });
    }

    // ── rendu
    function render(t) {
      if (!fitted) { fit(); fitted = true; }
      const heroOn = heroes.some((h) => t >= h.s - 0.02 && t < h.end + 0.2);
      G.forEach((g) => {
        const on = t >= g.s - 0.03 && t < g.until && !(o.hideDuringHero && heroOn);
        g.el.style.display = on ? "block" : "none";
        if (!on) return;
        const base = `translateY(-50%) scale(${g.fit})`;
        const age = t - g.s, out = clamp((t - (g.until - 0.12)) / 0.12);
        g.el.style.opacity = 1 - out;
        if (st === "mini") {
          const p = eOut(age / 0.16); g.el.style.transform = base + ` scale(${0.96 + 0.04 * p})`; g.el.style.opacity = p * (1 - out); return;
        }
        if (st === "type") {
          g.el.style.display = "block";
          const n = Math.floor(clamp((age + 0.05) / Math.max(0.4, g.e - g.s)) * g.full.length);
          g.el.querySelector(".tx").textContent = g.full.slice(0, n);
          g.el.querySelector(".caret").style.opacity = Math.floor(t * 2.2) % 2 ? 0.15 : 1;
          const p = eOut(age / 0.25); g.el.style.transform = base + ` translateY(${(1 - p) * u * 3}px)`; g.el.style.opacity = p * (1 - out); return;
        }
        if (st === "count" && g.num) {
          const p = eOut(age / 0.7), m = g.num.match(/[\d.,\s]+/);
          if (m) { const tgt = parseFloat(m[0].replace(/[\s,]/g, "").replace(/\.(?=\d{3})/g, "")) || 0, cur = Math.round(tgt * p);
            g.el.querySelector(".nm").textContent = g.num.replace(m[0].trim(), cur.toLocaleString("en-US")); }
          g.el.style.transform = base + ` scale(${0.85 + 0.15 * eBack(age / 0.4)})`; return;
        }
        g.el.style.transform = base;
        g.spans.forEach((sp, j) => {
          const w = g.ws[Math.min(j, g.ws.length - 1)], ws = w ? w.s : g.s, a = t - ws;
          const p = eOut((a + 0.03) / 0.22);
          if (st === "neon") {
            // les mots à venir sont déjà visibles en grisé flou, puis s'allument
            if (sp.classList.contains("dot")) { sp.style.opacity = t >= g.e ? 1 : 0; return; }
            sp.style.opacity = (0.28 + 0.72 * p).toFixed(3); sp.style.filter = `blur(${((1 - p) * 4).toFixed(1)}px)`;
            sp.style.transform = `scale(${(sp.classList.contains("k") ? 1 + 0.12 * (1 - eOut(a / 0.3)) * (a > 0 ? 1 : 0) : 1).toFixed(3)})`;
          } else if (st === "gaming") {
            const b = a > -0.03 ? eBack((a + 0.03) / 0.22) : 0;
            sp.style.opacity = a > -0.03 ? 1 : 0; sp.style.transform = `scale(${(1.6 - 0.6 * b).toFixed(3)})`;
          } else if (st === "cine") {
            const big = sp.classList.contains("big");
            sp.style.opacity = p.toFixed(3); sp.style.filter = `blur(${((1 - p) * 8).toFixed(1)}px)`;
            sp.style.transform = `translateY(${((1 - p) * u * 2).toFixed(1)}px)`;
            if (big && !sp.classList.contains("k")) { const c = Math.round(138 + 117 * eOut(a / Math.max(0.25, w.e - w.s))); sp.style.color = `rgb(${c},${c},${c})`; }
          } else if (st === "high") {
            sp.style.opacity = p.toFixed(3); sp.style.transform = `translateY(${((1 - p) * u * 1.5).toFixed(1)}px)`;
            const hl = sp.querySelector(".hl");
            if (hl) { const h = eOut((a - 0.05) / 0.25); hl.style.transform = `scaleX(${h.toFixed(3)})`; sp.classList.toggle("on", h > 0.5); }
          } else if (st === "edito") {
            sp.style.opacity = p.toFixed(3); sp.style.filter = `blur(${((1 - p) * 10).toFixed(1)}px)`;
            sp.style.letterSpacing = `${((1 - p) * 0.08).toFixed(3)}em`; sp.style.transform = `translateY(${((1 - p) * u * 1.6).toFixed(1)}px)`;
          } else {
            sp.style.opacity = p.toFixed(3); sp.style.filter = `blur(${((1 - p) * 8).toFixed(1)}px)`;
            sp.style.transform = `translateY(${((1 - p) * u * 2.4).toFixed(1)}px) scale(${(0.9 + 0.1 * p).toFixed(3)})`;
          }
        });
      });
      heroes.forEach((h) => {
        if (!h.el) return;
        const d = t - h.s, out = t - h.end;
        if (d < -0.02 || out > 0.3) { h.el.style.opacity = 0; return; }
        const pin = eOut(d / 0.35), pout = clamp(out / 0.3);
        h.el.style.opacity = (pin * (1 - pout)).toFixed(3);
        h.el.style.transform = `translateY(-50%) scale(${(1.2 - 0.2 * pin + 0.05 * eOut((d - 0.35) / 1.4) + 0.1 * pout).toFixed(4)})`;
        h.el.style.filter = `blur(${((1 - pin) * 14 + pout * 10).toFixed(1)}px)`;
      });
      return heroOn;
    }
    return { render, groups: G, heroes };
  }
  window.Captions = { create, group };
})();
