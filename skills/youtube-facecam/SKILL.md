---
name: youtube-facecam
description: "Monter une vidéo YouTube 16:9 (ou un short face cam) pour la chaîne de l'utilisateur à partir d'une face cam + un enregistrement d'écran AVEC sa voix : re-dérush des hésitations des deux sources, structure étape par étape (face cam qui annonce → écran qui montre, avec sa voix), grammaire de la vidéo d'inspiration (light leak bleu → blanc → grain lime, zoom arrière d'atterrissage, mots qui apparaissent avec flou, cartes de verre qui naissent d'un trait, panneau bas, cartes 3D révélées), chapitres « 1 / 2 / 3 » sur fond noir à dégradés de coins, CTA abonnement / cloche / partage / commentaire, film burns, SFX, musique constante. Charte imposée : #D6FC31 avec parcimonie, noir et blanc, DM Sans 500/300. Déclencheurs : « monte ma vidéo YouTube », « vidéo face cam », « short face cam », « dérush », « enregistrement d'écran », « comme la vidéo d'inspiration »."
---

# YouTube face cam · chaîne de l'utilisateur

Moteur : **HyperFrames** (`src/index.src` + `film.js`, assemblés en `index.html` par `build.py`, timeline GSAP en pause, `<video>` muets) + mix audio en Python. Gabarit éprouvé : `templates/v4/` (`head.js` + `glass.js` + `body.js` → `film.js` ; v3 en archive). Ancien gabarit : `templates/v3/` (film « 3 choses » v3, octobre 2026, 7 min 53 : `head.js` + `body.js` → `film.js`, puis `build.py`). Avant de découper : lire `references/grammaire.md` (règles) puis, si une nouvelle vidéo d'inspiration est donnée, l'**analyser vraiment** comme `references/inspiration-guide.md` (bandes à 25 i/s des transitions, mesures, catalogue des blocs). l'utilisateur a reproché un survol : ne jamais s'en contenter.

