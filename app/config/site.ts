import brand from './brand.generated.json';

/**
 * Site structure.
 *
 * Navigation and footer groupings are data, not JSX. A page added to
 * `app/routes.ts` becomes reachable by adding one entry here, so the builder
 * never has to edit the header markup to expose a new page.
 */

export interface NavItem {
  label: string;
  to: string;
  description?: string;
}

export const site = {
  name: brand.name,
  nameParts: brand.nameParts,
  description: brand.description,
  tagline: brand.tagline,
  url: brand.url,
  logoPath: brand.logoPath,
  /** Which token set the site opens in, chosen at build time. */
  defaultTheme: ((brand as { theme?: string }).theme === 'dark' ? 'dark' : 'light') as 'light' | 'dark',

  contact: {
    email: 'hello@northwind-studio.example.com',
    phone: '+44 20 7946 0142',
    address: '18 Corbet Place, London E1 6NN',
  },

  social: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/example' },
    { label: 'GitHub', href: 'https://github.com/example' },
  ],
} as const;

export const primaryNav: NavItem[] = [
  { label: 'Services', to: '/services', description: 'What we do and what it costs' },
  { label: 'Pricing', to: '/pricing', description: 'Engagement models and rates' },
  { label: 'About', to: '/about', description: 'Who we are and how we work' },
  { label: 'Blog', to: '/blog', description: 'Notes on design and engineering' },
];

export const footerNav: Array<{ heading: string; items: NavItem[] }> = [
  {
    heading: 'Company',
    items: [
      { label: 'About', to: '/about' },
      { label: 'Blog', to: '/blog' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    heading: 'Services',
    items: [
      { label: 'Product design', to: '/services/product-design' },
      { label: 'Web engineering', to: '/services/web-engineering' },
      { label: 'Brand identity', to: '/services/brand-identity' },
      { label: 'Technical audit', to: '/services/technical-audit' },
    ],
  },
];
