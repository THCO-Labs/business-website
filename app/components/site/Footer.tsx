import { Link } from 'react-router';

import { Separator } from '~/components/ui/separator';
import { footerNav, site } from '~/config/site';

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="font-heading text-lg font-semibold tracking-tight">{site.name}</p>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">{site.description}</p>
            <address className="mt-5 space-y-1 text-sm not-italic text-muted-foreground">
              <div>{site.contact.address}</div>
              <div>
                <a className="hover:text-foreground" href={`mailto:${site.contact.email}`}>
                  {site.contact.email}
                </a>
              </div>
              <div>
                <a className="hover:text-foreground" href={`tel:${site.contact.phone.replace(/\s/g, '')}`}>
                  {site.contact.phone}
                </a>
              </div>
            </address>
          </div>

          {footerNav.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <h2 className="text-sm font-semibold">{group.heading}</h2>
              <ul className="mt-4 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} className="text-sm text-muted-foreground hover:text-foreground">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <Separator className="my-10" />

        <div className="flex flex-col items-start justify-between gap-4 text-sm text-muted-foreground sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <ul className="flex gap-5">
            {site.social.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="hover:text-foreground"
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
