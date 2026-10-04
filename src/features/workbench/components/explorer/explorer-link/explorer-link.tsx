import type { ComponentProps } from 'react';
import { cn } from '@/utils/cn';

type ExplorerLinkProps = ComponentProps<'a'> & {
  glyph: '↗' | '↓';
  hint?: string;
};

/**
 * A link of the explorer "Links" panel: the label, then a faint `glyph` (↗ for
 * an external page, ↓ for a download). `hint` is read by screen readers only,
 * e.g. "(abre em nova aba)".
 */
export function ExplorerLink({
  glyph,
  hint,
  className,
  children,
  ...props
}: ExplorerLinkProps) {
  return (
    <a
      className={cn(
        'flex justify-between gap-2 rounded-sm px-2 py-1 text-md whitespace-nowrap text-body no-underline hover:bg-surface-hover hover:text-strong',
        className,
      )}
      {...props}
    >
      <span>
        {children}
        {hint && (
          <>
            {' '}
            <span className="sr-only">{hint}</span>
          </>
        )}
      </span>
      <span aria-hidden className="text-faint">
        {glyph}
      </span>
    </a>
  );
}
