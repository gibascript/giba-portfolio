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
import { educationContent } from '@/features/education/content/education';

/** The education file (`formacao.md`): one timeline entry per course. */
export default function Education() {
  const locale = useLocaleContext();
  const title = workbenchFiles.education.title[locale.locale];

  return (
    <Section>
      <Code aria-hidden>
        <CodeToken kind="comment"># {title}</CodeToken>
      </Code>
      <SectionTitle>{title}</SectionTitle>
      <Timeline>
        {educationContent[locale.locale].map((course) => (
          <TimelineItem key={course.school}>
            <TimelinePeriod>{course.period}</TimelinePeriod>
            <TimelineBody className="gap-1.5">
              <TimelineTitle>{course.school}</TimelineTitle>
              <p className="text-prose leading-relaxed text-body">
                {course.course}
              </p>
            </TimelineBody>
          </TimelineItem>
        ))}
      </Timeline>
    </Section>
  );
}
