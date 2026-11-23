---
name: montage-youtube
description: "Styles de montage pour vidéos YouTube horizontales (16:9) tirés du dossier « Inspiration Youtube horizontale » de l'utilisateur — 6 recettes (face cam à bandeaux et inserts blancs, podcast cinéma, promo SaaS cinétique, éditorial sombre, démo produit 3D, logo sting). Déclencheurs : « vidéo YouTube », « format horizontal », « 16:9 », « monte ma vidéo YouTube », « promo SaaS », « vidéo produit », « récap de l'année », « intro / outro logo »."
---

# Montage YouTube horizontal — styles

**Fabrication** : utiliser le moteur du skill **short-motion-design** (`style: 'YT'`, `W:1920,H:1080`, voir son `references/moteur.md` § Format horizontal) : détourage + mots derrière le sujet, sous-titres `capLine`, écran partagé `camera.windows`, pastilles, navigateurs, terminal, cartes en éventail. Dossier de références 2 : `<DOSSIER_PROJET>/Inspiration Youtube` (Y3 podcast mots géants, Y6 interfaces de verre, Y1/Y4 objets 3D, Y2 explainer orange, Y5 dossiers verts).

Canevas 1920×1080, 30 i/s (60 pour l'UI/produit). Outils : **video-toolkit** ; sous-titres : **sous-titres-dynamiques** (en 16:9, placer les sous-titres en bas à `y ≈ 0.82`, ou en bas à gauche pour le style podcast).
Chaîne commune identique à montage-shorts (dérushage, voix studio, images clés avant rendu, mixage constant, vérification).

## Y-A · FACE CAM + BANDEAUX + INSERTS BLANCS
**Référence :** Y24 (créateur « AI websites » : bandeaux turquoise, graphiques, billets).
- Étalonnage naturel lumineux, intérieur clair. Coupes sèches + légers punch-in sur les phrases fortes.
- **Bandeaux mots-clés** : pastilles turquoise (#0f7f78) à texte blanc qui glissent depuis la gauche/droite près du sujet (« Roofing », « HVAC », « Plumbing »), empilées en quinconce.
- **Inserts plein écran sur fond blanc** (1–3 s) : histogramme qui monte avec le chiffre (« $8,049 → $10,000 »), cartes de logos d'outils, horloge(s) 3D, chiffre géant (« $1.4 Million ») avec **pluie de billets**.
- Sous-titres : `mini` ou mots-clés seulement en bandeaux.
- Son : pops légers sur chaque bandeau, « cash » sur les montants, musique lo-fi basse.

## Y-B · PODCAST CINÉMA
**Référence :** Y32 (nageur, éclairage bleu).
- Étalonnage **bleu profond saturé**, peau chaude, noirs denses ; éclairage d'ambiance renforcé.
- **Mots géants** condensés (Built Titling, MAJUSCULES) derrière ou à côté du sujet (« SWIMMERS », « KNOW HOW? »), avec flou d'entrée.
- **Sous-titres en bas à gauche** en capitales condensées blanches, mot par mot, deuxième partie en gris.
- **Écran partagé** : vignette arrondie de l'orateur à gauche + B-roll plein cadre (piscine), mot-clé stylisé par-dessus.
- Cartes UI dans l'espace (flèche « progress » en verre) en incrustation.
- Son : nappe cinématique, impacts graves sur les mots géants.

## Y-C · PROMO SaaS CINÉTIQUE
**Références :** Y27 (ProductHype, vert/noir), Y29 (Inkly, barre de recherche, dégradés violets), Y31 (Helios, violet), Y25 (Callio, récap annuel bleu).
- **Fonds** : dégradé radial de la couleur de marque (bleu électrique, vert acide sur noir, violet/magenta) avec halo qui respire ; alternance avec fonds clairs lavande.
- **Typo cinétique centrale** (Plus Jakarta / Urbanist SemiBold) : 2–4 mots, **le mot-clé dans la couleur d'accent**, mots qui arrivent un par un, texte manuscrit ajouté au-dessus (« Writing »).
- **Captures d'interface** en perspective 3D qui flottent/glissent, tableaux qui défilent, curseur qui clique, barres de progression, graphes qui se remplissent.
- **Chiffres** qui comptent (« 2000+ active users », « +400 % », « 5M+ views ») avec logos/badges (G2, Trustpilot, réseaux sociaux).
- **Transitions** : vagues liquides, flou directionnel, zoom à travers, pixelisation, glitch RGB sur un logo.
- **Fin** : logo qui se construit + slogan + boutons App Store/Play Store ou « Book your slot ».
- Son : musique électro/corporate énergique, whooshs synchronisés, clics UI.

## Y-D · ÉDITORIAL SOMBRE
**Référence :** Y28 (SBR, « Creativity is the spark »).
- Fond **noir mat**, typo **serif** (PP Hatton) blanche, petits mots, **point rouge** comme ponctuation graphique.
- Effets : mot répété en pile dégressive (« Step by step » ×7), lettres qui changent de taille (« IN^SPIRED »), soulignés manuscrits jaunes, **loupe** qui révèle un mot dans une pastille colorée (rouge/orange/bleu), carrousel d'images en arc, photos qui défilent verticalement.
- Rythme posé, élégant. Son : piano/ambiance, clics discrets.

## Y-E · DÉMO PRODUIT 3D (UI)
**Références :** Y33 (devis médicaux, violet), Y34 (cartes en verre rouge/vert), Y26 (Voit.digital, showreel).
- Interface du produit placée dans un **espace 3D** (perspective, profondeur de champ), caméra qui glisse le long de l'écran, **curseur 3D** qui clique « Create estimate », document qui se déroule comme un rouleau.
- Fonds : dégradés lavande avec **sphères floues** en avant-plan, ou noir avec cartes en verre lumineuses (rouge, vert).
- Barre de recherche avec frappe, puis résultat qui se surligne.
- Showreel (Y26) : coupes très rapides entre écrans clients, objets (montre, ordinateur), mosaïque finale de logos.
- Son : sound design UI (clics, swoosh, ding), musique tech.

## Y-F · LOGO STING / INTRO
**Références :** Y30 (PJ PRO, particules bleues), animation MaMarque déjà livrée.
- Fond radial couleur de marque, apparition du logo (balayage lumineux / particules / tracé), slogan en lettres espacées, URL discrète ; sortie en **explosion de particules** et éclat de lumière.
- Durée 4–8 s. Son : riser + impact + scintillement.

## Choisir un style quand l'utilisateur ne précise pas
Face cam explicative → **Y-A** ; interview/podcast → **Y-B** ; présentation de produit ou bilan d'entreprise → **Y-C** ; marque créative/luxe → **Y-D** ; logiciel à montrer → **Y-E** ; intro/outro → **Y-F**.
