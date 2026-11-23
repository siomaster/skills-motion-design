# Gabarit (anglais pour la structure, français pour tout texte à l'écran)

Remplacer chaque [crochet]. Supprimer `<script>`/`<voice>` s'il n'y a pas de voix, `<sound>` peut alors rejoindre `<build>`.

```
<inputs>
Ask me for: [la liste concrète : nom, logo, couleurs et police, la voix off (fichier ou script), 3 à 6 captures / photos réelles, le site, un morceau libre de droits avec son BPM et l'instant du drop, l'appel à l'action]. If I skip anything, use these defaults: [une valeur par élément : nom, couleurs hex, police Urbanist 400–500, morceau Mixkit n°… (BPM, drop à … s), images de …].
</inputs>

<script>            ← seulement si la voix doit être écrite
Write a [N]-line French voiceover, lively and fast (never slow), in this shape, adapted to my product:
"[ligne 1 : accroche/douleur] … [ligne N : appel à l'action]."
</script>

<voice>             ← voix fournie ou à générer
[Fournie] Use my voiceover file as the master clock. Transcribe it with word timestamps (split at pauses ≥ 100 ms, align each segment's first word to its measured onset). Phrase table:
[0.00–2.56] "…"
[3.28–6.10] "…"
[Générée] Deepgram Aura-2 aura-2-[hector|agathe]-fr, 4 takes, pauses > 0.28 s shortened to 0.2 s, sped up ×[1.15–1.27] without pitch change, level evened.
</voice>

<direction>
A [durée]-second [type de film], [W]x[H] at 60fps. [Référence nommée] feel: [3–5 mots de matière]. [Loi de mouvement : 2D only / one continuous take / every scene is made out of the previous one / camera never cuts on a still frame…]. [Fil rouge : l'objet qui traverse tout le film].
Palette: [rôle #hex, rôle #hex, accent #hex]. Type: Urbanist (400 and 500 only, no bold). On-screen text in French, few words, never a full sentence.
Story: [scène 1] → [scène 2] → [scène 3] → … → [fin].
Banned: crossfades, blur-ins, hard cuts without a musical reason, decorative rings or expanding circles, bento grids, exploded full-screen type, decorative dashes, prices, cut text left on screen, holds longer than 1s, particles, glows on UI text, Math.random, anything that looks like a template.
</direction>

<structure>
[Grille : « 120 BPM, one beat = 0.5 s, music starts at song time X so the drop lands at Y s » et/ou « scenes on voice phrase starts »]
S1 [0.00–2.56s] "[texte exact]": [ce qui bouge, positions px, tailles, couleurs, courbes, quand chaque élément entre].
S2 […]: […, la transition vers S3 par l'élément partagé].
…
End [x–y s]: [logo / CTA / adresse], hold [n] s, last frame [= first frame si boucle].
</structure>

<sound>
[Musique : titre, BPM, drop, constante, n LU sous la voix, jamais de pompage.] One downloaded SFX per event, placed by its measured peak, varied and discreet (gain 0.05–0.25, whooshes lower): [liste événement → son]. Master −14 LUFS, true peak −1 dBTP.
</sound>

<build>
1. One HTML page at [W]x[H]; every frame is a pure function of time inside an async seek(t): no CSS transitions, no timers, no state between frames, no Math.random.
2. Closed-form springs (damping 0.7–1, overshoot < 2 %); camera = one container keyed [t, zoom, x, y], zoom in log space.
3. [Recettes propres au film : verre liquide, inondation, iris, téléphone 3D avec écrans recréés, capture du site par tranches…]
4. Real assets only: [logo officiel, captures, photos] — recreate UI screens in HTML from the real captures rather than scaling flat screenshots.
5. Render with Playwright at 60fps, [4–8] subframes per frame blended with ffmpeg tmix; check one frame per beat/phrase, scan for single-frame pops, build a contact sheet; encode H.264 yuv420p, AAC, +faststart.
</build>

<gotchas>
[4 à 8 pièges propres à ce film, pris dans references/bibliotheque.md et adaptés.]
</gotchas>

<start>
Ask me for the inputs. Then build every scene with its real design and send me a storyboard board (storyboard.png + storyboard.html): one rendered thumbnail per scene, numbered S1…Sn, each with its time range, the voice line, what moves, and the transition into the next scene. Wait for my corrections scene by scene (e.g. "S3: …"), update the board, and only render the full film after my go. After the render, inspect decoded frames, fix every issue, then accept my changes by scene number and re-render only the affected ranges.
</start>
```
