# Exemple · brief de formation → prompt

**Demande de l'utilisateur :** « Je veux un motion design pour ma formation "Crée ton SaaS avec l'IA" sur mamarque.site. Format 9:16, 30 s. Voici le script de la voix off : "Tu as une idée d'application mais tu ne sais pas coder ? Avec la formation Crée ton SaaS avec l'IA, tu passes de l'idée à un vrai produit en ligne. Douze modules, des projets réels, et un certificat à la fin. Plus de cinq cents élèves l'ont déjà suivie. Rejoins-nous sur mamarque point site." »

Script texte sans audio → temps estimés (2,6 mots/s), recalage prévu dans `<build>`. Les chiffres (« douze modules », « cinq cents élèves ») viennent du script de l'utilisateur et doivent être vérifiés sur le site.

```
<inputs>
Ask me for: my logo (white and colour versions), the exact course name, 3 to 6 real screenshots of the course space (module list, a lesson player, the certificate), my brand colours and font, the voiceover audio file (or let you generate it), and a royalty-free track around 120 BPM with its drop time. If I skip anything, use these defaults: course "Crée ton SaaS avec l'IA" on mamarque.site, ink #0B0B0D, warm white #F7F7F5, accent #00A1FF, Urbanist 400/500, a generated voice (Deepgram aura-2-hector-fr), and Mixkit track #190 (120 BPM, drop at 16.01 s).
</inputs>

<voice>
Master clock = the voiceover. If I give a file, transcribe it with word timestamps (split at pauses ≥ 100 ms, align each segment's first word to its measured onset) and re-time every scene below to the measured phrase starts. If you generate it: Deepgram aura-2-hector-fr, 4 takes, lively and fast, pauses > 0.28 s shortened to 0.2 s, sped up ×1.2 without pitch change, level evened.
Estimated phrase table (re-time after transcription):
[0.00–2.90] "Tu as une idée d'application mais tu ne sais pas coder ?"
[3.10–9.20] "Avec la formation Crée ton SaaS avec l'IA, tu passes de l'idée à un vrai produit en ligne."
[9.40–13.60] "Douze modules, des projets réels, et un certificat à la fin."
[13.80–17.10] "Plus de cinq cents élèves l'ont déjà suivie."
[17.30–20.00] "Rejoins-nous sur mamarque point site."
</voice>

<direction>
A 21.5-second vertical course launch film, 1080x1920 at 60fps. Apple-keynote feel on a warm white canvas: black ink, one bright blue accent, soft liquid glass. 2D only, one continuous take: every scene is made out of the previous one, nothing fades or cuts. The thread is a single blue cursor caret: it blinks in the opening idea, becomes the cursor that builds the product, then the progress bar, then the button that is clicked at the end.
Palette: canvas #F7F7F5, ink #0B0B0D, accent #00A1FF, card #FFFFFF with shadow rgba(11,11,13,.08). Type: Urbanist 400 and 500 only, no bold. On-screen text in French, never more than 6 words at once, the key word in #00A1FF at the moment it is spoken. Keep everything inside the vertical safe area (nothing important in the top 250 px or the bottom 420 px).
Story: a lone caret blinks after "une idée" typed in a glass field → the field stretches into an app window that builds itself block by block → the window folds into the course card "Crée ton SaaS avec l'IA" → the card fans into 12 module cards that stack as a deck → a lesson player opens from the top card → the progress bar fills to 100 % and its end pops into a signed certificate → five hundred small avatar dots gather into the number "500+" → the number collapses into the blue button "Rejoindre la formation", the caret becomes a cursor and clicks → the button floods blue and contracts into the white MaMarque logo with "mamarque.site" typed beneath.
Banned: crossfades, blur-ins, hard cuts without a musical reason, decorative rings or expanding circles, bento grids, exploded full-screen type, decorative dashes, prices, cut text left on screen, holds longer than 1s (except the last 1.5s), particles, glows on text, fake reviews, Math.random, anything that looks like a template.
</direction>

<structure>
120 BPM, one beat = 0.5 s. Start the music so that its drop (song 16.01 s) lands on "Douze modules" (film 9.40 s): song start = 6.61 s. Scenes change on phrase starts.
S1 0.00–2.90 "Tu as une idée…": glass field 760x120, radius 60, centred at y 900, types "une idée d'application" at 18 chars/s from 0.25 s; caret #00A1FF blinks at 2 Hz. Top line "Tu ne sais pas coder ?" rises from a mask at y 520 on "coder" (≈2.4 s). Camera push 1.0 → 1.06.
S2 3.10–9.20 "Avec la formation…": the field stretches (spring, damping 0.8) into an app window 860x1180 whose header, sidebar, two cards and a chart draw in on beats 7, 8, 9, 10 (0.5 s apart). On "vrai produit en ligne" (≈7.8 s) a green "En ligne" pill pops in the header. At 8.7 s the window shrinks and folds into the course card 720x900 (real course cover) with the title "Crée ton SaaS avec l'IA" in two lines.
S3 9.40–13.60 drop "Douze modules…": on the drop the card fans into 12 module cards (real module names from my screenshots), fanning out 6° apart then restacking as a deck, one card every 1/8 beat. "12 modules" rises at y 300 on "Douze". On "projets réels" the top card opens into a lesson player (16:9 inside the card, a real lesson frame), its progress bar fills 0 → 100 % in 1.6 s; on "certificat" the bar's end pops into the certificate card (name line types "Ton nom", a blue seal stamps in with a 2 % overshoot).
S4 13.80–17.10 "Plus de cinq cents élèves…": the certificate shrinks to a dot; 500 tiny ink dots (seeded) drift in and gather into the numerals "500+" (Urbanist 500, 260 px), counter from 0 to 500 in 1.2 s ending on "suivie".
S5 17.30–21.50 "Rejoins-nous…": "500+" collapses into the blue button "Rejoindre la formation" (640x120, radius 60); the caret from S1 reappears as a macOS arrow cursor, glides in (speed < 65 px/frame) and clicks on "Rejoins" (button shrinks 5 % for 0.12 s); the button floods blue past every corner in 0.35 s, holds one beat, contracts into the white MaMarque logo (centred, 420 px wide); "mamarque.site" types beneath at 18.9 s. Hold to 21.5 s with a 1.0 → 1.02 creep.
</structure>

<sound>
Mixkit #190 from song 6.61 s, compressed so its level stays constant (check every 2 s, spread < 3 dB), 13 LU under the voice, no ducking. One downloaded SFX per event, placed by its measured peak, varied and discreet (gain 0.08–0.25, whooshes 0.06–0.10 and 0.35 s before their cut): soft key ticks while typing, a glass pop for the "En ligne" pill, a low soft impact on the drop, light card flicks for the fan, a stamp for the seal, a short rising tick for the counter, a click on the button, a gentle shimmer on the logo. Master −14 LUFS, true peak −1 dBTP, 60 ms fade at the very end.
</sound>

<build>
1. One HTML page at 1080x1920; every frame is a pure function of time inside an async seek(t): no CSS transitions, no timers, no state between frames, no Math.random (seeded hashes only).
2. Closed-form springs (UI 320/30, containers 170/26, logo 120/24), overshoot < 2 %; one camera container keyed [t, zoom, x, y] with zoom interpolated in log space; never zoom in then out back-to-back.
3. Shared elements: the field becomes the window, the window becomes the card, the bar end becomes the certificate, the number becomes the button, the flood carries the button label before contracting into the logo.
4. Real assets only: my logo, course cover, module names, lesson frame and certificate layout recreated in HTML from my screenshots (never a scaled flat screenshot).
5. Render with Playwright at 60fps with 8 subframes per frame blended by ffmpeg tmix; check one frame per phrase and every fast move frame by frame, scan for single-frame pops, build a contact sheet; encode H.264 yuv420p crf 17, AAC 192k, +faststart, saved to <DOSSIER_PROJET>/RÉSULTATS/.
</build>

<gotchas>
Text that swaps inside the morphing card needs its own mask and must leave before the next line takes its place. The flood must pass the farthest corner and take about 0.35 s, or it reads as a flash. Four subframes leave ghost copies on the fanning cards: use 8. Keep the typed text on one fixed line so the camera never chases a wrapping caret. Measure "Crée ton SaaS avec l'IA" after fonts load and scale the card title to fit. If the camera resets to 1.0 between scenes the zoom snaps: start each scene at the previous zoom. Dots gathering into "500+" must use a seeded layout so every render is identical.
</gotchas>

<start>
Ask me for the inputs. Then show me the phrase table re-timed on the real voice, the beat map, and 4 stills (S1 typed idea, S3 module fan on the drop, S4 "500+", S5 logo) before writing the full film. After the full render, inspect decoded frames from the MP4 and fix every issue before delivering.
</start>
```
