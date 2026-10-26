// Strukturovaná data (JSON-LD) – jeden propojený @graph.
// Plný uzel salonu jen na úvodu a kontaktu, ostatní stránky odkazují přes @id.
import { salon } from '../data/salon';

const SITE = salon.url;
export const ids = {
  salon: `${SITE}/#salon`,
  owner: `${SITE}/#karina`,
  website: `${SITE}/#website`,
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
    areaServed: { '@type': 'City', name: 'Benešov' },
    knowsAbout: ['Permanentní make-up', 'Pudrové obočí', 'Stínované rty', 'Oční linky', 'Kosmetické ošetření pleti', 'Radiofrekvence', 'Chemický peeling'],
  };
}

export function ownerNode() {
  return {
    '@type': 'Person',
    '@id': ids.owner,
    name: salon.owner.name,
    jobTitle: salon.owner.jobTitle,
    worksFor: { '@id': ids.salon },
    url: `${SITE}/o-mne`,
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

export function webPageNode(opts: { url: string; name: string; description: string; type?: string }) {
  return {
    '@type': opts.type ?? 'WebPage',
    '@id': `${opts.url}#webpage`,
    url: opts.url,
    name: opts.name,
    description: opts.description,
    inLanguage: 'cs',
    isPartOf: { '@id': ids.website },
    about: { '@id': ids.salon },
  };
}

export function graph(nodes: object[]) {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes });
}
