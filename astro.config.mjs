// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// URL bez lomítka na konci a bez .html (Vercel: cleanUrls + trailingSlash false ve vercel.json).
export default defineConfig({
  site: 'https://www.myskin.cz',
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'always' },
  compressHTML: true,
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
});
