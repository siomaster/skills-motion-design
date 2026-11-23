#!/usr/bin/env python3
"""mix.py <config.json> → mixage final. Exemple de config :
{ "duration": 85.5, "voice": "voice_studio.wav",
  "music": "<DOSSIER_PROJET>/Musiqu de fond.mp3", "music_start": 5, "music_under_lu": 13,
  "sfx_dir": "~/.claude/skills/motion-design/template/sfx",
  "events": [["cut_w_front", 2.05, 0.06], ["cut_impact", 2.4, 0.13]],
  "target_lufs": -14, "out": "mix.wav" }
Règles de l'utilisateur : voix n°1 ; musique basse et CONSTANTE (dynaudnorm + compresseur, pas de ducking) ;
effets 0.11–0.26 ; whooshs 0.06–0.11 démarrés ~0.35 s avant la coupe ; varier les sons."""
import json, os, re, subprocess, sys
C = json.load(open(sys.argv[1])); D = C["duration"]
SF = os.path.expanduser(C.get("sfx_dir", "~/.claude/skills/motion-design/template/sfx"))
def loud(p):
    r = subprocess.run(["ffmpeg","-i",p,"-af","ebur128","-f","null","-"],capture_output=True,text=True).stderr
    return float(re.findall(r"I:\s+(-?[\d.]+) LUFS", r)[-1])
inp = ["-i", C["voice"]]; fc = []; mix = ["[vo]"]; fc.append(f"[0:a]apad=whole_dur={D}[vo]")
if C.get("music"):
    subprocess.run(["ffmpeg","-v","error","-y","-ss",str(C.get("music_start",5)),"-t",str(D),"-i",C["music"],"-af",
        f"dynaudnorm=f=100:g=5:m=30:p=0.9,acompressor=threshold=0.05:ratio=8:attack=5:release=60:makeup=2,afade=t=in:d=0.3,afade=t=out:st={D-1.5}:d=1.5",
        "-ar","48000","-ac","2","_music.wav"],check=True)
    g = 10 ** (((loud(C["voice"]) - C.get("music_under_lu", 13)) - loud("_music.wav")) / 20)
    inp += ["-i","_music.wav"]; fc.append(f"[1:a]volume={g:.4f},apad=whole_dur={D}[mus]"); mix.append("[mus]")
ev = C.get("events", []); base = len(inp) // 2; sl = []
for j, (n, t, g) in enumerate(ev):
    f = n if os.path.exists(n) else f"{SF}/{n}.wav"
    inp += ["-i", f]; d = int(t * 1000)
    fc.append(f"[{base+j}:a]aformat=channel_layouts=stereo,aresample=48000,adelay={d}|{d},volume={g}[s{j}]"); sl.append(f"[s{j}]")
if ev: fc.append(f"{''.join(sl)}amix=inputs={len(ev)}:normalize=0,apad=whole_dur={D}[sfx]"); mix.append("[sfx]")
fc.append(f"{''.join(mix)}amix=inputs={len(mix)}:normalize=0,atrim=0:{D},alimiter=limit=0.9,loudnorm=I={C.get('target_lufs',-14)}:TP=-1.5:LRA=8[out]")
r = subprocess.run(["ffmpeg","-v","error","-y",*inp,"-filter_complex",";".join(fc),"-map","[out]","-ar","48000","-ac","2",C.get("out","mix.wav")],capture_output=True,text=True)
print("mix", r.returncode, r.stderr[-300:])
