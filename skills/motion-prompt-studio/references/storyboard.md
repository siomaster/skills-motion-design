# Le contrat storyboard (comme sur motionvideo.xyz)

Sur motionvideo, coller un prompt donne d'abord **une image de storyboard** de toute la vidéo ; l'utilisateur corrige des éléments, puis la vidéo est rendue, et il peut encore envoyer des modifications après. Chaque prompt écrit avec ce skill doit imposer ce déroulé dans `<start>`.

## 1. La planche (avant tout rendu)
- Une image `storyboard.png` (et la même page en HTML) au format paysage, une vignette par scène, **réellement rendue avec le vrai design** (pas un croquis) : 8 à 14 vignettes.
- Sous chaque vignette : numéro (`S1`, `S2`…), plage de temps, phrase de la voix (ou temps musicaux), ce qui bouge en une ligne, la transition vers la scène suivante (« → la carte se replie en pastille »).
- En tête de planche : format, durée, palette (pastilles de couleur), police, musique, liste des ressources réelles utilisées.
- Livrer la planche, puis **attendre** : l'utilisateur répond « S3 : … », « S7 : … ». Corriger seulement ces scènes, renvoyer la planche mise à jour. Ne lancer le rendu complet qu'après son feu vert.

## 2. Après le rendu
- Livrer la vidéo + la planche contact (une image par seconde).
- Les retours arrivent par scène : ne modifier que ces scènes, ne re-rendre que leurs plages de temps, réencoder, revérifier (sauts d'image), relivrer sous le même nom avec un numéro de version.

## Phrase à mettre dans `<start>`
« Ask me for the inputs. Then build every scene with its real design and send me a storyboard board (storyboard.png + storyboard.html): one rendered thumbnail per scene, numbered S1…Sn, each with its time range, the voice line, what moves, and the transition into the next scene. Wait for my corrections scene by scene (e.g. "S3: …"), update the board, and only render the full film after my go. After the render, accept changes by scene number, re-render only the affected time ranges, and send the updated contact sheet. »

## Ressources visuelles de l'utilisateur (à proposer dans `<inputs>`)
- Icônes en verre **Nucleo glass** (248 icônes, fichier `~/.nucleo/skills/glass/icons.json`, SVG prêts) : code-editor, sparkle, magic-wand-sparkle, rect-layout-grid, earth, monitor, video, rocket, circle-coin, money-bill, suitcase, wallet-content, user, users, trophy, award-certificate, calendar, progress-bar, book-open, layers, laptop, steps-indicator… Chaque copie d'un SVG doit recevoir des identifiants uniques (dégradés, filtres, masques), sinon les icônes se cassent entre elles. Couleurs réglables par variables CSS `--nc-gradient-1-color-1/2`, `--nc-gradient-2-color-1/2`.
- Icônes **3D** : à n'utiliser que si l'utilisateur en demande une précise (rejetées quand elles étaient partout). PNG détourés, 1 632 fichiers : `/Volumes/DISKPART/PHOTOSHOP/3D` — par ex. CodeSquare_3, Magic Wand, Calendar, Clock, Trophy (2), Web Mortarboard, Laptop Mortarboard, Startup, Pencil Rocket, Dollar Coins_0001, Stack Of Dollar Coins_0001, Money Bag_0001, Briefcase, Layer, Bulb Idea, Checklist, Certificate, chat-dynamic-premium.
- Sites réels : les filmer en vrai (capture CDP du navigateur pendant un défilement doux) pour montrer leurs animations, pas une capture figée.
