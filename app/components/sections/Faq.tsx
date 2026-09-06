import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion';
import { JsonLd } from '~/components/seo/JsonLd';

export interface FaqEntry {
  question: string;
  answer: string;
}

/**
 * An FAQ is one of the few section types with a schema.org form that search
 * engines actually surface, so the structured data is emitted alongside the
 * markup rather than being left to whoever remembers.
 */
export function Faq({ entries }: { entries: FaqEntry[] }) {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: entries.map((entry) => ({
            '@type': 'Question',
            name: entry.question,
            acceptedAnswer: { '@type': 'Answer', text: entry.answer },
          })),
        }}
      />
      <Accordion type="single" collapsible className="mt-10 w-full">
        {entries.map((entry, index) => (
          <AccordionItem key={entry.question} value={`item-${index}`}>
            <AccordionTrigger className="text-left font-heading text-base">
              {entry.question}
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              {entry.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}
