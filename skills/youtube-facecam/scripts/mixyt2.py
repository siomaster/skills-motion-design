# Mix v2 (5 min 52) : voix maîtresse + effets discrets placés sur leur pic (ou leur début) + nappe musicale constante → −14 LUFS
import json, re, subprocess, numpy as np, soundfile as sf
SR, DUR = 48000, 352.0
G = {'wfront': .18, 'wcine': .26, 'wdeep': .2, 'wright': .17, 'wsoft': .18, 'swish': .17, 'slide': .25, 'shutter': .3, 'impact': .26, 'riser': .2,
     'pop': .4, 'lpop': .4, 'pluck': .38, 'tap': .35, 'tick': .35, 'click': .45, 'mclick': .5, 'glass': .3, 'confirm': .35, 'twinkle': .32, 'flick': .35,
     'bell': .4, 'deny': .28, 'typing': .3, 'typing_s': .3}
film = open('../yt3hf2/film.js').read()
leaks = sorted(set(float(x) for x in re.findall(r"leak\((\d+(?:\.\d+)?)\)", film)))
W = ['wsoft', 'wright', 'wfront', 'swish']
E = []
for i, t in enumerate(leaks):
    E += [(W[i % 4], t), ('wdeep', t + 0.02)]
for t in (25.35, 113.16, 259.17): E += [('wcine', t + 0.1), ('impact', t + 0.15)]
unf = [float(x) for x in re.findall(r"unfold\('[a-z0-9]+', (\d+(?:\.\d+)?)", film)]
U = ['tick', 'pluck', 'glass', 'tick']
for i, t in enumerate(sorted(unf)): E.append((U[i % 4], t + 0.3))
E += [('shutter', 6.8), ('pop', 10.2), ('tap', 20.35), ('tick', 20.5), ('pluck', 20.65), ('click', 32.35), ('lpop', 34.42), ('pop', 34.9), ('lpop', 35.3),
      ('typing@', 62.6), ('mclick', 66.62), ('confirm', 70.9), ('typing_s@', 78.4), ('mclick', 80.92), ('confirm', 82.2), ('typing_s@', 106.7), ('mclick', 109.02), ('confirm', 112.4),
      ('slide', 185.4), ('mclick', 186.42), ('mclick', 187.17), ('bell', 187.3), ('mclick', 188.27), ('tap', 263.61), ('tap', 263.77), ('tick', 263.93),
      ('flick', 267.5), ('typing@', 267.57), ('mclick', 271.27), ('deny', 286.2), ('tap', 289.65), ('confirm', 315.0), ('deny', 329.0), ('deny', 331.1), ('deny', 333.1),
      ('riser@', 336.2), ('typing_s@', 348.65), ('mclick', 349.97), ('twinkle', 350.4)]
def load(p):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", p, "-f", "f32le", "-ac", "2", "-ar", str(SR), "-"], capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.float32).reshape(-1, 2).copy()
def lufs(p): r = subprocess.run(['ffmpeg', '-i', p, '-af', 'ebur128', '-f', 'null', '-'], capture_output=True, text=True).stderr; return float(r.split('I:')[-1].split('LUFS')[0])
subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", "8", "-i", "<DISQUE_MEDIA>/MUSIC/ES_Time Split Up - Toby Tranter.mp3", "-ss", "0", "-i", "<DISQUE_MEDIA>/MUSIC/ES_Blue Dragon - Toby Tranter.mp3", "-i", "<DISQUE_MEDIA>/MUSIC/ES_We Had Enough - Toby Tranter.mp3",
                "-filter_complex", f"[0:a]atrim=0:142[a];[1:a]atrim=10:191,asetpts=PTS-STARTPTS[b];[2:a]atrim=20:90,asetpts=PTS-STARTPTS[c];[a][b]acrossfade=d=3[ab];[ab][c]acrossfade=d=3,dynaudnorm=f=100:g=5:m=30:p=0.9,acompressor=threshold=-24dB:ratio=3:attack=20:release=250,afade=t=in:d=1.2,afade=t=out:st={DUR - 2}:d=2,atrim=0:{DUR}",
                "-ar", str(SR), "-ac", "2", "build2/music_p.wav"], check=True)
st = np.zeros((int(DUR * SR) + SR, 2), np.float32)
for n, t in E:
    start = n.endswith('@'); n = n.rstrip('@')
    s = load(f"sfx/{n}.wav"); pk = 0 if start else int(np.argmax(np.abs(s).sum(1)))
    a = int(t * SR) - pk
    if a < 0: s = s[-a:]; a = 0
    e = min(len(st), a + len(s)); st[a:e] += s[:e - a] * G[n]
sf.write("build2/sfx_stem.wav", st[:int(DUR * SR)], SR)
vl = lufs("build2/voice_master.wav"); k = 10 ** (((vl - 7) - lufs("build2/sfx_stem.wav")) / 20)
s = load('build2/sfx_stem.wav'); pk = int(np.argmax(np.abs(s).sum(1))) / SR
cfg = {'duration': DUR, 'voice': 'build2/voice_master.wav', 'music': 'build2/music_p.wav', 'music_start': 0, 'music_gain': 0.6, 'music_under_lu': 20, 'lufs': -14, 'tp': -1.0,
       'out': 'build2/mix.wav', 'events': [['build2/sfx_stem.wav', pk, k]]}
json.dump(cfg, open('mixyt2.json', 'w'), indent=1)
print(len(leaks), 'leaks', len(E), 'effets', 'gain', round(k, 3))
print(subprocess.run(["python3", "mix.py", "mixyt2.json"], capture_output=True, text=True).stdout.strip())
