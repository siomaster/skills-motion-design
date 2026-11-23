#!/usr/bin/env bash
# voice_studio.sh <entrée (vidéo ou audio)> <sortie.wav>
# Voix « studio » : coupe-bas 85 Hz, débruitage FFT (souffle de pièce), +2 dB chaleur 110 Hz, −3,5 dB boue 280 Hz,
# +3 dB présence 3,4 kHz, +2,5 dB air 9,5 kHz, de-esser, compression 3,5:1, léger expandeur entre les phrases.
# Validé sur une voix au micro-cravate en pièce : bruit de fond −58 dB → silence. La réverbération de la pièce n'est PAS retirée.
set -euo pipefail
ffmpeg -v error -y -i "$1" -vn -af "highpass=f=85,lowpass=f=15500,afftdn=nr=16:nf=-44:tn=1,equalizer=f=110:t=q:w=1:g=2,equalizer=f=280:t=q:w=1.3:g=-3.5,equalizer=f=3400:t=q:w=1.4:g=3,highshelf=f=9500:g=2.5,deesser=i=0.45:m=0.5:f=0.5,acompressor=threshold=-21dB:ratio=3.5:attack=4:release=90:makeup=4dB,agate=threshold=0.012:ratio=1.8:attack=4:release=180,alimiter=limit=0.95" -ar 48000 -ac 2 "$2"
