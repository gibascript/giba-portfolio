import { use, useId, type ComponentProps } from 'react';
import { cn } from '@/utils/cn';
import { SectionTitleIdContext } from './section-context';

/**
 * One workbench file of the portfolio (about, experience…), revealed with a
 * short fade when opened and named by its {@link SectionTitle}.
 */
export function Section({ className, ...props }: ComponentProps<'section'>) {
  const titleId = useId();

  return (
    <SectionTitleIdContext value={titleId}>
      <section
        aria-labelledby={titleId}
        className={cn('animate-reveal', className)}
        {...props}
      />
    </SectionTitleIdContext>
  );
}

/**
 * Display headline of a {@link Section}, an `h2` in Iosevka SemiBold. Sized
 * and spaced for most sections; override `className` for the others.
 */
export function SectionTitle({ className, ...props }: ComponentProps<'h2'>) {
  const titleId = use(SectionTitleIdContext);

  return (
    <h2
      id={titleId}
      className={cn(
        'mt-10 mb-12 font-display text-display-lg font-semibold text-strong',
        className,
      )}
      {...props}
    />
  );
}
