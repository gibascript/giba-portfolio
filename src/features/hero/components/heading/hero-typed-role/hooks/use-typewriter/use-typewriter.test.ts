import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useTypewriter } from './use-typewriter';

const words = ['ab', 'xyz'];

describe('useTypewriter', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('types a word, holds it, erases it and types the next', () => {
    const { result } = renderHook(() => useTypewriter(words, true));

    expect(result.current).toBe('');

    act(() => vi.advanceTimersByTime(400));
    expect(result.current).toBe('a');

    act(() => vi.advanceTimersByTime(55));
    expect(result.current).toBe('ab');

    act(() => vi.advanceTimersByTime(1800));
    expect(result.current).toBe('a');

    act(() => vi.advanceTimersByTime(24));
    expect(result.current).toBe('');

    act(() => vi.advanceTimersByTime(280));
    expect(result.current).toBe('x');
  });

  it('shows the first word whole when disabled', () => {
    const { result } = renderHook(() => useTypewriter(words, false));

    act(() => vi.advanceTimersByTime(5000));

    expect(result.current).toBe('ab');
  });
});
