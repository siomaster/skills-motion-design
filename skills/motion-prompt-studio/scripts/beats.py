#!/usr/bin/env python3
"""beats.py <morceau.mp3> [debut fin] — BPM estimé, énergie par demi-seconde, drop (plus gros saut d'énergie) précisé à 20 ms.
Le départ du morceau dans le film = instant du drop − instant du moment clé dans le film."""
import subprocess, sys, numpy as np
p = sys.argv[1]; sr = 22050
raw = subprocess.run(["ffmpeg","-v","error","-i",p,"-ac","1","-ar",str(sr),"-f","f32le","-"],capture_output=True,check=True).stdout
x = np.frombuffer(raw, np.float32)
a = float(sys.argv[2]) if len(sys.argv) > 2 else 0; z = float(sys.argv[3]) if len(sys.argv) > 3 else min(len(x)/sr, 90)
hop = 512; fr = np.array([np.sum(x[i:i+hop]**2) for i in range(0, len(x)-hop, hop)])
on = np.maximum(0, np.diff(np.log(fr+1e-9)))[:int(60*sr/hop)]
ac = np.correlate(on, on, 'full')[len(on)-1:]; r = sr/hop
lags = np.arange(int(r*60/180), int(r*60/70)); L = lags[np.argmax(ac[lags])]
print(f"durée {len(x)/sr:.2f} s · BPM estimé {60*r/L:.1f} (vérifier : moitié/double possible)")
w = int(sr*.5); e = np.array([np.sqrt(np.mean(x[i:i+w]**2)) for i in range(int(a*sr), int(z*sr)-w, w)])
print("énergie /0,5 s :", " ".join(f"{a+i*.5:.1f}:{v*100:.0f}" for i, v in enumerate(e)))
j = int(np.argmax(e[1:] / (e[:-1] + 1e-4))) + 1; t0 = a + j*.5 - .6
ww = int(sr*.02); fine = [np.sqrt(np.mean(x[int((t0+k*.02)*sr):int((t0+k*.02)*sr)+ww]**2)) for k in range(60)]
k = int(np.argmax(np.diff(fine))) + 1
print(f"drop probable ≈ {t0 + k*.02:.2f} s (saut ×{e[j]/(e[j-1]+1e-4):.1f})")
