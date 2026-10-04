import { useEffect, type PropsWithChildren } from 'react';
import { storageKeys } from '@/constants/storage-keys';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { htmlLangs, isLocale, locales } from '@/utils/locale';
import { LocaleContext } from './locale-context';

/**
 * Language of the product text: pt-BR unless the visitor chose English
 * before. The choice persists in `localStorage` and sets `<html lang>`, so
 * screen readers switch pronunciation with it.
 */
export function LocaleProvider({ children }: PropsWithChildren) {
  const [locale, setLocale] = useLocalStorage(
    storageKeys.locale,
    locales[0],
    isLocale,
  );

  useEffect(() => {
    document.documentElement.lang = htmlLangs[locale];
  }, [locale]);

  const toggleLocale = () => setLocale(locale === 'pt' ? 'en' : 'pt');

  return (
    <LocaleContext value={{ locale, setLocale, toggleLocale }}>
      {children}
    </LocaleContext>
  );
}
