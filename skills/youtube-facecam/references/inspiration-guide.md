# GUIDE — Style de montage de la vidéo d'inspiration (INSPIRATION.mp4)

Source : `<DISQUE_MEDIA>/EDITING/MaMarque/RAW/3 CHOSES/INSPIRATION.mp4`
3840×2160, 25 i/s, AV1, 1099,5 s (18 min 19 s). Proxy d'analyse 960 px : `insp/proxy.mp4`.
Sujet : un créateur business FR (face cam, micro broadcast sur bras) explique « le business le plus intelligent à lancer en 2026 ». Ton : sombre, premium, rouge/noir.

Méthode : détection de plans (ffmpeg `scene` sur toutes les images), classement automatique de chaque image (plan large / gros plan / graphisme) sur 5 500 images, mesure de la taille du disque rouge pour détecter les zooms, 10 planches contact (1 image / 4 s), 3 planches à 1 image / s sur les 3 premières minutes, 47 bandes de mouvement (2 à 25 i/s), analyse audio (ebur128, RMS par 50 ms, spectre des silences, énergie aux transitions).

Tous les chemins ci-dessous sont relatifs à
`/private/tmp/claude-502/-Volumes-MONTAGE----AI-MOTION/b594f2a7-fa53-4cba-8b32-146fba12ffa3/scratchpad/yt3/insp/`

---

## 0. En une phrase

**Face cam sombre à 2 caméras fixes, coupée toutes les ~9 s. Un habillage est à l'écran la moitié du temps. Chaque idée devient un objet animé (cartes 3D, panneaux de verre, courbes néon, interfaces recréées), en général hors de la zone du visage ou en plein écran. Les transitions sont des light leaks blanc/bleu/vert très courts (0,4 s), suivis d'un zoom arrière d'atterrissage sur la face cam. Le texte apparaît mot par mot avec flou, calé sur la voix. Aucun sous-titre.**

---

## 1. Structure de la vidéo (timestamps)

| Temps | Section | Contenu visuel dominant |
|---|---|---|
| 0:00–0:01 | Ouverture à froid | 1 s de face cam large, puis light leak |
| 0:01–0:08 | Accroche | UI type iOS gris clair (contacts LK / EM, « Argent Facile : l'argent facile n'existe pas »), volet diagonal noir « Argent Intelligent » |
| 0:08–0:20 | Accroche (suite) | B-roll IA 3D : clé lumineuse → personnage aux yeux orange + foule ; cerveau sur piédestal entre colonnes rouges |
| 0:20–0:45 | Définition + question | Lower third « Business Intelligent » ; carte citation sur satin rouge « Quel est LE business le plus intelligent à lancer en 2026 ? » |
| 0:45–2:05 | Contexte / histoire perso | Roue 3D « Modèles d'entreprise » (Dropshipping/SMMA/SAAS/Selling), cartes de verre Travail/Études/Business, B-roll lifestyle en cinémascope, courbe « Industrie en déclin », curseur HEC → E-COM → APPLICATION, barre de recherche « Get Started » |
| 2:05–4:45 | Les 4 atouts d'un business | Cartes 3D noires « Atout Numéro 1–4 » (marges, investissement, difficulté, demande), barre néon Marge/Bénéfice/Chiffre d'affaires, photos flottantes, distributeur « Key's bank », graphe Offre/Demande « Gap d'opportunité » |
| 5:02–7:54 | Business 1 : DROPSHIPPING | Chapitre « 1 DROPSHIPPING », cartes verte « Avantages » et rouge « Désavantages » sur une ligne de temps, panneau de score bas (Marges / Investissement / Difficulté / Demande) |
| 7:54–9:58 | Business 2 : SMMA | Chapitre « 2 SMMA », mêmes gabarits |
| 9:58–12:00 | Business 3 : SAAS | Chapitre « 3 SAAS », mêmes gabarits |
| 12:00–12:12 | Récap | Tableau « Business les plus populaires » 1/2/3 avec pastilles « Atouts 0/4 · 2/4 · 2/4 » |
| 12:16–14:00 | Révélation : Dropservicing IA | Panneau « ??? » tout vert, carte de France (1 000 000 / an), puces, frise 1900/1990, hommes en chapeau + « L'IA est la priorité absolue », boîte néon 4 employés → 1 agent IA, Google Trends « ai agent », logos 3D Vinci/Bouygues |
| 14:00–16:00 | Méthode / storytelling | Particules Offre/Demande, barre de recherche + filtres, scène de dialogue IA (restaurant orange), tarifs dev « €16 / €40 », devis manuscrit, tableau de paiements |
| 16:00–17:45 | Arbitrage + récap final | Grille 3D néon Europe (France / Roumanie / Portugal) + bandeau « Arbitrage », puzzle 3D, cartes atouts 4/4 |
| 18:00–18:19 | CTA | Fenêtre macOS Finder sombre → dossier « Systèmes avancés » → fenêtre « ACA – Agence à Croissance Accélérée » (1. Sélectionner, 2. Arbitrer, 3. Publier…) ; fin sèche |

**Courbe d'intensité :** les 2 premières minutes sont les plus denses (25 plans, 57 % du temps en plein écran graphique). Le milieu (6:00–12:00) se calme : surtout de la face cam avec des panneaux en bas (6 à 8 plans par 2 min). La densité remonte sur le dernier tiers (14:00–16:00 : 47 % du temps en graphismes plein écran).

---

## 2. Rythme (mesuré)

- **~132 plans au total, soit 1 plan toutes les 8,3 s** en moyenne (tous types confondus).
- **Plan large face cam (W)** : 54 plans, durée moyenne 9,3 s, médiane 7,1 s, max 51,6 s (avec un panneau en bas pendant tout le plan).
- **Gros plan 3/4 (C)** : 57 plans, moyenne 9,0 s, médiane 6,6 s, max 28,2 s.
- **Plein écran graphique / B-roll** : durée médiane 3 s, de 0,9 s (B-roll cinémascope) à 8 s (cartes 3D, graphe).
- **89 changements de caméra W↔C**, dont 32 en light leak (36 %) et 57 en coupe sèche (64 %).
- **69 light leaks au total**, soit 1 toutes les 16 s en moyenne.
- **~50 coupes sèches détectées**, plus environ 25 coupes W↔C à faible contraste.
- **Répartition du temps d'écran** (275 images à 1 / 4 s) : 50 % face cam seule, 21 % face cam avec habillage incrusté, 29 % graphisme ou B-roll plein écran. **Un habillage est présent la moitié du temps.**
- La face cam reste rarement seule plus de **~20–25 s**.
- **Silences supprimés** : aucun silence de plus de 0,45 s sur toute la vidéo (`silencedetect` à −45 dB et 0,25 s : 0 résultat). Le débit est tendu. Les raccords dans les respirations sont cachés par les changements de caméra.

Planche rythme : `sheets/all_00.jpg` … `sheets/all_09.jpg` (1 image / 4 s, de gauche à droite et de haut en bas ; image i = 120 × n° de planche + 4 × i secondes).

---

## 3. Face cam

**Deux caméras fixes, aucun mouvement de caméra réel.**

1. **Plan large frontal (W)**, environ 50 % du temps :
   - Sujet centré (visage x ≈ 47 %, yeux y ≈ 17–20 %, haut du crâne à ~3–5 % du bord haut), torse et mains visibles, bureau en bois clair sur les 8 % du bas.
   - Micro broadcast noir sur bras qui entre par la gauche (≈ y 30–40 %).
   - **Disque de lumière rouge projeté sur le mur derrière la tête** : centre ≈ (45 %, 25 %), diamètre ≈ 42 % de la largeur, rouge saturé ≈ #E3121B, bord doux.
   - Mur brun très sombre ≈ #1E1410 à #2B1D17. Chemise noire.
