import { Code, CodeToken } from '@/components/code';
import { Section, SectionTitle } from '@/components/section';
import { workbenchFiles } from '@/constants/workbench-files';
import { useLocaleContext } from '@/context/locale/use-locale-context';
import { testimonialsContent } from '@/features/testimonials/content/testimonials';

/**
 * The testimonials file (`depoimentos.md`): each recommendation as a quote in
 * the display face, signed by its author and role.
 */
export default function Testimonials() {
  const locale = useLocaleContext();
  const title = workbenchFiles.testimonials.title[locale.locale];

  return (
    <Section>
      <Code aria-hidden>
        <CodeToken kind="comment"># {title}</CodeToken>
      </Code>
      <SectionTitle>{title}</SectionTitle>
      <ul>
        {testimonialsContent[locale.locale].map((testimonial) => (
          <li key={testimonial.author} className="border-t border-subtle py-7">
            <figure className="flex flex-col gap-4">
              <blockquote className="max-w-paragraph font-display text-display-xs font-semibold text-pretty text-strong">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="font-mono text-md leading-code text-muted">
                <span className="text-syn-keyword">— {testimonial.author}</span>
                , {testimonial.role}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
