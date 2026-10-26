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

export function breadcrumbNode(url: string, items: { name: string; href: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumbs`,
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: `${SITE}${it.href === '/' ? '/' : it.href}` })),
  };
}

export function serviceNode(opts: { url: string; name: string; description: string; image?: string; offers?: { name: string; price: number }[]; category?: string }) {
  return {
    '@type': 'Service',
    '@id': `${opts.url}#service`,
    name: opts.name,
    description: opts.description,
    url: opts.url,
    ...(opts.image ? { image: opts.image } : {}),
    ...(opts.category ? { category: opts.category } : {}),
    provider: { '@id': ids.salon },
    areaServed: { '@type': 'City', name: 'Benešov' },
    ...(opts.offers?.length
      ? { offers: opts.offers.map((o) => ({ '@type': 'Offer', name: o.name, price: o.price, priceCurrency: 'CZK', url: opts.url, seller: { '@id': ids.salon } })) }
      : {}),
  };
}

export function blogPostingNode(opts: { url: string; headline: string; description: string; image: string; published?: string; modified: string; section?: string }) {
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
