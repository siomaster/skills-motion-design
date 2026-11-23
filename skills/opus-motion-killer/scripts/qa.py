#!/usr/bin/env python3
"""qa.py film.mp4 [t_rapide ...] — images qui sautent, jointure de boucle, planche (contact.png) et bandes des passages rapides (fast_<t>.png)."""
import subprocess, sys, numpy as np
v = sys.argv[1]
raw = subprocess.run(["ffmpeg","-v","quiet","-i",v,"-vf","scale=180:180,format=gray","-f","rawvideo","-"],capture_output=True).stdout
fr = np.frombuffer(raw, np.uint8).reshape(-1, 180, 180).astype(np.float32)
d = np.abs(np.diff(fr, axis=0)).mean(axis=(1, 2)); n_, d_ = subprocess.run(["ffprobe","-v","error","-select_streams","v","-show_entries","stream=r_frame_rate","-of","csv=p=0",v],capture_output=True,text=True).stdout.strip().strip(",").split("/"); fps = float(n_) / float(d_)
pops = [(i+1, (i+1)/fps, d[i]) for i in range(1, len(d)-1) if d[i] > 3*max(d[i-1], d[i+1], .3) and d[i] > 2]
for f, t, x in pops: print(f"image qui saute : n°{f} à {t:.3f} s (écart {x:.1f})")
print(f"{len(fr)} images · {len(pops)} saut(s) · jointure boucle {np.abs(fr[-1]-fr[0]).mean():.3f} (écart médian entre images {np.median(d):.3f})")
subprocess.run(["ffmpeg","-v","error","-y","-i",v,"-vf","fps=2,scale=320:-1,tile=6x5","-frames:v","1","contact.png"])
for t in sys.argv[2:]:
    subprocess.run(["ffmpeg","-v","error","-y","-ss",t,"-i",v,"-vf","fps=20,scale=320:-1,tile=6x2","-frames:v","1",f"fast_{t}.png"])
print("planche : contact.png" + (" · bandes : " + ", ".join(f"fast_{t}.png" for t in sys.argv[2:]) if sys.argv[2:] else ""))
