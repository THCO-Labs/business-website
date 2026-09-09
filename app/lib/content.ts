/**
 * The site's content.
 *
 * A marketing site has no database — its copy is the product. The records live
 * in `app/content/*.json` rather than in this module so that editing them is a
 * validated data write against the fields the manifest declares, not a patch to
 * TypeScript. This module stays the typed accessor every route reads, so the
 * routes did not have to change.
 *
 * `slug` is a route key, not copy: `/services/:slug` resolves through it, and
 * the manifest marks it non-generative so rewriting a service's words can never
 * break its URL or the links pointing at it.
 */
import servicesContent from '~/content/services.json';
import plansContent from '~/content/plans.json';

export interface Service {
  slug: string;
  title: string;
  summary: string;
  description: string;
  outcomes: string[];
  startingAt: string;
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  author: string;
  publishedAt: string;
  readingMinutes: number;
}

export interface Plan {
  name: string;
  price: string;
  cadence: string;
  summary: string;
  features: string[];
  highlighted: boolean;
}

export const services: Service[] = servicesContent.services;

export const posts: Post[] = [
  {
    slug: 'server-rendering-still-matters',
    title: 'Server rendering still matters for ordinary websites',
    excerpt:
      'A single-page app is a fine choice for a dashboard behind a login. For a site that needs to be found, it starts you at a disadvantage you then pay to undo.',
    body: [
      'The argument for client-side rendering was always about interaction: once the bundle loads, navigation is instant and the app feels native. That argument holds for software people log into. It does not hold for a marketing site, where most visitors arrive cold from a search result and leave from the same page they landed on.',
      'When a crawler requests a client-rendered page it receives an empty container and a script tag. Search engines will run that script, eventually, but the rendering budget is finite and unevenly applied. Social platforms generating a link preview typically do not run it at all, which is why a link to a client-rendered site so often unfurls with the wrong title.',
      'Server rendering removes the question. The HTML that arrives already contains the copy, the headings and the metadata, so every consumer of the page — crawler, preview bot, screen reader, browser on a slow connection — gets the same finished document. The interactivity still arrives; it just stops being a precondition for the content existing.',
    ],
    author: 'Ada Okonjo',
    publishedAt: '2026-07-14',
    readingMinutes: 4,
  },
  {
    slug: 'what-a-technical-audit-should-tell-you',
    title: 'What a technical audit should actually tell you',
    excerpt:
      'Most audits are a list of everything that could be improved, sorted by how easy it was to detect. That is a scan, not an audit.',
    body: [
      'Running a scanner is not an audit. A tool can tell you that ninety-one things are wrong; it cannot tell you which three are costing you customers. The value is in the sorting, and sorting requires knowing what the site is for.',
      'A useful audit connects each finding to a consequence. Not "images are not lazy-loaded" but "the gallery loads two megabytes before anything renders, and on the connection most of your mobile visitors have, that is four seconds of blank screen before the headline appears."',
      'It should also be costed. A finding without an effort estimate cannot be scheduled, and a plan that cannot be scheduled does not get done. If we cannot say roughly what fixing something takes, we have not understood it well enough to recommend it.',
    ],
    author: 'Tomas Reyes',
    publishedAt: '2026-06-02',
    readingMinutes: 3,
  },
  {
    slug: 'design-systems-for-small-teams',
    title: 'Design systems for teams too small for a design system',
    excerpt:
      'You do not need a hundred documented components. You need the eight you actually use to look the same on every screen.',
    body: [
      'Design system advice is mostly written by people at companies with a design systems team. For a team of five, that advice scales down badly: the governance overhead arrives immediately and the benefit arrives much later, so the system gets abandoned halfway and leaves you worse off than before.',
      'Start with the primitives that appear on every screen — type scale, spacing, colour, and the button. Those four decisions, made once and written down, eliminate most visual inconsistency. Everything else can stay ad hoc until a pattern has appeared three times.',
      'The test of a small system is whether a new engineer can build a correct-looking page without asking a designer. If they can, it is working, regardless of how little of it is documented.',
    ],
    author: 'Ada Okonjo',
    publishedAt: '2026-04-21',
    readingMinutes: 5,
  },
];

export const plans: Plan[] = plansContent.plans;

export function serviceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function postBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}
