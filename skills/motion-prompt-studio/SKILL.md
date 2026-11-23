---
name: motion-prompt-studio
description: "Fabrique de prompts de motion design premium au format des films de motionvideo.xyz (Opus 5.5) : à partir d'un brief (formation, app, SaaS, produit, boutique, landing page…) et d'un script ou d'un fichier de voix off, écrit UN prompt complet en blocs «inputs» «script»/«voice» «direction» «structure» «sound» «build» «gotchas» «start», calé à la seconde sur la voix ou sur la musique, prêt à coller dans une nouvelle conversation pour obtenir une vidéo fluide. Ne fabrique jamais la vidéo elle-même. Déclencheurs : « crée-moi un prompt de motion design », « prompt pour ma vidéo », « prompt comme motionvideo », « voici le script de la voix off, fais-moi le prompt », « Motion Prompt Studio », « prompt premium pour une pub / une formation / un lancement »."
---

# Motion Prompt Studio

Ce skill ne fait **qu'une chose** : écrire des prompts. L'utilisateur colle ensuite le prompt dans une nouvelle conversation (Claude Code, Opus 5.5) et c'est ce prompt qui fabrique la vidéo. Ne jamais lancer de rendu, ne jamais écrire le code du film ici.

Le format vient de l'analyse des 105 films « Product UI » de motionvideo.xyz (102 prompts publiés, octobre 2026). Les 14 films les plus aboutis utilisent tous les mêmes blocs ; deux autres sont des briefs longs (Taxtello, Spotify). Lis `references/methode.md` avant le premier prompt de la session : il explique pourquoi chaque bloc fonctionne.

## Démarche (dans cet ordre)

1. **Lire la demande** et repérer ce qui est déjà fourni : sujet (formation, app, produit, boutique…), script ou fichier de voix off, durée, format, marque (logo, couleurs, police, site), visuels, musique.
2. **Voix off fournie en fichier** (mp3/wav) : lancer `scripts/voix_timing.py <fichier>`. Il transcrit avec Deepgram, découpe en phrases et sort une table « phrase → début/fin » à recopier dans `<structure>`. **Script texte seul** : estimer les temps (≈ 2,6 mots/s pour une voix publicitaire vive) et l'indiquer comme estimation à recaler. Détails : `references/voix-off.md`.
3. **Questions** (AskUserQuestion, 4 maximum, option recommandée en premier) seulement pour ce qui manque et change vraiment le prompt : format (9:16 · 4:5 · 16:9 · carré), durée, style/archétype, musique. Tout le reste reçoit une valeur par défaut écrite dans `<inputs>`.
4. **Choisir l'archétype** dans `references/archetypes.md` (formation, lancement d'app, SaaS/dashboard, boutique/produit, landing fly-over, boucle UI morphing, pub voix off, sting de marque). En combiner deux au maximum.
5. **Écrire la chaîne de scènes** : 4 à 8 scènes, chacune née de la précédente par un élément partagé (bouton → page, point → graphique, carte → écran, inondation de couleur qui se rétracte en objet). Une scène = une idée. Bibliothèque des transitions, caméras et lois de mouvement : `references/bibliotheque.md`.
6. **Caler le temps** :
   - avec voix off : chaque changement de scène sur un début de phrase, chaque mot-clé à l'écran au moment où il est prononcé ;
   - avec musique seule : `scripts/beats.py` ou BPM connu → un temps = 60/BPM s ; un événement par temps ; drop sur le moment clé.
7. **Rédiger le prompt** avec `templates/PROMPT.md` : blocs dans l'ordre, en anglais (langue où ces prompts marchent le mieux), **tout texte à l'écran en français entre guillemets**, valeurs chiffrées partout (hex, px, s, images, BPM, LUFS) et jamais d'adjectifs vagues seuls.
8. **Relire avec la grille de qualité** (ci-dessous). Corriger avant de livrer.
9. **Livrer** : une phrase d'intro, le prompt dans **un seul bloc de code** prêt à copier, puis 3 lignes maximum (durée/format, fil conducteur, moment « waouh »). Proposer une variante (autre format ou autre archétype) en une ligne.

