import type { Locale, Localized } from './locale.types';

/** Supported locales; the first one is the default. */
export const locales: readonly Locale[] = ['pt', 'en'];

/** Value of `<html lang>` for each locale. */
export const htmlLangs: Localized<string> = {
  pt: 'pt-BR',
  en: 'en',
};

/**
 * Whether `value` is a supported locale, e.g. one read back from storage.
 *
 * @example
 * isLocale('en') // true
 * isLocale('pt-BR') // false
 */
export function isLocale(value: unknown): value is Locale {
  return locales.includes(value as Locale);
}
