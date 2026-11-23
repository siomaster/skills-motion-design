---
name: montage-shorts
description: "Styles de montage pour Shorts / Reels / TikTok (9:16 ou carré) tirés du dossier « Inspiration Shorts » de l'utilisateur — 6 recettes complètes (étalonnage, rythme des coupes, zooms, B-roll, scènes graphiques, transitions, son) à appliquer à une vidéo brute face cam. Déclencheurs : « monte ce short », « style de montage », « monte comme … », « short », « reel », « tiktok », « vidéo verticale », « style Hormozi / Iman Gadzhi / ciné / premium / derrière le sujet / motion design / podcast »."
---

# Montage Shorts — styles de montage

Quand l'utilisateur donne une vidéo brute + un style : appliquer la recette du style choisi de bout en bout.
Outils : skill **video-toolkit** (transcription, dérushage, détourage, voix studio, rendu, mixage).
Sous-titres : skill **sous-titres-dynamiques** (chaque style ci-dessous recommande un style de sous-titres).

## Chaîne commune (toujours)
1. `transcribe.sh` → lire `segments.txt` → choisir les meilleures prises → `derush.py` (supprimer silences, reprises, phrases ratées) → re-transcrire `derush.mp4` et vérifier qu'il ne reste aucune répétition.
2. `voice_studio.sh` (voix propre, agréable). La voix est l'élément n°1.
3. Si le style l'exige (scènes de fond, mot derrière le sujet, décor assombri, silhouette blanche) : `matte.sh`.
4. Composition HTML 1080×1920 (ou 1080×1080) pilotée par `window.render(t)` ; images clés + planche contact AVANT le rendu complet.
5. `render.mjs full` (3 workers) → `mix.py` (musique basse constante, effets légers variés, whooshs très bas) → ffmpeg H.264 CRF 17, AAC 192k, `+faststart`, dans le dossier de l'utilisateur.
6. Vérifier le MP4 (planche, durée, LUFS ≈ −14) avant de livrer.

Rappels de l'utilisateur : jamais de cercles décoratifs ; pas de sous-titres sur les plans d'animation ; polices du dossier Polices ou Google ; Instrument/Urbanist acceptées ; pas de glass icons sauf demande ; si l'espace au-dessus de la tête gêne → recadrer serré (carré ou zoom de base 1.1).

---

## A · STORY CINÉ B-ROLL
**Références :** S04 (« 5$ Edit / Our work »), S18 (podcast santé), S06 (« original / edit »), S01.
**Ambiance :** sombre, cinématographique, émotionnel.
- **Étalonnage :** noirs écrasés, contraste fort, désaturation 15–25 %, vignettage marqué ; parfois noir & blanc sur 1–2 s (moments durs).
- **Rythme :** coupe ou changement de plan toutes les **1,5–3 s**. Insertion de **B-roll plein écran** (images IA ou stock, Ken Burns lent 1→1,06) illustrant chaque idée : silhouette sur falaise au coucher de soleil, foule, homme seul, cerveau, cinéma vide…
- **Cartes de mot :** 1–2 fois par vidéo, fond blanc uni avec un mot en grand + un mot serif italique (« burnout » / *pure*).
- **Zooms :** lents (push-in continu 1→1,08), pas de punch agressif.
- **Sous-titres :** `cine` (ou `neon` en rouge pour un chiffre clé).
- **Son :** musique émotionnelle (piano/cordes), whooshs doux aux B-roll, quasi pas de pops.

## B · DYNAMIQUE ÉDUCATIF (Hormozi / Iman Gadzhi)
**Références :** S05 (micro 3D, clé 3D, cerveau 3D), S11 (sound hooks), S10 (productivity hack), S15 (comment strategy), S22 (7 hooks), S12 (Nexus).
**Ambiance :** énergique, rapide, ultra-rythmé.
- **Étalonnage :** contrasté, couleurs saturées, éclairage d'ambiance néon (violet/orange) renforcé.
- **Zooms :** **punch-in à chaque phrase** (alterner 1,0 ↔ 1,12 en coupe sèche) + zoom rapide sur chaque mot-clé.
- **Éléments graphiques :** objets/icônes 3D qui surgissent avec rebond près du visage (clé, cerveau, cadenas, logo appli) ; **cartes UI** (commentaire Instagram, notification, App Store, compteur de vues 36k → 557k) ; **badges numérotés** (gros chiffre italique + bandeau jaune « 1 · Comments ») ; cartes numérotées violettes « 1 2 3 » ; pluie de billets sur les montants.
- **Transitions :** flash de couleur 2 images, flou de mouvement, glissement de cartes, éclat de lumière.
- **Sous-titres :** `gaming` (hype), `neon` (créateur), `high` (stats) ou `count` pour les montants.
- **Son :** très dense mais discret : pop à chaque objet, swoosh à chaque carte, ding sur les chiffres, impact sur les mots forts ; musique entraînante basse.

