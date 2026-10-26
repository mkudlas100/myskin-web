// Pomocné funkce pro obsah: obrázky podle názvu, rubriky blogu, vazby mezi stránkami.
import type { ImageMetadata } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';

const stock = import.meta.glob<{ default: ImageMetadata }>('../assets/img/stock/*.{jpg,jpeg,png,webp}', { eager: true });
export function img(name: string): ImageMetadata {
  const hit = Object.entries(stock).find(([p]) => p.split('/').pop()!.replace(/\.(jpe?g|png|webp)$/, '') === name.replace(/\.(jpe?g|png|webp)$/, ''));
  if (!hit) throw new Error(`Chybí obrázek ${name} v src/assets/img/stock`);
  return hit[1].default;
}

export const rubriky = {
  pmu: { title: 'Permanentní make-up', href: '/blog-permanentni-make-up' },
  plet: { title: 'Péče o pleť', href: '/tipy-blog' },
  prirodni: { title: 'Přírodní kosmetika', href: '/prirodni-produkty-blog' },
  telo: { title: 'Depilace a tělo', href: '/blog-myskin' },
} as const;

export type Sluzba = CollectionEntry<'sluzby'>;
export type Clanek = CollectionEntry<'blog'>;

export async function allPosts() {
  return (await getCollection('blog')).sort((a, b) => +(b.data.published ?? b.data.updated) - +(a.data.published ?? a.data.updated) || a.data.title.localeCompare(b.data.title, 'cs'));
}
export async function allServices() {
  return (await getCollection('sluzby')).sort((a, b) => a.data.order - b.data.order);
}

/** Najde služby/články podle slugů; chybějící slug = chyba buildu (žádný rozbitý odkaz). */
export function pick<T extends { id: string }>(list: T[], ids: string[], where: string): T[] {
  const out: T[] = [];
  for (const id of ids) {
    const hit = list.find((x) => x.id === id);
    if (hit) out.push(hit);
    else if (process.env.LENIENT) console.warn(`${where}: chybí "${id}"`);
    else throw new Error(`${where}: odkaz na neexistující stránku "${id}"`);
  }
  return out;
}

/** Články, které odkazují na danou službu (zpětné vazby), aby žádná služba nebyla bez článků. */
export function postsFor(serviceId: string, posts: Clanek[]) {
  return posts.filter((p) => p.data.services.includes(serviceId));
}

export const dateCz = (d: Date) => d.toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long', year: 'numeric' });
export const iso = (d: Date) => d.toISOString().slice(0, 10);
