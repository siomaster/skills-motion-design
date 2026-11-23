# Gabarit de prompt (à remplir, en anglais ; textes à l'écran en français entre guillemets)

```
<inputs>
Ask me for: {4 à 6 variables : produit / phrase tapée / mot héros / chiffre / textes de la carte finale / une couleur d'accent / un morceau libre de droits autour de {BPM} BPM}. If I skip anything, use the defaults: {valeurs par défaut : textes MaMarque en français, accent #00A1FF, Urbanist, Mixkit n°{id}}.
</inputs>

<direction>
A {durée}-second 2D {type : product launch film / UI motion film / motion design film} in {16:9 1920x1080 | 9:16 1080x1920 | 1:1 1440x1440} at 60fps, one continuous take. {Le connecteur} connects every scene: {liste de ses états, de la première à la dernière scène}. {Interaction réelle : a real cursor makes the opening click feel real.} Each scene grows from the last: text rises from a mask line, {morphings clés : buttons expand into pages / color floods from one object before shrinking into another / the shape morphs its size, radius and color}. Give the camera one eased move per scene, interpolate zoom in log space and never zoom in and out consecutively.

Look: {fond : warm off-white #F5F4F0 | white #FFFFFF | near-black #0B0B0D with a subtle dot grid}, {UI : black/charcoal controls #0E0E10 / #2A2A2E}, crisp {white/ink} text, one accent {#00A1FF}. Urbanist Medium for UI and body, Urbanist Black for big titles. {Photos / logos réels si besoin.} Keep motion sharp and controlled: closed-form springs with a tiny overshoot, brief squash on contact, something on every beat, no dead time.

Banned: {choisir dans la liste : crossfades, blur-ins, hard cuts, 3D, particle bursts, glows, gradients on UI chrome, stock footage, bouncy or elastic easing, holds longer than 1s, camera moves that reverse direction, decorative rings or circles, bento grids, text that blurs during a camera move, motion not connected to an element already on screen, anything that feels like a template}.
</direction>

<structure>
{BPM} BPM, {N} beats ({durée}s). {Start the song on its drop | Start the song {k} beats before its drop so the drop lands on {moment clé}.}

{Scène 1 (beats a-b), nom}: {ce qui se passe, comment le connecteur agit, texte exact "…"}.
{Scène 2 (beat c), nom}: {comment elle naît de la scène 1 (élément partagé), ce qui arrive sur chaque temps}.
…
{Dernière scène}: {carte finale : "…", "…", "…" avec le connecteur comme point final ou logo | retour : le connecteur revient à son point de départ ; match the final frame to the first so the video loops cleanly}.
</structure>

<build>
1. One HTML file, {W}x{H}. Compute every visual from time inside seek(t): no CSS transitions, timers or state carried between frames. Declare every variable before the first seek() call.
2. Put every component in one world under a single camera transform keyed by [time, zoom, x, y], eased segments, zoom interpolated in log space.
3. Use closed-form step-response springs for every pop, settle and impact; a value that changes target many times is the sum of one spring per change.
4. Make every handoff a shared element: {exemples précis du film : the flood carries a copy of the bubble's words / the button carries its label into the page / the toggle knob becomes the tab indicator}.
5. Derive dependent visuals from one source: {the graph from the dot's spring / the fill and number from the ball's x / the typed text = substring typed by time t}.
6. Analyze the song with numpy for the beat grid and the drop; sync {liste des événements} to measured beats. Place every UI sound (Mixkit) by its measured peak and loudnorm to −14 LUFS.
7. Render with Playwright at 60fps {using 8 subframes per frame blended with ffmpeg tmix | without subframes so text stays crisp}. Render one frame per beat first; then scan the full video for single-frame pops and check the loop seam frame by frame.
</build>

<gotchas>
{4 à 5 pièges propres à ce film, ex. :}
The flood must reach the farthest corner in about 0.35s or it looks like a flash.
Give outgoing and incoming text separate timing so letters never overlap.
{Le connecteur} can never jump: every handoff needs a visible path.
Set z-index on every layer so {cards / shapes} never float above {the flood / the page}.
Match the cursor, connector, component states and camera in the first and last frames, speed included, or the loop stutters.
</gotchas>

<start>
Ask me for the inputs, then show me the beat map and four stills ({scène A}, {scène B}, {scène C}, {scène D}) before building the full video.
</start>
```
