import { Code, CodeToken } from '@/components/code';
import { Section, SectionTitle } from '@/components/section';
import {
  Timeline,
  TimelineBody,
  TimelineItem,
  TimelinePeriod,
  TimelineTitle,
} from '@/components/timeline';
import { workbenchFiles } from '@/constants/workbench-files';
import { useLocaleContext } from '@/context/locale/use-locale-context';
import { experienceContent } from '@/features/experience/content/experience';
import { currentJobLabel } from '@/features/experience/experience-text';

/**
 * The experience file (`experiencia.ts`), dressed as an exported array: one
 * timeline entry per job, with its summary and highlights.
 */
export default function Experience() {
  const locale = useLocaleContext();

  return (
    <Section>
      <Code aria-hidden>
        <CodeToken kind="keyword" className="italic">
          export const
        </CodeToken>{' '}
        <CodeToken kind="function">experience</CodeToken>{' '}
        <CodeToken kind="punctuation">= [</CodeToken>
      </Code>
      <SectionTitle>
        {workbenchFiles.experience.title[locale.locale]}
      </SectionTitle>
      <Timeline>
        {experienceContent[locale.locale].map((job) => (
          <TimelineItem key={`${job.role}-${job.period}`}>
            <TimelinePeriod>
              <span>{job.period}</span>
              {job.current && (
                <span className="inline-flex items-center gap-1.5 text-success">
                  <span
                    aria-hidden
                    className="size-1.5 rounded-full bg-success"
                  />
                  {currentJobLabel[locale.locale]}
                </span>
              )}
            </TimelinePeriod>
            <TimelineBody>
              <TimelineTitle>
                {job.role}{' '}
                <span className="font-mono text-lg font-normal text-syn-keyword">
                  @ {job.company}
                </span>
              </TimelineTitle>
              <p className="max-w-summary text-prose leading-relaxed text-pretty text-body">
                {job.summary}
              </p>
              <ul className="mt-1.5 flex flex-col gap-2">
                {job.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex max-w-bullet text-lg leading-relaxed text-body"
                  >
                    <span
                      aria-hidden
                      className="w-5 shrink-0 font-mono text-faint"
                    >
                      –
                    </span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </TimelineBody>
          </TimelineItem>
        ))}
      </Timeline>
      <Code aria-hidden className="text-muted">
        ]
      </Code>
    </Section>
  );
}
