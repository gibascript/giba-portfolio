import { workbenchFileIds } from '@/constants/workbench-files';
import type { Stage } from '@/context/workbench/utils/stage-motion';
import type { KeyPress, ShortcutAction } from './single-key-shortcuts.types';

/** Keys that only act on the workbench. */
const workbenchKeys: Record<string, ShortcutAction> = {
  ']': { type: 'step-file', delta: 1 },
  '[': { type: 'step-file', delta: -1 },
  Escape: { type: 'go-home' },
};

/**
 * The single-key shortcut of a key press on `stage`, if any: `L` switches the
 * language and `1`–`8` open a file anywhere; Enter opens the workbench from
 * the hero; `[` / `]` step through the files and Esc goes home from the
 * workbench. Presses with a modifier or inside a text field are left alone.
 *
 * @example
 * shortcutAction({ key: '3', modified: false, inField: false, onControl: false }, 'hero')
 * // { type: 'open-file', file: 'projects' }
 */
export function shortcutAction(
  press: KeyPress,
  stage: Stage,
): ShortcutAction | null {
  if (press.modified || press.inField) {
    return null;
  }

  if (press.key.toLowerCase() === 'l') {
    return { type: 'toggle-locale' };
  }

  const file = /^[1-9]$/.test(press.key)
    ? workbenchFileIds[Number(press.key) - 1]
    : undefined;
  if (file) {
    return { type: 'open-file', file };
  }

  if (stage === 'hero') {
    return press.key === 'Enter' && !press.onControl
      ? { type: 'open-workbench' }
      : null;
  }

  return workbenchKeys[press.key] ?? null;
}
