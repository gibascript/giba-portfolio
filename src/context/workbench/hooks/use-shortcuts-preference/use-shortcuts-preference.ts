import { storageKeys } from '@/constants/storage-keys';
import { useLocalStorage } from '@/hooks/use-local-storage';

/** Whether the single-key shortcuts are on, and how to switch them. */
export type ShortcutsPreference = {
  shortcutsEnabled: boolean;
  toggleShortcuts: () => void;
};

function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

/**
 * The visitor's choice about single-key shortcuts (`L`, `1`–`8`, `[`, `]`,
 * Enter, Esc): on by default, kept in `localStorage`. Turning them off meets
 * WCAG 2.1.4 for anyone who types with speech or hits keys by accident.
 */
export function useShortcutsPreference(): ShortcutsPreference {
  const [shortcutsEnabled, setShortcutsEnabled] = useLocalStorage(
    storageKeys.shortcuts,
    true,
    isBoolean,
  );

  return {
    shortcutsEnabled,
    toggleShortcuts: () => setShortcutsEnabled(!shortcutsEnabled),
  };
}