2. **Gros plan 3/4 latéral (C)**, environ 50 % :
   - Caméra décalée à gauche, sujet de profil 3/4 regardant vers la gauche du cadre. Visage x ≈ 55–75 %, yeux y ≈ 30–35 %.
   - **Les 45 % de gauche sont un mur noir-brun vide** : c'est l'espace réservé au texte (puces, cartes de verre, photos).
   - Le cadrage varie d'une coupe à l'autre (recadrages ≈ ×1,0 / ×1,15 / ×1,3 : voir `strips/s30_closeup_jumpcrops_bar_866s.jpg`). Ce sont des punch-ins en coupe sèche, jamais animés.

**Mouvements « caméra » ajoutés au montage :**
- **Zoom arrière d'atterrissage.** C'est la signature de la vidéo. Quand on revient sur le plan large après un light leak ou un graphisme plein écran, l'image démarre zoomée (×1,17 à ×1,30) et revient à ×1,0 en **0,5–1,0 s**, avec un easing très sortant (expo.out) et du flou de bougé sur les 2–3 premières images. Mesures sur le disque rouge : 2 127 → 1 550 px² en 1 s à 95 s (×1,17), 2 505 → 1 700 px² à 613 s (×1,21), et ×1,3 visible à 95,1 s et 122,6 s.
  Bandes : `strips/s08_zoomout_landing_95s.jpg`, `strips/s09_zoomout_landing_122s.jpg`, `strips/s40_broll_ia_cle_7s.jpg` (dernière ligne).
- **Pas de zoom lent continu** sur la face cam : la taille du disque est stable à ±3 % pendant les plans.
- Vers 14:47–15:05 (887–910 s), une rafale de 3–4 atterrissages rapprochés (×1,3 → 1,0) donne de l'énergie à un passage clé.
- Le plan large passe parfois d'un cadrage ×1,0 à ×1,06 en coupe (ex. 417–431 s).

