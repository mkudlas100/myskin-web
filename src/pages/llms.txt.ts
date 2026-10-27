// llms.txt – stručný přehled webu pro AI asistenty. Není náhradou SEO, jen nic nestojí.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { salon } from '../data/salon';
import { karina } from '../data/karina';

export const GET: APIRoute = async () => {
  const sluzby = (await getCollection('sluzby')).sort((a, b) => a.data.order - b.data.order);
  const blog = await getCollection('blog');
  const line = (id: string, t: string, d: string) => `- [${t}](${salon.url}/${id}): ${d}`;
  const body = `# ${salon.name}

> Kosmetické studio v Benešově u Prahy (${salon.street}, ${salon.postalCode} ${salon.city}). Permanentní make-up (pudrové obočí, stínované rty, oční linky), kosmetické ošetření pleti, chemický peeling NOON a radiofrekvence. Majitelka ${karina.name}: ${karina.short}

Kontakt: ${salon.phone}, ${salon.email}. Rezervace: ${salon.booking}. Ceník: ${salon.url}/cenik

## Služby
${sluzby.map((s) => line(s.id, s.data.title, s.data.description)).join('\n')}

## Články
${blog.map((p) => line(p.id, p.data.title, p.data.description)).join('\n')}

## O nás
- [${karina.name} a tým](${salon.url}/o-mne): ${karina.jobTitle}
- [Kontakt](${salon.url}/kontakt)
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
