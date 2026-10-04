import { useState } from 'react';

/**
 * A preference kept in `localStorage` as JSON. A stored value that fails
 * `isValid` (an old format, a hand edit) reads as `fallback`, and a storage
 * that throws (blocked cookies, private mode) only stops the persistence.
 *
 * @typeParam T - Type of the stored value.
 * @param key - `localStorage` key, one of `storageKeys`.
 * @param fallback - Value while nothing valid is stored.
 * @param isValid - Type guard for the parsed stored value.
 * @returns The value and its setter, which also stores it.
 */
export function useLocalStorage<T>(
  key: string,
  fallback: T,
  isValid: (value: unknown) => value is T,
) {
  const [value, setValue] = useState(() => {
    const stored = readStored(key);

    return isValid(stored) ? stored : fallback;
  });

  const update = (next: T) => {
    setValue(next);
    try {
      localStorage.setItem(key, JSON.stringify(next));
    } catch {
      // The value still applies to this visit.
    }
  };

  return [value, update] as const;
}

function readStored(key: string): unknown {
  try {
    const raw = localStorage.getItem(key);

    return raw === null ? undefined : JSON.parse(raw);
  } catch {
    return undefined;
  }
}
