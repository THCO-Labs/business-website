import { canonical } from '~/lib/seo';

export function loader() {
  const body = `User-agent: *
Allow: /

Sitemap: ${canonical('/sitemap.xml')}
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
