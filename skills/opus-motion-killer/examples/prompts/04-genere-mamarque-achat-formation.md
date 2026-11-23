# Exemple généré par le skill · « De l'idée à la formation » (16:9, 15 s)
Idée de départ : « montrer qu'on trouve une formation MaMarque, qu'on l'achète une fois et qu'on y a accès à vie ».
Connecteur choisi : le bouton bleu « Commencer ».

<inputs>
Ask me for: the course to feature, the phrase typed in the search, the price and old price, the end card lines, one accent color and a royalty-free track around 120 BPM. If I skip anything, use: "Web Builder pro", "créer des sites sans coder", 39 € (347 €), "MaMarque" / "Apprends une compétence." / "mamarque.site", #00A1FF and Mixkit n°190 (drop at 16.01s).
</inputs>

<direction>
A 15-second 2D product film in 16:9, 1920x1080 at 60fps, one continuous take on a white canvas (#FFFFFF). The blue "Commencer" button connects every scene: it is clicked by a real cursor, becomes a search field, bursts into course cards, carries the chosen card into a checkout, turns into "✓ Accès à vie" and finally becomes the page behind the end card. Each scene grows from the last: text rises from a mask line, the button expands into pages and shrinks back into pills, color floods from the button before contracting into the next object. Give the camera one eased move per scene, zoom in log space, never zoom in and out consecutively.

Look: white canvas, near-black UI (#0E0E10), light grey surfaces (#F0F0EE), one accent #00A1FF. Urbanist Medium for UI, Urbanist Black for titles. Real course thumbnails from mamarque.site on dark cards (330x440, radius 28): thumbnail, name, one-line description, price, "Accès à vie" pill. All on-screen text in French. Closed-form springs with a tiny overshoot, brief squash on clicks, something on every beat.

Banned: crossfades, blur-ins, hard cuts, 3D, particle bursts, glows, gradients on UI chrome, decorative rings or circles, bento grids, bouncy easing, holds longer than 1s, invented features or ratings, anything that feels like a template.
</direction>

<structure>
120 BPM, 30 beats (15s). Start the song on its drop so beat 0 is a downbeat.

Beats 0-2, click: close on the blue pill "Commencer". The cursor clicks it on beat 1; it stretches into a search field.
Beats 2-6, search: type "créer des sites sans coder" over one fixed line, a key per half-beat. Enter on beat 6.
Beat 6, burst: the field floods blue to every corner in 0.35s, then six dark course cards burst from the center. The strip slides and lands on "Web Builder pro", which lifts with a "Meilleur choix" pill on beat 8.
Beats 9-14, checkout: the blue contracts into the card's price pill; the card flies into a white checkout panel: "39 €" with "347 €" struck through, "Paiement unique, sans abonnement". The cursor clicks "Acheter" on beat 12 → three dots → "✓ Accès à vie" on beat 13.
Beats 14-22, title: the pill expands into the page, staying pill-shaped to the edges while the camera pushes in. Its label grows to 92px and slides away. "Tu cherchais une compétence." then "Elle t'attend à vie." word by word, white on black.
Beats 22-30, end card: the blue dot of "à vie." drops onto a line, travels to the center and becomes the MaMarque mark; the wordmark wipes out from behind it, "Apprends une compétence." above, "mamarque.site" below. Hold the last beat only.
</structure>

<build>
1. One HTML file, 1920x1080. Compute every visual from time inside seek(t): no CSS transitions, timers or state carried between frames. Declare every variable before the first seek().
2. One camera transform keyed by [time, zoom, x, y], eased segments, zoom interpolated in log space.
3. Closed-form step-response springs for every pop, settle and click; a value that changes target several times is the sum of one spring per change.
4. Shared elements at every handoff: the button carries its label into the field and the page; the flood carries the price into the pill; the card flies into its checkout slot.
5. The typed text is the substring typed by time t; key presses at fixed times.
6. Analyze the song with numpy for beats; sync click, enter, flood, landing, purchase click, success and the end mark. Place each Mixkit UI sound by its measured peak; loudnorm to −14 LUFS.
7. Render with Playwright at 60fps, 8 subframes blended with ffmpeg tmix. Render one frame per beat first, then scan for single-frame pops.
</build>

<gotchas>
The flood must reach the farthest corner in about 0.35s or it looks like a flash. Set z-index on every layer so cards never float above the flood. Give outgoing and incoming text separate timing so letters never overlap. Keep the typed line fixed so the camera never follows a wrapping caret. Use only real MaMarque courses and prices.
</gotchas>

<start>
Ask me for the inputs, then show me the beat map and four stills (click, cards, checkout, end card) before building the full video.
</start>
