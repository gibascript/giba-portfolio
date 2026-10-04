import type { ComponentProps } from 'react';
import { cn } from '@/utils/cn';

/**
 * A line number in the gutter beside the hero, decorative. Offset it with a
 * top padding matching its line.
 */
export function HeroLineNumber({
  className,
  ...props
}: ComponentProps<'span'>) {
  return (
    <span
      aria-hidden
      className={cn(
        'pr-5 text-right text-lg leading-code text-faint',
        className,
      )}
      {...props}
    />
  );
}
