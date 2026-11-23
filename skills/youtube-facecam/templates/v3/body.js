
  // lettres dans des masques (titres en capitales)
  function chars(id) {
    var el = $(id), out = '';
    el.textContent.split(' ').forEach(function (w, wi) {
      var acc = /^\*/.test(w); w = w.replace(/^\*/, '');
      out += (wi ? ' ' : '') + '<span class="cw" style="display:inline-block;white-space:nowrap' + (acc ? ';color:#D6FC31' : '') + '">' + w.split('').map(function (c) { return '<span style="display:inline-block;overflow:hidden;vertical-align:top;padding:.1em .02em .14em;margin:-.1em -.02em -.14em"><span class="ch" style="display:inline-block">' + c + '</span></span>'; }).join('') + '</span>';
    });
    el.innerHTML = out; return el.querySelectorAll('.cw');
  }
  function charsIn(words, times) {
    words.forEach(function (w, i) { tl.fromTo(w.querySelectorAll('.ch'), { yPercent: 115, rotationX: -70, filter: 'blur(6px)', opacity: 0 }, { yPercent: 0, rotationX: 0, filter: 'blur(0px)', opacity: 1, duration: 0.7, stagger: 0.028, ease: 'expo.out' }, times[i]); });
  }

  // ======================================================================
  // F1 · face cam (0 → 43)
  // ======================================================================
  tl.set('#facebox', { x: 0, scale: 1, rotationY: 0, zIndex: 0, clipPath: 'none' }, 0);
  leak(0.1); cam(0.1, 'W', true);
  layer('hook', '<div class="bshade"></div><div id="hk3" class="tx dmd w500 lime" style="left:0;right:0;top:600px;text-align:center;font-size:150px;line-height:1">3</div><div id="hk1" class="tx dmd w500" style="left:0;right:0;top:760px;text-align:center;font-size:104px">CHOSES À SAVOIR</div><div id="hk2" class="tx w300" style="left:0;right:0;top:900px;text-align:center;font-size:36px;color:#E4E4DF">avant de faire du montage vidéo avec <b style="font-weight:500;color:#F4F4F2">Claude Opus 5.5</b></div>');
  show('hook', 0);
  tl.fromTo('#hk3', { scale: 2.4, rotationY: 90, opacity: 0, filter: 'blur(14px)', transformPerspective: 900, textShadow: '0 0 60px rgba(214,252,49,0.9)' }, { scale: 1, rotationY: 0, opacity: 1, filter: 'blur(0px)', textShadow: '0 0 26px rgba(214,252,49,0.45)', duration: 0.75, ease: 'expo.out' }, 0.05);
  var hw = chars('hk1'); charsIn(hw, [0.4, 0.64, 0.8]);
  wb('hk2', [1.12, 1.52, 1.92, 2.08, 2.24, 2.48, 2.8, 3.12, 3.44, 4.24]);
  tl.fromTo('#hk1', { scale: 0.96 }, { scale: 1.03, duration: 4.6, ease: 'none' }, 0.4);
  tl.to('#hk1 .ch', { keyframes: [{ textShadow: '0 0 0 rgba(255,255,255,0)' }, { textShadow: '0 0 28px rgba(255,255,255,0.9)' }, { textShadow: '0 0 18px rgba(255,255,255,0.22)' }], duration: 0.5, stagger: 0.03 }, 1.7);
  tl.to('#hk1 .ch', { yPercent: -115, filter: 'blur(6px)', opacity: 0, duration: 0.35, stagger: 0.012, ease: 'power2.in' }, 4.75);
  tl.to(['#hk3', '#hk2'], { opacity: 0, filter: 'blur(10px)', y: -20, duration: 0.3, ease: 'power2.in' }, 4.8);
  hide('hook', 5.2);

  // carrousel de vidéos (droite → gauche), ma face cam arrive en dernière carte puis s'agrandit
  leak(5.05); show('CAR', 5.05);
  wb('carlab', [5.84, 6.0, 6.24, 6.32]);
  var CX = [200, 820, 1440, 2060, 2680, 3300], FX = 3920, row = { x: 1350 };
  var placeCards = function () {
    for (var i = 0; i < 6; i++) { var sx = CX[i] + row.x + 280; var a = gsap.utils.clamp(-38, 38, (sx - 960) / 960 * -32); gsap.set('#cc' + (i + 1), { x: row.x, rotationY: a, z: -Math.abs(sx - 960) * 0.22, transformPerspective: 1700 }); }
    var fx = FX + row.x + 280; var fa = gsap.utils.clamp(-38, 38, (fx - 960) / 960 * -32);
    gsap.set('#facebox', { x: fx - 960, scale: 560 / 1920, rotationY: fa, transformPerspective: 1700 * 1920 / 560 });
  };
  tl.set('#facebox', { zIndex: 6, clipPath: 'inset(0% round 70px)' }, 5.05);
  tl.fromTo(row, { x: 1350 }, { x: -3240, duration: 4.75, ease: 'power1.inOut', onUpdate: placeCards, immediateRender: false }, 5.05);
  cam(5.05, 'W');
  tl.to('#facebox', { scale: 1, x: 0, rotationY: 0, clipPath: 'inset(0% round 0px)', duration: 0.65, ease: 'expo.inOut' }, 9.8);
  tl.to('#carrow', { x: -500, opacity: 0, duration: 0.5, ease: 'power2.in' }, 9.85);
  hide('CAR', 10.45); tl.set('#facebox', { zIndex: 0, clipPath: 'none', x: 0, scale: 1, rotationY: 0 }, 10.46);

  // « personne ne te dit ce que tu dois savoir avant » : texte bas centré sur la face cam
  layer('q1', '<div class="bshade"></div><div id="q1a" class="tx dmd w500" style="left:0;right:0;top:780px;text-align:center;font-size:66px">Personne ne te dit</div><div id="q1b" class="tx dmd w500" style="left:0;right:0;top:862px;text-align:center;font-size:66px">ce que tu dois *savoir avant.</div>');
  show('q1', 10.25); wb('q1a', [10.32, 10.72, 10.96, 11.2]); wb('q1b', [11.68, 11.92, 12.08, 12.24, 14.22, 14.54]);
  wbOut('q1', 14.9); hide('q1', 15.25);
  cam(13.4, 'M'); leak(15.1); cam(15.1, 'W', true); cam(19.13, 'C');

  // les 3 choses : cartes 3D masquées
  var TILE = function (id, n, ic, x, y) { return '<div id="' + id + '" class="tile3" style="left:' + x + 'px;top:' + y + 'px"><div class="holo"></div><div class="tx w300 it grey" style="left:30px;top:30px;font-size:28px">Chose n°' + n + '</div><div class="tx dmd w500" id="' + id + '_n" style="left:30px;top:74px;font-size:34px">**********</div><div id="' + id + '_i" style="position:absolute;left:105px;top:200px;opacity:.55;filter:blur(7px)">' + icon(ic, 120, WH, 1.4) + '</div></div>'; };
  card('k3', '<div id="k3t" class="tx dmd w500" style="left:170px;top:370px;font-size:104px">LES <span>*3</span> CHOSES</div><div id="k3s" class="tx w300 it" style="left:176px;top:500px;font-size:42px;color:#D8D8D3">à comprendre avant de monter avec Claude</div><div id="k3f" style="position:absolute;left:0;top:0;width:1920px;height:1080px">' + TILE('k3a', 1, 'layers', 1010, 300) + TILE('k3b', 2, 'folder', 1240, 270) + TILE('k3c', 3, 'msg', 1470, 240) + '</div>');
  leak(19.3); show('k3', 19.3); breathe('k3', 19.3, 23.7);
  [['#k3a', 20.3, -16], ['#k3b', 20.45, -8], ['#k3c', 20.6, 0]].forEach(function (c) {
    tl.fromTo(c[0], { y: 420, rotationX: -60, rotationZ: c[2] - 20, opacity: 0, transformPerspective: 1500 }, { y: 0, rotationX: 12, rotationZ: c[2], rotationY: -18, opacity: 1, duration: 0.8, ease: 'expo.out' }, c[1]);
    tl.to(c[0], { rotationZ: c[2] + 2.5, y: -14, duration: 2.6, ease: 'sine.inOut' }, c[1] + 0.8);
  });
  tl.fromTo('#k3f', { x: 60 }, { x: -40, duration: 4.4, ease: 'none' }, 19.3);
  wb('k3t', [20.07, 20.3, 20.55]); wb('k3s', [20.79, 21.02, 21.27, 21.66, 22.06, 22.46, 23.43, 23.66]);
  leak(23.6); hide('k3', 23.6); cam(23.6, 'W', true);

  // chapitres : fond noir + dégradés de coins, grand chiffre métal, titre en capitales révélé, piste de progression
  function chapter(n, t0, title, sub, tl1, tT, tS, tOut) {
    var id = 'ch' + n;
    card(id, '<div id="' + id + 'n" class="tx dmd w500 it metal" style="left:170px;top:250px;font-size:470px;line-height:1">' + n + '</div>' +
      '<div id="' + id + 'l" class="tx w300 caps" style="left:560px;top:360px;font-size:28px;color:#BDBDB8">CHOSE ' + n + ' SUR 3</div>' +
      '<div id="' + id + 't" class="tx dmd w500" style="left:552px;top:410px;font-size:128px">' + title + '</div>' +
      '<div id="' + id + 's" class="tx w300 it" style="left:560px;top:570px;font-size:50px;color:#D8D8D3">' + sub + '</div>' +
      '<div class="track" style="left:170px;top:860px;width:1580px"><div class="fill" id="' + id + 'f"></div></div>');
    show(id, t0); breathe(id, t0, tOut + 0.2);
    tl.fromTo('#' + id + '_st', { scale: 1.0, x: 30 }, { scale: 1.05, x: -30, duration: tOut - t0, ease: 'none' }, t0);
    tl.fromTo('#' + id + 'n', { opacity: 0, filter: 'blur(16px)', x: -60, rotationY: 40, transformPerspective: 1200 }, { opacity: 1, filter: 'blur(0px)', x: 0, rotationY: 0, duration: 0.8, ease: 'expo.out' }, t0 + 0.05);
    tl.fromTo('#' + id + 'f', { scaleX: (n - 1) / 3 }, { scaleX: n / 3, duration: 1.2, ease: 'power2.out' }, t0 + 0.35);
    var L = $(id + 'l'), txt = L.textContent; L.textContent = '';
    txt.split('').forEach(function (ch) { var s = document.createElement('span'); s.textContent = ch; s.style.opacity = 0; L.appendChild(s); });
    tl.to('#' + id + 'l span', { opacity: 1, duration: 0.05, stagger: 0.025 }, tl1);
    var tw = chars(id + 't'); charsIn(tw, tT);
    wb(id + 's', tS);
    hide(id, tOut);
  }
  leak(25.35);
  chapter(1, 25.35, 'PRÉPARER CLAUDE', 'au montage vidéo', 25.6, [27.6, 28.08], [28.72, 29.04, 29.36], 29.7);
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
  // S1 · écran (format d'origine) : installer les skills (43 → 135.87)
  // ======================================================================
  leak(42.9); show('S1', 42.9);
  layer('s1o', gcard('sk', 70, 60, 560, 112, 'layers', true, 'Installer des skills', 'Préparer Claude'));
  show('s1o', 45.4); unfold('sk', 45.5, 560, 112);
  swapText('#sk_a', 'Remotion', 53.6); swapText('#sk_b', 'Skill n°1', 53.6);
  swapText('#sk_a', 'HyperFrames', 82.0); swapText('#sk_b', 'Skill n°2', 82.0);
  swapText('#sk_a', 'GSAP', 96.7); swapText('#sk_b', 'Skill n°3', 96.7);
  fold('sk', 135.2);
  function pbar(id, t0, url, tType, tSend, tOk, tOut) {
    layer(id, '<div id="' + id + 'b" class="bar" style="left:330px;top:840px;width:1260px;height:150px;padding:0 30px;gap:22px;flex-direction:column;align-items:stretch;justify-content:center;backdrop-filter:blur(20px)"><div style="display:flex;align-items:center;gap:20px"><div style="flex:none">' + icon('clip', 40, '#9A9A96') + '</div><div style="flex:1;font-size:38px;font-weight:400;white-space:nowrap;overflow:hidden"><span id="' + id + 'x"></span><span style="display:inline-block;width:3px;height:42px;background:#D6FC31;vertical-align:-8px;margin-left:3px"></span></div><div id="' + id + 's" style="flex:none;width:76px;height:76px;border-radius:22px;background:#3A3A3A;display:grid;place-items:center">' + icon('up', 40, INK) + '</div></div><div id="' + id + 'st" style="display:flex;align-items:center;gap:18px;height:0;opacity:0;overflow:hidden"><div id="' + id + 'si" style="flex:none">' + icon('check', 30, LIME, 2.4) + '</div><div id="' + id + 'sl" class="w300 it" style="font-size:28px;color:#C9C9C4;white-space:nowrap">Claude installe le skill…</div><div class="track" style="position:relative;flex:1;height:4px"><div class="fill" id="' + id + 'f"></div></div></div></div>');
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
  pbar('pb1', 64.6, 'github.com/remotion-dev/remotion', [64.8, 67.4], 69.0, 73.0, 73.45);
  layer('fast1', gcard('fs1', 1490, 60, 360, 100, 'layers', false, 'Accéléré ×4'));
  show('fast1', 73.5); unfold('fs1', 73.55, 360, 100); fold('fs1', 80.6); hide('fast1', 81.1);
  pbar('pb2', 88.0, 'github.com/heygen-com/hyperframes', [88.2, 90.0], 90.9, 92.0, 92.3);
  layer('gs', gcard('gs1', 1300, 250, 520, 100, 'layers', false, 'Transitions') + gcard('gs2', 1300, 366, 520, 100, 'layers', false, 'Animations') + gcard('gs3', 1300, 482, 520, 100, 'layers', false, 'Zooms') + gcard('gs4', 1300, 598, 520, 100, 'layers', true, 'Morphing'));
  show('gs', 104.3);
  [['gs1', 104.45], ['gs2', 105.65], ['gs3', 106.45], ['gs4', 117.3]].forEach(function (g) { unfold(g[0], g[1], 520, 100); });
  ['gs1', 'gs2', 'gs3', 'gs4'].forEach(function (g, i) { fold(g, 118.9 + i * 0.06); }); hide('gs', 119.6);
  pbar('pb3', 129.1, 'github.com/greensock/gsap-skills', [129.3, 131.2], 131.7, 134.9, 135.7);
  hide('s1o', 135.87); leak(135.87); hide('S1', 135.87);

  // ======================================================================
  // F2 · face cam (135.87 → 174.62)
  // ======================================================================
  chapter(2, 135.87, 'UN DOSSIER', 'très bien organisé', 136.16, [139.0, 139.23], [139.95, 140.27, 140.43], 140.97);
  leak(140.97); cam(140.97, 'W', true);
  // mes rendus : 1 horizontale + 2 verticales
  leak(144.5); show('SHOW', 144.5); breathe('SHOW', 144.5, 149.4);
  tl.fromTo('#shst', { rotationY: 8, scale: 0.96, transformPerspective: 2400 }, { rotationY: -6, scale: 1.02, duration: 4.9, ease: 'none' }, 144.5);
  [['#shv1', 144.55], ['#shh', 144.65], ['#shv2', 144.75]].forEach(function (c) { tl.fromTo(c[0], { y: 260, rotationX: -40, opacity: 0, transformPerspective: 1600 }, { y: 0, rotationX: 0, opacity: 1, duration: 0.8, ease: 'expo.out' }, c[1]); });
  wb('shl', [146.94, 147.18, 147.34]);
  leak(149.35); hide('SHOW', 149.35); cam(149.35, 'R', true);
  // que mettre dans le dossier : cartes de verre à gauche
  tl.to('#lshade', { opacity: 1, duration: 0.5 }, 150.3);
  layer('fl', gcard('fl1', 90, 140, 640, 104, 'video', false, 'Vidéos d\'inspiration') + gcard('fl2', 90, 262, 640, 104, 'vol', false, 'Effets sonores') + gcard('fl3', 90, 384, 640, 104, 'image', false, 'Images') +
    gcard('fl4', 90, 506, 640, 104, 'user', false, 'Photos du personnage', 'ou des photos de toi') + gcard('fl5', 90, 628, 640, 104, 'code', false, 'Composants · code HTML', 'pour une animation de SaaS') + gcard('fl6', 90, 750, 640, 104, 'folder', true, 'Toutes tes ressources', 'pour une animation de produit'));
  show('fl', 152.1);
  [['fl1', 152.21], ['fl2', 154.81], ['fl3', 156.21], ['fl4', 158.71], ['fl5', 165.51], ['fl6', 171.81]].forEach(function (g) { unfold(g[0], g[1], 640, 104); });
  cam(156.0, 'R2'); cam(158.17, 'R'); cam(166.24, 'R2'); cam(169.0, 'R'); cam(170.57, 'R2');
  ['fl1', 'fl2', 'fl3', 'fl4', 'fl5', 'fl6'].forEach(function (g, i) { fold(g, 174.0 + i * 0.04); });
  tl.to('#lshade', { opacity: 0, duration: 0.3 }, 174.3); hide('fl', 174.62);

  // ======================================================================
  // S2 · écran : le dossier organisé (174.62 → 322.06)
  // ======================================================================
  leak(174.62); show('S2', 174.62);
  layer('s2o', gcard('d2', 70, 60, 560, 112, 'folder', true, 'Dossier organisé', 'Chose n°2'));
  show('s2o', 175.4); unfold('d2', 175.5, 560, 112); fold('d2', 185.9); hide('s2o', 186.4);
  // « ça ne marche pas comme ça… il faut donner des ressources »
  tl.to('#S2d', { opacity: 1, duration: 0.4, ease: 'power2.out' }, 186.3);
  layer('q2', '<div id="q2g" style="position:absolute;inset:0"><div id="q2z" class="tx w300 it" style="left:0;right:0;top:350px;text-align:center;font-size:46px;color:#D8D8D3">Ça ne marche pas comme ça.</div><div id="q2a" class="tx dmd w500" style="left:0;right:0;top:440px;text-align:center;font-size:96px">Il faut donner des *ressources</div><div id="q2b" class="tx dmd w500" style="left:0;right:0;top:556px;text-align:center;font-size:96px">à Claude, de la *data.</div></div>');
  show('q2', 186.4); tl.fromTo('#q2g', { rotation: -2, scale: 1 }, { rotation: -1.3, scale: 1.05, duration: 8.2, ease: 'none' }, 186.4);
  wb('q2z', [186.9, 187.2, 187.3, 187.6, 188.0, 188.1]); wb('q2a', [188.4, 188.45, 188.5, 188.8, 189.0]); wb('q2b', [190.1, 190.3, 191.1, 191.2, 191.4]);
  wbOut('q2', 194.4); hide('q2', 194.8); tl.to('#S2d', { opacity: 0, duration: 0.35 }, 194.5);
  // mon dossier : voix off, images, vidéos
  layer('df', gcard('df0', 1290, 70, 560, 112, 'folder', true, 'Mon dossier de projet', 'un motion design') + gcard('df1', 1290, 196, 560, 100, 'mic', false, 'Voix off') + gcard('df2', 1290, 310, 560, 100, 'image', false, 'Images') + gcard('df3', 1290, 424, 560, 100, 'video', false, 'Vidéos'));
  show('df', 196.8);
  [['df0', 196.9, 112], ['df1', 200.4, 100], ['df2', 201.9, 100], ['df3', 206.7, 100]].forEach(function (g) { unfold(g[0], g[1], 560, g[2]); });
  ['df0', 'df1', 'df2', 'df3'].forEach(function (g, i) { fold(g, 209.9 + i * 0.05); }); hide('df', 210.5);
  // CTA milieu : s'abonner, cloche, partager
  layer('sub', '<div id="subg" class="glass" style="left:560px;top:860px;width:800px;height:140px;border-radius:70px"><div id="subb" class="pill" style="left:24px;top:24px;height:92px;border-radius:46px;background:#F4F4F2;color:#0B0B0B;padding:0 40px"><span id="subt">S\'abonner</span></div><div id="bell" style="position:absolute;left:330px;top:24px;width:92px;height:92px;border-radius:46px;background:#272727;display:grid;place-items:center"><span id="belli" style="display:block">' + icon('bell', 46, WH) + '</span></div><div id="subs" class="pill" style="left:446px;top:24px;height:92px;border-radius:46px;background:#272727;color:#F4F4F2;padding:0 40px 0 30px">' + icon('share', 42, WH) + 'Partager</div></div><div id="subc" class="cur" style="left:1500px;top:1100px">' + CUR + '</div>');
  show('sub', 210.5);
  tl.fromTo('#subg', { y: 220, opacity: 0, scale: 0.8 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'expo.out' }, 210.5);
  tl.fromTo('#subc', { x: 0, y: 0 }, { x: -1240, y: -170, duration: 0.7, ease: 'power3.out' }, 210.8);
  click('#subb', 211.6, { backgroundColor: '#272727', color: WH }); tl.set('#subt', { textContent: 'Abonné' }, 211.68);
  tl.to('#subc', { x: -1000, y: -170, duration: 0.35, ease: 'power3.inOut' }, 211.95);
  click('#bell', 212.35, { backgroundColor: LIME }); tl.set('#belli', { innerHTML: icon('bell', 46, INK) }, 212.43);
  tl.fromTo('#belli', { rotation: 0 }, { keyframes: [{ rotation: 18 }, { rotation: -14 }, { rotation: 9 }, { rotation: -5 }, { rotation: 0 }], duration: 0.7, ease: 'sine.inOut' }, 212.45);
  tl.to('#subc', { x: -760, y: -170, duration: 0.4, ease: 'power3.inOut' }, 213.0);
  click('#subs', 213.45);
  tl.to('#subc', { x: -500, y: 200, opacity: 0, duration: 0.5, ease: 'power2.in' }, 213.9);
  tl.to('#subg', { y: 220, opacity: 0, duration: 0.4, ease: 'power3.in' }, 215.8); hide('sub', 216.2);
  layer('rs', gcard('rs1', 70, 60, 420, 100, 'video', true, 'Le résultat'));
  show('rs', 218.5); unfold('rs1', 218.55, 420, 100); fold('rs1', 226.6); hide('rs', 227.1);
  layer('ae', gcard('ae1', 70, 60, 620, 112, 'image', false, 'After Effect.png', 'du dossier… dans la vidéo'));
  show('ae', 232.3); unfold('ae1', 232.35, 620, 112); fold('ae1', 240.6); hide('ae', 241.1);
  layer('og', '<div class="bshade" style="opacity:0.8"></div>' + gcard('og1', 90, 880, 820, 120, 'folder', true, 'Organiser un dossier', 'avec les ressources nécessaires'));
  show('og', 250.2); unfold('og1', 250.3, 820, 120); fold('og1', 263.0); hide('og', 263.5);
  layer('fast2', gcard('fs2', 1490, 60, 360, 100, 'layers', false, 'Accéléré ×3'));
  show('fast2', 265.45); unfold('fs2', 265.5, 360, 100); fold('fs2', 267.1); hide('fast2', 267.6);
  layer('iv', gcard('iv0', 1270, 70, 580, 112, 'book', true, 'Exemple 2', 'une librairie en ligne') + gcard('iv1', 1270, 196, 580, 100, 'image', false, 'Images des livres') + gcard('iv2', 1270, 310, 580, 100, 'user', false, 'Photo du pasteur') + gcard('iv3', 1270, 424, 580, 100, 'mic', false, '2 voix off · 2 scripts') + gcard('iv4', 1270, 538, 580, 100, 'video', true, '4 vidéos générées'));
  show('iv', 269.5);
  [['iv0', 269.6, 112], ['iv1', 275.5, 100], ['iv2', 280.1, 100], ['iv3', 287.9, 100], ['iv4', 305.0, 100]].forEach(function (g) { unfold(g[0], g[1], 580, g[2]); });
  ['iv0', 'iv1', 'iv2', 'iv3', 'iv4'].forEach(function (g, i) { fold(g, 306.7 + i * 0.05); }); hide('iv', 307.4);

  // ======================================================================
  // PAUSE PUBLICITAIRE (322.06 → 373.01)
  // ======================================================================
  tl.fromTo('#bu1', { opacity: 0 }, { opacity: 0.9, duration: 0.12 }, 321.85); tl.to('#bu1', { opacity: 0, duration: 0.35 }, 323.0);
  leak(322.06); hide('S2', 322.06);
  card('pp', '<div id="ppl" class="tx w300 caps" style="left:0;right:0;top:360px;text-align:center;font-size:30px;color:#BDBDB8">PAUSE PUBLICITAIRE</div><div id="ppt" class="tx dmd w500" style="left:0;right:0;top:420px;text-align:center;font-size:118px">MOTION DESIGN</div><div id="pps" class="tx w300 it" style="left:0;right:0;top:570px;text-align:center;font-size:48px;color:#D8D8D3">la formation Claude Opus 5.5</div><div id="ppk" class="pill" style="left:780px;top:690px;height:72px;background:#D6FC31;color:#0B0B0B;font-size:30px">' + icon('file', 34, INK) + 'Lien en description</div>');
  show('pp', 322.06); breathe('pp', 322.06, 324.7);
  tl.fromTo('#pp_st', { scale: 1.08 }, { scale: 1, duration: 2.6, ease: 'power2.out' }, 322.06);
  var pl = $('ppl'), ptx = pl.textContent; pl.textContent = ''; ptx.split('').forEach(function (ch) { var s = document.createElement('span'); s.textContent = ch; s.style.opacity = 0; pl.appendChild(s); });
  tl.to('#ppl span', { opacity: 1, duration: 0.05, stagger: 0.022 }, 322.3);
  var pw = chars('ppt'); charsIn(pw, [322.55, 322.75]);
  wb('pps', 323.2);
  tl.fromTo('#ppk', { y: 40, opacity: 0, scale: 0.85 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.8)' }, 323.6);
  leak(324.6); hide('pp', 324.6); show('PUB', 324.6);
  layer('lk', '<div id="lkp" class="glass" style="left:70px;top:930px;width:470px;height:96px;border-radius:48px"><div class="gc gi" style="position:absolute;inset:0"><div class="ict on" style="width:60px;height:60px;border-radius:30px">' + icon('file', 32, INK) + '</div><div class="t1" style="font-size:32px">Lien en description</div></div></div>');
  show('lk', 327.0); unfold('lkp', 327.0, 470, 96); fold('lkp', 333.0);
  unfold('lkp', 365.5, 470, 96); fold('lkp', 371.3); hide('lk', 371.8);
  tl.fromTo('#bu2', { opacity: 0 }, { opacity: 0.9, duration: 0.12 }, 371.7); tl.to('#bu2', { opacity: 0, duration: 0.35 }, 373.2);

  // ======================================================================
  // F3 · face cam (373.01 → 392.51)
  // ======================================================================
  leak(373.01); hide('PUB', 373.01);
  chapter(3, 373.01, 'LE PROMPT', 'que tu envoies à Claude', 373.29, [375.14, 375.30], [375.62, 375.86, 376.18, 376.58, 376.82], 377.11);
  leak(377.11); cam(377.11, 'W', true);
  cam(377.30, 'M'); cam(377.46, 'C'); cam(377.62, 'X'); cam(378.58, 'W');
  card('pr', '<div id="prl" class="tx w300 it grey" style="left:0;right:0;top:250px;text-align:center;font-size:44px">Ce que la plupart envoient</div><div id="prb" class="bar" style="left:260px;top:370px;width:1400px;height:300px;padding:44px 50px;align-items:flex-start;border-radius:34px"><div style="width:1180px;font-size:56px;font-weight:400;line-height:1.25;white-space:normal"><span id="prx"></span><span style="display:inline-block;width:4px;height:60px;background:#D6FC31;vertical-align:-8px;margin-left:4px"></span></div><div id="prs" style="position:absolute;right:40px;bottom:36px;width:96px;height:96px;border-radius:28px;background:#3A3A3A;display:grid;place-items:center">' + icon('up', 50, INK) + '</div></div><div id="prc" class="cur" style="left:1700px;top:900px">' + CUR + '</div>');
  leak(381.06); show('pr', 381.06); breathe('pr', 381.06, 385.5);
  tl.fromTo('#pr_st', { scale: 1.35, rotationY: -8, transformPerspective: 2200 }, { scale: 1, rotationY: 4, duration: 4.3, ease: 'power2.out' }, 381.06);
  wb('prl', 381.2);
  type('prx', 'Dérushe la vidéo et fais tout ce qu’il faut pour un meilleur rendu', 381.26, 384.59);
  tl.fromTo('#prc', { x: 0, y: 0 }, { x: -220, y: -270, duration: 0.6, ease: 'power3.out' }, 384.29);
  click('#prs', 384.94, { backgroundColor: LIME });
  leak(385.41); hide('pr', 385.41); cam(385.41, 'C', true);
  cam(388.81, 'W');

  // ======================================================================
  // S3 · écran : le prompt (392.51 → 447.33)
  // ======================================================================
  leak(392.51); show('S3', 392.51);
  layer('s3o', gcard('p3', 70, 60, 520, 112, 'msg', true, 'Le prompt', 'Chose n°3'));
  show('s3o', 392.8); unfold('p3', 392.9, 520, 112);
  tl.to('#S3d', { opacity: 1, duration: 0.4, ease: 'power2.out' }, 396.4);
  layer('q3', '<div id="q3a" class="tx dmd w500" style="left:0;right:0;top:420px;text-align:center;font-size:92px">Ce qui me vient en tête,</div><div id="q3b" class="tx dmd w500" style="left:0;right:0;top:540px;text-align:center;font-size:92px">c\'est ce que je *dis.</div>');
  show('q3', 396.5); tl.fromTo('#q3', { rotation: -2, scale: 1 }, { rotation: -1.4, scale: 1.05, duration: 3.2, ease: 'none' }, 396.5);
  wb('q3a', [396.6, 396.9, 397.0, 397.2, 397.4, 397.6]); wb('q3b', [398.2, 398.4, 398.5, 398.6, 398.8]);
  wbOut('q3', 399.6); hide('q3', 399.95);
  layer('nf', '<div id="nfr" class="glass" style="left:560px;top:450px;width:800px;height:150px"><div class="gc gi" style="position:absolute;inset:0;padding-left:34px"><div class="ict" style="width:84px;height:84px">' + icon('x', 44, WH) + '</div><div><div class="t1" style="font-size:44px">Un style de prompt figé</div><div class="t2" style="font-size:28px">que je respecte à la lettre</div></div></div><div class="hz"></div></div>');
  show('nf', 400.0); unfold('nfr', 400.1, 800, 150);
  tl.to('#nfr', { keyframes: [{ x: -14 }, { x: 12 }, { x: -10 }, { x: 8 }, { x: -6 }, { x: 4 }, { x: 0 }], duration: 0.6, ease: 'none' }, 403.8);
  fold('nfr', 404.4); hide('nf', 405.0);
  tl.to('#S3d', { opacity: 0, duration: 0.3 }, 404.6);
  layer('ia', gcard('ia1', 700, 70, 520, 100, 'msg', false, 'Ce que j\'écris à l\'IA'));
  show('ia', 407.0); unfold('ia1', 407.1, 520, 100); fold('ia1', 409.8); hide('ia', 410.3);
  tl.to('#S3d', { opacity: 1, duration: 0.4 }, 410.3);
  layer('cmp', '<div id="cmpst" style="position:absolute;inset:0">' +
    '<div id="cmpa" class="glass" style="left:330px;top:300px;width:600px;height:420px;border-radius:30px"><div class="tx w300 it grey" style="left:40px;top:40px;font-size:30px">Au lieu de</div><div class="tx dmd w500" style="left:40px;top:96px;font-size:50px">Un prompt réutilisé</div><div class="tx w300 it" style="left:40px;top:170px;font-size:32px;color:#C9C9C4">le même à chaque fois</div><div class="ict" style="position:absolute;left:40px;top:290px;width:90px;height:90px">' + icon('x', 46, WH) + '</div></div>' +
    '<div id="cmpb" class="glass" style="left:990px;top:300px;width:600px;height:420px;border-radius:30px;border-color:rgba(214,252,49,0.45)"><div class="tx w300 it grey" style="left:40px;top:40px;font-size:30px">Moi, je préfère</div><div class="tx dmd w500" style="left:40px;top:96px;font-size:50px">Dire clairement</div><div class="tx dmd w500" style="left:40px;top:160px;font-size:50px">ce que je veux</div><div class="ict on" style="position:absolute;left:40px;top:290px;width:90px;height:90px">' + icon('check', 50, INK, 2.2) + '</div></div></div>');
  show('cmp', 410.4);
  tl.fromTo('#cmpst', { x: 300, rotationY: 10, transformPerspective: 2400 }, { x: 120, rotationY: 6, duration: 5.4, ease: 'sine.inOut' }, 410.4);
  tl.fromTo('#cmpa', { y: 120, opacity: 0, filter: 'blur(8px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.6, ease: 'expo.out' }, 412.1);
  tl.to('#cmpst', { x: -120, rotationY: -6, duration: 0.9, ease: 'power3.inOut' }, 415.9);
  tl.to('#cmpa', { opacity: 0.4, duration: 0.5 }, 416.3);
  tl.fromTo('#cmpb', { y: 120, opacity: 0, filter: 'blur(8px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.6, ease: 'expo.out' }, 417.5);
  tl.to('#cmp', { opacity: 0, filter: 'blur(10px)', duration: 0.3 }, 419.5); hide('cmp', 419.85);
  layer('ck', '<div id="ckt" class="tx w300 it" style="left:0;right:0;top:190px;text-align:center;font-size:46px;color:#D8D8D3">Parce que j\'ai déjà</div>' +
    gcard('ck1', 560, 290, 800, 104, 'check', true, 'Mes skills installés') + gcard('ck2', 560, 410, 800, 104, 'check', true, 'Un dossier bien organisé') + gcard('ck3', 560, 530, 800, 104, 'check', true, 'Claude comprend la direction artistique') + gcard('ck4', 560, 650, 800, 104, 'check', true, 'et le style de vidéo'));
  show('ck', 419.9); wb('ckt', [420.0, 420.1, 420.7, 421.0]);
  [['ck1', 421.7], ['ck2', 422.9], ['ck3', 427.2], ['ck4', 429.4]].forEach(function (g) { unfold(g[0], g[1], 800, 104); });
  tl.to('#ckt', { opacity: 0, duration: 0.25 }, 431.0); ['ck1', 'ck2', 'ck3', 'ck4'].forEach(function (g, i) { fold(g, 431.0 + i * 0.05); }); hide('ck', 431.7);
  tl.to('#S3d', { opacity: 0, duration: 0.35 }, 431.2);
  layer('in', gcard('in1', 700, 70, 520, 100, 'folder', true, 'Dossier inspiration') + '<div class="bshade" style="opacity:0.7"></div>' + gcard('in2', 90, 880, 760, 112, 'video', false, 'Des vidéos d\'inspiration', 'Claude se base dessus'));
  show('in', 434.7); unfold('in1', 434.8, 520, 100); unfold('in2', 439.6, 760, 112);
  fold('in1', 446.5); fold('in2', 446.55); fold('p3', 446.6); hide('in', 447.33); hide('s3o', 447.33);
  leak(447.33); hide('S3', 447.33);

  // ======================================================================
  // F4 · face cam (447.33 → 473)
  // ======================================================================
  cam(447.33, 'W', true);
  layer('sp2', '<div id="sp2p" class="glass" style="left:90px;top:846px;width:1740px;height:170px"><div class="gi" style="position:absolute;inset:0"><div class="tx w500" style="left:40px;top:30px;font-size:36px">Si à la base</div>' +
    '<div id="sp2a" class="row" style="left:30px;top:76px;height:80px;font-size:32px"><div class="ict" style="width:56px;height:56px">' + icon('x', 30, WH) + '</div>Pas de skills installés</div>' +
    '<div id="sp2b" class="row" style="left:600px;top:76px;height:80px;font-size:32px"><div class="ict" style="width:56px;height:56px">' + icon('x', 30, WH) + '</div>Pas de dossier organisé</div>' +
    '<div id="sp2c" class="row" style="left:1180px;top:76px;height:80px;font-size:32px"><div class="ict" style="width:56px;height:56px">' + icon('x', 30, WH) + '</div>Rien de préparé</div></div><div class="hz"></div></div>');
  show('sp2', 447.53); tl.to('#fshade', { opacity: 1, duration: 0.4 }, 447.53);
  unfold('sp2p', 447.63, 1740, 170);
  [['#sp2a', 449.83], ['#sp2b', 451.93], ['#sp2c', 453.93]].forEach(function (r) { tl.fromTo(r[0], { rotationX: -90, y: 30, opacity: 0, transformPerspective: 1200 }, { rotationX: 0, y: 0, opacity: 1, duration: 0.55, ease: 'expo.out' }, r[1]); });
  cam(453.23, 'M');
  fold('sp2p', 455.33); tl.to('#fshade', { opacity: 0, duration: 0.3 }, 455.4); hide('sp2', 456.0);
  // tokens : panneau bas sur la face cam
  cam(456.03, 'C', true);
  layer('tk', '<div class="bshade"></div><div id="tkp" class="glass" style="left:90px;top:800px;width:1740px;height:210px"><div class="gi" style="position:absolute;inset:0"><div id="tkl" class="tx w300 it" style="left:44px;top:34px;font-size:32px;color:#D8D8D3">Claude va consommer</div><div id="tkt" class="tx dmd w500" style="left:40px;top:84px;font-size:84px">beaucoup de *tokens</div><div class="tx w300 it grey" style="left:1000px;top:60px;font-size:28px">Tokens consommés</div><div class="track" style="left:1000px;top:120px;width:680px;height:8px;border-radius:4px"><div class="fill" id="tkf" style="height:10px"></div></div></div><div class="hz"></div></div>');
  show('tk', 456.0); unfold('tkp', 456.05, 1740, 210);
  wb('tkl', [456.17, 456.41, 456.65]); wb('tkt', [457.13, 457.69, 457.85], 0.45);
  tl.fromTo('#tkf', { scaleX: 0 }, { scaleX: 0.96, duration: 2.8, ease: 'power2.inOut' }, 457.13);
  fold('tkp', 460.0); hide('tk', 460.5);
  layer('mn', '<div class="bshade" style="opacity:0.8"></div>' + gcard('mn1', 90, 880, 700, 112, 'video', false, 'Une vidéo de 5 à 10 min', 'montée par Claude'));
  show('mn', 460.1); unfold('mn1', 460.2, 700, 112); fold('mn1', 462.1); hide('mn', 462.6);
  cam(462.61, 'W', true);
  layer('tk2', '<div class="bshade"></div><div id="tk2a" class="tx dmd w500" style="left:0;right:0;top:770px;text-align:center;font-size:120px">des *milliers</div><div id="tk2b" class="tx w300 it" style="left:0;right:0;top:910px;text-align:center;font-size:52px;color:#D8D8D3">de tokens</div>');
  show('tk2', 462.62); wb('tk2a', [463.42, 463.74], 0.45); wb('tk2b', [464.14, 464.38]);
  tl.fromTo('#tk2a', { scale: 0.94 }, { scale: 1.04, duration: 2.3, ease: 'none' }, 462.62);
  wbOut('tk2', 464.85); hide('tk2', 465.2);
  layer('wf', '<div class="bshade" style="opacity:0.8"></div>' + gcard('wf1', 90, 880, 760, 112, 'file', true, 'Mon workflow complet', 'le guide pour monter avec Claude'));
  show('wf', 465.33); unfold('wf1', 465.43, 760, 112); cam(466.8, 'M'); fold('wf1', 468.83); hide('wf', 469.28);
  // fin : commente « Claude Opus 5.5 »
  leak(469.28); cam(469.28, 'L', true);
  layer('cm', '<div id="cmc" class="glass" style="left:1030px;top:250px;width:800px;height:560px;border-radius:36px"><div class="tx w300 it grey" style="left:56px;top:48px;font-size:34px">Commente sous cette vidéo</div><div style="position:absolute;left:56px;top:140px;width:96px;height:96px;border-radius:48px;background:#2A2A2A;display:grid;place-items:center">' + icon('user', 50, '#BDBDB8') + '</div><div style="position:absolute;left:176px;top:132px;width:570px;height:112px;border-radius:22px;background:#1A1A1A;border:1.5px solid #3A3A3A;padding:0 30px;display:flex;align-items:center;font-size:46px;font-weight:500;white-space:nowrap"><span id="cmx"></span><span style="display:inline-block;width:4px;height:52px;background:#D6FC31;margin-left:4px"></span></div><div id="cmb" class="pill" style="left:446px;top:280px;height:86px;border-radius:43px;background:#2A2A2A;color:#F4F4F2;padding:0 40px">Commenter</div><div id="cmg" style="position:absolute;left:56px;top:420px;display:flex;align-items:center;gap:22px;white-space:nowrap"><div class="ict on" style="width:86px;height:86px">' + icon('file', 46, INK) + '</div><div><div style="font-size:40px;font-weight:500">Je t\'envoie le guide</div><div class="w300 it" style="font-size:30px;color:#C9C9C4">gratuitement</div></div></div></div><div id="cmcur" class="cur" style="left:1900px;top:1100px">' + CUR + '</div>');
  show('cm', 469.28);
  tl.fromTo('#cmc', { x: 700, rotationY: -30, opacity: 0, transformPerspective: 2200 }, { x: 0, rotationY: -6, opacity: 1, duration: 0.8, ease: 'expo.out' }, 469.28);
  tl.to('#cmc', { rotationY: 4, duration: 2.8, ease: 'sine.inOut' }, 470.1);
  type('cmx', 'Claude Opus 5.5', 469.58, 470.48);
  tl.fromTo('#cmcur', { x: 0, y: 0 }, { x: -380, y: -730, duration: 0.6, ease: 'power3.out' }, 470.23);
  click('#cmb', 470.88, { backgroundColor: LIME, color: INK });
  tl.to('#cmcur', { x: -300, y: -500, opacity: 0, duration: 0.5, ease: 'power2.in' }, 471.3);
  tl.fromTo('#cmg', { y: 40, opacity: 0, filter: 'blur(8px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: 'expo.out' }, 471.26);

  tl.set({}, {}, 473.0);
  window.__timelines = window.__timelines || {};
  window.__timelines['main'] = tl;
  tl.seek(0);
})();
