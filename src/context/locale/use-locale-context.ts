import { use } from 'react';
import { LocaleContext } from './locale-context';

/**
 * Reads the `LocaleContextValue` of the nearest `LocaleProvider`.
 *
 * @throws When rendered outside a `LocaleProvider`.
 */
export function useLocaleContext() {
  const context = use(LocaleContext);

  if (!context) {
    throw new Error('useLocaleContext must be used inside a LocaleProvider');
  }

  return context;
}
