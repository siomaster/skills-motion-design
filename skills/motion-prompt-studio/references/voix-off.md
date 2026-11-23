# Voix off → temps du film

## Fichier audio fourni
1. `python3 ~/.claude/skills/motion-prompt-studio/scripts/voix_timing.py "<fichier>"` (clé `DEEPGRAM_API_KEY` lue dans `~/.zshrc`).
2. Le script sort :
   - la durée totale et la durée conseillée du film (voix + 1,5 s de fin) ;
   - une table des phrases `[début → fin] texte` (coupure aux ponctuations et aux pauses ≥ 0,35 s) ;
   - la liste des mots longs ou importants avec leur instant, pour caler les mots-clés à l'écran.
3. Recopier la table dans `<structure>` sous la forme « Scene N (12.08–15.10s) "Bienvenue chez…" : … ».
4. Vérifier les mots mal transcrits (noms propres, marques) et les écrire correctement à l'écran ; signaler à l'utilisateur toute différence entre la voix et l'orthographe officielle.

## Script texte seulement
- Estimer à 2,6 mots/s (voix pub vive) et 0,25 s entre phrases ; donner la durée estimée.
- Dans `<structure>`, écrire les temps comme estimations et ajouter dans `<build>` : « Generate or receive the voice first, transcribe it with word timestamps, then re-time every scene to the measured phrase starts before rendering. »
- Si la voix doit être générée : bloc `<voice>` (Deepgram Aura-2 `aura-2-hector-fr` / `aura-2-agathe-fr`, ou ElevenLabs avec la voix de l'utilisateur) : prises multiples, pauses > 0,28 s ramenées à 0,2 s, accélération ×1,15–1,27 sans changer la hauteur si la voix est lente, niveau égalisé.

## Règles d'affichage avec voix
- Une scène change sur un **début de phrase**, jamais au milieu d'un mot.
- À l'écran : 1 à 6 mots, le mot-clé apparaît **au moment où il est prononcé** (± 0,1 s), en couleur d'accent.
- Pas de sous-titres complets sur les plans animés ; la voix raconte, l'image illustre.
- Un mot affiché sort entièrement avant que le suivant occupe la même place.
- Le moment fort de la voix (nom de la marque, promesse, « dès maintenant ») tombe sur le drop ou un temps fort de la musique.
- Musique : constante et basse sous la voix (13 à 20 LU dessous selon le ton), jamais de pompage, sauf si le style demande un sidechain.
