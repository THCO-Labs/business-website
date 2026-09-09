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

/**
 * Section copy lives in `app/content/*.json`, not in this file.
 *
 * The platform edits a section by rewriting its content file against the
 * fields the manifest declares — no code is generated, so an edit cannot fail
 * to compile. Keeping the words here would put them behind a JSX patch, which
 * is the slow and fragile path.
 */
import hero from '~/content/home.hero.json';
import approach from '~/content/home.approach.json';
import faq from '~/content/home.faq.json';
import cta from '~/content/home.cta.json';

export function meta(_: Route.MetaArgs) {
  return seo({
    title: site.name,
    description: site.description,
    path: '/',
  });
}

export default function Home() {
  return (
    <>
      {/* `eyebrow` and `description` are deliberately absent from the shipped
          content file so a freshly built site shows the customer's own brand,
          which the applier writes into `site`. Once an edit regenerates this
          section the file carries them and wins. */}
      <Hero
        title={hero.title}
        eyebrow={hero.eyebrow ?? site.tagline}
        description={hero.description ?? site.description}
        primaryAction={hero.primaryAction}
        secondaryAction={hero.secondaryAction}
      />

      <Section>
        <SectionHeading
          eyebrow="What we do"
          title="Four ways we tend to help"
          description="Most engagements start with one of these and grow from there. Each is scoped and priced before any work begins."
        />
        <ServiceGrid services={services} />
      </Section>

      <Section tone="muted" data-section="section.approach">
        <SectionHeading
          eyebrow={approach.eyebrow}
          title={approach.title}
          description={approach.description}
        />
        <dl className="mt-12 grid gap-8 sm:grid-cols-3">
          {approach.items.map((item) => (
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

      <Section width="narrow" tone="muted" data-section="section.faq">
        <SectionHeading align="center" eyebrow={faq.eyebrow} title={faq.title} />
        <Faq entries={faq.entries} />
      </Section>

      <CallToAction title={cta.title} description={cta.description} action={cta.action} />
    </>
  );
}
