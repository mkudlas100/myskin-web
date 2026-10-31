// Kontrola webu před nasazením (skill web-qa, část A). Spouští se po `astro build`.
// Použití: node scripts/qa.mjs   → vypíše tabulku a skončí s kódem 1, pokud najde chybu.
import { readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const DIST = 'dist';
const SITE = 'https://www.myskin.cz';
const inv = JSON.parse(await readFile('data/url-inventory.json', 'utf8'));
const vercel = JSON.parse(await readFile('vercel.json', 'utf8'));

const errors = [];
const warnings = [];
const ok = [];

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

const files = await walk(DIST);
const htmlFiles = files.filter((f) => f.endsWith('.html'));
const toUrl = (f) => {
  let u = '/' + path.relative(DIST, f).replace(/\\/g, '/').replace(/\.html$/, '');
  if (u === '/index') u = '/';
  return u;
};
const built = new Set(htmlFiles.map(toUrl));
const planned = new Set([...inv.keep, ...inv.legal]);
const hidden = new Set(inv.hidden || []); // skryté stránky: noindex, mimo sitemapu, žádný odkaz z webu
const redirects = Object.fromEntries((vercel.redirects || []).map((r) => [r.source, r.destination]));

const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\s${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, 'i'));
  return m ? (m[2] ?? m[3]) : null;
};
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');

// 2. Zachování URL
for (const u of inv.keep) {
  if (!built.has(u)) warnings.push(`URL ${u} zatím není postavená (plánovaná stránka)`);
}
for (const [from, to] of Object.entries(inv.redirect)) {
  if (redirects[from] !== to) errors.push(`Přesměrování ${from} → ${to} chybí nebo nesedí ve vercel.json (je: ${redirects[from] ?? '—'})`);
  if (to === '/') errors.push(`Přesměrování ${from} vede na úvod`);
  if (redirects[to]) errors.push(`Řetěz přesměrování: ${from} → ${to} → ${redirects[to]}`);
}
for (const u of inv.gone) {
  if (built.has(u)) errors.push(`Zrušená URL ${u} se pořád generuje`);
  if (redirects[u]) errors.push(`Zrušená URL ${u} má přesměrování (má vracet 404)`);
}
ok.push(`URL: postaveno ${[...built].filter((u) => planned.has(u)).length}/${planned.size} plánovaných, přesměrování ${Object.keys(inv.redirect).length}, zrušeno ${inv.gone.length}`);

