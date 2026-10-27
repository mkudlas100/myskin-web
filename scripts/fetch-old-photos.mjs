// Stažení všech fotek ze starého webu (úložiště Brizy) – originál, jinak největší zmenšenina.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
const cfg = JSON.parse(await readFile(new URL('./old-photos.json', import.meta.url), 'utf8'));
const out = 'foto-stary-web';
await mkdir(out, { recursive: true });
let ok = 0; const failed = [];
for (const img of cfg.images) {
  if (img.name.endsWith('.svg')) continue;
  const base = img.noname ? `${img.hash}.${img.name.split('.').pop()}` : `${img.hash}/${img.name}`;
  const cands = [`${cfg.base}/original/${base}`, `${cfg.base}/iW=2400&iH=any/${base}`, ...(img.maxw ? [`${cfg.base}/iW=${img.maxw}&iH=any/${base}`] : [])];
  let saved = false;
  for (const url of cands) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'myskin-foto-migrace' } });
      const type = res.headers.get('content-type') || '';
      if (!res.ok || !type.startsWith('image/')) continue;
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 500) continue;
      await writeFile(`${out}/${img.hash.slice(0, 8)}__${img.name}`, buf);
      console.log(`OK ${img.name} ${(buf.length / 1024) | 0} kB <- ${url}`); ok++; saved = true; break;
    } catch {}
  }
  if (!saved) { failed.push(img.name); console.log(`ERR ${img.hash} ${img.name}`); }
}
console.log(`Staženo ${ok}, chyby ${failed.length}`);
