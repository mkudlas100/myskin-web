// Strukturovaná data (JSON-LD) – jeden propojený @graph.
// Plný uzel salonu jen na úvodu a kontaktu, ostatní stránky odkazují přes @id.
import { salon } from '../data/salon';
import { karina } from '../data/karina';

const SITE = salon.url;
export const ids = {
  salon: `${SITE}/#salon`,
  owner: `${SITE}/#karina`,
  website: `${SITE}/#website`,
};

// Oblasti: kosmetika hlavně místně, permanentní make-up i pro klientky z Prahy a celého kraje.
export const areas = {
  local: [
    { '@type': 'City', name: 'Benešov' },
    { '@type': 'AdministrativeArea', name: 'okres Benešov' },
  ],
  wide: [
    { '@type': 'City', name: 'Benešov' },
    { '@type': 'AdministrativeArea', name: 'okres Benešov' },
    { '@type': 'AdministrativeArea', name: 'Středočeský kraj' },
    { '@type': 'City', name: 'Praha' },
  ],
};

export function salonNode(logoUrl: string, imageUrl: string) {
  return {
    '@type': 'BeautySalon',
    '@id': ids.salon,
    name: salon.name,
    url: `${SITE}/`,
    logo: logoUrl,
    image: imageUrl,
    telephone: salon.phoneHref,
    email: salon.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: salon.street,
      postalCode: salon.postalCode,
      addressLocality: salon.city,
      addressCountry: salon.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: salon.geo.lat, longitude: salon.geo.lng },
    hasMap: salon.map,
    sameAs: [salon.map, salon.social.instagram, salon.social.facebook],
    founder: { '@id': ids.owner },
    employee: [{ '@id': ids.owner }, { '@type': 'Person', '@id': `${SITE}/#michaela`, name: 'Michaela Benešová', jobTitle: 'Kosmetička a vizážistka', worksFor: { '@id': ids.salon } }],
    areaServed: areas.wide,
    currenciesAccepted: 'CZK',
    hasOfferCatalog: { '@id': `${SITE}/cenik#cenik` },
    potentialAction: { '@type': 'ReserveAction', target: { '@type': 'EntryPoint', urlTemplate: salon.booking, actionPlatform: ['http://schema.org/DesktopWebPlatform', 'http://schema.org/MobileWebPlatform'] }, result: { '@type': 'Reservation', name: 'Rezervace termínu' } },
    knowsAbout: ['Permanentní make-up', 'Pudrové obočí', 'Stínované rty', 'Oční linky', 'Kosmetické ošetření pleti', 'Radiofrekvence', 'Chemický peeling'],
  };
}

// Karina jako odbornice: kvalifikace, praxe a obory (E-E-A-T). Stejný uzel na všech stránkách.
export function ownerNode(imageUrl?: string) {
  return {
    '@type': 'Person',
    '@id': ids.owner,
    name: karina.name,
    jobTitle: karina.jobTitle,
    description: karina.short,
    ...(imageUrl ? { image: imageUrl } : {}),
    worksFor: { '@id': ids.salon },
    url: `${SITE}/o-mne`,
    knowsAbout: karina.knowsAbout,
    knowsLanguage: 'cs',
    hasOccupation: { '@type': 'Occupation', name: karina.jobTitle, occupationLocation: { '@type': 'City', name: 'Benešov' } },
    hasCredential: karina.milestones.filter((m) => 'credential' in m).map((m) => ({
      '@type': 'EducationalOccupationalCredential',
      name: `${m.t}: ${m.d}`,
      credentialCategory: 'certificate',
      dateCreated: m.y.slice(0, 4),
    })),
    alumniOf: [
      { '@type': 'Organization', name: 'Beauty & Art Academy' },
      { '@type': 'Organization', name: 'Fleiš Academy' },
    ],
  };
}

export function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': ids.website,
    name: salon.shortName,
    url: `${SITE}/`,
    inLanguage: 'cs',
    publisher: { '@id': ids.salon },
  };
}

export function webPageNode(opts: { url: string; name: string; description: string; type?: string; image?: string; modified?: string }) {
  return {
    '@type': opts.type ?? 'WebPage',
    '@id': `${opts.url}#webpage`,
    url: opts.url,
    name: opts.name,
    description: opts.description,
    inLanguage: 'cs',
    isPartOf: { '@id': ids.website },
    about: { '@id': ids.salon },
    ...(opts.image ? { primaryImageOfPage: { '@type': 'ImageObject', url: opts.image } } : {}),
    ...(opts.modified ? { dateModified: opts.modified } : {}),
  };
}

export function graph(nodes: object[]) {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes });
}

export function breadcrumbNode(url: string, items: { name: string; href: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumbs`,
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: `${SITE}${it.href === '/' ? '/' : it.href}` })),
  };
}

export function serviceNode(opts: { url: string; name: string; description: string; image?: string; offers?: { name: string; price: number }[]; category?: string; wide?: boolean; serviceType?: string }) {
  return {
    '@type': 'Service',
    '@id': `${opts.url}#service`,
    name: opts.name,
    description: opts.description,
    url: opts.url,
    ...(opts.image ? { image: opts.image } : {}),
    ...(opts.category ? { category: opts.category } : {}),
    ...(opts.serviceType ? { serviceType: opts.serviceType } : {}),
    provider: { '@id': ids.salon },
    ...(opts.wide ? { performer: { '@id': ids.owner } } : {}),
    areaServed: opts.wide ? areas.wide : areas.local,
    availableChannel: { '@type': 'ServiceChannel', serviceUrl: salon.booking, servicePhone: salon.phoneHref, serviceLocation: { '@id': ids.salon } },
    ...(opts.offers?.length
      ? { offers: opts.offers.map((o) => ({ '@type': 'Offer', name: o.name, price: o.price, priceCurrency: 'CZK', url: opts.url, seller: { '@id': ids.salon } })) }
      : {}),
  };
}

export function blogPostingNode(opts: { url: string; headline: string; description: string; image: string; published?: string; modified: string; section?: string; about?: string }) {
  return {
    '@type': 'BlogPosting',
    '@id': `${opts.url}#article`,
    headline: opts.headline,
    description: opts.description,
    image: opts.image,
    ...(opts.published ? { datePublished: opts.published } : {}),
    dateModified: opts.modified,
    ...(opts.section ? { articleSection: opts.section } : {}),
    inLanguage: 'cs',
    author: { '@id': ids.owner },
    ...(opts.about ? { about: { '@id': `${opts.about}#service` } } : {}),
    publisher: { '@id': ids.salon },
    mainEntityOfPage: { '@id': `${opts.url}#webpage` },
  };
}

export function faqNode(url: string, faq: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}
