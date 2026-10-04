import type { WorkbenchFileId } from '@/constants/workbench-files';

/** What a single-key shortcut does. */
export type ShortcutAction =
  | { type: 'toggle-locale' }
  | { type: 'open-workbench' }
  | { type: 'open-file'; file: WorkbenchFileId }
  | { type: 'step-file'; delta: number }
  | { type: 'go-home' };

/**
 * A key press, as the shortcuts see it: the `key`, whether a modifier was
 * held (`modified`), whether it was typed in a text field (`inField`) and
 * whether it hit a button or link, which Enter activates on its own
 * (`onControl`).
 */
export type KeyPress = {
  key: string;
  modified: boolean;
  inField: boolean;
  onControl: boolean;
};
