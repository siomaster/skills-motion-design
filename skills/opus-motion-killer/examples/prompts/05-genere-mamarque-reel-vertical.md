# Exemple généré par le skill · Reel vertical « Ton temps devient une compétence » (9:16, 10 s, boucle)
Connecteur choisi : le sablier bleu (rond plein, sans anneau).

<inputs>
Ask me for: the hook phrase, three skills to show, the end card lines, one accent color and a royalty-free track around 120 BPM. If I skip anything, use "3 h par jour à scroller", "IA", "Sites web", "Montage vidéo", "MaMarque" / "mamarque.site", #00A1FF and Mixkit n°190.
</inputs>

<direction>
A 10-second 2D vertical motion film, 1080x1920 at 60fps, one continuous take that loops. Near-black canvas (#0B0B0D) with a subtle dot grid, charcoal surfaces (#1C1C1F), crisp white text, one accent #00A1FF. A blue dot connects every scene: it scrolls a feed, falls into an hourglass, becomes the sand that fills three skill cards, then returns to the feed. Urbanist Black for big words, Urbanist Medium for UI, all text in French. Closed-form springs, tiny overshoot, squash on contact, one camera move per scene in a single world.

Banned: hard cuts, crossfades, blur-ins, glows, particle bursts, gradients, decorative rings or circles, bento grids, oversized bounces, text that blurs during a camera move.
</direction>

<structure>
120 BPM, 20 beats (10s). Start the song on its drop.
Beats 0-3, feed: a phone-width feed scrolls; the blue dot is the scroll indicator. "3 h par jour à scroller" rises word by word, one word per beat.
Beats 4-7, fall: the dot drops out of the feed into an hourglass drawn in white strokes; the camera follows it down. Each half-beat a grain falls.
Beats 8-13, skills: the sand pours into three charcoal cards that land one per beat: "IA", "Sites web", "Montage vidéo"; each card's blue fill level is derived from the sand that reached it.
Beats 14-17, title: the cards slide together into one pill, "MaMarque" rises above it, "mamarque.site" inside it.
Beats 18-20, return: the pill shrinks back into the dot, which climbs to the feed and becomes the scroll indicator again. Match the last frame to the first.
</structure>

<build>
1. One HTML file, 1080x1920, everything computed in seek(t), variables declared before the first call.
2. One camera transform keyed by [time, zoom, x, y], zoom in log space.
3. Closed-form springs; the sand level in each card is derived from the dot's path, never animated separately.
4. Shared elements: dot → grain stream → card fills → pill → dot.
5. Measured beats for every landing; restrained Mixkit UI sounds placed by peak; −14 LUFS.
6. Render with Playwright at 60fps without subframes so text stays crisp. One frame per beat first, then check pops and the loop seam.
</build>

<gotchas>
The dot never jumps: every handoff has a visible path. Keep texts inside the vertical safe area (top 250px and bottom 400px free). Give outgoing and incoming words separate timing. Match the dot, feed scroll position and camera in the first and last frames, speed included.
</gotchas>

<start>
Ask me for the inputs, then show me the beat map and four stills (feed, hourglass, skills, title) before building the full video.
</start>
