import type { Route } from './+types/about';
import { Section, SectionHeading } from '~/components/sections/Section';
import { CallToAction } from '~/components/sections/CallToAction';
import { Avatar, AvatarFallback } from '~/components/ui/avatar';
import { JsonLd } from '~/components/seo/JsonLd';
import { breadcrumbSchema, seo } from '~/lib/seo';
import { site } from '~/config/site';

export function meta(_: Route.MetaArgs) {
  return seo({
    title: 'About',
    description: `${site.name} is a small design and engineering studio. Here is who we are, how we work, and what we will not do.`,
    path: '/about',
  });
}

const team = [
  { name: 'Ada Okonjo', role: 'Design lead', bio: 'Fifteen years designing products people use at work, mostly in health and logistics.' },
  { name: 'Tomas Reyes', role: 'Engineering lead', bio: 'Backend and platform work. Cares more about the deploy pipeline than is strictly normal.' },
  { name: 'Priya Nair', role: 'Producer', bio: 'Keeps scope honest and makes sure the thing that was agreed is the thing that ships.' },
];

const principles = [
  {
    title: 'We say no to work we would do badly',
    detail:
      'If a project needs expertise we do not have, we will say so and point you at someone who does. Taking it anyway helps nobody, and we would rather keep the relationship than bill the month.',
  },
  {
    title: 'The estimate is the estimate',
    detail:
      'We scope carefully so we can commit to a number and hold it. When something genuinely changes, we re-scope in the open before the work happens, never afterwards on an invoice.',
  },
  {
    title: 'You should not need us afterwards',
    detail:
      'Every engagement ends with documentation and a walkthrough, and the code is written to be handed over. A client who cannot leave is not a client, they are a hostage.',
  },
];

export default function About() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />

      <Section width="narrow">
        <h1 className="font-heading text-4xl font-semibold tracking-tight text-balance">
          A small studio, deliberately
        </h1>
        <p className="mt-6 text-lg text-muted-foreground text-pretty">
          {site.name} is three people who have spent a long time doing this. We stayed small because
          the work is better when the people who scoped it are the people building it.
        </p>
        <p className="mt-5 text-base leading-relaxed text-pretty">
          That constrains what we take on. We run one or two engagements at a time, which means we
          sometimes cannot start when you would like — but it also means the team you meet is the
          team you get, and nothing is handed to a junior after the pitch.
        </p>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow="Principles" title="How we work" />
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {principles.map((principle) => (
            <div key={principle.title}>
              <h3 className="font-heading text-lg font-semibold text-balance">{principle.title}</h3>
              <p className="mt-2.5 text-muted-foreground text-pretty">{principle.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Team" title="Who you will work with" />
        <ul className="mt-12 grid gap-8 sm:grid-cols-3">
          {team.map((person) => (
            <li key={person.name} className="flex flex-col items-start gap-4">
              <Avatar className="size-14">
                <AvatarFallback className="bg-primary/10 font-heading font-semibold text-primary">
                  {person.name
                    .split(' ')
                    .map((part) => part.charAt(0))
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-heading font-semibold">{person.name}</p>
                <p className="text-sm text-primary">{person.role}</p>
                <p className="mt-2 text-sm text-muted-foreground text-pretty">{person.bio}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <CallToAction />
    </>
  );
}
