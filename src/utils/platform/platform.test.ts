import { describe, expect, it } from 'vitest';
import { isApplePlatform } from './platform';

describe('isApplePlatform', () => {
  it('recognizes macOS and iOS devices', () => {
    expect(isApplePlatform('MacIntel')).toBe(true);
    expect(isApplePlatform('iPhone')).toBe(true);
    expect(isApplePlatform('iPad')).toBe(true);
  });

  it('rejects other platforms', () => {
    expect(isApplePlatform('Win32')).toBe(false);
    expect(isApplePlatform('Linux x86_64')).toBe(false);
    expect(isApplePlatform('')).toBe(false);
  });
});
