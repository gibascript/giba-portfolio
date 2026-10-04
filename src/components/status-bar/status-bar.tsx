import type { ComponentProps } from 'react';
import { cn } from '@/utils/cn';

/**
 * The 24px status bar under the workbench: a {@link StatusBarGroup} on each
 * end, holding {@link StatusBarItem}s and {@link StatusBarButton}s.
 */
export function StatusBar({ className, ...props }: ComponentProps<'footer'>) {
  return (
    <footer
      className={cn(
        'flex h-status-bar shrink-0 items-stretch justify-between border-t border-subtle bg-surface px-1.5 font-sans text-md text-body',
        className,
      )}
      {...props}
    />
  );
}

/** One end of the status bar. */
export function StatusBarGroup({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('flex items-stretch', className)} {...props} />;
}

/** Static status text, e.g. the clock. */
export function StatusBarItem({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      className={cn(
        'inline-flex h-full items-center gap-1 px-1.5 whitespace-nowrap',
        className,
      )}
      {...props}
    />
  );
}

/** A status entry that runs an action, highlighted on hover. */
export function StatusBarButton({
  className,
  ...props
}: ComponentProps<'button'>) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex h-full items-center gap-1 px-1.5 whitespace-nowrap transition-colors hover:bg-surface-hover hover:text-strong',
        className,
      )}
      {...props}
    />
  );
}
