import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';
import { storageKeys } from '@/constants/storage-keys';
import type { Locale } from '@/utils/locale';
import { AppProviders } from './app-providers';

type RenderWithProvidersOptions = Omit<RenderOptions, 'wrapper'> & {
  locale?: Locale;
};

/**
 * Renders `ui` inside the {@link AppProviders}, starting in `locale` (pt by
 * default). The setup clears the stored locale after each test.
 */
export function renderWithProviders(
  ui: ReactElement,
  { locale = 'pt', ...options }: RenderWithProvidersOptions = {},
) {
  localStorage.setItem(storageKeys.locale, JSON.stringify(locale));

  return render(ui, { wrapper: AppProviders, ...options });
}
