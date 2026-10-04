import { useState, type ChangeEvent, type KeyboardEvent } from 'react';
import {
  filterCommands,
  type PaletteCommand,
} from '@/features/command-palette/utils/command-search';

/**
 * The palette search: the `query`, the commands matching it (`results`), the
 * index of the `selected` one (-1 when none matches) and the handlers of the
 * search field and of hovering an option.
 */
export type PaletteSearch = {
  query: string;
  results: readonly PaletteCommand[];
  selected: number;
  select: (index: number) => void;
  onQueryChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onQueryKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
};

/**
 * Filters `commands` as the visitor types, selecting the first match on each
 * change. ↓ and ↑ move the selection, stopping at the ends; Enter runs the
 * selected command with `onRun`.
 */
export function usePaletteSearch(
  commands: readonly PaletteCommand[],
  onRun: (command: PaletteCommand) => void,
): PaletteSearch {
  const [search, setSearch] = useState({ query: '', selected: 0 });
  const results = filterCommands(commands, search.query);
  const selected = Math.min(search.selected, results.length - 1);
  const select = (index: number) =>
    setSearch({ query: search.query, selected: index });

  const onQueryKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      select(Math.min(results.length - 1, selected + 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      select(Math.max(0, selected - 1));
    } else if (event.key === 'Enter' && results[selected]) {
      event.preventDefault();
      onRun(results[selected]);
    }
  };

  return {
    query: search.query,
    results,
    selected,
    select,
    onQueryChange: (event) =>
      setSearch({ query: event.target.value, selected: 0 }),
    onQueryKeyDown,
  };
}
