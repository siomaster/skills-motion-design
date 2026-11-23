# Bibliothèque (à piocher pour écrire les blocs)

## Références de style à nommer dans `<direction>`
- **Apple keynote** : blanc chaud, encre noire, un accent, verre liquide, prise continue.
- **AI lab launch** (OpenAI/Anthropic) : toile blanche, une police, vraies images, légendes tapées mot à mot.
- **Stripe / Linear** : sombre ou blanc cassé, interface héroïne, retenue, lumière d'ambiance discrète.
- **Dribbble UI motion** : une forme qui se transforme d'état en état, ressorts, boucle parfaite.
- **Macro product shoot** : caméra comme sur un objet physique, profondeur de champ, reflet qui passe.
- **Éditorial / magazine** : grandes typographies, pages qui se poussent, photos en pleine page.

## Transitions (toujours motivées : « bien sûr que la scène suivante vient de là »)
- **Élément partagé** : la carte devient l'écran, le bouton devient la page, le chiffre devient le montant de la facture.
- **Inondation** : une forme pleine (disque, pilule, couleur de marque) part d'un objet, dépasse les 4 coins en ≈ 0,3–0,35 s (rayon = distance au coin le plus lointain × 1,05), tient un temps, puis se rétracte dans l'objet suivant. Elle emporte une copie du contenu.
- **Montée de masque** : texte qui sort d'une ligne de masque (translateY 105–140 % + fondu), mots décalés de 50–80 ms.
- **Iris à 6 lames** qui se ferme sur un sujet et s'ouvre sur le suivant.
- **Accordéon** : les lettres d'un mot se resserrent dans son point final, le point grossit en pilule.
- **Pousse latérale** : la page sort à gauche pendant que la suivante entre par la droite, même vitesse.
- **Fouet vertical** (whip-tilt) avec flou directionnel, à utiliser une fois.
- **Fondu par flou** (blur-dissolve) : seulement au pic de flou d'un mouvement rapide.
- **Coupe sèche** : seulement sur un drop ou un temps fort, 1–2 images avant le temps.
- À bannir : fondu enchaîné, volet au hasard, rotation, glitch, zoom flou à répétition, glissement SaaS générique.

