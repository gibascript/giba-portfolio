import { Code, CodeToken } from '@/components/code';
import { Section, SectionTitle } from '@/components/section';
import { workbenchFiles } from '@/constants/workbench-files';
import { useLocaleContext } from '@/context/locale/use-locale-context';
import { aboutContent } from '@/features/about/content/about';

/**
 * The about file (`sobre.md`): the lead headline, the paragraphs and, beside
 * them, the key facts as a `key: value` list.
 */
export default function About() {
  const locale = useLocaleContext();
  const content = aboutContent[locale.locale];

  return (
    <Section>
      <Code aria-hidden>
        <CodeToken kind="comment">
          # {workbenchFiles.about.title[locale.locale]}
        </CodeToken>
      </Code>
      <SectionTitle className="mb-0 max-w-lead text-display-md text-balance">
        {content.lead}
      </SectionTitle>
      <div className="mt-12 flex flex-wrap gap-x-16 gap-y-10">
        <div className="flex max-w-paragraph grow basis-105 flex-col gap-5">
          {content.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="text-prose-lg leading-loose text-pretty text-body"
            >
              {paragraph}
            </p>
          ))}
        </div>
        <dl className="flex basis-70 flex-col gap-4 font-mono text-lg leading-code">
          {content.facts.map((fact) => (
            <div
              key={fact.key}
              className="flex flex-col gap-0.5 border-b border-subtle pb-4"
            >
              <dt className="text-syn-tag">{fact.key}:</dt>
              <dd className="text-strong">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
