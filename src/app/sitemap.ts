import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.arhamestate.com';

  const routes = [
    '',
    '/about',
    '/services',
    '/properties',
    '/properties/aurus',
    '/properties/jiva',
    '/properties/panache',
    '/properties/the-102',
    '/property-finder',
    '/insights',
    '/careers',
    '/contact',
    '/enquire',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date('2026-11-03'),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : route.startsWith('/properties') ? 0.9 : 0.7,
  }));

  return routes;
}
