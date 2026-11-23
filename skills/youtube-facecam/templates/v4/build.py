s = open('src/index.src').read(); f = open('film.js').read()
open('index.html', 'w').write(s.replace('<script src="film.js"></script>', '<script>\n' + f + '\n</script>'))
