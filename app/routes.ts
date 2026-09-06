import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('about', 'routes/about.tsx'),
  route('services', 'routes/services.tsx'),
  route('services/:slug', 'routes/service-detail.tsx'),
  route('pricing', 'routes/pricing.tsx'),
  route('blog', 'routes/blog.tsx'),
  route('blog/:slug', 'routes/blog-post.tsx'),
  route('contact', 'routes/contact.tsx'),
  // Resource routes: no component, just a response. These are the reason a
  // single-process SSR app needs no companion Express server.
  route('api/health', 'routes/health.ts'),
  route('sitemap.xml', 'routes/sitemap.ts'),
  route('robots.txt', 'routes/robots.ts'),
] satisfies RouteConfig;
