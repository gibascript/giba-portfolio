import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useNow } from './use-now';

describe('useNow', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-10-04T14:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('ticks every interval', () => {
    const { result } = renderHook(() => useNow(1000));

    act(() => vi.advanceTimersByTime(3000));

    expect(result.current.toISOString()).toBe('2026-10-04T14:00:03.000Z');
  });
});
