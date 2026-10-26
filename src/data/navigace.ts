// Hlavní menu podle zaměření webu: PMU a kosmetická péče první, další služby, pak informace.
export type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };

export const menu: NavItem[] = [
  {
    label: 'Permanentní make-up',
    href: '/permanentni-make-up',
    children: [
      { label: 'Pudrové obočí', href: '/permanentni-make-up-pudrove-oboci' },
      { label: 'Stínované rty', href: '/permanentni-make-up-stinovane-rty' },
      { label: 'Oční linky', href: '/permanentni-make-up-ocni-linky' },
    ],
  },
  {
    label: 'Péče o pleť',
    href: '/kosmeticke-sluzby',
    children: [
      { label: 'Kosmetické ošetření', href: '/kosmeticke-osetreni' },
      { label: 'Radiofrekvence', href: '/radiofrekvence' },
      { label: 'Chemický peeling', href: '/kura-chemicky-peeling' },
      { label: 'Péče o citlivou pleť', href: '/pece-o-citlivou-plet' },
      { label: 'Ošetření pro muže', href: '/kompletni-osetreni-pro-muze' },
    ],
  },
  {
    label: 'Další služby',
    href: '/kosmeticke-sluzby',
    children: [
      { label: 'Řasy a obočí', href: '/rasy-oboci' },
      { label: 'Líčení', href: '/liceni' },
      { label: 'Depilace', href: '/depilace' },
      { label: 'Pedikúra', href: '/pedikura' },
    ],
  },
  { label: 'O nás', href: '/o-mne' },
  { label: 'Ceník', href: '/cenik' },
  { label: 'Blog', href: '/blog-myskin' },
  { label: 'Kontakt', href: '/kontakt' },
];

export const footerServices = [
  { label: 'Permanentní make-up', href: '/permanentni-make-up' },
  { label: 'Kosmetické ošetření', href: '/kosmeticke-osetreni' },
  { label: 'Radiofrekvence', href: '/radiofrekvence' },
  { label: 'Řasy a obočí', href: '/rasy-oboci' },
  { label: 'Líčení', href: '/liceni' },
  { label: 'Depilace', href: '/depilace' },
  { label: 'Pedikúra', href: '/pedikura' },
];

export const footerMore = [
  { label: 'Ceník', href: '/cenik' },
  { label: 'Blog', href: '/blog-myskin' },
  { label: 'Kurzy', href: '/kurzy-a-workshopy' },
  { label: 'E-shop', href: 'https://eshop.myskin.cz' },
  { label: 'O nás', href: '/o-mne' },
  { label: 'Kontakt', href: '/kontakt' },
];

export const legal = [
  { label: 'Obchodní podmínky', href: '/obchodni-podminky' },
  { label: 'Zásady zpracování osobních údajů', href: '/zasady-ochrany-osobnich-udaju' },
];
