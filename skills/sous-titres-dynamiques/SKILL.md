---
name: sous-titres-dynamiques
description: "Catalogue de 10 styles de sous-titres dynamiques et animés (tirés des dossiers « Inspiration Shorts » et « Inspiration Youtube horizontale » de l'utilisateur) + moteur JS déterministe pour les appliquer à une vidéo face cam. Déclencheurs : « sous-titres », « sous-titre dynamique », « captions », « ce style de texte », « texte animé sur la vidéo », « mets les sous-titres style … », « style néon / gaming / surligneur / éditorial / ciné / derrière le sujet / minimal / multicolore / compteur / barre de recherche »."
---

# Sous-titres dynamiques — catalogue de styles

L'utilisateur nomme un style (ou décrit l'effet) → appliquer CE style, sans le mélanger avec un autre, sauf demande.
Aperçus : `apercus/<style>.jpg` et `apercus/_planche.jpg` (à regarder avant de proposer un style).
Moteur : `engine/captions.js` + `engine/captions.css` (polices locales dans `../video-toolkit/fonts`).
Pipeline technique (transcription, dérushage, détourage, rendu, mixage) : skill **video-toolkit**.

## Règles communes (préférences de l'utilisateur)
- Polices : uniquement celles du dossier `Polices` (copiées dans video-toolkit/fonts) ou Google Fonts. Jamais de police système.
- Position par défaut en vertical : **au niveau de la poitrine, un peu en dessous** (`y ≈ 0.62–0.70` en 9:16 ; `≈ 0.75–0.82` en carré). Jamais au-dessus de la tête.
- **Pas de sous-titres pendant les plans d'animation** (fonds pleins, cartes UI, B-roll titré) : seulement sur la face cam. Option `hideDuringHero`.
- Mots-clés colorés avec parcimonie (1 par groupe max). Pas d'emoji, pas d'icônes glass sauf demande. **Jamais de cercles/anneaux décoratifs.**
- Corriger la transcription avant de l'afficher (noms propres, « WeChat », chiffres « 99 % »…). Retirer la ponctuation finale sauf le point coloré du style néon.
- Si le fond est clair (mur beige, fenêtre) : assombrir le décor via le détourage (video-toolkit) ou passer à un style à fond (barre de recherche, surligneur).

## Les 10 styles

