import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { storageKeys } from '@/constants/storage-keys';
import { LocaleProvider } from './locale-provider';
import { useLocaleContext } from './use-locale-context';

function renderLocale() {
  return renderHook(() => useLocaleContext(), { wrapper: LocaleProvider });
}

describe('LocaleProvider', () => {
  afterEach(() => {
    localStorage.clear();
    document.documentElement.lang = '';
  });

  it('starts in pt-BR on a first visit', () => {
    const { result } = renderLocale();

    expect(result.current.locale).toBe('pt');
    expect(document.documentElement.lang).toBe('pt-BR');
  });

  it('switches to English and keeps the choice for the next visit', () => {
    const first = renderLocale();

    act(() => first.result.current.toggleLocale());

    expect(first.result.current.locale).toBe('en');
    expect(document.documentElement.lang).toBe('en');

    first.unmount();
    const next = renderLocale();
    expect(next.result.current.locale).toBe('en');
  });

  it('ignores an unsupported stored locale', () => {
    localStorage.setItem(storageKeys.locale, JSON.stringify('es'));

    const { result } = renderLocale();

    expect(result.current.locale).toBe('pt');
  });
});

describe('useLocaleContext', () => {
  it('throws outside a LocaleProvider', () => {
    expect(() => renderHook(() => useLocaleContext())).toThrow(
      'useLocaleContext must be used inside a LocaleProvider',
    );
  });
});
