import { Link } from 'react-router';

import type { Route } from './+types/blog-post';
import { Section } from '~/components/sections/Section';
import { CallToAction } from '~/components/sections/CallToAction';
import { formatDate } from '~/components/sections/PostList';
import { Separator } from '~/components/ui/separator';
import { JsonLd } from '~/components/seo/JsonLd';
import { postBySlug, posts } from '~/lib/content';
import { articleSchema, breadcrumbSchema, seo } from '~/lib/seo';

export function loader({ params }: Route.LoaderArgs) {
  const post = postBySlug(params.slug);
  if (!post) {
    throw new Response('Not Found', { status: 404 });
  }
  return { post, more: posts.filter((item) => item.slug !== post.slug).slice(0, 2) };
}

export function meta({ data }: Route.MetaArgs) {
  if (!data) {
    return seo({ title: 'Post not found', description: 'This post does not exist.', path: '/blog' });
  }
  return seo({
    title: data.post.title,
    description: data.post.excerpt,
    path: `/blog/${data.post.slug}`,
    type: 'article',
    publishedAt: data.post.publishedAt,
  });
}

export default function BlogPost({ loaderData }: Route.ComponentProps) {
  const { post, more } = loaderData;
  const path = `/blog/${post.slug}`;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: post.title, path },
        ])}
      />
      <JsonLd
        data={articleSchema({
          title: post.title,
          description: post.excerpt,
          path,
          author: post.author,
          publishedAt: post.publishedAt,
        })}
      />

      <Section width="narrow" as="article">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
          <Link to="/blog" className="hover:text-foreground">
            Blog
          </Link>
          <span aria-hidden> / </span>
          <span className="text-foreground">{post.title}</span>
        </nav>

        <h1 className="font-heading text-4xl font-semibold tracking-tight text-balance">
          {post.title}
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          {post.author}
          <span aria-hidden> · </span>
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span aria-hidden> · </span>
          {post.readingMinutes} min read
        </p>

        <Separator className="my-9" />

        <div className="space-y-6">
          <p className="text-lg leading-relaxed text-muted-foreground text-pretty">{post.excerpt}</p>
          {post.body.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="text-base leading-relaxed text-pretty">
              {paragraph}
            </p>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <h2 className="font-heading text-xl font-semibold">More writing</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {more.map((item) => (
            <li key={item.slug}>
              <Link
                to={`/blog/${item.slug}`}
                className="block rounded-lg border bg-background p-5 transition-colors hover:border-primary/40"
              >
                <span className="font-heading font-semibold text-balance">{item.title}</span>
                <span className="mt-1.5 block text-sm text-muted-foreground text-pretty">
                  {item.excerpt}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CallToAction />
    </>
  );
}
