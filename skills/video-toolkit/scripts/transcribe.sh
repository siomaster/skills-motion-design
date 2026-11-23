#!/usr/bin/env bash
# transcribe.sh <video> <outdir> [mots-clés séparés par des virgules]   (langue : LANG_STT=fr par défaut ; LANG_STT=en, ou LANG_STT=auto pour détecter)
# → <outdir>/stt.json (Deepgram nova-3 fr) + <outdir>/segments.txt (transcription découpée aux pauses, avec index des mots)
set -euo pipefail
V="$1"; O="$2"; KW="${3:-}"; mkdir -p "$O"
source ~/.zshrc >/dev/null 2>&1 || true
ffmpeg -v error -y -i "$V" -map 0:a:0 -vn -ac 1 -ar 16000 "$O/voice16.wav"
L="${LANG_STT:-fr}"; [ "$L" = auto ] && LQ="detect_language=true" || LQ="language=$L"
Q="model=nova-3&$LQ&punctuate=true&smart_format=true&filler_words=true"
IFS=',' read -ra KS <<< "$KW"; for k in "${KS[@]:-}"; do [ -n "$k" ] && Q="$Q&keyterm=$(python3 -c "import urllib.parse,sys;print(urllib.parse.quote(sys.argv[1]))" "$k")"; done
curl -s -X POST "https://api.deepgram.com/v1/listen?$Q" -H "Authorization: Token $DEEPGRAM_API_KEY" -H "Content-Type: audio/wav" --data-binary @"$O/voice16.wav" > "$O/stt.json"
python3 - "$O" <<'PY'
import json,sys
O=sys.argv[1]; W=json.load(open(O+'/stt.json'))['results']['channels'][0]['alternatives'][0]['words']
seg=[];cur=[]
for i,w in enumerate(W):
    if cur and w['start']-W[i-1]['end']>0.45: seg.append(cur);cur=[]
    cur.append(i)
if cur: seg.append(cur)
with open(O+'/segments.txt','w') as f:
    for k,s in enumerate(seg):
        f.write(f"[{k}] mots {s[0]}-{s[-1]} | {W[s[0]]['start']:.2f}-{W[s[-1]]['end']:.2f} : "+' '.join(W[i]['punctuated_word'] for i in s)+"\n")
print(open(O+'/segments.txt').read())
PY
