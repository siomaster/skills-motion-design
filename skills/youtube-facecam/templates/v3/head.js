(function () {
  var tl = gsap.timeline({ paused: true });
  var LIME = '#D6FC31', INK = '#0B0B0B', WH = '#F4F4F2';
  function $(id) { return document.getElementById(id); }
  function add(parent, html) { var d = document.createElement('div'); d.innerHTML = html.trim(); var el = d.firstChild; $(parent).appendChild(el); return el; }

  // ---------- icônes au trait ----------
  var P = {
    folder: '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.7-.9l-.8-1.2A2 2 0 0 0 7.9 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>',
    video: '<path d="m16 13 5.2 3.5a.5.5 0 0 0 .8-.4V7.9a.5.5 0 0 0-.8-.4L16 11"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
    vol: '<path d="M11 4.7a.7.7 0 0 0-1.2-.5L6.4 7.6A1.4 1.4 0 0 1 5.4 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.4a1.4 1.4 0 0 1 1 .4l3.4 3.4a.7.7 0 0 0 1.2-.5z"/><path d="M16 9a5 5 0 0 1 0 6M19.4 18.4a9 9 0 0 0 0-12.8"/>',
    image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/>',
    user: '<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/>',
    code: '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
    bell: '<path d="M10.3 21a1.9 1.9 0 0 0 3.4 0M3.3 15.3A1 1 0 0 0 4 17h16a1 1 0 0 0 .7-1.7C19.4 14 18 12.5 18 8A6 6 0 0 0 6 8c0 4.5-1.4 6-2.7 7.3"/>',
    share: '<path d="m15 14 5-5-5-5"/><path d="M4 20v-7a4 4 0 0 1 4-4h12"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    up: '<path d="M12 19V5M5 12l7-7 7 7"/>',
    file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/><path d="M14 2v4a2 2 0 0 0 2 2h4M16 13H8M16 17H8M10 9H8"/>',
    layers: '<path d="M12.8 2.2a2 2 0 0 0-1.6 0L2.6 6.1a1 1 0 0 0 0 1.8l8.6 3.9a2 2 0 0 0 1.6 0l8.6-3.9a1 1 0 0 0 0-1.8z"/><path d="m2 12 9.2 4.2a2 2 0 0 0 1.6 0L22 12M2 17l9.2 4.2a2 2 0 0 0 1.6 0L22 17"/>',
    msg: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    mic: '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3"/>',
    book: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    clip: '<path d="m21.4 11-8.6 8.6a6 6 0 0 1-8.5-8.5l8.6-8.5a4 4 0 0 1 5.6 5.6l-8.6 8.6a2 2 0 0 1-2.8-2.8l8-8"/>',
    gauge: '<path d="m12 14 4-4"/><path d="M3.3 19a10 10 0 1 1 17.4 0"/>',
  };
  function icon(n, s, c, w) { return '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="' + c + '" stroke-width="' + (w || 1.8) + '" stroke-linecap="round" stroke-linejoin="round" style="display:block">' + P[n] + '</svg>'; }
  var CUR = '<svg width="50" height="50" viewBox="0 0 24 24"><path d="M5 2.5v17.2l4.3-4.1 3.1 6.6 3-1.4-3.1-6.5h6z" fill="#fff" stroke="#0B0B0B" stroke-width="1.3" stroke-linejoin="round"/></svg>';

  // ---------- gabarits ----------
  function card(id, inner) { return add('C', '<div id="' + id + '" class="L card"><div class="g1"></div><div class="g2"></div><div class="grain"></div><div class="stage" id="' + id + '_st">' + inner + '</div></div>'); }
  function layer(id, inner) { return add('O', '<div id="' + id + '" class="L">' + inner + '</div>'); }
  // carte de verre qui naît d'un trait (W×H), icône + titre + sous-titre
  function gcard(id, x, y, W, H, ic, on, t1, t2) {
    var tile = '<div class="ict' + (on ? ' on' : '') + '">' + icon(ic, 34, on ? INK : WH) + '</div>';
    return '<div id="' + id + '" class="glass" style="left:' + x + 'px;top:' + y + 'px;width:' + W + 'px;height:' + H + 'px"><div class="gc gi" style="position:absolute;left:0;top:0;width:' + W + 'px;height:' + H + 'px">' + tile + '<div><div class="t1" id="' + id + '_a">' + t1 + '</div>' + (t2 ? '<div class="t2" id="' + id + '_b">' + t2 + '</div>' : '') + '</div></div><div class="hz"></div></div>';
  }
  function show(id, t) { tl.set('#' + id, { opacity: 1, display: 'block' }, t); }
  function hide(id, t) { tl.set('#' + id, { opacity: 0, display: 'none' }, t); }
  function unfold(id, t, W, H) {
    tl.fromTo('#' + id, { width: 4, height: 0, opacity: 1 }, { height: H, duration: 0.25, ease: 'power3.out' }, t);
    tl.to('#' + id, { width: W, duration: 0.55, ease: 'expo.out' }, t + 0.25);
    tl.fromTo('#' + id + ' .gi', { opacity: 0, filter: 'blur(8px)' }, { opacity: 1, filter: 'blur(0px)', duration: 0.35, ease: 'power2.out' }, t + 0.42);
    tl.fromTo('#' + id + ' .hz', { opacity: 0, scaleX: 0.2 }, { opacity: 0.8, scaleX: 1, duration: 0.6, ease: 'expo.out' }, t + 0.3);
  }
  function fold(id, t) {
    tl.to('#' + id + ' .gi', { opacity: 0, filter: 'blur(6px)', duration: 0.18 }, t);
    tl.to('#' + id, { width: 4, duration: 0.3, ease: 'power3.in' }, t + 0.08);
    tl.to('#' + id, { height: 0, opacity: 0, duration: 0.18, ease: 'power2.in' }, t + 0.38);
  }
  function swapText(sel, txt, t) { tl.to(sel, { opacity: 0, filter: 'blur(6px)', duration: 0.15 }, t - 0.15); tl.set(sel, { textContent: txt }, t); tl.to(sel, { opacity: 1, filter: 'blur(0px)', duration: 0.3 }, t + 0.01); }

  // mots qui apparaissent un par un : flou → net, gris → blanc
  function split(el) {
    var walk = function (node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (w) {
            if (!w) return;
            if (/^\s+$/.test(w)) { frag.appendChild(document.createTextNode(' ')); return; }
            var s = document.createElement('span'); s.className = 'w'; s.style.display = 'inline-block';
            if (/^\*/.test(w)) { s.dataset.c = LIME; w = w.slice(1); }
            s.textContent = w; frag.appendChild(s);
          });
          n.parentNode.replaceChild(frag, n);
        } else walk(n);
      });
    };
    walk(el); return el;
  }
  function wb(id, times, dur) {
    var ws = split($(id)).querySelectorAll('.w');
    ws.forEach(function (w, i) {
      var t = Array.isArray(times) ? times[Math.min(i, times.length - 1)] : times + i * 0.08;
      var c = w.dataset.c || (w.closest('.grey') ? '#A9A9A4' : WH);
      tl.fromTo(w, { opacity: 0, filter: 'blur(9px)', color: '#77776F' }, { opacity: 1, filter: 'blur(0px)', color: c, duration: dur || 0.38, ease: 'power2.out' }, t);
    });
  }
  function wbOut(id, t) { tl.to('#' + id, { opacity: 0, filter: 'blur(10px)', y: -20, duration: 0.3, ease: 'power2.in' }, t); }
  function type(id, text, t0, t1) { var el = $(id), o = { p: 0 }; tl.fromTo(o, { p: 0 }, { p: 1, duration: t1 - t0, ease: 'none', onUpdate: function () { el.textContent = text.slice(0, Math.round(o.p * text.length)); } }, t0); }
  function scramble(id, text, t0, dur) { var el = $(id), o = { p: 0 }; var star = function (n) { var s = text.slice(0, n); for (var i = n; i < text.length; i++) s += text[i] === ' ' ? ' ' : '*'; return s; }; el.textContent = star(0); tl.fromTo(o, { p: 0 }, { p: 1, duration: dur, ease: 'power1.inOut', onUpdate: function () { el.textContent = star(Math.floor(o.p * text.length)); } }, t0); }
  function breathe(id, t0, t1) { tl.fromTo('#' + id + ' .g1', { x: 60, y: -40, scale: 0.92 }, { x: -40, y: 30, scale: 1.08, duration: t1 - t0, ease: 'sine.inOut' }, t0); tl.fromTo('#' + id + ' .g2', { x: -50, y: 40, scale: 1.06 }, { x: 40, y: -30, scale: 0.94, duration: t1 - t0, ease: 'sine.inOut' }, t0); }
  function click(sel, t, after) { tl.to(sel, { scale: 0.9, duration: 0.08, ease: 'power2.in' }, t); tl.to(sel, Object.assign({ scale: 1, duration: 0.28, ease: 'back.out(2)' }, after || {}), t + 0.08); }

  // ---------- light leak (bleu → blanc → grain lime), coupe au pic blanc ----------
  var LEAKS = [];
  function leak(t) {
    LEAKS.push(t);
    tl.set('#lk_b', { opacity: 0, xPercent: 35 }, t - 0.17); tl.to('#lk_b', { opacity: 1, xPercent: 0, duration: 0.12, ease: 'power2.in' }, t - 0.17);
    tl.set('#lk_w', { opacity: 0 }, t - 0.08); tl.to('#lk_w', { opacity: 1, duration: 0.07, ease: 'power1.in' }, t - 0.08);
    tl.to('#lk_w', { opacity: 0, duration: 0.15, ease: 'power1.out' }, t + 0.03);
    tl.to('#lk_b', { opacity: 0, duration: 0.15 }, t + 0.06);
    tl.set(['#lk_g', '#lk_n'], { opacity: 0.95 }, t + 0.1); tl.to(['#lk_g', '#lk_n'], { opacity: 0, duration: 0.3, ease: 'power1.out' }, t + 0.12);
  }
  // ---------- caméra face cam : coupes sèches + zoom arrière d'atterrissage ----------
  var A = { W: [1, 0, 0], M: [1.18, 136, 97], C: [1.42, 163, 178], X: [1.6, 184, 216], R: [1.4, 384, 170], R2: [1.55, 528, 200], L: [1.3, -190, 160] };
  function cam(t, a, land) {
    var v = A[a];
    if (land) { tl.set('#facein', { scale: v[0] * 1.25, x: v[1] * 1.25, y: v[2] * 1.25, filter: 'blur(4px)' }, t); tl.to('#facein', { scale: v[0], x: v[1], y: v[2], filter: 'blur(0px)', duration: 0.85, ease: 'expo.out' }, t); }
    else tl.set('#facein', { scale: v[0], x: v[1], y: v[2], filter: 'blur(0px)' }, t);
  }
  // ---------- caméra sur l'enregistrement d'écran : recadrage à chaque coupe + travelling lent ----------
  function scam(S, cuts, end, foc) {
    cuts.forEach(function (t0, i) {
      var t1 = i + 1 < cuts.length ? cuts[i + 1] : end, f = foc[i];
      tl.set('#' + S + 'c', { transformOrigin: f[0] * 100 + '% ' + f[1] * 100 + '%', scale: f[2] }, t0);
      tl.to('#' + S + 'c', { scale: f[2] * (f[3] || 1.07), duration: t1 - t0, ease: 'sine.inOut' }, t0);
    });
  }

