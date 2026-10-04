import type { ComponentProps, ElementType } from 'react';
import { cn } from '@/utils/cn';
import type { GenericTag } from '@/utils/generic-tag';
import { codeTokens, type CodeTokenKind } from './code-tokens';

type CodeTokenProps = ComponentProps<'span'> & {
  kind: CodeTokenKind;
};

/**
 * A line of code in Iosevka, 13px on a 20px row, a `div` unless rendered `as`
 * another tag. Lines that only decorate a section, such as
 * `export const experience = [`, should get `aria-hidden`.
 *
 * @typeParam T - Tag or component given in `as`.
 */
export function Code<T extends ElementType = 'div'>({
  as,
  className,
  ...props
}: GenericTag<T>) {
  const Tag = as ?? 'div';

  return (
    <Tag
      className={cn('font-mono text-lg leading-code', className)}
      {...props}
    />
  );
}

/** A piece of a {@link Code} line, colored as its syntax `kind`. */
export function CodeToken({ kind, className, ...props }: CodeTokenProps) {
  return <span className={cn(codeTokens[kind], className)} {...props} />;
}