**Étalonnage :** low-key, noirs profonds, contraste fort, peau chaude, rouge du disque très saturé. Pas de grain visible sur la face cam (le grain n'apparaît que dans les light leaks).

---

## 4. Catalogue des blocs graphiques (22 blocs)

Conventions : positions en % de la largeur (x) et de la hauteur (y) de l'image 16:9 ; tailles de texte en % de la hauteur (à 1080 p, 1 % ≈ 11 px).
Police d'interface : sans-serif néo-grotesque proche de SF Pro / Inter. Graisse SemiBold pour les titres, Regular pour le reste.

### B1. Interface iOS gris clair avec volet diagonal (accroche, 0:01–0:08)
- **Visuel :** fond gris clair en dégradé (#ECEEF2 au centre → #BFC3CB aux bords, vignette forte). Cartes blanches arrondies (rayon ≈ 2 % de la largeur). Avatars ronds bleus (#1E5FD0) et noirs avec initiales « LK », « EM », icône panier. Notifications « AF Argent Facile / 14 Dec. / L'argent facile n'existe pas. ». Forte profondeur de champ : bords très flous, zone nette au centre.
- **Animation :** la caméra glisse et tourne en continu (travelling + légère rotation 3D, ≈ 3 % de déplacement par seconde). Les avatars entrent un par un (fondu + montée, décalage 0,1 s). Le texte s'écrit **mot par mot avec flou** (« Argent » → « Facile »). À 0:05, un **panneau noir entre en volet diagonal** de gauche à droite (bord biseauté ≈ 70°, 0,3 s, power3.out) et révèle « Argent Intelligent / Par contre l'argent intelligent existe. » (icône cerveau saumon #E8907A, texte blanc).
- **Bandes :** `strips/s01_intro_ui_0s.jpg`, `strips/s02_intro_ui_wipe_3s.jpg`
- **GSAP :**
```js
tl.fromTo(".ui-cam",{scale:1.25,rotationY:-8,x:"6%"},{scale:1,rotationY:0,x:0,duration:7,ease:"none"},0);
tl.from(".avatar",{opacity:0,y:20,filter:"blur(6px)",stagger:.1,duration:.4,ease:"power3.out"},.2);
tl.fromTo(".dark-panel",{clipPath:"polygon(0 0,0 0,-20% 100%,-20% 100%)"},
  {clipPath:"polygon(0 0,120% 0,100% 100%,-20% 100%)",duration:.35,ease:"power3.out"},4.2);
// flou de profondeur : 2 copies, une floue (blur 6px) masquée par un dégradé radial
```

### B2. Lower third d'identité / de définition (0:20, 0:52 « SMMA », 8:00)
- **Visuel :**
  - Bas de l'image assombri par un dégradé noir (opacité 85 % en bas → 0 à y ≈ 60 %).
  - À x ≈ 8–13 %, y ≈ 88 % : icône au trait blanc (cerveau, 1,5 px) d'environ 5 % de haut.
  - **Barre verticale fine** (2 px, 4 % de haut) en dégradé orange #FF5A1F → transparent à x ≈ 15 %.
  - Titre blanc SemiBold ≈ 2,6 % de haut (« Business Intelligent »), à x ≈ 17 %.
  - Sous-titre gris #B5B5B5 ≈ 1,3 % de haut sur 2 lignes, où les mots clés finaux sont en blanc gras (« en énergie et **en argent** »).
- **Animation (mesurée à 20 i/s) :** dégradé du bas en fondu (0–0,3 s). Premier mot du titre en fondu + flou 8 px → 0 (0,25 s). Puis barre (scaleY 0 → 1) et icône en fondu (0,2 s). Second mot en fondu-flou (0,3 s). Sous-titre mot par mot sur la voix 1 à 1,5 s plus tard. Sortie : light leak, ou fondu 0,3 s.
- **Bandes :** `strips/s03_lowerthird_BI_20s.jpg`, `strips/z4_lowerthird_entry_20s_20fps.jpg`
- **GSAP :**
```js
tl.from(".lt-shade",{opacity:0,duration:.3})
  .from(".lt-w1",{opacity:0,filter:"blur(8px)",x:-6,duration:.25,ease:"power2.out"})
  .from(".lt-bar",{scaleY:0,transformOrigin:"50% 100%",duration:.2},"<.1")
  .from(".lt-icon",{opacity:0,scale:.8,duration:.25},"<")
  .from(".lt-w2",{opacity:0,filter:"blur(8px)",duration:.3})
  .from(".lt-sub .w",{opacity:0,filter:"blur(6px)",stagger:{each:.12},duration:.3},"+=0.8"); // ou calé sur les timestamps de mots
```

### B3. Carte citation sur satin rouge (0:33, 4:28, 6:08, 9:00, 13:56 ; 5 fois au total)
- **Visuel :**
  - Plein écran, fond **satin / soie rouge sombre ondulée** : plis flous #5A0D12 à #2A0507 sur noir, vignette forte. Ça ressemble à une boucle vidéo de tissu, très floue.
  - Texte centré blanc, sans-serif géométrique arrondi (type **Manrope / Urbanist Medium**), ≈ 3,2 % de haut, sur 2 lignes max, légère lueur (text-shadow blanc à 35 %).
  - **Bloc incliné de −2° à −3°.**
  - Guillemets « ❝ ❞ » blancs gras ≈ 5 % de haut : l'ouvrant en haut à gauche (x ≈ 3–8 %, y ≈ 30 %), le fermant en bas à droite (x ≈ 90–95 %, y ≈ 60 %).
- **Animation :** les mots apparaissent **un par un au rythme de la voix**. Chaque mot passe de 0 à gris à 50 % puis à blanc en ≈ 0,35 s, avec un flou de 8 px qui se dissipe. Le dernier mot reste plus gris que les précédents. Quand la ligne casse, le bloc se recentre (repositionnement doux 0,3 s). Les guillemets glissent vers le texte (≈ 2 % de déplacement). Toute la carte dérive lentement (zoom 1 → 1,05 et légère translation sur 3–4 s, ease linéaire). Entrée et sortie par light leak.
- **Bande :** `strips/s04_quote_33s.jpg`
- **GSAP :**
```js
// words = SplitText(".quote",{type:"words"}).words ; wordTimes = timings Deepgram
words.forEach((w,i)=>tl.fromTo(w,{opacity:0,filter:"blur(8px)",color:"#8a8a8a"},
  {opacity:1,filter:"blur(0px)",color:"#ffffff",duration:.35,ease:"power2.out"},wordTimes[i]));
tl.fromTo(".quote-group",{scale:1,rotation:-2.5,x:"-1%"},{scale:1.05,rotation:-2,x:"1%",duration:4,ease:"none"},0);
tl.from(".q-open",{x:"-4vw",opacity:0,duration:.6,ease:"expo.out"},0)
  .from(".q-close",{x:"4vw",opacity:0,duration:.6,ease:"expo.out"},.1);
```

### B4. Roue 3D de catégories (0:45–0:55)
- **Visuel :** anneau épais segmenté en 8 tuiles rouge foncé (#8A1414 → #5E0C0C, biseaux) en perspective, icônes orange (#FF8A3D) sur certaines tuiles, labels blancs courbés autour (« Dropshipping », « SMMA », « SAAS », « Selling »). Fond noir avec traînées rouges horizontales floues. Titre central « Modèles d'entreprise » blanc gras ≈ 6 % de haut avec lueur.
- **Animation :** l'anneau entre en tournant (≈ 60° en 1,5 s, power2.out) pendant que la caméra recule et se redresse. Les labels s'écrivent **lettre par lettre** (machine à écrire). Coupe vers l'intérieur de l'anneau : le titre monte lettre par lettre (y +20 px, flou → net, décalage 0,03 s). Puis **travelling arrière éclair** (de l'intérieur à l'anneau entier en ≈ 0,2 s, expo.out, flou de bougé), suivi d'une dérive lente.
- **Bandes :** `strips/s05_wheel_45s.jpg`, `strips/s06_wheel_title_50s.jpg`, `strips/z3_ring_dollyout_54s_20fps.jpg`
- ⚠ **Préférence connue de l'utilisateur : pas d'anneaux décoratifs.** Garder la mécanique (objet 3D qui tourne + travelling arrière éclair + titre lettre par lettre), mais remplacer l'anneau par un éventail de cartes ou une rangée de tuiles en perspective.
- **GSAP (mécanique) :**
```js
tl.fromTo(".wheel",{rotationZ:-60,rotationX:35,scale:1.4},{rotationZ:0,rotationX:20,scale:1,duration:1.6,ease:"power2.out"});
tl.from(".label .ch",{opacity:0,stagger:.03,duration:.05},"-=.8");
tl.fromTo(".cam",{scale:3.2},{scale:1,duration:.5,ease:"expo.out"},"+=1"); // travelling arrière éclair
```

### B5. Cartes de verre dans l'espace vide du gros plan (0:56–1:00)
- **Visuel :** dans la zone vide à gauche du gros plan (x 3–35 %, y 10–45 %), cartes empilées verticalement de ≈ 32 % × 9 %. Verre sombre (#1A1214 à 70 %), contour 1 px blanc à 12 %, rayon ≈ 12 px. **Bande lumineuse en dégradé rouge → rose saumon** (#FF3B3B → #FF9A8A) façon horizon au tiers supérieur de la carte. Titre gris clair (« Travail », « Études », « Business ») avec une petite icône à droite, 2 lignes de texte gris minuscules.
- **Animation (mesurée à 25 i/s) :** chaque carte naît d'un **trait vertical de 2 px** qui grandit en hauteur (0,25 s), devient une gélule, puis s'élargit en carte (0,5 s, expo.out). C'est un morphing façon Dynamic Island. La carte suivante pousse sous la précédente, reliée par une fine tige. Décalage de 1,5 à 2 s, calé sur l'énumération. **Les cartes restent affichées quand on coupe vers le plan large.**
- **Bandes :** `strips/s07_glasscards_55s.jpg`, `strips/z2_glasscard_unfold_55s_25fps.jpg`
- **GSAP :**
```js
tl.fromTo(card,{width:2,height:0,borderRadius:999},{height:"9vh",duration:.25,ease:"power3.out"})
  .to(card,{width:"32vw",borderRadius:12,duration:.5,ease:"expo.out"})
  .from(card.querySelectorAll(".c-txt"),{opacity:0,filter:"blur(6px)",stagger:.06,duration:.3},"-=.25");
```

### B6. Courbe néon caméra-suiveuse avec texte brouillé (1:08)
- **Visuel :** fond noir, grille fine (#FFFFFF à 6 %, cases ≈ 5 % de large), poussières. Courbe épaisse avec lueur, **blanche qui vire au rouge** (#FF2A2A) quand elle descend. Point lumineux en tête (lens flare en croix). Label blanc SemiBold ≈ 2,5 % de haut à droite du point.
- **Animation :** la **caméra suit le point**, qui reste vers x ≈ 40 %, y ≈ 50 %. La courbe défile derrière lui (monte, redescend, plonge) en ≈ 3 s. Le texte « Industrie en déclin » apparaît en **effet scramble** (lettres aléatoires qui se fixent de gauche à droite). Coupe sèche en sortie.
- **Bande :** `strips/s38_courbe_declin_66s.jpg`
- **GSAP :**
```js
// path dessiné en strokeDashoffset ; on translate le monde pour garder la tête à (40%,50%)
tl.to(path,{strokeDashoffset:0,duration:3,ease:"power1.inOut",onUpdate(){const p=path.getPointAtLength(len*this.progress());
  gsap.set(world,{x:W*.4-p.x,y:H*.5-p.y}); gsap.set(dot,{x:p.x,y:p.y});}});
tl.to(path,{stroke:"#ff2a2a",duration:1.5},1.2);
tl.to(".lbl",{duration:1.2,scrambleText:{text:"Industrie en déclin",chars:"lowerCase",revealDelay:.3}},.6);
```

### B7. B-roll lifestyle en cinémascope (1:26–1:30)
- **Visuel :** 4 plans de vie quotidienne (bureau, baie vitrée, mer au couchant, casque au studio) en **letterbox 2,39:1** (bandes noires ≈ 12 % en haut et en bas), image légèrement désaturée et chaude.
- **Animation :** coupes sèches toutes les **≈ 1 s** (85,9 / 86,8 / 87,8 / 88,8 s), sans zoom ajouté. Retour par light leak bleu.
- **Bande :** `strips/s37_broll_letterbox_86s.jpg`
- **Recette :** `.broll{position:absolute;inset:12% 0;object-fit:cover}`, chaque clip ~25 images.

### B8. Curseur de frise (1:30–1:35)
- **Visuel :** carte de verre sombre centrée (≈ 30 % × 22 %, rayon 14 px, contour 1 px). Grosse icône d'app carrée (logo HEC, puis tuiles violette, rose, verte « AGENCE / E-COM / APPLICATION »). Étiquette en pastille sombre. **Règle graduée** façon curseur et année en italique gris (« 2023 », « 2024 »).
- **Animation :** la règle défile horizontalement. Les icônes glissent latéralement (carrousel) en changeant d'année, la nouvelle icône s'allume (scale 0,9 → 1 + lueur). Environ 1,2 s par étape.
- **Planche :** `sheets/first3min_1fps_01.jpg` (ligne 6)

### B9. Barre de recherche « Get Started » (1:48) et barre + filtres (14:12)
- **Visuel :**
  - Version 1 : pilule sombre (≈ 40 % de large, 4 % de haut) à contour gris 1 px, loupe à gauche, texte gris tapé, bouton rouge « Get Started » (#B3141B → #7A0C10) à droite, sur fond noir traversé d'un rai de lumière diagonal.
  - Version 2 (14:12) : barre **skeuomorphe gris argent** (#D9D9D9 → #9A9A9A, reflet intérieur) sur fond bleu nuit (#121826 radial), séparateur et bouton « Filtrer » avec icône réglages, menu déroulant avec cases « Hautes marges » et « Sans investir », curseur flèche qui coche, puis panneau de résultats (barres squelettes qui se remplissent de texte : « 1. Vendre des micro-services », « 2. Vendre des services IA »).
- **Animation :** frappe à ≈ 15–18 caractères/s avec caret clignotant. La caméra part en très gros plan sur le texte puis **recule** (×1,8 → ×1) pendant la frappe. Le curseur se déplace en courbe (0,4 s), avec un clic (scale 0,9 à l'appui). Le panneau de résultats s'ouvre vers le bas (hauteur 0 → 100 %, 0,4 s). Les lignes s'écrivent mot par mot.
- **Bandes :** `strips/s39_search_getstarted_104s.jpg`, `strips/s29_searchbar_filtre_857s.jpg`
- **GSAP :**
```js
tl.to(".q",{duration:txt.length/16,text:txt,ease:"none"});
tl.fromTo(".cam",{scale:1.8,x:"18%"},{scale:1,x:0,duration:3.5,ease:"power2.inOut"},0);
```

### B10. Cartes 3D « atouts » (2:05–2:15 ; 2:48 ; 3:40 ; 3:56 ; 4:40 ; 17:36)
- **Visuel :**
  - Éventail de 4 cartes noires laquées (format 2:3, rayon ≈ 6 %), inclinées de **−20 à −25°** en perspective, coupées par le bord droit.
  - **Reflet holographique** au bas des cartes : dégradé orange #FF7A1A, blanc, rose, cyan, flou.
  - Sur chaque carte : titre blanc « Atout Numéro 1: », puis une ligne d'astérisques « ************ » qui masque le nom. Grosse **icône dorée** (#D9B26A → #8C6A2E) d'abord **pixellisée**.
  - À gauche (x ≈ 5 %, y ≈ 36 %) : titre blanc SemiBold ≈ 3,5 % de haut « Les 4 atouts d'un business. » et 3 lignes de sous-texte gris ≈ 1,2 %.
  - Fond brun-noir (#1A1012 → #0D0808) avec halo chaud.
- **Animation :**
  - Texte de gauche mot par mot avec flou.
  - Cartes en **dérive lente continue** (rotationZ ±2°, y ±1 %, ≈ 5 s, sine.inOut).
  - Pour révéler un atout, une **main-curseur clique la carte**. Les astérisques se transforment en texte (« Les marges », « L'investissement », « Difficulté », « La demande ») et **l'icône se dé-pixellise** (mosaïque → net en ≈ 0,4 s, par paliers).
  - Entre les atouts, **les cartes se rebattent** : la carte suivante passe devant (glissement + rotation ≈ 0,8 s).
- **Bandes :** `strips/s12_cards3d_126s.jpg`, `strips/s13_cards3d_130s.jpg`, `strips/s17_cards_shuffle_284s.jpg`, `strips/s41_carte_depixel_atm_203s.jpg` (ligne 1)
- **GSAP :**
```js
gsap.set(".deck",{perspective:1200}); gsap.set(".card",{rotationZ:-22,rotationX:15,rotationY:-10});
gsap.to(".card",{rotationZ:"+=2",y:"+=8",duration:2.5,yoyo:true,repeat:-1,ease:"sine.inOut",stagger:.3});
// révélation : texte masqué → réel
tl.to(".card1 .name",{duration:.6,scrambleText:{text:"Les marges",chars:"*",revealDelay:.1}});
// dé-pixellisation : canvas avec imageSmoothing off, tailles 8→16→32→pleine
tl.to(pix,{res:1,duration:.4,ease:"steps(4)",onUpdate:drawPixelated},"<");
```

### B11. Barre néon de proportion (2:52, 6:56, 14:32, 15:36 « Dev ↔ Moi »)
- **Visuel :**
  - Bas de l'image assombri.
  - Ligne fine grise (#FFFFFF à 25 %, 1 px) de x 3 % à 92 %, à y ≈ 94 % (sur le plan large).
  - **Trait néon épais (3 px) avec lueur** : vert #2BD94A sur la partie « marge », puis **ambre #F5A524** jusqu'au bout.
  - Label « Marge » ou « Marges : 3000 € » à gauche, « Chiffre d'affaires : 20.000 € » à droite, en blanc ≈ 2,3 % de haut.
  - Mot **manuscrit** « Bénéfice » au-dessus, avec une flèche en boucle tracée à la main.
- **Animation :** la ligne grise se trace (0,4 s). Le néon vert se remplit de gauche à droite (≈ 1,2 s, power2.out), puis l'ambre prend le relais (0,8 s). Les labels arrivent en fondu-flou, le chiffre en machine à écrire (« 20.000 € » caractère par caractère). Le manuscrit se **dessine au trait** (stroke-dashoffset, 0,8 s).
- **Bandes :** `strips/s11_bar_benefice_171s.jpg`, `strips/s18_bar_marges_417s.jpg`, `strips/s30_closeup_jumpcrops_bar_866s.jpg`
- **GSAP :**
```js
tl.from(".track",{scaleX:0,transformOrigin:"0 50%",duration:.4})
  .from(".neon-green",{scaleX:0,transformOrigin:"0 50%",duration:1.2,ease:"power2.out"})
  .from(".neon-amber",{scaleX:0,transformOrigin:"0 50%",duration:.8,ease:"power2.out"})
  .from(".hand path",{strokeDashoffset:(i,el)=>el.getTotalLength(),duration:.8,ease:"power1.inOut"},"-=1");
// .neon{height:3px;background:#2bd94a;box-shadow:0 0 8px #2bd94a,0 0 22px #2bd94a88}
```

### B12. Photos flottantes autour de la tête (2:24, 6:40 « Panama Caps », 3:04 « FranceTex »)
- **Visuel :**
  - Photos personnelles façon polaroïd, **bord blanc 3–4 px avec halo blanc**, inclinées en 3D (rotationY ±15–25°), de ≈ 12–18 % de large.
  - Sur le plan large : placées autour de la tête **sans jamais couvrir le visage** (gauche y 45–70 %, haut droite y 10–30 %, droite y 45–70 %).
  - Sur le gros plan : une seule photo verticale à bord **déchiré** (x 3–15 %, y 10–80 %), avec un nom **manuscrit blanc lumineux** en bas (« FranceTex », « Panama Caps »).
- **Animation (25 i/s) :** chaque photo apparaît par une **révélation en éclats** : un masque triangulaire étroit s'ouvre jusqu'au rectangle complet en ≈ 0,35 s, pendant que rotationY passe de 40° à 15°. Décalage 0,3–0,5 s entre photos. Puis légère dérive. Sortie avec le light leak suivant (fondu dans le flash).
- **Bandes :** `strips/s10_photos_143s.jpg`, `strips/z1_photos_shard_143s_25fps.jpg`, `strips/s14_photo_manuscrit_184s.jpg`
- **GSAP :**
```js
tl.fromTo(photo,{clipPath:"polygon(48% 0,52% 0,50% 100%,50% 100%)",rotationY:40,scale:.92},
  {clipPath:"polygon(0 0,100% 0,100% 100%,0 100%)",rotationY:15,scale:1,duration:.35,ease:"power3.out"});
// .photo{border:3px solid #fff;box-shadow:0 0 18px rgba(255,255,255,.55)}
```

### B13. Objet 3D avec compteur (3:24 distributeur « Key's bank », 12:28 carte de France)
- **Visuel :**
  - Distributeur 3D métal brossé dans une pièce sombre. Écran avec chiffres LED rouges dans un cadre rouge (« −9481 EUR »).
  - France : départements au trait blanc sur fond noir, vue plongeante inclinée, **nuages blancs flous** au premier plan. Points rouges qui pulsent. Compteur blanc SemiBold ≈ 5 % de haut à droite (« 1,000,000 » avec « par an » en exposant), aligné sur la perspective.
- **Animation :** compteur qui défile (2001 → −9481, ou 743 525 → 1 000 000) en 2,5–3 s, ease power2.out. **Travelling arrière** continu sur l'objet (×1,4 → ×1) ou **descente à travers les nuages** (les calques de nuages grossissent et s'écartent, 1,5 s). Les points rouges apparaissent en cascade.
- **Bandes :** `strips/s41_carte_depixel_atm_203s.jpg`, `strips/s24_map_france_748s.jpg`
- **GSAP :**
```js
tl.to(counter,{v:1000000,duration:2.6,ease:"power2.out",onUpdate:()=>el.textContent=Math.round(counter.v).toLocaleString("en-US")});
tl.fromTo(".clouds",{scale:1,opacity:1},{scale:2.2,opacity:0,duration:1.5,ease:"power2.in"},0);
tl.from(".dot",{scale:0,opacity:0,stagger:{each:.04,from:"random"},duration:.3,ease:"back.out(2)"},.8);
```

### B14. Graphe Offre/Demande « Gap d'opportunité » (4:06)
- **Visuel :**
  - Panneau noir arrondi (≈ 60 % × 55 %) à **contour ambre lumineux** (#C98A2E à 50 %), légèrement incliné en 3D (rotationY ≈ −8°).
  - Axes en pointillés blancs. Labels italiques gris « Nombre » / « Temps ».
  - Courbe **jaune or #F2C94C** (Demande) qui monte, courbe **bleu ciel #3FA9F5** (Offre) plate. Toutes deux avec lueur.
  - Séparateur vertical en pointillés. Titre « Gap d'opportunité » blanc SemiBold ≈ 2,8 % de haut, souligné d'un trait ambre, avec un petit texte gris dessous.
- **Animation :** les axes se tracent (0,4 s). Les courbes se dessinent de gauche à droite (≈ 2 s, power1.inOut), **les labels suivent la pointe des courbes**. Le séparateur pousse vers le bas (0,3 s), le titre s'écrit, le sous-texte apparaît mot par mot. La caméra recule et pivote un peu pendant tout le plan (≈ 8 s).
- **Bande :** `strips/s16_graph_gap_246s.jpg`

### B15. Ouverture de chapitre numérotée (5:02 « 1 DROPSHIPPING », 7:56 « 2 SMMA », 10:00 « 3 SAAS »)
- **Visuel :**
  - Sur le plan large, bas gauche assombri.
  - **Grand chiffre serif italique** (type Instrument Serif / Cormorant Italic), ≈ 25 % de haut, à x ≈ 3–10 %, y ≈ 62–95 %. Remplissage dégradé **métal argent** (#FFFFFF → #8D8D8D).
  - Ligne grise fine de x 10 % à 72 % à y ≈ 94 %.
  - **Remplissage néon orange-rouge #FF5A1F** avec lueur.
  - Label en majuscules blanches, interlettrage large, ≈ 1,8 % de haut (« DROPSHIPPING »).
- **Animation (6 i/s) :** chiffre en fondu + flou 12 px → 0 avec glissement x −2 % (0,6 s). La ligne grise se trace vers la droite (0,5 s). Le néon orange se remplit jusqu'à ≈ 30 % puis continue lentement (barre de progression du chapitre). Le label arrive en fondu lettre par lettre. Durée totale 3–4 s, sortie par light leak.
- **Bandes :** `strips/s19_chapitre2_474s.jpg`, `strips/s21_chapitre1_avantages_302s.jpg`
- **GSAP :**
```js
tl.from(".chap-num",{opacity:0,filter:"blur(12px)",x:"-2vw",duration:.6,ease:"power3.out"})
  .from(".chap-track",{scaleX:0,transformOrigin:"0 50%",duration:.5,ease:"power2.out"},"-=.2")
  .fromTo(".chap-fill",{scaleX:0},{scaleX:.3,transformOrigin:"0 50%",duration:.6,ease:"power2.out"})
  .from(".chap-label .ch",{opacity:0,stagger:.025,duration:.2},"-=.3")
  .to(".chap-fill",{scaleX:.45,duration:2,ease:"none"});
```

### B16. Cartes Avantages / Désavantages sur une ligne de temps (5:05, 8:04, 10:08)
- **Visuel :**
  - Plein écran, fond noir avec halo coloré en haut (vert ou bordeaux).
  - Ligne horizontale fine traversant l'écran à y ≈ 25 %, avec un **nœud rond** creux.
  - **Carte verte** (#1E7A2E → #0D3D16) ou **rouge** (#8B1414 → #3D0808) de ≈ 22 % × 45 %, contour plus clair 1 px, rayon ≈ 12 px.
  - Pastille sombre en italique « Dropshipping » en haut à gauche de la carte. Titre **gras italique** blanc ≈ 5 % de haut (« Avantages »). Puces en italique fin blanches à 80 % ≈ 1,4 % de haut.
- **Animation :** la carte monte (y +10 %, 0,5 s, expo.out). Les puces s'ajoutent **mot par mot** sur la voix. Pour passer à « Désavantages », **la caméra glisse latéralement** le long de la ligne : la carte verte sort à gauche, la rouge entre (0,8 s, power3.inOut). Le nœud glisse avec elle.
- **Bandes :** `strips/s21_chapitre1_avantages_302s.jpg`, `strips/s22_desavantages_314s.jpg`
- ⚠ Le nœud rond est un petit cercle : à remplacer par un losange ou un point plein si on applique la règle « pas de cercles ».

### B17. Panneau de score en bas (7:00–7:50, 9:20–9:44, 10:28–12:00, 16:04)
- **Visuel :**
  - Panneau de verre **bleu nuit** (#0E141C à 85 %, contour 1 px blanc à 12 %, rayon 10 px) de x 2,5 % à 92 %, y 78 % à 95 %, posé sur le bureau, sous les mains.
  - Titre blanc SemiBold à gauche (« Dropshipping », « SAAS », « ??? », « Dropservicing IA »).
  - 2 sous-cartes avec 4 critères (Marges, Investissement, Difficulté, Demande) en petit blanc, chacun avec une piste grise et une **jauge néon** : vert #2BD94A (bon), rouge #E5332A (mauvais), ambre #F5A524 (moyen).
- **Animation :** le panneau **monte du bas** (y +120 % → 0, 0,6 s, expo.out). Il reste ensuite des dizaines de secondes. **Chaque jauge se remplit au moment où le critère est prononcé** (0,8 s, power2.out), ce qui donne du mouvement à un plan long. Quand il est révélé, « ??? » s'affiche tout vert d'un coup.
- **Bandes :** `strips/s23_stats_panel_431s.jpg`, `sheets/all_03.jpg`, `sheets/all_05.jpg`
- **GSAP :**
```js
tl.from(".score",{yPercent:120,duration:.6,ease:"expo.out"});
cues.forEach(c=>tl.from(`.g-${c.key}`,{scaleX:0,transformOrigin:"0 50%",duration:.8,ease:"power2.out"},c.t));
```

### B18. Tableau récapitulatif 3 colonnes (12:00)
- **Visuel :**
  - Fond noir avec lueur ambre en bas des colonnes.
  - Titre « Business les plus populaires » blanc SemiBold ≈ 3 % de haut, centré en haut.
  - 3 colonnes séparées par des filets fins. Chiffres serif italiques métal « 1 2 3 » (≈ 13 % de haut). Noms en gras italique. Descriptions grises ≈ 1,1 %.
  - Pastilles en bas : **rouge #C81E1E « Atouts : 0/4 »** et **ambre #F5B31A « Atouts : 2/4 »**.
- **Animation :** **panoramique de droite à gauche** (le tableau glisse de 8 % en 1,5 s, power2.out). Le titre arrive mot par mot avec flou, les descriptions apparaissent colonne par colonne, puis les pastilles montent.
- **Bande :** `strips/s20_recap_table_718s.jpg`

### B19. Boîte néon qui se transforme (13:20–13:36)
- **Visuel :**
  - Rectangle arrondi (rayon 14 px) à **contour néon orange-rouge #FF4D2E** avec lueur forte, intérieur noir, posé en bas au centre du plan large (y 82–96 %).
  - 4 pictos personnes blancs pleins avec légendes italiques (« Employé 1 … 4 »).
  - Ensuite un seul picto robot « Agent IA ».
  - Annotation **manuscrite** blanche à droite (« 24h/24 · Sans prendre de pause ») reliée par une flèche tracée à la main.
- **Animation :** la boîte s'ouvre en largeur (0,4 s). Les pictos tombent un par un (y +80 %, opacité 0, décalage 0,06 s, power2.in). **La boîte se rétrécit** à la taille d'un carré (0,5 s, power3.inOut). Le robot surgit (scale 0,6 → 1, back.out(1,7)). La flèche puis le texte manuscrit se dessinent au trait.
- **Bande :** `strips/s27_neon_box_morph_807s.jpg`
- **GSAP :**
```js
tl.to(".emp",{y:"8vh",opacity:0,stagger:.06,duration:.35,ease:"power2.in"})
  .to(".neon-box",{width:"8vw",duration:.5,ease:"power3.inOut"},"-=.1")
  .from(".robot",{scale:.6,opacity:0,duration:.4,ease:"back.out(1.7)"})
  .from(".note path",{strokeDashoffset:(i,e)=>e.getTotalLength(),duration:.9,stagger:.15});
```

### B20. Interfaces réelles recréées : Google Trends, devis, tableau de paiements (13:40, 15:40, 15:52)
- **Visuel :**
  - **Google Trends** : capture recréée en plein écran (gris très clair #E9EBEF, vignette), profondeur de champ (bords flous), courbe bleue qui grimpe en fin de graphe.
  - **Devis** : feuille de papier gris clair inclinée, rai de lumière diagonal, titre serif « Devis », champs remplis en **écriture manuscrite** (« Mission : Développer une app », « Prix : 29 €/H »).
  - **Tableau de paiements** : fond blanc, onglets en pastilles (1J, **1S** en violet #5B4FE0, 1M, 3M, 1A), colonnes Montant / Statut, badges verts « Payé ».
- **Animation :** **travelling continu** (×1,3 → ×1 ou rotation de 3–5°) sur 3–5 s. La courbe se trace, les lignes manuscrites se dessinent, les badges apparaissent en cascade.
- **Bandes :** `strips/s28_trends_logos3d_820s.jpg`, `strips/s33_devis_941s.jpg`, `sheets/all_07.jpg` (dernière ligne)

### B21. Logos en tuiles 3D avec étiquette (13:48 « Bouygues et Vinci »)
- **Visuel :** tuiles blanches type icône d'app (≈ 6 % de côté, épaisseur 3D visible, rayon 22 %) empilées en bas à gauche (x 3–8 %, y 80–95 %). Une étiquette de verre sombre s'étend à droite avec un titre gras italique et 2 lignes de texte gris.
- **Animation :** les tuiles montent en basculant (rotationX 70° → 0, y +40 → 0, décalage 0,15 s, back.out). L'étiquette s'ouvre en largeur (clip-path, 0,5 s), puis le texte mot par mot.
- **Bande :** `strips/s28_trends_logos3d_820s.jpg` (2 dernières lignes)

### B22. Texte en highlight sur B-roll IA + transition ruban (13:12)
- **Visuel :** image IA (5 hommes en costume, chapeaux orange, studio blanc). Étiquette **brun chocolat #4A1F17** avec texte blanc gras ≈ 3,5 % de haut, « L'IA est la priorité absolue », en haut au centre.
- **Animation :** travelling arrière lent sur l'image (×1,6 → ×1 en 3 s). Le texte s'écrit lettre par lettre et **l'étiquette grandit avec lui**. Un **ruban** doré et bleu fait une diagonale en travers de l'image pour passer au plan suivant.
- **Bande :** `strips/s26_ia_highlight_ruban_791s.jpg`

### Autres blocs vus (à garder en réserve)
- **Puces lumineuses** dans l'espace vide du gros plan (12:40) : points blancs, texte italique blanc ≈ 1,6 % de haut avec halo, chaque puce mot par mot. Voir `strips/s25_bullets_756s.jpg`.
- **Frise 1900 / 1990** « Révolution industrielle / NTIC » : ligne horizontale, texte scramble ; `sheets/all_06.jpg`.
- **Particules Offre / Demande** : points orange dans un petit disque, points verts lumineux qui se multiplient autour ; `strips/s34_particules_offre_demande_978s.jpg`.
- **Grille 3D néon Europe** avec contours de pays orange lumineux, salaires et flèche de différence, bandeau orange « Arbitrage » en haut ; `strips/s35_arbitrage_grid_1005s.jpg`.
- **Scène de dialogue IA** (restaurant orange) avec répliques en italique blanc/jaune lumineux à côté de chaque personnage, mot par mot ; `strips/s31_scene_dialogue_888s.jpg`.
- **Tarif en incrustation** sur le gros plan (« Dev Macédoine €16 / par heure » à x 3 %, y 22 %, gros chiffre blanc ≈ 7 % de haut) ; `sheets/all_07.jpg`.
- **B-roll IA 3D** (clé lumineuse, cerveau sur piédestal, vue plongeante orange) : toujours un mouvement lent, 3–4 s ; `strips/s40_broll_ia_cle_7s.jpg`.

---

## 5. Catalogue des transitions

| # | Transition | Fréquence | Timestamps types | Description mesurée |
|---|---|---|---|---|
| T1 | **Light leak blanc / bleu / vert (signature)** | 69 fois (1 / 16 s) | 7,6 · 19,9 · 27,4 · 33,4 · 55,3 · 120,6 · 302,1 · 474,5 · 807,2 · 1072,9 s | Sur 25 i/s : 1–2 images de **traînée bleu électrique** (#2B2BFF → #6A3CFF) venant du bord droit, puis 2–3 images de **voile blanc rosé/violet** (pic presque blanc pur, c'est là que se fait la coupe), puis 1–2 images de **bleu/violet** sur le nouveau plan, puis 2–3 images de **grain vert** (#1F8A2E, grain fort) en haut à gauche qui s'efface. **Total ≈ 0,36–0,45 s.** Sert pour les changements de caméra (36 % d'entre eux) et pour entrer ou sortir d'un graphisme. Voir `strips/tr_lightleak_27s_25fps.jpg`, `strips/tr_lightleak_7s_25fps.jpg` |
| T2 | **Coupe sèche** | ~75 | 12,2 · 66,6 · 85,9–88,8 · 701,5 · 1026–1029 s | Majorité des changements W↔C (64 %), enchaînements de B-roll, et sortie d'un graphisme vers la face cam |
| T3 | **Zoom arrière d'atterrissage** (en sortie de T1 ou T2) | à presque chaque retour sur le plan large | 12,2 · 95,0 · 122,5 · 613 · 888–905 s | Nouveau plan ×1,17 à ×1,3 qui revient à ×1 en 0,5–1 s, expo.out, avec flou de bougé au départ |
| T4 | **Light leak vertical** (faisceau anamorphique bleu/blanc) | rare | 45,0 s | Colonne de lumière bleue/cyan/blanche verticale qui traverse l'image (≈ 0,3 s) |
| T5 | **Volet diagonal noir** | rare | 0:05 | Panneau à bord biseauté qui balaie de gauche à droite (0,3 s) |
| T6 | **Ruban** | rare | 13:12–13:16 | Ruban papier doré/bleu qui traverse en diagonale (0,5 s) pour passer d'une image à l'autre |
| T7 | **Travelling interne** (pas une coupe) | dans chaque graphisme | — | Chaque plein écran a son propre mouvement de caméra continu (recul, panoramique, suivi d'un point). Les graphismes ne sont jamais figés |

**Recette T1 (HTML) :**
```html
<div class="leak"><i class="blue"></i><i class="white"></i><i class="green grain"></i></div>
```
```css
.leak{position:absolute;inset:0;pointer-events:none;mix-blend-mode:screen}
.leak .blue{position:absolute;inset:0;background:radial-gradient(60% 80% at 100% 70%,#3a2bff 0%,#6a3cff55 45%,transparent 70%)}
.leak .white{position:absolute;inset:0;background:radial-gradient(90% 90% at 30% 20%,#fff 0%,#ffe9f6 40%,#c79bff 70%,#3a2bff 100%)}
.leak .green{position:absolute;inset:0;background:radial-gradient(55% 60% at 0% 0%,#22c24a 0%,#1b7a2f88 40%,transparent 70%)}
.grain{filter:url(#grain)} /* feTurbulence baseFrequency .9, numOctaves 2 */
```
```js
function leak(tl,t){ // t = instant de la coupe
  tl.fromTo(".leak .blue",{opacity:0,xPercent:40},{opacity:1,xPercent:0,duration:.1,ease:"power2.in"},t-.14)
    .fromTo(".leak .white",{opacity:0},{opacity:1,duration:.06},t-.06)
    .to(".leak .white",{opacity:0,duration:.12,ease:"power1.out"},t+.04)
    .to(".leak .blue",{opacity:0,duration:.12},t+.08)
    .fromTo(".leak .green",{opacity:.9},{opacity:0,duration:.2,ease:"power1.out"},t+.12);
}
```
**Recette T3 :**
```js
tl.fromTo(".facecam-wide",{scale:1.22,filter:"blur(3px)"},{scale:1,filter:"blur(0px)",duration:.8,ease:"expo.out",transformOrigin:"48% 30%"},t);
```

---

## 6. Texte : placement, hiérarchie, animation, sous-titres

- **Sous-titres : aucun** sur la face cam pendant les 18 minutes. Le seul texte « parlé » à l'écran, ce sont les répliques de la scène de dialogue IA et les citations plein écran (B3).
- **Le texte reprend des mots-clés du discours**, jamais une phrase entière, sauf sur les cartes citation.
- **Placement :**
  - Plan large : texte **en bas** (bandeau assombri, y 78–96 %) ou **autour de la tête** (photos). Jamais devant le visage. La zone du bureau sous les mains sert de « sol » pour poser les panneaux.
  - Gros plan : texte **dans l'espace vide à gauche** (x 3–40 %), aligné à gauche.
  - Plein écran : centré (citations, titres) ou en colonne gauche avec l'objet 3D à droite (cartes atouts).
- **Hiérarchie (à 1080 p) :**
  - Titre plein écran 5–6 % de haut (≈ 60 px), gras, avec lueur.
  - Titre de bloc 2,6–3,5 % (≈ 30–38 px), SemiBold.
  - Label 2–2,5 % (≈ 24 px).
  - Corps / puces 1,2–1,6 % (≈ 14–18 px), gris #B5B5B5 ou blanc à 80 %, souvent **en italique**.
  - Chiffres de chapitre : serif italique énorme, 25 % (≈ 270 px).
- **Polices :**
  - Interface : sans-serif néo-grotesque (SF Pro / Inter), SemiBold et Regular.
  - Citations : géométrique arrondie (Manrope / Urbanist Medium).
  - Titres de cartes : **gras italique** (Inter Bold Italic).
  - Chiffres : **serif italique** fin (Instrument Serif / Cormorant Italic) avec dégradé métal.
  - Annotations : **manuscrit** blanc (Caveat / Nothing You Could Do), dessiné au trait.
- **Couleurs du texte :** blanc #F5F5F5 avec lueur (text-shadow 0 0 10–14 px blanc à 30–40 %), gris #9A9A9A / #B5B5B5. Les accents ne sont jamais dans le texte lui-même mais dans les traits, jauges et pastilles (vert #2BD94A, ambre #F5A524 / #F5B31A, rouge #E5332A / #C81E1E, orange #FF5A1F).
- **Animations de texte (par ordre de fréquence) :**
  1. **Mot par mot avec flou**, calé sur la voix (0 → 1, blur 8 → 0, 0,3–0,35 s). Le mot le plus récent reste un instant gris.
  2. **Lettre par lettre** (machine à écrire) pour les labels courts et les chiffres (« 20.000 € », « DROPSHIPPING »), ≈ 25–40 caractères/s.
  3. **Scramble** (lettres aléatoires ou astérisques qui se résolvent) pour les révélations (« Industrie en déclin », noms des atouts).
  4. **Tracé manuscrit** (stroke-dashoffset) pour les annotations.
- **Pas de typo cinétique plein écran éclatée**, pas de mots géants qui sautent. Le texte reste élégant et petit.

---

## 7. Enregistrements d'écran, interfaces et B-roll

- **Aucun enregistrement d'écran brut.** Toutes les interfaces (iOS, recherche, Google Trends, Finder macOS, tableau de paiements) sont **recréées en motion design**, avec :
  - un **plein cadre sans fenêtre ni appareil autour**, l'interface remplissant tout l'écran ;
  - une **profondeur de champ simulée** : bords flous, zone nette là où se trouve l'action ;
  - un **travelling continu** (recul ×1,3–1,8 → ×1, ou rotation 3D de 3–8°) pendant toute la durée ;
  - un **curseur animé** (flèche macOS blanche ou main) qui clique (petit écrasement au clic) ;
  - des fonds sombres bleu nuit (#121826) ou gris très clair (#E9EBEF) selon l'interface, avec vignette ;
  - la fin CTA : fenêtre Finder sombre (#1C1C1E, feux tricolores) posée sur un fond noir avec **halo bleu** (#1E90FF à ~25 %) en dessous ; double-clic sur le dossier, ouverture d'une nouvelle fenêtre, items de liste en cascade (0,4 s chacun). Voir `strips/s36_fin_cta_finder_1076s.jpg`.
- **B-roll vidéo réel** (lifestyle) : letterbox 2,39:1, ≈ 1 s par plan, coupes sèches.
- **B-roll IA ou 3D** (clé, foule aux yeux lumineux, cerveau, distributeur, hommes en chapeau, restaurant, puzzle) : palette rouge / orange / noir cohérente avec le plateau, **toujours un mouvement lent** (travelling arrière ou avant), 3–5 s.
- **Photos personnelles** : en incrustation sur la face cam (B12), jamais en plein écran sauf une photo de dîner encadrée avec vignette (2:30).

---

## 8. Son (mesuré, sans écoute)

- **Loudness intégrée −20,6 LUFS**, LRA 5,3 LU, true peak +0,2 dBFS. C'est faible pour YouTube : normaliser vers −14 LUFS.
- **Voix continue, silences supprimés** : aucun passage sous −45 dB de plus de 0,25 s ; les respirations les plus longues durent 0,3–0,45 s.
- **Musique de fond continue, très basse.** Dans les micro-pauses, le plancher reste à **−40 à −46 dBFS**, soit **≈ 18–20 dB sous la voix** (médiane de la voix −23 dB RMS). Le spectre de ces pauses montre une **note tenue récurrente vers 310 Hz** (309–313 Hz) dans des pauses éloignées les unes des autres (878 s, 943 s, 954 s, 963 s). C'est un **pad ou une nappe ambient tonale**, pas un bruit de pièce. Il n'y a pas de rythmique marquée audible.
- **Effets sonores très discrets.** Aux light leaks, l'énergie aiguë (4–11 kHz) n'augmente pas (−0,1 dB, contre +1,6 dB à des instants aléatoires) : **pas de whoosh aigu audible**. En revanche, il y a **+2,9 dB dans le grave (20–100 Hz)** en médiane, contre −0,2 dB au hasard, et un pic de plus de 3 dB dans 49 % des cas. Ça indique un **léger souffle grave / sub-boom** sous la moitié des light leaks.
- **Recette :**
  - Nappe ambient sombre en continu à −20 dB sous la voix (avec ducking).
  - Sous chaque light leak, un « sub whoosh » feutré (≈ 0,5 s, passe-bas 150 Hz) à −24 dB, centré sur le pic blanc.
  - Pas de clics ni de pops sur les textes.
  - Éventuellement un léger « tick » sur les compteurs.

---

## 9. Les 10 règles les plus importantes à reproduire (classées)

1. **Le light leak de 0,4 s** (bleu → blanc → vert granuleux) est LA transition signature. Elle sert pour les changements de caméra et pour entrer ou sortir des graphismes, environ 1 fois toutes les 15 s. Les autres coupes sont sèches.
2. **Le zoom arrière d'atterrissage** : chaque retour sur la face cam large démarre à ×1,2–1,3 et revient à ×1 en 0,5–1 s (expo.out). Pas de zoom lent continu ni de shake sur la face cam.
3. **Deux angles alternés toutes les ~9 s** (large frontal / gros plan 3/4) et des silences supprimés au cordeau. Le gros plan laisse 40 % de vide à gauche, réservé au texte.
4. **Un habillage à l'écran la moitié du temps** : 29 % de plein écran, 21 % d'incrustations. Jamais plus de ~20–25 s de face cam nue. Les 2 premières minutes sont deux fois plus denses que le milieu.
5. **Chaque concept devient un objet 3D ou une UI recréée, toujours en mouvement** (travelling arrière, panoramique, caméra qui suit, dérive). Aucun graphisme n'est figé.
6. **Texte mot par mot avec flou, calé sur la voix.** Petits corps, hiérarchie sobre, lueur blanche douce, pas de sous-titres.
7. **Les incrustations ne couvrent jamais le visage** : bandeau bas assombri sur le plan large, colonne gauche sur le gros plan, photos autour de la tête. Les panneaux persistent à travers les coupes de caméra.
8. **Palette stricte** : noir-brun, rouge plateau #E3121B, accents néon vert #2BD94A / ambre #F5A524 / rouge #E5332A / orange #FF5A1F (codes « bon / moyen / mauvais »), verre sombre bleu nuit. Pas d'autres couleurs.
9. **Des gabarits récurrents qui structurent le récit** : ouverture de chapitre (chiffre serif + trait néon), cartes Avantages / Désavantages, panneau de score avec jauges, carte citation sur satin, récap en tableau. Le spectateur reconnaît la structure.
10. **Des révélations jouées** : astérisques → texte (scramble), icône pixellisée → nette, clic de curseur, compteur qui défile, boîte qui se transforme. Chaque information « se gagne ». Le tout sur une nappe ambient très basse, sans whoosh criard.

---

## 10. Points de vigilance par rapport aux préférences connues de l'utilisateur

- **Anneaux / cercles décoratifs** : la roue « Modèles d'entreprise » (B4), le nœud rond de la ligne (B16), le disque « Offre » des particules et les halos de la carte de France sont des cercles. Garder les mécaniques, changer les formes (éventail de cartes, tuiles, losanges, points pleins).
- **Traits décoratifs** : la barre verticale orange du lower third (B2) et le trait néon de chapitre (B15) sont des traits. Le trait néon de B11 est une donnée (proportion), il est justifié. Pour une pub, préférer un objet ou un remplissage de jauge à un simple trait.
- **Prix** : la vidéo d'inspiration affiche des tarifs (€16, €40, 29 €/h, 20.000 €). Pour les motions pub MaMarque, ne pas afficher de prix.
- **Pas de bento ni de typo éclatée** : la vidéo d'inspiration respecte déjà ça (texte petit, objets isolés).
- **Fin** : la vidéo finit sur une interface (Finder → programme), sans gros logo. C'est cohérent avec « fin sans gros logo ».

---

## 11. Planches et bandes à regarder en priorité

Dossier : `/private/tmp/claude-502/-Volumes-MONTAGE----AI-MOTION/b594f2a7-fa53-4cba-8b32-146fba12ffa3/scratchpad/yt3/insp/`

**Vue d'ensemble**
- `sheets/all_00.jpg` … `sheets/all_09.jpg` : vidéo entière, 1 image / 4 s (30 images par planche = 2 min).
- `sheets/first3min_1fps_00.jpg`, `_01.jpg`, `_02.jpg` : 3 premières minutes à 1 image / s.

**Les plus parlantes (mouvement)**
1. `strips/tr_lightleak_27s_25fps.jpg` : le light leak image par image (16 images à 25 i/s).
2. `strips/s08_zoomout_landing_95s.jpg` : le zoom arrière d'atterrissage (10 i/s).
3. `strips/s04_quote_33s.jpg` : carte citation, mots qui apparaissent sur la voix.
4. `strips/z2_glasscard_unfold_55s_25fps.jpg` : carte de verre qui naît d'un trait.
5. `strips/z1_photos_shard_143s_25fps.jpg` : photos en éclats autour de la tête.
6. `strips/s12_cards3d_126s.jpg` + `strips/s41_carte_depixel_atm_203s.jpg` : cartes 3D, dé-pixellisation, distributeur.
7. `strips/s11_bar_benefice_171s.jpg` : barre néon + manuscrit.
8. `strips/s19_chapitre2_474s.jpg` : ouverture de chapitre.
9. `strips/s22_desavantages_314s.jpg` : cartes Avantages / Désavantages.
10. `strips/s23_stats_panel_431s.jpg` : panneau de score qui monte.
11. `strips/s16_graph_gap_246s.jpg` : graphe Offre / Demande.
12. `strips/s38_courbe_declin_66s.jpg` : courbe suivie par la caméra + scramble.
13. `strips/s27_neon_box_morph_807s.jpg` : boîte néon qui se transforme.
14. `strips/s29_searchbar_filtre_857s.jpg` : interface recréée + curseur.
15. `strips/s24_map_france_748s.jpg` : descente dans les nuages + compteur.
16. `strips/z4_lowerthird_entry_20s_20fps.jpg` : construction du lower third.
17. `strips/s36_fin_cta_finder_1076s.jpg` : fin CTA Finder.
18. `strips/s37_broll_letterbox_86s.jpg` : B-roll cinémascope à 1 s par plan.

Données brutes : `cuts025.txt` (coupes avec un score de scène > 0,25), `segs.txt` (classement W / C / G de chaque segment), `audio.wav`, `proxy.mp4`.
