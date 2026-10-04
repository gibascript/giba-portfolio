import type { ElementType } from 'react';
import { cn } from '@/utils/cn';
import type { GenericTag } from '@/utils/generic-tag';

/**
 * The 10px uppercase label of the giba-ds panels ("EXPLORER", "LINKS"), a `p`
 * unless rendered `as` another tag, e.g. the `h2` that names a panel.
 *
 * @typeParam T - Tag or component given in `as`.
 */
export function Overline<T extends ElementType = 'p'>({
  as,
  className,
  ...props
}: GenericTag<T>) {
  const Tag = as ?? 'p';

  return (
    <Tag
      className={cn(
        'text-xs font-semibold tracking-caps text-muted uppercase',
        className,
      )}
      {...props}
    />
  );
}
