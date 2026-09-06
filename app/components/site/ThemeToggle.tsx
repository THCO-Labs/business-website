import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { site } from '~/config/site';

/**
 * Light/dark switch for a server-rendered site.
 *
 * The build-time choice is painted by the server, which is why `Layout` puts
 * the class on `<html>` directly — a marketing site must arrive as correct HTML,
 * not as something JavaScript fixes afterwards. This only handles a visitor
 * changing their mind, and the inline script in `Layout` re-applies that choice
 * before first paint so returning visitors never see a flash of the other mode.
 */

const STORAGE_KEY = `${site.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-theme`;

export function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  // Reads the DOM rather than storage: `Layout`'s script has already decided
  // what is painted, and disagreeing with it would flip the page on hydration.
  useEffect(() => setDark(document.documentElement.classList.contains('dark')), []);

  const toggle = () => {
    const next = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light');
    } catch {
      /* Private browsing blocks storage; the choice still applies for this visit. */
    }
    setDark(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="grid size-9 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
    >
      {/* Both icons render until the effect runs, so the button never shifts
          size between the server's HTML and the client's first paint. */}
      {dark === null ? <Sun className="size-4" aria-hidden /> : dark ? <Sun className="size-4" aria-hidden /> : <Moon className="size-4" aria-hidden />}
    </button>
  );
}

export const THEME_STORAGE_KEY = STORAGE_KEY;
