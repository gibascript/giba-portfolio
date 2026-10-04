import type { ComponentProps } from 'react';
import { cn } from '@/utils/cn';
import { fileIcons, type FileIconType } from './file-icons';

type FileIconProps = Omit<ComponentProps<'img'>, 'src' | 'alt'> & {
  type: FileIconType;
};

/**
 * Icon of a file type, 14px by default. Decorative: the file name always sits
 * next to it, so it has an empty `alt`.
 */
export function FileIcon({ type, className, ...props }: FileIconProps) {
  return (
    <img
      src={fileIcons[type]}
      alt=""
      className={cn('size-3.5 shrink-0', className)}
      {...props}
    />
  );
}
