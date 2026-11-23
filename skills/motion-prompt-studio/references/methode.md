# La méthode motionvideo.xyz (analyse d'octobre 2026)

## Le corpus
- Catégorie « Product UI » : 105 films, 102 prompts publiés, quasiment tous faits avec Opus 5.5.
- Longueur des prompts : la moitié fait moins de 200 caractères (« make a dynamic 15-second motion graphics video… go all out »). Ce sont des essais, pas des films aboutis.
- Les **14 films les plus soignés** (launch films, boucles UI, fly-overs) utilisent tous le même squelette : `<inputs>` `<direction>` `<structure>` `<build>` `<gotchas>` `<start>` (14/14), parfois enrichi de `<script>`, `<voice>`, `<sound>`.
- Deux autres modèles longs :
  - **Brief de directeur artistique** (Taxtello, 15 000 caractères) : rôle, « This is NOT… », sources de vérité, langage visuel, règles créatives numérotées, format, arc émotionnel, storyboard horodaté, transitions bonnes/mauvaises, mouvement, lumière, typographie, son, produit réel, implémentation, boucle de contrôle, barre de qualité, livrables.
  - **Brief en balises thématiques** (Spotify) : `<deliverables>` `<art_direction>` `<artwork>` `<timeline>` `<persistent_player>` `<motion_quality>` `<audio>` `<implementation_and_validation>`.
- Mots présents dans les 14 prompts structurés : `seek(t)` (14), Playwright (14), BPM (14), springs (13), `Banned` (13), 60 fps (13), sous-images (10), stills (10), Geist (10), Mixkit (9), LUFS (7).

## Pourquoi ce format donne des films fluides

### `<inputs>` — demander, mais ne jamais bloquer
« Ask me for: … If I skip any, use the defaults: … ». Chaque entrée a une valeur par défaut. Le modèle peut donc toujours finir le film. Les entrées sont **concrètes** : nom, logo, une phrase tapée dans le champ, 3 à 6 captures, 40 images, un morceau avec son BPM et l'instant du drop.

### `<script>` et `<voice>` — quand il y a une voix
- `<script>` donne un **gabarit de texte** à adapter (Ora 2 : 9 lignes « This is [name]. A [category]… built for [value]… »), avec les balises d'émotion à utiliser avec parcimonie.
- `<voice>` décrit la fabrication : plusieurs prises, pauses raccourcies (> 0,28 s ramenées à 0,2 s), niveau égalisé, **minutage des mots** (découper aux pauses ≥ 100 ms, transcrire chaque segment, caler le premier mot sur l'attaque mesurée).

### `<direction>` — la vision en un paragraphe dense
Toujours dans cet ordre :
1. durée exacte, résolution, fréquence (« A 15-second product launch film, 1920x1080 at 60fps ») ;
2. une **référence nommée** (« Apple-keynote feel », « AI lab launch », « Dribbble-level UI motion », « high-end macro product shoot ») ;
3. la **loi de mouvement** (« 2D only, one continuous take. Every scene is made out of the previous one », « every shot enters already moving… and leaves on an accelerating move or a blur ramp ») ;
4. palette en hex **avec les rôles** (page, accent, encre), police et graisses ;
5. l'histoire en **une chaîne de flèches** (« header rises out of a blue haze → a cursor glides in… → hard cut on the music drop to the app icon → … ») ;
6. `Banned:` — la liste des interdits (crossfades, blur-ins, 3D, particules, glows, holds > 1 s, « anything that looks like a template »).

### `<structure>` — le film minuté
- Grille de temps explicite : « 130 BPM, 32 beats (14.8s). Start the song 12 beats before its drop », ou numéros d'images (`f0–f359` à 29,97 i/s), ou secondes.
- Chaque scène a un nom et une plage, puis le détail : positions en px, tailles, rayons, couleurs, courbes (« 932 (f0) → 776 (f2) → 683 (f5)… »), texte exact entre guillemets sur des lignes fixes.
- Le niveau de détail est extrême sur les moments clés (coupes, drop, logo) et plus libre ailleurs.

### `<sound>` — le son est écrit, pas laissé au hasard
Morceau libre de droits avec son tempo et son drop ; drop calé sur le moment clé ; un SFX téléchargé par événement, **placé sur son pic mesuré** ; voix 9 dB au-dessus de la musique entre 300 Hz et 4 kHz ; loudnorm −14 LUFS.

### `<build>` — la recette technique numérotée
1. Une seule page HTML, chaque image calculée par `seek(t)` : pas de transitions CSS, de minuteurs, d'état entre images, de `Math.random`.
2. Ressorts en forme fermée ; une valeur à plusieurs cibles = somme d'un ressort par changement.
3. Une caméra = une transformation sur un conteneur, clés `[t, zoom, x, y]`, zoom interpolé en log.
4. Éléments partagés à chaque passage (l'inondation emporte une copie des mots de la bulle).
5. Recettes spéciales (verre liquide par carte de déplacement, goo, iris à 6 lames, accordéon de lettres, profondeur de champ par pixel en WebGL).
6. Rendu Playwright 60 fps, 4 à 8 sous-images mélangées par `tmix`, contrôle des sauts (différence d'images 3× supérieure aux voisines), planche contact.

### `<gotchas>` — les erreurs déjà payées
Phrases courtes et vécues : « Four subframes leave ghost copies on fast moves, so render 8 », « The flood must reach the farthest corner and take about 0.35s, or it looks like a flash », « Text that swaps inside a morphing shape needs its own mask », « Make the last frame identical to the first, cursor position and speed included ».

### `<start>` — le contrat de départ
« Ask me for the inputs, then show me the beat map and 4 stills (ask, drop, chat, outro) before writing the full film. » Le modèle ne se lance jamais à l'aveugle.

## Les principes communs (à retrouver dans chaque prompt écrit)
1. **Une prise continue** : chaque scène naît de la précédente (forme qui se transforme, inondation qui se rétracte, bouton qui devient page). Coupe sèche seulement sur un drop musical, voulue.
2. **Un fil rouge** : un objet (point, balle, curseur, forme, carte, couleur) traverse le film.
3. **La caméra raconte** : zoom style Screen Studio sur chaque action, un mouvement amorti par scène.
4. **Le temps est musical** : un événement par temps, drop sur le moment fort, dernière image = première image pour les boucles.
5. **Retenue** : un accent de couleur, une police, peu de texte, pas d'effets gratuits (« The visual confidence should come from restraint »).
6. **Réel** : vraies captures, vraies données, vrai logo ; rien d'inventé.
7. **Le chiffre plutôt que l'adjectif** : « damping 0.72, settle 0.35s », « 12px blur over 0.15s », « cursor speed under 65 px/frame ».
8. **Vérifier avant de livrer** : images clés, planche contact, chasse aux images qui sautent, puis seulement le rendu final.
