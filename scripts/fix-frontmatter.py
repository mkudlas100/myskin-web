# Uvozovky kolem hodnot ve frontmatteru, které obsahují dvojtečku nebo jiné znaky problematické pro YAML.
import re, sys, glob
pat = re.compile(r'^(\s*(?:- )?[A-Za-z]+): (.+)$')
for f in glob.glob('src/content/**/*.md', recursive=True):
    s = open(f, encoding='utf-8').read()
    if not s.startswith('---\n'): continue
    end = s.index('\n---', 4)
    fm, body = s[4:end], s[end:]
    out = []
    for line in fm.split('\n'):
        m = pat.match(line)
        if m:
            k, v = m.groups()
            if not (v.startswith('"') or v.startswith('[') or re.fullmatch(r'[\d.\-]+|true|false', v)) and (': ' in v or v[0] in '>|*&!%@`#{' or ' #' in v):
                v = '"' + v.replace('\\', '\\\\').replace('"', '\\"') + '"'
                line = f'{k}: {v}'
        out.append(line)
    new = '---\n' + '\n'.join(out) + body
    if new != s:
        open(f, 'w', encoding='utf-8').write(new); print('opraveno', f)