## Grille de qualité (chaque prompt doit passer les 12 points)
1. `<inputs>` dit quoi demander **et** donne une valeur par défaut pour chaque élément (le film doit pouvoir se faire même si l'utilisateur ne répond pas).
2. `<direction>` donne : durée exacte, résolution, 60 fps, une référence de style nommée (« Apple keynote », « Stripe », « AI lab launch »…), la loi de mouvement, la palette en hex avec les rôles, la police, l'histoire en une seule chaîne `→`, et une ligne `Banned:`.
3. Un seul fil rouge visuel (objet, forme, curseur, carte, couleur) relie toutes les scènes ; aucune coupe sèche non motivée, aucun fondu enchaîné.
4. `<structure>` minute chaque scène (secondes, images ou temps musicaux) avec positions, tailles et couleurs précises.
5. Voix off : scènes sur les débuts de phrases, mots affichés au moment exact où ils sont dits, texte court (jamais la phrase entière).
6. Une action visible par temps ou par idée ; aucun plan figé > 1 s (sauf le plan final).
7. La caméra : un seul conteneur, zoom interpolé en log, un mouvement amorti par scène, jamais avant/arrière à la suite.
8. Physique sobre : ressorts fermés (amortissement 0,7–1), dépassement < 2 %, pas de rebond élastique.
9. `<sound>` : SFX téléchargés placés sur leur pic mesuré, variés et discrets, musique libre de droits (Mixkit/Pixabay) constante et sous la voix, −14 LUFS, true peak −1 dBTP.
10. `<build>` impose le rendu déterministe : une page HTML pilotée par `seek(t)` (ou Remotion), aucune transition CSS ni minuteur ni `Math.random`, Playwright 60 fps avec 4–8 sous-images mélangées (tmix), contrôle des sauts d'image.
11. `<gotchas>` contient au moins 4 pièges concrets adaptés au film (texte qui déborde, inondation trop courte, flou sur texte zoomé, boucle qui saute…).
12. `<start>` impose le **contrat storyboard** (voir `references/storyboard.md`) : poser les questions → livrer un **storyboard visuel complet** (une image PNG + une page HTML : chaque scène en vignette réellement rendue, numérotée, avec son temps, la phrase de la voix, ce qui bouge et la transition vers la suivante) → **attendre les corrections** de l'utilisateur, scène par scène (« S4 : … ») → rendre → après le rendu, **accepter des retouches par numéro de scène** et ne re-rendre que les plages touchées, en renvoyant à chaque fois la planche mise à jour.
13. Le prompt impose une **direction artistique distinctive** (jamais « comme on voit partout ») : un vrai morphing de formes entre les scènes (un même objet qui se transforme), les icônes Nucleo glass installées, peu nombreuses (jamais d'icônes au trait ni d'icônes 3D partout), de la profondeur (plans en perspective, lumière), un mouvement continu et fluide (courbes amorties longues, chevauchements, flou de mouvement par sous-images).

## Préférences de l'utilisateur (par défaut, sauf demande contraire)
- Texte à l'écran **en français**, police **Urbanist** (400–500, **jamais de gras**), un seul accent de couleur, fonds clairs ou couleur de marque (jamais tout assombrir sans demande).
- **Interdits permanents** à recopier dans `Banned:` : anneaux et cercles décoratifs (ondes, ripples, cercles qui grandissent), grilles « bento », typographie éclatée plein écran, tirets décoratifs (trait devant un sur-titre, « — » dans un titre), prix affichés, texte coupé qui reste visible, écrans figés plus de 3 s, sous-titres sur les plans animés.
- Voix off **vive et dynamique** (jamais lente) ; musique basse et constante, sans pompage ; effets sonores discrets et variés ; whooshs très bas.
- Données réelles uniquement (site, captures, prix… jamais inventés) ; ce qui est illustratif est signalé comme tel.
- Livraison des vidéos (pour le prompt) : `<DOSSIER_PROJET>/RÉSULTATS/`.

## Fichiers
- `references/methode.md` — anatomie du format motionvideo, bloc par bloc, chiffres du corpus, ce qui rend ces prompts efficaces.
- `references/bibliotheque.md` — transitions, caméras, lois de mouvement, recettes de look (verre liquide, inondation, iris, accordéon…), son, lignes `<build>` et `<gotchas>` prêtes à l'emploi.
- `references/archetypes.md` — 8 archétypes de film avec leur chaîne de scènes type, leur durée et leurs pièges.
- `references/voix-off.md` — transformer un script ou un audio en table de temps, règles d'affichage des mots.
- `references/storyboard.md` — le contrat storyboard (format de la planche, boucle de corrections avant et après le rendu) et les ressources visuelles de l'utilisateur (icônes Nucleo glass, icônes 3D).
- `templates/PROMPT.md` — gabarit à remplir (version voix off et version musique).
- `examples/corpus/` — les 13 prompts de référence de motionvideo.xyz ; `examples/corpus.json` — les 102 prompts publiés.
- `examples/exemple-formation.md` — un prompt généré à partir d'un brief de formation avec voix off.
- `scripts/voix_timing.py` — voix off → table des phrases et des mots (Deepgram). `scripts/beats.py` — tempo et premier temps d'un morceau.
