import subprocess, sys
V = "<DISQUE_MEDIA>/EDITING/MaMarque/RAW/3 CHOSES/VIDEO 2.mp4"
C = [("remotion", 1.0, 7.0, 1.5), ("github", 33.0, 39.0, 1.5), ("hyper", 56.5, 60.5, 1.0), ("gsap", 96.0, 104.0, 2.0),
     ("folder", 201.0, 216.0, 2.5), ("prevosk", 240.0, 249.0, 1.5), ("impfold", 436.0, 449.0, 2.5),
     ("impprev", 480.0, 492.0, 1.0), ("inspi", 576.0, 590.0, 2.5)]
for n, a, b, sp in C:
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", str(a), "-t", str(b - a), "-i", V, "-an",
                    "-vf", f"setpts=PTS/{sp},fps=30,scale=2560:1440:flags=lanczos", "-c:v", "libx264", "-crf", "16",
                    "-preset", "fast", "-g", "15", "-pix_fmt", "yuv420p", f"clips/{n}.mp4"], check=True)
    d = (b - a) / sp
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", str(d / 2), "-i", f"clips/{n}.mp4", "-frames:v", "1", "-vf", "scale=1280:-1", f"clips/{n}.jpg"], check=True)
    print(n, round(d, 2))
