import type { Route } from './+types/pricing';
import { Section, SectionHeading } from '~/components/sections/Section';
import { PricingTable } from '~/components/sections/PricingTable';
import { Faq } from '~/components/sections/Faq';
import { CallToAction } from '~/components/sections/CallToAction';
import { JsonLd } from '~/components/seo/JsonLd';
import { plans } from '~/lib/content';
import { breadcrumbSchema, seo } from '~/lib/seo';

export function meta(_: Route.MetaArgs) {
  return seo({
    title: 'Pricing',
    description:
      'Three ways to work with us — a one-off audit, a scoped project, or retained monthly capacity. Real numbers, no quote form.',
    path: '/pricing',
  });
}

const faqs = [
  {
    question: 'Why publish prices at all?',
    answer:
      'Because a quote form wastes both our time. If the numbers are wrong for your budget you will know in ten seconds instead of after two calls.',
  },
  {
    question: 'Is the project price fixed?',
    answer:
      'Fixed for the agreed scope. If the scope changes we re-price that change before doing it, so there is never an invoice you have not already seen coming.',
  },
  {
    question: 'What is not included?',
    answer:
      'Third-party costs — hosting, licences, stock photography — are billed at cost and always agreed in advance. We do not mark them up.',
  },
  {
    question: 'Can we start with an audit and continue from there?',
    answer:
      'That is the most common path, and the audit fee comes off the project price if you go ahead within ninety days.',
  },
];

export default function Pricing() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Pricing', path: '/pricing' },
        ])}
      />

      <Section>
        <SectionHeading
          align="center"
          eyebrow="Pricing"
          title="Three ways to work together"
          description="No quote form. These are the numbers we would give you on a call, so you can decide whether to have the call."
        />
        <PricingTable plans={plans} />
      </Section>

      <Section width="narrow" tone="muted">
        <SectionHeading align="center" title="Pricing questions" />
        <Faq entries={faqs} />
      </Section>

      <CallToAction />
    </>
  );
}
