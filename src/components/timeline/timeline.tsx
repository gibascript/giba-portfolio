import type { ComponentProps } from 'react';
import { cn } from '@/utils/cn';

/**
 * Ordered list of dated entries (jobs, courses): each {@link TimelineItem}
 * puts its {@link TimelinePeriod} beside a {@link TimelineBody}, and stacks
 * them when the editor is too narrow.
 */
export function Timeline({ className, ...props }: ComponentProps<'ol'>) {
  return <ol className={cn('flex flex-col', className)} {...props} />;
}

/** One entry, separated from the previous one by a hairline. */
export function TimelineItem({ className, ...props }: ComponentProps<'li'>) {
  return (
    <li
      className={cn(
        'flex flex-wrap gap-x-10 gap-y-2 border-t border-subtle py-7',
        className,
      )}
      {...props}
    />
  );
}

/** The 190px column with the dates of the entry. */
export function TimelinePeriod({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'flex shrink-0 basis-47.5 flex-col gap-1.5 font-mono text-md leading-code text-muted',
        className,
      )}
      {...props}
    />
  );
}

/** Title, text and details of the entry. */
export function TimelineBody({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn('flex min-w-0 grow basis-95 flex-col gap-2.5', className)}
      {...props}
    />
  );
}

/** Title of the entry: the role, or the school. */
export function TimelineTitle({ className, ...props }: ComponentProps<'h3'>) {
  return (
    <h3
      className={cn(
        'text-xl leading-snug font-semibold text-strong',
        className,
      )}
      {...props}
    />
  );
}
