# Dérush de la face cam : coupe les hésitations, resserre les pauses, cale les coupes sur des images
# au minimum d'énergie, fondus audio de 8 ms aux jointures. Sorties : build/face.mp4, build/voice.wav, build/map.json, build/words.json
import json, subprocess, numpy as np, sys
SRC = "<DISQUE_MEDIA>/EDITING/MaMarque/RAW/3 CHOSES/VIDEO PRINCIPALE.mp4"
FPS = 30
SR = 48000
# (début, fin) source, en secondes, avant affinage
KEEP = [(0.30, 36.133), (36.94, 63.78), (64.12, 92.41), (93.93, 96.36), (96.70, 110.92),
        (111.20, 116.56), (117.40, 126.40), (126.80, 130.50)]
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", SRC, "-vn", "-ac", "1", "-ar", str(SR), "-f", "f32le", "build/src.f32"], check=True)
a = np.fromfile("build/src.f32", dtype=np.float32)
win = int(0.010 * SR)
rms = np.sqrt(np.convolve(a * a, np.ones(win) / win, mode="same"))

def snap(t, rng=3):
    # image la plus proche (±rng) dont l'audio est le plus calme
    f0 = round(t * FPS)
    best = min(range(f0 - rng, f0 + rng + 1), key=lambda f: rms[int(f / FPS * SR)])
    return best

segs = []
for s, e in KEEP:
    fs = round(s * FPS) if s in (0.30, 117.40, 36.94) else snap(s)
    fe = round(e * FPS) if e in (36.133, 130.50) else snap(e)
    segs.append((fs, fe))
out, pos = [], 0
for fs, fe in segs:
    out.append({"src0": fs / FPS, "src1": fe / FPS, "out0": pos / FPS, "out1": (pos + fe - fs) / FPS})
    pos += fe - fs
total = pos / FPS
# audio
fade = int(0.008 * SR)
parts = []
for fs, fe in segs:
    x = a[int(fs / FPS * SR):int(fe / FPS * SR)].copy()
    x[:fade] *= np.linspace(0, 1, fade); x[-fade:] *= np.linspace(1, 0, fade)
    parts.append(x)
v = np.concatenate(parts)
# petits creux de 4 ms aux coupes déjà présentes dans la source (anti-clic)
for c in [5.4, 13.7, 19.433, 21.867, 25.767, 29.0, 41.333, 43.733, 57.267, 66.2, 74.267, 77.033, 78.6, 82.633, 88.067, 100.2, 109.5, 111.033, 119.867, 122.033]:
    for sg in out:
        if sg["src0"] < c < sg["src1"]:
            i = int((sg["out0"] + c - sg["src0"]) * SR); d = int(0.004 * SR)
            v[i - d:i] *= np.linspace(1, 0.15, d); v[i:i + d] *= np.linspace(0.15, 1, d)
v.astype(np.float32).tofile("build/voice.f32")
subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "1", "-i", "build/voice.f32", "build/voice.wav"], check=True)
# vidéo
flt = "".join(f"[0:v]trim=start_frame={fs}:end_frame={fe},setpts=PTS-STARTPTS[v{i}];" for i, (fs, fe) in enumerate(segs))
flt += "".join(f"[v{i}]" for i in range(len(segs))) + f"concat=n={len(segs)}:v=1:a=0,fps={FPS}[vo]"
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", SRC, "-i", "build/voice.wav", "-filter_complex", flt, "-map", "[vo]", "-map", "1:a",
                "-c:v", "libx264", "-crf", "14", "-preset", "fast", "-g", "15", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "256k", "build/face.mp4"], check=True)
def s2o(t):
    for sg in out:
        if sg["src0"] - 1e-3 <= t <= sg["src1"] + 1e-3:
            return sg["out0"] + t - sg["src0"]
    return None
W = json.load(open("main_mots.json"))
ow = []
for w in W:
    s, e = s2o(w["s"]), s2o(w["e"])
    if s is not None and e is not None:
        ow.append({"w": w["w"], "s": round(s, 3), "e": round(e, 3), "src": w["s"]})
json.dump({"total": total, "segs": out}, open("build/map.json", "w"), indent=1)
json.dump(ow, open("build/words.json", "w"), ensure_ascii=False)
print("total", total)
for sg in out: print(sg)