## C · PREMIUM DOUX / LIFESTYLE
**Références :** S14 (agence, fond pêche), S13 (finances, vert profond), S16 (éditeurs, documents).
**Ambiance :** haut de gamme, calme, élégant.
- **Étalonnage :** chaud et doux (hautes lumières crème, ombres légèrement relevées), peau flatteuse, faible contraste.
- **Zooms :** très lents, cadre stable ; recadrages doux.
- **Scènes de coupe :** fond uni dégradé (pêche #fbe3d6, vert profond #0f3d2a, crème) avec **cartes flottantes** (prix, rôles, profils), **objets réels détourés** (montre à gousset, post-it, billet, lampe suspendue), papier/étiquettes manuscrites ; la face cam peut devenir une **petite vignette** dans la scène.
- **Transitions :** fondus enchaînés, glissement lent, page qui se plie.
- **Sous-titres :** `edito` (accent citron pâle ou doré) ou `mini`.
- **Son :** musique douce lounge/piano, effets « papier », « glass » très légers.

## D · DERRIÈRE LE SUJET + SCÈNES DE FOND
**Références :** référence snapgram (S23), S02, montage « Chine pays le plus surveillé » (validé par l'utilisateur).
**Modèles prêts :** `templates/derriere-sujet-vertical.html` (9:16) et `templates/scenes-fond-carre.html` (carré, fonds rouge/blanc).
- **Détourage obligatoire** (`matte.sh`, avec le même étalonnage pour fond et sujet).
- **Décor assombri** (voile 0,35–0,6) pendant la face cam : le sujet ressort, le texte devient lisible même dans une pièce claire.
- **Mots géants derrière la tête** (Anton/Built Titling, rouge lumineux) sur les ~15 mots-forts ; petits sous-titres devant.
- **Silhouette blanche lumineuse** en ouverture (0–0,45 s) puis en flash sur 3–5 mots-chocs.
- **Scènes de fond** (~35 % du temps, sur les moments forts) : sujet détouré sur **dégradé rouge** (lumière qui tourne) ou **fond blanc** ; entrée en balayage bas→haut + flash silhouette ; mot géant derrière le sujet ; le même mot **défile en contour** en arrière-plan ; retour face cam avec petit zoom arrière.
- **Zooms :** niveau de base qui alterne à chaque coupe (cache les sauts), punch sur chaque mot géant.
- **Sous-titres :** `behind` + petits mots blancs Oswald/Anton en bas (poitrine).
- **Son :** whoosh + petit impact par mot géant et par changement de scène.

## E · MOTION DESIGN SANS VISAGE
**Références :** S07 (EarnEdits : polaroid, iMessage, Google), S08 (cassette, téléphone, réveil), S09 (Seedance : CRT rétro, cerveau pixel), S17 (icônes 3D : maison, œil, épée, couronne).
**Ambiance :** la voix off raconte, l'image est 100 % graphique.
- **Décors physiques stylisés :** bureau en bois avec ombres de fenêtre, objets rétro (cassette, Game Boy, iPod, téléphone avec écran de verrouillage), viseur d'appareil photo, écran CRT, papier froissé.
- **Interfaces :** notes iPhone, bulles iMessage, recherche Google, classement d'appli, onglets — avec texte tapé et curseur.
- **Typo cinétique :** mots qui s'empilent, mot répété en écho (« Let them replicate »), étoiles/éclats verts, soulignés manuscrits.
- **Variante 3D (S17) :** une icône 3D par idée (maison qui brûle, œil qui saigne, épée, couronnes), fonds dégradés profonds, lumières volumétriques.
- **Transitions :** zoom à travers un objet, coupe sur le temps fort, grain/VHS.
- **Sous-titres :** pas de rail ; le texte EST l'animation (`type`, `cine` sans visage).
- **Son :** sound design riche (clics, frappe clavier, déclencheur photo), musique tendance.

## F · CLIP DE PODCAST
**Références :** S18 (podcast + B-roll IA), S20 (fauteuil gaming), S16.
- Recadrage serré sur l'orateur actif ; plans de réaction de l'invité.
- B-roll IA plein écran sur les concepts (cerveau, ADN, fête, appartement la nuit), avec le mot affiché.
- Couleur : tons sombres riches, accent chaud.
- **Sous-titres :** `mini` (blanc, minuscules), mot-clé en serif italique ou en couleur (`cine`).
- Titre d'accroche en haut (Built Titling, ex. « DEVIN JATHO » + ligne rouge « EDITING STYLE ») les 3 premières secondes ; cadran de chiffres rouge en ouverture (S20).

---

## Choisir un style quand l'utilisateur ne précise pas
- Face cam + message fort / émotion → **A** ou **D**.
- Conseils, business, marketing, fitness → **B**.
- Marque premium, coaching, femme entrepreneure → **C**.
- Pas de visage / produit / SaaS → **E**.
- Deux personnes au micro → **F**.
Toujours annoncer le style choisi en une ligne et pourquoi.
