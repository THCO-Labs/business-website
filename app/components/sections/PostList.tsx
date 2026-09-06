import { Link } from 'react-router';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import type { Post } from '~/lib/content';

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul className="mt-12 grid gap-6 lg:grid-cols-3">
      {posts.map((post) => (
        <li key={post.slug}>
          <Card className="group relative flex h-full flex-col transition-colors hover:border-primary/40">
            <CardHeader className="flex-1">
              <p className="text-sm text-muted-foreground">
                {/* A machine-readable date next to the human one: the crawler
                    reads the attribute, the reader reads the text. */}
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                <span aria-hidden> · </span>
                {post.readingMinutes} min read
              </p>
              <CardTitle className="mt-2 font-heading text-lg leading-snug">
                <Link to={`/blog/${post.slug}`} className="after:absolute after:inset-0">
                  {post.title}
                </Link>
              </CardTitle>
              <CardDescription className="mt-2 text-base text-pretty">{post.excerpt}</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{post.author}</CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
}
