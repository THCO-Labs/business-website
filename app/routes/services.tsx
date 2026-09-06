import type { Route } from './+types/services';
import { Section, SectionHeading } from '~/components/sections/Section';
import { ServiceGrid } from '~/components/sections/ServiceGrid';
import { CallToAction } from '~/components/sections/CallToAction';
import { JsonLd } from '~/components/seo/JsonLd';
import { services } from '~/lib/content';
import { breadcrumbSchema, seo } from '~/lib/seo';

export function meta(_: Route.MetaArgs) {
  return seo({
    title: 'Services',
    description:
      'Product design, web engineering, brand identity and technical audits — what each involves, what you get, and what it starts at.',
    path: '/services',
  });
}

export default function Services() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
        ])}
      />

      <Section>
        <SectionHeading
          eyebrow="Services"
          title="What we do, and what it costs to start"
          description="Every engagement is scoped and priced before work begins. The figures below are realistic starting points, not anchors we expect to negotiate up from."
        />
        <ServiceGrid services={services} />
      </Section>

      <CallToAction
        title="Not sure which one you need?"
        description="Describe the problem rather than the solution and we will tell you which of these fits, or whether none of them do."
      />
    </>
  );
}
