# Mix YouTube : voix traitée (n°1) + effets placés sur leur pic (ou leur début) ~6 LU sous la voix + musique constante 19 LU sous la voix → −14 LUFS
import json, subprocess, numpy as np, soundfile as sf
SR, DUR = 48000, 126.0
G = {'wfront': .22, 'wcine': .28, 'wdeep': .22, 'wright': .2, 'wsoft': .2, 'swish': .2, 'slide': .3, 'shutter': .35, 'impact': .28, 'riser': .22,
     'pop': .45, 'lpop': .45, 'pluck': .45, 'tap': .4, 'tick': .4, 'click': .5, 'mclick': .55, 'glass': .4, 'confirm': .4, 'twinkle': .35, 'flick': .4,
     'bell': .4, 'deny': .3, 'typing': .32, 'typing_s': .32}
E = [('wdeep', .25), ('wright', 6.6), ('wfront', 10.25), ('pop', 10.4), ('wsoft', 15.15), ('shutter', 19.25), ('tap', 20.35), ('tick', 20.5), ('pluck', 20.65),
     ('swish', 23.8), ('wcine', 25.45), ('impact', 25.5), ('swish', 29.95), ('wsoft', 32.15), ('click', 32.35), ('lpop', 34.42), ('pop', 34.9), ('lpop', 35.3),
     ('wsoft', 35.85), ('wright', 37.55), ('swish', 39.1), ('slide', 40.8), ('wcine', 42.75), ('impact', 42.8), ('wsoft', 47.9), ('wright', 51.45), ('wdeep', 53.75),
     ('tick', 56.1), ('wfront', 58.1), ('pop', 58.3), ('pluck', 59.1), ('pluck', 61.47), ('pluck', 62.94), ('confirm', 64.2), ('swish', 65.12), ('slide', 65.8),
     ('mclick', 66.62), ('mclick', 67.28), ('bell', 67.4), ('mclick', 68.34), ('wsoft', 69.4), ('glass', 70.1), ('tick', 73.85), ('wright', 75.9),
     ('wcine', 81.05), ('impact', 81.1), ('swish', 85.5), ('tap', 85.5), ('tap', 85.66), ('tick', 85.82), ('flick', 89.4), ('typing@', 89.45), ('mclick', 93.22),
     ('wsoft', 93.6), ('wdeep', 97.1), ('wfront', 100.8), ('deny', 102.9), ('deny', 105.08), ('deny', 106.83), ('swish', 107.5), ('pop', 109.3),
     ('riser@', 111.0), ('wsoft', 113.15), ('glass', 113.5), ('wright', 115.85), ('tick', 116.55), ('wsoft', 118.1), ('glass', 118.65),
     ('wcine', 122.35), ('typing_s@', 122.65), ('mclick', 123.97), ('twinkle', 124.4)]
def load(p):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", p, "-f", "f32le", "-ac", "2", "-ar", str(SR), "-"], capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.float32).reshape(-1, 2).copy()
def lufs(p): r = subprocess.run(['ffmpeg', '-i', p, '-af', 'ebur128', '-f', 'null', '-'], capture_output=True, text=True).stderr; return float(r.split('I:')[-1].split('LUFS')[0])
# voix : passe-haut, compression douce
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", "build/voice.wav", "-af", "highpass=f=70,acompressor=threshold=-20dB:ratio=2.5:attack=8:release=120:makeup=3dB", "-ar", str(SR), "-ac", "2", "build/voice_p.wav"], check=True)
# musique constante
subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", "8", "-t", str(DUR + 1), "-i", "<DISQUE_MEDIA>/MUSIC/ES_Time Split Up - Toby Tranter.mp3",
                "-af", f"dynaudnorm=f=100:g=5:m=30:p=0.9,acompressor=threshold=-24dB:ratio=3:attack=20:release=250,afade=t=in:d=1.2,afade=t=out:st={DUR - 1.8}:d=1.8",
                "-ar", str(SR), "-ac", "2", "build/music_p.wav"], check=True)
st = np.zeros((int(DUR * SR) + SR, 2), np.float32)
for n, t in E:
    start = n.endswith('@'); n = n.rstrip('@')
    s = load(f"sfx/{n}.wav"); pk = 0 if start else int(np.argmax(np.abs(s).sum(1)))
    a = int(t * SR) - pk
    if a < 0: s = s[-a:]; a = 0
    e = min(len(st), a + len(s)); st[a:e] += s[:e - a] * G[n]
sf.write("build/sfx_stem.wav", st[:int(DUR * SR)], SR)
vl = lufs("build/voice_p.wav"); k = 10 ** (((vl - 6) - lufs("build/sfx_stem.wav")) / 20)
print("voix", vl, "gain effets", round(k, 3))
cfg = {'duration': DUR, 'voice': 'build/voice_p.wav', 'music': 'build/music_p.wav', 'music_start': 0, 'music_gain': 0.6, 'music_under_lu': 19, 'lufs': -14, 'tp': -1.0,
       'out': 'build/mix.wav', 'events': [['build/sfx_stem.wav', 0, k]]}
# le stem est posé à 0 : son pic doit tomber sur 0 → on le décale par son propre pic
s = load('build/sfx_stem.wav'); pk = int(np.argmax(np.abs(s).sum(1))) / SR; cfg['events'] = [['build/sfx_stem.wav', pk, k]]
json.dump(cfg, open('mixyt.json', 'w'), indent=1)
print(subprocess.run(["python3", "mix.py", "mixyt.json"], capture_output=True, text=True).stdout.strip())
