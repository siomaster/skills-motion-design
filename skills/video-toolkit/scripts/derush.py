#!/usr/bin/env python3
"""Dérushage à partir de la transcription Deepgram.
Usage :
  derush.py <video> <outdir> "0-23,99-157,172-216"   # plages d'index de mots à GARDER (voir segments.txt)
Choisir les plages à la main : garder la MEILLEURE prise de chaque phrase (souvent la dernière),
retirer les phrases ratées, les « euh », les reprises. Les pauses > 0.3 s DANS une plage sont
resserrées à ~0.15 s. Sortie : <outdir>/cuts.json, <outdir>/cuttimes.json (instants des coupes dans
la vidéo montée) et <outdir>/derush.mp4 (H.264 CRF 14, audio avec micro-fondus anti-clic).
Ensuite : relancer transcribe.sh sur derush.mp4 pour des minutages exacts et vérifier qu'il ne reste aucune répétition."""
import json, subprocess, sys
V, O, R = sys.argv[1], sys.argv[2], sys.argv[3]
W = json.load(open(O + '/stt.json'))['results']['channels'][0]['alternatives'][0]['words']
K = [tuple(map(int, r.split('-'))) for r in R.split(',')]
iv = []
for a, b in K:
    s = max(0, W[a]['start'] - 0.08)
    if a > 0: s = max(s, W[a-1]['end'] + 0.02)
    cur = s
    for i in range(a, b):
        if W[i+1]['start'] - W[i]['end'] > 0.3:
            iv.append([cur, W[i]['end'] + 0.08]); cur = W[i+1]['start'] - 0.07
    e = W[b]['end'] + 0.15
    if b + 1 < len(W): e = min(e, W[b+1]['start'] - 0.02)
    iv.append([cur, e])
m = []
for s, e in iv:
    if m and s <= m[-1][1] + 0.01: m[-1][1] = max(m[-1][1], e)
    else: m.append([s, e])
json.dump(m, open(O + '/cuts.json', 'w'))
t = 0; ct = []
for s, e in m[:-1]: t += e - s; ct.append(round(t, 3))
json.dump(ct, open(O + '/cuttimes.json', 'w'))
fps = subprocess.run(["ffprobe","-v","error","-select_streams","v:0","-show_entries","stream=r_frame_rate","-of","csv=p=0",V],capture_output=True,text=True).stdout.strip()
fc = []; cat = ''
for k, (s, e) in enumerate(m):
    d = e - s
    fc.append(f"[0:v:0]trim={s:.3f}:{e:.3f},setpts=PTS-STARTPTS[v{k}]")
    fc.append(f"[0:a:0]atrim={s:.3f}:{e:.3f},asetpts=PTS-STARTPTS,afade=t=in:d=0.012,afade=t=out:st={max(0,d-0.015):.3f}:d=0.015[a{k}]")
    cat += f"[v{k}][a{k}]"
fc.append(f"{cat}concat=n={len(m)}:v=1:a=1[v][a]")
r = subprocess.run(["ffmpeg","-v","error","-y","-i",V,"-filter_complex",";".join(fc),"-map","[v]","-map","[a]","-r",fps,"-c:v","libx264","-crf","14","-preset","medium","-pix_fmt","yuv420p","-c:a","aac","-b:a","256k",O+"/derush.mp4"],capture_output=True,text=True)
print("ffmpeg", r.returncode, r.stderr[-300:])
print(len(m), "segments, durée", round(sum(e - s for s, e in m), 2), "s ; coupes :", ct)
