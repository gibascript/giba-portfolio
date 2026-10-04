import type { ComponentProps } from 'react';
import { cn } from '@/utils/cn';

/** A keyboard key chip, e.g. `⌘`, `K` or `esc`. */
export function Kbd({ className, ...props }: ComponentProps<'kbd'>) {
  return (
    <kbd
      className={cn(
        'inline-flex h-5 min-w-5 items-center justify-center rounded-sm bg-surface-control px-1 align-middle font-mono text-xs text-body',
        className,
      )}
      {...props}
    />
  );
}
