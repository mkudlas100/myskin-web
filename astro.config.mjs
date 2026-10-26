// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeCz from './src/lib/rehype-cz.mjs';

// URL bez lomítka na konci a bez .html (Vercel: cleanUrls + trailingSlash false ve vercel.json).
export default defineConfig({
  site: 'https://www.myskin.cz',
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'always' },
  compressHTML: true,
  markdown: { rehypePlugins: [rehypeCz] },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
});
