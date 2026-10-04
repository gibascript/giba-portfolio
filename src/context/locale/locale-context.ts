import { createContext } from 'react';
import type { Locale } from '@/utils/locale';

/**
 * The active locale and how to change it. `toggleLocale` switches between pt
 * and en, as the status bar, the palette and the `L` shortcut do.
 */
export type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
};

/** Holds the {@link LocaleContextValue} given by `LocaleProvider`. */
export const LocaleContext = createContext<LocaleContextValue | null>(null);
