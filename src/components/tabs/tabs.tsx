import type { ComponentProps } from 'react';
import { FileIcon } from '@/components/file-icon';
import type { FileIconType } from '@/components/file-icon/file-icons';
import { cn } from '@/utils/cn';

type TabProps = ComponentProps<'div'> & {
  active?: boolean;
};

type TabTriggerProps = ComponentProps<'button'> & {
  icon?: FileIconType;
};

type TabCloseProps = Omit<ComponentProps<'button'>, 'children'> & {
  'aria-label': string;
};

/**
 * Editor tab bar: a 36px row of {@link Tab}s that scrolls sideways when the
 * open files do not fit.
 */
export function Tabs({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'flex h-tab-bar shrink-0 items-stretch overflow-x-auto border-b border-subtle bg-surface',
        className,
      )}
      {...props}
    />
  );
}

/**
 * One editor tab, holding a {@link TabTrigger} and a {@link TabClose}. The
 * `active` tab is lighter, with a top line, and merges into the editor below.
 */
export function Tab({ active = false, className, ...props }: TabProps) {
  return (
    <div
      data-active={active || undefined}
      className={cn(
        'group -mb-px flex h-full shrink-0 items-center border-y border-r border-y-transparent border-r-subtle bg-surface font-sans text-lg whitespace-nowrap text-muted transition-colors not-data-active:hover:bg-surface-hover data-active:border-t-strong data-active:border-b-surface-active data-active:bg-surface-active data-active:text-body',
        className,
      )}
      {...props}
    />
  );
}

/** Selects the tab: the `icon` of its file type, then the file name. */
export function TabTrigger({
  icon,
  className,
  children,
  ...props
}: TabTriggerProps) {
  return (
    <button
      type="button"
      className={cn('flex h-full items-center gap-1.5 pr-0.5 pl-3', className)}
      {...props}
    >
      {icon && <FileIcon type={icon} />}
      {children}
    </button>
  );
}

/**
 * Closes the tab; named by `aria-label`, e.g. "Fechar sobre.md". Shown on the
 * active tab, on hover and on keyboard focus. The button is a 24px target
 * (WCAG 2.5.8) around the glyph.
 */
export function TabClose({ className, ...props }: TabCloseProps) {
  return (
    <button
      type="button"
      className={cn(
        'mr-1.5 inline-flex size-6 items-center justify-center rounded-xs text-prose leading-none text-body opacity-0 group-hover:opacity-70 group-data-active:opacity-70 focus-visible:opacity-70',
        className,
      )}
      {...props}
    >
      <span aria-hidden>×</span>
    </button>
  );
}
