#!/usr/bin/env python3
"""voix_timing.py <voix.mp3|wav> [langue=fr]
Transcrit la voix off avec Deepgram (nova-3, horodatage des mots) et imprime :
  - la durée de la voix et la durée conseillée du film,
  - la table des phrases [début–fin] "texte" (coupure aux ponctuations et aux pauses >= 0,35 s),
  - les mots porteurs (>= 6 lettres) avec leur instant, pour caler les mots-clés à l'écran.
Clé : DEEPGRAM_API_KEY dans l'environnement ou dans ~/.zshrc."""
import json, os, re, subprocess, sys, urllib.request

def key():
    k = os.environ.get('DEEPGRAM_API_KEY')
    if k: return k
    try:
        m = re.search(r'DEEPGRAM_API_KEY=["\']?([^"\'\s]+)', open(os.path.expanduser('~/.zshrc')).read())
        return m.group(1) if m else None
    except OSError: return None

def main():
    if len(sys.argv) < 2: print(__doc__); sys.exit(1)
    path, lang = sys.argv[1], (sys.argv[2] if len(sys.argv) > 2 else 'fr')
    k = key()
    if not k: sys.exit('DEEPGRAM_API_KEY introuvable')
    data = open(path, 'rb').read()
    ctype = 'audio/wav' if path.lower().endswith('.wav') else 'audio/mpeg'
    req = urllib.request.Request(f'https://api.deepgram.com/v1/listen?model=nova-3&language={lang}&smart_format=true&punctuate=true', data=data, headers={'Authorization': 'Token ' + k, 'Content-Type': ctype})
    res = json.load(urllib.request.urlopen(req, timeout=180))
    words = res['results']['channels'][0]['alternatives'][0]['words']
    dur = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', path], capture_output=True, text=True).stdout or 0)
    print(f'Voix : {dur:.2f} s  ·  film conseillé : {dur + 1.5:.1f} s  ·  {len(words)} mots  ·  débit {len(words) / max(dur, 1):.2f} mots/s\n')
    print('PHRASES')
    cur = []
    for i, w in enumerate(words):
        cur.append(w)
        txt = w.get('punctuated_word', w['word'])
        gap = (words[i + 1]['start'] - w['end']) if i + 1 < len(words) else 9
        if re.search(r'[.!?…:;]$', txt) or gap >= 0.35 or (re.search(r',$', txt) and len(cur) >= 7):
            print(f"[{cur[0]['start']:6.2f}–{cur[-1]['end']:6.2f}] \"{' '.join(x.get('punctuated_word', x['word']) for x in cur)}\"")
            cur = []
    print('\nMOTS PORTEURS')
    print('  '.join(f"{w.get('punctuated_word', w['word']).strip('.,!?;:')}@{w['start']:.2f}" for w in words if len(w['word']) >= 6))
    out = os.path.join(os.getcwd(), os.path.splitext(os.path.basename(path))[0] + '_mots.json')
    try:
        json.dump([{'w': w.get('punctuated_word', w['word']), 's': w['start'], 'e': w['end']} for w in words], open(out, 'w'), ensure_ascii=False)
        print(f'\nTable complète des mots : {out}')
    except OSError:
        pass

if __name__ == '__main__':
    main()
