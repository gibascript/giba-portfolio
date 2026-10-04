import type { ComponentProps } from 'react';
import { FileIcon } from '@/components/file-icon';
import type { FileIconType } from '@/components/file-icon/file-icons';
import { cn } from '@/utils/cn';

type HeroFileLinkProps = ComponentProps<'button'> & {
  number: string;
  icon: FileIconType;
};

/**
 * A file of the hero explorer: its two-digit `number` (the shortcut key), its
 * `icon` and its name (`children`). Opens the file in the workbench.
 */
export function HeroFileLink({
  number,
  icon,
  className,
  children,
  ...props
}: HeroFileLinkProps) {
  return (
    <button
      type="button"
      className={cn(
        'flex h-8 w-full items-center gap-2 rounded-sm px-2 text-left font-mono text-lg text-body transition-colors hover:bg-surface-hover hover:text-strong',
        className,
      )}
      {...props}
    >
      <span aria-hidden className="w-7 shrink-0 text-sm text-faint">
        {number}
      </span>
      <span className="flex w-4 shrink-0 justify-center">
        <FileIcon type={icon} />
      </span>
      <span className="truncate">{children}</span>
    </button>
  );
}
