import { useId, type ComponentProps } from 'react';
import type { Project } from '@/features/projects/utils/projects';
import { cn } from '@/utils/cn';

type ProjectCardProps = ComponentProps<'article'> & {
  number: string;
  project: Project;
};

/**
 * One project of the grid: a large faint `number`, the context, the name, the
 * description and the technology tags. Lightens on hover.
 */
export function ProjectCard({
  number,
  project,
  className,
  ...props
}: ProjectCardProps) {
  const titleId = useId();

  return (
    <article
      aria-labelledby={titleId}
      className={cn(
        'flex h-full flex-col gap-3.5 bg-surface p-7 transition-colors hover:bg-surface-raised',
        className,
      )}
      {...props}
    >
      <div className="flex items-baseline justify-between gap-4">
        <span
          aria-hidden
          className="font-display text-numeral font-semibold text-ghost"
        >
          {number}
        </span>
        <span className="text-right font-mono text-sm whitespace-nowrap text-muted">
          {project.context}
        </span>
      </div>
      <h3
        id={titleId}
        className="text-xl leading-snug font-semibold text-strong"
      >
        {project.name}
      </h3>
      <p className="flex-1 text-lg leading-loose text-pretty text-body">
        {project.description}
      </p>
      <ul className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-sm bg-surface-control px-2 py-0.5 font-mono text-sm leading-4.5 whitespace-nowrap text-body"
          >
            {tag}
          </li>
        ))}
      </ul>
    </article>
  );
}
