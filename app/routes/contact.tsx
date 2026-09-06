import { Form, useNavigation } from 'react-router';
import { CheckCircle2 } from 'lucide-react';

import type { Route } from './+types/contact';
import { Section } from '~/components/sections/Section';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Textarea } from '~/components/ui/textarea';
import { JsonLd } from '~/components/seo/JsonLd';
import { breadcrumbSchema, seo } from '~/lib/seo';
import { site } from '~/config/site';

export function meta(_: Route.MetaArgs) {
  return seo({
    title: 'Contact',
    description: `Tell ${site.name} what you are trying to build. We reply to every enquiry within two working days.`,
    path: '/contact',
  });
}

interface ActionResult {
  ok: boolean;
  errors?: Record<string, string>;
}

/**
 * The form posts back to this route.
 *
 * This runs on the server in the same process that rendered the page — no
 * companion API service, no client-side fetch. It is also why the form works
 * with JavaScript disabled: React Router submits it as a plain HTML form and
 * re-renders the result.
 */
export async function action({ request }: Route.ActionArgs): Promise<ActionResult> {
  const form = await request.formData();
  const name = String(form.get('name') ?? '').trim();
  const email = String(form.get('email') ?? '').trim();
  const message = String(form.get('message') ?? '').trim();

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = 'Please tell us your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'That does not look like an email address.';
  if (message.length < 20) errors.message = 'A sentence or two about the project, please.';

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  // A real deployment forwards this to an inbox or a CRM. The template stops
  // at validation so it has no outbound dependency to configure before it runs.
  return { ok: true };
}

export default function Contact({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const submitting = navigation.state === 'submitting';
  const errors = actionData?.errors ?? {};

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
      />

      <Section width="narrow">
        <h1 className="font-heading text-4xl font-semibold tracking-tight text-balance">
          Tell us about the project
        </h1>
        <p className="mt-5 text-lg text-muted-foreground text-pretty">
          The more specific you are about the problem, the more useful our first reply will be. We
          answer every enquiry within two working days, including the ones we turn down.
        </p>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            {actionData?.ok ? (
              <div
                role="status"
                className="flex items-start gap-3 rounded-lg border border-primary/30 bg-primary/5 p-5"
              >
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                <div>
                  <p className="font-heading font-semibold">Thank you — that has come through.</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    We will reply within two working days.
                  </p>
                </div>
              </div>
            ) : (
              <Form method="post" className="space-y-6" noValidate>
                <div className="space-y-2">
                  <Label htmlFor="name">Your name</Label>
                  <Input
                    id="name"
                    name="name"
                    autoComplete="name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name ? (
                    <p id="name-error" className="text-sm text-destructive">
                      {errors.name}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email ? (
                    <p id="email-error" className="text-sm text-destructive">
                      {errors.email}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">What are you trying to build?</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message ? (
                    <p id="message-error" className="text-sm text-destructive">
                      {errors.message}
                    </p>
                  ) : null}
                </div>

                <Button type="submit" size="lg" disabled={submitting}>
                  {submitting ? 'Sending…' : 'Send enquiry'}
                </Button>
              </Form>
            )}
          </div>

          <aside className="space-y-6 text-sm">
            <div>
              <h2 className="font-heading font-semibold text-foreground">Email</h2>
              <a className="mt-1 block text-muted-foreground hover:text-foreground" href={`mailto:${site.contact.email}`}>
                {site.contact.email}
              </a>
            </div>
            <div>
              <h2 className="font-heading font-semibold text-foreground">Phone</h2>
              <a
                className="mt-1 block text-muted-foreground hover:text-foreground"
                href={`tel:${site.contact.phone.replace(/\s/g, '')}`}
              >
                {site.contact.phone}
              </a>
            </div>
            <div>
              <h2 className="font-heading font-semibold text-foreground">Studio</h2>
              <address className="mt-1 not-italic text-muted-foreground">{site.contact.address}</address>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
