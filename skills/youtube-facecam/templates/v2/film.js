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

  // ======================================================================
  // F1 · face cam (0 → 42.75)
  // ======================================================================
  cam(0, 'W', true);
  layer('hook', '<div id="hk1" class="tx w500" style="left:0;right:0;top:640px;text-align:center;font-size:124px"><span>*3 choses à savoir</span></div><div id="hk2" class="tx w300" style="left:0;right:0;top:812px;text-align:center;font-size:46px">avant de faire du montage vidéo avec <b class="w500" style="font-weight:500">Claude Opus 5.5</b></div>');
  show('hook', 0); tl.to('#fshade', { opacity: 1, duration: 0.4 }, 0);
  wb('hk1', [0.02, 0.4, 0.64, 0.8], 0.45);
  wb('hk2', [1.12, 1.52, 1.92, 2.08, 2.24, 2.48, 2.8, 3.12, 3.44, 4.24]);
  tl.fromTo('#hk1', { scale: 1.04 }, { scale: 1, duration: 4.8, ease: 'none' }, 0);
  wbOut('hook', 4.85); tl.to('#fshade', { opacity: 0, duration: 0.4 }, 4.9); hide('hook', 5.2);
  cam(5.1, 'C');

  // B-roll cinémascope de mes rendus (1 s par plan)
  show('BR', 6.8); tl.fromTo('#broll', { scale: 1.06 }, { scale: 1.0, duration: 3.6, ease: 'none' }, 6.8);
  leak(10.0); hide('BR', 10.0);

  // citation
  card('q1', '<div id="q1g" style="position:absolute;inset:0"><div id="q1o" class="tx w500 lime" style="left:250px;top:300px;font-size:150px;line-height:1">“</div><div id="q1c" class="tx w500 lime" style="right:250px;top:640px;font-size:150px;line-height:1">”</div><div id="q1a" class="tx w500" style="left:0;right:0;top:420px;text-align:center;font-size:88px">Personne ne te dit</div><div id="q1b" class="tx w500" style="left:0;right:0;top:530px;text-align:center;font-size:88px">ce que tu dois *savoir avant.</div></div>');
  show('q1', 10.0); breathe('q1', 10.0, 15.2);
  tl.fromTo('#q1g', { rotation: -2.6, scale: 1, x: -16 }, { rotation: -1.8, scale: 1.05, x: 16, duration: 5.1, ease: 'none' }, 10.0);
  tl.fromTo('#q1o', { x: -70, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: 'expo.out' }, 10.15);
  tl.fromTo('#q1c', { x: 70, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: 'expo.out' }, 10.25);
  wb('q1a', [10.32, 10.72, 10.96, 11.2]); wb('q1b', [11.68, 11.92, 12.08, 12.24, 14.22, 14.54]);
  leak(15.1); hide('q1', 15.1); cam(15.1, 'W', true);
  cam(19.13, 'C');

  // les 3 choses : cartes 3D masquées
  var TILE = function (id, n, ic, x, y) { return '<div id="' + id + '" class="tile3" style="left:' + x + 'px;top:' + y + 'px"><div class="holo"></div><div class="tx w300 it grey" style="left:30px;top:30px;font-size:28px">Chose n°' + n + '</div><div class="tx w500" id="' + id + '_n" style="left:30px;top:74px;font-size:34px">**********</div><div id="' + id + '_i" style="position:absolute;left:105px;top:200px;opacity:.55;filter:blur(7px)">' + icon(ic, 120, WH, 1.4) + '</div></div>'; };
  card('k3', '<div id="k3t" class="tx w500" style="left:170px;top:380px;font-size:96px">Les <span>*3</span> choses</div><div id="k3s" class="tx w300 it grey" style="left:176px;top:500px;font-size:44px">à comprendre avant de monter avec Claude</div><div id="k3f" style="position:absolute;left:0;top:0;width:1920px;height:1080px">' + TILE('k3a', 1, 'layers', 1010, 300) + TILE('k3b', 2, 'folder', 1240, 270) + TILE('k3c', 3, 'msg', 1470, 240) + '</div>');
  leak(19.3); show('k3', 19.3); breathe('k3', 19.3, 23.7);
  [['#k3a', 20.3, 1010, 300, -16], ['#k3b', 20.45, 1240, 270, -8], ['#k3c', 20.6, 1470, 240, 0]].forEach(function (c) {
    tl.fromTo(c[0], { y: 420, rotationX: -60, rotationZ: c[4] - 20, opacity: 0, transformPerspective: 1500 }, { y: 0, rotationX: 12, rotationZ: c[4], rotationY: -18, opacity: 1, duration: 0.8, ease: 'expo.out' }, c[1]);
    tl.to(c[0], { rotationZ: c[4] + 2.5, y: -14, duration: 2.6, ease: 'sine.inOut' }, c[1] + 0.8);
  });
  tl.fromTo('#k3f', { x: 60 }, { x: -40, duration: 4.4, ease: 'none' }, 19.3);
  wb('k3t', [20.07, 20.3, 20.55]); wb('k3s', [20.79, 21.02, 21.27, 21.66, 22.06, 22.46, 23.43, 23.66]);
  leak(23.6); hide('k3', 23.6); cam(23.6, 'W', true);

  // chapitres : fond noir + dégradés de coins, grand chiffre métal, carte qui se révèle, piste de progression
  function chapter(n, t0, name, title, sub, tl1, tT, tS, tOut, ic) {
    var id = 'ch' + n;
    card(id, '<div id="' + id + 'n" class="tx w500 it metal" style="left:150px;top:200px;font-size:440px;line-height:1">' + n + '</div>' +
      '<div id="' + id + 'l" class="tx w300" style="left:520px;top:330px;font-size:30px;letter-spacing:0.28em;color:#BDBDB8">CHOSE ' + n + ' SUR 3</div>' +
      '<div id="' + id + 't" class="tx w500" style="left:512px;top:390px;font-size:112px">' + title + '</div>' +
      '<div id="' + id + 's" class="tx w300 it" style="left:518px;top:528px;font-size:54px;color:#D8D8D3">' + sub + '</div>' +
      '<div id="' + id + 'c" class="tile3" style="left:1490px;top:330px;width:300px;height:400px"><div class="holo"></div><div class="tx w300 it grey" style="left:26px;top:26px;font-size:26px">Chose n°' + n + '</div><div class="tx w500" id="' + id + 'cn" style="left:26px;top:66px;font-size:30px"></div><div id="' + id + 'ci" style="position:absolute;left:95px;top:180px">' + icon(ic, 110, WH, 1.4) + '</div></div>' +
      '<div class="track" style="left:150px;top:880px;width:1620px"><div class="fill" id="' + id + 'f"></div></div>');
    show(id, t0); breathe(id, t0, tOut + 0.2);
    tl.fromTo('#' + id + '_st', { scale: 1.0 }, { scale: 1.045, duration: tOut - t0, ease: 'none' }, t0);
    tl.fromTo('#' + id + 'n', { opacity: 0, filter: 'blur(14px)', x: -50 }, { opacity: 1, filter: 'blur(0px)', x: 0, duration: 0.7, ease: 'power3.out' }, t0 + 0.05);
    tl.fromTo('#' + id + 'f', { scaleX: (n - 1) / 3 }, { scaleX: n / 3, duration: 1.2, ease: 'power2.out' }, t0 + 0.35);
    var L = $(id + 'l'), txt = L.textContent; L.textContent = '';
    txt.split('').forEach(function (ch) { var s = document.createElement('span'); s.textContent = ch; s.style.opacity = 0; L.appendChild(s); });
    tl.to('#' + id + 'l span', { opacity: 1, duration: 0.05, stagger: 0.025 }, tl1);
    wb(id + 't', tT, 0.45); wb(id + 's', tS);
    tl.fromTo('#' + id + 'c', { rotationY: -40, rotationZ: -14, x: 200, opacity: 0, transformPerspective: 1500 }, { rotationY: -16, rotationZ: -8, x: 0, opacity: 1, duration: 0.9, ease: 'expo.out' }, t0 + 0.2);
    tl.to('#' + id + 'c', { rotationZ: -5, y: -12, duration: tOut - t0 - 1.1, ease: 'sine.inOut' }, t0 + 1.1);
    scramble(id + 'cn', name, tT[0], 0.9);
    tl.fromTo('#' + id + 'ci', { filter: 'blur(9px)', opacity: 0.5 }, { filter: 'blur(0px)', opacity: 1, duration: 0.5, ease: 'steps(5)' }, tT[0] + 0.3);
    hide(id, tOut);
  }
  tl.fromTo('#bu1', { opacity: 0 }, { opacity: 0.9, duration: 0.12 }, 25.2); tl.to('#bu1', { opacity: 0, duration: 0.3 }, 26.1);
  leak(25.35);
  chapter(1, 25.35, 'Préparer Claude', 'Préparer Claude', 'au montage vidéo', 25.6, [27.6, 28.08], [28.72, 29.04, 29.36], 29.7, 'layers');
  leak(29.7); cam(29.7, 'C', true);

  // interface : vidéo brute + consignes
  card('chat', '<div id="chatp" class="glass" style="left:410px;top:150px;width:1100px;height:780px;border-radius:32px;background:rgba(20,20,20,0.92)"><div class="tx w300 it grey" style="left:52px;top:42px;font-size:30px">Nouvelle conversation</div><div id="b1" class="bub" style="top:190px">Fais telle chose</div><div id="b2" class="bub" style="top:290px">Fais telle chose</div><div id="b3" class="bub" style="top:390px">Et telle chose</div><div class="bar" style="left:44px;top:600px;width:1012px;height:136px;padding:0 26px;gap:20px"><div id="chip" style="display:flex;align-items:center;gap:14px;height:80px;padding:0 26px 0 16px;border-radius:18px;background:#2B2B2B;font-size:30px;font-weight:500;white-space:nowrap">' + icon('video', 40, LIME) + 'video_brute.mp4</div><div class="w300 it" style="font-size:30px;color:#8C8C88;white-space:nowrap">Écris ta demande…</div><div style="margin-left:auto;width:72px;height:72px;border-radius:20px;background:#F4F4F2;display:grid;place-items:center">' + icon('up', 38, INK) + '</div></div></div>');
  leak(31.9); show('chat', 31.9); breathe('chat', 31.9, 35.9);
  tl.fromTo('#chat_st', { scale: 1.3, rotationY: 14, rotationX: 6, transformPerspective: 2200 }, { scale: 1, rotationY: -5, rotationX: 2, duration: 3.9, ease: 'power2.out' }, 31.9);
  tl.fromTo('#chip', { scale: 0.4, opacity: 0, y: 30 }, { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.8)' }, 32.32);
  [['#b1', 34.36], ['#b2', 34.84], ['#b3', 35.24]].forEach(function (b) { tl.fromTo(b[0], { scale: 0.5, opacity: 0, y: 40, filter: 'blur(6px)', transformOrigin: '100% 100%' }, { scale: 1, opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.4, ease: 'back.out(1.7)' }, b[1]); });
  leak(35.83); hide('chat', 35.83); cam(35.83, 'W', true);

  // panneau bas : résultat pas au top
  layer('sp1', '<div id="sp1p" class="glass" style="left:90px;top:846px;width:1740px;height:170px"><div class="gi" style="position:absolute;inset:0"><div class="tx w500" style="left:40px;top:30px;font-size:36px">Sans préparation</div><div class="tx w300 it grey" style="left:40px;top:92px;font-size:28px">Qualité du résultat</div><div class="track" style="left:420px;top:112px;width:900px"><div class="fill" id="sp1f" style="background:#F4F4F2;box-shadow:0 0 10px rgba(255,255,255,0.6)"></div></div><div id="sp1t" class="pill" style="left:1380px;top:76px;height:64px;background:#262626;color:#F4F4F2;font-size:28px">Pas au top</div></div><div class="hz"></div></div>');
  show('sp1', 36.7); tl.to('#fshade', { opacity: 1, duration: 0.4 }, 36.7);
  unfold('sp1p', 36.75, 1740, 170);
  tl.fromTo('#sp1f', { scaleX: 0 }, { scaleX: 0.42, duration: 1.0, ease: 'power2.out' }, 37.9);
  tl.fromTo('#sp1t', { opacity: 0, x: -30, filter: 'blur(6px)' }, { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.4, ease: 'power3.out' }, 39.0);
  cam(40.23, 'M');
  fold('sp1p', 42.3); tl.to('#fshade', { opacity: 0, duration: 0.4 }, 42.4);
  hide('sp1', 43.0);

  // ======================================================================
  // S1 · écran : installer les skills (43.0 → 113.16)
  // ======================================================================
  leak(43.0); show('S1', 43.0);
  scam('S1', [43.05, 45.13, 46.49, 49.49, 52.21, 56.13, 71.29, 82.53, 86.65, 96.29, 98.61, 103.57], 113.2,
    [[0.5, 0.4, 1.12], [0.5, 0.36, 1.32], [0.5, 0.45, 1.1], [0.5, 0.36, 1.28], [0.5, 0.7, 1.16], [0.45, 0.55, 1.15, 1.32], [0.58, 0.32, 1.12, 1.18], [0.47, 0.45, 1.4], [0.6, 0.5, 1.14], [0.62, 0.45, 1.34], [0.4, 0.5, 1.1], [0.36, 0.52, 1.25, 1.22]]);
  layer('s1o', gcard('sk', 70, 60, 560, 112, 'layers', true, 'Installer des skills', 'Préparer Claude'));
  show('s1o', 45.4); unfold('sk', 45.5, 560, 112);
  swapText('#sk_a', 'Remotion', 51.4); swapText('#sk_b', 'Skill n°1', 51.4);
  swapText('#sk_a', 'HyperFrames', 72.2); swapText('#sk_b', 'Skill n°2', 72.2);
  swapText('#sk_a', 'GSAP', 86.0); swapText('#sk_b', 'Skill n°3', 86.0);
  fold('sk', 112.5);
  // barre de prompt : « installe ce skill »
  function pbar(id, t0, url, tType, tSend, tOk, tOut, inst) {
    layer(id, '<div id="' + id + 'b" class="bar" style="left:330px;top:820px;width:1260px;height:150px;padding:0 30px;gap:22px;flex-direction:column;align-items:stretch;justify-content:center;backdrop-filter:blur(20px)"><div style="display:flex;align-items:center;gap:20px"><div style="flex:none">' + icon('clip', 40, '#9A9A96') + '</div><div style="flex:1;font-size:38px;font-weight:400;letter-spacing:-0.02em;white-space:nowrap;overflow:hidden"><span id="' + id + 'x"></span><span style="display:inline-block;width:3px;height:42px;background:#D6FC31;vertical-align:-8px;margin-left:3px"></span></div><div id="' + id + 's" style="flex:none;width:76px;height:76px;border-radius:22px;background:#3A3A3A;display:grid;place-items:center">' + icon('up', 40, INK) + '</div></div><div id="' + id + 'st" style="display:flex;align-items:center;gap:18px;height:0;opacity:0;overflow:hidden"><div id="' + id + 'si" style="flex:none">' + icon('check', 30, LIME, 2.4) + '</div><div id="' + id + 'sl" class="w300 it" style="font-size:28px;color:#C9C9C4;white-space:nowrap">Claude installe le skill…</div><div class="track" style="position:relative;flex:1;height:4px"><div class="fill" id="' + id + 'f"></div></div></div></div>');
    show(id, t0);
    tl.fromTo('#' + id + 'b', { y: 220, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'expo.out' }, t0);
    type(id + 'x', 'Installe ce skill : ' + url, tType[0], tType[1]);
    click('#' + id + 's', tSend, { backgroundColor: LIME });
    tl.to('#' + id + 'st', { height: 40, opacity: 1, duration: 0.35, ease: 'power3.out' }, tSend + 0.15);
    tl.fromTo('#' + id + 'f', { scaleX: 0 }, { scaleX: 1, duration: tOk - tSend - 0.3, ease: 'power1.inOut' }, tSend + 0.3);
    tl.fromTo('#' + id + 'si', { opacity: 0.25 }, { opacity: 1, duration: 0.2 }, tOk);
    tl.set('#' + id + 'sl', { textContent: 'Skill installé' }, tOk);
    tl.to('#' + id + 'b', { y: 220, opacity: 0, duration: 0.4, ease: 'power3.in' }, tOut - 0.4); hide(id, tOut);
  }
  pbar('pb1', 62.3, 'github.com/remotion-dev/remotion', [62.6, 65.5], 66.6, 70.9, 71.3);
  pbar('pb2', 78.2, 'github.com/heygen-com/hyperframes', [78.4, 80.4], 80.9, 82.2, 82.6);
  pbar('pb3', 106.5, 'github.com/greensock/gsap-skills', [106.7, 108.6], 109.0, 112.4, 113.1);
  // GSAP : transitions, animations, zooms, morphing
  layer('gs', gcard('gs1', 1300, 250, 520, 100, 'layers', false, 'Transitions') + gcard('gs2', 1300, 366, 520, 100, 'layers', false, 'Animations') + gcard('gs3', 1300, 482, 520, 100, 'layers', false, 'Zooms') + gcard('gs4', 1300, 598, 520, 100, 'layers', true, 'Morphing'));
  show('gs', 93.6); tl.to('#S1d', { opacity: 0.55, duration: 0.4 }, 93.6);
  [['gs1', 93.85], ['gs2', 95.05], ['gs3', 95.85], ['gs4', 96.75]].forEach(function (g) { unfold(g[0], g[1], 520, 100); });
  ['gs1', 'gs2', 'gs3', 'gs4'].forEach(function (g, i) { fold(g, 98.3 + i * 0.06); });
  tl.to('#S1d', { opacity: 0, duration: 0.4 }, 98.5); hide('gs', 99.0);
  hide('s1o', 113.16); leak(113.16); hide('S1', 113.16);

  // ======================================================================
  // F2 · face cam (113.16 → 151.91)
  // ======================================================================
  tl.fromTo('#bu2', { opacity: 0 }, { opacity: 0.9, duration: 0.12 }, 113.0); tl.to('#bu2', { opacity: 0, duration: 0.3 }, 114.5);
  chapter(2, 113.16, 'Dossier organisé', 'Un dossier', 'très bien organisé', 113.45, [116.29, 116.52], [117.24, 117.56, 117.72], 118.26, 'folder');
  leak(118.26); cam(118.26, 'W', true);
  // B-roll : « de très bons rendus comme ceux que tu regardes »
  show('BR2', 123.4); tl.fromTo('#broll2', { scale: 1.06 }, { scale: 1.0, duration: 2.7, ease: 'none' }, 123.4);
  leak(126.1); hide('BR2', 126.1); cam(126.1, 'C', true);
  // que mettre dans le dossier : cartes de verre dans l'espace vide à gauche (restent à travers les coupes)
  cam(126.73, 'R'); tl.to('#lshade', { opacity: 1, duration: 0.5 }, 127.6);
  layer('fl', gcard('fl1', 90, 140, 640, 104, 'video', false, 'Vidéos d\'inspiration') + gcard('fl2', 90, 262, 640, 104, 'vol', false, 'Effets sonores') + gcard('fl3', 90, 384, 640, 104, 'image', false, 'Images') +
    gcard('fl4', 90, 506, 640, 104, 'user', false, 'Photos du personnage', 'ou des photos de toi') + gcard('fl5', 90, 628, 640, 104, 'code', false, 'Composants · code HTML', 'pour une animation de SaaS') + gcard('fl6', 90, 750, 640, 104, 'folder', true, 'Toutes tes ressources', 'pour une animation de produit'));
  show('fl', 129.4);
  [['fl1', 129.5], ['fl2', 132.1], ['fl3', 133.5], ['fl4', 136.0], ['fl5', 142.8], ['fl6', 149.1]].forEach(function (g) { unfold(g[0], g[1], 640, 104); });
  cam(133.29, 'R2'); cam(135.46, 'R'); cam(143.53, 'R2'); cam(146.29, 'R'); cam(147.86, 'R2');
  ['fl1', 'fl2', 'fl3', 'fl4', 'fl5', 'fl6'].forEach(function (g, i) { fold(g, 151.3 + i * 0.04); });
  tl.to('#lshade', { opacity: 0, duration: 0.3 }, 151.6); hide('fl', 151.91);

  // ======================================================================
  // S2 · écran : le dossier organisé (151.91 → 259.17)
  // ======================================================================
  leak(151.91); show('S2', 151.91);
  scam('S2', [152.06, 152.78, 160.66, 163.82, 165.54, 169.38, 172.14, 182.78, 184.3, 189.3, 191.9, 193.78, 195.18, 196.46, 197.94, 202.82, 208.5, 209.7, 212.74, 215.06, 219.38, 222.14, 224.18, 233.54, 234.02, 236.74, 245.1, 247.1, 247.86, 250.62], 259.2,
    [[0.3, 0.3, 1.3], [0.5, 0.4, 1.1], [0.6, 0.3, 1.25], [0.5, 0.4, 1.1], [0.5, 0.4, 1.1], [0.5, 0.4, 1.1], [0.42, 0.3, 1.45, 1.1], [0.5, 0.35, 1.35], [0.45, 0.35, 1.25], [0.6, 0.4, 1.12], [0.6, 0.45, 1.3], [0.35, 0.35, 1.4], [0.45, 0.35, 1.3], [0.62, 0.45, 1.25], [0.68, 0.45, 1.35], [0.72, 0.4, 1.5], [0.3, 0.3, 1.5], [0.75, 0.4, 1.4], [0.6, 0.5, 1.2], [0.75, 0.5, 1.3], [0.4, 0.3, 1.2], [0.5, 0.4, 1.3], [0.3, 0.3, 1.6, 1.1], [0.35, 0.3, 1.7], [0.3, 0.5, 1.3], [0.25, 0.35, 1.4], [0.15, 0.6, 1.5], [0.15, 0.6, 1.5], [0.15, 0.55, 1.5], [0.82, 0.55, 1.6, 1.1]]);
  layer('s2o', gcard('d2', 70, 60, 560, 112, 'folder', true, 'Dossier organisé', 'Chose n°2'));
  show('s2o', 152.7); unfold('d2', 152.8, 560, 112); fold('d2', 163.2); hide('s2o', 163.8);
  // citation : il faut donner des ressources
  card('q2', '<div id="q2g" style="position:absolute;inset:0"><div id="q2z" class="tx w300 it grey" style="left:0;right:0;top:330px;text-align:center;font-size:48px">Ça ne marche pas comme ça.</div><div id="q2a" class="tx w500" style="left:0;right:0;top:430px;text-align:center;font-size:96px">Il faut donner des *ressources</div><div id="q2b" class="tx w500" style="left:0;right:0;top:550px;text-align:center;font-size:96px">à Claude, de la *data.</div></div>');
  leak(163.7); show('q2', 163.7); breathe('q2', 163.7, 172.0);
  tl.fromTo('#q2g', { rotation: -2.4, scale: 1, x: -16 }, { rotation: -1.6, scale: 1.06, x: 16, duration: 8.3, ease: 'none' }, 163.7);
  wb('q2z', [164.2, 164.5, 164.6, 164.9, 165.3, 165.4]); wb('q2a', [165.7, 165.75, 165.8, 166.1, 166.3]); wb('q2b', [167.3, 167.6, 168.4, 168.5, 168.7]);
  leak(171.95); hide('q2', 171.95);
  // mon dossier : voix off, images, vidéos
  layer('df', gcard('df0', 1290, 70, 560, 112, 'folder', true, 'Mon dossier de projet', 'un motion design') + gcard('df1', 1290, 196, 560, 100, 'mic', false, 'Voix off') + gcard('df2', 1290, 310, 560, 100, 'image', false, 'Images') + gcard('df3', 1290, 424, 560, 100, 'video', false, 'Vidéos'));
  show('df', 174.0);
  [['df0', 174.1, 112], ['df1', 177.7, 100], ['df2', 179.2, 100], ['df3', 184.0, 100]].forEach(function (g) { unfold(g[0], g[1], 560, g[2]); });
  ['df0', 'df1', 'df2', 'df3'].forEach(function (g, i) { fold(g, 191.4 + i * 0.05); }); hide('df', 192.0);
  // CTA milieu de vidéo : s'abonner, cloche, partager
  layer('sub', '<div id="subg" class="glass" style="left:560px;top:860px;width:800px;height:140px;border-radius:70px"><div id="subb" class="pill" style="left:24px;top:24px;height:92px;border-radius:46px;background:#F4F4F2;color:#0B0B0B;padding:0 40px"><span id="subt">S\'abonner</span></div><div id="bell" style="position:absolute;left:330px;top:24px;width:92px;height:92px;border-radius:46px;background:#272727;display:grid;place-items:center"><span id="belli" style="display:block">' + icon('bell', 46, WH) + '</span></div><div id="subs" class="pill" style="left:446px;top:24px;height:92px;border-radius:46px;background:#272727;color:#F4F4F2;padding:0 40px 0 30px">' + icon('share', 42, WH) + 'Partager</div></div><div id="subc" class="cur" style="left:1500px;top:1100px">' + CUR + '</div>');
  show('sub', 185.3);
  tl.fromTo('#subg', { y: 220, opacity: 0, scale: 0.8 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'expo.out' }, 185.3);
  tl.fromTo('#subc', { x: 0, y: 0 }, { x: -1240, y: -170, duration: 0.7, ease: 'power3.out' }, 185.6);
  click('#subb', 186.4, { backgroundColor: '#272727', color: WH }); tl.set('#subt', { textContent: 'Abonné' }, 186.48);
  tl.to('#subc', { x: -1000, y: -170, duration: 0.35, ease: 'power3.inOut' }, 186.75);
  click('#bell', 187.15, { backgroundColor: LIME }); tl.set('#belli', { innerHTML: icon('bell', 46, INK) }, 187.23);
  tl.fromTo('#belli', { rotation: 0 }, { keyframes: [{ rotation: 18 }, { rotation: -14 }, { rotation: 9 }, { rotation: -5 }, { rotation: 0 }], duration: 0.7, ease: 'sine.inOut' }, 187.25);
  tl.to('#subc', { x: -760, y: -170, duration: 0.4, ease: 'power3.inOut' }, 187.8);
  click('#subs', 188.25);
  tl.to('#subc', { x: -500, y: 200, opacity: 0, duration: 0.5, ease: 'power2.in' }, 188.7);
  tl.to('#subg', { y: 220, opacity: 0, duration: 0.4, ease: 'power3.in' }, 190.6); hide('sub', 191.0);
  // le résultat
  layer('rs', gcard('rs1', 70, 60, 420, 100, 'video', true, 'Le résultat'));
  show('rs', 192.3); unfold('rs1', 192.35, 420, 100); fold('rs1', 197.3); hide('rs', 197.8);
  // l'image du dossier se retrouve dans la vidéo
  layer('ae', gcard('ae1', 70, 60, 620, 112, 'image', false, 'After Effect.png', 'du dossier… dans la vidéo'));
  show('ae', 203.4); unfold('ae1', 203.45, 620, 112); fold('ae1', 209.6); hide('ae', 210.1);
  // organiser un dossier
  layer('og', '<div class="bshade" style="opacity:0.8"></div>' + gcard('og1', 90, 880, 820, 120, 'folder', true, 'Organiser un dossier', 'avec les ressources nécessaires'));
  show('og', 215.1); unfold('og1', 215.2, 820, 120); fold('og1', 221.7); hide('og', 222.2);
  // exemple 2 : Impact et Vous
  layer('iv', gcard('iv0', 1270, 70, 580, 112, 'book', true, 'Exemple 2', 'une librairie en ligne') + gcard('iv1', 1270, 196, 580, 100, 'image', false, 'Images des livres') + gcard('iv2', 1270, 310, 580, 100, 'user', false, 'Photo du pasteur') + gcard('iv3', 1270, 424, 580, 100, 'mic', false, '2 voix off · 2 scripts') + gcard('iv4', 1270, 538, 580, 100, 'video', true, '4 vidéos générées'));
  show('iv', 225.2);
  [['iv0', 225.3, 112], ['iv1', 230.6, 100], ['iv2', 234.3, 100], ['iv3', 238.3, 100], ['iv4', 248.6, 100]].forEach(function (g) { unfold(g[0], g[1], 580, g[2]); });
  ['iv0', 'iv1', 'iv2', 'iv3', 'iv4'].forEach(function (g, i) { fold(g, 250.3 + i * 0.05); }); hide('iv', 251.0);
  leak(259.17); hide('S2', 259.17);

  // ======================================================================
  // F3 · face cam (259.17 → 278.82)
  // ======================================================================
  tl.fromTo('#bu3', { opacity: 0 }, { opacity: 0.9, duration: 0.12 }, 259.0); tl.to('#bu3', { opacity: 0, duration: 0.3 }, 260.5);
  chapter(3, 259.17, 'Le prompt', 'Le prompt', 'que tu envoies à Claude', 259.6, [261.45, 261.61], [261.93, 262.17, 262.49, 262.89, 263.13], 263.42, 'msg');
  leak(263.42); cam(263.42, 'W', true);
  cam(263.61, 'M'); cam(263.77, 'C'); cam(263.93, 'X'); cam(264.89, 'W');
  // le prompt que la plupart envoient
  card('pr', '<div id="prl" class="tx w300 it grey" style="left:0;right:0;top:250px;text-align:center;font-size:44px">Ce que la plupart envoient</div><div id="prb" class="bar" style="left:260px;top:370px;width:1400px;height:300px;padding:44px 50px;align-items:flex-start;border-radius:34px"><div style="width:1180px;font-size:56px;font-weight:400;letter-spacing:-0.02em;line-height:1.25;white-space:normal"><span id="prx"></span><span style="display:inline-block;width:4px;height:60px;background:#D6FC31;vertical-align:-8px;margin-left:4px"></span></div><div id="prs" style="position:absolute;right:40px;bottom:36px;width:96px;height:96px;border-radius:28px;background:#3A3A3A;display:grid;place-items:center">' + icon('up', 50, INK) + '</div></div><div id="prc" class="cur" style="left:1700px;top:900px">' + CUR + '</div>');
  leak(267.37); show('pr', 267.37); breathe('pr', 267.37, 271.8);
  tl.fromTo('#pr_st', { scale: 1.35, rotationY: -8, transformPerspective: 2200 }, { scale: 1, rotationY: 4, duration: 4.3, ease: 'power2.out' }, 267.37);
  wb('prl', 267.5);
  type('prx', 'Dérushe la vidéo et fais tout ce qu’il faut pour un meilleur rendu', 267.57, 270.9);
  tl.fromTo('#prc', { x: 0, y: 0 }, { x: -220, y: -270, duration: 0.6, ease: 'power3.out' }, 270.6);
  click('#prs', 271.25, { backgroundColor: LIME });
  leak(271.72); hide('pr', 271.72); cam(271.72, 'C', true);
  cam(275.12, 'W');

  // ======================================================================
  // S3 · écran : le prompt (278.82 → 326.5)
  // ======================================================================
  leak(278.82); show('S3', 278.82);
  scam('S3', [278.97, 285.25, 290.21, 291.49, 295.45, 307.69, 316.49, 318.01, 319.25, 322.17, 324.17], 326.5,
    [[0.42, 0.5, 1.15], [0.4, 0.5, 1.1], [0.14, 0.9, 1.9, 1.06], [0.14, 0.9, 1.95, 1.06], [0.5, 0.3, 1.2], [0.4, 0.3, 1.2], [0.4, 0.3, 1.3], [0.45, 0.35, 1.5], [0.62, 0.45, 1.4], [0.62, 0.45, 1.6], [0.5, 0.5, 1.3]]);
  layer('s3o', gcard('p3', 70, 60, 520, 112, 'msg', true, 'Le prompt', 'Chose n°3'));
  show('s3o', 279.2); unfold('p3', 279.3, 520, 112);
  // « ce qui me vient en tête, c'est ce que je dis »
  tl.to('#S3d', { opacity: 1, duration: 0.4, ease: 'power2.out' }, 282.6);
  layer('q3', '<div id="q3a" class="tx w500" style="left:0;right:0;top:420px;text-align:center;font-size:92px">Ce qui me vient en tête,</div><div id="q3b" class="tx w500" style="left:0;right:0;top:540px;text-align:center;font-size:92px">c\'est ce que je *dis.</div>');
  show('q3', 282.7); tl.fromTo('#q3', { rotation: -2, scale: 1 }, { rotation: -1.4, scale: 1.05, duration: 3.2, ease: 'none' }, 282.7);
  wb('q3a', [282.9, 283.2, 283.3, 283.5, 283.7, 283.9]); wb('q3b', [284.5, 284.7, 284.8, 284.9, 285.1]);
  wbOut('q3', 285.7); hide('q3', 286.0);
  // pas de style de prompt figé
  layer('nf', '<div id="nfr" class="glass" style="left:560px;top:450px;width:800px;height:150px"><div class="gc gi" style="position:absolute;inset:0;padding-left:34px"><div class="ict" style="width:84px;height:84px">' + icon('x', 44, WH) + '</div><div><div class="t1" style="font-size:44px">Un style de prompt figé</div><div class="t2" style="font-size:28px">que je respecte à la lettre</div></div></div><div class="hz"></div></div>');
  show('nf', 286.0); unfold('nfr', 286.1, 800, 150);
  tl.to('#nfr', { keyframes: [{ x: -14 }, { x: 12 }, { x: -10 }, { x: 8 }, { x: -6 }, { x: 4 }, { x: 0 }], duration: 0.6, ease: 'none' }, 289.6);
  fold('nfr', 290.0); hide('nf', 290.6);
  tl.to('#S3d', { opacity: 0, duration: 0.3 }, 290.2);
  layer('ia', gcard('ia1', 700, 70, 520, 100, 'msg', false, 'Ce que j\'écris à l\'IA'));
  show('ia', 291.0); unfold('ia1', 291.1, 520, 100); fold('ia1', 294.9); hide('ia', 295.4);
  // comparaison : prompt réutilisé ↔ dire clairement ce que je veux
  tl.to('#S3d', { opacity: 1, duration: 0.4 }, 295.45);
  layer('cmp', '<div id="cmpst" style="position:absolute;inset:0">' +
    '<div id="cmpa" class="glass" style="left:330px;top:300px;width:600px;height:420px;border-radius:30px"><div class="tx w300 it grey" style="left:40px;top:40px;font-size:30px">Au lieu de</div><div class="tx w500" style="left:40px;top:96px;font-size:50px">Un prompt réutilisé</div><div class="tx w300 it" style="left:40px;top:170px;font-size:32px;color:#C9C9C4">le même à chaque fois</div><div class="ict" style="position:absolute;left:40px;top:290px;width:90px;height:90px">' + icon('x', 46, WH) + '</div></div>' +
    '<div id="cmpb" class="glass" style="left:990px;top:300px;width:600px;height:420px;border-radius:30px;border-color:rgba(214,252,49,0.45)"><div class="tx w300 it grey" style="left:40px;top:40px;font-size:30px">Moi, je préfère</div><div class="tx w500" style="left:40px;top:96px;font-size:50px">Dire clairement</div><div class="tx w500" style="left:40px;top:160px;font-size:50px">ce que je veux</div><div class="ict on" style="position:absolute;left:40px;top:290px;width:90px;height:90px">' + icon('check', 50, INK, 2.2) + '</div></div></div>');
  show('cmp', 295.6);
  tl.fromTo('#cmpst', { x: 300, rotationY: 10, transformPerspective: 2400 }, { x: 120, rotationY: 6, duration: 5.4, ease: 'sine.inOut' }, 295.6);
  tl.fromTo('#cmpa', { y: 120, opacity: 0, filter: 'blur(8px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.6, ease: 'expo.out' }, 297.4);
  tl.to('#cmpst', { x: -120, rotationY: -6, duration: 0.9, ease: 'power3.inOut' }, 301.0);
  tl.to('#cmpa', { opacity: 0.4, duration: 0.5 }, 301.4);
  tl.fromTo('#cmpb', { y: 120, opacity: 0, filter: 'blur(8px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.6, ease: 'expo.out' }, 302.7);
  tl.to('#cmp', { opacity: 0, filter: 'blur(10px)', duration: 0.3 }, 305.0); hide('cmp', 305.35);
  // parce que j'ai déjà : skills, dossier, direction artistique, style
  layer('ck', '<div id="ckt" class="tx w300 it" style="left:0;right:0;top:190px;text-align:center;font-size:46px;color:#D8D8D3">Parce que j\'ai déjà</div>' +
    gcard('ck1', 560, 290, 800, 104, 'check', true, 'Mes skills installés') + gcard('ck2', 560, 410, 800, 104, 'check', true, 'Un dossier bien organisé') + gcard('ck3', 560, 530, 800, 104, 'check', true, 'Claude comprend la direction artistique') + gcard('ck4', 560, 650, 800, 104, 'check', true, 'et le style de vidéo'));
  show('ck', 305.4); wb('ckt', [305.5, 305.6, 306.2, 306.3]);
  [['ck1', 306.9], ['ck2', 308.2], ['ck3', 312.5], ['ck4', 314.7]].forEach(function (g) { unfold(g[0], g[1], 800, 104); });
  tl.to('#ckt', { opacity: 0, duration: 0.25 }, 316.1); ['ck1', 'ck2', 'ck3', 'ck4'].forEach(function (g, i) { fold(g, 316.1 + i * 0.05); }); hide('ck', 316.8);
  tl.to('#S3d', { opacity: 0, duration: 0.35 }, 316.3);
  // dossier inspiration
  layer('in', gcard('in1', 700, 70, 520, 100, 'folder', true, 'Dossier inspiration') + '<div class="bshade" style="opacity:0.7"></div>' + gcard('in2', 90, 880, 760, 112, 'video', false, 'Des vidéos d\'inspiration', 'Claude se base dessus'));
  show('in', 318.1); unfold('in1', 318.2, 520, 100); unfold('in2', 320.1, 760, 112);
  fold('in1', 325.6); fold('in2', 325.65); fold('p3', 325.7); hide('in', 326.3); hide('s3o', 326.3);
  leak(326.3); hide('S3', 326.3);

  // ======================================================================
  // F4 · face cam (326.5 → 352)
  // ======================================================================
  cam(326.3, 'W', true);
  layer('sp2', '<div id="sp2p" class="glass" style="left:90px;top:846px;width:1740px;height:170px"><div class="gi" style="position:absolute;inset:0"><div class="tx w500" style="left:40px;top:30px;font-size:36px">Si à la base</div>' +
    '<div id="sp2a" class="row" style="left:30px;top:76px;height:80px;font-size:32px"><div class="ict" style="width:56px;height:56px">' + icon('x', 30, WH) + '</div>Pas de skills installés</div>' +
    '<div id="sp2b" class="row" style="left:600px;top:76px;height:80px;font-size:32px"><div class="ict" style="width:56px;height:56px">' + icon('x', 30, WH) + '</div>Pas de dossier organisé</div>' +
    '<div id="sp2c" class="row" style="left:1180px;top:76px;height:80px;font-size:32px"><div class="ict" style="width:56px;height:56px">' + icon('x', 30, WH) + '</div>Rien de préparé</div></div><div class="hz"></div></div>');
  show('sp2', 326.6); tl.to('#fshade', { opacity: 1, duration: 0.4 }, 326.6);
  unfold('sp2p', 326.7, 1740, 170);
  [['#sp2a', 328.9], ['#sp2b', 331.0], ['#sp2c', 333.0]].forEach(function (r) { tl.fromTo(r[0], { rotationX: -90, y: 30, opacity: 0, transformPerspective: 1200 }, { rotationX: 0, y: 0, opacity: 1, duration: 0.55, ease: 'expo.out' }, r[1]); });
  cam(332.3, 'M');
  fold('sp2p', 334.4); tl.to('#fshade', { opacity: 0, duration: 0.4 }, 334.5); hide('sp2', 335.1);
  // tokens
  card('tk', '<div id="tkl" class="tx w300 it" style="left:260px;top:280px;font-size:52px;color:#D8D8D3">Claude va consommer</div><div id="tkt" class="tx w500" style="left:250px;top:360px;font-size:150px">beaucoup de *tokens</div><div class="track" style="left:260px;top:650px;width:1400px;height:8px;border-radius:4px"><div class="fill" id="tkf" style="height:10px"></div></div><div class="tx w300 it grey" style="left:260px;top:700px;font-size:34px">Tokens consommés</div>');
  leak(335.1); show('tk', 335.1); breathe('tk', 335.1, 339.4);
  tl.fromTo('#tk_st', { rotationY: -10, scale: 1.08, transformPerspective: 2400 }, { rotationY: 6, scale: 1, duration: 4.2, ease: 'sine.inOut' }, 335.1);
  wb('tkl', [335.24, 335.48, 335.72]); wb('tkt', [336.2, 336.76, 336.92], 0.45);
  tl.fromTo('#tkf', { scaleX: 0 }, { scaleX: 0.96, duration: 2.8, ease: 'power2.inOut' }, 336.2);
  leak(339.3); hide('tk', 339.3); cam(339.3, 'C', true);
  layer('mn', '<div class="bshade" style="opacity:0.8"></div>' + gcard('mn1', 90, 880, 700, 112, 'video', false, 'Une vidéo de 5 à 10 min', 'montée par Claude'));
  show('mn', 339.3); unfold('mn1', 339.4, 700, 112); fold('mn1', 341.2); hide('mn', 341.68);
  card('tk2', '<div id="tk2a" class="tx w500" style="left:0;right:0;top:340px;text-align:center;font-size:190px">des *milliers</div><div id="tk2b" class="tx w300 it" style="left:0;right:0;top:570px;text-align:center;font-size:96px;color:#D8D8D3">de tokens</div>');
  leak(341.68); show('tk2', 341.68); breathe('tk2', 341.68, 344.0);
  tl.fromTo('#tk2_st', { scale: 1.12, rotationX: 10, transformPerspective: 2200 }, { scale: 1, rotationX: -3, duration: 2.3, ease: 'power2.out' }, 341.68);
  wb('tk2a', [342.49, 342.81], 0.45); wb('tk2b', [343.21, 343.45]);
  leak(343.95); hide('tk2', 343.95); cam(343.95, 'W', true);
  layer('wf', '<div class="bshade" style="opacity:0.8"></div>' + gcard('wf1', 90, 880, 760, 112, 'file', true, 'Mon workflow complet', 'le guide pour monter avec Claude'));
  show('wf', 344.4); unfold('wf1', 344.5, 760, 112); cam(345.87, 'M'); fold('wf1', 347.9); hide('wf', 348.35);
  // fin : commente « Claude Opus 5.5 »
  tl.fromTo('#bu4', { opacity: 0 }, { opacity: 0.85, duration: 0.12 }, 348.2); tl.to('#bu4', { opacity: 0, duration: 0.3 }, 348.9);
  cam(348.35, 'L');
  layer('cm', '<div id="cmc" class="glass" style="left:1030px;top:250px;width:800px;height:560px;border-radius:36px"><div class="tx w300 it grey" style="left:56px;top:48px;font-size:34px">Commente sous cette vidéo</div><div style="position:absolute;left:56px;top:140px;width:96px;height:96px;border-radius:48px;background:#2A2A2A;display:grid;place-items:center">' + icon('user', 50, '#BDBDB8') + '</div><div style="position:absolute;left:176px;top:132px;width:570px;height:112px;border-radius:22px;background:#1A1A1A;border:1.5px solid #3A3A3A;padding:0 30px;display:flex;align-items:center;font-size:46px;font-weight:500;letter-spacing:-0.02em;white-space:nowrap"><span id="cmx"></span><span style="display:inline-block;width:4px;height:52px;background:#D6FC31;margin-left:4px"></span></div><div id="cmb" class="pill" style="left:446px;top:280px;height:86px;border-radius:43px;background:#2A2A2A;color:#F4F4F2;padding:0 40px">Commenter</div><div id="cmg" style="position:absolute;left:56px;top:420px;display:flex;align-items:center;gap:22px;white-space:nowrap"><div class="ict on" style="width:86px;height:86px">' + icon('file', 46, INK) + '</div><div><div style="font-size:40px;font-weight:500;letter-spacing:-0.02em">Je t\'envoie le guide</div><div class="w300 it" style="font-size:30px;color:#C9C9C4">gratuitement</div></div></div></div><div id="cmcur" class="cur" style="left:1900px;top:1100px">' + CUR + '</div>');
  show('cm', 348.35);
  tl.fromTo('#cmc', { x: 700, rotationY: -30, opacity: 0, transformPerspective: 2200 }, { x: 0, rotationY: -6, opacity: 1, duration: 0.8, ease: 'expo.out' }, 348.35);
  tl.to('#cmc', { rotationY: 4, duration: 2.8, ease: 'sine.inOut' }, 349.2);
  type('cmx', 'Claude Opus 5.5', 348.65, 349.55);
  tl.fromTo('#cmcur', { x: 0, y: 0 }, { x: -380, y: -730, duration: 0.6, ease: 'power3.out' }, 349.3);
  click('#cmb', 349.95, { backgroundColor: LIME, color: INK });
  tl.to('#cmcur', { x: -300, y: -500, opacity: 0, duration: 0.5, ease: 'power2.in' }, 350.4);
  tl.fromTo('#cmg', { y: 40, opacity: 0, filter: 'blur(8px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: 'expo.out' }, 350.33);

  window.__LEAKS = LEAKS;
  tl.set({}, {}, 352.0);
  window.__timelines = window.__timelines || {};
  window.__timelines['main'] = tl;
  tl.seek(0);
})();
