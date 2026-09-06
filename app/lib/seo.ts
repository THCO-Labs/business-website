import { site } from '~/config/site';

/**
 * Meta descriptors for a page.
 *
 * Every route exports `meta`, so each page arrives from the server with its own
 * title, description, canonical URL and social card. That is what makes this
 * template worth server-rendering: a crawler sees the finished head, not a
 * shell that JavaScript would have filled in.
 */
export interface PageSeo {
  title: string;
  description: string;
  /** Route-relative path, e.g. `/about`. Used for the canonical URL. */
  path: string;
  image?: string;
  type?: 'website' | 'article';
  publishedAt?: string;
}

export const siteUrl = site.url.replace(/\/$/, '');

export function canonical(path: string): string {
  return `${siteUrl}${path === '/' ? '' : path}`;
}

export function seo({ title, description, path, image, type = 'website', publishedAt }: PageSeo) {
  const url = canonical(path);
  const card = image ? `${siteUrl}${image}` : undefined;
  const fullTitle = path === '/' ? `${site.name} — ${site.tagline}` : `${title} | ${site.name}`;

  return [
    { title: fullTitle },
    { name: 'description', content: description },
    { tagName: 'link', rel: 'canonical', href: url },

    { property: 'og:title', content: fullTitle },
    { property: 'og:description', content: description },
    { property: 'og:url', content: url },
    { property: 'og:type', content: type },
    { property: 'og:site_name', content: site.name },
    ...(card ? [{ property: 'og:image', content: card }] : []),
    ...(publishedAt ? [{ property: 'article:published_time', content: publishedAt }] : []),

    { name: 'twitter:card', content: card ? 'summary_large_image' : 'summary' },
    { name: 'twitter:title', content: fullTitle },
    { name: 'twitter:description', content: description },
    ...(card ? [{ name: 'twitter:image', content: card }] : []),
  ];
}

export function organizationSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    description: site.description,
    url: siteUrl,
    email: site.contact.email,
    telephone: site.contact.phone,
    sameAs: site.social.map((link) => link.href),
    ...(site.logoPath ? { logo: `${siteUrl}${site.logoPath}` } : {}),
  };
}

export function breadcrumbSchema(trail: Array<{ name: string; path: string }>): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: canonical(crumb.path),
    })),
  };
}

export function serviceSchema(input: { name: string; description: string; path: string }): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: input.name,
    description: input.description,
    url: canonical(input.path),
    provider: { '@type': 'Organization', name: site.name, url: siteUrl },
  };
}

export function articleSchema(input: {
  title: string;
  description: string;
  path: string;
  author: string;
  publishedAt: string;
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: input.title,
    description: input.description,
    url: canonical(input.path),
    datePublished: input.publishedAt,
    author: { '@type': 'Person', name: input.author },
    publisher: { '@type': 'Organization', name: site.name, url: siteUrl },
  };
}