| Code | Nom | Références | Rendu | Quand l'utiliser |
|---|---|---|---|---|
| `cine` | **CINÉ-PILE** | Shorts « 5$ Edit / Our work » (S04), S06, S07, S18 | Petits mots d'accroche (Plus Jakarta SemiBold) au-dessus/en dessous d'**un grand mot** (Plus Jakarta ExtraBold, ~13 % de la largeur). Le grand mot passe du **gris au blanc** pendant qu'il est prononcé. 1 groupe sur 7 : grand mot en serif italique (PP Hatton) pour l'émotion. | Storytelling, podcast, motivation, ton posé ; B-roll cinématique sombre. |
| `neon` | **NÉON MOT-CLÉ** | S11 (orange), S21 (vert), S06 « $30,000 » rouge | Phrase en blanc ExtraBold ; les mots à venir sont déjà là, **grisés et flous**, et s'allument au fil de la voix. Mot-clé en *italique* couleur accent avec **lueur néon** ; **point coloré** en fin de phrase. | Tutoriel / créateur sur fond sombre, éclairage néon. Accent orange #ff6a1a, vert #3dff6e, rouge #ff2d3d. |
| `gaming` | **TITRE GAMING** | S15 (« COMMENT STRATEGY »), S22 (« TURN 1 IDEA INTO 7 HOOKS ») | MAJUSCULES condensées (Built Titling), 2 lignes : ligne 1 blanche, **ligne 2 italique penchée colorée** (rouge/bleu/turquoise/jaune en rotation) ; chaque mot claque (scale 1.6→1 avec rebond) ; ombre dure noire + lueur. | Hype, fitness, marketing, listes « 7 astuces ». À combiner avec badges numérotés et cartes UI (montage-shorts style B). |
| `high` | **SURLIGNEUR** | S05 (« 90 Percent » sur barre citron) | Petits mots blancs + **un mot-clé** dont le fond citron (#c6ff3d) se dessine de gauche à droite ; le texte passe en noir. | Éducatif, chiffres, conseils. Lisible même sur fond clair. |
| `edito` | **ÉDITORIAL SERIF** | S14 (agence premium), S02 | Serif élégante (PP Hatton Medium) en minuscules + petits mots sans-serif ; **mot-clé en citron pâle (#d8f26a) ou doré** ; apparition douce (flou + interlettrage qui se resserre). | Premium, coaching, agence, lifestyle féminin, ton calme. Fond chaud / doux. |
| `behind` | **DERRIÈRE LE SUJET** | référence snapgram (S23), S02 « TOP », S18 | **Mot géant** (Anton, MAJUSCULES, rouge lumineux par défaut) placé **derrière la personne** grâce au détourage ; petits sous-titres devant. 1 mot géant par idée forte, jamais en continu. | Mots-chocs, pics d'émotion, chiffres. Nécessite `matte.sh` (video-toolkit). |
| `mini` | **MINIMAL UNE LIGNE** | S20, S16, S13 | 2–3 mots blancs SemiBold, une seule ligne, apparaissent **en bloc** (fondu + léger zoom), ombre douce. | Sérieux, informatif, long format, interviews. Ne gêne jamais l'image. |
| `multi` | **MULTICOLORE EMPILÉ** | S19 (immobilier Miami) | Pile de 2–4 lignes de tailles différentes : 1er mot en serif italique blanc, puis mots condensés (Coolvetica) en **jaune / citron / violet / blanc** ; **chiffres énormes**. | Immobilier, finance, chiffres, B-roll lumineux (villes, maisons). |
| `count` | **COMPTEUR** | S12 ($0 → $10,000/month), S21, YouTube Y25 | Le chiffre **compte de 0 à sa valeur** (0,7 s), condensé géant avec lueur ; contexte en petit au-dessus, unité en serif italique en dessous. Les groupes sans chiffre s'affichent en minimal. | Revenus, statistiques, résultats. |
| `type` | **BARRE DE RECHERCHE** | S07/S09 (notes, iMessage), Y29, Y34 | Le texte se **tape lettre par lettre** dans une barre blanche arrondie, avec curseur clignotant. | Accroche-question, « comment faire… », produit, SaaS. Très lisible sur fond clair. |

## Utilisation du moteur
```html
<link rel="stylesheet" href="file:///Users/VOTRE_NOM/.claude/skills/sous-titres-dynamiques/engine/captions.css">
<div id="behind"></div>          <!-- calque mots géants (entre le fond et le sujet détouré) -->
<img id="fg">                    <!-- sujet détouré (si style behind) -->
<div id="cap"></div>             <!-- calque sous-titres (devant) -->
<script src="file:///Users/VOTRE_NOM/.claude/skills/sous-titres-dynamiques/engine/captions.js"></script>
<script>
const cap = Captions.create({
  root: document.getElementById("cap"), behindRoot: document.getElementById("behind"),
  style: "neon", words,            // [{w,s,e}] Deepgram de la vidéo MONTÉE (ponctuation gardée)
  keywords: ["chine", "wechat"],   // mots mis en couleur (comparaison sans accents ni l'/d')
  accent: "#ff6a1a", W: 1080, H: 1920, y: 0.64,
  heroes: [{ t: "SURVEILLÉ", s: 2.4 }],   // style behind (ou en plus d'un autre style)
  hideDuringHero: true, hold: 0.8, maxWords: 3,
});
window.render = (t) => { cap.render(t); /* + images de la vidéo */ return Promise.resolve(); };
</script>
```
- `maxWords` par défaut : cine 4, neon 3, gaming 4, high 3, edito 4, behind 3, mini 3, multi 4, count 3, type 7.
- Les groupes se coupent à la ponctuation et aux pauses > 0,3 s, puis en paquets équilibrés.
- Le moteur réduit automatiquement un groupe trop large (90 % de la largeur max).
- `heroes` utilisables avec n'importe quel style (mot géant derrière le sujet) ; `hideDuringHero` masque les sous-titres pendant le mot géant.

## Vérification avant rendu
1. Images clés à 5–8 instants (un par style d'effet) → planche contact.
2. Contrôler : lisibilité sur le décor, pas de chevauchement avec le visage, mot-clé correct, ordre de lecture.
3. Rendu complet, puis planche finale extraite du MP4.