## Caméra
- Un conteneur unique, clés `[t, zoom, x, y]`, segments amortis, **zoom interpolé en log**.
- Un mouvement par scène ; ne jamais zoomer puis dézoomer à la suite ; ne jamais revenir à 1.0 pendant un passage (la scène suivante démarre au zoom où la précédente s'arrête).
- Poussée lente permanente (1.0 → 1.04 par scène) pour que rien ne fige.
- Style Screen Studio : la caméra zoome sur l'action, le curseur grossit avec elle.
- Entrées « déjà en mouvement » : décélération exponentielle (12–19 % de la distance restante par image).

## Lois de mouvement (chiffres prêts à recopier)
- Ressorts en forme fermée : interface 320/30 (raideur/amortissement), conteneurs 170/26, logos 120/24 ; ou amortissement 0,72 + temps d'établissement 0,35 s pour une forme, 1,0 + 0,6 s pour la caméra.
- Courbe premium : `cubic-bezier(0.16, 1, 0.3, 1)` ; entrées quint-out, sorties smootherstep.
- Dépassement < 2 %, jamais de rebond élastique.
- Échanges de contenu : flou 12 px + fondu en 0,15 s ; rien n'apparaît en moins de 0,3 s.
- Décalages : 50–80 ms par mot, 60–120 ms par carte.
- Curseur : vitesse < 65 px/image, il vise où la cible sera à son arrivée, il grossit ×1,5 au survol et rétrécit de 15 % au clic.

## Recettes de look
- **Verre liquide** : cloner la scène derrière l'élément, flou ≈ 14 px pour le corps, copie agrandie ×1,06 dans une bande de 12 px sur le bord, lait + reflet du haut + liseré clair + ombre portée douce. Sur fond blanc, ajouter une aura pastel lente derrière (sinon le verre disparaît).
- **Lueur Apple Intelligence** : dégradé conique flouté qui tourne (rose, orange, citron, cyan, violet) autour d'un champ de saisie.
- **Lumière d'ambiance** : liseré doré, vignette légère, grain fin si utile ; jamais de flou sur l'interface.
- **Profondeur de champ** (fly-over WebGL) : flou par pixel selon la distance au plan net, 40 prises sur disque d'angle d'or.
- **Texte tapé** : rythme naturel, 1 caractère par image avec une pause d'une image tous les 2–3 caractères, curseur toujours visible, lignes fixes (la caméra ne suit pas un curseur qui revient à la ligne).
- **Dégradé sur un mot** : uniquement le mot mis en avant, dans les couleurs de la marque, léger halo.

## Son
- Musique : Mixkit (gratuit, usage commercial), Pixabay, ou piste de l'utilisateur. Donner BPM + instant du drop ; démarrer la piste à `drop − temps du moment clé`.
- Mixkit mesurés : n°190 (120 BPM, drop 16,01 s), « Cat Walk » n°371 (130 BPM, drop 14,77 s), n°207 (120 BPM, drop 31,97 s), « Head Bang » n°357 (74 BPM, drop 12,96 s), piano doux : « Piano Reflections » n°22, « Tears of Joy » n°839, « Beautiful Dream » n°493, « Dreaming Big » n°31.
- SFX : un son téléchargé par événement (Mixkit ou dossier `<DISQUE_MEDIA>/SFX`), placé sur son **pic mesuré**, coupé autour du pic (beaucoup de risers durent 4 s). Variés, discrets (gain 0,05–0,25), whooshs très bas.
- Avec voix : voix devant, musique constante 13–20 LU dessous (pas de pompage), ou sidechain 3 bandes si le style l'exige ; −14 LUFS, true peak −1 dBTP.

## Lignes `<build>` prêtes à l'emploi
1. One HTML file at [W]x[H]. Every style is computed from time inside an async seek(t): no CSS transitions, no timers, no state between frames, no Math.random (seeded hashes only).
2. Closed-form step-response springs; a value with many targets is the sum of one spring per change.
3. One camera transform on a container keyed by [time, zoom, x, y] with eased segments; zoom interpolated in log space.
4. Every handoff is a shared element: [l'inondation emporte les mots de la bulle…].
5. Footage: re-encode all-intra (ffmpeg -g 1), load as a blob URL, await 'seeked' before drawing each frame.
6. Sound: one downloaded SFX per event, placed by its measured peak; loudnorm to −14 LUFS, true peak −1 dBTP.
7. Render with Playwright at 60fps with 4–8 subframes per frame blended by ffmpeg tmix; check one frame per beat, then scan for single-frame pops (frame differences 3× their neighbours); build a contact sheet.

## Pièges (`<gotchas>`) vécus
- Four subframes leave ghost copies on fast moves: render 8 or slow the move down.
- A flood must reach the farthest corner and take about 0.3–0.35s, or it reads as a flash.
- Text that swaps inside a morphing shape needs its own mask and its own enter/exit timing, or it overlaps.
- Outgoing titles must leave before incoming titles take the same space.
- Never put will-change on anything the camera scales, or text renders blurry.
- Never set opacity or filter on a preserve-3d element: fade its wrapper.
- A child with visibility: visible shows through a hidden parent: use inherit.
- backdrop-filter: url() misreads displacement maps in Chromium: clone the scene instead.
- python http.server can't range-seek video: use a blob URL.
- Measure text only after fonts load; a long product name won't fit where a 5-letter one did: scale the lockup.
- Heavy blur tables can erase a shape entirely: lower the blur until it still reads.
- If the camera resets to 1.0 during a handoff, the zoom snaps.
- A 0.05s fade looks like a pop-in; minimum 0.3s.
- For loops, the last frame equals the first, cursor position and velocity included (t − D·floor(t/D)).
- Set z-index on every layer so cards never float above a flood.
- Declare every variable before the first seek() call.
- If you can't run code on the user's computer, say so immediately: the MP4 needs Claude Code.