// 3.–6. Kontrola každé stránky
const titles = new Map();
const descs = new Map();
const forbidden = [/DOPLNIT/i, /\bTODO\b/, /lorem ipsum/i, /\bSAMPLE\b/, /localhost/i];
for (const f of htmlFiles) {
  const url = toUrl(f);
  const html = await readFile(f, 'utf8');
  const is404 = url === '/404';
  const where = `[${url}]`;

  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) errors.push(`${where} počet H1 = ${h1}`);

  const title = decode((html.match(/<title>([^<]*)<\/title>/) || [])[1] || '');
  if (!title) errors.push(`${where} chybí title`);
  else if (!is404 && (title.length < 30 || title.length > 60)) warnings.push(`${where} title má ${title.length} znaků (doporučeno 50–60): ${title}`);
  titles.set(title, [...(titles.get(title) || []), url]);

  const descTag = (html.match(/<meta name="description"[^>]*>/) || [])[0];
  const desc = descTag ? decode(attr(descTag, 'content') || '') : '';
  if (!desc) errors.push(`${where} chybí meta description`);
  else if (desc.length < 120 || desc.length > 160) warnings.push(`${where} description má ${desc.length} znaků (doporučeno 140–160)`);
  descs.set(desc, [...(descs.get(desc) || []), url]);

  const canonTag = (html.match(/<link rel="canonical"[^>]*>/) || [])[0];
  const canon = canonTag ? attr(canonTag, 'href') : null;
  const expected = url === '/' ? `${SITE}/` : `${SITE}${url}`;
  if (canon !== expected) errors.push(`${where} canonical ${canon} ≠ ${expected}`);

  if (!/<html lang="cs"/.test(html)) errors.push(`${where} chybí lang="cs"`);
  for (const p of ['og:title', 'og:description', 'og:image', 'og:url']) {
    if (!html.includes(`property="${p}"`)) errors.push(`${where} chybí ${p}`);
  }
  const ogImg = attr((html.match(/<meta property="og:image"[^>]*>/) || [''])[0], 'content') || '';
  if (ogImg && !ogImg.startsWith(SITE)) errors.push(`${where} og:image není absolutní na ${SITE}: ${ogImg}`);

  const noindex = /<meta name="robots" content="[^"]*noindex/.test(html);
  if (noindex && !is404 && !hidden.has(url)) errors.push(`${where} má noindex`);
  if (!noindex && hidden.has(url)) errors.push(`${where} skrytá stránka nemá noindex`);
  if (!noindex && is404) errors.push(`${where} 404 nemá noindex`);

  for (const img of html.match(/<img\b[^>]*>/g) || []) {
    if (!/\salt(?=[\s=>\/])/i.test(img)) errors.push(`${where} obrázek bez alt: ${img.slice(0, 90)}`);
    if (!attr(img, 'width') || !attr(img, 'height')) {
      if (!/<dialog/.test(html) || attr(img, 'src')) errors.push(`${where} obrázek bez width/height: ${img.slice(0, 90)}`);
    }
  }

  const text = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ');
  for (const re of forbidden) if (re.test(text) || re.test(attr(html, 'content') || '')) errors.push(`${where} obsahuje zakázaný řetězec ${re}`);
  if (/pages\.dev|vercel\.app/.test(canon || '') || /vercel\.app/.test(ogImg)) errors.push(`${where} canonical/og ukazuje na náhledovou doménu`);

  // JSON-LD
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (blocks.length !== 1) errors.push(`${where} počet bloků JSON-LD = ${blocks.length} (má být 1 @graph)`);
  for (const b of blocks) {
    try {
      const j = JSON.parse(b[1]);
      const nodes = j['@graph'] || [];
      const types = nodes.map((n) => n['@type']);
      const biz = nodes.filter((n) => ['BeautySalon', 'LocalBusiness', 'Organization'].includes(n['@type']));
      if (biz.length > 1) errors.push(`${where} více uzlů firmy v JSON-LD`);
      for (const n of biz) for (const k of ['name', 'address', 'telephone', 'url']) if (!n[k]) errors.push(`${where} BeautySalon bez ${k}`);
      if (/DOPLNIT|TODO/.test(b[1])) errors.push(`${where} JSON-LD obsahuje zástupný text`);
      ok.push(`${where} JSON-LD: ${types.join(', ')}`);
    } catch (e) { errors.push(`${where} JSON-LD nejde parsovat: ${e.message}`); }
  }

  // Interní odkazy
  for (const a of html.match(/<a\b[^>]*>/g) || []) {
    const href = attr(a, 'href');
    if (href && href.startsWith('https://noona.app/') && attr(a, 'target') !== '_blank') errors.push(`${where} odkaz do Noony se neotevírá v novém okně`);
    if (!href || href.startsWith('#') || /^(https?:|mailto:|tel:)/.test(href)) {
      if (href && href.startsWith('#') && href.length > 1 && !html.includes(`id="${href.slice(1)}"`)) errors.push(`${where} kotva ${href} nemá cíl`);
      continue;
    }
    const target = href.replace(/[?#].*$/, '').replace(/\/$/, '') || '/';
    if (hidden.has(target) && target !== url) errors.push(`${where} odkazuje na skrytou stránku ${target}`);
    if (inv.gone.includes(target)) errors.push(`${where} odkaz na zrušenou URL ${target}`);
    else if (redirects[target]) warnings.push(`${where} odkaz na přesměrovanou URL ${target} (odkazovat rovnou na ${redirects[target]})`);
    else if (!built.has(target) && !planned.has(target) && !existsSync(path.join(DIST, target))) errors.push(`${where} odkaz na neexistující URL ${target}`);
  }
  // src obrázků a skriptů
  for (const m of html.matchAll(/\s(?:src|srcset)="([^"]+)"/g)) {
    for (const part of m[1].split(',')) {
      const s = part.trim().split(/\s+/)[0];
      if (s.startsWith('/') && !existsSync(path.join(DIST, decodeURIComponent(s.split('?')[0])))) errors.push(`${where} chybí soubor ${s}`);
    }
  }
}
for (const [t, urls] of titles) if (t && urls.length > 1) errors.push(`Duplicitní title na ${urls.join(', ')}`);
for (const [d, urls] of descs) if (d && urls.length > 1) errors.push(`Duplicitní description na ${urls.join(', ')}`);

// 7. Sitemap a robots
const sm = existsSync(`${DIST}/sitemap-0.xml`) ? await readFile(`${DIST}/sitemap-0.xml`, 'utf8') : '';
const smUrls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(SITE, '') || '/');
for (const u of smUrls) {
  const p = u === '/' ? '/' : u.replace(/\/$/, '');
  if (!built.has(p)) errors.push(`Sitemap obsahuje nepostavenou URL ${u}`);
  if (inv.gone.includes(p) || redirects[p]) errors.push(`Sitemap obsahuje zrušenou/přesměrovanou URL ${u}`);
  if (p === '/404') errors.push('Sitemap obsahuje 404');
  if (hidden.has(p)) errors.push(`Sitemap obsahuje skrytou stránku ${u}`);
}
ok.push(`Sitemap: ${smUrls.length} URL`);
const robots = existsSync(`${DIST}/robots.txt`) ? await readFile(`${DIST}/robots.txt`, 'utf8') : '';
if (!/Sitemap:\s*https:\/\/www\.myskin\.cz\/sitemap-index\.xml/.test(robots)) errors.push('robots.txt neodkazuje na sitemap-index.xml');
if (/Disallow:\s*\/\s*$/m.test(robots)) errors.push('robots.txt blokuje celý web');

// Výstup
const line = (s, t) => console.log(`${s} ${t}`);
console.log(`\n== Kontrola webu (${htmlFiles.length} stránek) ==`);
ok.forEach((t) => line('✅', t));
warnings.forEach((t) => line('⚠️ ', t));
errors.forEach((t) => line('❌', t));
console.log(`\nChyby: ${errors.length} · Upozornění: ${warnings.length}`);
if (errors.length) process.exitCode = 1;
