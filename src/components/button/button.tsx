import type { ElementType } from 'react';
import { cn } from '@/utils/cn';
import type { GenericTag } from '@/utils/generic-tag';
import {
  buttonSizes,
  buttonVariants,
  type ButtonSize,
  type ButtonVariant,
} from './button-variants';

type ButtonProps<T extends ElementType> = GenericTag<T> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

/**
 * giba-ds button: `primary` (gold accent), `secondary` (default) or `ghost`,
 * in `md` or `sm`. Renders a `type="button"` unless rendered `as` another tag,
 * e.g. `as="a"` for a download link styled as a button.
 *
 * @typeParam T - Tag or component given in `as`.
 */
export function Button<T extends ElementType = 'button'>({
  as,
  variant = 'secondary',
  size = 'md',
  className,
  ...props
}: ButtonProps<T>) {
  const Tag = as ?? 'button';

  return (
    <Tag
      {...(Tag === 'button' && { type: 'button' })}
      className={cn(
        'inline-flex items-center justify-center gap-1.5 rounded-sm font-sans leading-tight font-medium whitespace-nowrap no-underline transition not-disabled:active:scale-98 disabled:cursor-not-allowed disabled:opacity-50',
        buttonVariants[variant],
        buttonSizes[size],
        className,
      )}
      {...props}
    />
  );
}
