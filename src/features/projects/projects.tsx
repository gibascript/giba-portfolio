import { Code, CodeToken } from '@/components/code';
import { Section, SectionTitle } from '@/components/section';
import { workbenchFiles } from '@/constants/workbench-files';
import { useLocaleContext } from '@/context/locale/use-locale-context';
import { ProjectCard } from '@/features/projects/components/cards/project-card';
import { projectsContent } from '@/features/projects/content/projects';

/**
 * The projects file (`projetos.tsx`), dressed as a component: a grid of
 * numbered project cards split by hairlines.
 */
export default function Projects() {
  const locale = useLocaleContext();

  return (
    <Section>
      <Code aria-hidden>
        <CodeToken kind="keyword" className="italic">
          export default function
        </CodeToken>{' '}
        <CodeToken kind="function">Projects</CodeToken>
        <CodeToken kind="punctuation">() {'{'}</CodeToken>
      </Code>
      <SectionTitle>
        {workbenchFiles.projects.title[locale.locale]}
      </SectionTitle>
      <ul className="grid grid-cols-cards gap-px overflow-hidden rounded-md border border-default bg-surface-control">
        {projectsContent[locale.locale].map((project, index) => (
          <li key={project.name}>
            <ProjectCard
              number={String(index + 1).padStart(2, '0')}
              project={project}
            />
          </li>
        ))}
      </ul>
      <Code aria-hidden className="mt-6 text-muted">
        {'}'}
      </Code>
    </Section>
  );
}
