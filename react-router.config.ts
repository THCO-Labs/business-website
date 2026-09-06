import type { Config } from '@react-router/dev/config';

export default {
  // Server-side rendering is the entire reason this template exists: an
  // ordinary marketing site has to be crawlable, so pages must arrive as HTML
  // rather than as an empty div the client fills in later.
  ssr: true,
} satisfies Config;
