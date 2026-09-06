/**
 * Structured data.
 *
 * Kept as a component so the `dangerouslySetInnerHTML` call — the one place
 * this template injects raw markup — exists once and is reviewable, rather
 * than being repeated in every route that wants a schema block.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
