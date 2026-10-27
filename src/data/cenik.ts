// Ceník – jediný zdroj cen pro celý web (stránka /cenik, stránky služeb, schema Offer).
// Převzato z myskin.cz/cenik a stránek služeb 26. 10. 2026 (oční linky jen na stránce služby), ceník platný od 1. 4. 2026. Pedikúra zrušena (26. 10. 2026).
export type PriceItem = { name: string; price: number; duration?: string; note?: string; href?: string };
export type PriceGroup = { id: string; title: string; href?: string; items: PriceItem[] };

export const cenikPlatnost = '1. 4. 2026';

export const cenik: PriceGroup[] = [
  {
    id: 'permanentni-make-up', title: 'Permanentní make-up', href: '/permanentni-make-up',
    items: [
      { name: 'Pudrové obočí', price: 4500, duration: 'cca 2 hodiny', href: '/permanentni-make-up-pudrove-oboci' },
      { name: 'Korekce pudrového obočí', price: 1500, duration: 'cca 1,5 hodiny', note: 'po 7–8 týdnech od první aplikace', href: '/permanentni-make-up-pudrove-oboci' },
      { name: 'Stínované rty', price: 4500, duration: 'cca 3 hodiny', href: '/permanentni-make-up-stinovane-rty' },
      { name: 'Korekce stínovaných rtů', price: 1500, note: 'po 7–8 týdnech', href: '/permanentni-make-up-stinovane-rty' },
      { name: 'Oční linky', price: 3500, duration: 'cca 1,5–2 hodiny', href: '/permanentni-make-up-ocni-linky' },
      { name: 'Korekce očních linek', price: 1500, note: 'po 7 týdnech', href: '/permanentni-make-up-ocni-linky' },
    ],
  },
  {
    id: 'kosmetika', title: 'Kosmetická ošetření', href: '/kosmeticke-osetreni',
    items: [
      { name: 'Kompletní ošetření pleti', price: 1490, href: '/kosmeticke-osetreni' },
      { name: 'Kompletní ošetření Panacée (PHYT’S)', price: 1990, href: '/kosmeticke-osetreni' },
      { name: 'Hydratační péče s kyselinou hyaluronovou', price: 1600, duration: 'cca 75 min', href: '/kosmeticke-osetreni' },
      { name: 'Péče MILLÉSIME – mladistvost', price: 1600, href: '/kosmeticke-osetreni' },
      { name: 'Liftingový rituál G.M. Collin (kolagenová péče)', price: 2490, duration: 'cca 90 min', href: '/pece-collagen' },
      { name: 'Anti-Age 30+', price: 1590, href: '/kosmeticke-osetreni' },
      { name: 'Anti-Age 50+', price: 1590, href: '/kosmeticke-osetreni' },
      { name: 'Hloubkově čisticí péče', price: 990, note: 'pro smíšenou a mastnou pleť', href: '/kosmeticke-osetreni' },
      { name: 'Čisticí péče zad', price: 1200, href: '/cistici-pece-zad' },
      { name: 'Rituál – relaxační masáž obličeje a šíje', price: 1100, duration: '60 min', href: '/kosmeticke-osetreni' },
      { name: 'Kompletní ošetření pleti pro muže', price: 1490, href: '/kompletni-osetreni-pro-muze' },
      { name: 'Chemický peeling NOON', price: 1600, duration: 'cca 60 min', href: '/kura-chemicky-peeling' },
      { name: 'Kúra chemických peelingů (6 ošetření)', price: 9600, href: '/kura-chemicky-peeling' },
    ],
  },
  {
    id: 'radiofrekvence', title: 'Radiofrekvence', href: '/radiofrekvence',
    items: [
      { name: 'Kosmetické ošetření s radiofrekvencí (obličej)', price: 1500, duration: '60 min', href: '/radiofrekvence#oblicej' },
      { name: 'Břicho', price: 990, href: '/radiofrekvence#bricho' },
      { name: 'Hýždě', price: 1490, href: '/radiofrekvence#hyzde' },
      { name: 'Paže', price: 990, duration: '30 min', href: '/radiofrekvence#paze' },
      { name: 'Stehna', price: 1990, duration: '60 min', href: '/radiofrekvence#stehna' },
    ],
  },
  {
    id: 'rasy-oboci', title: 'Řasy a obočí', href: '/rasy-oboci',
    items: [
      { name: 'Lash lifting (laminace řas)', price: 990, note: 'přirozeně natočené řasy', href: '/rasy-oboci' },
      { name: 'Úprava a barvení obočí a řas', price: 500, duration: '30 min', href: '/rasy-oboci' },
      { name: 'Barvení obočí a řas ke kosmetickému ošetření', price: 300, href: '/rasy-oboci' },
    ],
  },
  {
    id: 'liceni', title: 'Líčení', href: '/liceni',
    items: [
      { name: 'Denní líčení', price: 500, duration: 'cca 20 min', href: '/liceni' },
      { name: 'Večerní a plesové líčení', price: 800, duration: 'cca 40 min', href: '/liceni' },
      { name: 'Svatební líčení', price: 5500, duration: 'cca 120 min', note: 'včetně zkoušky v salonu', href: '/liceni' },
    ],
  },
  {
    id: 'depilace', title: 'Depilace', href: '/depilace',
    items: [
      { name: 'Celé nohy', price: 950, duration: 'cca 45 min', href: '/depilace' },
      { name: 'Lýtka', price: 500, href: '/depilace' },
      { name: 'Celé paže', price: 600, href: '/depilace' },
      { name: 'Podpaží', price: 350, href: '/depilace' },
      { name: 'Bříško', price: 350, href: '/depilace' },
      { name: 'Třísla, bikiny', price: 500, href: '/depilace' },
      { name: 'Záda', price: 500, href: '/depilace' },
      { name: 'Brazilská depilace', price: 1300, duration: 'cca 30 min', href: '/depilace' },
      { name: 'Fitness procedura (brazilská depilace a podpaží)', price: 1600, href: '/depilace' },
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

export const kc = (n: number) => `${n.toLocaleString('cs-CZ').replace(/ /g, ' ')} Kč`;
export const pricesFor = (href: string) => cenik.flatMap((g) => g.items).filter((i) => i.href?.split('#')[0] === href);

/** Nejnižší cena služby bez korekcí (korekce není samostatná služba). */
export const fromPrice = (items: PriceItem[]) => {
  const base = items.filter((i) => !/^Korekce/i.test(i.name));
  const list = (base.length ? base : items).map((i) => i.price);
  return list.length ? Math.min(...list) : 0;
};
