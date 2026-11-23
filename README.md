# Skills Claude : motion design, montage vidéo et sous-titrage

33 skills pour Claude Code, rangés par usage. Chaque dossier de `skills/` est un skill complet (un `SKILL.md` et ses fichiers).

## Installation

Copier les dossiers voulus dans `~/.claude/skills/` :

```bash
git clone <lien-du-depot> skills-motion-design
cp -R skills-motion-design/skills/* ~/.claude/skills/
```

Les skills apparaissent ensuite au prochain lancement de Claude Code.

Dans certains skills, des chemins sont à adapter à votre machine :
- `<DOSSIER_PROJET>` : votre dossier de projets vidéo ;
- `<DISQUE_MEDIA>` : votre dossier de médias (musiques, effets sonores…) ;
- `/Users/VOTRE_NOM` : votre dossier utilisateur.

« MaMarque » et `mamarque.site` sont des exemples, à remplacer par votre marque.

## Sous-titrage

| Skill | Rôle |
|---|---|
| `sous-titres-dynamiques` | Sous-titres animés mot par mot, style premium |
| `remotion-captions` | Sous-titres dans une vidéo Remotion |

## Montage vidéo

| Skill | Rôle |
|---|---|
| `montage-shorts` | Montage de Reels, Shorts, TikTok |
| `montage-youtube` | Montage de vidéos YouTube |
| `youtube-facecam` | Vidéos face caméra + enregistrement d'écran |
| `transitions-dev` | Transitions entre plans |
| `transitions-polish` | Finition des transitions |
| `video-sound` | Sons, musique, effets sonores |
| `render-video` | Export final |
| `video-toolkit` | Boîte à outils vidéo |

## Motion design

| Skill | Rôle |
|---|---|
| `opus-motion-killer` | Prompts de motion design « 0 keyframe » (morphing, caméra continue) et kit de fabrication |
| `motion-prompt-studio` | Écriture de prompts de motion design |
| `make-2d-video` | Vidéos d'animation 2D |
| `new-video` | Démarrer une nouvelle vidéo |
| `video-styles` | Styles vidéo |
| `style-sampling` | Refaire un épisode dans un style vidéo existant |
| `reverse-any-video` | Recréer une vidéo en projet modifiable |
| `hyperframes` | Vidéos fabriquées en HTML |
| `hyperframes-cli` | Outil en ligne de commande HyperFrames |
| `hyperframes-registry` | Environ 450 blocs prêts à l'emploi (titres, transitions, sous-titres…) |
| `media-use` | Musique, voix off, images, effets pour les vidéos |
| `21st-video` | Vidéos de lancement ou de démo de produit |
| `remotion-best-practices` | Bonnes pratiques Remotion |
| `remotion-create` | Créer un projet Remotion |
| `remotion-docs` | Documentation Remotion |
| `remotion-interactivity` | Interactivité dans Remotion |
| `remotion-maps` | Cartes animées |
| `remotion-markup` | Mise en forme et balisage |
| `remotion-multimedia` | Audio, vidéo, images dans Remotion |
| `remotion-render` | Rendu Remotion |
| `remotion-saas` | Vidéos de présentation SaaS |
| `remotion-studio` | Remotion Studio |
| `remotion-upgrade` | Mise à jour de Remotion |

## Sources

Certains skills viennent d'autres éditeurs et restent soumis à leurs conditions :
- `remotion-*` : basés sur [Remotion](https://www.remotion.dev) ;
- `hyperframes`, `hyperframes-cli`, `hyperframes-registry`, `media-use`, `reverse-any-video`, `style-sampling` : [HyperFrames / HeyGen](https://www.heygen.com) ;
- `21st-video` : [21st.dev](https://21st.dev).

Les autres skills sont des créations personnelles.
