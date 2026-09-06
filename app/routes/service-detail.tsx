import { Link } from 'react-router';
import { Check } from 'lucide-react';

import type { Route } from './+types/service-detail';
import { Section, SectionHeading } from '~/components/sections/Section';
import { CallToAction } from '~/components/sections/CallToAction';
import { Button } from '~/components/ui/button';
import { JsonLd } from '~/components/seo/JsonLd';
import { serviceBySlug, services } from '~/lib/content';
import { breadcrumbSchema, seo, serviceSchema } from '~/lib/seo';

export function loader({ params }: Route.LoaderArgs) {
  const service = serviceBySlug(params.slug);
  // A missing slug is a genuine 404, not an empty page. Throwing here lets the
  // root ErrorBoundary render it with the correct status, which matters because
  // a soft 404 that returns 200 will happily get indexed.
  if (!service) {
    throw new Response('Not Found', { status: 404 });
  }
  return { service, others: services.filter((item) => item.slug !== service.slug) };
}

export function meta({ data }: Route.MetaArgs) {
  if (!data) {
    return seo({ title: 'Service not found', description: 'This service does not exist.', path: '/services' });
  }
  return seo({
    title: data.service.title,
    description: data.service.summary,
    path: `/services/${data.service.slug}`,
  });
}

export default function ServiceDetail({ loaderData }: Route.ComponentProps) {
  const { service, others } = loaderData;
  const path = `/services/${service.slug}`;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: service.title, path },
        ])}
      />
      <JsonLd data={serviceSchema({ name: service.title, description: service.summary, path })} />

      <Section width="narrow">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
          <Link to="/services" className="hover:text-foreground">
            Services
          </Link>
          <span aria-hidden> / </span>
          <span className="text-foreground">{service.title}</span>
        </nav>

        <h1 className="font-heading text-4xl font-semibold tracking-tight text-balance">
          {service.title}
        </h1>
        <p className="mt-5 text-lg text-muted-foreground text-pretty">{service.summary}</p>
        <p className="mt-6 text-base leading-relaxed text-pretty">{service.description}</p>

        <h2 className="mt-12 font-heading text-xl font-semibold">What you get</h2>
        <ul className="mt-5 space-y-3">
          {service.outcomes.map((outcome) => (
            <li key={outcome} className="flex items-start gap-3">
              <Check className="mt-1 size-4 shrink-0 text-primary" aria-hidden />
              <span>{outcome}</span>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-sm text-muted-foreground">
          Engagements start at <span className="font-semibold text-foreground">{service.startingAt}</span>.
        </p>
        <Button asChild size="lg" className="mt-6">
          <Link to="/contact">Enquire about {service.title.toLowerCase()}</Link>
        </Button>
      </Section>

      <Section tone="muted">
        <SectionHeading title="Other services" />
        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {others.map((other) => (
            <li key={other.slug}>
              <Link
                to={`/services/${other.slug}`}
                className="block rounded-lg border bg-background p-5 transition-colors hover:border-primary/40"
              >
                <span className="font-heading font-semibold">{other.title}</span>
                <span className="mt-1.5 block text-sm text-muted-foreground text-pretty">
                  {other.summary}
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
