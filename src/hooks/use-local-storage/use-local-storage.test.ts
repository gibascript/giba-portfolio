import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useLocalStorage } from './use-local-storage';

const isBoolean = (value: unknown): value is boolean =>
  typeof value === 'boolean';

describe('useLocalStorage', () => {
  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('starts from the stored value', () => {
    localStorage.setItem('flag', 'true');

    const { result } = renderHook(() =>
      useLocalStorage('flag', false, isBoolean),
    );

    expect(result.current[0]).toBe(true);
  });

  it('falls back when the stored value is invalid or not JSON', () => {
    localStorage.setItem('flag', '"yes"');
    localStorage.setItem('other', '{broken');

    const flag = renderHook(() => useLocalStorage('flag', false, isBoolean));
    const other = renderHook(() => useLocalStorage('other', false, isBoolean));

    expect(flag.result.current[0]).toBe(false);
    expect(other.result.current[0]).toBe(false);
  });

  it('stores the new value, so the next visit starts from it', () => {
    const first = renderHook(() => useLocalStorage('flag', false, isBoolean));

    act(() => first.result.current[1](true));

    const next = renderHook(() => useLocalStorage('flag', false, isBoolean));
    expect(first.result.current[0]).toBe(true);
    expect(next.result.current[0]).toBe(true);
  });

  it('still updates the value when the storage is blocked', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new DOMException('blocked', 'SecurityError');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('blocked', 'SecurityError');
    });

    const { result } = renderHook(() =>
      useLocalStorage('flag', false, isBoolean),
    );
    act(() => result.current[1](true));

    expect(result.current[0]).toBe(true);
  });
});
