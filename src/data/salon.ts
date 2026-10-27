// Jediné místo s kontaktními a firemními údaji salonu.
// Potvrzeno uživatelkou 26. 10. 2026. Patička, kontakt i strukturovaná data berou data odsud.
export const salon = {
  name: 'MySkin – kosmetické studio',
  shortName: 'MySkin',
  url: 'https://www.myskin.cz',
  operator: 'Karina Kudličková',
  ico: '73815951',
  street: 'Pražská 380',
  postalCode: '256 01',
  city: 'Benešov u Prahy',
  country: 'CZ',
  phone: '+420 724 918 642',
  phoneHref: '+420724918642',
  email: 'karina@myskin.cz',
  hours: 'Po–Pá na objednání',
  parking: 'Na parkovišti přímo naproti studiu, nebo na placeném parkovišti u kruhového objezdu, asi 100 metrů od salonu.',
  vouchers: 'https://eshop.myskin.cz/darkove-poukazy',
  geo: { lat: 49.7839282, lng: 14.6873101 },
  map: 'https://www.google.com/maps?cid=3124744777116543652',
  booking: 'https://noona.app/cs/myskin/book',
  eshop: 'https://eshop.myskin.cz',
  noonaApp: 'https://play.google.com/store/apps/details?id=com.timatorgmobile',
  noonaQr: 'https://qrco.de/bbBPkC',
  social: {
    instagram: 'https://www.instagram.com/myskin_cosmetic/',
    facebook: 'https://www.facebook.com/MySkin-Cosmetics-Bodycare-103502308632742',
  },
  owner: {
    name: 'Karina Kudličková',
    jobTitle: 'Kosmetička a specialistka na permanentní make-up',
  },
} as const;
