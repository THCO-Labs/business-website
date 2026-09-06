import { Link } from 'react-router';

import { Button } from '~/components/ui/button';

export function CallToAction({
  title = 'Have a project in mind?',
  description = 'Tell us what you are trying to build and we will tell you honestly whether we are the right studio for it.',
  action = { label: 'Start a conversation', to: '/contact' },
}: {
  title?: string;
  description?: string;
  action?: { label: string; to: string };
}) {
  return (
    <section className="border-b bg-foreground text-background last:border-b-0">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-16 sm:flex-row sm:items-center sm:justify-between sm:py-20">
        <div className="max-w-xl">
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            {title}
          </h2>
          <p className="mt-3 text-background/70 text-pretty">{description}</p>
        </div>
        <Button asChild size="lg" variant="secondary" className="shrink-0">
          <Link to={action.to}>{action.label}</Link>
        </Button>
      </div>
    </section>
  );
}
