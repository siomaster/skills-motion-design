# Bibliothèque pour écrire un prompt

## Connecteurs (l'objet qui traverse tout le film)
| Connecteur | Bon pour | Passages typiques |
|---|---|---|
| **Point de couleur** | marques, idées abstraites, typographie | bouton d'interrupteur → point sur un « i » → trace un graphique → grossit en cercle plein cadre → point final d'un titre |
| **Balle blanche** | démos d'interface, plusieurs composants | interrupteur → bouton de curseur → rebonds sur des cartes → tape les touches → revient à l'interrupteur |
| **Bouton** | lancement de produit, appel à l'action | bouton → chargement → coche → îlot → lecteur… (morph UI) ; ou bouton qui grandit en page |
| **Inondation de couleur** | drop musical, révélation | part d'un objet, atteint le coin le plus loin en ~0,35 s, se resserre dans un autre objet en emportant ses mots |
| **Curseur** | tuto, démo SaaS | clique, glisse, survole ; chaque clic déclenche la scène suivante |
| **Bulle de message** | apps de chat, IA, support | champ → bulle → la réponse devient carte → bouton |
| **Ligne / trajet** | livraison, progression, parcours | une ligne se dessine, un point la suit jusqu'à une épingle qui devient le logo |

## Morphings (une forme, plusieurs états)
- bouton → chargement (3 points, pas d'anneau) → coche → îlot dynamique → lecteur → curseur de volume → interrupteur → onglets → graphique → palette ⌘K → notification → bouton
- pastille « Répondre » → champ de texte (le rectangle s'interpole : position, largeur, hauteur, rayon)
- bouton d'envoi → objet de scène (wok, livre…) : taille, rayon et couleur interpolés ; la couleur passe par la teinte (HSL), jamais par du gris
- point → cercle qui remplit le cadre → carré arrondi qui tourne → pilule → point
- interrupteur → indicateur d'onglets : bord avant sur ressort rapide, bord arrière sur ressort lent
- lettres d'un libellé → grand mot (chaque lettre interpolée de sa position mesurée à sa position finale)
- orbite de lettres → trame de points (les lettres partent vers l'extérieur et rétrécissent)
- trame de points → les points grossissent jusqu'à déborder → retournement vers la carte finale

## Caméra
- **Poussée lente** sur l'élément du début (×2,3 → ×3).
- **Recul unique** pour révéler le contexte (téléphone autour de la bulle, monde entier en fin de film).
- **Suivi** de l'objet connecteur d'un composant à l'autre (centre et zoom ressortent ensemble).
- **Poussée dans un bouton** pendant qu'il devient la page.
- **Traversée** : plonger à travers une lettre ou un « 0 » (échelle ×10 autour du centre du glyphe).
- Toujours : zoom en log, un mouvement amorti par scène, pas d'aller-retour, la dernière clé = la première pour une boucle.

## Motifs de scène prêts à l'emploi
- **Demande** : champ avec lueur irisée (conic-gradient flou en rotation), frappe sur lignes fixes avec un rythme naturel déterministe.
- **Envoi** : onde de couleur depuis le bouton, le champ se transforme en bulle.
- **Réflexion** : objet qui lance 6 éléments colorés sur 4 temps + texte scintillant « Je cherche… ».
- **Résultats** : cartes sombres (photo en haut, nom, ligne de description, prix) qui jaillissent du centre, la bande glisse et se pose sur le meilleur choix qui se soulève avec une pastille.
- **Discussion** : réponse qui monte d'une ligne de masque, deux pastilles (pleine / contour), clic → 3 points → « ✓ C'est parti ».
- **Graphique ressort** : le point trace la courbe d'un ressort qui dépasse l'objectif de X % puis se stabilise à côté d'une étiquette « +X % ».
- **Curseur à remplissage** : bulle de valeur toujours centrée sur le bouton, valeur dérivée de la position.
- **Notifications** : 3 cartes sombres en escalier, une par temps, qui s'enfoncent au contact.
- **Clavier** : monte sous le champ ; la balle/le doigt tape exactement les lettres affichées.
- **Orbite** : mots en MAJUSCULES sur un cercle, un mot passe à l'accent à chaque temps.
- **Carte finale** : grand titre, sous-titre, une ligne d'accent ; le connecteur devient le point final ou le logo ; texte qui monte d'une ligne de masque.

## Interdits à copier dans `<direction>` (selon le film)
crossfades, blur-ins, hard cuts, 3D (sauf demande), particle bursts, glows, gradients on UI chrome, stock footage, bouncy/elastic easing, oversized bounces, holds longer than 1 s, camera moves that reverse direction, random transitions, motion not connected to an element already on screen, text that blurs during a camera move, decorative rings or circles, bento grids, anything that feels like a template.

## Calculs de tempo
- temps (s) = 60 / BPM · 120 BPM → 0,5 s · 130 BPM → 0,4615 s · 152 BPM → 0,395 s
- 10 s à 120 BPM = 20 temps (5 mesures) · 15 s à 120 BPM = 30 temps · 32 temps à 130 BPM = 14,77 s
- départ du morceau = instant du drop dans le morceau − instant du moment clé dans le film
- un événement par temps fort ; les frappes de clavier sur les demi-temps ; le drop sur l'inondation / le logo

## Gabarits de durée
- **10 s** : 5–6 scènes courtes, boucle, 60 fps nets (UI lisible).
- **15 s** : 6–7 scènes, carte finale ou boucle, 60 fps + 8 sous-images.
- **30 s** : 8–10 scènes, histoire de marque, fin sur logo + URL.
