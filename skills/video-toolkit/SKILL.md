---
name: video-toolkit
description: "Boîte à outils technique de montage vidéo de l'utilisateur (validée sur le montage « Chine pays le plus surveillé ») — transcription Deepgram, dérushage automatique des silences et reprises, détourage du sujet (HyperFrames remove-background), voix studio, étalonnage, rendu image par image Playwright en parallèle, mixage voix/musique/effets. À utiliser avec montage-shorts, montage-youtube et sous-titres-dynamiques. Déclencheurs : « dérushage », « retire les silences », « retire les répétitions », « détoure », « voix studio », « nettoie la voix », « color grading », « étalonnage »."
---

# Video toolkit

Scripts dans `scripts/`, polices dans `fonts/` (copie du dossier Polices + Anton/Oswald), liste des effets dans `sfx_list.txt`
(fichiers : `~/.claude/skills/motion-design/template/sfx/<nom>.wav` ; effets de l'utilisateur : `<DOSSIER_PROJET>/Effets sonores`).
Travailler dans le **scratchpad** (le disque externe exFAT refuse les liens de `hyperframes init`) ; livrer le MP4 final dans le dossier de l'utilisateur.

## 1. Transcription
`scripts/transcribe.sh <video> <dossier> "WeChat,Macao"` → `stt.json` + `segments.txt` (phrases découpées aux pauses avec index de mots).
Clé `DEEPGRAM_API_KEY` dans `~/.zshrc`. Les mots-clés (`keyterm`) aident pour les noms propres. Vérifier un passage douteux en re-transcrivant un extrait (un mot anormalement long cache souvent un mot raté).

## 2. Dérushage (silences + répétitions)
Lire `segments.txt`, repérer les reprises (même phrase dite 2–3 fois) : garder **la meilleure prise** (en général la dernière, complète), supprimer les phrases ratées / « je t'ai… » / débuts avortés.
`scripts/derush.py <video> <dossier> "0-23,99-157,172-216"` → `derush.mp4`, `cuts.json`, `cuttimes.json` (instants des coupes, utiles pour cacher les sauts par un zoom).
Puis **re-transcrire derush.mp4** : minutages exacts pour les sous-titres + vérification qu'il ne reste aucune répétition. Garder les répétitions voulues (« chaque jour, chaque jour »).

## 3. Détourage du sujet
`scripts/matte.sh <derush.mp4> <dossier> "<filtre>"` → `bg/fNNNNN.jpg` + `fg/fNNNNN.png` (RGBA). Le filtre sert pour l'étalonnage et le recadrage (identiques pour fond et sujet). ~6 min pour 85 s.
Usages : décor assombri (sujet à pleine lumière), mots derrière la tête, scènes sur fond uni, silhouette blanche (canvas : dessiner le PNG puis `source-in` blanc — PAS de `mask-image` CSS, chargé trop tard).

## 4. Étalonnage (filtre ffmpeg)
- **Naturel chaud** (validé) : `eq=contrast=1.1:brightness=-0.015:saturation=1.14,colorbalance=rs=-0.05:bs=0.06:rm=0.02:bm=-0.01:rh=0.05:gh=0.015:bh=-0.05,curves=master='0/0 0.25/0.22 0.75/0.79 1/1',vignette=PI/5`
- **Ciné sombre** : `eq=contrast=1.22:brightness=-0.05:saturation=0.82,curves=master='0/0 0.3/0.2 0.8/0.82 1/1',vignette=PI/4`
- **Bleu podcast** : `eq=contrast=1.15:saturation=1.2,colorbalance=rs=-0.08:bs=0.12:rm=-0.03:bm=0.06:rh=0.04,vignette=PI/5`
- **Doux premium** : `eq=contrast=0.94:brightness=0.02:saturation=1.05,colorbalance=rh=0.05:gh=0.03:bh=-0.02,curves=master='0/0.04 0.5/0.52 1/0.98'`
Recadrage carré d'un 9:16 1080×1920 : `crop=1080:1080:0:480` (garder un peu d'air au-dessus de la tête, sous-titres au niveau de la poitrine).

## 5. Voix studio
`scripts/voice_studio.sh <entrée> <voix.wav>` (débruitage, EQ chaleur/présence/air, de-esser, compression, expandeur). Ne retire pas la réverbération de la pièce : le dire si elle est forte.

## 6. Rendu image par image
La page HTML expose `window.render(t)` (Promise, attend `img.decode()`), `window.DUR`, `window.ready`.
- Images clés : `node scripts/render.mjs page.html kf 1080 1920 kf/ 0.5 2 7.25` (nommer sans « .0 »).
- Complet : `node scripts/render.mjs page.html full 1080 1920 frames/ 30000/1001 3` (3 processus en parallèle, ~2 500 images en ~10 min avec détourage).
- Encodage : `ffmpeg -framerate 30000/1001 -i frames/f%05d.jpg -i mix.wav -c:v libx264 -crf 17 -preset slow -pix_fmt yuv420p -c:a aac -b:a 192k -shortest -movflags +faststart sortie.mp4`.
- GSAP local : `scripts/gsap.min.js`. Fonctions d'animation déterministes (calculées depuis t), pas de timers.

## 7. Mixage
`scripts/mix.py config.json` (voir l'en-tête du script). Musique basse et constante 13 LU sous la voix, effets 0,11–0,26, whooshs 0,06–0,11 démarrés 0,35 s avant la coupe, sons variés, sortie −14 LUFS.

## Pièges connus
- zsh ne découpe pas `$VAR` en arguments : utiliser des tableaux `T=(0.5 1 2)` puis `$T`.
- `python3 … open(f,'w').write(open(f).read())` vide le fichier : lire d'abord, écrire ensuite.
- `alphaextract` : convertir en `yuva444p` avant (pas `rgba`).
- Ne jamais `rm` avec un chemin relatif après un `cd` (bloqué) : chemins absolus.
- Les éléments animés via `fromTo(... immediateRender:false)` doivent avoir leur état initial posé (`gsap.set`), sinon ils apparaissent avant leur heure.
