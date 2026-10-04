import { describe, expect, it } from 'vitest';
import { isLocale } from './locale';

describe('isLocale', () => {
  it('accepts the supported locales', () => {
    expect(isLocale('pt')).toBe(true);
    expect(isLocale('en')).toBe(true);
  });

  it('rejects anything else read back from storage', () => {
    expect(isLocale('pt-BR')).toBe(false);
    expect(isLocale('')).toBe(false);
    expect(isLocale(null)).toBe(false);
    expect(isLocale(1)).toBe(false);
  });
});
