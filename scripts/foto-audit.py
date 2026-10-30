# Audit fotek: kde je která fotka použitá a které se opakují (i vizuálně stejné pod jiným názvem).
# Spuštění: python3 scripts/foto-audit.py   (vyžaduje Pillow)
import glob, os, re
from collections import defaultdict
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
files = glob.glob('src/assets/img/stock/*') + glob.glob('src/assets/img/foto/*')
files = [f for f in files if re.search(r'\.(jpe?g|png|webp)$', f)]
name = lambda f: re.sub(r'\.(jpe?g|png|webp)$', '', os.path.basename(f))

uses = defaultdict(list)
for f in glob.glob('src/content/**/*.md', recursive=True):
    for m in re.finditer(r'^\s*-?\s*(?:image|before|after):\s*([a-z0-9-]+)\s*$', open(f, encoding='utf8').read(), re.M):
        uses[m.group(1)].append(f)
for f in glob.glob('src/pages/**/*', recursive=True) + glob.glob('src/components/*') + glob.glob('src/data/*') + glob.glob('src/layouts/*'):
    if os.path.isdir(f): continue
    s = open(f, encoding='utf8').read()
    for m in re.finditer(r"assets/img/(?:stock|foto)/([a-z0-9-]+)\.", s): uses[m.group(1)].append(f)
    for m in re.finditer(r"img\(\s*['\"]([a-z0-9-]+)['\"]", s): uses[m.group(1)].append(f)

def ahash(p):
    i = Image.open(p).convert('L').resize((9, 8))
    px = list(i.getdata())
    return sum(1 << k for k in range(64) if px[(k // 8) * 9 + k % 8] > px[(k // 8) * 9 + k % 8 + 1])
h = {name(f): ahash(f) for f in files}
groups = []
for a in h:
    g = next((g for g in groups if bin(h[g[0]] ^ h[a]).count('1') <= 6), None)
    (g.append(a) if g else groups.append([a]))

problems = 0
for g in groups:
    where = [(n, w) for n in g for w in uses.get(n, [])]
    if len(where) > 1:
        problems += 1
        print('OPAKUJE SE:', ' = '.join(g))
        for n, w in where: print('   ', n, '→', w)
unused = sorted(n for g in groups for n in g if not any(uses.get(x) for x in g))
print('\nNepoužité (žádný vizuální dvojník není použitý):', ', '.join(unused) or '—')
print(f'\nOpakujících se fotek: {problems}')
