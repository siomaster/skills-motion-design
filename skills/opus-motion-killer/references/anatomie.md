# Anatomie des 3 prompts modèles

Les trois prompts (lancement « chat → commande », « point orange connecteur », « balle blanche UI ») suivent exactement la même architecture. C'est elle qui produit le rendu « haut de gamme », pas le style visuel.

## 1. Six blocs, toujours dans cet ordre

| Bloc | Rôle | Ce qu'il contient toujours |
|---|---|---|
| `<inputs>` | Paramétrer sans réécrire | 4–6 variables à demander (produit, phrase tapée, mot héros, pourcentage, couleur, musique…) **+ des valeurs par défaut** si l'utilisateur saute la question. |
| `<direction>` | Le cahier des charges artistique | Durée, format, fps · « 2D, une seule prise » · **le connecteur** (l'objet qui traverse tout) · palette en hex (fond, UI, 1 accent) · polices · caractère du mouvement (ressorts, petit dépassement) · règle caméra · **liste d'interdits**. |
| `<structure>` | La chorégraphie | Tempo et nombre de temps · scènes nommées (« Toggle: », « Spring: », « Beats 6-12, think: ») · une ou deux phrases par scène décrivant **comment elle naît de la précédente** · tous les textes à l'écran **exacts entre guillemets** · le retour / la boucle. |
| `<build>` | Le contrat technique numéroté | Un seul HTML, `seek(t)` pur · caméra unique à zoom log · ressorts fermés (somme d'un ressort par changement) · élément partagé à chaque passage · valeurs dérivées · sons placés sur leur pic · méthode de rendu · contrôle (une image par temps, images qui sautent, boucle). |
| `<gotchas>` | Les pièges connus | 4–5 phrases « si tu fais X, ça casse Y » : fantômes du flou de mouvement, inondation trop courte, z-index, texte qui se chevauche, boucle qui saute. |
| `<start>` | La porte de validation | « Demande les inputs, montre la grille des temps et 4 images avant de construire. » |

## 2. Pourquoi ça rend si bien

1. **Le connecteur** donne la continuité : l'œil suit un seul objet (inondation citron + bouton, point orange, balle blanche). Chaque scène devient une conséquence de la précédente, jamais une transition plaquée.
2. **L'élément partagé** remplace toutes les transitions : le bouton grandit en page, l'inondation emporte les mots de la bulle, l'interrupteur devient l'indicateur d'onglets, la pilule devient le champ de texte. Aucun fondu, aucune coupe.
3. **La caméra dans un monde** : tous les composants existent dans un même espace ; on zoome *vers* eux (zoom interpolé en log = vitesse perçue constante) et un recul final révèle le monde entier. C'est ce qui donne la sensation de plan-séquence.
4. **La musique dicte tout** : BPM connu, nombre de temps fixe, drop mesuré et placé sur le moment clé (l'inondation, le logo). Un événement par temps fort = rythme dense sans être confus.
5. **Le code ne ment pas** : le graphique est dessiné par la fonction qui déplace le point, le remplissage du curseur vient de la position de la balle, le texte du champ est la sous-chaîne tapée à l'instant t. Comme tout est cohérent, le mouvement paraît « physique ».
6. **Interdits explicites** : pas de fondus, flous d'entrée, particules, lueurs, dégradés, rebonds exagérés, pauses > 1 s, « effet template ». L'IA évite ainsi ses tics par défaut.
7. **La porte `<start>`** oblige à valider la grille et 4 images avant le rendu long : on corrige le cadrage et le rythme quand c'est encore bon marché.
8. **Spécificité chiffrée** : tailles (330×440, rayon 28, écran 428×900, cadre 11 px), couleurs hex, durées (0,35 s pour l'inondation), temps précis. Plus c'est chiffré, moins l'IA improvise.

## 3. Le vocabulaire qui revient (à réutiliser tel quel)
- *one continuous take · each scene grows from the last · shared element · handoff*
- *text rises from a mask line · word by word · letters bend and move into place*
- *color floods from one object before shrinking into another · must reach the farthest corner in ~0.35 s*
- *the button expands into the page, staying pill-shaped as it reaches the edges*
- *one eased camera move per scene · zoom interpolated in log space · never zoom in and out consecutively · pull back to reveal the whole world*
- *closed-form step-response springs · a value that changes target many times is the sum of one spring per change · small overshoot · brief squash on contact*
- *two edges on different springs so the leading edge stretches ahead*
- *drags are direct manipulation; on release it springs back from wherever it was*
- *derive X from Y (fill from the ball's x, graph from the dot's spring, typed text = substring by time t)*
- *place every sound by its measured peak · loudnorm to −14 LUFS*
- *render N subframes per frame blended with ffmpeg tmix* (ou 60 fps nets si le texte ne doit pas flouter)
- *render one frame per beat · scan for single-frame pops · match the last frame to the first*

## 4. Les trois modèles en une ligne
- **Lancement 15 s, 130 BPM, 32 temps** : composer lumineux → bulle → wok qui lance des ingrédients → inondation citron sur le drop → cartes → bulle → bouton qui devient page → titres → trajet → épingle → logo.
- **Point connecteur ~15 s** : interrupteur → lettres qui se replient en « Motion » avec le point sur le i → graphique de ressort → cercle plein cadre → carré → pilule → orbite de mots → trame de points → carte finale → retour en boucle.
- **Balle blanche 10 s, 120 BPM, 20 temps** : interrupteur → curseur (remplissage dérivé) → 3 notifications sur 3 temps → « Répondre » → champ → clavier tapé par la balle → envoi → recul → retour en boucle.

Les films réellement construits à partir de ces prompts sont dans `examples/films/`.
