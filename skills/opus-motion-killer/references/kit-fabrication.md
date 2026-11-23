# Kit de fabrication (quand un prompt est collé)

Validé sur 4 films livrés en octobre 2026 (voir `examples/films/`). Travailler dans le scratchpad (le disque externe exFAT pose problème), livrer dans `<DOSSIER_PROJET>/RÉSULTATS/`.

## 0. Déroulé
1. Poser les questions du `<inputs>` (AskUserQuestion, recommandations MaMarque en premier).
2. Télécharger musique et sons : Mixkit musique `https://assets.mixkit.co/music/<id>/<id>.mp3`, sons `https://assets.mixkit.co/active_storage/sfx/<id>/<id>-preview.mp3`. Sons utiles : clic 1125/1126, touche 2568, tic 1117, coche 1113, interrupteur 1120, notification 2573, pop 2364, bulle 2357, whoosh 1490, montée 1489, flip 1485, impact 1143, réussite 2865, scintillement 3083.
3. `python3 scripts/beats.py morceau.mp3` → BPM, énergie, drop précis. Ne jamais faire confiance à une grille automatique : vérifier le saut d'énergie à 20 ms près.
4. Montrer la **grille des temps** (tableau temps / secondes / action) + **4 images** clés ouvertes avec `open`. Attendre le feu vert.
5. Construire le film (partir de l'exemple le plus proche dans `examples/films/`).
6. **Une image par temps** (planche) → corriger cadrage, lisibilité, chevauchements.
7. Rendu complet, son, contrôles, livraison avec chemin, durée, poids, LUFS, résultats des contrôles.

## 1. Moteur (un seul HTML)
- Tout est calculé dans `seek(t)` ; `window.render = t => { seek(t); return 2×rAF }` ; `window.DUR` ; `window.ready` = Promise (polices + `img.decode()`).
- Déclarer **toutes** les constantes avant le premier `seek`. Ne jamais nommer une variable globale `top`, `name`, `status`, `parent` (conflit avec `window`).
- **Ressort fermé** : `spring(t,k,d)` (réponse indicielle). Valeur à plusieurs cibles = base + Σ Δᵢ·spring(t−tᵢ). Petit dépassement : k≈220, d≈26–30. Retour à l'image 0 : ressort rapide sans dépassement (k 420, d 41) au moins 0,5 s avant la fin.
- **Caméra** : un conteneur `transform: translate(960px,540px) scale(z) translate(-x,-y)` (origine 0 0), clés `[t, z, x, y]`, easing cubique, `z = exp(lerp(ln z0, ln z1))`. Monde → écran : `sx = 960 + (wx − x)·z`.
- **Curseur** en coordonnées écran (taille constante), positions clés en coordonnées monde, `scale(.85)` bref au clic.
- **Lettres qui se transforment** : mesurer chaque lettre dans les deux mises en page (spans + repère de ligne de base `inline-block` de hauteur 0), placer l'élément à sa taille finale et l'interpoler par `translate + scale` depuis l'origine haut-gauche. Le point du « i » : utiliser « ı » et mesurer le point au pixel sur un canvas.
- **Élément partagé** : un seul DOM qui interpole `left/top/width/height/border-radius/couleur` ; le texte à l'intérieur a son propre timing d'entrée/sortie.
- **Inondation** : rayon = distance au coin le plus loin × 1,05, en ~0,35 s ; pour se resserrer dans une bulle, interpoler le rectangle et les rayons, avec une copie des mots dans l'inondation (révélée par masque, pas par fondu).
- **Page en pilule** : largeur/hauteur → 1,7 × la vue courante, `border-radius = h/2` tout le temps.
- **Trame de points** : canvas, une boucle de cercles, rayon fonction de la distance au connecteur et d'une onde.
- **Frappe** : instants fixes (PRNG mulberry32 pour le rythme), texte = `mot.slice(0, nb_frappes_passées)`.
- **Valeurs dérivées** : remplissage, nombre, bulle = fonctions de la position de l'objet ; jamais un état séparé.
- Visibilité : `visibility` plutôt que `display` (garder le `display:flex` d'origine). Pas de `will-change` sur ce que la caméra agrandit.
- Couleur entre deux teintes : passer par HSL, sinon le milieu devient gris.
- Aperçu : `film.html#play` (Espace, ←/→, R).

## 2. Rendu
`node scripts/render_sub.mjs film.html <W> <H> sub <fps> <sous-images> <processus>` puis :
```
# 8 sous-images (flou de mouvement), 60 fps
ffmpeg -framerate 480 -i sub/s_%06d.jpg -i audio.wav -filter_complex "[0:v]tmix=frames=8,select='eq(mod(n\,8)\,7)',setpts=N/60/TB,scale=in_range=pc:out_range=tv:out_color_matrix=bt709,format=yuv420p[v]" -map "[v]" -map 1:a -r 60 -color_range tv -colorspace bt709 -c:v libx264 -crf 16 -preset slow -c:a aac -b:a 256k -t <DUR> -movflags +faststart film.mp4
# 1 sous-image (texte toujours net) : -framerate 60 -i sub/s_%06d.jpg … sans tmix
```
- 8 sous-images pour les films avec mouvements rapides ; 4 laisse des fantômes ; 1 (60 fps nets) quand le brief interdit le texte flou.
- Re-rendre seulement un passage : `node scripts/render_sub.mjs film.html W H sub 60 8 6 <k0> <k1>` (k = image × sous-images).
- Durées mesurées : 15 s à 8 sous-images ≈ 12–15 min avec 6 processus.

## 3. Son
`python3 scripts/mix.py config.json` : morceau démarré pour que le drop tombe sur le moment clé, chaque son placé sur son **pic mesuré**, deux passes loudnorm −14 LUFS, crête −1,3 dB.

## 4. Contrôles (obligatoires avant livraison)
`python3 scripts/qa.py film.mp4` → images qui sautent (écart > 3× les voisines), jointure de boucle (écart dernière/première image vs écart médian), planche de contrôle et bande des passages rapides. Regarder les planches (Read). Corriger, re-rendre seulement les images touchées.

## 5. Pièges réellement rencontrés
- Ne pas répéter le même composant (carte produit) dans plusieurs scènes d'affilée : à partir de la moitié du film, changer de langage visuel (vraies vidéos dans des cadres téléphone / carré / 16:9 ; grand prix animé avec prix barré, pastilles et bouton).
- Rendu : si un processus Playwright dépasse son délai (TimeoutError sur les scènes lourdes en images), lister les sous-images manquantes et relancer seulement ces plages en petits morceaux (zsh : utiliser des tableaux pour les bornes).
- Mur de vidéos courbé (ouverture appréciée) : tuiles 16:9 sur un cylindre vu de l'intérieur (`translate3d(0,y,R) rotateY(θ) translate3d(0,0,-R)`, perspective ~2300, R ~2300), rangées qui défilent en sens alternés ; les vidéos sont des séquences JPEG extraites par ffmpeg (30 i/s) et `render()` attend `img.decode()`. Utiliser les vidéos de l'utilisateur (RÉSULTATS), jamais des vidéos Pinterest/Instagram de tiers.
- Fin appréciée : la page bleue se resserre en barre d'adresse blanche sous le logo, « mamarque.site » tapé lettre par lettre, flèche bleue pressée. Pas de « mamarque.site » en simple texte blanc.
- Listes (« Ce que tu sauras faire ») : une seule colonne centrée, rangées hautes et régulières.
- Pub pour une formation précise : reproduire les VRAIS composants du site (code `src/components/landing/CourseCard.tsx` : carte blanche rayon 35, image en retrait 15 px rayon 20, modules/chapitres avec icônes, prix + prix barré, pastille verte « −70 % », bouton bleu) et la vraie page de vente `mamarque.site/formation/<slug>` (carte d'achat, « Ce que tu sauras faire », module et chapitres). Fond blanc, peu de noir ; seule la fin peut passer en bleu.
- Jamais de plan figé : chaque élément garde une micro-animation ; un logo de marque reste visible au moins ~1,5 s ; une carte qui perd le focus redescend par ressort (pas de saut).
- `visibility:visible` sur un enfant l'affiche même si son parent est caché : la fonction `vis()` doit mettre `inherit`, jamais `visible`.
- L'utilisateur n'aime pas : la serif italique (« manuscrite »), le gras (Black) partout, les mises en page « diapo » avec le texte en haut à gauche. Il aime : textes centrés en Urbanist Medium, un téléphone au centre, bouton → inondation bleue → logo, cartes qui jaillissent, bouton noir → page (cf. `examples/films/launch-chat-15s.html` et `pub-mamarque-40s.html`).
- Avec une voix off : les repères suivent les mots du transcript (Deepgram), la musique passe 14 LU sous la voix (`mix.py` clé `voice`).
- Une sous-scène coupée 0,1 s avant la fin de son animation (« retournement ») = image qui saute : prolonger la condition d'affichage jusqu'à la fin de l'animation.
- Un composant visible en bord de cadre au début doit être dans le même état à la fin (curseur à 0 / à 100) sinon la boucle saute.
- Le texte indicatif d'un champ qui chevauche la frappe pendant les premiers dixièmes : le masquer dès la première frappe.
- Lettres qui « dépassent » de leur masque au repos : décalage d'entrée ≥ 135 % et rotation ≤ 2°.
- Animations de retour trop tardives : tout doit être immobile ~0,2 s avant la dernière image.
- Logo bleu sur fond bleu : utiliser un fond plus sombre (#072F86 → #0A5FD6) pour que l'icône reste lisible.
- `alphaextract`, Ghostscript, `rm` relatif : voir le skill video-toolkit.
