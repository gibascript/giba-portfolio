import { useEffect, useRef } from 'react';
import { Kbd } from '@/components/kbd';
import type { PaletteCommand } from '@/features/command-palette/utils/command-search';

type PaletteOptionProps = {
  id: string;
  command: PaletteCommand;
  selected: boolean;
  onSelect: () => void;
  onRun: () => void;
};

/**
 * One command of the palette list: its group, label, hint and single-key
 * shortcut, when it has one (exposed as `aria-keyshortcuts`). The `selected`
 * option is highlighted and scrolled into view; moving the mouse over an
 * option selects it, and a click runs it.
 */
export function PaletteOption({
  id,
  command,
  selected,
  onSelect,
  onRun,
}: PaletteOptionProps) {
  const option = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selected) {
      option.current?.scrollIntoView?.({ block: 'nearest' });
    }
  }, [selected]);

  return (
    <div
      ref={option}
      id={id}
      role="option"
      aria-selected={selected}
      aria-keyshortcuts={command.shortcut}
      onClick={onRun}
      onMouseMove={selected ? undefined : onSelect}
      className="flex h-8 cursor-pointer items-center gap-3 rounded-sm px-2.5 text-body aria-selected:bg-surface-selected aria-selected:text-strong"
    >
      <span className="w-18 shrink-0 font-mono text-xs tracking-caps whitespace-nowrap text-faint uppercase">
        {command.group}
      </span>
      <span className="min-w-0 flex-1 truncate text-lg">{command.label}</span>
      <span className="font-mono text-sm whitespace-nowrap text-muted">
        {command.hint}
      </span>
      {command.shortcut && <Kbd aria-hidden>{command.shortcut}</Kbd>}
    </div>
  );
}
