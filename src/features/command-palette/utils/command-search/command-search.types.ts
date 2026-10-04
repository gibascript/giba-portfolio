/**
 * An entry of the command palette: its `label`, the `group` it shows under
 * (Seções, Ações, Links), a `hint` on the right (file name, e-mail…), the
 * single-key `shortcut` that does the same, when there is one, and what it
 * does when chosen (`run`).
 */
export type PaletteCommand = {
  id: string;
  group: string;
  label: string;
  hint: string;
  shortcut?: string;
  run: () => void;
};
