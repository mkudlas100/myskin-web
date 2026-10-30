// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeCz from './src/lib/rehype-cz.mjs';
import { readdirSync, readFileSync } from 'node:fs';

// lastmod v sitemapě = datum „updated“ z obsahu (služby, články, stránky); ostatní stránky datum sestavení.
const lastmod = {};
for (const dir of ['sluzby', 'blog', 'stranky']) {
  for (const f of readdirSync(`./src/content/${dir}`)) {
    const m = readFileSync(`./src/content/${dir}/${f}`, 'utf8').match(/^updated:\s*(\S+)/m);
    if (m) lastmod[f.replace(/\.md$/, '')] = new Date(m[1]).toISOString();
  }
}
// Skryté stránky (data/url-inventory.json → hidden) do sitemapy nepatří.
const hidden = JSON.parse(readFileSync('./data/url-inventory.json', 'utf8')).hidden ?? [];
const buildDate = new Date().toISOString().slice(0, 10); // jen den, ať se lastmod nemění s každým sestavením

// URL bez lomítka na konci a bez .html (Vercel: cleanUrls + trailingSlash false ve vercel.json).
export default defineConfig({
  site: 'https://www.myskin.cz',
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'always' },
  compressHTML: true,
  markdown: { rehypePlugins: [rehypeCz] },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !hidden.some((h) => new URL(page).pathname.replace(/\/$/, '') === h),
      serialize: (item) => {
        const slug = new URL(item.url).pathname.replace(/^\/|\/$/g, '');
        return { ...item, lastmod: lastmod[slug] ?? buildDate };
      },
    }),
  ],
});
