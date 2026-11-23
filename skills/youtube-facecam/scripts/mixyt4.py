# Mix v2 (5 min 52) : voix maîtresse + effets discrets placés sur leur pic (ou leur début) + nappe musicale constante → −14 LUFS
import json, re, subprocess, numpy as np, soundfile as sf
SR, DUR = 48000, 465.4
def T(t): return t - 7.59 if t > 73.49 else t
G = {'wfront': .18, 'wcine': .26, 'wdeep': .2, 'wright': .17, 'wsoft': .18, 'swish': .17, 'slide': .25, 'shutter': .3, 'impact': .26, 'riser': .2,
     'pop': .5, 'lpop': .5, 'pluck': .55, 'tap': .4, 'tick': .5, 'click': .45, 'mclick': .5, 'glass': .5, 'confirm': .35, 'twinkle': .32, 'flick': .35,
     'bell': .4, 'deny': .28, 'typing': .3, 'typing_s': .3}
film = open('../yt3hf3/film.js').read()
leaks = sorted(set(T(float(x)) for x in re.findall(r"leak\((\d+(?:\.\d+)?)\)", film)))
W = ['wsoft', 'wright', 'wfront', 'swish']
E = []
for i, t in enumerate(leaks):
    E += [(W[i % 4], t), ('wdeep', t + 0.02)]
for t in (25.35, 135.87, 373.01, 322.06): E += [('wcine', T(t) + 0.1), ('impact', T(t) + 0.15)]
unf = [T(float(x)) for x in re.findall(r"unfold\('[a-z0-9]+', (\d+(?:\.\d+)?)", film)]
U = ['pop', 'pluck', 'glass', 'lpop']
for i, t in enumerate(sorted(unf)): E.append((U[i % 4], t + 0.3))
E += [(n, T(t)) for n, t in [('impact', 0.08), ('wright', 0.5), ('tick', 0.42), ('tick', 0.66), ('tick', 0.82), ('swish', 5.4), ('wfront', 9.9),
      ('tap', 20.35), ('tick', 20.5), ('pluck', 20.65), ('click', 32.35), ('lpop', 34.42), ('pop', 34.9), ('lpop', 35.3),
      ('typing@', 64.8), ('mclick', 69.02), ('confirm', 73.0), ('typing_s@', 88.2), ('mclick', 90.92), ('confirm', 92.0), ('typing_s@', 129.3), ('mclick', 131.72), ('confirm', 134.9),
      ('slide', 144.6), ('pop', 144.7), ('pop', 144.85),
      ('slide', 210.6), ('mclick', 211.62), ('mclick', 212.37), ('bell', 212.5), ('mclick', 213.47), ('pop', 323.7), ('tap', 377.30), ('tap', 377.46), ('tick', 377.62),
      ('flick', 381.2), ('typing@', 381.26), ('mclick', 384.96), ('deny', 400.2), ('tap', 403.85), ('confirm', 429.8), ('deny', 449.9), ('deny', 452.0), ('deny', 454.0),
      ('riser@', 457.13), ('typing_s@', 469.58), ('mclick', 470.9), ('twinkle', 471.3)]]
def load(p):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", p, "-f", "f32le", "-ac", "2", "-ar", str(SR), "-"], capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.float32).reshape(-1, 2).copy()
def lufs(p): r = subprocess.run(['ffmpeg', '-i', p, '-af', 'ebur128', '-f', 'null', '-'], capture_output=True, text=True).stderr; return float(r.split('I:')[-1].split('LUFS')[0])
subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", "8", "-i", "<DISQUE_MEDIA>/MUSIC/ES_Time Split Up - Toby Tranter.mp3", "-ss", "0", "-i", "<DISQUE_MEDIA>/MUSIC/ES_Blue Dragon - Toby Tranter.mp3", "-i", "<DISQUE_MEDIA>/MUSIC/ES_We Had Enough - Toby Tranter.mp3",
                "-filter_complex", f"[0:a]atrim=0:143[a];[1:a]atrim=0:191,asetpts=PTS-STARTPTS[b];[2:a]atrim=20:166,asetpts=PTS-STARTPTS[c];[a][b]acrossfade=d=3[ab];[ab][c]acrossfade=d=3,dynaudnorm=f=100:g=5:m=30:p=0.9,acompressor=threshold=-24dB:ratio=3:attack=20:release=250,afade=t=in:d=1.2,afade=t=out:st={DUR - 2}:d=2,atrim=0:{DUR}",
                "-ar", str(SR), "-ac", "2", "build3/music_p.wav"], check=True)
m = load("build3/music_p.wav"); tt = np.arange(len(m)) / SR
env = np.clip(np.minimum((314.3 - tt) / 0.6, (tt - 365.4) / 1.5), 0, 1); env = np.where((tt > 313.7) & (tt < 366.9), env, 1)
sf.write("build3/music_p.wav", m * env[:, None], SR)
st = np.zeros((int(DUR * SR) + SR, 2), np.float32)
for n, t in E:
    start = n.endswith('@'); n = n.rstrip('@')
    s = load(f"sfx/{n}.wav"); pk = 0 if start else int(np.argmax(np.abs(s).sum(1)))
    a = int(t * SR) - pk
    if a < 0: s = s[-a:]; a = 0
    e = min(len(st), a + len(s)); st[a:e] += s[:e - a] * G[n]
sf.write("build3/sfx_stem.wav", st[:int(DUR * SR)], SR)
vl = lufs("build3/voice_master.wav"); k = 10 ** (((vl - 5) - lufs("build3/sfx_stem.wav")) / 20)
s = load('build3/sfx_stem.wav'); pk = int(np.argmax(np.abs(s).sum(1))) / SR
cfg = {'duration': DUR, 'voice': 'build3/voice_master.wav', 'music': 'build3/music_p.wav', 'music_start': 0, 'music_gain': 0.6, 'music_under_lu': 20, 'lufs': -14, 'tp': -1.0,
       'out': 'build3/mix.wav', 'events': [['build3/sfx_stem.wav', pk, k]]}
json.dump(cfg, open('mixyt2.json', 'w'), indent=1)
print(len(leaks), 'leaks', len(E), 'effets', 'gain', round(k, 3))
print(subprocess.run(["python3", "mix.py", "mixyt2.json"], capture_output=True, text=True).stdout.strip())
