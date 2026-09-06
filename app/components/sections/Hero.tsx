import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';

export function Hero({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  primaryAction: { label: string; to: string };
  secondaryAction?: { label: string; to: string };
}) {
  return (
    <section className="border-b bg-gradient-to-b from-accent/60 to-background">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <div className="max-w-3xl">
          {eyebrow ? (
            <Badge variant="secondary" className="mb-6">
              {eyebrow}
            </Badge>
          ) : null}
          {/* One h1 per page, and it is here. Every other section heading is an
              h2, which keeps the document outline correct for crawlers and
              screen readers alike. */}
          <h1 className="font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground text-pretty sm:text-xl">
            {description}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link to={primaryAction.to}>
                {primaryAction.label}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            {secondaryAction ? (
              <Button asChild size="lg" variant="outline">
                <Link to={secondaryAction.to}>{secondaryAction.label}</Link>
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
