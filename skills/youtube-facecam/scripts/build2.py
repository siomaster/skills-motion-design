# Montage v2 : face cam (déjà dérushée, build/face.mp4) + enregistrement d'écran AVEC la voix, étape par étape.
# Sorties : build2/scr{1,2,3}.mp4 (2560×1440, 30 i/s, muets), build2/v2voice_{n}.wav, build2/timeline.json, build2/words.json
import json, subprocess, numpy as np, soundfile as sf, os
os.makedirs('build2', exist_ok=True)
exec(open('v2keep.py').read())
V2 = "<DISQUE_MEDIA>/EDITING/MaMarque/RAW/3 CHOSES/VIDEO 2.mp4"
SR = 48000; FPS2 = 25
a = sf.read('v2_48.wav')[0].astype(np.float32)
win = int(.01 * SR); rms = np.sqrt(np.convolve(a * a, np.ones(win) / win, 'same'))
def snap(t):
    f0 = round(t * FPS2)
    return min(range(f0 - 1, f0 + 2), key=lambda f: rms[int(f / FPS2 * SR)]) / FPS2
FACE = [(0.0, 42.75), (42.75, 81.20), (81.20, 100.55), (100.55, 126.0)]
G = 0.30
tl, pos = [], 0.0
W2 = json.load(open('v2_words.json')); WF = json.load(open('build/words.json'))
words = []
for k in range(4):
    f0, f1 = FACE[k]
    tl.append({'kind': 'face', 'out0': round(pos, 3), 'src0': f0, 'src1': f1, 'out1': round(pos + f1 - f0, 3)})
    for w in WF:
        if f0 <= w['s'] < f1: words.append({'w': w['w'], 's': round(pos + w['s'] - f0, 3), 'e': round(pos + w['e'] - f0, 3), 'src': 'face'})
    pos += f1 - f0
    if k == 3: break
    S = [S1, S2, S3][k]; pos += G
    segs = []; ap = []
    sp = pos
    for x, y in S:
        x2, y2 = snap(x), snap(y)
        segs.append((x2, y2))
        seg = a[int(x2 * SR):int(y2 * SR)].copy(); fd = int(.008 * SR)
        seg[:fd] *= np.linspace(0, 1, fd); seg[-fd:] *= np.linspace(1, 0, fd); ap.append(seg)
        for w in W2:
            if x2 - 0.02 <= w['s'] < y2: words.append({'w': w['w'], 's': round(pos + w['s'] - x2, 3), 'e': round(pos + min(w['e'], y2) - x2, 3), 'src': f'scr{k+1}'})
        tl.append({'kind': f'scr{k+1}', 'out0': round(pos, 3), 'src0': x2, 'src1': y2, 'out1': round(pos + y2 - x2, 3)})
        pos += y2 - x2
    sf.write(f'build2/v2voice_{k+1}.wav', np.concatenate(ap), SR)
    flt = ''.join(f"[0:v]trim=start={x}:end={y},setpts=PTS-STARTPTS[v{i}];" for i, (x, y) in enumerate(segs))
    flt += ''.join(f'[v{i}]' for i in range(len(segs))) + f'concat=n={len(segs)}:v=1:a=0,fps=30,scale=2560:1440:flags=lanczos[vo]'
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', V2, '-filter_complex', flt, '-map', '[vo]', '-c:v', 'libx264', '-crf', '17', '-preset', 'fast', '-g', '15', '-pix_fmt', 'yuv420p', f'build2/scr{k+1}.mp4'], check=True)
    print(f'scr{k+1}', round(pos - sp, 2), 's', 'début', round(sp, 2))
    pos += G
json.dump(tl, open('build2/timeline.json', 'w'), indent=1)
json.dump(words, open('build2/words.json', 'w'), ensure_ascii=False)
print('total', round(pos, 2))
