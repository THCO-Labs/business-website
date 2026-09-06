import type { Route } from './+types/home';
import { Hero } from '~/components/sections/Hero';
import { Section, SectionHeading } from '~/components/sections/Section';
import { ServiceGrid } from '~/components/sections/ServiceGrid';
import { PostList } from '~/components/sections/PostList';
import { CallToAction } from '~/components/sections/CallToAction';
import { Faq } from '~/components/sections/Faq';
import { posts, services } from '~/lib/content';
import { seo } from '~/lib/seo';
import { site } from '~/config/site';

export function meta(_: Route.MetaArgs) {
  return seo({
    title: site.name,
    description: site.description,
    path: '/',
  });
}

const faqs = [
  {
    question: 'How quickly can you start?',
    answer:
      'Usually within three to four weeks. Discovery can often begin sooner, since it runs alongside whatever we are finishing.',
  },
  {
    question: 'Do you work with existing codebases?',
    answer:
      'Yes, and most of our work is exactly that. We start with an audit so the plan is based on what the code actually does rather than on what the documentation claims.',
  },
  {
    question: 'Who owns the work?',
    answer:
      'You do, entirely. Everything lives in your repositories and your accounts from the first commit, and there is nothing to transfer at the end.',
  },
  {
    question: 'What happens after launch?',
    answer:
      'Every project includes thirty days of support. After that, teams either take it in-house with the handover documentation or move onto a retained engagement.',
  },
];

export default function Home() {
  return (
    <>
      <Hero
        eyebrow={site.tagline}
        title="Design and engineering for businesses that need the work to actually ship"
        description={site.description}
        primaryAction={{ label: 'Start a project', to: '/contact' }}
        secondaryAction={{ label: 'See our services', to: '/services' }}
      />

      <Section>
        <SectionHeading
          eyebrow="What we do"
          title="Four ways we tend to help"
          description="Most engagements start with one of these and grow from there. Each is scoped and priced before any work begins."
        />
        <ServiceGrid services={services} />
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="How we work"
          title="Small team, short feedback loops, no surprises"
          description="You work with the people doing the work. There is no account layer between you and the team, and nothing is presented for the first time at the end."
        />
        <dl className="mt-12 grid gap-8 sm:grid-cols-3">
          {[
            {
              term: 'Scoped before started',
              detail:
                'Every engagement begins with a written scope and a fixed price for that scope. Changes are re-scoped in the open, not absorbed silently.',
            },
            {
              term: 'Shipped weekly',
              detail:
                'Work goes to a preview environment every week. You see progress on the real thing rather than in a status document.',
            },
            {
              term: 'Handed over properly',
              detail:
                'You get documentation, a walkthrough and thirty days of support. The goal is that you do not need us afterwards.',
            },
          ].map((item) => (
            <div key={item.term}>
              <dt className="font-heading text-lg font-semibold">{item.term}</dt>
              <dd className="mt-2 text-muted-foreground text-pretty">{item.detail}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Writing"
          title="Recent notes"
          description="What we have learned, written down while it is still fresh."
        />
        <PostList posts={posts.slice(0, 3)} />
      </Section>

      <Section width="narrow" tone="muted">
        <SectionHeading align="center" eyebrow="Questions" title="Things people ask first" />
        <Faq entries={faqs} />
      </Section>

      <CallToAction />
    </>
  );
}
