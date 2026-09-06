import type { Route } from './+types/blog';
import { Section, SectionHeading } from '~/components/sections/Section';
import { PostList } from '~/components/sections/PostList';
import { CallToAction } from '~/components/sections/CallToAction';
import { JsonLd } from '~/components/seo/JsonLd';
import { posts } from '~/lib/content';
import { breadcrumbSchema, seo } from '~/lib/seo';

export function loader(_: Route.LoaderArgs) {
  return {
    posts: [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)),
  };
}

export function meta(_: Route.MetaArgs) {
  return seo({
    title: 'Blog',
    description: 'Notes on design, engineering and running a small studio. Written when we have something to say.',
    path: '/blog',
  });
}

export default function Blog({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
        ])}
      />

      <Section>
        <SectionHeading
          eyebrow="Writing"
          title="Notes"
          description="No content calendar. We write when something is worth writing down, which works out at roughly once a month."
        />
        <PostList posts={loaderData.posts} />
      </Section>

      <CallToAction />
    </>
  );
}
