#!/usr/bin/env python3
"""mix.py config.json — musique + sons placés sur leur pic mesuré, deux passes loudnorm.
config : {"duration": 15, "voice": "voix.mp3" (optionnel, posée à 0 s), "music_under_lu": 14 (musique sous la voix),
          "music": "dl/m190.mp3", "music_start": 16.01, "music_gain": 0.6,
          "sfx_dir": "dl/sfx", "events": [[1125, 0.5, 0.6], ["chemin/son.wav", 2.0, 0.3]],
          "lufs": -14, "tp": -1.3, "out": "audio.wav"}"""
import json, os, subprocess, sys, numpy as np, soundfile as sf
C = json.load(open(sys.argv[1])); D = C["duration"]; SR = 48000
def load(p):
    raw = subprocess.run(["ffmpeg","-v","error","-i",p,"-f","f32le","-ac","2","-ar",str(SR),"-"],capture_output=True,check=True).stdout
    return np.frombuffer(raw, np.float32).reshape(-1, 2).copy()
out = np.zeros((int(D*SR)+SR, 2), np.float32)
if C.get("music"):
    m = load(C["music"])[int(C.get("music_start", 0)*SR):][:int(D*SR)]
    env = np.ones(len(m)); f = int(min(.4, D/10)*SR); env[-f:] = np.linspace(1, .25, f)
    out[:len(m)] += m*env[:, None]*C.get("music_gain", .6)
def lufs(a):
    sf.write("_l.wav", a, SR); r = subprocess.run(["ffmpeg","-i","_l.wav","-af","ebur128","-f","null","-"],capture_output=True,text=True).stderr
    os.remove("_l.wav"); return float(r.split("I:")[-1].split("LUFS")[0])
if C.get("voice"):
    v = load(C["voice"])[:int(D*SR)]
    if C.get("music"):
        m_part = out[:len(v)].copy(); gm = 10 ** (((lufs(v) - C.get("music_under_lu", 14)) - lufs(m_part)) / 20); out *= gm
    out[:len(v)] += v
for n, t, g in C.get("events", []):
    p = n if isinstance(n, str) and os.path.exists(n) else f'{C.get("sfx_dir","dl/sfx")}/{n}.mp3'
    s = load(p); pk = int(np.argmax(np.abs(s).sum(1))); st = int(t*SR) - pk
    if st < 0: s = s[-st:]; st = 0
    e = min(len(out), st+len(s)); out[st:e] += s[:e-st]*g
sf.write("_pre.wav", out[:int(D*SR)], SR)
L, TP = C.get("lufs", -14), C.get("tp", -1.3)
r = subprocess.run(["ffmpeg","-i","_pre.wav","-af",f"loudnorm=I={L}:TP={TP}:LRA=9:print_format=json","-f","null","-"],capture_output=True,text=True).stderr
J = json.loads(r[r.rindex("{"):r.rindex("}")+1])
af = f"loudnorm=I={L}:TP={TP}:LRA=9:measured_I={J['input_i']}:measured_TP={J['input_tp']}:measured_LRA={J['input_lra']}:measured_thresh={J['input_thresh']}:linear=true"
subprocess.run(["ffmpeg","-v","error","-y","-i","_pre.wav","-af",af,"-ar",str(SR),C.get("out","audio.wav")],check=True); os.remove("_pre.wav")
s = subprocess.run(["ffmpeg","-i",C.get("out","audio.wav"),"-af","ebur128=peak=true","-f","null","-"],capture_output=True,text=True).stderr.split("Summary:")[-1]
print(" ".join(l.strip() for l in s.splitlines() if l.strip().startswith(("I:", "Peak:"))))
