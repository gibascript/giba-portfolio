import type { OpenFiles } from './open-files.types';

/**
 * Makes `id` the active file, adding a tab at the end when it has none.
 *
 * @example
 * openFile({ active: 'a', tabs: ['a'] }, 'b') // { active: 'b', tabs: ['a', 'b'] }
 */
export function openFile<T>(files: OpenFiles<T>, id: T): OpenFiles<T> {
  return {
    active: id,
    tabs: files.tabs.includes(id) ? files.tabs : [...files.tabs, id],
  };
}

/**
 * Closes the tab of `id`. Closing the active tab activates the last one left;
 * closing the last tab of all reopens `fallback`, so the editor is never empty.
 *
 * @example
 * closeTab({ active: 'b', tabs: ['a', 'b', 'c'] }, 'b', 'a') // { active: 'c', tabs: ['a', 'c'] }
 * closeTab({ active: 'b', tabs: ['b'] }, 'b', 'a') // { active: 'a', tabs: ['a'] }
 */
export function closeTab<T>(
  files: OpenFiles<T>,
  id: T,
  fallback: T,
): OpenFiles<T> {
  const tabs = files.tabs.filter((tab) => tab !== id);

  if (tabs.length === 0) {
    return { active: fallback, tabs: [fallback] };
  }

  return {
    active: files.active === id ? tabs[tabs.length - 1] : files.active,
    tabs,
  };
}
