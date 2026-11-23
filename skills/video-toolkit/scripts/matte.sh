#!/usr/bin/env bash
# matte.sh <video> <outdir> [filtre_image]   (ex. filtre : "crop=1080:1080:0:480" ou un étalonnage "eq=...,crop=...")
# Détoure le sujet avec HyperFrames remove-background (u2net_human_seg, ~3 min par minute de vidéo en 720p),
# puis écrit <outdir>/fg/fNNNNN.png (RGBA : image étalonnée + transparence du détourage) et
# <outdir>/bg/fNNNNN.jpg (image pleine, même filtre). Numérotation à partir de 1, même cadence que la vidéo.
# NB : le disque externe (exFAT) ne supporte pas `hyperframes init` ; travailler dans le scratchpad.
set -euo pipefail
V="$1"; O="$2"; F="${3:-null}"; mkdir -p "$O/fg" "$O/bg"
L=$(ls -d ~/.claude/plugins/cache/hyperframes/hyperframes/*/skills/hyperframes/scripts/plugin-cli.mjs | tail -1)
W=$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 "$V"); VW=${W%,*}; VH=${W#*,}
ffmpeg -v error -y -i "$V" -vf "scale=-2:1280" -c:v libx264 -crf 16 -an "$O/_m720.mp4"
node "$L" remove-background "$O/_m720.mp4" -o "$O/_fg.mov" > "$O/matte.log" 2>&1
ffmpeg -v error -y -i "$V" -vf "$F" -q:v 2 "$O/bg/f%05d.jpg"
# alphaextract exige un format planaire (yuva444p), pas du RGBA entrelacé
ffmpeg -v error -y -i "$V" -i "$O/_fg.mov" -filter_complex "[0:v]$F,format=yuv444p[c];[1:v]format=yuva444p,alphaextract,scale=${VW}:${VH},$F,format=gray[a];[c][a]alphamerge,format=rgba" "$O/fg/f%05d.png"
rm -f "$O/_m720.mp4"
echo "bg: $(ls "$O/bg" | wc -l) images, fg: $(ls "$O/fg" | wc -l) images"
