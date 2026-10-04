import { Code, CodeToken } from '@/components/code';
import { Section, SectionTitle } from '@/components/section';
import { workbenchFiles } from '@/constants/workbench-files';
import { useLocaleContext } from '@/context/locale/use-locale-context';
import { certificationsContent } from '@/features/certifications/content/certifications';

/**
 * The certifications file (`certificacoes.json`), dressed as a JSON array:
 * one `"name"` per row, with its `"issuer"` when known.
 */
export default function Certifications() {
  const locale = useLocaleContext();

  return (
    <Section>
      <SectionTitle className="mt-0 mb-10">
        {workbenchFiles.certifications.title[locale.locale]}
      </SectionTitle>
      <Code aria-hidden className="text-muted">
        [
      </Code>
      <ol>
        {certificationsContent.map((certification) => (
          <li
            key={certification.name}
            className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-subtle py-3.5 pl-6"
          >
            <CodeToken
              aria-hidden
              kind="property"
              className="font-mono text-lg"
            >
              "name":
            </CodeToken>
            <span className="grow basis-80 font-display text-display-xs font-semibold text-strong">
              {certification.name}
            </span>
            {certification.issuer && (
              <Code as="span">
                <CodeToken kind="property">"issuer":</CodeToken>{' '}
                <CodeToken kind="string">"{certification.issuer}"</CodeToken>
              </Code>
            )}
          </li>
        ))}
      </ol>
      <Code aria-hidden className="text-muted">
        ]
      </Code>
    </Section>
  );
}
