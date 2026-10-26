// Jednorázové stažení obrázků ze současného webu (úložiště Brizy) do repozitáře.
// Spouští se v GitHub Actions (workflow fetch-images), kde je přístup k internetu.
// Už stažené soubory přeskočí. Nejdřív zkusí originál, pak velkou zmenšenou verzi.
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import path from 'node:path';

const cfg = JSON.parse(await readFile(new URL('./images.json', import.meta.url), 'utf8'));
await mkdir(cfg.outDir, { recursive: true });

const exists = (p) => access(p).then(() => true, () => false);
let ok = 0, skipped = 0, failed = [];

for (const img of cfg.images) {
  const target = path.join(cfg.outDir, img.file);
  if (await exists(target)) { skipped++; continue; }
  const candidates = img.url
    ? [img.url]
    : [`${cfg.base}/original/${img.hash}/${img.name}`, `${cfg.base}/iW=2400&iH=any/${img.hash}/${img.name}`];
  let saved = false;
  for (const url of candidates) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'myskin-web-image-fetch' } });
      const type = res.headers.get('content-type') || '';
      if (!res.ok || !(type.startsWith('image/') || type.includes('svg'))) continue;
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 200) continue;
      await writeFile(target, buf);
      console.log(`OK  ${img.file}  ${(buf.length / 1024).toFixed(0)} kB  <- ${url}`);
      ok++; saved = true; break;
    } catch (e) { /* zkusit další adresu */ }
  }
  if (!saved) { failed.push(img.file); console.log(`ERR ${img.file}`); }
}
console.log(`\nStaženo: ${ok}, přeskočeno: ${skipped}, chyby: ${failed.length}`);
if (failed.length) { console.log('Nepodařilo se: ' + failed.join(', ')); process.exitCode = 1; }
