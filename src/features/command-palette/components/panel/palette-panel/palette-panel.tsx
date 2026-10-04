import { useId } from 'react';
import { Kbd } from '@/components/kbd';
import { uiText } from '@/constants/ui-text';
import { PaletteOption } from '@/features/command-palette/components/panel/palette-option';
import { commandPaletteText } from '@/features/command-palette/constants/command-palette-text';
import type { PaletteCommand } from '@/features/command-palette/utils/command-search';
import type { Locale } from '@/utils/locale';
import { usePaletteSearch } from './hooks/use-palette-search';

type PalettePanelProps = {
  locale: Locale;
  commands: readonly PaletteCommand[];
  onRun: (command: PaletteCommand) => void;
};

/**
 * The palette box: a search field over the list of matching commands, as an
 * ARIA combobox. The field is the first focusable element, so the opening
 * dialog focuses it; focus stays there, and the selected option is announced
 * through `aria-activedescendant`. Mount it per opening to start blank.
 */
export function PalettePanel({ locale, commands, onRun }: PalettePanelProps) {
  const listId = useId();
  const search = usePaletteSearch(commands, onRun);
  const text = commandPaletteText[locale];
  const selected = search.results[search.selected];

  return (
    <div className="w-palette animate-reveal-fast overflow-hidden rounded-md border border-default bg-surface shadow-popup">
      <div className="flex h-11 items-center gap-2.5 border-b border-subtle px-3.5">
        <span aria-hidden className="font-mono text-lg text-accent">
          &gt;
        </span>
        <input
          role="combobox"
          aria-expanded
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={
            selected ? `${listId}-${selected.id}` : undefined
          }
          aria-label={text.placeholder}
          placeholder={text.placeholder}
          value={search.query}
          onChange={search.onQueryChange}
          onKeyDown={search.onQueryKeyDown}
          className="h-full min-w-0 flex-1 bg-transparent font-sans text-prose text-strong outline-none placeholder:text-muted focus-visible:shadow-none"
        />
        <Kbd>esc</Kbd>
      </div>
      <div className="max-h-90 overflow-x-hidden overflow-y-auto p-1">
        <div id={listId} role="listbox" aria-label={uiText[locale].palette}>
          {search.results.map((command, index) => (
            <PaletteOption
              key={command.id}
              id={`${listId}-${command.id}`}
              command={command}
              selected={index === search.selected}
              onSelect={() => search.select(index)}
              onRun={() => onRun(command)}
            />
          ))}
        </div>
        {search.results.length === 0 && (
          <p role="status" className="p-5 text-center text-md text-muted">
            {text.noResults}
          </p>
        )}
      </div>
    </div>
  );
}
