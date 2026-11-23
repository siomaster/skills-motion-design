# Voix maîtresse v3 : face cam + voix de l'écran (même sonie) + son de la pub (même sonie) pendant la pause
import json, subprocess, numpy as np, soundfile as sf
SR = 48000; TOTAL = 473.0; AD_T = 324.61
def lufs(p): r = subprocess.run(['ffmpeg', '-i', p, '-af', 'ebur128', '-f', 'null', '-'], capture_output=True, text=True).stderr; return float(r.split('I:')[-1].split('LUFS')[0])
TL = json.load(open('build3/timeline.json'))
target = lufs('build/voice_p.wav')
face = sf.read('build/voice_p.wav')[0]; face = face if face.ndim == 1 else face.mean(1)
out = np.zeros((int((TOTAL + 1) * SR), 2))
for k in (1, 2, 3):
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', f'build3/v2voice_{k}.wav', '-af', 'highpass=f=80,afftdn=nf=-42,equalizer=f=3500:t=q:w=1.2:g=2,acompressor=threshold=-22dB:ratio=3:attack=6:release=120:makeup=4dB', '-ar', str(SR), '-ac', '1', f'build3/v2p_{k}.wav'], check=True)
    x = sf.read(f'build3/v2p_{k}.wav')[0] * 10 ** ((target - lufs(f'build3/v2p_{k}.wav')) / 20)
    t0 = [s for s in TL if s['kind'] == f'scr{k}'][0]['out0']; fd = int(.25 * SR); x[-fd:] *= np.linspace(1, 0, fd)
    i = int(t0 * SR); out[i:i + len(x)] += x[:len(out) - i, None]
for s in TL:
    if s['kind'] != 'face': continue
    x = face[int(s['src0'] * SR):int(s['src1'] * SR)].copy(); fd = int(.012 * SR); x[:fd] *= np.linspace(0, 1, fd); x[-fd:] *= np.linspace(1, 0, fd)
    i = int(s['out0'] * SR); out[i:i + len(x)] += x[:, None]
ad = sf.read('build3/ad.wav')[0]; ad = ad * 10 ** ((target + 1 - lufs('build3/ad.wav')) / 20)
i = int(AD_T * SR); out[i:i + len(ad)] += ad[:len(out) - i]
sf.write('build3/voice_master.wav', out[:int(TOTAL * SR)].astype(np.float32), SR)
print('cible', target, 'maître', lufs('build3/voice_master.wav'))