## Ressources fixes (toujours)
- Effets sonores : `<DISQUE_MEDIA>/SFX` (+ `WHOOSHS`, `New UI sounds`). Film burns : `<DISQUE_MEDIA>/FILM B` (F1–F5 verticaux → `transpose=1,scale=1920:1080`, `mix-blend-mode: screen`, aux ouvertures de chapitre et au CTA final). Musique : `<DISQUE_MEDIA>/MUSIC` (ES_… Toby Tranter, enchaîner plusieurs titres si la vidéo est longue).
- Polices : `<DISQUE_MEDIA>/YOUTUBE/POLICES` → DM Sans Medium (500, titres), Light / Light Italic (300, petits textes), Medium Italic pour les grands chiffres.
- Couleurs : `#D6FC31` (chiffre clé, mot-clé, tuile d'icône active, jauge, bouton cliqué), noir `#070707`, blanc `#F4F4F2`, gris `#A9A9A4`.
- Rendu dans `<DOSSIER_PROJET>/RÉSULTATS/YOUTUBE/`.

## Règles fermes (retours v2 → v3)
- **Accroche forte** : chiffre clé en lime qui pivote + titre en CAPITALES lettre par lettre (DM Sans 36pt Medium), petite ligne 300 en dessous, centré un peu en bas ; jamais un texte posé « banal ».
- **Interlettrage −0,02 em** partout ; tailles optiques `DMSans_36pt-*` pour les titres, `DMSans_18pt-*` pour les petits textes.
- **Écran au format d'origine, sans zoom ni recadrage** (`object-fit: contain`), même quand une vidéo réalisée joue. On peut flouter/assombrir l'écran derrière une citation quand il est statique.
- **Dérush doux de l'écran** (`scripts/v2keep2.py`) : phrases entières, seules les reprises sont coupées ; actions muettes accélérées ×3–4 (pastille « Accéléré ×4 ») au lieu d'être coupées.
- **« Tout le monde en parle »** : carrousel de vidéos (droite → gauche, cover-flow), la face cam arrive en dernière carte et s'agrandit.
- **« Mes rendus »** : 1 horizontale + 2 verticales qui jouent quelques secondes.
- **Film burns** seulement à l'entrée/sortie de la pause pub. **SFX** audibles sur chaque carte de liste (≈ 5 LU sous la voix).
- **Pause publicitaire** avant l'étape 3 : carte « PAUSE PUBLICITAIRE » + pub plein écran avec son propre son (musique coupée) + pastille « Lien en description ».
- Fonds noirs à dégradés de coins : seulement chapitres, cartes 3D, interfaces recréées ; les citations vont sur la face cam ou sur l'écran flouté.

- **Texte (référence `<DOSSIER_PROJET>/Inspiration Youtube/NEW/SRT.mp4`)** : toujours à plat, jamais pivoté ni masqué (aucune lettre coupée) ; titres en machine à écrire dont la pointe brille en lime puis se pose en blanc (`chars`/`charsIn`), mots qui glissent de la droite en brillant (`wb`), citations qui s'allument avec un léger rebond (`wglow`). Espaces entre mots en `margin-right` (les nœuds texte « espace » sautaient au rendu).
- **Icônes** : Nucleo glass (`glass.js`, tiré de `~/.nucleo/skills/glass/icons.json`) dans des tuiles translucides, jamais d'icônes au trait.
- **Chapitres** (références NEW) : voile noir 80 % + flou sur la face cam, dégradés de coins, grand numéro « 0n » estompé derrière le titre centré, 3 petites barres de progression.
- **Couper** les navigations muettes qui n'apportent rien (même accélérées).
- Toujours **comparer ses images clés aux références** avant de livrer.

## Structure (demande de l'utilisateur)
L'enregistrement d'écran **contient sa voix** : on ne l'utilise pas comme B-roll muet.
`face cam : accroche + étape 1` → `écran étape 1 (sa voix)` → `face cam étape 2` → `écran étape 2` → **pause pub** → `face cam étape 3` → `écran étape 3` → `face cam : conclusion + CTA commentaire`. Chaque « 1re / 2e / 3e chose » ouvre sur un chapitre plein écran (fond noir, dégradés légers haut droite + bas gauche).

## Démarche
1. **Sonder** les fichiers, planches de l'inspiration et de l'écran.
2. **Transcrire** les deux voix (Deepgram `nova-3`, `filler_words=true`) → mots + confiance + trous.
3. **Dérusher la face cam** (`scripts/derush.py`) puis **l'écran** (`scripts/v2keep.py` = segments gardés par étape, `scripts/build2.py`) :
   - reprises (« l'organisation des, l'organisation des dossiers »), mots avortés, « ok ? », répétitions, attentes muettes (ex. 22 s de navigation) → coupés ;
   - aucune pause > 0,45 s ; coupes calées au minimum d'énergie sur la grille d'images (25 i/s pour l'écran) ; fondus 8 ms ;
   - vérifier chaque trou interne : énergie élevée = mot non transcrit (anglais : « skills ») → le garder ;
   - **retranscrire le résultat** et relire chaque jointure (un mot rogné se voit : « Remoosh », « réseaux sociaux » au lieu de « résultats »).
4. **Voix maîtresse** (`scripts/voice2.py`) : voix de l'écran passe-haut 80 Hz, débruitage léger, compression, à la sonie de la face cam.
5. **Cadrages** : une planche avec une image par segment d'écran (PIL, temps de sortie écrits dessus) → un point de focus + zoom par segment.
6. **Construire** depuis `templates/v2/` : timeline des sections, `cam()` pour la face cam, `scam()` pour l'écran, `leak()`, `chapter()`, `gcard()/unfold()/fold()`, `wb()`, `pbar()`, `scramble()`. `python3 build.py && npx hyperframes lint`, puis `snapshot` sur ~45 instants + 8 images autour d'une transition.
7. **Rendre** en arrière-plan (`npx hyperframes render -f 30 -q delivery`).
8. **Son** (`scripts/sfxprep.py`, `scripts/mixyt2.py`) : effets discrets (≈ 7 LU sous la voix), musique 20 LU sous la voix et constante (vérifier toutes les 20–60 s, et jusqu'à la fin : un titre trop court = silence), −14 LUFS.
9. **Assembler**, planche 1 image / 4 s, vérifier, livrer.

## Pièges rencontrés
- `#leak` est un calque `.L` : lui remettre `opacity: 1`, sinon la transition est invisible.
- Une vidéo de section qui finit avant la coupe = images noires : prolonger chaque `<video>` jusqu'à la coupe suivante.
- Toute vidéo doit être dans le HTML statique (pas créée en JS), avec un `id` ; jamais dans un parent qui a `data-start`.
- `fromTo` applique son départ dès la création : sur la face cam et les éléments réutilisés, utiliser `set` + `to`, ou `immediateRender: false`.
- Calques lourds (flous, dégradés, `clip-path`) masqués en `display: none` hors de leur fenêtre (`show`/`hide`).
- Pas de `<br>`, pas d'interpolation de `left/top` (positions dans le HTML), pas de transform CSS sur un élément animé.
- B-roll de rendus passés : vérifier qu'aucune image ne montre un prix.

## Interdits (retours de l'utilisateur)
Anneaux ou cercles décoratifs, grilles « bento », tirets décoratifs, prix, données inventées, texte coupé, écran figé > 3 s, sous-titres, icônes 3D, texte décalé quand il doit être centré. Icônes : au trait (style Lucide).

## Fichiers
- `references/grammaire.md` — règles de la grammaire + correspondance voix → bloc.
- `references/inspiration-guide.md` — analyse complète de la vidéo d'inspiration (22 blocs, 7 transitions, rythme, son).
- `templates/v3/` — `index.src`, `head.js`, `body.js`, `build.py` (film complet v3). `templates/v2/` — version précédente. `templates/index.html` — v1 (face cam seule).
- `scripts/` — `derush.py` (face cam), `v2keep2.py` + `build3.py` (écran + pause pub), `voice3.py`, `sfxprep.py`, `mixyt3.py`, `mix.py` (v2 : `v2keep.py`, `build2.py`, `voice2.py`, `mixyt2.py`).
