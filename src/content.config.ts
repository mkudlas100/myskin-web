// Obsah webu: služby a články jako Markdown v src/content/. Adresa = název souboru (slug).
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const faq = z.array(z.object({ q: z.string(), a: z.string() })).default([]);

const sluzby = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/sluzby' }),
  schema: z.object({
    title: z.string(),                 // krátký název (menu, drobečky, karty)
    seoTitle: z.string(),              // <title> 50–60 znaků
    description: z.string(),           // meta description 140–160 znaků
    h1: z.string(),
    perex: z.string(),                 // první odstavec – odpověď hned na začátku
    kind: z.enum(['pmu', 'pece', 'dalsi', 'kurz', 'rozcestnik']),
    order: z.number().default(50),
    image: z.string(),                 // soubor v src/assets/img/foto (salon) nebo stock (ilustrační)
    imageAlt: z.string(),
    stipple: z.enum(['brow', 'lips', 'liner']).optional(),
    facts: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    prices: z.string().optional(),     // id skupiny v ceníku nebo adresa služby
    children: z.array(z.string()).default([]),   // rozcestník: podstránky
    services: z.array(z.string()).default([]),   // související služby
    posts: z.array(z.string()).default([]),      // související články
    // Výsledky před a po – jen jako ukázka pro zákaznice, ne jako tematická fotka.
    results: z.array(z.object({
      before: z.string().optional(),   // dvojice fotek před / po
      after: z.string().optional(),
      image: z.string().optional(),    // nebo jedna fotka (už složené před a po, nebo výsledek)
      caption: z.string(),
    })).default([]),
    faq,
    updated: z.coerce.date(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string(),
    description: z.string(),
    perex: z.string(),                 // odpověď hned v první větě
    listDescription: z.string(),       // text na kartě ve výpisu (jiný než description)
    category: z.enum(['pmu', 'plet', 'prirodni', 'telo']),
    published: z.coerce.date().optional(), // jen skutečně známé datum vydání
    updated: z.coerce.date(),
    image: z.string(),
    imageAlt: z.string(),
    services: z.array(z.string()).min(1), // první = hlavní služba k tématu
    posts: z.array(z.string()).default([]),
    faq,
  }),
});

const stranky = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/stranky' }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string(),
    description: z.string(),
    h1: z.string(),
    perex: z.string().optional(),
    updated: z.coerce.date(),
  }),
});

export const collections = { sluzby, blog, stranky };
