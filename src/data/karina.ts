// Odbornost Kariny Kudličkové – jediný zdroj pro stránku O nás, úvod, autorský box a strukturovaná data.
// Fakta ze stávajícího webu myskin.cz (sekce O nás), potvrzena uživatelkou.
export const karina = {
  name: 'Karina Kudličková',
  jobTitle: 'Kosmetička a specialistka na permanentní make-up',
  short: 'Kosmetička s praxí od roku 2005 a specialistka na permanentní make-up. Pracovala pro Yves Rocher a na klinice estetické medicíny Asklepion, permanentnímu make-upu se věnuje od roku 2021 a v roce 2024 absolvovala kurz pigmentologie ve Fleiš Academy.',
  knowsAbout: ['Permanentní make-up', 'Pudrové obočí', 'Stínované rty', 'Permanentní oční linky', 'Pigmentologie', 'Kosmetická péče o citlivou a problematickou pleť', 'Hyperpigmentace', 'Akné', 'Růžovka', 'Radiofrekvence', 'Chemický peeling'],
  milestones: [
    { y: '2005', t: 'Beauty & Art Academy', d: 'Trvalá na řasy, mikromasáž očního okolí, modeláž nehtů gelem.', credential: true },
    { y: '2007–2015', t: 'Yves Rocher', d: 'Kosmetička a kosmetická poradkyně. Aromatické a tradiční tělové péče, kosmetická ošetření.' },
    { y: '2011–2012', t: 'Klinika Asklepion', d: 'Kosmetička na klinice estetické medicíny. Školení: kosmetická radiofrekvence, tělový přístroj LPG, lymfodrenáž, kryolipolýza.', credential: true },
    { y: '2017', t: 'Asociace vizážistů a stylistů ČR', d: 'Fotomakeup a make-up na kameru.', credential: true },
    { y: '2021', t: 'Permanentní make-up', d: 'Kurz aplikace, designu a korekcí permanentního make-upu.', credential: true },
    { y: '2024', t: 'Fleiš Academy', d: 'Pigmentologie a teorie barev – složení pigmentů a míchání odstínů.', credential: true },
  ],
  facts: [
    { value: 'od 2005', label: 'v kosmetice' },
    { value: 'od 2021', label: 'permanentní make-up' },
    { value: '2024', label: 'pigmentologie, Fleiš Academy' },
  ],
} as const;
