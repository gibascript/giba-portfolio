import { Code, CodeToken } from '@/components/code';
import { Section, SectionTitle } from '@/components/section';
import { links } from '@/constants/links';
import { uiText } from '@/constants/ui-text';
import { useLocaleContext } from '@/context/locale/use-locale-context';
import { useWorkbenchContext } from '@/context/workbench/use-workbench-context';
import { ContactRow } from '@/features/contact/components/rows/contact-row';
import { ExternalHint } from '@/features/contact/components/rows/external-hint';
import { contactContent } from '@/features/contact/content/contact';

/**
 * The contact file (`contato.sh`), dressed as a shell script: copy the e-mail,
 * open LinkedIn or GitHub, or download the CV. The "copied" feedback also
 * shows in the status bar.
 */
export default function Contact() {
  const locale = useLocaleContext();
  const workbench = useWorkbenchContext();
  const content = contactContent[locale.locale];
  const ui = uiText[locale.locale];
  const copied = workbench.clipboard.copied;

  return (
    <Section>
      <Code aria-hidden>
        <CodeToken kind="comment">#!/usr/bin/env bash</CodeToken>
      </Code>
      <SectionTitle className="mb-3 text-display-xl">
        {content.lead}
      </SectionTitle>
      <p className="mb-12 text-prose-lg text-body">{content.invitation}</p>
      <ul className="border-t border-subtle text-lg leading-code">
        <li>
          <ContactRow
            command="$ mail"
            trailing={
              <span className={copied ? 'text-success' : 'text-muted'}>
                {copied ? `✓ ${ui.emailCopied}` : ui.copyEmail}
              </span>
            }
            onClick={() => workbench.clipboard.copy(links.email)}
          >
            {links.email}
          </ContactRow>
        </li>
        <li>
          <ContactRow
            as="a"
            href={links.linkedin.url}
            target="_blank"
            rel="noopener"
            command="$ open"
            trailing={<ExternalHint label={ui.newTab} />}
          >
            {links.linkedin.label}
          </ContactRow>
        </li>
        <li>
          <ContactRow
            as="a"
            href={links.github.url}
            target="_blank"
            rel="noopener"
            command="$ open"
            trailing={<ExternalHint label={ui.newTab} />}
          >
            {links.github.label}
          </ContactRow>
        </li>
        <li>
          <ContactRow
            as="a"
            href={links.cv.url}
            download={links.cv.fileName}
            command="$ curl -O"
            trailing={
              <span aria-hidden className="text-muted">
                ↓
              </span>
            }
          >
            {links.cv.fileName}
          </ContactRow>
        </li>
      </ul>
    </Section>
  );
}
