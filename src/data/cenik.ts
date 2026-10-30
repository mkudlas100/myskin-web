import { salon } from './salon';
// Ceník – jediný zdroj cen pro celý web (stránka /cenik, stránky služeb, schema Offer).
// Převzato z myskin.cz/cenik a stránek služeb 26. 10. 2026 (oční linky jen na stránce služby), ceník platný od 1. 4. 2026. Pedikúra zrušena (26. 10. 2026).
// noona = ID služby v rezervačním systému Noona (eventTypeId) – odkaz „Rezervovat“ vede rovnou na ni.
// ID převzata z https://noona.app/cs/myskin/book 30. 10. 2026. Položka bez noona = obecná rezervace.
export type PriceItem = { name: string; price: number; duration?: string; note?: string; href?: string; noona?: string };
export type PriceGroup = { id: string; title: string; href?: string; items: PriceItem[] };

export const cenikPlatnost = '1. 4. 2026';

export const cenik: PriceGroup[] = [
  {
    id: 'permanentni-make-up', title: 'Permanentní make-up', href: '/permanentni-make-up',
    items: [
      { name: 'Pudrové obočí', price: 4500, duration: 'cca 2 hodiny', href: '/permanentni-make-up-pudrove-oboci', noona: 'BgcC7Erwjhe9FJsGx' },
      { name: 'Korekce pudrového obočí', price: 1500, duration: 'cca 1,5 hodiny', note: 'po 7–8 týdnech od první aplikace', href: '/permanentni-make-up-pudrove-oboci' },
      { name: 'Stínované rty', price: 4500, duration: 'cca 3 hodiny', href: '/permanentni-make-up-stinovane-rty', noona: 'TC5KqZa3uBjRTPjAt' },
      { name: 'Korekce stínovaných rtů', price: 1500, note: 'po 7–8 týdnech', href: '/permanentni-make-up-stinovane-rty' },
      { name: 'Oční linky', price: 3500, duration: 'cca 1,5–2 hodiny', href: '/permanentni-make-up-ocni-linky', noona: 'jvSoXmebtoQ8cAwJx' },
      { name: 'Korekce očních linek', price: 1500, note: 'po 7 týdnech', href: '/permanentni-make-up-ocni-linky' },
    ],
  },
  {
    id: 'kosmetika', title: 'Kosmetická ošetření', href: '/kosmeticke-osetreni',
    items: [
      { name: 'Kompletní ošetření pleti', price: 1490, href: '/kosmeticke-osetreni', noona: '3Wmhkrnh5tJ4K29up' },
      { name: 'Kompletní ošetření Panacée (PHYT’S)', price: 1990, href: '/kosmeticke-osetreni' },
      { name: 'Hydratační péče s kyselinou hyaluronovou', price: 1600, duration: 'cca 75 min', href: '/kosmeticke-osetreni', noona: 'Hz98bfA3l4Jo7wYi3Cru60mt' },
      { name: 'Péče MILLÉSIME – mladistvost', price: 1600, href: '/kosmeticke-osetreni', noona: 'NcuZIP9InsKTqSxYaPvvkuu7' },
      { name: 'Liftingový rituál G.M. Collin (kolagenová péče)', price: 2490, duration: 'cca 90 min', href: '/pece-collagen', noona: 'Fbq54NhOyma8SbUgyeLngjoD' },
      { name: 'Anti-Age 30+', price: 1590, href: '/kosmeticke-osetreni', noona: '2WOyLuf5nzaRGgHFqJSC9L3Z' },
      { name: 'Anti-Age 50+', price: 1590, href: '/kosmeticke-osetreni', noona: 'nfAQYTTCmmhunbpNt' },
      { name: 'Hloubkově čisticí péče', price: 990, note: 'pro smíšenou a mastnou pleť', href: '/kosmeticke-osetreni', noona: 'SJ4bHQoTpbrFA85mL' },
      { name: 'Čisticí péče zad', price: 1200, href: '/cistici-pece-zad', noona: '8qZ62FYSmhTek0zaYfjcQTaP' },
      { name: 'Rituál – relaxační masáž obličeje a šíje', price: 1100, duration: '60 min', href: '/kosmeticke-osetreni', noona: 'LBuKcY31H64HdeNohJyuqXrL' },
      { name: 'Kompletní ošetření pleti pro muže', price: 1490, href: '/kompletni-osetreni-pro-muze', noona: 'g2z0wrurX6KQardo65dbOjY1' },
      { name: 'Chemický peeling NOON', price: 1600, duration: 'cca 60 min', href: '/kura-chemicky-peeling', noona: 'pc9VLZLAY8fprlyu75jLgV1c' },
      { name: 'Kúra chemických peelingů (6 ošetření)', price: 9600, href: '/kura-chemicky-peeling' },
    ],
  },
  {
    id: 'radiofrekvence', title: 'Radiofrekvence', href: '/radiofrekvence',
    items: [
      { name: 'Kosmetické ošetření s radiofrekvencí (obličej)', price: 1500, duration: '60 min', href: '/radiofrekvence#oblicej', noona: 'irUsvcaC55qYVg17XvYqq1sl' },
      { name: 'Břicho', price: 990, href: '/radiofrekvence#bricho', noona: '51nMWsKVaIkI1oDcyqHSnU3R' },
      { name: 'Hýždě', price: 1490, href: '/radiofrekvence#hyzde', noona: 'JCU6E4kDEy9EcnNOfL8ciGHD' },
      { name: 'Paže', price: 990, duration: '30 min', href: '/radiofrekvence#paze', noona: 'rAxJIZOB3pxnoNQvH6Ku9Oyp' },
      { name: 'Stehna', price: 1990, duration: '60 min', href: '/radiofrekvence#stehna', noona: 'NcjBqatiTaOb9CA0oJIy2ZL9' },
    ],
  },
  {
    id: 'rasy-oboci', title: 'Řasy a obočí', href: '/rasy-oboci',
    items: [
      { name: 'Lash lifting (laminace řas)', price: 990, note: 'přirozeně natočené řasy', href: '/rasy-oboci', noona: 'yTCzR8K27MxyGtnRp' },
      { name: 'Úprava a barvení obočí a řas', price: 500, duration: '30 min', href: '/rasy-oboci', noona: 'vsgA9xvekN8Nurgah' },
      { name: 'Barvení obočí a řas ke kosmetickému ošetření', price: 300, href: '/rasy-oboci' },
    ],
  },
  {
    id: 'liceni', title: 'Líčení', href: '/liceni',
    items: [
      { name: 'Denní líčení', price: 500, duration: 'cca 20 min', href: '/liceni', noona: 'ee55rPDWGqCiD6qqu' },
      { name: 'Večerní a plesové líčení', price: 800, duration: 'cca 40 min', href: '/liceni', noona: 'TgZDqWWd8ecAxXJKm' },
      { name: 'Svatební líčení', price: 5500, duration: 'cca 120 min', note: 'včetně zkoušky v salonu', href: '/liceni', noona: 'tfdMjPsNwqHsD6uce' },
    ],
  },
  {
    id: 'depilace', title: 'Depilace', href: '/depilace',
    items: [
      { name: 'Celé nohy', price: 950, duration: 'cca 45 min', href: '/depilace', noona: 'HbgnN9f8xjGFscCww' },
      { name: 'Lýtka', price: 500, href: '/depilace', noona: 'fTaptcAhNkq7q9rzC' },
      { name: 'Celé paže', price: 600, href: '/depilace', noona: 'M3qoznjNXhvCvzBHj' },
      { name: 'Podpaží', price: 350, href: '/depilace', noona: 'Rky3S5NhR6HYgTbha' },
      { name: 'Bříško', price: 350, href: '/depilace', noona: 'sRdkPY3EbMQaA6kcJ' },
      { name: 'Třísla, bikiny', price: 500, href: '/depilace', noona: 'bGcs7Ait6BA26Mfq6' },
      { name: 'Záda', price: 500, href: '/depilace', noona: 'DLW4mtcDuhjGo8Tg4' },
      { name: 'Brazilská depilace', price: 1300, duration: 'cca 30 min', href: '/depilace', noona: 'sOixspatEKyjZynj7xiY1vZS' },
      { name: 'Fitness procedura (brazilská depilace a podpaží)', price: 1600, href: '/depilace', noona: 'iymFa9wYddLbWUNMV21p0v80' },
    ],
  },
  {
    id: 'kurzy', title: 'Kurzy', href: '/kurzy-a-workshopy',
    items: [
      { name: 'Mini kurz líčení', price: 2500, duration: '3 hodiny', note: 'skupina do 3 osob', href: '/mini-kurz-liceni' },
      { name: 'Refresh kurz pro kosmetičky', price: 18000, duration: '3 dny', note: 'individuálně, s certifikátem MySkin', href: '/refresh-kurz-pro-kosmetiky' },
    ],
  },
];

/** Odkaz do Noony: s ID rovnou na konkrétní službu, bez ID obecná rezervace. */
export const bookingUrl = (noona?: string) => (noona ? `${salon.booking}?eventTypeIds=${noona}` : salon.booking);
/** Hlavní rezervace stránky: když má stránka právě jednu základní službu v Noone, vede rovnou na ni. */
export const mainBooking = (items: PriceItem[]) => {
  const base = items.filter((i) => !/^(Korekce|Kúra)/i.test(i.name) && i.noona);
  const ids = [...new Set(base.map((i) => i.noona))];
  return bookingUrl(ids.length === 1 ? ids[0] : undefined);
};

export const kc = (n: number) => `${n.toLocaleString('cs-CZ').replace(/ /g, ' ')} Kč`;
export const pricesFor = (href: string) => cenik.flatMap((g) => g.items).filter((i) => i.href?.split('#')[0] === href);

/** Nejnižší cena služby bez korekcí (korekce není samostatná služba). */
export const fromPrice = (items: PriceItem[]) => {
  const base = items.filter((i) => !/^Korekce/i.test(i.name));
  const list = (base.length ? base : items).map((i) => i.price);
  return list.length ? Math.min(...list) : 0;
};
