# v3 : face cam + écran (voix gardée, dérush doux, actions muettes accélérées) + pause publicitaire avant l'étape 3
import json, subprocess, numpy as np, soundfile as sf, os
os.makedirs('build3', exist_ok=True)
exec(open('v2keep2.py').read())
V2 = "<DISQUE_MEDIA>/EDITING/MaMarque/RAW/3 CHOSES/VIDEO 2.mp4"
AD = "<DOSSIER_PROJET>/RÉSULTATS/Pub_Motion_Design_Opus55_47s_v3.mp4"
SR = 48000; FPS2 = 25
a = sf.read('v2_48.wav')[0].astype(np.float32)
win = int(.01 * SR); rms = np.sqrt(np.convolve(a * a, np.ones(win) / win, 'same'))
def snap(t):
    f0 = round(t * FPS2); return min(range(f0 - 1, f0 + 2), key=lambda f: rms[int(f / FPS2 * SR)]) / FPS2
FACE = [(0.0, 42.75), (42.75, 81.20), (81.20, 100.55), (100.55, 126.0)]
G = 0.30; AD_IN = 2.4; AD_LEN = 47.4; AD_OUT = 1.0
W2 = json.load(open('v2_words.json')); WF = json.load(open('build/words.json'))
tl, words, pos = [], [], 0.0
def face(k):
    global pos
    f0, f1 = FACE[k]
    tl.append({'kind': 'face', 'out0': round(pos, 3), 'src0': f0, 'src1': f1, 'out1': round(pos + f1 - f0, 3)})
    for w in WF:
        if f0 <= w['s'] < f1: words.append({'w': w['w'], 's': round(pos + w['s'] - f0, 3), 'e': round(pos + w['e'] - f0, 3), 'src': 'face'})
    pos += f1 - f0
def scr(k):
    global pos
    S = [S1, S2, S3][k - 1]; pos += G; sp = pos; parts, vf = [], []
    for seg in S:
        x2, y2 = snap(seg[0]), snap(seg[1]); sp_k = seg[2] if len(seg) > 2 else 1
        d = (y2 - x2) / sp_k
        if sp_k == 1:
            s = a[int(x2 * SR):int(y2 * SR)].copy(); fd = int(.008 * SR); s[:fd] *= np.linspace(0, 1, fd); s[-fd:] *= np.linspace(1, 0, fd)
            for w in W2:
                if x2 - 0.02 <= w['s'] < y2: words.append({'w': w['w'], 's': round(pos + w['s'] - x2, 3), 'e': round(pos + min(w['e'], y2) - x2, 3), 'src': f'scr{k}'})
        else:
            s = np.zeros(int(d * SR), np.float32)
        parts.append(s); vf.append((x2, y2, sp_k))
        tl.append({'kind': f'scr{k}', 'out0': round(pos, 3), 'src0': x2, 'src1': y2, 'speed': sp_k, 'out1': round(pos + d, 3)})
        pos += d
    sf.write(f'build3/v2voice_{k}.wav', np.concatenate(parts), SR)
    flt = ''.join(f"[0:v]trim=start={x}:end={y},setpts=(PTS-STARTPTS)/{k_},fps=30[v{i}];" for i, (x, y, k_) in enumerate(vf))
    flt += ''.join(f'[v{i}]' for i in range(len(vf))) + f'concat=n={len(vf)}:v=1:a=0,scale=1920:1080:flags=lanczos[vo]'
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', V2, '-filter_complex', flt, '-map', '[vo]', '-c:v', 'libx264', '-crf', '16', '-preset', 'fast', '-g', '15', '-pix_fmt', 'yuv420p', f'build3/scr{k}.mp4'], check=True)
    print(f'scr{k}', round(pos - sp, 2), 'début', round(sp, 2))
    pos += G
face(0); scr(1); face(1); scr(2)
ad0 = pos; tl.append({'kind': 'ad', 'out0': round(pos, 3), 'in': AD_IN, 'len': AD_LEN, 'out1': round(pos + AD_IN + AD_LEN + AD_OUT, 3)}); pos += AD_IN + AD_LEN + AD_OUT
print('pub', round(ad0, 2), '→', round(pos, 2))
face(2); scr(3); face(3)
json.dump(tl, open('build3/timeline.json', 'w'), indent=1); json.dump(words, open('build3/words.json', 'w'), ensure_ascii=False)
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', AD, '-vn', '-ac', '2', '-ar', str(SR), 'build3/ad.wav'], check=True)
print('total', round(pos, 2))
