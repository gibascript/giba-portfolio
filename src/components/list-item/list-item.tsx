import type { ElementType } from 'react';
import { FileIcon } from '@/components/file-icon';
import type { FileIconType } from '@/components/file-icon/file-icons';
import { cn } from '@/utils/cn';
import type { GenericTag } from '@/utils/generic-tag';

type ListItemProps<T extends ElementType> = GenericTag<T> & {
  icon?: FileIconType;
  nested?: boolean;
  chevron?: 'open' | 'closed';
};

/**
 * A 22px row of the explorer tree, a `button` unless rendered `as` another
 * tag. The row marked with `aria-current="page"` is the selected one.
 *
 * @remarks
 * `icon` is the file type drawn before the label, which is cut with an
 * ellipsis when the sidebar is too narrow. `nested` indents the row one level,
 * with an indent guide on its left. `chevron` draws a folder chevron, rotated
 * when `open`; rows without one keep its slot, so labels stay aligned.
 *
 * @typeParam T - Tag or component given in `as`.
 */
export function ListItem<T extends ElementType = 'button'>({
  as,
  icon,
  nested = false,
  chevron,
  className,
  children,
  ...props
}: ListItemProps<T>) {
  const Tag = as ?? 'button';

  return (
    <Tag
      {...(Tag === 'button' && { type: 'button' })}
      className={cn(
        'relative flex h-5.5 w-full items-center gap-1.5 pr-3 text-left font-sans text-lg whitespace-nowrap text-body no-underline hover:bg-surface-selected hover:text-strong aria-[current=page]:bg-surface-selected aria-[current=page]:text-strong aria-[current=page]:outline aria-[current=page]:-outline-offset-1 aria-[current=page]:outline-strong',
        nested ? 'pl-5' : 'pl-2',
        className,
      )}
      {...props}
    >
      {nested && (
        <span
          aria-hidden
          className="absolute inset-y-0 left-3.5 w-px bg-guide"
        />
      )}
      <span
        aria-hidden
        className="inline-flex w-3.5 shrink-0 justify-center text-body"
      >
        {chevron && (
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className={cn(
              'transition-transform duration-200',
              chevron === 'open' && 'rotate-90',
            )}
          >
            <path
              d="M4 3L8 6L4 9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      {icon && <FileIcon type={icon} className="size-4" />}
      <span className="flex-1 truncate">{children}</span>
    </Tag>
  );
}
