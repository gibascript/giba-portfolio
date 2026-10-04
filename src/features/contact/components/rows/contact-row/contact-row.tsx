import type { ElementType, ReactNode } from 'react';
import { cn } from '@/utils/cn';
import type { GenericTag } from '@/utils/generic-tag';

type ContactRowProps<T extends ElementType> = GenericTag<T> & {
  command: string;
  trailing: ReactNode;
};

/**
 * A contact channel dressed as a shell line: the `command` (e.g. `$ mail`),
 * the value in the display face and a `trailing` hint (↗, ↓, "Copiar
 * e-mail"). A `button` unless rendered `as` another tag, e.g. a link.
 *
 * @typeParam T - Tag or component given in `as`.
 */
export function ContactRow<T extends ElementType = 'button'>({
  as,
  command,
  trailing,
  className,
  children,
  ...props
}: ContactRowProps<T>) {
  const Tag = as ?? 'button';

  return (
    <Tag
      {...(Tag === 'button' && { type: 'button' })}
      className={cn(
        'flex w-full flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-subtle py-5 text-left font-mono text-body no-underline transition-colors hover:bg-surface-raised hover:text-strong',
        className,
      )}
      {...props}
    >
      <span className="text-syn-keyword">{command}</span>{' '}
      <span className="grow basis-75 font-display text-display-sm font-semibold break-all text-strong">
        {children}
      </span>{' '}
      <span className="text-md">{trailing}</span>
    </Tag>
  );
}
