import { Code, CodeToken } from '@/components/code';
import { Section, SectionTitle } from '@/components/section';
import { workbenchFiles } from '@/constants/workbench-files';
import { useLocaleContext } from '@/context/locale/use-locale-context';
import { stackContent } from '@/features/stack/content/stack';

/**
 * The stack file (`stack.yaml`), dressed as YAML: a grid of groups, each a key
 * over its list of technologies.
 */
export default function Stack() {
  const locale = useLocaleContext();
  const file = workbenchFiles.stack;

  return (
    <Section>
      <Code aria-hidden>
        <CodeToken kind="comment"># {file.name[locale.locale]}</CodeToken>
      </Code>
      <SectionTitle>{file.title[locale.locale]}</SectionTitle>
      <div className="grid grid-cols-stack gap-x-8 gap-y-10 font-mono text-lg leading-code">
        {stackContent[locale.locale].map((group) => (
          <div key={group.group}>
            <h3 className="text-syn-tag">{group.group}:</h3>
            <ul className="mt-1">
              {group.items.map((item) => (
                <li key={item} className="pl-4 text-strong">
                  <span aria-hidden className="text-faint">
                    -{' '}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
