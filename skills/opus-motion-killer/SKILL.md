---
name: opus-motion-killer
description: "Transforme une idée de vidéo en prompt de motion design « 0 keyframe » prêt à coller (structure «inputs» «direction» «structure» «build» «gotchas» «start»), dans le style des films « bouton qui devient page », « point bleu connecteur » et « balle blanche UI » : un seul élément fil rouge, morphing en élément partagé, caméra continue en zoom logarithmique, ressorts calculés, une action par temps, boucle parfaite. Sert aussi de kit de fabrication quand ce prompt est collé ensuite (moteur seek(t), rendu Playwright à sous-images, sons calés sur leur pic, contrôles). Déclencheurs : « Opus Motion Killer », « génère-moi un prompt de motion design », « prompt pour ma vidéo », « j'ai une idée de vidéo », « fais un prompt comme Fable / Opus », « motion design 0 keyframe »."
---

# Opus Motion Killer

Deux modes :
1. **Générer un prompt** (mode par défaut) : l'utilisateur donne une idée, tu rends UN prompt complet dans la structure en 6 blocs, à copier-coller.
2. **Fabriquer la vidéo** : quand un prompt de ce format est collé (blocs `<inputs>` … `<start>`), tu suis son bloc `<start>` (questions, grille des temps, 4 images, feu vert) puis tu construis avec `references/kit-fabrication.md` et les scripts.

Lis d'abord `references/anatomie.md` (pourquoi ces prompts donnent un rendu haut de gamme), puis `references/bibliotheque.md` (connecteurs, morphings, caméras, motifs par scène) au moment d'écrire.

## Préférences de l'utilisateur (à appliquer par défaut, sauf demande contraire)
- Textes à l'écran **en français**, police **Urbanist** (Medium pour l'interface, Black pour les gros titres). Pas de Geist ni de serif sauf demande.
- Accent **bleu MaMarque #00A1FF** (jamais le vert/lime des modèles), un seul accent par film.
- Fonds : blanc / blanc cassé chaud, ou quasi-noir #0B0B0D–#0E0E10. Aucun dégradé décoratif, aucune lueur, **aucun anneau ni cercle décoratif** (un point plein, un bouton rond, un remplissage de couleur sont permis).
- **Jamais de « bento »** (grille de tuiles) : une seule forme qui se transforme, une seule action lisible par plan.
- Musique Mixkit gratuite (n°190 à 120 BPM, drop à 16,01 s ; « Cat Walk » n°371 à 130 BPM, drop à 14,76 s) ou un morceau de ses dossiers.
- Zéro invention : pas de fonctionnalité MaMarque qui n'existe pas (pas d'assistant IA, pas de notes/avis inventés). Données réelles du site mamarque.site (formations, prix) ou marquées comme illustration.
- Livraison dans `<DOSSIER_PROJET>/RÉSULTATS/`.

## Mode 1 · Générer le prompt

1. **Questions (AskUserQuestion, 4 maximum, options recommandées en premier)** seulement pour ce qui manque à l'idée :
   - format et durée (16:9 1920×1080 · 9:16 1080×1920 · carré 1440×1440 ; 10, 15 ou 30 s) ;
   - le **connecteur** (l'objet qui traverse tout le film : point, balle, bouton, bulle, curseur, forme) — propose 2–3 options tirées de l'idée ;
   - fond clair ou sombre + accent ;
   - musique (avec son BPM).
   Si l'utilisateur dit « vas-y », prends les valeurs par défaut ci-dessus.
2. **Écris la chaîne de scènes** : 4 à 7 scènes, chacune née de la précédente par un élément partagé (voir bibliothèque). Vérifie les 8 règles d'or (ci-dessous) avant d'écrire.
3. **Calcule la grille** : temps = 60/BPM ; nombre de temps = durée / temps (arrondi à la mesure) ; place chaque événement sur un temps ou un demi-temps ; drop musical sur le moment clé ; départ du morceau = drop − (temps du moment clé).
4. **Rédige le prompt** avec `templates/PROMPT.md` : 6 blocs dans cet ordre, en anglais (c'est la langue où ces prompts marchent le mieux), mais **tout le texte à l'écran en français entre guillemets**, avec les préférences ci-dessus intégrées dans `<direction>` et les valeurs par défaut dans `<inputs>`.
5. **Livre** : une phrase d'intro, puis le prompt dans un seul bloc de code prêt à copier. Ensuite 3 lignes max : durée/temps, le connecteur, ce qui fera le « wow ». Propose de le lancer tout de suite.

### Les 8 règles d'or (chaque prompt généré doit les respecter)
1. **Un fil rouge** : un seul objet relie toutes les scènes et revient à la fin.
2. **Pas de coupe** : chaque scène naît d'un élément déjà à l'écran (bouton → page, point → graphique, forme → cercle qui remplit le cadre).
3. **Une caméra, un monde** : un seul conteneur, clés `[t, zoom, x, y]`, zoom en log, un mouvement amorti par scène, jamais avant/arrière à la suite.
4. **Un temps = une action** : chaque temps fort a un événement visible ; aucune pause de plus d'une seconde sauf la fin.
5. **Une source de vérité** : ce qui se dérive se dérive (le graphique = la fonction ressort du point ; le remplissage = la position de la balle ; le texte tapé = la sous-chaîne à l'instant t).
6. **Physique sobre** : ressorts fermés, petit dépassement, écrasement bref au contact, jamais de rebond élastique.
7. **Textes exacts** entre guillemets, courts, sur lignes fixes ; entrée et sortie des textes avec leurs propres temps.
8. **Boucle ou fin nette** : dernière image = première (position, vitesse nulle, curseur, état) ou carte finale avec marque.

## Mode 2 · Fabriquer la vidéo à partir d'un prompt collé
Suis `references/kit-fabrication.md`. En résumé : questions du `<inputs>` → mesure du morceau (`scripts/beats.py`) → grille des temps (tableau) + 4 images clés → feu vert → film HTML `seek(t)` (exemples complets dans `examples/films/`) → une image par temps → rendu `scripts/render_sub.mjs` → son `scripts/mix.py` → contrôles `scripts/qa.py` (images qui sautent, jointure de boucle, planche) → livraison + chemin exact.

## Fichiers
- `references/anatomie.md` — analyse des 3 prompts modèles, bloc par bloc.
- `references/bibliotheque.md` — connecteurs, morphings, mouvements de caméra, motifs de scène, listes d'interdits, calculs de tempo.
- `references/kit-fabrication.md` — moteur, rendu, son, contrôle qualité, pièges réels rencontrés.
- `templates/PROMPT.md` — gabarit à remplir.
- `examples/prompts/` — les 3 prompts d'origine + 2 prompts générés pour MaMarque.
- `examples/films/` — 4 films réellement livrés (HTML complets, à copier comme point de départ).
- `scripts/` — `render_sub.mjs`, `beats.py`, `mix.py`, `qa.py`.
