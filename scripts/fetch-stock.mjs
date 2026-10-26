// Stažení ilustračních fotek z Unsplash (spouští se v GitHub Actions, kde je internet).
// Už stažené soubory přeskočí. Šířka 2000 px stačí i pro velké monitory.
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import path from 'node:path';

const cfg = JSON.parse(await readFile(new URL('./stock.json', import.meta.url), 'utf8'));
await mkdir(cfg.outDir, { recursive: true });
const exists = (p) => access(p).then(() => true, () => false);
let ok = 0, failed = [];
for (const img of cfg.images) {
  const target = path.join(cfg.outDir, img.file);
  if (await exists(target)) continue;
  const url = `https://unsplash.com/photos/${img.id}/download?force=true&w=2000`;
  try {
    const res = await fetch(url, { redirect: 'follow', headers: { 'User-Agent': 'myskin-web-stock-fetch' } });
    const type = res.headers.get('content-type') || '';
    if (!res.ok || !type.startsWith('image/')) throw new Error(`${res.status} ${type}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(target, buf);
    console.log(`OK  ${img.file}  ${(buf.length / 1024).toFixed(0)} kB  <- ${res.url}`);
    ok++;
  } catch (e) { failed.push(img.file); console.log(`ERR ${img.file} ${e.message}`); }
}
console.log(`\nStaženo: ${ok}, chyby: ${failed.length}`);
