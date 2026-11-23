# Premier son de chaque fichier (packs de variations), fin au premier silence, crête à −1 dBFS
import subprocess, numpy as np, soundfile as sf
B = "<DISQUE_MEDIA>/SFX/"
L = [("wfront", "WHOOSHS/Whoosh Front.wav", 1.6), ("wcine", "WHOOSHS/Whoosh Cinema.wav", 2.2), ("wdeep", "WHOOSHS/Whoosh Deep Bass.wav", 1.8),
     ("shutter", "Camera Shutter.WAV", 0.8), ("riser", "Riser 1.wav", 3.0), ("bell", "New UI sounds/ES_User Interface, Alert, Mobile Phone, Notification Tone 02 - Epidemic Sound.mp3", 1.5),
     ("deny", "New UI sounds/ES_User Interface, Beep, Error Tone, Soft - Epidemic Sound.mp3", 0.8), ("typing", "Keyboard Clicking.mp3", 3.6),
     ("mclick", "Mouse Click.WAV", 0.4)]
SR = 48000
for n, p, mx in L:
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", B + p, "-f", "f32le", "-ac", "2", "-ar", str(SR), "-"], capture_output=True, check=True).stdout
    a = np.frombuffer(raw, np.float32).reshape(-1, 2).copy()
    env = np.abs(a).max(1); thr = env.max() * 0.03
    on = int(np.argmax(env > thr)); a = a[max(0, on - int(0.01 * SR)):]
    env = np.abs(a).max(1); w = int(0.25 * SR); end = min(len(a), int(mx * SR))
    if n != "typing":
        loud = env > env.max() * 0.01
        for i in range(int(0.05 * SR), end - w, int(0.01 * SR)):
            if not loud[i:i + w].any(): end = i + int(0.05 * SR); break
    a = a[:end]; f = min(len(a) // 4, int(0.06 * SR)); a[-f:] *= np.linspace(1, 0, f)[:, None]
    a *= 10 ** (-1 / 20) / max(1e-6, np.abs(a).max())
    sf.write(f"sfx/{n}.wav", a, SR); print(n, round(len(a) / SR, 2))
